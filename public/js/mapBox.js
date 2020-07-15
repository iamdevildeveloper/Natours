export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaWFtZGV2aWxkZXZlbG9wZXIiLCJhIjoiY2thMTh5bXluMDlobDNocDYwOWdhZmRibCJ9.c0IlH9v-E---fRCpZn8uDA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iamdevildeveloper/ck5dohzfq0kqh1iocwqjpmdxv',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Add marker
    let el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day} : ${loc.description}</p>`)
      .addTo(map);
    // Extend map bound to include current map locations
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 250,
      bottom: 250,
      left: 200,
      right: 200,
    },
  });
};
