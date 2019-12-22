        var map, datasource, client, controls = [];
        function GetMap() {
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
                //Create the GeoJSON objects which represent the start and end points of the route.
                var startPoint = new atlas.data.Feature(new atlas.data.Point([-122.130137, 47.644702]), {
                    title: "Redmond",
                    icon: "pin-blue"
                });
                var endPoint = new atlas.data.Feature(new atlas.data.Point([-122.3352, 47.61397]), {
                    title: "Seattle",
                    icon: "pin-round-blue"
                });
                //Add the data to the data source.
                datasource.add([startPoint, endPoint]);
                map.setCamera({
                    bounds: atlas.data.BoundingBox.fromData([startPoint, endPoint]),
                    padding: 80
                });
                // Use SubscriptionKeyCredential with a subscription key
                var subscriptionKeyCredential = new atlas.service.SubscriptionKeyCredential(atlas.getSubscriptionKey());
                // Use subscriptionKeyCredential to create a pipeline
                var pipeline = atlas.service.MapsURL.newPipeline(subscriptionKeyCredential);
                // Construct the RouteURL object
                var routeURL = new atlas.service.RouteURL(pipeline);
                //Start and end point input to the routeURL
                var coordinates = [[startPoint.geometry.coordinates[0], startPoint.geometry.coordinates[1]], [endPoint.geometry.coordinates[0], endPoint.geometry.coordinates[1]]];
                //Make a search route request
                routeURL.calculateRouteDirections(atlas.service.Aborter.timeout(10000), coordinates).then((directions) => {
                    //Get data features from response
                    var data = directions.geojson.getFeatures();
                    datasource.add(data);
                });

                map.controls.add([
                    new atlas.control.StyleControl(),

                    //Add the custom control to the map.
                    new GeolocationControl({
                        style: 'auto'
                    })
                ], {
                    position: 'top-right'
                });

                // map.events.add('ready', function () {
                //     geolocationControl = new GeolocationControl();
    
                //     //Add control to the map.
                //     map.controls.add([new atlas.control.StyleControl(), geolocationControl], {
                //         position: 'top-right'
                //     });
                // });
            });
            map.events.add('ready', addControls);

        }

        function addControls() {
            //Remove all controls on the map.
            // map.controls.remove(controls);
            controls = [];
            //Get input options.
            var positionOption = getSelectValue('controlPosition');
            var controlStyle = getSelectValue('controlStyle');
            //Create a zoom control.
            controls.push(new atlas.control.ZoomControl({
                zoomDelta: parseFloat(getSelectValue('zoomControlDelta')),
                style: controlStyle
            }));
            //Create a pitch control and add it to the map.
            controls.push(new atlas.control.PitchControl({
                pitchDegreesDelta: parseFloat(getSelectValue('pitchControlDelta')),
                style: controlStyle
            }));
            //Create a compass control and add it to the map.
            controls.push(new atlas.control.CompassControl({
                rotationDegreesDelta: parseFloat(getSelectValue('compassControlRotationDelta')),
                style: controlStyle
            }));
            //Create a style control and add it to the map.
            controls.push(new atlas.control.StyleControl({
                style: controlStyle
            }));
            //Add controls to the map.
            map.controls.add(controls, {
                position: positionOption
            });
        }
        function getSelectValue(id) {
            var elm = document.getElementById(id);
            return elm.options[elm.selectedIndex].value;
        }
    