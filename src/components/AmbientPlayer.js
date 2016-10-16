import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import * as Actions from '../actions/MusicActions';

// big thanks to https://github.com/cwilso/metronome

class Channel {
  constructor(params, actx, channelSetNode, syncObject) {
    this.params = params;
    this.actx = actx;
    this.current16thNote = 0;
    this.syncObject = syncObject;
    this.stopped = false;

    this.outputNode = this.actx.createGain();
    this.outputNode.connect(channelSetNode);
    this.outputNode.gain.value = (this.params.type=="oscSet")?0.005:0.1;

    if(this.params.notes) this.noteFreqs = this.calculateNoteFrequencies(this.params.notes);
    if(this.params.type=="crossfadeLoop") this.loadSample();
  }

  stop() {
    this.stopped = true;
    this.outputNode.disconnect();
  }

  loadSample() {
    var request = new XMLHttpRequest();
    request.open('GET', "/mp3/"+this.params.path, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      this.actx.decodeAudioData(request.response, function(buffer) {
        this.buffer = buffer;
        this.params.fadeTime = Math.min(this.params.fadeTime, buffer.duration/2);
        this.playSample();
      }.bind(this), function(){});
    }.bind(this)
    request.send();
  }

  playSample() {
    var src = this.actx.createBufferSource();
    var gain = this.actx.createGain();
    gain.gain.setValueAtTime(0.001, this.actx.currentTime);
    gain.gain.linearRampToValueAtTime(1.0, this.actx.currentTime + this.params.fadeTime/2);
    gain.gain.setValueAtTime(1.0, this.actx.currentTime + this.buffer.duration - this.params.fadeTime/2);
    gain.gain.linearRampToValueAtTime(0.001, this.actx.currentTime + this.buffer.duration);
    src.buffer = this.buffer;
    src.connect(gain);
    gain.connect(this.outputNode);
    src.start();
    // timeouts are bad
    setTimeout(this.playSample.bind(this), (this.buffer.duration - this.params.fadeTime) * 1000);
  }

  scheduleNote(time) {
    if(Math.random() < this.params.probability) {
      var osc = this.actx.createOscillator();
      osc.connect(this.outputNode);
      osc.type = this.params.wave;
      osc.frequency.value = this.noteFreqs[Math.floor(Math.random()*this.noteFreqs.length)];
      osc.start( time );
      osc.stop( time + 0.2 );
    }
  }

  calculateNoteFrequencies(notes) {
    return notes.map(function(note, idx) {
      if(typeof note == "number") return note; // already a freq
      else if((typeof note == "string") && (/[A-G][\#b]?[0-9]+/).test(note)) {
        var octaveNumber = parseInt(note.match(/[0-9]+/)[0]);
        var noteName = note.match(/[A-Z][\#b]?/)[0];
        var sharpOrFlat = 0;
        if(noteName.length == 2) {
          if(noteName.charAt(1)=="#") sharpOrFlat = 1;
          else if(noteName.charAt(1)=="b") sharpOrFlat = -1;
        }
        var noteNumber = [-3,-1,0,2,4,5,7][noteName.charCodeAt(0)-65]+sharpOrFlat+12*octaveNumber+4;
        var freq = Math.pow(2, (noteNumber - 49) / 12) * 440;
        return freq;
      }
      return null;
    })
  }
}

class ChannelSet {
  constructor(channelParams, actx, syncObject) {
    this.active = false;
    this.actx = actx;
    this.outputNode = this.actx.createGain();
    this.outputNode.gain.value = 0.001;
    this.outputNode.connect(this.actx.destination);
    this.syncObject = syncObject;
    this.channels = channelParams.map(function(channel, idx) {
      return new Channel(channel, this.actx, this.outputNode, syncObject)
    }.bind(this))
  }

  scheduleNotes() {
    for(var i=0; i<this.channels.length; i++) {
      this.channels[i].scheduleNote(this.syncObject.nextNoteTime);
    }
  }

  stop() {
    for(var i=0; i<this.channels.length; i++) {
      this.channels[i].stop();
    }
  }

  fadeIn() {
    this.outputNode.gain.setValueAtTime(this.outputNode.gain.value, this.actx.currentTime);
    this.outputNode.gain.linearRampToValueAtTime(1, this.actx.currentTime+5);
  }

  fadeOut() {
    this.outputNode.gain.setValueAtTime(this.outputNode.gain.value, this.actx.currentTime);
    this.outputNode.gain.linearRampToValueAtTime(0.001, this.actx.currentTime+5);
  }
}

const mapStateToProps = (state) => {
  return {
    channelSets: state.Music.channelSets,
    active: state.Music.active,
    activeChannelSet: state.Music.activeChannelSet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class AmbientPlayerComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
    this.channelSets = {};
    this.syncObject = {
      tempo: 120,
      nextNoteTime: 0.0,
      lookahead: 25.0,
      scheduleAheadTime: 0.1
    }
	}

	componentDidMount() {
    this.initAudio();
	}

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.activeChannelSet != this.props.activeChannelSet || prevProps.active != this.props.active) {
      this.updateChannelSets();
    }
  }

  updateChannelSets() {
    // stop all channels (fading comes later)
    for(var key in this.channelSets) {
      if(this.channelSets.hasOwnProperty(key)) {
        if(this.channelSets[key].active) this.channelSets[key].fadeOut();
        this.channelSets[key].active = false;
      }
    }

    if(this.props.active) {
      // this.channelSets[this.props.activeChannelSet] = this.props.channelSets[this.props.activeChannelSet].map(function(channel, idx) {
      //   return new Channel(channel, this.actx)
      // }.bind(this))
      if(!this.channelSets[this.props.activeChannelSet]) {
        console.log(this.props.activeChannelSet);
        this.channelSets[this.props.activeChannelSet] = new ChannelSet(this.props.channelSets[this.props.activeChannelSet], this.actx, this.syncObject);
      }
      this.channelSets[this.props.activeChannelSet].fadeIn();
      this.channelSets[this.props.activeChannelSet].active = true;

    }
  }

	initAudio() {
		this.actx = new AudioContext();
		this.outputNode = this.actx.createGain();
    this.outputNode.connect(this.actx.destination);
    this.outputNode.gain.value = 0.1;
    this.scheduler();
	}

  scheduler() {
    if(true) {
      while(this.syncObject.nextNoteTime < this.actx.currentTime + this.syncObject.scheduleAheadTime) {
        //this.scheduleNote(this.current16thNote, this.syncObject.nextNoteTime);
        //this.nextNote();
        for(var key in this.channelSets) {
          if(this.channelSets.hasOwnProperty(key)) {
            this.channelSets[key].scheduleNotes();
          }
        }
        var secondsPerBeat = 60.0 / this.syncObject.tempo;
        this.syncObject.nextNoteTime += 0.25 * secondsPerBeat;
      }
      setTimeout(this.scheduler.bind(this), this.syncObject.lookahead);
    }
  }



	render() {
		return (
			null
		)
	}
}

const AmbientPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AmbientPlayerComponent);

export default AmbientPlayer;
