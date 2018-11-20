<<<<<<< HEAD
const generateMessage = (from, text, createdAt) => {
  return {
    from,
    text,
    createdAt: createdAt ? createdAt : new Date().getTime()
=======
const moment = require('moment');

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf(),
>>>>>>> master
  };
};

const generateLocationMessage = (from, longitude, latitude, createdAt) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${longitude},${latitude}`,
<<<<<<< HEAD
    createdAt: createdAt ? createdAt : new Date().getTime()
=======
    createdAt: moment().valueOf(),
>>>>>>> master
  }
}

module.exports = { generateMessage, generateLocationMessage };
