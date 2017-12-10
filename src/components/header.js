import React from 'react';
import { Glyphicon, Jumbotron } from 'react-bootstrap';
import MainNav from './mainNav.js'
import '../index.css'
class Header extends React.Component{
	constructor(props){
		super(props)
	console.log('created')
	this.handleOnSelect = this.handleOnSelect.bind(this)

}

	handleOnSelect(e){
		console.log(e)
			this.props.handleTabSelect(e)
		}
		render(){
			return(
				<Jumbotron>
					<h1 className='underline'>Header {this.props.name}</h1>
					<p>Date = {this.props.date}</p>
					<Glyphicon glyph="search"></Glyphicon>
					<MainNav 
						onSelect={this.handleOnSelect}
					/>
				</Jumbotron>
			)
		}
}

export default Header 