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

// const printdata = (err, returned,data) => {
//   if (err) {
//     console.log(`there is err`);
//     console.log(err);
//     return;
//   } else {
//     if (returned.statusCode !== 200) {
//       console.log(returned);
//       return;
//     }
//     console.log(JSON.parse(data).ip);
//     return JSON.parse(data).ip;
//   }
// };

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
        callback(Error(`Status Code ${returned.statusCode} when fetching IP: ${data}`), null);
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

module.exports = { fetchMyIP, fetchCoordsByIP };

