// Start with the map page
window.location.replace(window.location.href.split("#")[0] + "#mappage");

var selectedFeature = null;


// fix height of content
function fixContentHeight() {
    var footer = $("div[data-role='footer']:visible"),
        content = $("div[data-role='content']:visible:visible"),
        viewHeight = $(window).height(),
        contentHeight = viewHeight - footer.outerHeight();

    if ((content.outerHeight() + footer.outerHeight()) !== viewHeight) {
        contentHeight -= (content.outerHeight() - content.height() + 1);
        content.height(contentHeight);
    }

    if (window.map && window.map instanceof OpenLayers.Map) {
        map.updateSize();
    } else {
        // initialize map
        init(function(feature) { 
            selectedFeature = feature; 
            $.mobile.changePage("#popup", "pop"); 
        });
        initList();
        initList2();
        initList3();
        initList4();
        initList5();
        initList6();
        //initList7();
        desplegarAyuda();
    }
}

// one-time initialisation of button handlers 

$("#plus").live('click', function(){
    map.zoomIn();
});

$("#minus").live('click', function(){
    map.zoomOut();
});

$("#locate").live('click',function(){
    var control = map.getControlsBy("id", "locate-control")[0];
    if (control.active) {
        control.getCurrentLocation();
    } else {
        control.activate();
    }
});

//fix the content height AFTER jQuery Mobile has rendered the map page
$('#mappage').live('pageshow',function (){
    fixContentHeight();
    
});
    
$(window).bind("orientationchange resize pageshow", fixContentHeight);



$('#popup').live('pageshow',function(event, ui){
    var li = "";
    for(var attr in selectedFeature.attributes){
        li += "<li><div style='width:25%;float:left'>" + attr + "</div><div style='width:75%;float:right'>" 
        + selectedFeature.attributes[attr] + "</div></li>";
    }
    $("ul#details-list").empty().append(li).listview("refresh");
});

$('#searchpage').live('pageshow',function(event, ui){
    $('#query').bind('change', function(e){
        $('#search_results').empty();
        if ($('#query')[0].value === '') {
            return;
        }
        $.mobile.showPageLoadingMsg();

        // Prevent form send
        e.preventDefault();

        var searchUrl = 'http://ws.geonames.org/searchJSON?&country=MX';
        searchUrl += '&username=tpassolano&name=' + $('#query')[0].value;
        $.getJSON(searchUrl, function(data) {
            $.each(data.geonames, function() {
                var place = this;
                $('<li>')
                    .hide()
                    .append($('<h2 />', {
                        text: place.name
                    }))
                    .append($('<p />', {
                        html: '<b>' + place.countryName + '</b> ' + place.fcodeName
                    }))
                    .appendTo('#search_results')
                    .click(function() {
                        $.mobile.changePage('#mappage');
                        var lonlat = new OpenLayers.LonLat(place.lng, place.lat);
                        map.setCenter(lonlat.transform(gg, sm), 10);
                    })
                    .show();
            });
            $('#search_results').listview('refresh');
            $.mobile.hidePageLoadingMsg();
        });
    });
    // only listen to the first event triggered
    $('#searchpage').die('pageshow', arguments.callee);
});



function initList() {
    $('#page1').page();   
    //document.getElementById("layerspage").style.visibility= 'hidden' ;  
    
    //$('#layerspage').empty();
    var nuevodiv = null;
    nuevodiv = $('#layerspage').detach();
  
    $('<li>', {
            "data-role": "list-divider",
            text: "Capas Base"
        })
        .appendTo('#layerslist');
    var baseLayers = map.getLayersBy("isBaseLayer",true);
    $.each(baseLayers, function() {
        addLayerToList(this);
    });


	 $('<li>', {
        "data-role": "list-divider",
        text: "Límites Administrativos y población"
    })
    .appendTo('#layerslist');
    var trans2 = map.getLayersBy("LimiteAdmini", true);
    $.each(trans2, function() {
    addLayerToList(this);
    });
    

    
    $('#layerslist').listview('refresh');
    
    map.events.register("addlayer", this, function(e) {
        addLayerToList(e.layer);
    });
    $('#general').html(nuevodiv);
};

function initList2() {
    $('#page2').page();
  
    var nuevo = null;
    nuevo = $('#layerspage').detach();
    
//    $('<li>', {
//            "data-role": "list-divider",
//            text: "Capas Base"
//        })
//        .appendTo('#page3 #layerslistACC');
//    var baseLayers = map.getLayersBy("isBaseLayer",true);
//    $.each(baseLayers, function() {
//        addLayerToList3(this);
//    });
    
     $('<li>', {
        "data-role": "list-divider",
        text: "Totales (2005)"
    })
    .appendTo('#page2 #layerslistACC');
    var trans = map.getLayersBy("ACCIDENTESTRA", true);
    $.each(trans, function() {
    addLayerToList2(this);
    });
    
    $('<li>', {
        "data-role": "list-divider",
        text: "Tipos de accidentes"
    })
    .appendTo('#page2 #layerslistACC');
    var trans = map.getLayersBy("TIPOACCIDENTESTRA", true);
    $.each(trans, function() {
    addLayerToList2(this);
    });
    
    $('<li>', {
        "data-role": "list-divider",
        text: "Victimas"
    })
    .appendTo('#page2 #layerslistACC');
    var trans = map.getLayersBy("VICACCIDENTESTRA", true);
    $.each(trans, function() {
    addLayerToList2(this);
    });
    
    
    $('<li>', {
        "data-role": "list-divider",
        text: "Vialidades"
    })
    .appendTo('#page2 #layerslistACC');
    var trans = map.getLayersBy("VIALIACCIDENTESTRA", true);
    $.each(trans, function() {
    addLayerToList2(this);
    });
    
    $('#page2 #layerslistACC').listview('refresh');
    
    map.events.register("addlayer", this, function(e) {
        addLayerToList2(e.layer);
    });
    $('#general').html(nuevo);
 
};

function initList3() {
    $('#page3').page();   
    //document.getElementById("layerspage").style.visibility= 'hidden' ;  
    
    //$('#layerspage').empty();
    var nuevo = null;
    nuevo = $('#layerspage').detach();
    

        $('<li>', {
        "data-role": "list-divider",
        text: "Puntos de interés"
        
    })
    .appendTo('#layerslistPUNT');
    var trans = map.getLayersBy("PuntosInteresEF", true);
    $.each(trans, function() {
    addLayerToList3(this);
    });
    
//    $('<li>', {
//        "data-role": "list-divider",
//        text: "EconomÃ­a Informal"
//    })
//    .appendTo('#layerslist');
//    var trans = map.getLayersBy("PuntosInteresEI", true);
//    $.each(trans, function() {
//    addLayerToList(this);
//    });
//    
//     $('<li>', {
//        "data-role": "list-divider",
//        text: "Corredores EconÃ³micos"
//    })
//    .appendTo('#layerslist');
//    var trans = map.getLayersBy("PuntosInteresCE", true);
//    $.each(trans, function() {
//    addLayerToList(this);
//    });
//    
//      $('<li>', {
//        "data-role": "list-divider",
//        text: "Sitios Atractores y Generadores de Viajes"
//    })
//    .appendTo('#layerslist');
//    var trans = map.getLayersBy("PuntosInteresSA", true);
//    $.each(trans, function() {
//    addLayerToList(this);
//    });
    
    $('#page3 #layerslistPUNT').listview('refresh');
    
    map.events.register("addlayer", this, function(e) {
        addLayerToList3(e.layer);
    });
    $('#general').html(nuevo);
  
};

function initList4() {
    
    

  $('#page4').page();
  
    var nuevo = null;
    nuevo = $('#layerspage').detach();
    
//    $('<li>', {
//            "data-role": "list-divider",
//            text: "Capas Base"
//        })
//        .appendTo('#page2 #layerslistMT');
//    var baseLayers = map.getLayersBy("isBaseLayer",true);
//    $.each(baseLayers, function() {
//        addLayerToList2(this);
//    });
    
     $('<li>', {
        "data-role": "list-divider",
        text: "Modos de transporte"
    })
    .appendTo('#page4 #layerslistMT');
    var trans = map.getLayersBy("ModosTranCET", true);
    $.each(trans, function() {
    addLayerToList4(this);
    });
      $('<li>', {
        "data-role": "list-divider",
        text: "Estaciones"
    })
    .appendTo('#page4 #layerslistMT');
    var trans = map.getLayersBy("ModosTranESTA", true);
    $.each(trans, function() {
    addLayerToList4(this);
    });
    $('<li>', {
        "data-role": "list-divider",
        text: "Lineas / Rutas"
    })
    .appendTo('#page4 #layerslistMT');
    var trans = map.getLayersBy("ModosTranLINEA", true);
    $.each(trans, function() {
    addLayerToList4(this);
    });
//     $('<li>', {
//        "data-role": "list-divider",
//        text: "RTP y TrolebÃºs"
//    })
//    .appendTo('#page4 #layerslistMT');
//    var trans = map.getLayersBy("ModosTranRTP", true);
//    $.each(trans, function() {
//    addLayerToList2(this);
//    });
//    $('<li>', {
//        "data-role": "list-divider",
//        text: "Bicicleta"
//    })
//    .appendTo('#page4 #layerslistMT');
//    var trans = map.getLayersBy("ModosTranBICI", true);
//    $.each(trans, function() {
//    addLayerToList2(this);
//    });
//     $('<li>', {
//        "data-role": "list-divider",
//        text: "AnÃ¡lisis"
//    })
//    .appendTo('#page4 #layerslistMT');
//    var trans = map.getLayersBy("ModosTranCOBER", true);
//    $.each(trans, function() {
//    addLayerToList2(this);
//    });
//       $('<li>', {
//        "data-role": "list-divider",
//        text: "MAE (Matrices de AnÃ¡lisis Espacial)"
//    })
//    .appendTo('#page4 #layerslistMT');
//    var trans = map.getLayersBy("ModosTranMAE", true);
//    $.each(trans, function() {
//    addLayerToList2(this);
//    });

    $('#page4 #layerslistMT').listview('refresh');
    
    map.events.register("addlayer", this, function(e) {
        addLayerToList4(e.layer);
    });
    $('#general').html(nuevo);


};

function initList5() {
      

  $('#page5').page();
  
    var nuevo = null;
    nuevo = $('#layerspage').detach();
    
    
    
     $('<li>', {
        "data-role": "list-divider",
        text: "Elementos de la red vial"
    })
    .appendTo('#page5 #layerslistIDT');
    var trans = map.getLayersBy("InfraTranELEVIA", true);
    $.each(trans, function() {
    addLayerToList5(this);
    });
    $('<li>', {
        "data-role": "list-divider",
        text: "Puentes peatonales"
    })
    .appendTo('#page5 #layerslistIDT');
    var trans = map.getLayersBy("InfraTranPUENT", true);
    $.each(trans, function() {
    addLayerToList5(this);
    });
//     $('<li>', {
//        "data-role": "list-divider",
//        text: "SeÃ±alamiento"
//    })
//    .appendTo('#page4 #layerslistIDT');
//    var trans = map.getLayersBy("InfraTranSENALA", true);
//    $.each(trans, function() {
//    addLayerToList4(this);
//    });
//     $('<li>', {
//        "data-role": "list-divider",
//        text: "Dispositivos de control de trÃ¡nsito"
//    })
//    .appendTo('#page4 #layerslistIDT');
//    var trans = map.getLayersBy("InfraTranDISCON", true);
//    $.each(trans, function() {
//    addLayerToList4(this);
//    });
//    $('<li>', {
//        "data-role": "list-divider",
//        text: "Puentes"
//    })
//    .appendTo('#page4 #layerslistIDT');
//    var trans = map.getLayersBy("InfraTranPUENT", true);
//    $.each(trans, function() {
//    addLayerToList4(this);
//    });
//     
    $('#page5 #layerslistIDT').listview('refresh');
    
    map.events.register("addlayer", this, function(e) {
        addLayerToList5(e.layer);
    });
    $('#general').html(nuevo);
    
    
    
    

//  $('#page5').page();
//  
//    var nuevo = null;
//    nuevo = $('#layerspage').detach();
//    
//    $('<li>', {
//            "data-role": "list-divider",
//            text: "Capas Base"
//        })
//        .appendTo('#page5 #layerslistIU');
//    var baseLayers = map.getLayersBy("isBaseLayer",true);
//    $.each(baseLayers, function() {
//        addLayerToList5(this);
//    });
//     $('<li>', {
//        "data-role": "list-divider",
//        text: "Postes"
//    })
//    .appendTo('#page5 #layerslistIU');
//    var trans = map.getLayersBy("InfraUrbaPOST", true);
//    $.each(trans, function() {
//    addLayerToList5(this);
//    });
//     $('<li>', {
//        "data-role": "list-divider",
//        text: "Infraestructura hidrÃ¡ulica"
//    })
//    .appendTo('#page5 #layerslistIU');
//    var trans = map.getLayersBy("InfraUrbaHIDRA", true);
//    $.each(trans, function() {
//    addLayerToList5(this);
//    });
//    $('<li>', {
//        "data-role": "list-divider",
//        text: "Entorno urbano"
//    })
//    .appendTo('#page5 #layerslistIU');
//    var trans = map.getLayersBy("InfraUrbaENTORURB", true);
//    $.each(trans, function() {
//    addLayerToList5(this);
//    });
//    
//    $('#page5 #layerslistIU').listview('refresh');
//    
//    map.events.register("addlayer", this, function(e) {
//        addLayerToList5(e.layer);
//    });
//    $('#general').html(nuevo);

};

function initList6() {

  $('#page6').page();
  
    var nuevo = null;
    nuevo = $('#layerspage').detach();
    
//    $('<li>', {
//            "data-role": "list-divider",
//            text: "Capas Base"
//        })
//        .appendTo('#page6 #layerslistUDS');
//    var baseLayers = map.getLayersBy("isBaseLayer",true);
//    $.each(baseLayers, function() {
//        addLayerToList6(this);
//    });
     $('<li>', {
        "data-role": "list-divider",
        text: "Uso de suelo"
    })
    .appendTo('#page6 #layerslistUDS');
    var trans = map.getLayersBy("UsuSueloGEN", true);
    $.each(trans, function() {
    addLayerToList6(this);
    });
    
    
    $('#page6 #layerslistUDS').listview('refresh');
    
    map.events.register("addlayer", this, function(e) {
        addLayerToList6(e.layer);
    });
    $('#general').html(nuevo);

};


function initList7() {
//
//  $('#page7').page();
//  
//    var nuevo = null;
//    nuevo = $('#layerspage').detach();
//    
//    $('<li>', {
//            "data-role": "list-divider",
//            text: "Capas Base"
//        })
//        .appendTo('#page7 #layerslistMEFI');
//    var baseLayers = map.getLayersBy("isBaseLayer",true);
//    $.each(baseLayers, function() {
//        addLayerToList7(this);
//    });
//     $('<li>', {
//        "data-role": "list-divider",
//        text: "HidrologÃ­a superficial"
//    })
//    .appendTo('#page7 #layerslistMEFI');
//    var trans = map.getLayersBy("MedioFisicoHIDRSUP", true);
//    $.each(trans, function() {
//    addLayerToList7(this);
//    });
//     $('<li>', {
//        "data-role": "list-divider",
//        text: "Peligros"
//    })
//    .appendTo('#page7 #layerslistMEFI');
//    var trans = map.getLayersBy("MedioFisicoPELIGRO", true);
//    $.each(trans, function() {
//    addLayerToList7(this);
//    });
//    $('<li>', {
//        "data-role": "list-divider",
//        text: "ZonificaciÃ³n geotÃ©cnica"
//    })
//    .appendTo('#page7 #layerslistMEFI');
//    var trans = map.getLayersBy("MedioFisicoGEOTEC", true);
//    $.each(trans, function() {
//    addLayerToList7(this);
//    });
//    
//    
//    $('#page7 #layerslistMEFI').listview('refresh');
//    
//    map.events.register("addlayer", this, function(e) {
//        addLayerToList7(e.layer);
//    });
//    $('#general').html(nuevo);

};

function addLayerToList(layer) {
    
    
    var item = $('<li>', {
            "data-icon": "check",
            "class": layer.visibility ? "checked" : ""
        })
        .append($('<a />', {
            text: layer.name
        })
            .click(function() {
                //$.mobile.changePage('#mappage');
               
                if (layer.isBaseLayer) {
                    layer.map.setBaseLayer(layer);
                } 
//                  else if  (layer.Accidentes) {
//                    layer.setVisibility(layer.visibility);
//                }
                 else{
                    layer.setVisibility(!layer.getVisibility());
                }
               // record.set("visibility", layer.getVisibility());
            })
        )
        .appendTo('#layerslist');
        layer.events.on({
        'visibilitychanged': function() {
            $(item).toggleClass('checked');
        }
    });
}
function addLayerToList2(layer) {
    
    
    var item = $('<li>', {
            "data-icon": "check",
            "class": layer.visibility ? "checked" : ""
        })
        .append($('<a />', {
            text: layer.name
        })
            .click(function() {
               // $.mobile.changePage('#mappage');
               
                if (layer.isBaseLayer) {
                    layer.map.setBaseLayer(layer);
                } 
//                  else if  (layer.Accidentes) {
//                    layer.setVisibility(layer.visibility);
//                }
                 else{
                    layer.setVisibility(!layer.getVisibility());
                }
               // record.set("visibility", layer.getVisibility());
            })
        )
        .appendTo('#layerslistACC');
        layer.events.on({
        'visibilitychanged': function() {
            $(item).toggleClass('checked');
        }
    });
}
function addLayerToList3(layer) {
    
    
    var item = $('<li>', {
            "data-icon": "check",
            "class": layer.visibility ? "checked" : ""
        })
        .append($('<a />', {
            text: layer.name
        })
            .click(function() {
               // $.mobile.changePage('#mappage');
               
                if (layer.isBaseLayer) {
                    layer.map.setBaseLayer(layer);
                } 
//                  else if  (layer.Accidentes) {
//                    layer.setVisibility(layer.visibility);
//                }
                 else{
                    layer.setVisibility(!layer.getVisibility());
                }
               // record.set("visibility", layer.getVisibility());
            })
        )
        .appendTo('#layerslistPUNT');
        layer.events.on({
        'visibilitychanged': function() {
            $(item).toggleClass('checked');
        }
    });
}

function addLayerToList4(layer) {
    
    
    var item = $('<li>', {
            "data-icon": "check",
            "class": layer.visibility ? "checked" : ""
        })
        .append($('<a />', {
            text: layer.name
        })
            .click(function() {
                //$.mobile.changePage('#mappage');
               
                if (layer.isBaseLayer) {
                    layer.map.setBaseLayer(layer);
                } 
//                  else if  (layer.Accidentes) {
//                    layer.setVisibility(layer.visibility);
//                }
                 else{
                    layer.setVisibility(!layer.getVisibility());
                }
               // record.set("visibility", layer.getVisibility());
            })
        )
        .appendTo('#layerslistMT');
        layer.events.on({
        'visibilitychanged': function() {
            $(item).toggleClass('checked');
        }
    });
}



function addLayerToList5(layer) {
    
    
    var item = $('<li>', {
            "data-icon": "check",
            "class": layer.visibility ? "checked" : ""
        })
        .append($('<a />', {
            text: layer.name
        })
            .click(function() {
                //$.mobile.changePage('#mappage');
               
                if (layer.isBaseLayer) {
                    layer.map.setBaseLayer(layer);
                } 
//                  else if  (layer.Accidentes) {
//                    layer.setVisibility(layer.visibility);
//                }
                 else{
                    layer.setVisibility(!layer.getVisibility());
                }
               // record.set("visibility", layer.getVisibility());
            })
        )
        .appendTo('#layerslistIDT');
        layer.events.on({
        'visibilitychanged': function() {
            $(item).toggleClass('checked');
        }
    });
}

function addLayerToList6(layer) {
    
    
    var item = $('<li>', {
            "data-icon": "check",
            "class": layer.visibility ? "checked" : ""
        })
        .append($('<a />', {
            text: layer.name
        })
            .click(function() {
                //$.mobile.changePage('#mappage');
               
                if (layer.isBaseLayer) {
                    layer.map.setBaseLayer(layer);
                } 
//                  else if  (layer.Accidentes) {
//                    layer.setVisibility(layer.visibility);
//                }
                 else{
                    layer.setVisibility(!layer.getVisibility());
                }
               // record.set("visibility", layer.getVisibility());
            })
        )
        .appendTo('#layerslistUDS');
        layer.events.on({
        'visibilitychanged': function() {
            $(item).toggleClass('checked');
        }
    });
}

function addLayerToList7(layer) {
    
    
//    var item = $('<li>', {
//            "data-icon": "check",
//            "class": layer.visibility ? "checked" : ""
//        })
//        .append($('<a />', {
//            text: layer.name
//        })
//            .click(function() {
//                //$.mobile.changePage('#mappage');
//               
//                if (layer.isBaseLayer) {
//                    layer.map.setBaseLayer(layer);
//                } 
////                  else if  (layer.Accidentes) {
////                    layer.setVisibility(layer.visibility);
////                }
//                 else{
//                    layer.setVisibility(!layer.getVisibility());
//                }
//               // record.set("visibility", layer.getVisibility());
//            })
//        )
//        .appendTo('#layerslistMEFI');
//        layer.events.on({
//        'visibilitychanged': function() {
//            $(item).toggleClass('checked');
//        }
 //   });
}


// --- Script para el desliegue de la pantalla de ayuda
function desplegarAyuda(){
    $("#ayuda").hide(0);
    $("#ayuda .ayudaInfo").hide(0);
    ayudaOculta = true;
    $("#botonAyuda").click(function(){
        if (ayudaOculta === true){
            $("#ayuda").fadeIn(1500);
            $("#ayuda .ayudaInfo.inicial").fadeIn(0);
            ayudaOculta = false;
        }
        else{
            $("#ayuda").fadeOut(1500);
            $("#ayuda .ayudaInfo").fadeOut(1500);
            ayudaOculta = true;
        }
    });
    
    $("#ayuda div ul li").click(function(){
       var ID_elemento = $(this).attr("id");
       $("#ayuda .ayudaInfo").fadeOut(0);
       $("#ayuda .ayudaInfo."+ID_elemento).fadeIn(500);
    });
    
}