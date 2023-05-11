//lab 4
const router = require('express').Router();
const axios = require('axios'); //we ran "npm i axios -s" in the terminal to install axios
const cors = require('cors');

router.use(cors());
/* GET home page. */


router.get('/', async function (req, res, next) {
    // https://api.ipgeolocation.io/ipgeo?apiKey=43bf56dd66a149349480b1621723bbca&ip=
    // req.socket.remoteAddress shows the ip address of the client doing the https request
    //let remote = req.socket.remoteAddress;

    // let remote = "206.167.123.9";
    //this line is what is connecting the front end to the back end
    let url = `https://maps.ottawa.ca/arcgis/rest/services/PublicWashrooms/MapServer/0/query?outFields=*&where=1%3D1&f=geojson`;

    let fetch = await axios.get(url); //returns a promise

    let fetchResults = fetch.data.features; //fetch results for bathc oordinats

    let result = {
        features: []
    }

    for (let i = 0; i < fetchResults.length; i++) {
        let arrayCoords = fetchResults[i].geometry.coordinates;//array of coords

        let latlong = {
            lat: arrayCoords[1],
            long: arrayCoords[0],
            name: fetchResults[i].properties.NAME
        };
        result.features.push(latlong);
    }

    res.json(result);



});

module.exports = router;
