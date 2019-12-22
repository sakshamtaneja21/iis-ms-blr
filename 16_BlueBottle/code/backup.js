var client_id = "32Ev_6Zp-2xd8Jf-NN7p_sKI9zZSnhjsw5Zt8EAbxArrFHhCI3rxths8k-KEOBp2USCuORQSLeGq6AmYHGIEHA=="
var client_secret = "7kScBxA5-mLM3CLgdB5-pbgsSfYMcg56SisTJSOsGOEy3YlNLlpq-75tT5zVq2nt5zK4o2tpV-TaXR1xlty7YnvtSk_5SSRz"
var auth_url = "https://outpost.mapmyindia.com/api/security/oauth/token"

var http = new XMLHttpRequest();
var params = 'grant_type=client_credentials';
params += '&client_id=' + client_id;
params += '&client_secret=' + client_secret;
http.open('POST', auth_url, true);

//Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
http.setRequestHeader('Access-Control-Allow-Origin', auth_url);

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
    }
}
http.send(params);

function get_accesstoken() {
	return 0;
}


 function mapmyindia_fit_markers_into_bound() {
                var maxlat = Math.max.apply(null, latitudeArr);
                var maxlon = Math.max.apply(null, longitudeArr);
                var minlat = Math.min.apply(null, latitudeArr);
                var minlon = Math.min.apply(null, longitudeArr);
                var southWest = L.latLng(maxlat, maxlon);/*south-west WGS location object*/
                var northEast = L.latLng(minlat, minlon);/*north-east WGS location object*/
                var bounds = L.latLngBounds(southWest, northEast);/*This class represents bounds on the Earth sphere, defined by south-west and north-east corners*/
                map.fitBounds(bounds);/*Sets the center map position and level so that all markers is the area of the map that is displayed in the map area*/
            }

			
function mapmyindia_multiple_markers() {
                //mapmyindia_removeMarker();
                for (var i = 0; i < latitudeArr.length; i++) {
                    var postion = new L.LatLng(latitudeArr[i], longitudeArr[i]);/*WGS location object*/
                    marker.push(addMarker(postion, '', "Multiple markersample !"));
                }
                mapmyindia_fit_markers_into_bound();
            }