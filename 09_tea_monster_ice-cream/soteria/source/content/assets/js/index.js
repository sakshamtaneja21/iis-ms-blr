        var map, datasource, client,routeURL, controls = [];
        var stepDistance = 10; //The dis
        function GetMap(start_lat=47.644702, start_lng=-122.130137, start_name="Seattle", stop_lat=47.61397, stop_lng=-122.3352, end_name="Redmond") {
            // Instantiate a map object

            var map = new atlas.Map('myMap', {
                view: 'Auto',
                zoom: 12,
                // center = []
				//Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
                authOptions: {
                    authType: 'subscriptionKey',
                    subscriptionKey: 'oJ4UTtgNZeU4ovsTIvv9ZoGb-DWBwAqHSsAjKktzZdI'
                }
            });

            //Wait until the map resources are ready.
            map.events.add('ready', function () {
                //Create a data source and add it to the map.
                datasource = new atlas.source.DataSource();
                map.sources.add(datasource);
                //Add a layer for rendering the route lines and have it render under the map labels.
                map.layers.add(new atlas.layer.LineLayer(datasource, null, {
                    strokeColor: '#2272B9',
                    strokeWidth: 5,
                    lineJoin: 'round',
                    lineCap: 'round'
                }), 'labels');
                //Add a layer for rendering point data.
                map.layers.add(new atlas.layer.SymbolLayer(datasource, null, {
                    iconOptions: {
                        image: ['get', 'icon'],
                        allowOverlap: true
                    },
                    textOptions: {
                        textField: ['get', 'title'],
                        offset: [0, 1.2]
                    },
                    filter: ['any', ['==', ['geometry-type'], 'Point'], ['==', ['geometry-type'], 'MultiPoint']] //Only render Point or MultiPoints in this layer.
                }));


                // Use SubscriptionKeyCredential with a subscription key
                var subscriptionKeyCredential = new atlas.service.SubscriptionKeyCredential(atlas.getSubscriptionKey());
                // Use subscriptionKeyCredential to create a pipeline
                var pipeline = atlas.service.MapsURL.newPipeline(subscriptionKeyCredential);
                // Construct the RouteURL object
                var routeURL = new atlas.service.RouteURL(pipeline);

                //Create the GeoJSON objects which represent the start and end points of the route.
                var startPoint = new atlas.data.Feature(new atlas.data.Point([start_lng, start_lat]), {
                    title: start_name,
                    icon: "pin-blue"
                });
                var endPoint = new atlas.data.Feature(new atlas.data.Point([stop_lng, stop_lat]), {
                    title: end_name,
                    icon: "pin-round-blue"
                });
                //Add the data to the data source.
                datasource.add([startPoint, endPoint]);
                map.setCamera({
                    bounds: atlas.data.BoundingBox.fromData([startPoint, endPoint]),
                    padding: 80
                });
                //Start and end point input to the routeURL
                var coordinates = [[startPoint.geometry.coordinates[0], startPoint.geometry.coordinates[1]], [endPoint.geometry.coordinates[0], endPoint.geometry.coordinates[1]]];
                //Make a search route request

                routeURL.calculateRouteDirections(atlas.service.Aborter.timeout(10000), coordinates).then((directions) => {
                    //Get data features from response
                    var data = directions.geojson.getFeatures();
                    datasource.add(data);


                    var path = [];
                    //Get all points along the path. The route line could be a LineString or MultiLineString.
                    if (data.features[0].geometry.type === 'LineString') {
                        path = data.features[0].geometry.coordinates;
                    } else if (data.features[0].geometry.type === 'MultiLineString') {
                        data.features[0].geometry.coordinates.forEach(c => {
                            path = path.concat(c);
                        });
                    }
                    //Create an array to store the calculated positions, add the starting location.
                    var positionsAlongPath = [path[0]];
                    //Calculate the length of the route.
                    var routeLength = atlas.math.getLengthOfPath(path, 'kilometers');
                    var numSteps = Math.floor(routeLength / stepDistance);
                    var loc;
                    for (var i = 1; i <= numSteps; i++) {
                        loc = atlas.math.getPositionAlongPath(path, stepDistance * i, 'kilometers');
                        positionsAlongPath.push(loc);
                    }
                    //Add the last location on the path.
                    positionsAlongPath.push(path[path.length - 1]);
                    //Do something with the calculated locations. Lets show red markers for now.
                    for (var i = 0, len = positionsAlongPath.length; i < len; i++) {
                        datasource.add(new atlas.data.Feature(new atlas.data.Point(positionsAlongPath[i]), { icon: 'marker-red' }))
                    }
                    map.controls.add([
                        new atlas.control.StyleControl(),

                        //Add the custom control to the map.
                        new GeolocationControl({
                            style: 'auto'
                        })
                    ], {
                        position: 'top-right'
                    });
                });

                    console.log(positionsAlongPath);
                    

            });

        }
        
    