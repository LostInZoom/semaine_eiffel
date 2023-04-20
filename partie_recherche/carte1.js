document.getElementById("E1").onclick = function() {debut1()};

var but = document.getElementById("but");
var map;
var raster = new ol.layer.Tile({
  source: new ol.source.OSM(),

});
var valeur_input
/* Déclaration des couches*/
var couches = [raster]; 
var zoom_couche = 12;  
var interval;
var tab= [];
var id_particiapant;
/* Déclaration de la carte */
var numero_candidat = 0;



function fin(){
  clearInterval(interval);

  let csvContent = "data:text/csv;charset=utf-8," +"time,zoom,xmin,ymin,xmax,ymax\n"
    + tab.map(e => e.join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  let nom = "resultat_carte_" + numero_candidat +".csv"
  link.setAttribute("download", nom);
  document.body.appendChild(link); 
  link.click();
  
  but.innerHTML = "votre numero de candidat est " + numero_candidat;



}



function ajout(){
  let date = Date.now()
  let zoom = map.getView().getZoom();
  let coord = map.getView().calculateExtent(map.getSize()); 
  tab.push([date,zoom,coord])
}


  

function debut1() {
  but.removeChild(document.getElementById("E1"));
  valeur_input = document.getElementById("valeur_input").value
  but.removeChild(document.getElementById("valeur_input"));
  but.innerHTML ="";
 
  map = new ol.Map({
    /* Appel des couches de la carte */
    layers: couches,
    /* Cible de la div map */
    target: 'map',
    /* Caractéristiques de la vue de la carte */
    view: new ol.View({
        center: ol.proj.fromLonLat([2.3383,48.8848]),
        zoom: zoom_couche
    })
  });
  var r='<button id="fin" onclick="fin()">Fin</button>';
  interval = setInterval(ajout, 100) ;
  $("#but").append(r);


  data = {value : valeur_input}

  fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }).then(res=>res.text()).then(data=> numero_candidat = data );

  

}






 
