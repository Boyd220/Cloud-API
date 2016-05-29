var feestApp = angular.module('feestApp', []); 
var myDataRef = new Firebase('https://crackling-torch-6492.firebaseio.com/');
var authenticated;
feestApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Map', {
        templateUrl: 'view/map.php',
        controller: 'mapController'
      }).
       when('/Login', {
        templateUrl: 'view/login.html',
        controller: 'userAuthController'
      }).
        when('/Premium', {
        templateUrl: 'view/premium.php'
      }).
        when('/AddParty',{
          templateUrl: 'view/AddParty.html',
          controller: 'partyController'
        }).
        when('/PartyAgenda',{
          templateUrl:'view/partyAgenda.html'
        }).        
        when('/Eventlist',{
          templateUrl:'view/allEvents.html'
        }).
      otherwise({
        redirectTo: '/Map'
      });
}]);
 
  feestApp.controller('userAuthController', function($scope){

          $('#id').on('click', function()
          {
            myDataRef.authWithOAuthPopup("facebook", function(error, authData) 
            {
              if (error) 
              {
                console.log("Login Failed!", error);
              } 
              else 
              {
                console.log("Authenticated successfully with payload:", authData);
                    alert("Logged in with facebook!" );
                    authenticated =true;
              }
          });
        });
          myDataRef.onAuth(authDataCallback);
      $('#passwordInput1').keypress(function (e) {
        if (e.keyCode == 13) {
          var email = $('#emailInput1').val();
          var password = $('#passwordInput1').val();
          myDataRef.createUser({email: email, password: password}, 

            function (error, userData){             
      if (error) 
      {
        console.log("Error creating user:", error);
      } 
      else 
      {
      console.log("Successfully created user account with uid:", userData.email);
         alert("Logged in with email");

      }

          });
        }      
      });

      function authDataCallback(authData) 
      {
        if (authData) 
        {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        authenticated=true;
        } 
        else 
        {
          console.log("User is logged out");
        }
      }

      $("#logout").on("click", function()
      {
        myDataRef.unauth();
        alert("Logged out");
      });

      $('#passwordInput').keypress(function (e) {
        if (e.keyCode == 13) {
          var email = $('#emailInput').val();
          var password = $('#passwordInput').val(); 
          myDataRef.authWithPassword({email: email, password: password}, 
    function (error, authData){             
      if (error) 
      {
        switch (error.code) {
      case "INVALID_EMAIL":
      alert("The specified user account email is invalid.");
        console.log("The specified user account email is invalid.");
        break;
      case "INVALID_PASSWORD":
      alert("The specified user account password is incorrect.");
        console.log("The specified user account password is incorrect.");
        break;
      case "INVALID_USER":
      alert("The specified user account does not exist.");
        console.log("The specified user account does not exist.");
        break;
      default:
      alert("Error logging user in:", error);
        console.log("Error logging user in:", error);
    }
      } 
      else 
      {
        console.log("successfully Authenticated", authData);
          myDataRef.once("value", function(snapshot) 
          {
          var b = snapshot.child("users").child(authData.uid).exists();
          newUser(b);
          });
        }
    });
  }      
});


function newUser(newU){
myDataRef.onAuth(function(authData) {
  if (authData && newU==false) {

    myDataRef.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: getName(authData)
    });
    console.log(authData);
  }
});
}

function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
       case 'facebook':
       return authData.facebook.displayName;
  }
  alert(authData.name);
}

})
feestApp.controller('mapController', function($scope) {

var map;


      function initAutocomplete() {

var festivalMapCenter = new google.maps.LatLng(50.7686218, 4.4);
var festivalMapZoom = 9;
var festivalMapZoomMax = 13;
var festivalMapZoomMin = 8;

var festivalMapOptions = { 
      center: festivalMapCenter, 
          zoom: festivalMapZoom,
      maxZoom:festivalMapZoomMax,
      minZoom:festivalMapZoomMin,
      panControl: false,
      mapTypeControl: false
};
map = new google.maps.Map(document.getElementById("map"), festivalMapOptions); 

var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }



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
loadMarkers();
        
      }

function loadMarkers()
{
  /*
  Helaas werkt dit stuk code niet naar behoren. Hij zou mijn firebase uit moeten lezen en van ieder feestje een marker moeten voorzien maar weigert dit. Hieronder is mijn laatste poging.
  Ik begrijp helaas niet goed wat er fout aan is.
  
var D = document.getElementById("datumAgendaMap").value();
*/
myDataRef.child('feestjes').child("date").child("2016-08-19").on("value", function(snapshot){
  var data = snapshot.val();
  var lng = data.lng;
  var lat = data.lat;
  var title = data.name;
var position = lat+","+lng;
 var latlngStr =position.split(',', 2);
 var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])}
var markerpositionCustom = new google.maps.LatLng(latlng.lat, latlng.lng);

var markerShapeCustom = {
 coord: [12,4,216,22,212,74,157,70,184,111,125,67,6,56],
 type: 'poly'
};
markerpositionCustom = new google.maps.Marker({
  position: markerpositionCustom,
  map:map,
  title: title,
  shape: markerShapeCustom,
  zindex: 102
});
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
      };

initAutocomplete();

  });


var count =0;
feestApp.controller('partyController', function($scope) {

$scope.partyDelete = function(Datum){
myDataRef.child("feestjes").child("date").child(Datum).remove();
};

var bestaat;
function addParty(Adresje)
  {
          var feestNaam = $('#feestNaam').val();
          var organisator= $('#organisator').val(); 
          var Latitude = $('#longval').val();
          var Longitude = $('#latval').val();
          var Datum =$('#datum').val();
          var Adres = Adresje;

          myDataRef.once("value", function(snapshot) {
          bestaat = snapshot.child("feestjes").child(Datum).exists();
                  if (bestaat) 
                  {
                    count++;
                  myDataRef.child("feestjes").child("date").child(Datum+" " + totaal).set({
                  name: feestNaam,
                  date: Datum,
                  organisor: organisator,
                  lat: Latitude,
                  lng: Longitude,
                  adres: Adres               
                },

                function(error, partyData)
                    {
                      if (error) 
                      {
                        console.log("Error creating party:", error);
                      } 
                      else 
                      {
                      alert("Party created", partyData)
                      }
                    });
                  }

                  if(!bestaat)
                  {
                        myDataRef.child("feestjes").child("date").child(Datum).set({
                  name: feestNaam,
                  date:Datum,
                  organisor: organisator,
                  lat: Latitude,
                  lng: Longitude,
                  adres: Adres
                  }, 

                function(error, partyData)
                {
                      if (error) 
                  {
                    console.log("Error creating party:", error);
                  } 
                  else 
                  {
                  alert("Party created", partyData)
                  }
                });
                  }
            });
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
               
              addParty(results[1].formatted_address);
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
{ 
  var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        document.getElementById('partyAdd').addEventListener('click', function() {
          geocodeLatLng(geocoder, gmapdata, infowindow);
        });
        $('#organisator').keypress(function (e) {
        if (e.keyCode == 13) 
        {
           geocodeLatLng(geocoder, gmapdata, infowindow);
         }
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



