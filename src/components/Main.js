import React from 'react';
import AmbientPlayer from './AmbientPlayer';
import BackgroundCanvas from './BackgroundCanvas';
import Menu from './Menu';

export default class Main extends React.Component {
	render() {
		return (
			<div>
				<div className="foreground">
					<div className="foregroundInner">
						<div className="">
							<div className="">
                <div className="">
                  <Menu />
			        	  {this.props.children}
                </div>
							</div>
						</div>
					</div>
				</div>
				<AmbientPlayer play={true} />
				<BackgroundCanvas />
			</div>
		)
	}
}
