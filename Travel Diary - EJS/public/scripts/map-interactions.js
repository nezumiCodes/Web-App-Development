// Initialise the map object
let map = L.map('map',
                {
                    center: [51.505, -0.09],
                    zoom: 13
                });
                
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


// Render markers and their popups from the database
fetch('/')
.then(response => response.json())
.then(locations => {
    locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng]);
        marker.bindPopup(location.name, location.desc);
    });
})
.catch(err => {
    console.log('Error fetching location data: ', err);
});

// Generate a marker with a popup and on-click popups on the map
// let marker = L.marker([51.505, -0.09]).addTo(map);
// marker.bindPopup('Example');

// let popup = L.popup();

// map.on('click', (e) => {
//     popup.setLatLng(e.latlng)
//             .setContent('You clicked on the map! ' + e.latlng.toString())
//             .openOn(map);
// });

map.on('click', (e) => {
    let popup = L.popup()
                 .setLatLng(e.latlng)
                 .setContent(`
                    <form id="popup-form">
                        <label for="loc-name">Name: </label>
                        <input type="text" name="loc-name" id="loc-name" required />
                        <label for="loc-desc">Description: </label>
                        <input type="text" name="loc-desc" id="loc-desc" />
                        <button type="button" id="loc-submit">Submit</button>
                    </form>
                 `)
                 .openOn(map);

    // Create an event listener to handle the popup form submission
    document.getElementById('loc-submit').addEventListener('click', () => {
        const locName = document.getElementById('loc-name').value;
        const locDesc = document.getElementById('loc-desc').value;
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        console.log(locName, locDesc);

        // AJAX --> fetch --> contact the '/' endpoint in order to POST the client data and 
        // store them in the database
        fetch("/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({lat, lng, locName, locDesc})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        })
        .catch(err => {
            console.error(err);
        });

        // Close the popup form window after the submission
        map.closePopup(popup);
    });
});


