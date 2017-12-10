import React from 'react';
import {Table, Glyphicon, Button} from 'react-bootstrap';
import '../../index.css'

class RouteDetails extends React.Component{
	constructor(props) {
		super(props);
		console.log('prop sent to routeDeatials')
		console.log(props)
		console.log('propspropspropspropspropspropspropspropspropspropspropsprops')
		
	}
	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render(){
		// let row = this.addRow()
		// console.log(row)
		let date = this.props.date
		let handleDelete=this.props.handleRouteDelete
		let handleEdit=this.props.handleRouteEdit
		console.log('render here too??')
		console.log(this.props.routes)
		let Rows = this.props.routes.map(function(item, index){
			return (
				<Row 
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					key = {index}
					count = {index}
					personel = {item.personel}
					route = {item.route}
					date = {date}
				/>
			)
		})
		return (
		  <Table striped bordered condensed hover>
		    <thead>
		      <tr>
			      <th>Edit</th>
			      <th>Delete</th>
		        <th>#</th>
		        <th>Employee</th>
		        <th>Route Title</th>
		        <th>Date</th>
		      </tr>
		      {Rows}

		    </thead>
		    <tbody>


		    </tbody>
		  </Table>
		)
	}
}

export default RouteDetails 

const EditBtn = (props)=>{
	return(
		<Button data-count={props.count} onClick={props.onClick} bsStyle="primary"><Glyphicon data-count={props.count} glyph="edit"></Glyphicon></Button>
	)
}

const DeleteBtn = (props)=>{
	return(
		<Button  data-count={props.count}onClick={props.onClick} bsStyle="danger"><Glyphicon data-count={props.count} glyph="remove"></Glyphicon></Button>	)
}
function handleEdit(e){
	console.log(e.target.parent)
}

	function Row(props){
		return(
			<tr>
			  <td><EditBtn count={props.count} onClick={props.handleEdit}/></td>
			  <td><DeleteBtn count={props.count} onClick={props.handleDelete}/></td>
			  <td>{props.count}</td>
			  <td>{props.personel}</td>
			  <td>{props.route}</td>
			  <td>{props.date}</td>
			</tr>

		)
	}