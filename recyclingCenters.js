const proxy = 'https://cors-anywhere.herokuapp.com/';
let geolocationTrigger = document.querySelector('#queryLocation');
let placesKey = 'AIzaSyDlTjLdKgz2WmDEFZBqabdsQq5xPevC8dc';

let displayMarkers = (locationsArr) => {
    locationsArr.forEach(location => {
        let placeCoords = location.geometry.location;
        let placeMarker = new google.maps.Marker({position: placeCoords, map: map})
    })
}

let getPlaceResults = (userCoords) => {
    let placesSrc = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userCoords.lat},${userCoords.lng}&radius=20000&keyword='recycling center'&key=${placesKey}`

    fetch(proxy + placesSrc)
        .then((response) => (
            response.json()
        ))

        .then((data) => {
            let locations = data.results;
            console.log('JSON', locations);
            displayMarkers(locations);
        })

        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

let map;
let initMap = (userCoords) => {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: userCoords.lat, lng: userCoords.lng },
    zoom: 11
  });
}

let getUserLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            let coordinates = position.coords;

            let userCoords = {
                lng: coordinates.longitude,
                lat: coordinates.latitude
            }
            
            initMap(userCoords)
            let marker = new google.maps.Marker({position: userCoords, map: map})
            getPlaceResults(userCoords);
            console.log('Coords', userCoords)
        })    
    }
}    

geolocationTrigger.onclick = () => getUserLocation();