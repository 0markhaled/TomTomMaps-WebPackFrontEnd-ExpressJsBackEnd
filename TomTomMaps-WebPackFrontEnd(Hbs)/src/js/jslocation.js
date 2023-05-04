//javascript geolacation, the browsers's geo location API
//more accurate, requires the user to accept their location being shared with the website


export default (callback) => {
    navigator.geolocation.getCurrentPosition((pos) => {
        callback(pos.coords);

    });

}