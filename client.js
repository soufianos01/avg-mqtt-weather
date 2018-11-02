const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');
const request = require('request');

client.on('connect', () => {
  client.subscribe('component/connected');
});

client.on('message', (topic, message) => {
  if(topic === 'component/connected') {
    console.log('Component is connected and ready to get temperatures');
  }
});

setInterval(() => {
    request({
      // sign up in developer.forecast.io and replace APIKEY bellow with your key
      // change the coordinates for another city
      // temperature are in F
      url: 'https://api.darksky.net/forecast/APIKEY/49.0069,8.4037',
      json: true
    }, (error, response, body) => {
      client.publish('component/temperature', body.currently.temperature.toString());
    });
  }, 5000);

var fToC = (value) => Math.round([(value - 32) * 5 / 9]);
