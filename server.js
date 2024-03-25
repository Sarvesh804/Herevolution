// server.js

const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

// Read the CSV file containing marker coordinates
fs.readFile('monuments.csv', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading markers data:', err);
        return;
    }

    // Parse CSV data
    const markersArray = parseCSV(data);

    // Add markers to the map
    addMarkers(markersArray);
});

// Function to parse CSV data into an array
function parseCSV(data) {
    const lines = data.split('\n');
    const markersArray = [];
    lines.forEach((line) => {
        const values = line.split(',');
        const latitude = parseFloat(values[0]); // Assuming latitude is in the first column
        const longitude = parseFloat(values[1]); // Assuming longitude is in the second column
        if (!isNaN(latitude) && !isNaN(longitude)) {
            markersArray.push({ lat: latitude, lng: longitude });
        }
    });
    return markersArray;
}

// Function to add markers to the map
function addMarkers(markersArray) {
    markersArray.forEach((markerData) => {
        const marker = new H.map.Marker(markerData);
        map.addObject(marker);
    });
}

// Serve static files from the React app
app.use(express.static(__dirname));

app.get('/home',(req,res)=>{
    return res.sendFile(__dirname+'/index.html');
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});