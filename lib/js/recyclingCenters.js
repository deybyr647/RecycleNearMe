const proxy = 'https://deybyr647-cors-anywhere.herokuapp.com/';
let geolocationTrigger = document.querySelector('#queryLocation');
let placesKey = 'AIzaSyD5TYxI5yg7zRiJKWGyqm7P3a7ubq2ngUg';

let capitalizeStr = (str) => {
    let splitStr = str.toLowerCase().split(' ');
    for(let l = 0; l < splitStr.length; l++){
        splitStr[l] = splitStr[l].charAt(0).toUpperCase() + splitStr[l].substring(1);
    }

    return splitStr.join(' ');
}

let openStatus = (key) => {
    let text;
    if(key !== undefined){
        if(key.open_now == true){
            text = 'Yes';
        } else{
            text = 'No'
        }
    } else {
        text = 'Unknown'
    }

    return text;
}

let displayMarkers = (locationsArr) => {

    locationsArr.forEach(location => {
        let placeCoords = location.geometry.location;

        let contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    `<h1 id="firstHeading" class="firstHeading">${location.name}</h1>` +
    '<div id="bodyContent">' +
    `<p>` +
    `Status: ${capitalizeStr(location.business_status)} <br>
    Address: ${location.vicinity} <br> Open Now? ${openStatus(location.opening_hours)}</p>` +
    "</div>" +
    "</div>";

        let infoWindow = new google.maps.InfoWindow({content: contentString})

        let placeMarker = new google.maps.Marker({position: placeCoords, map: map, title:`${location.name}`, icon: 'assets/favicon.png'})

        placeMarker.addListener('click', () => {
            infoWindow.open(map, placeMarker);
        })
    })
}

let getPlaceResults = (userCoords) => {
    let placesSrc = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userCoords.lat},${userCoords.lng}&radius=20000&keyword='recycling center'&key=${placesKey}`;

    fetch(proxy + placesSrc)
        .then((response) => (
            response.json()
        ))

        .then((data) => {
            let locations = data.results;
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
        })    
    }
}    

window.onload = () => getUserLocation();
geolocationTrigger.onclick = () => getUserLocation();
