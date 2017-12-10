import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';


const styles={
	p:{
		color:'red'
	},
	h3:{
		color:'rgba(111, 0, 0, 0.5)'

	},
	canvasContainer:
		{
			display:'block',
			border:'solid black 1px',
			width:'100%',
			height:'100%'
		}
}

class GraphicalData extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			chartData:this.props.allData,
			currentView:this.props.currentView,
			// chartData:{
			// 	labels:['1', '2', '3', '4', '5'],
			// 	datasets:[{
			// 		label:'Count',
			// 		data:[100, 200, 333, 221, 111],
			// 		backgroundColor:[
			// 			'red', 'green', 'blue', 'black', 'goldenrod'
			// 		]
			// 	}]
			// }
		}
	}

	// componentWillRender(){
	// 	console.log('GRAPH WIILLLL MOUNT')
	// 	console.log('prep the chart for '+this.state.currentView)
	// 	console.log('with data')
	// 	console.log(this.state.chartData)

	// }

	returnBarChart(){
		console.log('RETURNIG SOME DATA TO A BAR CHART WITH THIS DATA')
		console.log(this.props.allData.zone)
		let zoneData = this.props.allData.zone
		let parsedChartData = {}
		parsedChartData.labels=[]
		parsedChartData.datasets=[]
		let dataSetObj = {}
		dataSetObj.label=this.props.currentView
		dataSetObj.data=[]
		dataSetObj.backgroundColor=['red', 'green','black', 'blue', 'goldenrod']

		//add the data keys to the labels?
		for(let k in zoneData){
			parsedChartData.labels.push(k)
			dataSetObj.data.push(zoneData[k].length)
		}
		parsedChartData.datasets.push(dataSetObj)
		console.log(parsedChartData)
		return(
			<Bar
				data={parsedChartData}
			
				options={{
					maintainAspectRatio: false,
					scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
	        }
				}}
			/>
		)
	}



	render(){
let BarChart = this.returnBarChart()
// console.log('whts my state? '+this.state.currentView)
// console.log('whts my state? '+this.state.chartData)
console.log('whts my props? '+this.props.currentView)
console.log('whts my props? '+this.props.allData)
		console.log('GRAPHICAL RENDER')
		console.log(this.props)
		 let view = this.props.currentView
		 console.log(view)
		return(
			<div>
			<h5>{this.props.currentView}</h5>
			{BarChart}
			</div>
		)
	}
}
export default GraphicalData
			// <Bar
			// 	data={this.state.chartData}
		
			// 	options={{
			// 		maintainAspectRatio: false
			// 	}}
			// />