const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// $ curl 'https://api.ipify.org?format=json'
// result {"ip":"72.140.151.173"}

const fetchMyIP = function(callback) {
// use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (err, returned,data) => {
    if (err) {
      console.log(`there is err`);
      console.log(err);
      return callback(err,null);
    } else {
      if (returned.statusCode !== 200) {
        callback(Error(`Status Code ${returned.statusCode} when fetching IP: ${data}`), null);
        // console.log(returned);
        return;
      }
      // console.log(JSON.parse(data).ip);
      let ip = JSON.parse(data).ip;
      // return ip;
      callback(null, ip);
    }

  });

};
// function fetchCoordsByIP takes in a string(ip) and a function(callback)
//  and returns the lattitud logitude object
// const ip = '72.140.151.173';

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (err, returned,data) => {
    if (err) {
      console.log(`there is err`);
      console.log(err);
      return callback(err,null);
    } else {
      if (returned.statusCode !== 200) {
        callback(Error(`Status Code ${returned.statusCode} when fetching coords`), null);
        // console.log(returned);
        return;
      }
      // console.log(JSON.parse(data).ip);
      let coords = JSON.parse(data);
      // return ip;
      callback(null, coords);
    }

  });
};



// fetchCoordsByIP(ip, (x, coords) => {
//   if (x) {
//     console.log(`there is err`);
//     console.log(x);
//     return;
//   }
//   // console.log(coords.latitude);
//   // console.log(coords.longitude);
//   return {
//     latitude : coords.latitude,
//     longitude : coords.longitude
//   };
// });

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

// const coords = {
//   latitude: 43.0461,
//   longitude: -83.2436
// };

const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}
  &lon=${coords.longitude}`, (err, returned,data) => {
    if (err) {
      console.log(`there is err`);
      console.log(err);
      return callback(err,null);
    } else {
      if (returned.statusCode !== 200) {
        callback(Error(`Status Code ${returned.statusCode} when fetching ISS flighttimes`), null);
        // console.log(returned);
        return;
      }
      // console.log(JSON.parse(data).ip);
      let times = JSON.parse(data);
      // return ip;
      callback(null, times.response);
      // return;
    }

  });
};

// fetchISSFlyOverTimes(coords, (err, val) => console.log(val.response));

// iss.js

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    fetchCoordsByIP(ip, (x, coords) => {
      if (x) {
        console.log(`there is err`);
        console.log(x);
        return;
      }
      // console.log(coords.latitude);
      // console.log(coords.longitude);
      fetchISSFlyOverTimes(coords, callback);
    });
  });
};

// nextISSTimesForMyLocation((err, value) => console.log(value.response));


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};

