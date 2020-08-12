let locationTrigger = document.querySelector('#queryLocation');
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV5YnlyNjQ3IiwiYSI6ImNrZGt0OXZkdTByejQyd3Mya211YWh3enUifQ.ugRwxLxNtb5C204DEjS1WQ';

let finalResults = [];
let displayResults = (locationsArr) => {
    for(let i = 0; i < locationsArr.length; i++){
        let lon = locationsArr[i].geometry.coordinates[0];
        let lat = locationsArr[i].geometry.coordinates[1];

        let markerCoords = [lon, lat];

        let marker = new mapboxgl.Marker();
        marker.setLngLat(markerCoords);
        finalResults.push(marker);

    }
}

let getResults = (userCoords) => {
    let mapboxSrc = `https://api.mapbox.com/geocoding/v5/mapbox.places/recycling%20center.json?access_token=${mapboxgl.accessToken}&cachebuster=1597184952478&autocomplete=true&proximity=${userCoords.lon}%2C${userCoords.lat}&limit=10`;

    fetch(mapboxSrc)
        .then((response) => (
            response.json()
        ))

        .then((data) => {
            let locations = data.features;
            console.log('JSON', data);
            console.log('Locations', locations)
            displayResults(locations);
        })
}

let getGeoLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            let coordinates = position.coords;

            let userCoords = {
                lat: coordinates.latitude,
                lon: coordinates.longitude
            }

            console.log('Coords', userCoords)     

            let map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [userCoords.lon, userCoords.lat],
                zoom: 9
            });

            let userLocation = new mapboxgl.Marker();
            userLocation.setLngLat([userCoords.lon, userCoords.lat]);
            userLocation.addTo(map);

            getResults(userCoords);

            for(let x = 0; x < finalResults.length; x++){
                finalResults[x].addTo(map);
            }
        })
    }
}