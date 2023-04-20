var data = [
    {"interaction" : 1,   // numero de l'interaction
    "center" : [2.350260867376038, 48.852893162747485],//Long,lat
    "zoom" :  19
    }, // fdc
    
    {"interaction" : 2,
    "center" : [2.5875068509715695, 48.841334784725895],
    "zoom" :  15
    },
  
    {"interaction" : 3,
    "center" : [2.350260867376038, 48.852893162747485],
    "zoom" :  15
    },
  
    {"interaction" : 4,   
    "center" : [ 2.5875068509715695, 48.841334784725895],
    "zoom" :19
    },
  
    {"interaction" : 5,
    "center" : [ 5.77404077285072, 43.96274292687225],
    "zoom" :19,
    },
  
    {"interaction" : 6,
    "center" : [ 5.77404077285072, 43.96274292687225],
    "zoom" :  19,
    },
  
    {"interaction" : 7,
    "center" : [ 6.802410814311745, 45.634940817854755],
    "zoom" :  19
    },
  
    {"interaction" : 8,
    "center" : [ 6.802410814311745, 45.634940817854755],    
    "zoom" :19
    },
  
    {"interaction" : 9,
    "center" : [ -0.23259216814277608, 47.88867739011758],
    "zoom" :19,
    },
  
    {"interaction" : 10,
    "center" : [-89.37963791010193, 43.07823050268706],   
    "zoom" :19
    },
  ];
  
  var tab= [];
  var etape_suiv;
  var interval_ajout;
  var numero_enquete;
  var etape;
  var zoom;
  var centre
  var but = document.getElementById("but");
  var texte_numero = document.getElementById("texte_numero");
  var map;
  // initialisation des fond de carte OSM et géoportail 
  var raster = new ol.layer.Tile({
    source: new ol.source.OSM(),

  });


  var liste_epingle =[]
  for(let i=0;i<data.length ; i++){
    liste_epingle.push( new ol.layer.Vector({
      source: new ol.source.Vector({
          features: [
              new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat(data[i]["center"]))
              })
          ]
      })
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
    map.addLayer(liste_epingle[etape])
    texte_numero.innerHTML ='Merci de donner le numéro ' +etape 
    console.log(etape)
    centre = ol.proj.fromLonLat(data[etape]["center"]);
    zoom = data[etape]["zoom"];
    map.getView().setCenter(centre);
    map.getView().setZoom(zoom);
  }
  
  function debut() {
    but.removeChild(document.getElementById("E1"));

    etape = 0;
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
  
    var r='<input id="etape_suivante" type="button" value="Etape suivante">';

    $("#but").append(r);

    texte_numero.innerHTML ='Merci de donner le numéro ' +etape ;
    document.getElementById('etape_suivante').addEventListener('click',etape_suivante);

  }
  
  
  
    
  
  