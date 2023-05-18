import "./css/styles.css";
import templateMap from './hbs/Map.hbs';
import templateRoot from './hbs/root.hbs';
import templateNavbar from './hbs/Navbar.hbs';
import tt from "@tomtom-international/web-sdk-maps"
import ipLocation from "./js/ipLocation";
import toxicStyle from "./js/toxic";
import jslocation from "./js/jslocation";
import jsWatchLocation from "./js/jsWatchLocation";
import washroomLocation from "./js/washroomLocation";
import templateWelcomePage from "./hbs/Welcome.hbs";


// use root template, apply to "app" div
let appEl = document.getElementById("app");
let mainEl;
appEl.innerHTML = templateRoot({ siteInfo: { title: "Map" } }); // apply root.hbs template to index.html div with id app
let welcomeEl = document.getElementById("welcome");
welcomeEl.innerHTML = templateWelcomePage();



var outputTextarea;
const locationMarkers = [];

window.onload = () => {

	mainEl = document.getElementById("main");
	mainEl.innerHTML = templateMap(); // apply Map.hbs template to index.html div with id main




	ipLocation().then((json) => {
		//console.log(json)
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
	//let marker = new tt.Marker().setLngLat([location.long, location.lat]).addTo(map);

	//coordinates of the user location
	let userLong;
	let userLat;
	let marker;


	//***makes a marker at the browser's location when they accept sharing their location
	jslocation((pos) => {
		//console.log(pos);
		userLat = pos.latitude;
		userLong = pos.longitude;
		let jsMarker = new tt.Marker({
			color: 'red'
		}).setLngLat([pos.longitude, pos.latitude]).addTo(map);
	});





	// //**** */ when the marker is clicked, the map will do the animation below
	// marker.getElement().addEventListener('click', function (e) {
	// 	map.easeTo({ center: marker.getLngLat(), zoom: 14, pitch: 45, bearing: 45, duration: 2000 });
	// 	e.stopPropagation(); //stops events in the main container(map) from firing
	// });



	// //******when the map is clicked, the map will do the animation below
	// document.getElementById("map").addEventListener('click', function () {
	// 	map.easeTo({ center: marker.getLngLat(), zoom: 12, pitch: 10, bearing: 0, duration: 2000 });
	// 	//console.log("clicked")
	// });



	// //****creates a marker by hand using the coordinates

	washroomLocation((bathMarker) => {


		var i = 0;
		for (let spot of bathMarker.features) {
			let marker = new tt.Marker().setLngLat([spot.long, spot.lat]).addTo(map);
			spot.mid = i;
			locationMarkers[i] = (marker);
			i = i + 1;
			(function (marker) {
				marker.getElement().addEventListener('click', function (e) {
					map.easeTo({ center: marker.getLngLat(), zoom: 14, pitch: 45, bearing: 45, duration: 2000 });
					e.stopPropagation();
					let markerPos = marker.getLngLat();
					let markerLat = markerPos.lat;
					let markerLong = markerPos.lng;
					const apiKey = "Halz0PnAneUUAxyKTrE3lM5t4CwelDY1";
					const distanceUrl = `https://api.tomtom.com/routing/1/calculateRoute/
		${userLat},${userLong}:${markerLat},${markerLong}/json?key=${apiKey}`;

					fetch(distanceUrl)
						.then(response => response.json())
						.then(data => {
							// Handle the response data here
							//console.log(data.routes[0].summary.lengthInMeters);
							if (outputTextarea === null || outputTextarea === undefined) {
								outputTextarea = document.getElementById("outputTextarea");
							}
							var lengthInMeters = data.routes[0].summary.lengthInMeters;
							var lengthInKilometers = lengthInMeters / 1000;
							let outputText = `Distance to marker: ${lengthInKilometers} Kms `;
							//and It is open from ${spot.start} to ${spot.end}
							// Process the route information returned by the API
							outputTextarea.value = outputText;
						})
						.catch(error => {
							// Handle any errors that occur during the request
							console.error('Error:', error);
						});
				});





			})(marker);
		}
		let navEl = document.getElementById("navbar"); //lab4
		navEl.innerHTML = templateNavbar(bathMarker); //lab4
		document.getElementById("selector").addEventListener('change', function (e) {


			//console.log(this.options[e.target.selectedIndex]);

			let selected = this.options[e.target.selectedIndex];

			let markerLat = selected.dataset.lat;
			let markerLong = selected.dataset.long;
			let marker = locationMarkers[selected.dataset.mid];

			marker.getElement().click();
			//map.easeTo({ center: { lon: markerLong, lat: markerLat }, zoom: 16, pitch: 45, bearing: 45, duration: 2000 });



		});




	});


	//when clicked on a marker, the api will measure and return the distance from current location to the marker




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
