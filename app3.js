 // This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51, lng: 4.4029},
          zoom: 9,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });


var markerPositionDour = new google.maps.LatLng(50.39583, 3.77792);


var markerIconDour = {
 url: 'images/dour.png',
 //The size image file.
 size: new google.maps.Size(125, 120),
 //The point on the image to measure the anchor from. 0, 0 is the top left.
 origin: new google.maps.Point(0, 0),
 //The x y coordinates of the anchor point on the marker. e.g. If your map marker was a drawing pin then the anchor would be the tip of the pin.
 anchor: new google.maps.Point(189, 116)
};


var markerShapeDour = {
 coord: [12,4,216,22,212,74,157,70,184,111,125,67,6,56],
 type: 'poly'
};


markerDour = new google.maps.Marker({
 //uses the position set above.
 position: markerPositionDour,
 //adds the marker to the map.
 map: map,
 title: 'Dour Festival',
 //assigns the icon image set above to the marker.
 icon: markerIconDour,
 //assigns the icon shape set above to the marker.
 shape: markerShapeDour,
 //sets the z-index of the map marker.
 zIndex:102
});

var markerPositionGMM = new google.maps.LatLng(51.2333, 5.1167);


var markerIconGMM = {
 url: 'images/gmm.png',
 //The size image file.
 size: new google.maps.Size(125, 120),
 //The point on the image to measure the anchor from. 0, 0 is the top left.
 origin: new google.maps.Point(0, 0),
 //The x y coordinates of the anchor point on the marker. e.g. If your map marker was a drawing pin then the anchor would be the tip of the pin.
 anchor: new google.maps.Point(189, 116)
};


var markerShapeGMM = {
 coord: [12,4,216,22,212,74,157,70,184,111,125,67,6,56],
 type: 'poly'
};


markerGMM = new google.maps.Marker({
 //uses the position set above.
 position: markerPositionGMM,
 //adds the marker to the map.
 map: map,
 title: 'Graspop metal meeting',
 //assigns the icon image set above to the marker.
 icon: markerIconGMM,
 //assigns the icon shape set above to the marker.
 shape: markerShapeGMM,
 //sets the z-index of the map marker.
 zIndex:102
});

var markerPositionPKP = new google.maps.LatLng(50.93069, 5.33248);


var markerIconPKP = {
 url: 'images/pkp.png',
 //The size image file.
 size: new google.maps.Size(125, 120),
 //The point on the image to measure the anchor from. 0, 0 is the top left.
 origin: new google.maps.Point(0, 0),
 //The x y coordinates of the anchor point on the marker. e.g. If your map marker was a drawing pin then the anchor would be the tip of the pin.
 anchor: new google.maps.Point(189, 116)
};


var markerShapePKP = {
 coord: [12,4,216,22,212,74,157,70,184,111,125,67,6,56],
 type: 'poly'
};


markerPKP = new google.maps.Marker({
 //uses the position set above.
 position: markerPositionPKP,
 //adds the marker to the map.
 map: map,
 title: 'Pukkelpop festival',
 //assigns the icon image set above to the marker.
 icon: markerIconPKP,
 //assigns the icon shape set above to the marker.
 shape: markerShapePKP,
 //sets the z-index of the map marker.
 zIndex:102
});

var markerPositionReggae = new google.maps.LatLng(51.115837, 4.98786);


var markerIconReggae= {
 url: 'images/reggae.png',
 //The size image file.
 size: new google.maps.Size(125, 120),
 //The point on the image to measure the anchor from. 0, 0 is the top left.
 origin: new google.maps.Point(0, 0),
 //The x y coordinates of the anchor point on the marker. e.g. If your map marker was a drawing pin then the anchor would be the tip of the pin.
 anchor: new google.maps.Point(189, 116)
};


var markerShapeReggae = {
 coord: [12,4,216,22,212,74,157,70,184,111,125,67,6,56],
 type: 'poly'
};


markerReggae = new google.maps.Marker({
 //uses the position set above.
 position: markerPositionReggae,
 //adds the marker to the map.
 map: map,
 title: 'Reggae Geel',
 //assigns the icon image set above to the marker.
 icon: markerIconReggae,
 //assigns the icon shape set above to the marker.
 shape: markerShapeReggae,
 //sets the z-index of the map marker.
 zIndex:102
});

var markerPositionRW = new google.maps.LatLng(50.952207,  4.716948);


var markerIconRW= {
 url: 'images/rw.png',
 //The size image file.
 size: new google.maps.Size(125, 120),
 //The point on the image to measure the anchor from. 0, 0 is the top left.
 origin: new google.maps.Point(0, 0),
 //The x y coordinates of the anchor point on the marker. e.g. If your map marker was a drawing pin then the anchor would be the tip of the pin.
 anchor: new google.maps.Point(189, 116)
};


var markerShapeRW = {
 coord: [12,4,216,22,212,74,157,70,184,111,125,67,6,56],
 type: 'poly'
};


markerRW = new google.maps.Marker({
 //uses the position set above.
 position: markerPositionRW,
 //adds the marker to the map.
 map: map,
 title: 'Rock Werchter festival',
 //assigns the icon image set above to the marker.
 icon: markerIconRW,
 //assigns the icon shape set above to the marker.
 shape: markerShapeRW,
 //sets the z-index of the map marker.
 zIndex:102
});
      }


