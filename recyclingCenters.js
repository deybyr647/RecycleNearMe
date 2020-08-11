mapboxgl.accessToken = `pk.eyJ1IjoiZGV5YnlyNjQ3IiwiYSI6ImNrZGt0OXZkdTByejQyd3Mya211YWh3enUifQ.ugRwxLxNtb5C204DEjS1WQ`;
let mapBoxSrc = `https://api.mapbox.com/geocoding/v5/mapbox.places/recycling%20centers.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1597171423304&autocomplete=true&proximity=-73.2168192%2C40.71424`

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.5, 40],
    zoom: 9
});

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    "\nLongitude: " + position.coords.longitude); 
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    alert("Geolocation is not supported by this browser.");
 }

fetch(mapBoxSrc)
    .then((response) => (
        response.json()
    ))

    .then((data) => {
        console.log(data);
    })