export default async (callback) => {

    //fetches from the API, defaults to GET, np need for other parameters
    //this is the location of the server
    let res = await fetch("https://localhost:7777/publicwashrooms") //fetches from the API, defaults to GET, np need for other parameters

    let bathMarker = await res.json();
    // console.log(bathMarker);
    callback(bathMarker);

    //  return res.json(); //converts the response to JSON and returns it
}