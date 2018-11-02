const mqtt = require('mqtt');
const fs = require('fs');

const component = mqtt.connect('mqtt://test.mosquitto.org');

component.on('connect', () => {
  component.publish('component/connected', 'true');
  component.subscribe('component/temperature');
});

component.on('message', (topic, message) => {
  if (topic === 'component/temperature') {
    var tmp = message.toString();
    console.log(tmp);
    fs.appendFileSync('temperatures/2nov.txt', tmp + '\n');
  }
});