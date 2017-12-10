import React from 'react';
import ReviewRoutes from './mainContentComponents/reviewRoutes.js'
import CreateRoutes from './mainContentComponents/createRoutes.js'
import ReviewEmployee from './mainContentComponents/reviewEmployee.js'
import ReviewDate from './mainContentComponents/reviewDate.js'

import { } from 'react-bootstrap';
import makeData from './MakeData.js'

class MainContent extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			personel:personelArray.sort(),
			routes:routesArray.sort(),
			routeList:[
				{personel:'Dave1',route:'Haiku 1'},
				{personel:'Dave2',route:'Haiku 2'}
			],
			routesObjectDataBase:makeData(),
			personelObjectDataBase:'',
			dateObjectDataBase:''


		}
		// console.log('mainContentConstructor?===========')
		// this is required for the eventHandlers
		this.handleCreateRoute = this.handleCreateRoute.bind(this)
		this.handleRouteDelete = this.handleRouteDelete.bind(this)
		this.handleRouteEdit = this.handleRouteEdit.bind(this)

	}
	componentWillMount() {
		// console.log('::::::::::::::MAKE THE PERSONEL OBJ')
		var dataObj = returnPersonelDataOb(this.state.routesObjectDataBase)
		this.setState({
			personelObjectDataBase:dataObj.personelDataObj,
			dateObjectDataBase:dataObj.dateDataObj

		})
	}

handleRouteDelete(e){
	// console.log('delete')
	// console.log(e.target)
	let count = e.target.getAttribute('data-count')
	// console.log(count)
	let confirm = window.confirm('Are you sure you want to delete route# '+count)
	if(confirm){
		let routeList = this.state.routeList
		let deletedRoute = routeList.splice(count, 1)
		// console.log(deletedRoute)
		// console.log(deletedRoute[0].personel)
		let person = deletedRoute[0].personel;
		let route = deletedRoute[0].route;
		// console.log(routeList)
		// console.log(person)
		// console.log(route)
		let personelArray = this.state.personel.slice()
		personelArray.push(person)
		personelArray.sort()
		let routesArray = this.state.routes.slice()
		routesArray.push(route)
		routesArray.sort()


		this.setState({
			routeList:routeList,
			personel:personelArray,
			routes:routesArray
		})


	}
}

handleRouteEdit(e){
	// console.log('edit')
	let count = e.target.getAttribute('data-count')
	// console.log(count)
	let confirm = window.confirm('Are you sure you want to edit route# '+count)
	if(confirm){
		// console.log('test edit handler')
	} 
}







	handleCreateRoute(newRouteDetails){
		let person = newRouteDetails.personel
		let route = newRouteDetails.route
		let routesList = this.state.routeList.slice()
		let routes = this.state.routes.filter(i=> i != route)
		let personel = this.state.personel.filter(i=> i != person)
		routesList.push(newRouteDetails)
		this.setState({
			routes:routes,
			personel:personel,
			routeList:routesList,

		})
		// console.log(this.state.routeList)



	}
	


  render(){
  	let allData ={
  		routes:this.state.routesObjectDataBase,
			personel:this.state.personelObjectDataBase,
			dates:this.state.dateObjectDataBase
  	}
	 	let view = this.props.currentNav
	  let CurrentView = ()=>{
  		if(this.props.currentNav == 'selectRoute'){
  		 return(
  				<div>

  					<ReviewRoutes 
  						routes={this.state.routes}
  						routesData={this.state.routesObjectDataBase}

  					/>
  				</div>
				)
  			
  		}else if(view == 'create'){
  			return(

  				<CreateRoutes
  					routes={this.state.routes}
  					personel={this.state.personel}
  					routeList={this.state.routeList}
  					handleRouteDelete={this.handleRouteDelete}
  					handleRouteEdit={this.handleRouteEdit}
  					handleCreateRoute={this.handleCreateRoute}
  				/>
  				)
  				
  		}else if(view == 'selectEmployee'){
  		return(

  				<ReviewEmployee
  				personel={this.state.personel}
  				personelData={this.state.personelObjectDataBase}
  				 />
  			)

  		}else if(view == 'selectDate'){
  		return(
  				<ReviewDate
  				dateDataObj={this.state.dateObjectDataBase}
  				 />
  			)

  		}
  	}

  	return(
  		<div>
  			

  			<CurrentView />
  		</div>

  	)

  }
}

export default MainContent 
function returnPersonelDataOb(routesDataObj){
	let personelDataObj = {}
	let dateDataObj = {}
	for(let k in routesDataObj){
		// console.log(routesDataObj[k])
		for(let x = 0; x<routesDataObj[k].length; x++){
			if(personelDataObj[routesDataObj[k][x].personel]=== undefined){
				// console.log('adding personel '+ routesDataObj[k][x].personel +' to the object')
				personelDataObj[routesDataObj[k][x].personel]=[]
			}
			if(dateDataObj[routesDataObj[k][x].date]=== undefined){
				// console.log('adding personel '+ routesDataObj[k][x].personel +' to the object')
				dateDataObj[routesDataObj[k][x].date]=[]
			}
			personelDataObj[routesDataObj[k][x].personel].push({route:k, date:routesDataObj[k][x].date})
			dateDataObj[routesDataObj[k][x].date].push({route:k, personel:routesDataObj[k][x].personel})


		}

	}
	// console.log(routesDataObj)
	// console.log(personelDataObj)
	return {
		personelDataObj:personelDataObj,
		dateDataObj:dateDataObj
	}
}

const personelArray = ["Dave",
												"Rowena",
												"Chris",
												"Umi",
												"Ann",
												"Matt",
												"Kama"
												]
const routesArray  = [
	"Central 1",
	"Central 2",
	"Central 3",
	"Central 4",
	"Central 5",
	"Central 6",
	"Central 7",
	"Central 8",
	"Central 9",
	"Lahaina 1",
	"Lahaina 2",
	"Lahaina 3",
	"Lahaina 4",
	"Lahaina 5",
	"Kihei 1",
	"Kihei 2",
	"Kihei 3",
	"Kihei 4",
	"Upcuntry 1",
	"Upcuntry 2",
	"Upcuntry 3",
	"Upcuntry 4",
	"Upcuntry 5",
	"Hana 1",
	"Haiku 1",
	"Haiku 2",
	"Haiku 3"
]

