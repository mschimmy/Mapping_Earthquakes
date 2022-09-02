// Add console.log to check to see if the code is working
console.log("working")

// Create the map object with a center and zoom level.
// SFO as center of map
let map = L.map('mapid').setView([37.6213, -122.3790], 5);


// another way of formatting the map variable
// let map = L.map("mapid", {
//     center: [
//      37.6213, -122.3790
//     ],
//     zoom: 7
// });

// Coordinates for each point to be used in the line
let line = [
    // coordinates for LAX
    [33.9416, -118.4085],
    // coordinates for SFO
    [37.6213, -122.3790],
    // coordinates for SLC
    [40.7899, -111.9791],
    // coordinates for SEA
    [47.4502, -122.3088]
];

// Create a polyline using the line coordinates and make the line red
L.polyline(line, {
    color: "yellow"
}).addTo(map);


// Create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Add the 'graymap' tile layer to the map.
streets.addTo(map);