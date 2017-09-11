import React from 'react';
import {Link} from 'react-router';

export default class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div className="topMenu">
				<Link to="/">Home</Link><span>, </span>
				<Link to="/about">About</Link><span>, </span>
				<Link to="/projects">Projects</Link><span>, </span>
				<Link to="/blog">Blog</Link><span>, </span>
				<Link to="/ambience">Ambience</Link><span> </span>
			</div>
		)
	}
}
