import React from 'react';
import {Table, Glyphicon, Button} from 'react-bootstrap';
import RoutesSelectDropdown from './routesSelectDropdown.js'
import GraphicalData from './graphicalData.js'


class ReviewRoutes extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			view:'Review Routes',
			routes:this.props.routes,
			currentRoute:'Central 1',
			routeData:this.props.routesData,
			routeOrder:true,
			orderType:'personel'
		}
		this.onRouteSelect = this.onRouteSelect.bind(this)
		this.orderButtonClicked = this.orderButtonClicked.bind(this)
	}
	componentWillMount(){
		// console.log(this.state.routeData)
		// if(this.state.routeObjects === undefined){
		// 	var obj = makeObj()
		// 	this.setState({routeObjects:obj})
		// }else{
		// 	console.log('Data already set')
		// }

	}
	onRouteSelect(e){
		console.log('A route was selected')
		let route = e.target.value
		console.log(route)
		if(route === ''){
			console.log('returning with undefined routes')
			return
		}else{
			console.log('routes defined?? lets setstate')
			this.setState({
				currentRoute:route
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
		if(this.state.routeData[this.state.currentRoute]===undefined){
			return
		}

		let chartData = this.state.routeData[this.state.currentRoute]
		let parsedChartData={}
		parsedChartData.zone={}
		parsedChartData.date={}

		for(let x = 0 ; x< chartData.length ; x++){
			let zone = chartData[x].personel
			let date = chartData[x].date
			if(parsedChartData.zone[zone]===undefined){
				parsedChartData.zone[zone]=[]
			}
			if(parsedChartData.date[date]===undefined){
				parsedChartData.date[date]=[]
			}
			parsedChartData.date[date].push(date)
			parsedChartData.zone[zone].push(zone)


		}

		console.log(this.state.routeData[this.state.currentRoute])
		return(
			<div>
			<h1>Review Routes</h1>
			<p>Select a route to review</p>
			<RoutesSelectDropdown 
			  routes={this.state.routes} 
			  onSelect={this.onRouteSelect} 
			/>
  			<GraphicalData 
  				currentView = {this.state.currentRoute}
  				allData={parsedChartData}
  			/>
			  <RouteTite 
			  	currentRoute={this.state.currentRoute}
			  />
			  <RouteTable
				  orderType={this.state.orderType}
				  routeOrder={this.state.routeOrder}
			  	orderButtonClicked={this.orderButtonClicked}
			    routes={this.state.routeData[this.state.currentRoute]}
			  />

			</div>

		)
	}
}


export default ReviewRoutes

let RouteTite = (props)=>{
	return (
	<h2>{props.currentRoute}</h2>
)}

	let RouteTable = (props)=>{
		if(props.routes === undefined){
			return
		}
		let routeOrder = props.routeOrder
		console.log('routes')
		console.log('routes')
		let routes = props.routes
		function orderName(a, b) {
		  // Use toUpperCase() to ignore character casing
		  let type = props.orderType
		  let genreA
		  let genreB
		  if(type == 'personel'){
		  	console.log('order this by person '+routeOrder)
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
		routes.sort(orderName)
		// routes.slice().sort(function(a, b){
		// 	return a.personel - b.personel
		// })
		// console.log(routes)
		let Rows = routes.map(function(item, index){
			return (
				<Row 
					key = {index}
					count = {index}
					personel = {item.personel}
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
		  <td>{props.personel}</td>
		  <td>{props.date}</td>
		  <td><NotesBtn count={props.count} onClick={props.handleDelete}/></td>
		</tr>

	)
}



