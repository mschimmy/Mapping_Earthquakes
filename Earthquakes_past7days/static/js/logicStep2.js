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
    center: [39.5, -98.5],
    zoom: 3,
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
let earthquakes7Days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Retrieve the earthquake GeoJSON data
d3.json(earthquakes7Days).then(function(data) {
    // Creating a GeoJSON layer witht the retrieved data.
    L.geoJSON(data, {
        // Turn each feature into a circleMarker on the map
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
    // Set the style for each circleMarker using the styleInfo function.
    style: styleInfo
    }).addTo(map);
});

// Csreate a function that returns the style data for each of the earthquakes plotted on the map.
// Pass the magnitude of the earthquake into a function to calculate the radius.
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(),
        stroke: true,
        weight:0.5
    };
}

// Create a function to determine the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}