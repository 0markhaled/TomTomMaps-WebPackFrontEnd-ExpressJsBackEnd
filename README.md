
this aplication uses express js for back end and webpack_hbs for frent end.
App uses TomTom map api provider, styling is in toxic.js file, easily changale through the styling feature of the tomtom website.
app has the ability to creat markers on the map using jsgeolocation and iplocation. Geolocation asks users permession.
App has the ability to watch for the users movements but can not be tested since the app is not live(only run on computer).

lab 4 additions:

data was imported from open data ottawa
https://maps.ottawa.ca/arcgis/rest/services/PublicWashrooms/MapServer/0/query?outFields=*&where=1%3D1&f=geojson

which are details about public washrooms.
the app takes the data, extracts the long/lat/name. Long and lat used for placing markers on the tomtom map.
Name is used in a drop down nav bar that animates the user's screen to he bathroom location clicked on.




# TomTomMaps-WebPackFrontEnd-ExpressJsBackEnd

back end express starter template, with template for db integration, non used in this project.


template: express and ssl (https starter)

1)npm i
2) npm i axios -s   //gives us the abilityto run somethins similar to fetch methods since its not avliable in node js by defaults


front end is webpack starter template with hbs support. frint end template is on computer

