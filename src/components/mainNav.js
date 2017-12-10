import React from 'react';
import {Nav, NavItem } from 'react-bootstrap';
import '../index.css'

class MainNav extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			activeTab:'create'
		}
		this.handleSelect = this.handleSelect.bind(this)

	}

	handleSelect(e){
		this.props.onSelect(e)
		this.setState({
			activeTab:e
		})
		}

	render(){
		const tabObj = [
		{eventKey:'create' , text:'Create New Routes'},
		{eventKey:'selectRoute' , text:'Review Routes'},
		{eventKey:'selectEmployee' , text:'Review Employee'},
		{eventKey:'selectDate' , text:'Prevous Dates'},
		]
		let navItems = []
		tabObj.map((i)=>{
			if(this.state.activeTab === i.eventKey){
				navItems.push(<NavItem key={navItems.length} className='activeTab' eventKey={i.eventKey}>{i.text}</NavItem>)

			}else{
				navItems.push(<NavItem key={navItems.length} eventKey={i.eventKey}>{i.text}</NavItem>)

			}
		})
		return(
			<Nav bsStyle="tabs" onSelect={this.handleSelect}>
				{navItems}
			</Nav>	
		)
	}
}

export default MainNav
