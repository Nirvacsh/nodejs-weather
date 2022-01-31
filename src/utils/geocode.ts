import request from "postman-request";

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibmlydmFjc2giLCJhIjoiY2t5c2loM2N6MTQxdjJvbzNyM215YXNhNCJ9.g7qPUT41MloODVJqTBF7Hg&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

export { geocode };
