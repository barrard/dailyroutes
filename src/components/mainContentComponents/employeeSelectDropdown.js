import React from 'react';
import {FormControl, ControlLabel} from 'react-bootstrap';


class PersonelSelectDropdown extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			value:'Please Select Personel'
		}
		this.onSelect = this.onSelect.bind(this)

	}
	createOptions(){
		let options = []
		this.props.personel.forEach((i, key)=>{  			
			options.push(<SelectPersonel key={key} value={i} />)
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
				<ControlLabel>   Employee List</ControlLabel>
				<FormControl value={this.state.value} type='personel' onChange={this.onSelect}  componentClass="select" placeholder="select">
				<option value={null}>Select Employee</option>
				{this.createOptions()}
				</FormControl>
			</div>
		)
	}
}



function SelectPersonel(props){
	return (
		<option value={props.value}>{props.value}</option>

	)
}

// const personel = [
// 	"Dave",
// 	"Rowena",
// 	"Chris",
// 	"Umi",
// 	"Ann",
// 	"Matt",
// 	"Kama"
// 	]


export default PersonelSelectDropdown