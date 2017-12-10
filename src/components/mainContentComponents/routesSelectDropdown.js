import React from 'react';
import {FormControl, ControlLabel} from 'react-bootstrap';


class RoutesSelectDropdown extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			value:"Please Select Personel"
		}
		this.onSelect = this.onSelect.bind(this)

	}
	createOptions(){
		let options = []
		this.props.routes.forEach((i, key)=>{  			
			options.push(<SelectRoute key={key} value={i} />)
		})
		return options
	}
	onSelect(e){
		console.log('event on select in the routes dropDown!')
		console.log(e.target.value)
		this.props.onSelect(e)
		this.setState({
			value:e.target.value
		})
	}
	render(){
		return(
			<div>
				<ControlLabel>Route List</ControlLabel>
				<FormControl value={this.state.value} type='route' onChange={this.onSelect} componentClass="select">
				<option value=''>Select Route</option>

				{this.createOptions()}
				</FormControl>
			</div>
		)		
	}
}



function SelectRoute(props){
	return (
		<option value={props.value}>{props.value}</option>

	)
}


export default RoutesSelectDropdown