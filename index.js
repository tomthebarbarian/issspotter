
const { fetchMyIP, fetchCoordsByIP } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

const ip = '72.140.151.173';

fetchCoordsByIP(ip, (x, coords) => {
  if (x) {
    console.log(`there is err`);
    console.log(x);
    return;
  }
  console.log(coords.latitude);
  console.log(coords.longitude);
  return {
    latitude : coords.latitude,
    longitude : coords.longitude
  };
});


// fetchMyIP();