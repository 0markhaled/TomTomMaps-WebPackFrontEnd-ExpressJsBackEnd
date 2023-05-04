import "./css/styles.css";
import templateMap from './hbs/Map.hbs';
import templateRoot from './hbs/root.hbs';
import tt from "@tomtom-international/web-sdk-maps"
import ipLocation from "./js/ipLocation";
import toxicStyle from "./js/toxic";
import jslocation from "./js/jslocation";
import jsWatchLocation from "./js/jsWatchLocation";


// use root template, apply to "app" div
let appEl = document.getElementById("app");
let mainEl;
appEl.innerHTML = templateRoot({ siteInfo: { title: "Map" } }); // apply root.hbs template to index.html div with id app







window.onload = () => {

	mainEl = document.getElementById("main");
	mainEl.innerHTML = templateMap(); // apply Map.hbs template to index.html div with id main

	ipLocation().then((json) => {
		console.log(json)
		initMap(json);
	});
};
let map;

var markerHeight = 50, markerRadius = 10, linearOffset = 25;
var popupOffsets = {
	'top': [0, 0],
	'top-left': [0, 0],
	'top-right': [0, 0],
	'bottom': [0, -markerHeight],
	'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
	'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
	'left': [markerRadius, (markerHeight - markerRadius) * -1],
	'right': [-markerRadius, (markerHeight - markerRadius) * -1]
};


let initMap = (location) => { //location is json
	map = tt.map({
		key: "Halz0PnAneUUAxyKTrE3lM5t4CwelDY1",
		container: "map",
		style: toxicStyle, //taken from toxic.js file, ehich is a json export fom tomtom webiste, inserted into a "export default{} object"
		center: [location.long, location.lat], //the center of the map
		zoom: 12, //the default zoom of the map
		pitch: 10 //the default pitch of the map
	});




	//***add a marker to the map based on ip geo location, using the service defined in iplocation.js
	let marker = new tt.Marker().setLngLat([location.long, location.lat]).addTo(map);




	//***makes a marker at the browser's location when they accept sharing their location
	jslocation((pos) => {
		console.log(pos);
		let jsMarker = new tt.Marker().setLngLat([pos.longitude, pos.latitude]).addTo(map);
	});





	//**** */ when the marker is clicked, the map will do the animation below
	marker.getElement().addEventListener('click', function (e) {
		map.easeTo({ center: marker.getLngLat(), zoom: 14, pitch: 45, bearing: 45, duration: 2000 });
		e.stopPropagation(); //stops events in the main container(map) from firing
	});



	//******when the map is clicked, the map will do the animation below
	document.getElementById("map").addEventListener('click', function () {
		map.easeTo({ center: marker.getLngLat(), zoom: 12, pitch: 10, bearing: 0, duration: 2000 });
		console.log("clicked")
	});



	// //****creates a marker by hand using the coordinates
	// var marker = new tt.Marker()
	// 	.setLngLat([-75.765, 45.455])
	// 	.addTo(map);



	// //***creates a popup at the position of the marker
	// var popup = new tt.Popup({ offset: popupOffsets, className: 'popup' })
	// 	.setLngLat(marker.getLngLat())
	// 	.setHTML("<h1>Hello I'm a Popup!</h1>")
	// 	.addTo(map);

	// marker.setPopup(popup);






	//************beggining of moving marker
	//delete and create a github without it, will need it for the final project
	// 	jsWatchLocation((pos) => {
	// 		console.log(pos);
	// 		let jsMarker = new tt.Marker().setLngLat([pos.longitude, pos.latitude]).addTo(map);
	// 	});
	// //*********end of moving marker

};
