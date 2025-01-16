import React, { useEffect, useRef } from 'react';

const Map = ({ directions }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    console.log('Directions:', directions); // Debugging line
    if (!window.google || !directions) return;

    // Initialize the map
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 36.8065, lng: 10.1815 }, // Default to Tunis, Tunisia
      zoom: 7,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });

    // Add traffic layer
    const trafficLayer = new window.google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    // Render directions if provided
    if (directions && directions.length > 0) {
      const bounds = new window.google.maps.LatLngBounds(); // To zoom the map to fit the route

      directions.forEach((route, index) => {
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
          map,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#FF0000', // Red route line
            strokeOpacity: 0.8,
            strokeWeight: 4,
          },
        });

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: route.legs[0].start_address, // Use the start address
            destination: route.legs[0].end_address, // Use the end address
            travelMode: window.google.maps.TravelMode.DRIVING,
            drivingOptions: {
              departureTime: new Date(), // Real-time traffic data
              trafficModel: 'bestguess', // Optimize for current traffic
            },
            provideRouteAlternatives: true, // Show alternative routes
          },
          (result, status) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);

              // Extend the bounds to include this route
              result.routes[0].legs.forEach((leg) => {
                bounds.extend(leg.start_location);
                bounds.extend(leg.end_location);
              });

              // Fit the map to the bounds
              map.fitBounds(bounds);
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          }
        );
      });
    } else {
      console.error('Invalid directions object:', directions);
    }
  }, [directions]);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default Map;