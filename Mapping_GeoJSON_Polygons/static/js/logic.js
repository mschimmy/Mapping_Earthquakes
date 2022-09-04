// Add console.log to check to see if the code is working
console.log("working");

// Create the light tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the dark view tile layer that will be an option for our map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Create a base layer that holds both maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with a center and zoom level
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
})
// another way of creating the map
// let map = L.map('mapid').setView([30, 30], 2);

// Add only one map layer
// streets.addTo(map);

// Pass the map layers into the layers control
// and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the routes GeoJSON URL from GitHub repo
let torontoNeighborhoods = "https://raw.githubusercontent.com/mschimmy/Mapping_Earthquakes/main/torontoNeighborhoods.json";

//Create a style for the lines
let myStyle = {
    color: "blue",
    weight: 1,
    fillColor: "yellow"
};

// Grabbing the GeoJSON data
d3.json(torontoNeighborhoods).then(function(data) {
    console.log(data),
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        // set the line style
        style: myStyle,
        // Loop through the airportData and create a marker for each airport
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h2>Neighborhood Name: " + feature.properties.AREA_NAME + "</h2>");
        }
    })
    .addTo(map);
});