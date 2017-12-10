function makeObj(){
	// console.log('MAKING DATA!!!!!!!!!!')

	const personelArray =  ["Dave",
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

	var routesObj = {}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function randomDate(date1, date2){
	var date1 = date1 || '1970-01-01'
	var date2 = date2 || new Date().toLocaleDateString()

	date1 = new Date(date1).getTime()
	date2 = new Date(date2).getTime()
	// date1 = date1.getTime()
	// date2 = date2.getTime()
	if( date1>date2){
		return new Date(getRandomArbitrary(date2, date1)).toLocaleDateString()	
	} else{
		return new Date(getRandomArbitrary(date1, date2)).toLocaleDateString()	

	}
}
	var personelDateuniqunessObj={}
	for (let i = 0 ; i < routesArray.length ; i++){
		routesObj[routesArray[i]]=[]
		var randomRouteCount = getRandomArbitrary(50, 100)
		//array to track dates to prevent new entry with same date
		var keepUniqueDatesArray=[]
		for (let p = 0 ; p < randomRouteCount ; p++){
			var obj = {
				personel: personelArray[parseInt(getRandomArbitrary(0, personelArray.length))],
				date:randomDate('2016-10-01','2017-09-01')
			}
			if(personelDateuniqunessObj[obj.personel]===undefined){
				personelDateuniqunessObj[obj.personel] = []
			}
			if(personelDateuniqunessObj[obj.personel].indexOf(obj.date)===-1){
				personelDateuniqunessObj[obj.personel].push(obj.date)
			}else{
				// console.log('Cant work two routes in same day in this simulation')
				continue
			}
			
			if(keepUniqueDatesArray.indexOf(obj.date) === -1){
				keepUniqueDatesArray.push(obj.date)
				routesObj[routesArray[i]].push(obj)

			}else{
				// console.log('date skipped for data uniquness')
				continue
				p -= p
			}
		}
	}

// console.log(routesObj)
return routesObj

}

export default makeObj