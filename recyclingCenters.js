const proxy = 'https://cors-anywhere.herokuapp.com/';
let geolocationTrigger = document.querySelector('#queryLocation');
let placesKey = 'AIzaSyDlTjLdKgz2WmDEFZBqabdsQq5xPevC8dc';

let displayMarkers = (locationsArr) => {
    locationsArr.forEach(location => {
        let placeCoords = location.geometry.location;

        let contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    `<h1 id="firstHeading" class="firstHeading">${location.name}</h1>` +
    '<div id="bodyContent">' +
    `<p> <a href=https://www.google.com/maps/@${placeCoords.lng},${placeCoords.lat}> Location </a>` +
    `<br> ${location.vicinity}.</p>` +
    "</div>" +
    "</div>";

        let infoWindow = new google.maps.InfoWindow({content: contentString})

        let placeMarker = new google.maps.Marker({position: placeCoords, map: map, title:'Test Title'})

        placeMarker.addListener('click', () => {
            infoWindow.open(map, placeMarker);
        })
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

        .catch(() => console.log("Can’t access " + placesSrc + " response. Blocked by browser?"))
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

window.onload = () => getUserLocation();
geolocationTrigger.onclick = () => getUserLocation();