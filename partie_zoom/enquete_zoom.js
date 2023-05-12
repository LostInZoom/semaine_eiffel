var data = [
    {"interaction" : 1,   // numero de l'interaction
    "center" : [2.3622645, 48.8318225],//Long,lat
    "zoom" :  19
    }, // fdc
    
    {"interaction" : 2,
    "center" : [2.3008018,48.846361],
    "zoom" :  19
    },
  
    {"interaction" : 3,
    "center" : [2.407118,48.8694982],
    "zoom" :  19
    },
  
    {"interaction" : 4,   
    "center" : [ 2.384213, 48.8570909],
    "zoom" :19
    },
  
    {"interaction" : 5,
    "center" : [ 2.3234571, 48.8308232],
    "zoom" :19,
    },
  
   
  ];
  
  var tab= [];
  var etape_suiv;
  var interval_ajout;
  var numero_enquete;
  var etape;
  var zoom;
  var centre;
  var but = document.getElementById("but");
  var map;
  var liste_scenario = ["A","B","C","D"];
  var etape_lettre = 0;
  // initialisation des fond de carte OSM et géoportail 
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

var style_point = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 5,
    fill: new ol.style.Fill({
      color: 'blue',
    }),
  })
})




  var liste_epingle =[]
  for(let i=0;i<data.length ; i++){
    liste_epingle.push( new ol.layer.Vector({
      source: new ol.source.Vector({
          features: [
              new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat(data[i]["center"]))
              })
          ]
      }),
      style : style_point
    }))
  }
  document.getElementById("E1").onclick = function() {debut()};


  /* Déclaration des couches*/
  var couches = [raster]; 
    

  function etape_suivante(){
    

    map.removeLayer(liste_epingle[etape])
    if(etape < data.length-1 ){
      etape +=1;  
    }else{
      etape =0; 
    }

    if(etape_lettre < liste_scenario.length-1 ){
      etape_lettre +=1;  
    }else{
      etape_lettre =0; 
    }
    scenario = liste_scenario[etape_lettre]
    if(scenario == "B"){
      map.addLayer(eiffel_agregation_surfacique)
      map.removeLayer(eiffel_agregation_total)
      map.removeLayer(eiffel_agregation_ponctuel)
    }else if(scenario == "C"){
      map.addLayer(eiffel_agregation_ponctuel)
      map.removeLayer(eiffel_agregation_total)
      map.removeLayer(eiffel_agregation_surfacique)
    }else if(scenario == "D"){
      map.addLayer(eiffel_agregation_total)
      map.removeLayer(eiffel_agregation_ponctuel)
      map.removeLayer(eiffel_agregation_surfacique)
    }else{
      map.removeLayer(eiffel_agregation_total)
      map.removeLayer(eiffel_agregation_ponctuel)
      map.removeLayer(eiffel_agregation_surfacique)

    }
   

    alert('Merci de donner le numéro ' +etape +" et la lettre "+scenario)
    map.addLayer(liste_epingle[etape])
    console.log(etape)
    centre = ol.proj.fromLonLat(data[etape]["center"]);
    zoom = data[etape]["zoom"];
    map.getView().setCenter(centre);
    map.getView().setZoom(zoom);
  }
  
  function debut() {
    but.removeChild(document.getElementById("E1"));


    etape = 0;
    scenario = liste_scenario[0];    
    alert('Blabla consentement' +' Merci de donner le numéro ' +etape +" et la lettre "+scenario)
    zoom = data[etape]["zoom"];
    centre = ol.proj.fromLonLat(data[etape]["center"]);


    map = new ol.Map({
      /* Appel des couches de la carte */
      layers: couches,
      /* Cible de la div map */
      target: 'map',
      /* Caractéristiques de la vue de la carte */
      view: new ol.View({
          center: centre,
          zoom: zoom
      })
    });
    map.addLayer(liste_epingle[0])
  
    var r='<input id="etape_suivante" type="button" value="Personne suivante">';

    $("#but").append(r);

    document.getElementById('etape_suivante').addEventListener('click',etape_suivante);

  }
  
  
  
    
  
  