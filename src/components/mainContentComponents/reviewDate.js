import React from 'react';
import DatePicker from 'react-datepicker';
import {Table, Glyphicon, Button} from 'react-bootstrap';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import GraphicalData from './graphicalData.js'



class SelectDate extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			view:'Review Date',
			selectedDate: moment(),
			thedateSelected:'',
			dateDataObj:this.props.dateDataObj,
			routeOrder:true,
			orderType:'personel'


		}
	this.handleChange = this.handleChange.bind(this);
	this.orderButtonClicked = this.orderButtonClicked.bind(this)


	}


	handleChange(date) {
		console.log('date picked')
		console.log(date.format())
	  	this.setState({
	    selectedDate: date,
	    thedateSelected:date
	  });
	}

	orderButtonClicked(e){
		let order = this.state.routeOrder
		let type=e.target.getAttribute('data-type')
		console.log('Oreder buttun '+type+' togle '+order)
		// console.log()
		if(order){
			this.setState({routeOrder:false, orderType:type})
		}else{
			this.setState({routeOrder:true, orderType:type})

		}
	}

	render(){
		// console.log(this.state.dateDataObj)
		return(
			<div>
				<h1>Select Date</h1>
				<DatePicker
					value={this.state.selectedDate}
	        selected={this.state.startDate}
	        onChange={this.handleChange}
	    	/>
		    	<GraphicalData 
		    		currentView = {this.state.view}
		    		allData={this.state.dateDataObj}
		    	/>
		    	<p>{this.state.selectedDate.format('ddd, MMM Do YYYY')}</p>
		    	  <RouteTable
		    		  orderType={this.state.orderType}
		    		  routeOrder={this.state.routeOrder}
		    	  	orderButtonClicked={this.orderButtonClicked}
		    	    dateData={this.state.dateDataObj[this.state.selectedDate.format('M/D/YYYY')]}
		    	    selectedDate={this.state.selectedDate}
		    	  />
			</div>
		)

	}
}
export default SelectDate

let RouteTable = (props)=>{
	if(props.dateData === undefined){
		return 	<p>No data for this data {props.selectedDate.format('M/D/YYYY')}</p>
	}
	let routeOrder = props.routeOrder
	// console.log('routes')
	let dateData = props.dateData
	function orderName(a, b) {
	  // Use toUpperCase() to ignore character casing
	  let type = props.orderType
	  let genreA
	  let genreB
	  // console.log(a)
	  // console.log(b)
	  if(type == 'personel'){
	  	// console.log('order this by personel '+routeOrder)
		  genreA = a[type].toUpperCase();
		  genreB = b[type].toUpperCase();

	  }else if(type == 'route'){
	  	// console.log('order this by route '+routeOrder)

	  	genreA = a[type].toUpperCase();
	  	genreB = b[type].toUpperCase();

	  }
	  
	  let comparison = 0;
	  if (genreA > genreB) {
	    comparison = 1;
	  } else if (genreA < genreB) {
	    comparison = -1;
	  }
	  if(!routeOrder){ comparison = comparison*-1}
	  return comparison;
	}
	dateData.sort(orderName)
	// personel.slice().sort(function(a, b){
	// 	return a.personel - b.personel
	// })
	// console.log(dateData)
	let Rows = dateData.map(function(item, index){
		return (
			<Row 
				key = {index}
				count = {index}
				personel = {item.personel}
				route = {item.route}
			/>
		)
	})


	return( //props ={routes:this.state.routeData[this.state.currentRoute}
		  <Table striped bordered condensed hover>
		    <thead>
		      <tr>
		        <th>#</th>
		        <th>Employee <Button data-type='personel'  onClick={props.orderButtonClicked} bsStyle="info"><Glyphicon data-type='personel' glyph="sort-by-attributes-alt"></Glyphicon></Button></th>
		        <th>Route <Button data-type='route' onClick={props.orderButtonClicked} bsStyle="info"><Glyphicon data-type='route' glyph="sort-by-attributes-alt"></Glyphicon></Button></th>
	        	<th>Notes</th>
		      </tr>
		      {Rows}
		    </thead>
		    <tbody>


		    </tbody>
		  </Table>
	)
}
	const NotesBtn = (props)=>{
		return(
			<Button  data-count={props.count}onClick={props.onClick} bsStyle="info"><Glyphicon data-count={props.count} glyph="list-alt"></Glyphicon></Button>	)
	}

	function Row(props){
		return(
			<tr>		  
			  <td>{props.count}</td>
			  <td>{props.personel}</td>
			  <td>{props.route}</td>
			  <td><NotesBtn count={props.count} onClick={props.handleDelete}/></td>
			</tr>

		)
	}

