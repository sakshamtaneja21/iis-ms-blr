//var accesstoken = "8e94133a-d4a7-4b37-ab88-6d8192990128"
//var accesstoken = "d5a4dad0-3514-4861-90b1-484bb35e766d"
var accesstoken = "708810ed-97ee-432c-a38b-3b9acab489a8"
//var base_town = "KUNDGOL"
var base_town = "MUTGA"
var dist_critical = 50

function dropdown_clicked(n) {
	switch (n) {
		case 1:
			base_town = "HALIYAL"
			break
		case 2:
			base_town = "MUTGA"
			break
		case 3:
			base_town = "RAMANAGARA"
			break
		case 4:
			base_town = "MYSORE"
			break
		case 5:
			base_town = "MADIKERI"
			break
		case 6:
			base_town = "MANGALORE"
			break
		case 7:
			base_town = "HASSAN"
			break
		case 8:
			base_town = "BBMP"
			break
		case 9:
			base_town = "SARJAPURA"
			break
		case 10:
			base_town = "MUTGA"
	}
	dropdown = document.getElementById('drop_down_button')
	dropdown.innerHTML = base_town
}

function start_analysis() {
	towns = list_towns()
	town_list = towns.results.get_attr_values[0].get_attr_values;
	//get_nearby_towns(base_town, town_list, 100)
	setTimeout(get_nearby_towns.bind(null, base_town, town_list, dist_critical), 1000)
}

var g_severity_list;
function add_rainfall() {
	mark_towns_with_rain(g_severity_list)
}

function get_nearby_towns(root_town, town_list, critical_distance) {
	result = get_lat_long_from_list(root_town, town_list)
	root_lat_long = result[0]
	root_index = result[1]
	geo_nearby_towns = []
	nearby_towns = []

	distance_string = get_rev_loc(town_list[root_index].b_box)
	root_loc = get_loc(town_list[root_index].b_box)
	for (i = 0; i < town_list.length; i++) {
		if (i == root_index) {
			place_marker(get_loc(town_list[i].b_box), 'blue', town_list[i].twn_nme)
			continue
		}

		if (get_straight_distance(root_loc, get_loc(town_list[i].b_box)) < (critical_distance * 1/2)) {
			distance_string += ";" + get_rev_loc(town_list[i].b_box)
			geo_nearby_towns.push(town_list[i])
		}
	}
	result_objs = get_distance_list(distance_string)
	dist_list = result_objs.distances[0];
	for (i = 1; i < dist_list.length; i++) {
		if (dist_list[i] / 1000 <= critical_distance) {
			nb_town = {}
			nb_town.town = geo_nearby_towns[i-1]
			nb_town.distance = dist_list[i] / 1000
			nearby_towns.push(nb_town)
		}
	}

	severity_list = get_severity_list(nearby_towns)
	mark_towns_severity(severity_list)
	g_severity_list = severity_list
}

function mark_towns_with_rain(list) {
	for (i = 0; i < list.length; i++) {
		if (whetherRained()) {
			placesRained(get_loc(list[i].town.b_box), list[i].town.twn_nme)
		}
	}
}

function mark_towns_severity(list) {
	red = 0;
	orange = 0;
	yellow = 0;
	for (i = 0; i < list.length; i++) {
		if (list[i].severity == 3) {
			place_marker(get_loc(list[i].town.b_box), 'red', list[i].town.twn_nme)
			red++
		}
		else if (list[i].severity == 2) {
			place_marker(get_loc(list[i].town.b_box), 'orange', list[i].town.twn_nme) //yellow
			orange++
		}
		else if (list[i].severity == 1) {
			place_marker(get_loc(list[i].town.b_box), 'yellow', list[i].town.twn_nme) //gray
			yellow++
		}
	}

	totalCities(list.length)
	redAlert(red)
	secondaryCity(orange)
	safeCities(yellow)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_severity_list(nearby_towns) {
	severity_list = []
	for (i = 0; i < nearby_towns.length; i++) {
		severity = {}
		if (nearby_towns[i].distance <= (dist_critical * 20 / 100)) {
			severity.severity = 3
		}
		else {
			severity.severity = getRandomInt(1,3)
		}
		severity.town = nearby_towns[i].town
		severity_list.push(severity)
	}
	return severity_list
}

function get_straight_distance(loc1, loc2) {
	lat1 = loc1.split(',')[0]
	lon1 = loc1.split(',')[1]
	lat2 = loc2.split(',')[0]
	lon2 = loc2.split(',')[1]
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1);
	var a =
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon/2) * Math.sin(dLon/2)
	;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}

function get_lat_long_from_list(root_town, town_list) {
	for (i = 0; i < town_list.length; i++) {
		if (town_list[i].twn_nme.split(' ')[0] == root_town) {
			return [get_loc(town_list[i].b_box), i]
		}
	}
	return 0
}

function get_distance_list(list) {
	distance_url_base = "https://apis.mapmyindia.com/advancedmaps/v1/bpushd1t9a7me35nlg94m419og2is474/distance_matrix/driving/"
	distance_url = distance_url_base + list
	result = http_request('GET', distance_url)
	obj = JSON.parse(result)
	return (obj.results)
}

twn1=803091
twn2=803208

var geoParams = {
	AccessToken: accesstoken,
	GeoBoundType: "stt_nme",
	GeoBound: ["KARNATAKA"],

	Attribute: "t_p",
	Query			:	'>10000',
	SpatialLayer: "geoAnalyticsTown",
	SpatialLayer1: "town",
	Style:
		{
			Label		:	true,
			LabelColor	:	'13592e',
			LabelSize	:	10,
			FillColor	:	'ffe0aa',
			BorderColor	:	'13592e',
			BorderWidth	:	2,
			Opacity		:	0.5
	   }
}

var map

var dist = false
var geoDistLayer = undefined
function add_layer() {
	//var geoDataLayer = geoAnalytics.getTown(geoParams);
	if (geoDistLayer == undefined) {
		geoDistLayer = geoAnalytics.getDistrict(geoParams);
		//geoAnalytics.setBounds('state', geoParams, map);
	}
	if (!dist) {
		map.addLayer(geoDistLayer);
		dist = true
	} else {
		map.removeLayer(geoDistLayer);
		dist = false
	}
}

subDist = false
subDistLayer = undefined
function add_subDist() {
	if (subDistLayer == undefined) {
		subDistLayer = geoAnalytics.getSubdistrict(geoParams);
	}
	if (subDist == false) {
		map.addLayer(subDistLayer);
		subDist = true
	} else {
		map.removeLayer(subDistLayer)
		subDist = false
	}
}

block = false
blockLayer = undefined
function add_block() {
	if (blockLayer == undefined) {
		blockLayer = geoAnalytics.getBlock(geoParams);
	}
	if (block == false) {
		map.addLayer(blockLayer)
		block = true
	} else {
		map.removeLayer(blockLayer)
		block = false
	}
}

function init() {
	var centre = new L.LatLng(28.61, 77.23);
	map=new MapmyIndia.Map('map',{center:centre,zoom: 8,zoomControl: true,hybrid:true });
}

function list_towns() {
	//requestURL = "https://geoanalytics.mapmyindia.com/listingapi?api=town&geo_bound_type=tamil nadu&geo_bound=india&get_attr=stt_nme";
	requestURL = "https://geoanalytics.mapmyindia.com/listingapi?api=town&geo_bound_type=stt_nme&geo_bound=karnataka&get_attr=twn_nme,twn_id,b_box";
	request = new XMLHttpRequest();
	request.open('GET', requestURL, false);
	request.setRequestHeader('Authorization', 'bearer ' + accesstoken)
	request.send()
	return JSON.parse(request.responseText)

	//process_towns(request.responseText)
	//distance = get_distance()
}

function get_rev_loc(b_box) {
	//lat0 = obj.results.get_attr_values[0].get_attr_values[0].b_box.substr(4).split(')')[0].split(',')[0].replace(' ', ',');
	//lat1 = obj.results.get_attr_values[0].get_attr_values[0].b_box.substr(4).split(')')[0].split(',')[1].replace(' ', ',')
	lat0 = b_box.substr(4).split(')')[0].split(',')[0].replace(' ', ',');
	lat1 = b_box.substr(4).split(')')[0].split(',')[1].replace(' ', ',');
	center_lat = (parseFloat(lat0.split(',')[0]) + parseFloat(lat1.split(',')[0]))  / 2 + ''
	center_lng = (parseFloat(lat0.split(',')[1]) + parseFloat(lat1.split(',')[1]))  / 2 + ''
	//return center_lat.substring(0,5) + "," + center_lng.substring(0,5)
	return center_lat + "," + center_lng
}

function get_loc(b_box) {
	//lat0 = obj.results.get_attr_values[0].get_attr_values[0].b_box.substr(4).split(')')[0].split(',')[0].replace(' ', ',');
	//lat1 = obj.results.get_attr_values[0].get_attr_values[0].b_box.substr(4).split(')')[0].split(',')[1].replace(' ', ',')
	lat0 = b_box.substr(4).split(')')[0].split(',')[0].replace(' ', ',');
	lat1 = b_box.substr(4).split(')')[0].split(',')[1].replace(' ', ',');
	center_lat = (parseFloat(lat0.split(',')[0]) + parseFloat(lat1.split(',')[0]))  / 2 + ''
	center_lng = (parseFloat(lat0.split(',')[1]) + parseFloat(lat1.split(',')[1]))  / 2 + ''
	//return center_lat.substring(0,5) + "," + center_lng.substring(0,5)
	return center_lng + "," + center_lat
}

function process_towns(str) {
	obj = JSON.parse(str)
	loc1 = get_loc(obj.results.get_attr_values[0].get_attr_values[0].b_box)
	loc2 = get_loc(obj.results.get_attr_values[0].get_attr_values[1].b_box)
	get_distance(loc1, loc2)
}

function http_request(method, url) {
	request = new XMLHttpRequest();
	request.open(method, url, false);
	//request.setRequestHeader('Authorization', 'bearer ' + accesstoken)
	//request.setRequestHeader('Access-Control-Allow-Origin', '*')
	request.send()
	return request.responseText
}

function get_distance(loc1, loc2) {
	distance_url_base = "https://apis.mapmyindia.com/advancedmaps/v1/bpushd1t9a7me35nlg94m419og2is474/distance_matrix/driving/"
	distance_url = distance_url_base + loc1 + ';' + loc2
	result = http_request('GET', distance_url)
	obj = JSON.parse(result)
	return (obj.results.distances[0][1] / 1000)
}

function get_location(town) {
	url = "https://atlas.mapmyindia.com/api/places/geocode?address=mapmyindia 237 okhla phase 3";
	request = new XMLHttpRequest();
	request.open('GET', url);
	request.setRequestHeader('Authorization', 'bearer ' + accesstoken)
	request.setRequestHeader('Access-Control-Allow-Origin', '*')
	request.send()
	return 0;
}


function addMarker(position, icon, title, draggable) {
        /* position must be instance of L.LatLng that replaces current WGS position of this object. Will always return current WGS position.*/
        var event_div = document.getElementById("event-log");
        if (icon == '') {
            var mk = new L.Marker(position, {draggable: draggable, title: title});/*marker with a default icon and optional param draggable, title */
            mk.bindPopup(title);
        } else {
            var mk = new L.Marker(position, {icon: icon, draggable: draggable, title: title});/*marker with a custom icon */
            mk.bindPopup(title);
        }
        map.addLayer(mk);/*add the marker to the map*/
        /* marker events:*/
        mk.on("click", function (e) {
            event_div.innerHTML = "Marker clicked<br>" + event_div.innerHTML;
        });
        return mk;
}

function convert_string_to_latlong(str) {
	lat = parseFloat(str.split(',')[0])
	lng = parseFloat(str.split(',')[1])
	return new L.LatLng(lat, lng)
}

function place_marker(position,color,title) {
	position = convert_string_to_latlong(position)
	if (color == "red") {
		html_str = "<img class='map_marker'  src=" + "'images/marker_red.png'>" + '<span class="my-div-span">';
	}
	else if (color == 'orange'){
		html_str = "<img class='map_marker'  src=" + "'images/marker_orange.png'>" + '<span class="my-div-span">';
	}
	else if (color == 'yellow'){
		html_str = "<img class='map_marker'  src=" + "'images/marker_yellow.png'>" + '<span class="my-div-span">';
	}
	else if (color == 'blue'){
		html_str = "<img class='map_marker'  src=" + "'images/marker_blue.png'>" + '<span class="my-div-span">';
	}
	else if (color == 'cblue'){
		html_str = "<img class='map_marker'  src=" + "'images/marker_cblue.png'>" + '<span class="my-div-span">';
	}
	else {
		html_str = "<img class='map_marker'  src=" + "'images/marker_gcyan.png''>" + '<span class="my-div-span">';
	}
	var icon = L.divIcon({
		className: 'my-div-icon, loc',
		html: html_str,
		iconSize: [2, 2],
		popupAnchor: [12, -10]
	});
	var mk = addMarker(position, icon, title, false);
	map.setView(mk.getLatLng(), 10);
}


function test_severity() {
	var position = new L.LatLng(12.9716, 77.5946);/*The WGS location object*/
	var color = "red";
	place_marker(position,color);
}

function mapmyindia_sample_marker() {
    //mapmyindia_removeMarker();/*Remove marker if exists on map*/
    var postion = new L.LatLng(28.56, 77.68);/*The WGS location object*/
    var title = "Sample marker!";
    var mk = addMarker(postion, "", title, true);/*call the add marker function with the position and title*/
    //marker.push(mk);
    map.setView(mk.getLatLng(), 8);/*function that modifies both center map position and zoom level.*/
}

function whetherRained(position) {
	var random_boolean = Math.random() >= 0.5;
	return random_boolean
}

function testPlacesrained() {
	var position = new L.LatLng(12.9716, 77.5946);
	placesRained(position)
}

function placesRained(position, title) {
	lat = parseFloat(position.split(',')[0]) + 0.004
	lng = parseFloat(position.split(',')[1]) + 0.008
	position = convert_string_to_latlong(lat + ',' + lng)
	html_str = "<img class='map_marker'  src=" + "'images/heavy_rain.png'>" + '<span class="my-div-span">';
	var icon = L.divIcon({
		className: 'my-div-icon, rained',
		html: html_str,
		iconSize: [2, 2],
		popupAnchor: [10, -11]
	});
	var mk = addMarker(position, icon, title, false);
	//map.setView(mk.getLatLng(), 10);

}

function totalCities(n) {
    document.getElementById("total").innerHTML = n;
}

function redAlert(n) {
    document.getElementById("red_alert").innerHTML = n;
}

function secondaryCity(n) {
    document.getElementById("secondary").innerHTML = n;
}

function safeCities(n) {
    document.getElementById("safe").innerHTML = n;
}
