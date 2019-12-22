


	var marker;
	var lats = []; var lngs = [];
function removeLayer()
{
map.removeLayer(marker)
}
	function handleFiles(files) {
    // Check for the various File API support.
    if (window.FileReader) {
        // FileReader are supported.
        getAsText(files[0]);
    } else {
        alert('FileReader are not supported in this browser.');
    }
}

function getAsText(fileToRead) {
    var reader = new FileReader();
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
    // Read file into memory as UTF-8
    reader.readAsText(fileToRead);
}

function loadHandler(event) {
    var csv = event.target.result;
    processData(csv);
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);

var lines = [];
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }
    console.log(lines);
    //drawOutput(lines);
    addMarker(lines);
}

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
}

  function addMarker(lines)
{  for (var i = 1; i < lines.length-1; i++)
    for (var j = 0; j < lines[i].length-1; j++) {
	lats.push(lines[i][3]);
    lngs.push(lines[i][4]);
      marker = L.marker([lines[i][3],
          lines[i][4]]).addTo(map);
		  marker.bindPopup("<strong>" + lines[i][2] + "\n"+lines[i][1]+"</strong>").addTo(map);
      }
	  var minlat = Math.min.apply(null, lats),
    maxlat = Math.max.apply(null, lats);
var minlng = Math.min.apply(null, lngs),
    maxlng = Math.max.apply(null, lngs);

// create a bounding rectangle that can be used in leaflet
bbox = [[minlat,minlng],[maxlat,maxlng]];
console.log(bbox);
// add the bounding box to the map, and set the map extent to it
L.rectangle(bbox).addTo(map);
map.fitBounds(bbox);

}



			function loadFile() {

    input = document.getElementById('fileinput');
    if (!input.files[0]) {
        bodyAppend("p", "Please select a file before clicking 'Load'");
    }
    else {
        file = input.files[0];

        fr = new FileReader();
        fr.onload = receiveBinary;
        fr.readAsArrayBuffer(file);
    }
    function receiveBinary() {
        result = fr.result
        var shpfile = new L.Shapefile(result);
        shpfile.addTo(map);
		<!-- shp(result).then(function(data){ -->
		<!-- geo.addData(data); -->
		<!-- }); -->
    }


}





        var map = new MapmyIndia.Map("mapid", {
            center: [28.61, 77.23],
            zoomControl: true,
            zoom: 8,
            hybrid: true
        });
        // var marker=L.marker([28.61, 77.23]).addTo(map);
        // marker.bindPopup('Hello World');

        // addoverlaytoMapmyIndia(MapmyIndia);


        // getState------------

        var GeoDataLayer1;
        var geoParams1;
        var propertyName;
        var val;
        var layername;

        // call php curl and get token
        var token = "d5a4dad0-3514-4861-90b1-484bb35e766d";
		var accesstoken = token;

        $("#flip1 input[type='checkbox']").change(function () {
            val = $(this).val();
            propertyName = $('#pro').val();
            layername = $('#layername1').val();

            var geoboundtype = $('#geoboundtype').val();
            var geobound = $('#geobound').val();
			geobound = geobound.split(",");
			var new_geobound = "";
				var i;
				for (i=0;i<geobound.length-1;i++)
				{
					new_geobound = new_geobound + ''+geobound[i]+',';
				}
				new_geobound = new_geobound + ''+geobound[i]+'';
				new_geobound = new_geobound.split(",");
            var attribute = $('#attribute').val();
            var query = $('#query').val();
            var label = $('#label').val();
            if (label == "true") {
                label = true;
            } else {
                label = false;
            }
            var labelsize = parseInt($('#labelsize').val());
            var labelcolor = $('#labelcolor').val().slice(1);
            var fillcolor = $('#fillcolor').val().slice(1);
            var bordercolor = $('#bordercolor').val().slice(1);
            var borderwidth = parseInt($('#borderwidth').val());
            var opacity = parseFloat($('#opacity').val());

            var geo = window['geoParams' + val.replace('GeoDataLayer', '')];
            if (this.checked) // if changed state is "CHECKED"
            {
                geoParams1 = {
					AccessToken : accesstoken,
                    GeoBoundType: geoboundtype,
                    GeoBound: new_geobound,
                    Attribute: attribute,
                    Query: query,
                    Style: {
                        Label: label,
                        LabelColor: labelcolor,
                        LabelSize: labelsize,
                        FillColor: fillcolor,
                        BorderColor: bordercolor,
                        BorderWidth: borderwidth,
                        Opacity: opacity
                    }
                };
                GeoDataLayer1 = geoAnalytics.getState(geoParams1);
                <!-- $.getJSON('https://uatgeoanalytics.mapmyindia.in/listingapi?api=state&geo_bound_type=' + -->
                    <!-- geoParams1[ -->
                        <!-- 'GeoBoundType'] + '&geo_bound=' + geoParams1['GeoBound'] + '&get_attr=b_box', -->
                    <!-- function ( -->
                        <!-- data) { -->
                        <!-- console.log(data); -->
                        <!-- var BBOX = (data.results[0].get_attr_values[0].get_attr_values[0].match( -->
                            <!-- /\(([^)]+)\)/)[1]).split(','); -->
                        <!-- var BBOXmin = BBOX[0].split(' '); -->
                        <!-- var BBOXmax = BBOX[1].split(' '); -->
                        <!-- map.fitBounds([ -->
                            <!-- [BBOXmin[1], BBOXmin[0]], -->
                            <!-- [BBOXmax[1], BBOXmax[0]] -->
                        <!-- ]); -->
                    <!-- }); -->
					if (geoParams1){
	 geoAnalytics.setBounds('state',geoParams1,map);
	 }
                map.addLayer(GeoDataLayer1);
            } else {
                map.removeLayer(GeoDataLayer1);
            }
        });




        // getDistrict------------

        var GeoDataLayer2;
        var geoParams2;
        $("#flip2 input[type='checkbox']").change(function () {
            val = $(this).val();
            propertyName = $('#pro1').val();
            layername = $('#layername2').val();

            var geoboundtype1 = $('#geoboundtype1').val();
            var geobound1 = $('#geobound1').val();
			geobound1 = geobound1.split(",");
			var new_geobound = "";
				var i;
				for (i=0;i<geobound1.length-1;i++)
				{
					new_geobound = new_geobound + ''+geobound1[i]+',';
				}
				new_geobound = new_geobound + ''+geobound1[i]+'';
				new_geobound = new_geobound.split(",");
            var attribute1 = $('#attribute1').val();
            var query1 = $('#query1').val();
            var label1 = $('#label1').val();
            if (label1 == "true") {
                label1 = true;
            } else {
                label1 = false;
            }
            var labelsize1 = parseInt($('#labelsize1').val());
            var labelcolor1 = $('#labelcolor1').val().slice(1);
            var fillcolor1 = $('#fillcolor1').val().slice(1);
            var bordercolor1 = $('#bordercolor1').val().slice(1);
            var borderwidth1 = parseInt($('#borderwidth1').val());
            var opacity1 = parseFloat($('#opacity1').val());

            var geo = window['geoParams' + val.replace('GeoDataLayer', '')];
            if (this.checked) // if changed state is "CHECKED"
            {
                geoParams2 = {
					AccessToken : accesstoken,
                    GeoBoundType: geoboundtype1,
                    GeoBound: new_geobound,
                    Attribute: attribute1,
                    Query: query1,
                    Style: {
                        Label: label1,
                        LabelColor: labelcolor1,
                        LabelSize: labelsize1,
                        FillColor: fillcolor1,
                        BorderColor: bordercolor1,
                        BorderWidth: borderwidth1,
                        Opacity: opacity1
                    }
                };
                GeoDataLayer2 = geoAnalytics.getDistrict(geoParams2);
                <!-- $.getJSON('https://uatgeoanalytics.mapmyindia.in/listingapi?api=district&geo_bound_type=' + -->
                    <!-- geoParams2[ -->
                        <!-- 'GeoBoundType'] + '&geo_bound=' + geoParams2['GeoBound'] + '&get_attr=b_box', -->
                    <!-- function ( -->
                        <!-- data) { -->
                        <!-- console.log(data); -->
                        <!-- var BBOX = (data.results[0].get_attr_values[0].get_attr_values[0].match( -->
                            <!-- /\(([^)]+)\)/)[1]).split(','); -->
                        <!-- var BBOXmin = BBOX[0].split(' '); -->
                        <!-- var BBOXmax = BBOX[1].split(' '); -->
                        <!-- map.fitBounds([ -->
                            <!-- [BBOXmin[1], BBOXmin[0]], -->
                            <!-- [BBOXmax[1], BBOXmax[0]] -->
                        <!-- ]); -->
                    <!-- }); -->
					if (geoParams2){
	 geoAnalytics.setBounds('district',geoParams2,map);
	 }
                map.addLayer(GeoDataLayer2);
            } else {
                map.removeLayer(GeoDataLayer2);
            }
        });


        // getSubdistrict------------

        var GeoDataLayer3;
        var geoParams3;
        $("#flip3 input[type='checkbox']").change(function () {
            val = $(this).val();
            propertyName = $('#pro2').val();
            layername = $('#layername3').val();

            var geoboundtype2 = $('#geoboundtype2').val();
            var geobound2 = $('#geobound2').val();
			geobound2 = geobound2.split(",");
			var new_geobound = "";
				var i;
				for (i=0;i<geobound2.length-1;i++)
				{
					new_geobound = new_geobound + ''+geobound2[i]+',';
				}
				new_geobound = new_geobound + ''+geobound2[i]+'';
				new_geobound = new_geobound.split(",");
            var attribute2 = $('#attribute2').val();
            var query2 = $('#query2').val();
            var label2 = $('#label2').val();
            if (label2 == "true") {
                label2 = true;
            } else {
                label2 = false;
            }
            var labelsize2 = parseInt($('#labelsize2').val());
            var labelcolor2 = $('#labelcolor2').val().slice(1);
            var fillcolor2 = $('#fillcolor2').val().slice(1);
            var bordercolor2 = $('#bordercolor2').val().slice(1);
            var borderwidth2 = parseInt($('#borderwidth2').val());
            var opacity2 = parseFloat($('#opacity2').val());

            var geo = window['geoParams' + val.replace('GeoDataLayer', '')];
            if (this.checked) // if changed state is "CHECKED"
            {
                geoParams3 = {
					AccessToken : accesstoken,
                    GeoBoundType: geoboundtype2,
                    GeoBound: new_geobound,
                    Attribute: attribute2,
                    Query: query2,
                    Style: {
                        Label: label2,
                        LabelColor: labelcolor2,
                        LabelSize: labelsize2,
                        FillColor: fillcolor2,
                        BorderColor: bordercolor2,
                        BorderWidth: borderwidth2,
                        Opacity: opacity2
                    }
                };
                GeoDataLayer3 = geoAnalytics.getSubdistrict(geoParams3);
                <!-- $.getJSON('https://uatgeoanalytics.mapmyindia.in/listingapi?api=subdistrict&geo_bound_type=' + -->
                    <!-- geoParams3[ -->
                        <!-- 'GeoBoundType'] + '&geo_bound=' + geoParams3['GeoBound'] + '&get_attr=b_box', -->
                    <!-- function ( -->
                        <!-- data) { -->
                        <!-- console.log(data); -->
                        <!-- var BBOX = (data.results[0].get_attr_values[0].get_attr_values[0].match( -->
                            <!-- /\(([^)]+)\)/)[1]).split(','); -->
                        <!-- var BBOXmin = BBOX[0].split(' '); -->
                        <!-- var BBOXmax = BBOX[1].split(' '); -->
                        <!-- map.fitBounds([ -->
                            <!-- [BBOXmin[1], BBOXmin[0]], -->
                            <!-- [BBOXmax[1], BBOXmax[0]] -->
                        <!-- ]); -->
                    <!-- }); -->
					if (geoParams3){
	 geoAnalytics.setBounds('subdistrict',geoParams3,map);
	 }
                map.addLayer(GeoDataLayer3);
            } else {
                map.removeLayer(GeoDataLayer3);
            }
        });


        // getWard------------

        var GeoDataLayer4;
        var geoParams4;
        $("#flip4 input[type='checkbox']").change(function () {
            val = $(this).val();
            propertyName = $('#pro3').val();
            layername = $('#layername4').val();

            var geoboundtype3 = $('#geoboundtype3').val();
            var geobound3 = $('#geobound3').val();
			geobound3 = geobound3.split(",");
			var new_geobound = "";
				var i;
				for (i=0;i<geobound3.length-1;i++)
				{
					new_geobound = new_geobound + ''+geobound3[i]+',';
				}
				new_geobound = new_geobound + ''+geobound3[i]+'';
				new_geobound = new_geobound.split(",");
            var attribute3 = $('#attribute3').val();
            var query3 = $('#query3').val();
            var label3 = $('#label3').val();
            if (label3 == "true") {
                label3 = true;
            } else {
                label3 = false;
            }
            var labelsize3 = parseInt($('#labelsize3').val());
            var labelcolor3 = $('#labelcolor3').val().slice(1);
            var fillcolor3 = $('#fillcolor3').val().slice(1);
            var bordercolor3 = $('#bordercolor3').val().slice(1);
            var borderwidth3 = parseInt($('#borderwidth3').val());
            var opacity3 = parseFloat($('#opacity3').val());

            var geo = window['geoParams' + val.replace('GeoDataLayer', '')];
            if (this.checked) // if changed state is "CHECKED"
            {
                geoParams4 = {
					AccessToken : accesstoken,
                    GeoBoundType: geoboundtype3,
                    GeoBound: new_geobound,
                    Attribute: attribute3,
                    Query: query3,
                    Style: {
                        Label: label3,
                        LabelColor: labelcolor3,
                        LabelSize: labelsize3,
                        FillColor: fillcolor3,
                        BorderColor: bordercolor3,
                        BorderWidth: borderwidth3,
                        Opacity: opacity3
                    }
                };
                GeoDataLayer4 = geoAnalytics.getWard(geoParams4);
                <!-- $.getJSON('https://uatgeoanalytics.mapmyindia.in/listingapi?api=ward&geo_bound_type=' + -->
                    <!-- geoParams4[ -->
                        <!-- 'GeoBoundType'] + '&geo_bound=' + geoParams4['GeoBound'] + '&get_attr=b_box', -->
                    <!-- function ( -->
                        <!-- data) { -->
                        <!-- console.log(data); -->
                        <!-- var BBOX = (data.results[0].get_attr_values[0].get_attr_values[0].match( -->
                            <!-- /\(([^)]+)\)/)[1]).split(','); -->
                        <!-- var BBOXmin = BBOX[0].split(' '); -->
                        <!-- var BBOXmax = BBOX[1].split(' '); -->
                        <!-- map.fitBounds([ -->
                            <!-- [BBOXmin[1], BBOXmin[0]], -->
                            <!-- [BBOXmax[1], BBOXmax[0]] -->
                        <!-- ]); -->
                    <!-- }); -->
					if (geoParams4){
	 geoAnalytics.setBounds('ward',geoParams4,map);
	 }
                map.addLayer(GeoDataLayer4);
            } else {
                map.removeLayer(GeoDataLayer4);
            }
        });


        // getLocality------------

        var GeoDataLayer5;
        var geoParams5;
        $("#flip5 input[type='checkbox']").change(function () {
            val = $(this).val();
            propertyName = $('#pro4').val();
            layername = $('#layername5').val();

            var geoboundtype4 = $('#geoboundtype4').val();
            var geobound4 = $('#geobound4').val();
			geobound4 = geobound4.split(",");
			var new_geobound = "";
				var i;
				for (i=0;i<geobound4.length-1;i++)
				{
					new_geobound = new_geobound + ''+geobound4[i]+',';
				}
				new_geobound = new_geobound + ''+geobound4[i]+'';
				new_geobound = new_geobound.split(",");
            // var attribute4= $('#attribute').val();
            // var query4= $('#query').val();
            var label4 = $('#label4').val();
            if (label4 == "true") {
                label4 = true;
            } else {
                label4 = false;
            }
            var labelsize4 = parseInt($('#labelsize4').val());
            var labelcolor4 = $('#labelcolor4').val().slice(1);
            var fillcolor4 = $('#fillcolor4').val().slice(1);
            var bordercolor4 = $('#bordercolor4').val().slice(1);
            var borderwidth4 = parseInt($('#borderwidth4').val());
            var opacity4 = parseFloat($('#opacity4').val());

            var geo = window['geoParams' + val.replace('GeoDataLayer', '')];
            if (this.checked) // if changed state is "CHECKED"
            {
                geoParams5 = {
					AccessToken : accesstoken,
                    GeoBoundType: geoboundtype4,
                    GeoBound: new_geobound,
                    // Attribute: attribute4,
                    // Query: query4,
                    Style: {
                        Label: label4,
                        LabelColor: labelcolor4,
                        LabelSize: labelsize4,
                        FillColor: fillcolor4,
                        BorderColor: bordercolor4,
                        BorderWidth: borderwidth4,
                        Opacity: opacity4
                    }
                };
                GeoDataLayer5 = geoAnalytics.getLocality(geoParams5);
                <!-- $.getJSON('https://uatgeoanalytics.mapmyindia.in/listingapi?api=locality&geo_bound_type=' + -->
                    <!-- geoParams5[ -->
                        <!-- 'GeoBoundType'] + '&geo_bound=' + geoParams5['GeoBound'] + '&get_attr=b_box', -->
                    <!-- function ( -->
                        <!-- data) { -->
                        <!-- console.log(data); -->
                        <!-- var BBOX = (data.results[0].get_attr_values[0].get_attr_values[0].match( -->
                            <!-- /\(([^)]+)\)/)[1]).split(','); -->
                        <!-- var BBOXmin = BBOX[0].split(' '); -->
                        <!-- var BBOXmax = BBOX[1].split(' '); -->
                        <!-- map.fitBounds([ -->
                            <!-- [BBOXmin[1], BBOXmin[0]], -->
                            <!-- [BBOXmax[1], BBOXmax[0]] -->
                        <!-- ]); -->
                    <!-- }); -->
					if (geoParams5){
	 geoAnalytics.setBounds('locality',geoParams5,map);
	 }
                map.addLayer(GeoDataLayer5);
            } else {
                map.removeLayer(GeoDataLayer5);
            }
        });


        // getPanchayat------------

        var GeoDataLayer6;
        var geoParams6;
        $("#flip6 input[type='checkbox']").change(function () {
            val = $(this).val();
            propertyName = $('#pro5').val();
            layername = $('#layername6').val();

            var geoboundtype5 = $('#geoboundtype5').val();
            var geobound5 = $('#geobound5').val();
			geobound5 = geobound5.split(",");
			var new_geobound = "";
				var i;
				for (i=0;i<geobound5.length-1;i++)
				{
					new_geobound = new_geobound + ''+geobound5[i]+',';
				}
				new_geobound = new_geobound + ''+geobound5[i]+'';
				new_geobound = new_geobound.split(",");
            var attribute5 = $('#attribute5').val();
            var query5 = $('#query5').val();
            var label5 = $('#label5').val();
            if (label5 == "true") {
                label5 = true;
            } else {
                label5 = false;
            }
            var labelsize5 = parseInt($('#labelsize5').val());
            var labelcolor5 = $('#labelcolor5').val().slice(1);
            var fillcolor5 = $('#fillcolor5').val().slice(1);
            var bordercolor5 = $('#bordercolor5').val().slice(1);
            var borderwidth5 = parseInt($('#borderwidth5').val());
            var opacity5 = parseFloat($('#opacity5').val());

            var geo = window['geoParams' + val.replace('GeoDataLayer', '')];
            if (this.checked) // if changed state is "CHECKED"
            {
                geoParams6 = {
					AccessToken : accesstoken,
                    GeoBoundType: geoboundtype5,
                    GeoBound: new_geobound,
                    Attribute: attribute5,
                    Query: query5,
                    Style: {
                        Label: label5,
                        LabelColor: labelcolor5,
                        LabelSize: labelsize5,
                        FillColor: fillcolor5,
                        BorderColor: bordercolor5,
                        BorderWidth: borderwidth5,
                        Opacity: opacity5
                    }
                };
                GeoDataLayer6 = geoAnalytics.getPanchayat(geoParams6);
                <!-- $.getJSON('https://uatgeoanalytics.mapmyindia.in/listingapi?api=panchayat&geo_bound_type=' + -->
                    <!-- geoParams6['GeoBoundType'] + '&geo_bound=' + geoParams6['GeoBound'] + '&get_attr=b_box', -->
                    <!-- function ( -->
                        <!-- data) { -->
                        <!-- console.log(data); -->
                        <!-- var BBOX = (data.results[0].get_attr_values[0].get_attr_values[0].match( -->
                            <!-- /\(([^)]+)\)/)[1]).split(','); -->
                        <!-- var BBOXmin = BBOX[0].split(' '); -->
                        <!-- var BBOXmax = BBOX[1].split(' '); -->
                        <!-- map.fitBounds([ -->
                            <!-- [BBOXmin[1], BBOXmin[0]], -->
                            <!-- [BBOXmax[1], BBOXmax[0]] -->
                        <!-- ]); -->
                    <!-- }); -->
					if (geoParams6){
	 geoAnalytics.setBounds('panchayat',geoParams6,map);
	 }
                map.addLayer(GeoDataLayer6);
            } else {
                map.removeLayer(GeoDataLayer6);
            }
        });


        // getBlock------------

        var GeoDataLayer7;
        var geoParams7;
        $("#flip7 input[type='checkbox']").change(function () {
            val = $(this).val();
            propertyName = $('#pro6').val();
            layername = $('#layername7').val();

            var geoboundtype6 = $('#geoboundtype6').val();
            var geobound6 = $('#geobound6').val();
			geobound6 = geobound6.split(",");
			var new_geobound = "";
				var i;
				for (i=0;i<geobound6.length-1;i++)
				{
					new_geobound = new_geobound + ''+geobound6[i]+',';
				}
				new_geobound = new_geobound + ''+geobound6[i]+'';
				new_geobound = new_geobound.split(",");
            var attribute6 = $('#attribute6').val();
            var query6 = $('#query6').val();
            var label6 = $('#label6').val();
            if (label6 == "true") {
                label6 = true;
            } else {
                label6 = false;
            }
            var labelsize6 = parseInt($('#labelsize6').val());
            var labelcolor6 = $('#labelcolor6').val().slice(1);
            var fillcolor6 = $('#fillcolor6').val().slice(1);
            var bordercolor6 = $('#bordercolor6').val().slice(1);
            var borderwidth6 = parseInt($('#borderwidth6').val());
            var opacity6 = parseFloat($('#opacity6').val());

            var geo = window['geoParams' + val.replace('GeoDataLayer', '')];
            if (this.checked) // if changed state is "CHECKED"
            {
                geoParams7 = {
					AccessToken : accesstoken,
                    GeoBoundType: geoboundtype6,
                    GeoBound: new_geobound,
                    Attribute: attribute6,
                    Query: query6,
                    Style: {
                        Label: label6,
                        LabelColor: labelcolor6,
                        LabelSize: labelsize6,
                        FillColor: fillcolor6,
                        BorderColor: bordercolor6,
                        BorderWidth: borderwidth6,
                        Opacity: opacity6
                    }
                };
                GeoDataLayer7 = geoAnalytics.getBlock(geoParams7);
                <!-- $.getJSON('https://uatgeoanalytics.mapmyindia.in/listingapi?api=block&geo_bound_type=' + -->
                    <!-- geoParams7[ -->
                        <!-- 'GeoBoundType'] + '&geo_bound=' + geoParams7['GeoBound'] + '&get_attr=b_box', -->
                    <!-- function ( -->
                        <!-- data) { -->
                        <!-- console.log(data); -->
                        <!-- var BBOX = (data.results[0].get_attr_values[0].get_attr_values[0].match( -->
                            <!-- /\(([^)]+)\)/)[1]).split(','); -->
                        <!-- var BBOXmin = BBOX[0].split(' '); -->
                        <!-- var BBOXmax = BBOX[1].split(' '); -->
                        <!-- map.fitBounds([ -->
                            <!-- [BBOXmin[1], BBOXmin[0]], -->
                            <!-- [BBOXmax[1], BBOXmax[0]] -->
                        <!-- ]); -->
                    <!-- }); -->
					if (geoParams7){
	 geoAnalytics.setBounds('block',geoParams7,map);
	 }
                map.addLayer(GeoDataLayer7);
            } else {
                map.removeLayer(GeoDataLayer7);
            }
        });


        // getPincode------------

        var GeoDataLayer8;
        var geoParams8;
        $("#flip8 input[type='checkbox']").change(function () {
            val = $(this).val();
            propertyName = $('#pro7').val();
            layername = $('#layername8').val();

            var geoboundtype7 = $('#geoboundtype7').val();
            var geobound7 = $('#geobound7').val();
			geobound7 = geobound7.split(",");
			var new_geobound = "";
				var i;
				for (i=0;i<geobound7.length-1;i++)
				{
					new_geobound = new_geobound + ''+geobound7[i]+',';
				}
				new_geobound = new_geobound + ''+geobound7[i]+'';
				new_geobound = new_geobound.split(",");
            // var attribute7= $('#attribut7').val();
            // var query7= $('#quer7').val();
            var label7 = $('#label7').val();
            if (label7 == "true") {
                label7 = true;
            } else {
                label7 = false;
            }
            var labelsize7 = parseInt($('#labelsize7').val());
            var labelcolor7 = $('#labelcolor7').val().slice(1);
            var fillcolor7 = $('#fillcolor7').val().slice(1);
            var bordercolor7 = $('#bordercolor7').val().slice(1);
            var borderwidth7 = parseInt($('#borderwidth7').val());
            var opacity7 = parseFloat($('#opacity7').val());

            var geo = window['geoParams' + val.replace('GeoDataLayer', '')];
            if (this.checked) // if changed state is "CHECKED"
            {
                geoParams8 = {
					AccessToken : accesstoken,
                    GeoBoundType: geoboundtype7,
                    GeoBound: new_geobound,
                    // Attribute: attribute4,
                    // Query: query4,
                    Style: {
                        Label: label7,
                        LabelColor: labelcolor7,
                        LabelSize: labelsize7,
                        FillColor: fillcolor7,
                        BorderColor: bordercolor7,
                        BorderWidth: borderwidth7,
                        Opacity: opacity7
                    }
                };
                GeoDataLayer8 = geoAnalytics.getPincode(geoParams8);
                <!-- $.getJSON('https://uatgeoanalytics.mapmyindia.in/listingapi?api=pincode&geo_bound_type=' + -->
                    <!-- geoParams8[ -->
                        <!-- 'GeoBoundType'] + '&geo_bound=' + geoParams8['GeoBound'] + '&get_attr=b_box', -->
                    <!-- function ( -->
                        <!-- data) { -->
                        <!-- console.log(data); -->
                        <!-- var BBOX = (data.results[0].get_attr_values[0].get_attr_values[0].match( -->
                            <!-- /\(([^)]+)\)/)[1]).split(','); -->
                        <!-- var BBOXmin = BBOX[0].split(' '); -->
                        <!-- var BBOXmax = BBOX[1].split(' '); -->
                        <!-- map.fitBounds([ -->
                            <!-- [BBOXmin[1], BBOXmin[0]], -->
                            <!-- [BBOXmax[1], BBOXmax[0]] -->
                        <!-- ]); -->
                    <!-- }); -->
					if (geoParams8){
	 geoAnalytics.setBounds('pincode',geoParams8,map);
	 }
                map.addLayer(GeoDataLayer8);
            } else {
                map.removeLayer(GeoDataLayer8);
            }
        });


        // getTown------------

        var GeoDataLayer9;
        var geoParams9;
        $("#flip9 input[type='checkbox']").change(function () {
            val = $(this).val();
            propertyName = $('#pro8').val();
            layername = $('#layername9').val();

            var geoboundtype8 = $('#geoboundtype8').val();
            var geobound8 = $('#geobound8').val();
			geobound8 = geobound8.split(",");
			var new_geobound = "";
				var i;
				for (i=0;i<geobound8.length-1;i++)
				{
					new_geobound = new_geobound + ''+geobound8[i]+',';
				}
				new_geobound = new_geobound + ''+geobound8[i]+'';
				new_geobound = new_geobound.split(",");
            var attribute8 = $('#attribute8').val();
            var query8 = $('#query8').val();
            var label8 = $('#label8').val();
            if (label8 == "true") {
                label8 = true;
            } else {
                label8 = false;
            }
            var labelsize8 = parseInt($('#labelsize8').val());
            var labelcolor8 = $('#labelcolor8').val().slice(1);
            var fillcolor8 = $('#fillcolor8').val().slice(1);
            var bordercolor8 = $('#bordercolor8').val().slice(1);
            var borderwidth8 = parseInt($('#borderwidth8').val());
            var opacity8 = parseFloat($('#opacity8').val());

            var geo = window['geoParams' + val.replace('GeoDataLayer', '')];
            if (this.checked) // if changed state is "CHECKED"
            {
                geoParams9 = {
					AccessToken : accesstoken,
                    GeoBoundType: geoboundtype8,
                    GeoBound: new_geobound,
                    Attribute: attribute8,
                    Query: query8,
                    Style: {
                        Label: label8,
                        LabelColor: labelcolor8,
                        LabelSize: labelsize8,
                        FillColor: fillcolor8,
                        BorderColor: bordercolor8,
                        BorderWidth: borderwidth8,
                        Opacity: opacity8
                    }
                };
                GeoDataLayer9 = geoAnalytics.getTown(geoParams9);
                <!-- $.getJSON('https://uatgeoanalytics.mapmyindia.in/listingapi?api=town&geo_bound_type=' + -->
                    <!-- geoParams9[ -->
                        <!-- 'GeoBoundType'] + '&geo_bound=' + geoParams9['GeoBound'] + '&get_attr=b_box', -->
                    <!-- function ( -->
                        <!-- data) { -->
                        <!-- console.log(data); -->
                        <!-- var BBOX = (data.results[0].get_attr_values[0].get_attr_values[0].match( -->
                            <!-- /\(([^)]+)\)/)[1]).split(','); -->
                        <!-- var BBOXmin = BBOX[0].split(' '); -->
                        <!-- var BBOXmax = BBOX[1].split(' '); -->
                        <!-- map.fitBounds([ -->
                            <!-- [BBOXmin[1], BBOXmin[0]], -->
                            <!-- [BBOXmax[1], BBOXmax[0]] -->
                        <!-- ]); -->
                    <!-- }); -->
					if (geoParams9){
	 geoAnalytics.setBounds('town',geoParams9,map);
	 }
                map.addLayer(GeoDataLayer9);
            } else {
                map.removeLayer(GeoDataLayer9);
            }
        });


        // getCity------------

        var GeoDataLayer10;
        var geoParams10;
        $("#flip10 input[type='checkbox']").change(function () {
            val = $(this).val();
            propertyName = $('#pro9').val();
            layername = $('#layername10').val();

            var geoboundtype9 = $('#geoboundtype9').val();
            var geobound9 = $('#geobound9').val();
			geobound9 = geobound9.split(",");
			var new_geobound = "";
				var i;
				for (i=0;i<geobound9.length-1;i++)
				{
					new_geobound = new_geobound + ''+geobound9[i]+',';
				}
				new_geobound = new_geobound + ''+geobound9[i]+'';
				new_geobound = new_geobound.split(",");
            // var attribute9= $('#attribute9').val();
            // var query9= $('#query9').val();
            var label9 = $('#label9').val();
            if (label9 == "true") {
                label9 = true;
            } else {
                label9 = false;
            }
            var labelsize9 = parseInt($('#labelsize9').val());
            var labelcolor9 = $('#labelcolor9').val().slice(1);
            var fillcolor9 = $('#fillcolor9').val().slice(1);
            var bordercolor9 = $('#bordercolor9').val().slice(1);
            var borderwidth9 = parseInt($('#borderwidth9').val());
            var opacity9 = parseFloat($('#opacity9').val());

            var geo = window['geoParams' + val.replace('GeoDataLayer', '')];
            if (this.checked) // if changed state is "CHECKED"
            {
                geoParams10 = {
					AccessToken : accesstoken,
                    GeoBoundType: geoboundtype9,
                    GeoBound: new_geobound,
                    // Attribute: attribute9,
                    // Query: query9,
                    Style: {
                        Label: label9,
                        LabelColor: labelcolor9,
                        LabelSize: labelsize9,
                        FillColor: fillcolor9,
                        BorderColor: bordercolor9,
                        BorderWidth: borderwidth9,
                        Opacity: opacity9
                    }
                };
                GeoDataLayer10 = geoAnalytics.getCity(geoParams10);
                <!-- $.getJSON('https://uatgeoanalytics.mapmyindia.in/listingapi?api=city&geo_bound_type=' + -->
                    <!-- geoParams10[ -->
                        <!-- 'GeoBoundType'] + '&geo_bound=' + geoParams10['GeoBound'] + '&get_attr=b_box', -->
                    <!-- function ( -->
                        <!-- data) { -->
                        <!-- console.log(data); -->
                        <!-- var BBOX = (data.results[0].get_attr_values[0].get_attr_values[0].match( -->
                            <!-- /\(([^)]+)\)/)[1]).split(','); -->
                        <!-- var BBOXmin = BBOX[0].split(' '); -->
                        <!-- var BBOXmax = BBOX[1].split(' '); -->
                        <!-- map.fitBounds([ -->
                            <!-- [BBOXmin[1], BBOXmin[0]], -->
                            <!-- [BBOXmax[1], BBOXmax[0]] -->
                        <!-- ]); -->
                    <!-- }); -->
					if (geoParams10){
	 geoAnalytics.setBounds('city',geoParams10,map);
	 }
                map.addLayer(GeoDataLayer10);
            } else {
                map.removeLayer(GeoDataLayer10);
            }
        });


        // getVillage------------

        var GeoDataLayer11;
        var geoParams11;
        $("#flip11 input[type='checkbox']").change(function () {
            val = $(this).val();
            propertyName = $('#pro10').val();
            layername = $('#layername11').val();

            var geoboundtype10 = $('#geoboundtype10').val();
            var geobound10 = $('#geobound10').val();
			geobound10 = geobound10.split(",");
			var new_geobound = "";
				var i;
				for (i=0;i<geobound10.length-1;i++)
				{
					new_geobound = new_geobound + ''+geobound10[i]+',';
				}
				new_geobound = new_geobound + ''+geobound10[i]+'';
				new_geobound = new_geobound.split(",");
            var attribute10 = $('#attribute10').val();
            var query10 = $('#query10').val();
            var label10 = $('#label10').val();
            if (label10 == "true") {
                label10 = true;
            } else {
                label10 = false;
            }
            var labelsize10 = parseInt($('#labelsize10').val());
            var labelcolor10 = $('#labelcolor10').val().slice(1);
            var fillcolor10 = $('#fillcolor10').val().slice(1);
            var pointsize10 = $('#pointsize10').val().slice(1);
            var bordercolor10 = $('#bordercolor10').val();
            var borderwidth10 = parseInt($('#borderwidth10').val());
            var opacity10 = parseFloat($('#opacity10').val());

            var geo = window['geoParams' + val.replace('GeoDataLayer', '')];
            if (this.checked) // if changed state is "CHECKED"
            {
                geoParams11 = {
					AccessToken : accesstoken,
                    GeoBoundType: geoboundtype10,
                    GeoBound: new_geobound,
                    Attribute: attribute10,
                    Query: query10,
                    Style: {
                        Label: label10,
                        LabelColor: labelcolor10,
                        LabelSize: labelsize10,
                        FillColor: fillcolor10,
                        PointSize: pointsize10,
                        BorderColor: bordercolor10,
                        BorderWidth: borderwidth10,
                        Opacity: opacity10
                    }
                };
                GeoDataLayer11 = geoAnalytics.getVillage(geoParams11);
                <!-- $.getJSON('https://uatgeoanalytics.mapmyindia.in/listingapi?api=village&geo_bound_type=' + -->
                    <!-- geoParams11[ -->
                        <!-- 'GeoBoundType'] + '&geo_bound=' + geoParams11['GeoBound'] + '&get_attr=b_box', -->
                    <!-- function ( -->
                        <!-- data) { -->
                        <!-- console.log(data); -->
                        <!-- var BBOX = (data.results[0].get_attr_values[0].get_attr_values[0].match( -->
                            <!-- /\(([^)]+)\)/)[1]).split(','); -->
                        <!-- var BBOXmin = BBOX[0].split(' '); -->
                        <!-- var BBOXmax = BBOX[1].split(' '); -->
                        <!-- map.fitBounds([ -->
                            <!-- [BBOXmin[1], BBOXmin[0]], -->
                            <!-- [BBOXmax[1], BBOXmax[0]] -->
                        <!-- ]); -->
                    <!-- }); -->
					if (geoParams11){
	 geoAnalytics.setBounds('village',geoParams11,map);
	 }
                map.addLayer(GeoDataLayer11);
            } else {
                map.removeLayer(GeoDataLayer11);
            }
        });


        // var GeoDataLayer1 = geoAnalytics.getState(geoParams1);
        // map.addLayer(GeoDataLayer1);

        map.on('click', function (e) {
            var property = propertyName.split(',');
            console.log(property)
            //var ajaxInfodata = geoAnalytics.getFeatureInfo(e, propertyName, (GeoDataLayer1 || GeoDataLayer2 || GeoDataLayer3 || GeoDataLayer4 || GeoDataLayer5 || GeoDataLayer6 || GeoDataLayer7 || GeoDataLayer8 || GeoDataLayer9 || GeoDataLayer10 || GeoDataLayer11));
            var ajaxInfodata = geoAnalytics.getFeatureInfo(e, propertyName, window[val]);
            var html = "";
            if (ajaxInfodata.features[0]) {
                console.log(ajaxInfodata);
			if(!(layername == 'Pincode') && !(layername == 'City') && !(layername == 'Locality'))
			{
                html += "<div class='mainlabel_details'><label class='label_name'>" + layername +
                    " NAME:</label> " +
                    ajaxInfodata.features[0].properties[property[0]] + "</div>";
                html += "<div class='mainlabel_details'><label class='label_name'>" + layername +
                    " ID:</label> " +
                    ajaxInfodata.features[0].properties[property[1]] + "</div> ";
                html += "<div class='mainlabel_details'><label class='label_name'>Total Population:</label> " +
                    ajaxInfodata.features[0].properties[property[2]] + "</div> ";
			}
			else if(layername == 'City' || layername == 'Locality')
			{
                html += "<div class='mainlabel_details'><label class='label_name'>" + layername +
                    " NAME:</label> " +
                    ajaxInfodata.features[0].properties[property[0]] + "</div>";
                html += "<div class='mainlabel_details'><label class='label_name'>" + layername +
                    " ID:</label> " +
                    ajaxInfodata.features[0].properties[property[1]] + "</div> ";
                <!-- html += "<div class='mainlabel_details'><label class='label_name'>Total Population:</label> " + -->
                    <!-- ajaxInfodata.features[0].properties[property[2]] + "</div> "; -->
			}
			else if(layername == 'Pincode' )
			{
                html += "<div class='mainlabel_details'><label class='label_name'>" + layername +
                    ":</label> " +
                    ajaxInfodata.features[0].properties[property[0]] + "</div>";
                <!-- html += "<div class='mainlabel_details'><label class='label_name'>" + layername + -->
                    <!-- " ID:</label> " + -->
                    <!-- ajaxInfodata.features[0].properties[property[1]] + "</div> "; -->
                <!-- html += "<div class='mainlabel_details'><label class='label_name'>Total Population:</label> " + -->
                    <!-- ajaxInfodata.features[0].properties[property[2]] + "</div> "; -->
			}
                L.popup({
                        maxWidth: 800
                    })
                    .setLatLng(e.latlng)
                    .setContent(html)
                    .openOn((window[val])._map);
            } else if (ajaxInfodata.features[0] == undefined)
                console.log("Not Exists");
        });

