// API key for http://openlayers.org. Please get your own at
// http://bingmapsportal.com/ and use that instead.
var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";
//Use proxy to get same origin URLs for tiles that don't support CORS.
OpenLayers.ProxyHost = "proxy.jsp?url=";



// initialize map when page ready
var map, cacheWrite;
var gg = new OpenLayers.Projection("EPSG:4326");
var sm = new OpenLayers.Projection("EPSG:900913");



var init = function (onSelectFeatureFunction) {
    
        var fromProjection = new OpenLayers.Projection("EPSG:4326");   
        var toProjection   = new OpenLayers.Projection("EPSG:900913"); 
        var position       = new OpenLayers.LonLat(-99.17,19.30).transform( fromProjection, toProjection);
        var zoom           = 10; 
        
//            zb = new OpenLayers.Control.ZoomBox({
//        title: "Zoom box: zoom clicking and dragging",
//        text: "Zoom"
//    });


//    var vector = new OpenLayers.Layer.Vector("Vector Layer", {});
	
	// create a vector layer for drawing
    var vector2 = new OpenLayers.Layer.Vector('Vector Layer', {
        styleMap: new OpenLayers.StyleMap({
            temporary: OpenLayers.Util.applyDefaults({
                pointRadius: 16
            }, OpenLayers.Feature.Vector.style.temporary),
            'default': OpenLayers.Util.applyDefaults({
                pointRadius: 16,
                strokeWidth: 3,
            }, OpenLayers.Feature.Vector.style['default']),
            select: OpenLayers.Util.applyDefaults({
                pointRadius: 16,
                strokeWidth: 3
            }, OpenLayers.Feature.Vector.style.select)
        })
    });

    // OpenLayers' EditingToolbar internally creates a Navigation control, we
    // want a TouchNavigation control here so we create our own editing toolbar
    var toolbar = new OpenLayers.Control.Panel({
        
        displayClass: 'olControlEditingToolbar'
    });
    toolbar.addControls([
        // this control is just there to be able to deactivate the drawing
        // tools
      
        new OpenLayers.Control.Navigation({
            title: "Navegar",
            displayClass: 'olControlNavigation'
        }),
          new OpenLayers.Control.ZoomBox({
        title: "Zoom Recuadro",
        text: "Zoom"
    }),
        new OpenLayers.Control.ModifyFeature(vector2, {
            title: "Desplazar",
            vertexRenderIntent: 'temporary',
            displayClass: 'olControlModifyFeature'
        }),
        new OpenLayers.Control.DrawFeature(vector2, OpenLayers.Handler.Point, {
            title: "Dibujar punto",
            displayClass: 'olControlDrawFeaturePoint'
        }),
        new OpenLayers.Control.DrawFeature(vector2, OpenLayers.Handler.Path, {
            title: "Dibujar linea",
            displayClass: 'olControlDrawFeaturePath'
        }),
        new OpenLayers.Control.DrawFeature(vector2, OpenLayers.Handler.Polygon, {
            title: "Dibujar poligono",
            displayClass: 'olControlDrawFeaturePolygon'
        }),
         
    ]);
    
 

    var osm = new OpenLayers.Layer.OSM();
    osm.wrapDateLine = false;

        
        //LIMITES ADMINISTRATIVOS
//                    var la1 = new OpenLayers.Layer.WMS(
//    			"LÃ­mite del Distrito Federal",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:inegi_limite_df_2012', transparent: true},
//    			{LimiteAdmini: true, visibility: false}
//    		);
                    var la1 = new OpenLayers.Layer.WMS(
    			"Delegaciones",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:inegi_delegaciones_df_2012', transparent: true},
    			{LimiteAdmini: true, visibility: false}
    		);
//                    var la3 = new OpenLayers.Layer.WMS(
//    			"Delegaciones",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:sigat_df_2005', transparent: true},
//    			{LimiteAdmini: true, visibility: false}
//    		);
                    var la2 = new OpenLayers.Layer.WMS(
    			"Municipios",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:seduvi_municipios_edomex_03jul2015', transparent: true},
    			{LimiteAdmini: true, visibility: false}
    		);
                    var la3 = new OpenLayers.Layer.WMS(
                           "Población total (2010)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:inegi_entorno_urbano_2010', transparent: true},
                           {LimiteAdmini: true, visibility: false}
                   ); 
//                    var la5 = new OpenLayers.Layer.WMS(
//    			"Colonias SEDUVI",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:seduvi_colonias_03jul2012', transparent: true},
//    			{LimiteAdmini: true, visibility: false}
//    		);
//                    var la3 = new OpenLayers.Layer.WMS(
//                           "TravesÃ­a de poblaciÃ³n",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sobse_travesia_de_poblacion_0910', transparent: true},
//                           {LimiteAdmini: true, visibility: false}
//                   );
//                    var la4 = new OpenLayers.Layer.WMS(
//    			"Manzanas (SCINCE)",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:inegi_manzanas_scince_2012', transparent: true},
//    			{LimiteAdmini: true, visibility: false}
//    		);
//                    var la7 = new OpenLayers.Layer.WMS(
//    			"Predios",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:seduvi_predios_03jul2012', transparent: true},
//    			{LimiteAdmini: true, visibility: false}
//    		);
            
        //
        
        //PUNTOS DE INTERES
                    var pi1 = new OpenLayers.Layer.WMS(
    			"Centros comerciales",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:dadf_centros_comerciales_2014', transparent: true},
    			{PuntosInteresEF: true, visibility: false}
    		);
                    var pi2 = new OpenLayers.Layer.WMS(
    			"Tiendas de autoservicio",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:dadf_tiendas_autoservicio_2014', transparent: true},
    			{PuntosInteresEF: true, visibility: false}
    		);
//                    var pi3 = new OpenLayers.Layer.WMS(
//    			"Mercados (SEDECO)",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:seduvi_mercados_sedeco_03julio2012', transparent: true},
//    			{PuntosInteresEF: true, visibility: false}
//    		);
                    var pi3 = new OpenLayers.Layer.WMS(
    			"Mercados",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:dadf_mercados_2014', transparent: true},
    			{PuntosInteresEF: true, visibility: false}
    		);
//                    var pi5 = new OpenLayers.Layer.WMS(
//    			"Restaurantes",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:dadf_restaurantes_2014', transparent: true},
//    			{PuntosInteresEF: true, visibility: false}
//    		);
//                    var pi6 = new OpenLayers.Layer.WMS(
//    			"Datos del Sistema de InformaciÃ³n Empresarial Mexicano",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:dadf_siem_2014', transparent: true},
//    			{PuntosInteresEF: true, visibility: false}
//    		);
                    var pi4 = new OpenLayers.Layer.WMS(
    			"Tianguis",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:dadf_tianguis_2014', transparent: true},
    			{PuntosInteresEF: true, visibility: false}
    		);
                    var pi5 = new OpenLayers.Layer.WMS(
    			"Mercados sobre ruedas",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:dadf_mercados_sobre_ruedas_2014', transparent: true},
    			{PuntosInteresEF: true, visibility: false}
    		);
                    var pi6 = new OpenLayers.Layer.WMS(
                                    "Escuelas de nivel básico",
                                    "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                                    {'layers': 'GITSDF:seduvi_escuelas_nivel_basico_03jul2012', transparent: true},
                                    {PuntosInteresEF: true, visibility: false}
                            );
                   var pi7 = new OpenLayers.Layer.WMS(
                                    "Bares y cantinas",
                                    "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                                    {'layers': 'GITSDF:puntos_venta_alcohol', transparent: true},
                                    {PuntosInteresEF: true, visibility: false}
                            );
                    var pi8 = new OpenLayers.Layer.WMS(
                                    "Hospitales",
                                    "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                                    {'layers': 'GITSDF:hospitales_zm', transparent: true},
                                    {PuntosInteresEF: true, visibility: false}
                            );
        // CORREDORTES ECONOMICOS
            
//                    var pi9 = new OpenLayers.Layer.WMS(
//    			"Centro histÃ³rico",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:dadf_centro_historico_sedeco_2014', transparent: true},
//    			{PuntosInteresCE: true, visibility: false}
//    		);
//                     var pi10 = new OpenLayers.Layer.WMS(
//    			"Corredor eje 4 sur",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:dadf_corredor_eje4sur_sedeco_2014', transparent: true},
//    			{PuntosInteresCE: true, visibility: false}
//    		);
//                     var pi11 = new OpenLayers.Layer.WMS(
//    			"Corredor Guadalupe",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:dadf_corredor_guadalupe_sedeco_2014', transparent: true},
//    			{PuntosInteresCE: true, visibility: false}
//    		);
//                     var pi12 = new OpenLayers.Layer.WMS(
//    			"Corredor Reforma",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:dadf_corredor_reforma_sedeco_2014', transparent: true},
//    			{PuntosInteresCE: true, visibility: false}
//    		);
//                       var pi13 = new OpenLayers.Layer.WMS(
//    			"Corredor Tlalpan",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:dadf_corredor_tlalpan_sedeco_2014', transparent: true},
//    			{PuntosInteresCE: true, visibility: false}
//    		);
            // TERMINA CORREDORES ECONOMICOS
            
            //EDUCACION
//                      var pi14 = new OpenLayers.Layer.WMS(
//    			"Escuelas de nivel bÃ¡sico",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:seduvi_escuelas_nivel_basico_03jul2012', transparent: true},
//    			{PuntosInteresED: true, visibility: false}
//    		);
            //TERMINA EDUCACION
            
            //SITIOS ATRACTORES
//                     var pi15 = new OpenLayers.Layer.WMS(
//    			"Centros histÃ³ricos SEDUVI",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:seduvi_centros_historicos_03jul2012', transparent: true},
//    			{PuntosInteresSA: true, visibility: false}
//    		);
//                     var pi16 = new OpenLayers.Layer.WMS(
//    			"Distritos de la encuesta origen-destino 2007",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:setravi_distritos_encuestaod_2007', transparent: true},
//    			{PuntosInteresSA: true, visibility: false}
//    		);
//                     var pi17 = new OpenLayers.Layer.WMS(
//    			"Zonas de la encuesta origen-destino 2007",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:setravi_zonas_encuestaod_2007', transparent: true},
//    			{PuntosInteresSA: true, visibility: false}
//    		);
//                     var pi18 = new OpenLayers.Layer.WMS(
//    			"Nodos",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:seduvi_nodos_03jul2012', transparent: true},
//    			{PuntosInteresSA: true, visibility: false}
//    		);
            //FIN SITIOS ATRACTORES
            
        //TERMINA PUNTOS DE INTERES
        
        //MODOS TRANSPORTE
            //CETRAM
//                  var mt1 = new OpenLayers.Layer.WMS(
//    			"Centros de transferencia modal (CETRAM)",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:seduvi_cetrams_03jul2012', transparent: true},
//    			{ModosTranCET: true, visibility: false}
//    		);
                    var mt2 = new OpenLayers.Layer.WMS(
    			"Centros de transferencia modal del PITV-2013",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:setravi_cetram_pitv_2013', transparent: true},
    			{ModosTranCET: true, visibility: false}
    		);
            //TERMINA CETRAM
            //
            //SCT METRO
                var sct1 = new OpenLayers.Layer.WMS(
    			"Estaciones del Metro",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:dadf_estacion_metro_2014', transparent: true},
    			{ModosTranESTA: true, visibility: false}
    		);
                var metr1 = new OpenLayers.Layer.WMS(
    			"Estaciones del Metrobús",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:setravi_estaciones_metrobus_2013', transparent: true},
    			{ModosTranESTA: true, visibility: false}
    		); 
                var rtp1 = new OpenLayers.Layer.WMS(
    			"Parabuses",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:dadf_parabus_2014', transparent: true},
    			{ModosTranESTA: true, visibility: false}
    		);
                var bici1 = new OpenLayers.Layer.WMS(
    			"Cicloestaciones Ecobici",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:setravi_cicloestaciones_ecobici_2013', transparent: true},
    			{ModosTranESTA: true, visibility: false}
    		);
                var sct2 = new OpenLayers.Layer.WMS(
    			"Líneas del Metro",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:dadf_lineas_metro_2014', transparent: true},
    			{ModosTranLINEA: true, visibility: false}
    		);
                var metr2 = new OpenLayers.Layer.WMS(
    			"Líneas del Metrobús",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:inegi_metrobus_scince_2012', transparent: true},
    			{ModosTranLINEA: true, visibility: false}
    		);
                var rtp2 = new OpenLayers.Layer.WMS(
                                "Rutas de RTP",
                                "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                                {'layers': 'GITSDF:dadf_rutas_rtp_2014', transparent: true},
                                {ModosTranLINEA: true, visibility: false}
                        );
                var rtp3 = new OpenLayers.Layer.WMS(
    			"Red del trolebús",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:dadf_red_trolebus_2014', transparent: true},
    			{ModosTranLINEA: true, visibility: false}
    		);
                var bici3 = new OpenLayers.Layer.WMS(
    			"Ciclovías",
    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
    			{'layers': 'GITSDF:dadf_ciclovias_2013', transparent: true},
    			{ModosTranLINEA: true, visibility: false}
    		);
            //FIN SCT METRO
            //METROBUS
                

            //FIN METROBUS
            //RTP
                
                 
                 
            //FIN RTP
            //BICICLETAS
                
//                 var bici2 = new OpenLayers.Layer.WMS(
//    			"Biciestacionamientos",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:setravi_biciestacionamientos_2013', transparent: true},
//    			{ModosTranBICI: true, visibility: false}
//    		);
                 
            //FIN BICICLETAS
            //ANALISIS
            //COBERTURA TRANSPORTE PUBLICO
//                var cober1 = new OpenLayers.Layer.WMS(
//    			"NÃºmero de modos por vialidad (Metro + MetrobÃºs + RTP + TrolebÃºs + CiclovÃ­as)",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:gits_modos_por_vialidad_scince_2014', transparent: true},
//    			{ModosTranCOBER: true, visibility: false}
//    		);
            //FIN COBRETURA TRANSPORTE PUBLICO
            //MAE
//                var mae1 = new OpenLayers.Layer.WMS(
//    			"Malla diamante @ 500 m.",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:gits_malla_500m_2014', transparent: true},
//    			{ModosTranMAE: true, visibility: false}
//    		);
//                var mae2 = new OpenLayers.Layer.WMS(
//    			"Malla hexagonal @ 100 m.",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:gits_malla_hexagonos_100m_2014', transparent: true},
//    			{ModosTranMAE: true, visibility: false}
//    		);
//                var mae3 = new OpenLayers.Layer.WMS(
//    			"Malla hexagonal @ 300 m.",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:gits_malla_hexagonos_300m_2014', transparent: true},
//    			{ModosTranMAE: true, visibility: false}
//    		);
//                var mae4 = new OpenLayers.Layer.WMS(
//    			"Malla hexagonal @ 500 m.",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:gits_malla_hexagonos_500m_2014', transparent: true},
//    			{ModosTranMAE: true, visibility: false}
//    		);
//                var mae5 = new OpenLayers.Layer.WMS(
//    			"Malla hexagonal @ 1000 m.",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:gits_malla_hexagonos_1000m_2014', transparent: true},
//    			{ModosTranMAE: true, visibility: false}
//    		);
//                var mae6 = new OpenLayers.Layer.WMS(
//    			"Malla hexagonal @ 2000 m.",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:gits_malla_hexagonos_2000m_2014', transparent: true},
//    			{ModosTranMAE: true, visibility: false}
//    		);
//                var mae7 = new OpenLayers.Layer.WMS(
//    			"Malla hexagonal @ 3000 m.",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:gits_malla_hexagonos_3000m_2014', transparent: true},
//    			{ModosTranMAE: true, visibility: false}
//    		);
//                var mae8 = new OpenLayers.Layer.WMS(
//    			"Malla hexagonal @ 4000 m.",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:gits_malla_hexagonos_4000m_2014', transparent: true},
//    			{ModosTranMAE: true, visibility: false}
//    		);
//                var mae9 = new OpenLayers.Layer.WMS(
//    			"Malla hexagonal @ 5000 m.",
//    			"http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//    			{'layers': 'GITSDF:gits_malla_hexagonos_5000m_2014', transparent: true},
//    			{ModosTranMAE: true, visibility: false}
//    		);
            //FIN MAE
            //FIN ALALISIS
        //FIN MODOS TRANSPORTE
        
        //INICIO INFRAESTRUCTURA DE TRANSPORTE
        //RED VIAL
//            var redv1 = new OpenLayers.Layer.WMS(
//                           "Red vial (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigat_redvial_df_2005', transparent: true},
//                           {InfraTranREDV: true, visibility: false}
//                   );
//           var redv2 = new OpenLayers.Layer.WMS(
//                           "VÃ­as primarias",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:setravi_viasprimarias_2013', transparent: true},
//                           {InfraTranREDV: true, visibility: false}
//                   );
//           var redv3 = new OpenLayers.Layer.WMS(
//                           "VÃ­as principales",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:setravi_vialidades_principales_2013', transparent: true},
//                           {InfraTranREDV: true, visibility: false}
//                   );
//           var redv4 = new OpenLayers.Layer.WMS(
//                           "Autopistas urbanas",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sobse_autopistaurbana_2013', transparent: true},
//                           {InfraTranREDV: true, visibility: false}
//                   );
//           var redv5 = new OpenLayers.Layer.WMS(
//                           "Red Vial (2011)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:navteq_redvial_2011', transparent: true},
//                           {InfraTranREDV: true, visibility: false}
//                   );
//           var redv6 = new OpenLayers.Layer.WMS(
//                           "Red Vial (SCINCE)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:inegi_red_vial_scince_2012', transparent: true},
//                           {InfraTranREDV: true, visibility: false}
//                   );
//           var redv7 = new OpenLayers.Layer.WMS(
//                           "Corredores de carga de la ZMVM",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:setravi_corredores_carga_zmvm_2013', transparent: true},
//                           {InfraTranREDV: true, visibility: false}
//                   );
//           var redv8 = new OpenLayers.Layer.WMS(
//                           "Camellones",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sobse_camellon_0910', transparent: true},
//                           {InfraTranREDV: true, visibility: false}
//                   );
//           var redv9 = new OpenLayers.Layer.WMS(
//                           "Zonas de descanso",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sobse_zona_descanso_0910', transparent: true},
//                           {InfraTranREDV: true, visibility: false}
//                   );
//           var redv10 = new OpenLayers.Layer.WMS(
//                           "Acotamientos",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sobse_acotamientos_0910', transparent: true},
//                           {InfraTranREDV: true, visibility: false}
//                   );
        //FIN RED VIAL
        //ELEMENTOS DE LA RED VIAL
            var elredv1 = new OpenLayers.Layer.WMS(
                           "Cruces",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sobse_cruces_0910', transparent: true},
                           {InfraTranELEVIA: true, visibility: false}
                   );
           var elredv2 = new OpenLayers.Layer.WMS(
                           "Entronques",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sobse_entronques_0910', transparent: true},
                           {InfraTranELEVIA: true, visibility: false}
                   );
//           var elredv3 = new OpenLayers.Layer.WMS(
//                           "Accesos",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sobse_accesos_0910', transparent: true},
//                           {InfraTranELEVIA: true, visibility: false}
//                   );
           var elredv4 = new OpenLayers.Layer.WMS(
                           "Taludes",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sobse_talud_0910', transparent: true},
                           {InfraTranELEVIA: true, visibility: false}
                   );
           var elredv5 = new OpenLayers.Layer.WMS(
                           "Elementos de contención",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sobse_elementos_contencion_0910', transparent: true},
                           {InfraTranELEVIA: true, visibility: false}
                   );
           var elredv6 = new OpenLayers.Layer.WMS(
                           "Túneles",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sobse_tunel_0910', transparent: true},
                           {InfraTranELEVIA: true, visibility: false}
                   );
           var dispcon1 = new OpenLayers.Layer.WMS(
                           "Semáforos",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:dadf_semaforos_2014', transparent: true},
                           {InfraTranELEVIA: true, visibility: false}
                   );
           var puent7 = new OpenLayers.Layer.WMS(
                           "Puentes vehiculares elevados",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:dadf_puentesvehiculares_elevados_2013', transparent: true},
                           {InfraTranELEVIA: true, visibility: false}
                   );
        //FIN ELEMENTOS DE LA RED VIAL
        //SEÃ‘ALAMIENTO
//            var senala1 = new OpenLayers.Layer.WMS(
//                           "SeÃ±alamiento horizontal",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sobse_senalamiento_horizontal_0910', transparent: true},
//                           {InfraTranSENALA: true, visibility: false}
//                   );
//            var senala2 = new OpenLayers.Layer.WMS(
//                           "Vialetas",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sobse_vialetas_0910', transparent: true},
//                           {InfraTranSENALA: true, visibility: false}
//                   );
//            var senala3 = new OpenLayers.Layer.WMS(
//                           "SeÃ±alamiento vertical",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sobse_senalamiento_vertical_0910', transparent: true},
//                           {InfraTranSENALA: true, visibility: false}
//                   );
//            var senala4 = new OpenLayers.Layer.WMS(
//                           "TravesÃ­a de poblaciÃ³n",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sobse_travesia_de_poblacion_0910', transparent: true},
//                           {InfraTranSENALA: true, visibility: false}
//                   );
        //FIN SEÃ‘ALAMIENTO
        //DISPOSITIVOS DE CONTROL
             
//           var dispcon2 = new OpenLayers.Layer.WMS(
//                           "Registros de semÃ¡foros",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:dadf_registros_semaforos_2014', transparent: true},
//                           {InfraTranDISCON: true, visibility: false}
//                   );
        //FIN DISPOSITIVOS DE CONTROL
        //PUENTES
        //
                    var puent1 = new OpenLayers.Layer.WMS(
                           "Puentes peatonales (con barandal, elevador, jaula y rampa)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:PuentesPeatonales', transparent: true},
                           {InfraTranPUENT: true, visibility: false}
                   );
//            var puent1 = new OpenLayers.Layer.WMS(
//                           "Puentes peatonales con barandal",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:dadf_puentespeatonales_barandal_2013', transparent: true},
//                           {InfraTranPUENT: true, visibility: false}
//                   );
//           var puent2 = new OpenLayers.Layer.WMS(
//                           "Puentes peatonales con elevador",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:dadf_puentespeatonales_elevador_2013', transparent: true},
//                           {InfraTranPUENT: true, visibility: false}
//                   );
//           var puent3 = new OpenLayers.Layer.WMS(
//                           "Puentes peatonales con jaula",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:dadf_puentespeatonales_jaula_2013', transparent: true},
//                           {InfraTranPUENT: true, visibility: false}
//                   );
//           var puent4 = new OpenLayers.Layer.WMS(
//                           "Puentes peatonales con rampa",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:dadf_puentespeatonales_rampa_2013', transparent: true},
//                           {InfraTranPUENT: true, visibility: false}
//                   );
//           var puent5 = new OpenLayers.Layer.WMS(
//                           "Puentes",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sobse_puentes_0910', transparent: true},
//                           {InfraTranPUENT: true, visibility: false}
//                   );
//           var puent6 = new OpenLayers.Layer.WMS(
//                           "Parapetos en puentes",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sobse_parapetos_puentes_0910', transparent: true},
//                           {InfraTranPUENT: true, visibility: false}
//                   );
//           
//           var puent8 = new OpenLayers.Layer.WMS(
//                           "Bajo puentes vehiculares",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:dadf_bajopuente_vehicular_2013', transparent: true},
//                           {InfraTranPUENT: true, visibility: false}
//                   );
        //FIN PUENTES
        //FIN NFRAESTRUCTURA DE TRANSPORTE
                
        //INICIA INFRAESTRUCTURA URBANA
        //POSTES
                var poste1 = new OpenLayers.Layer.WMS(
                           "Otros postes",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:dadf_otrospostes_2013', transparent: true},
                           {InfraUrbaPOST: true, visibility: false}
                   );
                 var poste2 = new OpenLayers.Layer.WMS(
                           "Postes de madera",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:dadf_postes_madera_2013', transparent: true},
                           {InfraUrbaPOST: true, visibility: false}
                   );
                 var poste3 = new OpenLayers.Layer.WMS(
                           "Postes metálicos",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:dadf_postes_metalicos_2013', transparent: true},
                           {InfraUrbaPOST: true, visibility: false}
                   );
                    var poste4 = new OpenLayers.Layer.WMS(
                           "Postes de concreto",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:dadf_postesconcreto_2013', transparent: true},
                           {InfraUrbaPOST: true, visibility: false}
                   );
                    var poste5 = new OpenLayers.Layer.WMS(
                           "Postes publicitarios",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:dadf_postespublicitarios_2013', transparent: true},
                           {InfraUrbaPOST: true, visibility: false}
                   );   
        //FIN POSTES
        //INFRAESTRUTURA HIDRAULICA
             var infrahidr1 = new OpenLayers.Layer.WMS(
                           "Rejillas pluviales",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:dadf_rejillaspluviales_obras_publicas_2014', transparent: true},
                           {InfraUrbaHIDRA: true, visibility: false}
                   );
//            var infrahidr2 = new OpenLayers.Layer.WMS(
//                           "Alcantarillas",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:dadf_alcantarillas_obraspublicas_2014 ', transparent: true},
//                           {InfraUrbaHIDRA: true, visibility: false}
//                   );
            var infrahidr3 = new OpenLayers.Layer.WMS(
                           "Rejillas tipo Irving",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:dadf_rejillas_irving_2013', transparent: true},
                           {InfraUrbaHIDRA: true, visibility: false}
                   );
            var infrahidr4 = new OpenLayers.Layer.WMS(
                           "Rejillas de boca de tormenta",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:dadf_rejillasbocatormenta_2013', transparent: true},
                           {InfraUrbaHIDRA: true, visibility: false}
                   );
           var infrahidr5 = new OpenLayers.Layer.WMS(
                           "Cunetas tipo plataforma",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sobse_cuneta_junto_plataforma_2010', transparent: true},
                           {InfraUrbaHIDRA: true, visibility: false}
                   );
        //FIN INFRAESTRUCTURA HIDRAULICA
        //ENTORNO URBANO
             var entorurb1 = new OpenLayers.Layer.WMS(
                           "Población total (2010)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:inegi_entorno_urbano_2010', transparent: true},
                           {InfraUrbaENTORURB: true, visibility: false}
                   ); 
//              var entorurb2 = new OpenLayers.Layer.WMS(
//                           "Arriates",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:dadf_arriates_2014', transparent: true},
//                           {InfraUrbaENTORURB: true, visibility: false}
//                   ); 
        //FIN ENTORNO URBANO
        //FIN INFRAESTRUCTURA URBANA
        
        //INICIA USO DE SUELO
        //GENERAL
                var usosu1 = new OpenLayers.Layer.WMS(
                           "Uso de suelo",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:gits_uso_suelo_2012', transparent: true},
                           {UsuSueloGEN: true, visibility: false}
                   );
//                   var usosu2 = new OpenLayers.Layer.WMS(
//                           "Asentamientos humanos irregulares",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:seduvi_asentamientos_humanos_irregulares_2010_03jul2012', transparent: true},
//                           {UsuSueloGEN: true, visibility: false}
//                   );
//                   var usosu3 = new OpenLayers.Layer.WMS(
//                           "ZEDIS",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:seduvi_zedis_03jul2012', transparent: true},
//                           {UsuSueloGEN: true, visibility: false}
//                   );
                   var usosu4 = new OpenLayers.Layer.WMS(
                           "Áreas verdes (i)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:seduvi_areas_verdes_hibrido_sma_ife_03jul2012', transparent: true},
                           {UsuSueloGEN: true, visibility: false}
                   );
                   var usosu5 = new OpenLayers.Layer.WMS(
                           "Áreas verdes (ii)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigat_areas_verdes_2005', transparent: true},
                           {UsuSueloGEN: true, visibility: false}
                   );
                   var usosu6 = new OpenLayers.Layer.WMS(
                           "Áreas verdes (iii)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigat_parques_df_2005', transparent: true},
                           {UsuSueloGEN: true, visibility: false}
                   );
                   var usosu7 = new OpenLayers.Layer.WMS(
                           "Áreas verdes (iv)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:seduvi_areas_verdes_03jul2012', transparent: true},
                           {UsuSueloGEN: true, visibility: false}
                   );
                   var usosu8 = new OpenLayers.Layer.WMS(
                           "Bosques urbanos",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:seduvi_bosques_urbanos_03jul2012', transparent: true},
                           {UsuSueloGEN: true, visibility: false}
                   );
        //FIN GENERAL
        //FIN USO DE SUELO
           
        //INICIA MEDIO FISICO
        //HIDROLOGIA SUPERFICIAL
             var hidrsup1 = new OpenLayers.Layer.WMS(
                           "Ríos (i)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:seduvi_rios_ife_03jul2012', transparent: true},
                           {MedioFisicoHIDRSUP: true, visibility: false}
                   );
              var hidrsup2 = new OpenLayers.Layer.WMS(
                           "Ríos (ii)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:seduvi_rios_siedu_03jul2012', transparent: true},
                           {MedioFisicoHIDRSUP: true, visibility: false}
                   );
            var hidrsup3 = new OpenLayers.Layer.WMS(
                           "Cuerpos de agua (i)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:seduvi_lagos_ife_03jul2012', transparent: true},
                           {MedioFisicoHIDRSUP: true, visibility: false}
                   );
            var hidrsup4 = new OpenLayers.Layer.WMS(
                           "Cuerpos de agua (ii)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:seduvi_cuerpos_agua_siedu_03jul2012', transparent: true},
                           {MedioFisicoHIDRSUP: true, visibility: false}
                   );
            var hidrsup5 = new OpenLayers.Layer.WMS(
                           "Cuerpos de agua (iii)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigat_cuerpos_agua_2005', transparent: true},
                           {MedioFisicoHIDRSUP: true, visibility: false}
                   );
        //FIN HIDROLOGIA SUPERFICIAL
        //PELIGROS
            var pelig1 = new OpenLayers.Layer.WMS(
                           "Barrancas",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:seduvi_barrancas_area_15dic2011', transparent: true},
                           {MedioFisicoPELIGRO: true, visibility: false}
                   );
            var pelig2 = new OpenLayers.Layer.WMS(
                           "Límites de barrancas",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:seduvi_barrancas_linea_15dic2011', transparent: true},
                           {MedioFisicoPELIGRO: true, visibility: false}
                   );
        //FIN PELIGROS
        //GEOTECNICA
             var geotec1 = new OpenLayers.Layer.WMS(
                           "Zona de lago",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:seduvi_grid_lago_03jul2012', transparent: true},
                           {MedioFisicoGEOTEC: true, visibility: false}
                   );
            var geotec2 = new OpenLayers.Layer.WMS(
                           "Zona de transición",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:seduvi_grid_transicion_03jul2012', transparent: true},
                           {MedioFisicoGEOTEC: true, visibility: false}
                   );
        //FIN GEOTECNICA
        //FIN MEDIO FISICO
        
        //INICIO ACCIDENTES DE TRANSITO
        //DIAGNOSTICO
//            var accid0 = new OpenLayers.Layer.WMS(
//                           "Registro accidentes",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:registro_accidentes', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//            var accid1 = new OpenLayers.Layer.WMS(
//                           "Accidente de trÃ¡nsito en acceso carreteros (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_accesos_carreteros_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
            
           var accid1 = new OpenLayers.Layer.WMS(
                           "Total de accidentes de tránsito (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_accidentes_2005', transparent: true},
                           {ACCIDENTESTRA: true, visibility: false}
                   );
           var accid14 = new OpenLayers.Layer.WMS(
                           "Total de involucrados en accidentes de tránsito (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_involucrados_2005', transparent: true},
                           {ACCIDENTESTRA: true, visibility: false}
                   );
           var accid0 = new OpenLayers.Layer.WMS(
                           "Registro accidentes de tránsito",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:registro_accidentes', transparent: true},
                           {ACCIDENTESTRA: true, visibility: true}
                   );
           var accid15 = new OpenLayers.Layer.WMS(
                           "Zonas de accidentabilidad vial (densidad de Kernel) (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_zonas_densidad_kernel_2005', transparent: true},
                           {ACCIDENTESTRA: true, visibility: false}
                   );
           var accid2 = new OpenLayers.Layer.WMS(
                           "Atropellamientos (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_atropellamientos_2005', transparent: true},
                           {TIPOACCIDENTESTRA: true, visibility: false}
                   );
           var accid3 = new OpenLayers.Layer.WMS(
                           "Colisiones (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_colision_2005', transparent: true},
                           {TIPOACCIDENTESTRA: true, visibility: false}
                   );
           var accid4 = new OpenLayers.Layer.WMS(
                           "Caídas pasajeros (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_caidapasajero_2005', transparent: true},
                           {TIPOACCIDENTESTRA: true, visibility: false}
                   );
           
//           var accid6 = new OpenLayers.Layer.WMS(
//                           "Colisiones y atropellamientos (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_colision_atropellamiento_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid7 = new OpenLayers.Layer.WMS(
//                           "Conductores involucrados en accidentes de trÃ¡nsito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_conductores_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid8 = new OpenLayers.Layer.WMS(
//                           "Corredores de alta accidentabilidad vual (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_corredores_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid9 = new OpenLayers.Layer.WMS(
//                           "CaÃ­das de pasajeros, derrapes y volvaduras (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_cp_der_volc_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
           var accid5 = new OpenLayers.Layer.WMS(
                           "Derrapes (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_derrapes_2005', transparent: true},
                           {TIPOACCIDENTESTRA: true, visibility: false}
                   );
           var accid6 = new OpenLayers.Layer.WMS(
                           "Volcaduras (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_volcaduras_2005', transparent: true},
                           {TIPOACCIDENTESTRA: true, visibility: false}
                   );
//           var accid11 = new OpenLayers.Layer.WMS(
//                           "Accidentes de trÃ¡nsito en ejes viales (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_ejesviales_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid12 = new OpenLayers.Layer.WMS(
//                           "Hombres involucrados en accidentes de trÃ¡nsito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_hombres_involucrados_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid13 = new OpenLayers.Layer.WMS(
//                           "Ilesos involucrados en accidentes de trÃ¡nsito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_ilesos_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid14 = new OpenLayers.Layer.WMS(
//                           "Total de involucrados en accidentes de trÃ¡nsito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_involucrados_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
           var accid7 = new OpenLayers.Layer.WMS(
                           "Lesionados por accidentes de tránsito (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_lesionados_2005', transparent: true},
                           {VICACCIDENTESTRA: true, visibility: false}
                   );
           var accid8 = new OpenLayers.Layer.WMS(
                           "Muertos en accidentes de tránsito (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_muertos_2005', transparent: true},
                           {VICACCIDENTESTRA: true, visibility: false}
                   );
           var accid9 = new OpenLayers.Layer.WMS(
                           "Accidentes de tránsito en vías anulares (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_vias_anulares_2005', transparent: true},
                           {VIALIACCIDENTESTRA: true, visibility: false}
                   );
           var accid10 = new OpenLayers.Layer.WMS(
                           "Accidentes de tránsito en viaductos (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_viaductos_2005', transparent: true},
                           {VIALIACCIDENTESTRA: true, visibility: false}
                   );
           var accid11 = new OpenLayers.Layer.WMS(
                           "Accidentes de tránsito en vías radiales (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_vias_radiales_2005', transparent: true},
                           {VIALIACCIDENTESTRA: true, visibility: false}
                   );
           var accid12 = new OpenLayers.Layer.WMS(
                           "Accidentes de tránsito vías principales (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_vias_principales_2005', transparent: true},
                           {VIALIACCIDENTESTRA: true, visibility: false}
                   );
           var accid13 = new OpenLayers.Layer.WMS(
                           "Accidentes de tránsito en vías locales (2005)",
                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
                           {'layers': 'GITSDF:sigatdf_vias_locales_2005', transparent: true},
                           {VIALIACCIDENTESTRA: true, visibility: false}
                   );
           
           
//           var accid16 = new OpenLayers.Layer.WMS(
//                           "Matriz accidentes de trÃ¡nsito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_matriz_accidentes_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           
//           var accid18 = new OpenLayers.Layer.WMS(
//                           "Mujeres involucradas en accidentes de trÃ¡nsito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_mujeres_involucradas_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid19 = new OpenLayers.Layer.WMS(
//                           "Pasajeros involucrados en accidentes de trÃ¡nsito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_pasajeros_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid20 = new OpenLayers.Layer.WMS(
//                           "Peatones involucrados en accidentes de trÃ¡nsito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_peatones_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid21 = new OpenLayers.Layer.WMS(
//                           "JerarquÃ­a de la red vial",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_red_vial_simplificada_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid22 = new OpenLayers.Layer.WMS(
//                           "Involucrados en accidentes de trÃ¡nsito de los que se ignora condiciÃ³n (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_seignora_condicion_involucrado_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid23 = new OpenLayers.Layer.WMS(
//                           "Se desconoce el sexo de involucrados en accidentes de trÃ¡nsito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_seignora_sexo_involucrados_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid24 = new OpenLayers.Layer.WMS(
//                           "Se desconoce el tipo de involucrados en accidentes de trÃ¡nsito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_seignora_tipo_involucrado_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid25 = new OpenLayers.Layer.WMS(
//                           "Sexo de los involucrados en accidentes de trÃ¡nsito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_sexo_involucrados_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid26 = new OpenLayers.Layer.WMS(
//                           "Peatones, pasajeros y conductores involucrados en accidentes de trÃ¡nsito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_tipo_involucrado_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           var accid27 = new OpenLayers.Layer.WMS(
//                           "Tipos de accidentes de transito (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_tipos_accidentes_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           
//           
//           
//           var accid33 = new OpenLayers.Layer.WMS(
//                           "VÃ­ctimas por accidentes de trÃ¡nsito (muertos y lesionados) (2005)",
//                           "http://132.247.103.134:8080/geoservergits/GITSDF/wms",
//                           {'layers': 'GITSDF:sigatdf_victimas_2005', transparent: true},
//                           {ACCIDENTESTRA: true, visibility: false}
//                   );
//           
//           
        //FIN DIAGNOSTICO
        //FIN ACCIDENTES DE TRANSITO
   
    
 


    var sprintersLayer = new OpenLayers.Layer.Vector("Sprinters", {
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: "img/mobile-loc.png",
            graphicOpacity: 1.0,
            graphicWidth: 16,
            graphicHeight: 26,
            graphicYOffset: -26
        })
    });

    var sprinters = getFeatures();
    sprintersLayer.addFeatures(sprinters);

    var selectControl = new OpenLayers.Control.SelectFeature(sprintersLayer, {
        autoActivate:true,
        onSelect: onSelectFeatureFunction});

    var geolocate = new OpenLayers.Control.Geolocate({
        id: 'locate-control',
        geolocationOptions: {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 7000
        }
    });

        info = new OpenLayers.Control.WMSGetFeatureInfo({
            url: 'http://132.247.103.134:8080/geoservergits/GITSDF/wms', 
            title: 'Identify features by clicking',
            queryVisible: true,
            eventListeners: {
                getfeatureinfo: function(event) {
                    map.addPopup(new OpenLayers.Popup.FramedCloud(
                        "infos", 
                        map.getLonLatFromPixel(event.xy),
                        null,
                        event.text,
                        null,
                        true
                    ));
                }
            }
        });
        
    
       
    // create map
    map = new OpenLayers.Map({
        div: "map",
//        theme: null,
//        projection: sm,
        //numZoomLevels: 18,
        
        controls: [
            //new OpenLayers.Control.ZoomBox({alwaysZoom:true}),
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.TouchNavigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            }),
            
             new OpenLayers.Control.MousePosition({
                    prefix: '<a style="color: black; font-weight:bold" target="_blank" ' +
                        'href="http://spatialreference.org/ref/epsg/4326/">' +
                        'Coordenadas: ',
                    separator: ' | ',
                    numDigits: 2,
                    emptyString: 'Coordenadas Mapa'
                }),
            
            
            
            toolbar,
            geolocate,
            info,
            selectControl,
            //mousePosition,
            
        ],
        
       

        layers: [
                       new OpenLayers.Layer.OSM("Open StreetMap", null, {
                transitionEffect: 'resize'
            }),
  
                        new OpenLayers.Layer.OSM("Open CycleMap",
			
                            ["http://a.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png",
                               "http://b.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png",
                               "http://c.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png"
                           ]),
                        
//            new OpenLayers.Layer.Google(
//                "Google Physical",
//                {type: google.maps.MapTypeId.TERRAIN}
//            ),
//            new OpenLayers.Layer.Google(
//                "Google Streets", // the default
//                {numZoomLevels: 20}
//            ),
//            new OpenLayers.Layer.Google(
//                "Google Hybrid",
//                {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
//            ),
//            new OpenLayers.Layer.Google(
//                "Google Satellite",
//                {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
//            ),            
//             new OpenLayers.Layer.Google(
//                "Google Trafic",
//                {type: google.maps.TrafficLayer()}
//            ),
    
//             var trafficLayer = new google.maps.TrafficLayer();
//             trafficLayer.setMap(map);

              
       
             
            
          
            la1,la2,la3,
            pi1,pi2,pi3,pi4,pi5,pi6,pi7,pi8,
            mt2,sct1,sct2,metr1,metr2,rtp1,rtp2,rtp3,bici1,bici3,
            elredv1,elredv2,elredv4,elredv5,elredv6,dispcon1,
            puent1,
            poste1,poste2,poste3,poste4,poste5,infrahidr1,infrahidr3,infrahidr4,infrahidr5,
            entorurb1,usosu1,usosu4,usosu5,usosu6,usosu7,usosu8,
            hidrsup1,hidrsup2,hidrsup3,hidrsup4,hidrsup5,pelig1,pelig2,
            geotec1,geotec2,
            accid15,accid1,accid2,accid3,accid4,accid5,accid6,accid7,accid8,accid9,accid10,accid11,accid12,
            accid13,accid14,accid0,
             vector2
        ],
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        zoom: 1,
    });
    
    
       
      
    
    
     
     map.setCenter(position, zoom );
  
    // map.addControl(mousePosition);
    toolbar.controls[0].activate();
    info.activate();
    //zb.activate();
    
    


	
    var style = {
        fillOpacity: 0.1,
        fillColor: '#000',
        strokeColor: '#f00',
        strokeOpacity: 0.6
    };
    geolocate.events.register("locationupdated", this, function(e) {
        vector2.removeAllFeatures();
        vector2.addFeatures([
            new OpenLayers.Feature.Vector(
                e.point,
                {},
                {
                    graphicName: 'cross',
                    strokeColor: '#f00',
                    strokeWidth: 2,
                    fillOpacity: 0,
                    pointRadius: 10
                }
            ),
            new OpenLayers.Feature.Vector(
                OpenLayers.Geometry.Polygon.createRegularPolygon(
                    new OpenLayers.Geometry.Point(e.point.x, e.point.y),
                    e.position.coords.accuracy / 2,
                    50,
                    0
                ),
                {},
                style
            )
        ]);
        map.zoomToExtent(vector2.getDataExtent());
    });
    


    function getFeatures() {
        var features = {
            "type": "FeatureCollection",
            "features": [
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [1332700, 7906300]},
                    "properties": {"Name": "Igor Tihonov", "Country":"Sweden", "City":"Gothenburg"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [790300, 6573900]},
                    "properties": {"Name": "Marc Jansen", "Country":"Germany", "City":"Bonn"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [568600, 6817300]},
                    "properties": {"Name": "Bart van den Eijnden", "Country":"Netherlands", "City":"Utrecht"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [-7909900, 5215100]},
                    "properties": {"Name": "Christopher Schmidt", "Country":"United States of America", "City":"Boston"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [-937400, 5093200]},
                    "properties": {"Name": "Jorge Gustavo Rocha", "Country":"Portugal", "City":"Braga"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [-355300, 7547800]},
                    "properties": {"Name": "Jennie Fletcher ", "Country":"Scotland", "City":"Edinburgh"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [657068.53608487, 5712321.2472725]},
                    "properties": {"Name": "Bruno Binet ", "Country":"France", "City":"ChambÃ©ry"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [667250.8958124, 5668048.6072737]},
                    "properties": {"Name": "Eric Lemoine", "Country":"France", "City":"Theys"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [653518.03606319, 5721118.5122914]},
                    "properties": {"Name": "Antoine Abt", "Country":"France", "City":"La Motte Servolex"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [657985.78042416, 5711862.6251028]},
                    "properties": {"Name": "Pierre Giraud", "Country":"France", "City":"ChambÃ©ry"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [742941.93818208, 5861818.9477535]},
                    "properties": {"Name": "StÃ©phane Brunner", "Country":"Switzerland", "City":"Paudex"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [736082.61064069, 5908165.4649505]},
                    "properties": {"Name": "FrÃ©dÃ©ric Junod", "Country":"Switzerland", "City":"Montagny-prÃ¨s-Yverdon"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [771595.97057525, 5912284.7041793]},
                    "properties": {"Name": "CÃ©dric Moullet", "Country":"Switzerland", "City":"Payerne"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [744205.23922364, 5861277.319748]},
                    "properties": {"Name": "Benoit Quartier", "Country":"Switzerland", "City":"Lutry"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [1717430.147101, 5954568.7127565]},
                    "properties": {"Name": "Andreas Hocevar", "Country":"Austria", "City":"Graz"}},
                { "type": "Feature", "geometry": {"type": "Point", "coordinates": [-12362007.067301,5729082.2365672]},
                    "properties": {"Name": "Tim Schaub", "Country":"United States of America", "City":"Bozeman"}}
            ]
        };

        var reader = new OpenLayers.Format.GeoJSON();

        return reader.read(features);
    }

};


	