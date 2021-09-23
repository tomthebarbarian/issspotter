
const {nextISSTimesForMyLocation } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

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

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (let elem of passTimes) {
    const passtime = new Date(0);
    passtime.setUTCSeconds(elem.risetime);


    console.log(`Next pass at ${passtime} for ${elem.duration} seconds!
    `);
  }

  // console.log(passTimes);
});