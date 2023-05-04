

// https://api.ipgeolocation.io/ipgeo?apiKey=43bf56dd66a149349480b1621723bbca

export default async () => {

    //fetches from the API, defaults to GET, np need for other parameters
    //this is the location of the server
    let res = await fetch("https://localhost:7777/geo") //fetches from the API, defaults to GET, np need for other parameters


    return res.json(); //converts the response to JSON and returns it
}