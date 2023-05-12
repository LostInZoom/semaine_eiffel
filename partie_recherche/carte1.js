document.getElementById("E1").onclick = function() {debut1()};

var but = document.getElementById("but");
var map;

var valeur_input;
var valeur_map;
var zoom_couche = 12;  
var interval;
var tab= [];
var id_particiapant;
/* Déclaration de la carte */
var numero_candidat = 0;
var etape =1;
/* Déclaration des couches*/


var raster = new ol.layer.Tile({
  // Preload infinity c'est pour éviter d'avoir des espaces blancs quand tu navigues sur la carte,
  // À la place, tu as des images pixelisés des données (à voir ce que tu préfères, tu peux l'enlever sinon)
  //preload: "Infinity",
  source: new ol.source.WMTS({
      url: "https://wxs.ign.fr/decouverte/geoportail/wmts",
      layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
      matrixSet: "PM",
      format: "image/png",
      style: "normal",
      dimensions: [256, 256],
      requestEncoding: "KVP",
      tileGrid: new ol.tilegrid.WMTS({
          origin: [-20037508, 20037508],
          resolutions: [
              156543.03392804103, 78271.5169640205, 39135.75848201024, 19567.879241005125, 9783.939620502562,
              4891.969810251281, 2445.9849051256406, 1222.9924525628203, 611.4962262814101, 305.74811314070485,
              152.87405657035254, 76.43702828517625, 38.218514142588134, 19.109257071294063, 9.554628535647034,
              4.777314267823517, 2.3886571339117584, 1.1943285669558792, 0.5971642834779396, 0.29858214173896974,
              0.14929107086948493, 0.07464553543474241
          ],
          matrixIds: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
      })
  }),

})
/* Déclaration de la source de la couche en format WMS */
var source_eiffel_agregation_surfacique = new ol.source.TileWMS({
  /* Chargement du lien WMS */
  url: 'http://serveur-carto:8080/geoserver/experience_Eiffel/wms',
  /* Chargement de l'espace de travail : couche */
  params: {'LAYERS': 'experience_Eiffel:eiffel_agregation_surfacique', 'TILED': false},
  serverType: 'geoserver'
})
/* Déclaration de la couche WMS */
var eiffel_agregation_surfacique = new ol.layer.Tile({ source: source_eiffel_agregation_surfacique});

/* Déclaration de la source de la couche en format WMS */
var source_eiffel_agregation_ponctuel = new ol.source.TileWMS({
  /* Chargement du lien WMS */
  url: 'http://serveur-carto:8080/geoserver/experience_Eiffel/wms',
  /* Chargement de l'espace de travail : couche */
  params: {'LAYERS': 'experience_Eiffel:eiffel_agregation_ponctuel', 'TILED': false},
  serverType: 'geoserver'
})
/* Déclaration de la couche WMS */
var eiffel_agregation_ponctuel = new ol.layer.Tile({ source: source_eiffel_agregation_ponctuel});

/* Déclaration de la source de la couche en format WMS */
var source_eiffel_agregation_total = new ol.source.TileWMS({
  /* Chargement du lien WMS */
  url: 'http://serveur-carto:8080/geoserver/experience_Eiffel/wms',
  /* Chargement de l'espace de travail : couche */
  params: {'LAYERS': 'experience_Eiffel:eiffel_agregation_total', 'TILED': false},
  serverType: 'geoserver'
})
/* Déclaration de la couche WMS */
var eiffel_agregation_total = new ol.layer.Tile({ source: source_eiffel_agregation_total});

var couches = [raster]; 
var coord_line = [[265764.21653641643934,6255759.270309959538281],
[266751.600597481767181,6256158.219875103794038],
[267001.024639017647132,6255384.81199437007308],
[ 267496.005682686460204, 6254724.837269478477538 ],
[ 268011.610936508164741, 6254477.346747644245625 ], 
[ 268382.846719259745441, 6253590.505711071193218 ], 
[ 268671.585661399876699, 6252373.677312051877379 ], 
[ 268688.503958785324357, 6251467.662205118685961 ], 
[ 268745.22053670551395, 6250931.432741145603359 ], 
[ 268724.596326552738901, 6250694.254324388690293 ], 
[ 268719.440274014545139, 6250240.521701026707888 ], 
[ 268755.532641781901475, 6250023.967494422569871 ], 
[ 268879.277902698726393, 6249637.263554058037698 ], 
[ 268858.653692545951344, 6249443.911583875305951 ], 
[ 268815.955132469942328, 6249135.676318051293492 ], 
[ 268787.757970145554282, 6248894.791988557204604 ],
[ 266998.607739389990456, 6249139.70448412001133 ], 
[ 266666.042350676027127, 6249183.530930695123971 ],
[ 265786.935392912826501, 6249384.6169796846807 ], 
[ 265418.277636431448627, 6249472.269872833974659 ],
[ 265227.503692517930176, 6249492.894082985818386 ], 
[ 264955.521921127859969, 6249523.83039821498096 ], 
[ 264900.094356342218816, 6249532.853490157052875 ], 
[ 264805.996397520066239, 6249558.633752848021686 ], 
[ 264619.089493010309525, 6249626.951448978856206 ], 
[ 264438.627654173236806, 6249690.113092570565641 ], 
[ 264258.165815336222295, 6249761.008814970962703 ], 
[ 264060.946805750078056, 6249843.5056555820629 ],
[ 263988.762070215248968, 6249892.488154695369303 ],
[ 263941.068584236898459, 6249929.869535597972572 ], 
[ 263861.149769894778728, 6250004.632297402247787 ], 
[ 263795.410100032750051, 6250011.077363074757159 ], 
[ 263786.387008090910967, 6250032.990586361847818 ], 
[ 263755.450692861690186, 6250052.970289949327707 ], 
[ 263726.447897334292065, 6250055.548316217958927 ], 
[ 263712.268752854259219, 6250129.022064887918532 ], 
[ 263641.37303045403678, 6250520.882057790644467 ], 
[ 263545.986058497335762, 6251152.498493720777333 ], 
[ 263458.333165347925387, 6251683.57190515473485 ], 
[ 263252.091063819883857, 6252196.599132706411183 ], 
[ 263236.62290620530257, 6252297.142157200723886 ], 
[ 263176.683795448741876, 6252359.659294228069484 ], 
[ 262528.954695337393787, 6253472.399882627651095 ], 
[ 262556.023971162969247, 6253561.341788911260664 ], 
[ 262601.139430872222874, 6253658.017774002626538 ], 
[ 262629.497719832288567, 6253705.711259980686009 ], 
[ 262648.832916850573383, 6253722.468430729582906 ], 
[ 262706.838507905311417, 6253772.739942977204919 ], 
[ 262767.422125229204539, 6253833.323560301214457 ], 
[ 262938.860872124321759, 6254267.720986644737422 ], 
[ 262959.485082277096808, 6254306.391380680724978 ], 
[ 263036.825870350119658, 6254395.333286964334548 ], 
[ 263359.079153987637255, 6254798.149891511537135 ], 
[ 263989.084323499060702, 6255047.573933045379817 ], 
[ 265128.57193444139557, 6255501.306556408293545 ], 
[ 265764.53878970007645, 6255759.270309958606958 ] ]

function fin(){
  raster.setVisible(!raster.getVisible());
  eiffel_agregation_surfacique.setVisible(!eiffel_agregation_surfacique.getVisible());  
  eiffel_agregation_ponctuel.setVisible(!eiffel_agregation_ponctuel.getVisible());  
  eiffel_agregation_total.setVisible(!eiffel_agregation_total.getVisible());  

  clearInterval(interval);

  let csvContent = "data:text/csv;charset=utf-8," +"time,zoom,xmin,ymin,xmax,ymax\n"
    + tab.map(e => e.join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  let nom = "resultat_carte_" + numero_candidat +"_etape_"+etape+"_"+valeur_map+".csv"
  link.setAttribute("download", nom);
  document.body.appendChild(link); 
  link.click();
  if (etape == 2){
    map.removeLayer(line)
    but.innerHTML = "votre numero de candidat est " + numero_candidat;
  }



}


  var style_line = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      width: 3,
    })

  })


var line = new ol.layer.Vector({
  source: new ol.source.Vector({
      features: [
          new ol.Feature({
              geometry: new ol.geom.LineString(coord_line)
          })
      ]
  }),
  style : style_line
});



function ajout(){
  let date = Date.now()
  let zoom = map.getView().getZoom();
  let coord = map.getView().calculateExtent(map.getSize()); 
  tab.push([date,zoom,coord])
  
}


function etape2(){ 
  but.removeChild(document.getElementById("etape2"));
  etape +=1;
  raster.setVisible(!raster.getVisible());
  eiffel_agregation_surfacique.setVisible(!eiffel_agregation_surfacique.getVisible());  
  eiffel_agregation_ponctuel.setVisible(!eiffel_agregation_ponctuel.getVisible());  
  eiffel_agregation_total.setVisible(!eiffel_agregation_total.getVisible());  
  map.getView().setCenter(ol.proj.fromLonLat([2.3383,48.8848]));
  map.getView().setZoom(zoom_couche);
  setTimeout(fin,120000)
  interval = setInterval(ajout, 100) ;
  map.addLayer(line)


}

function fin_e1(){
  console.log("cc")
  but.removeChild(document.getElementById("fin_e1"));
  var r=$('<button id="etape2" onclick="etape2()">Etape 2</button>');
  $("#but").append(r);
  fin()

  // document.getElementById("map").style.visibility == 'hidden';
}

function debut1() {
  but.removeChild(document.getElementById("E1"));
  valeur_input = document.getElementById("valeur_input").value;

  

  var radios = document.getElementsByName('scenario');
  for(var i = 0; i < radios.length; i++){
   if(radios[i].checked){
    valeur_map = radios[i].value;
   }
  }
  console.log(valeur_map)

  but.innerHTML ="";
  if(valeur_map == "B"){
    couches.push(eiffel_agregation_surfacique)
  }else if(valeur_map == "C"){
    couches.push(eiffel_agregation_ponctuel)
  }else if(valeur_map == "D"){
    couches.push(eiffel_agregation_total)
  }
 
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

  var r=$('<button id="fin_e1" onclick="fin_e1()">Fin Etape 1</button>');
  interval = setInterval(ajout, 100) ;
  $("#but").append(r);


  data = {value : valeur_input.toString().concat('_',valeur_map)}

  fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }).then(res=>res.text()).then(data=> numero_candidat = data );

  

}






 
