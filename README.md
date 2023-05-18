Application Overview
This application utilizes Express.js for the back-end and Webpack-HBS for the front-end.
It integrates with the TomTom Map API provider to display a map and add markers based on the Ottawa Public Washrooms data obtained from the Open Data Ottawa JSON file.
The app allows users to select a public washroom location from a drop-down navigation bar, animating the screen to the selected location.
When a marker is clicked on the map, the app provides the user with the distance to the public washroom in kilometers.
The application fetches the data from the Open Data Ottawa API endpoint: Public Washrooms API.
Features
Display a map using the TomTom Map API provider.
Extract longitude/latitude coordinates from the Ottawa Public Washrooms data and add corresponding markers on the map.
Allow users to select a public washroom location from a drop-down navigation bar.
Provide distance information to the selected washroom when a marker is clicked.
Utilize JS Geolocation and IP Location to create markers on the map.
Styling is managed in the toxic.js file, which can be easily modified through the styling feature on the TomTom website.


This app takes the ottawa public washrooms data from a Json file provided in the link below, extracts the longitude/latidute coordinates. 
The app also uses TomTom Map API provider.
The app uses the coords retreived from the Open Data Ottawa Json file and adds markers on the Map.
When a marker is clicked the app tells the user how far is the public washroom in Kilometers.

Name is used in a drop down nav bar that animates the user's screen to he bathroom location clicked on.

data was imported from open data ottawa Api 
https://maps.ottawa.ca/arcgis/rest/services/PublicWashrooms/MapServer/0/query?outFields=*&where=1%3D1&f=geojson



this aplication uses express js for back end and webpack-hbs for front end.
App uses TomTom map api provider, styling is in toxic.js file, easily changale through the styling feature of the tomtom website.
app has the ability to creat markers on the map using jsgeolocation and iplocation. Geolocation asks users permession.
App has the ability to watch for the users movements but can not be tested since the app is not live(only run on computer).



# TomTomMaps-WebPackFrontEnd-ExpressJsBackEnd

back end express starter template, with template for db integration, non used in this project.


template: express and ssl (https starter)

1)npm i
2) npm i axios -s   //gives us the abilityto run somethins similar to fetch methods since its not avliable in node js by defaults


front end is webpack starter template with hbs support. frint end template is on computer

