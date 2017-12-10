import React from 'react';
import {Table, Glyphicon, Button} from 'react-bootstrap';
import PersonelSelectDropdown from './employeeSelectDropdown.js'
import GraphicalData from './graphicalData.js'


class ReviewEmployee extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			view:'Review Employee',
			personel:this.props.personel,
			currentPersonel:"Dave",
			personelData:this.props.personelData,
			routeOrder:true,
			orderType:'date'
		}
		this.onRouteSelect = this.onRouteSelect.bind(this)
		this.orderButtonClicked = this.orderButtonClicked.bind(this)
	}

	onRouteSelect(e){
		console.log('A route was selected')
		let personel = e.target.value
		console.log(personel)
		if(personel === ''){
			console.log('returning with undefined personels')
			return
		}else{
			console.log('personels defined?? lets setstate')
			this.setState({
				currentPersonel:personel
			})	
		} 
		
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
		let chartData = this.state.personelData[this.state.currentPersonel]
		let parsedChartData = {}
		parsedChartData.route={}
		parsedChartData.zone={}
		for(let x = 0 ; x < chartData.length ; x++){
			let route = chartData[x].route
			let zone = route.split(' ')[0]
			if(parsedChartData.route[route]===undefined){
				parsedChartData.route[route]=[]
			}
			if(parsedChartData.zone[zone]===undefined){
				parsedChartData.zone[zone]=[]
			}
				parsedChartData.route[route].push(route)
				parsedChartData.zone[zone].push(zone)
		
			

		}
		console.log('parsedChartData')
		console.log('parsedChartData')
		console.log('parsedChartData')
		console.log('parsedChartData')
		console.log(parsedChartData)
		return(
			<div>
				<h1>Select Employee</h1>
				<p>Select an employee to review</p>
				<PersonelSelectDropdown 
				  personel={this.state.personel} 
				  onSelect={this.onRouteSelect} 
				/>
				<GraphicalData 
					currentView = {this.state.currentPersonel}
					allData={parsedChartData}
				/>
				  <PersonelTitle 
				  	currentPersonel={this.state.currentPersonel}
				  />
				  <RouteTable
					  orderType={this.state.orderType}
					  routeOrder={this.state.routeOrder}
				  	orderButtonClicked={this.orderButtonClicked}
				    personel={this.state.personelData[this.state.currentPersonel]}
				  />
			</div>


		)
	}
}
export default ReviewEmployee

let PersonelTitle = (props)=>{
	return (
	<h2>{props.currentPersonel}</h2>
)}

		let RouteTable = (props)=>{
			if(props.personel === undefined){
				return
			}
			let routeOrder = props.routeOrder
			console.log('routes')
			console.log('routes')
			let personel = props.personel
			function orderName(a, b) {
			  // Use toUpperCase() to ignore character casing
			  let type = props.orderType
			  let genreA
			  let genreB
			  if(type == 'route'){
			  	console.log('order this by route '+routeOrder)
				  genreA = a[type].toUpperCase();
				  genreB = b[type].toUpperCase();
		
			  }else if(type == 'date'){
			  	console.log('order this by date '+routeOrder)

			  	genreA = new Date(a[type]).getTime();
			  	genreB = new Date(b[type]).getTime();

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
			personel.sort(orderName)
			// personel.slice().sort(function(a, b){
			// 	return a.personel - b.personel
			// })
			console.log(personel)
			let Rows = personel.map(function(item, index){
				return (
					<Row 
						key = {index}
						count = {index}
						route = {item.route}
						date = {item.date}
					/>
				)
			})
		

			return( //props ={routes:this.state.routeData[this.state.currentRoute}
				  <Table striped bordered condensed hover>
				    <thead>
				      <tr>
				        <th>#</th>
				        <th>Employee <Button data-type='personel'  onClick={props.orderButtonClicked} bsStyle="info"><Glyphicon data-type='personel' glyph="sort-by-attributes-alt"></Glyphicon></Button></th>
				        <th>Date <Button data-type='date' onClick={props.orderButtonClicked} bsStyle="info"><Glyphicon data-type='date' glyph="sort-by-attributes-alt"></Glyphicon></Button></th>
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
			  <td>{props.route}</td>
			  <td>{props.date}</td>
			  <td><NotesBtn count={props.count} onClick={props.handleDelete}/></td>
			</tr>

		)
	}


