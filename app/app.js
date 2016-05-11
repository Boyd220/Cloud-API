//Define an angular module for our app
var sampleApp = angular.module('sampleApp', []); 
//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Home', {
        templateUrl: 'view/home.php',
    }).
      when('/Map', {
        templateUrl: 'view/map.php',
        controller: 'mapController'
      }).
       when('/Login', {
        templateUrl: 'view/login.html'
      }).
      when('/Register', {
        templateUrl: 'view/register.html'
      }).
        when('/Premium', {
        templateUrl: 'premium.php'
      }).
        when('/AddParty',{
          templateUrl: 'view/AddParty.html',
          controller: 'partyController'
        }).
        when('/PartyAgenda',{
          templateUrl:'view/partyAgenda.html'
        }).
      otherwise({
        redirectTo: '/Home'
      });
}]);
 
  
sampleApp.controller('mapController', function($scope) {


      // This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
var style_festival = [
  {
    "featureType": "poi",
    "stylers": [
      { "lightness": 11 },
      { "color": "#fff000" },
      { "visibility": "on" }
    ]
  },{
    "featureType": "road",
    "stylers": [
      { "color": "#000000" },
      { "visibility": "on" }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
      { "color": "#ff0000" },
      { "visibility": "on" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "color": "#37eb17" },
      { "hue": "#005eff" },
      { "visibility": "on" }
    ]
  }
];


//Create the variable for the main map itself.
var map;


      function initAutocomplete() {
        var styled_festival = new google.maps.StyledMapType(style_festival, {name: "Festival style"});

//Create the variables that will be used within the map configuration options.
//The latitude and longitude of the center of the map.
var festivalMapCenter = new google.maps.LatLng(50.7686218, 4.4);
//The degree to which the map is zoomed in. This can range from 0 (least zoomed) to 21 and above (most zoomed).
var festivalMapZoom = 9;
//The max and min zoom levels that are allowed.
var festivalMapZoomMax = 13;
var festivalMapZoomMin = 8;

//These options configure the setup of the map. 
var festivalMapOptions = { 
      center: festivalMapCenter, 
          zoom: festivalMapZoom,
      maxZoom:festivalMapZoomMax,
      minZoom:festivalMapZoomMin,
      //Turn off the map controls as we will be adding our own later.
      panControl: false,
      mapTypeControl: false,
       mapTypeControlOptions: {
        mapTypeIds: [ 'map_styles_festival']
       }
};
map = new google.maps.Map(document.getElementById("map"), festivalMapOptions); 

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

//Assigning the two map styles defined above to the map.
map.mapTypes.set('map_styles_festival', styled_festival);
map.setMapTypeId('map_styles_festival');

//Calls the function below to load up all the map markers and pop-up boxes.
loadMarkers();
        
      }

      function loadMarkers(){

        var ref = new Firebase("https://crackling-torch-6492.firebaseio.com/feestjes");
// Retrieve new posts as they are added to our database
ref.on("child_added", function(snapshot, prevChildKey) {
  var newPost = snapshot.val();
  console.log("Lat: " + newPost.lat);
  


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
});
      };

initAutocomplete();

  });
sampleApp.controller('partyController', function($scope) {

 var myDataRef = new Firebase('https://crackling-torch-6492.firebaseio.com/');
function addP(Adresje){
          var uid = Math.floor((Math.random() * 1000000000000) + 1);
          var feestNaam = $('#feestNaam').val();
          var organisator= $('#organisator').val(); 
          var Latitude = $('#longval').val();
          var Longitude = $('#latval').val();
          var Datum =$('#datum').val();
          var Adres = Adresje;

    myDataRef.child("feestjes").child(uid).set({
      name: feestNaam,
      organisor: organisator,
      lat: Latitude,
      lng: Longitude,
      date:Datum,
      adres: Adres

    
    
    }, function(error, partyData){;
          if (error) 
      {
        console.log("Error creating party:", error);
      } 
      else 
      {
      alert("Party created", partyData)
      }
    });

    var json = (function () { 
            var json = null; 
                $.ajax({ 
                    'async': false, 
                    'global': true, 
                    'url': "http://localhost:3000/", 
                    'dataType': "json", 
                    'success': function (data) {
                     json = data; } }); 
                return json;
         })();
$scope.json = json;
console.log($scope.json);
}



      function geocodeLatLng(geocoder, map, infowindow) {

        var input = document.getElementById('latval').value + "," + document.getElementById('longval').value;
        var latlngStr = input.split(',', 2);
        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])}
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              map.setZoom(11);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              infowindow.setContent(results[1].formatted_address);
              infowindow.open(map, marker);
               
              addP(results[1].formatted_address);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }

var gmapdata;
var gmapmarker;
var infoWindow;

var def_zoomval = 10;
var def_longval = 4.4029;
var def_latval = 51.2192;

function if_gmap_init()
{ var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        document.getElementById('partyAdd').addEventListener('click', function() {
          geocodeLatLng(geocoder, gmapdata, infowindow);
        });
      
  var curpoint = new google.maps.LatLng(def_latval,def_longval);

  gmapdata = new google.maps.Map(document.getElementById("mapitems"), {
    center: curpoint,
    zoom: def_zoomval,
    mapTypeId: 'roadmap'
    });

  gmapmarker = new google.maps.Marker({
          map: gmapdata,
          position: curpoint
        });

  infoWindow = new google.maps.InfoWindow;
  google.maps.event.addListener(gmapdata, 'click', function(event) {
    document.getElementById("longval").value = event.latLng.lng().toFixed(6);
    document.getElementById("latval").value = event.latLng.lat().toFixed(6);
    gmapmarker.setPosition(event.latLng);
  });

  google.maps.event.addListener(gmapmarker, 'click', function() {
    infoWindow.open(gmapdata, gmapmarker);
  });

  document.getElementById("longval").value = def_longval;
  document.getElementById("latval").value = def_latval;

  return false;
} // end of if_gmap_init


function if_gmap_loadpicker()
{
  var longval = document.getElementById("longval").value;
  var latval = document.getElementById("latval").value;

  if (longval.length > 0) {
    if (isNaN(parseFloat(longval)) == true) {
      longval = def_longval;
    } // end of if
  } else {
    longval = def_longval;
  } // end of if

  if (latval.length > 0) {
    if (isNaN(parseFloat(latval)) == true) {
      latval = def_latval;
    } // end of if
  } else {
    latval = def_latval;
  } // end of if

  var curpoint = new google.maps.LatLng(latval,longval);

  gmapmarker.setPosition(curpoint);
  gmapdata.setCenter(curpoint);
  //gmapdata.setZoom(zoomval);

  return false;
} // end of if_gmap_loadpicker

if_gmap_init();
  
});



