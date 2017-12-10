import React from 'react';
import {FormGroup, Well, Button, Label, Row, Col} from 'react-bootstrap';
import RoutesSelectDropdown from './routesSelectDropdown.js'
import PersonelSelectDropdown from './employeeSelectDropdown.js'
import RouteDetails from './RouteDetails.js'


class CreateRoutes extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			selectedRoute:null,
			selectedEmplyee:null
		}
		this.onDropdownSelected = this.onDropdownSelected.bind(this)
		this.handleCreateRoute = this.handleCreateRoute.bind(this)


	}

  	PreviewRoute(){
  		return(

  			<div className='inline'>
  			<div className='buffer'>
	  			<h3 className="inline"><Label bsStyle="default">Route</Label></h3>
	  			<h3 className="inline"><Label bsStyle="default">Personel</Label></h3>
	  		</div>
  			<div className='buffer'>
  				<h4 className="inline"><Label bsStyle="info">{this.state.selectedRoute}</Label></h4>
  				<h4 className="inline"><Label bsStyle="info">{this.state.selectedEmplyee}</Label></h4>
  			</div>
  			</div>
  		)
  	}

  	SelectRouteForm(){

  		return(
  			<FormGroup controlId="formControlsSelect">
  				<RoutesSelectDropdown routes={this.props.routes} onSelect={this.onDropdownSelected} />
  				<PersonelSelectDropdown personel={this.props.personel} onSelect={this.onDropdownSelected} />
  			</FormGroup>
  		)
  	}

  	onDropdownSelected(e){
			let type = e.target.getAttribute('type')
			let item = e.target.value

  		console.log(item)
  		console.log(type)
  		if(type === 'personel'){
  			this.setState({selectedEmplyee:item})
  			console.log('changeing person')

  		}else if(type==='route'){
  			this.setState({selectedRoute:item})
  		
  		console.log('changeing route')
  			
  		}
  		// console.log(this.state.selctedRoute)
  		// console.log(this.state.selectedEmplyee)
  	}
  	completeRouteWell(){
  		console.log('Well created?')
  		return(
  			<Well bsSize="large">
  				<RouteDetails 
	  				handleRouteDelete={this.props.handleRouteDelete}
	  				handleRouteEdit={this.props.handleRouteEdit}
	  				routes={this.props.routeList} 
	  				date={new Date().toLocaleDateString()}
  				/>
  			</Well>
  		) 
  	}

  	CreateRoute(){
		let buttonState;
		if(this.state.selectedEmplyee === null && this.state.selectedRoute === null){
			buttonState = 'danger'
		}else if(this.state.selectedEmplyee === null || this.state.selectedRoute === null){
			buttonState = 'warning'

		}else if (this.state.selectedEmplyee !== null && this.state.selectedRoute !== null){
			buttonState = 'success'

		}
		return(	
			<Button
			className = 'vertCenter'
			  onClick={this.handleCreateRoute}
				bsStyle={buttonState}
				bsSize="large">
				Add Completed Route
			</Button>
		)
	}
	handleCreateRoute(){
		let person = this.state.selectedEmplyee
		let route = this.state.selectedRoute
		if(route=== null || person === null){
			alert('Select and employee and a route')
			return
		}
		let confirm = window.confirm('Create this route?')

	if (confirm){
		console.log('click')
		let newRouteDetails = 
		{
			personel : person,
			route : route
		}
		console.log("New route is")
		console.log(newRouteDetails)
		this.props.handleCreateRoute(newRouteDetails)
		this.setState({
			selectedEmplyee:null,
			selectedRoute:null,
		})
	}else{
		return false
	}
}

	render(){
		let previewRoute = this.PreviewRoute()
		let routesForm = this.SelectRouteForm()
		let completedRouteWell = this.completeRouteWell()
		let createRouteBtn = this.CreateRoute()
		let routes = this.props.routeList
		let selectedRoute = this.state.selectedRoute
		let selectedEmplyee = this.state.selectedEmplyee
		// console.log('route =  '+selectedRoute)
		// console.log('emp =  '+selectedEmplyee)
		// console.log('routes =  '+routes)
			return(
				<div>
					<Row>
						{routesForm}
					</Row>
					<Row>
					<Col xs={6}>
				{createRouteBtn}
				</Col>
				<Col xs={6}>
				{previewRoute}
				</Col>
				</Row>
			
				<Row>
				{completedRouteWell}
				</Row>
				</div>
			)

	}
}


export default CreateRoutes