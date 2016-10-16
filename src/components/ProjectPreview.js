import React from 'react';
import {Link} from 'react-router';

export default class ProjectPreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className="projectPreview">
				<Link to={"/projects/"+this.props.path}><h4>{this.props.title}</h4></Link>
				<span>{this.props.description}</span>
				<div className="tagList">
					{this.props.tags.map(function(tag, idx){
						return (
							<span key={"tag_"+idx}>
								<span>{idx==0?"":", "}</span>
								<span>{tag}</span>
							</span>
						)
					})}
				</div>
			</div>
		)
	}
}
