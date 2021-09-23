
const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');


// fetchMyIP()
//   .then((value) =>  JSON.parse(value).ip)
//   .then(fetchCoordsByIP)
//   .then((value) =>  JSON.parse(value))
//   .then(fetchISSFlyOverTimes)
//   .then((value) =>  JSON.parse(value))
//   .then(console.log);

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   fetchCoordsByIP(ip, (x, coords) => {
//     if (x) {
//       console.log(`there is err`);
//       console.log(x);
//       return;
//     }
//     // console.log(coords.latitude);
//     // console.log(coords.longitude);
//     fetchISSFlyOverTimes(coords, (x, val) => console.log(val.response));
//     return {
//       latitude : coords.latitude,
//       longitude : coords.longitude
//     };
//   });
// });

nextISSTimesForMyLocation();