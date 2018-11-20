const generateMessage = (from, text, createdAt) => {
  return {
    from,
    text,
    createdAt: createdAt ? createdAt : new Date().getTime()
  };
};

const generateLocationMessage = (from, longitude, latitude, createdAt) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${longitude},${latitude}`,
    createdAt: createdAt ? createdAt : new Date().getTime()
  }
}

module.exports = { generateMessage, generateLocationMessage };
