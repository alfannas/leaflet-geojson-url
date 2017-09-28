

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var map = L.map('map')
  .addLayer(tiles);

var markers = L.markerClusterGroup({
  animateAddingMarkers: true,
  maxClusterRadius: 30,
  singleMarkerMode: false,
});

var customOptions = {
  'maxWidth': '180',
  'maxHeight': '300',
  'className': 'custom'
};

function eachfitur(feature, layer) {
    var popUpContent = "";
    popUpContent += "<h3>Name</h3>" + feature.properties.title + "<br/>";
    popUpContent += "<h3>Description</h3>" + feature.properties.body;
    popUpContent += feature.properties.color;
    layer.bindPopup(popUpContent, customOptions);
    
  }

$.ajax({
    type: "POST",
    url: "https://www.acccrn.net/sites/api/?content=map",
    dataType: 'json',
    success: function (response) {

        geojsonLayer = L.geoJson(response, {
            onEachFeature: eachfitur
        });
        
        markers.addLayer(geojsonLayer);
				map.addLayer(markers);
				map.fitBounds(markers.getBounds());
    }
});
