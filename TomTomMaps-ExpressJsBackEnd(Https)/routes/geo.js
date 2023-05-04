

const router = require('express').Router();
const axios = require('axios'); //we ran "npm i axios -s" in the terminal to install axios
const cors = require('cors');

router.use(cors());
/* GET home page. */


router.get('/', async function (req, res, next) {
    // https://api.ipgeolocation.io/ipgeo?apiKey=43bf56dd66a149349480b1621723bbca&ip=
    // req.socket.remoteAddress shows the ip address of the client doing the https request
    //let remote = req.socket.remoteAddress;

    let remote = "206.167.123.9";
//this line is what is connecting the front end to the back end
    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=43bf56dd66a149349480b1621723bbca&ip=${remote}`;

    let fetch = await axios.get(url); //returns a promise

    let lat = fetch.data.latitude;
    let long = fetch.data.longitude;
    res.json({ "lat": lat, "long": long });

});

module.exports = router;
