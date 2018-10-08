var expect = require('expect');

var  { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'Jen';
    let text = 'some message';
    let message = generateMessage(from, text);

    // expect(message.createdAt).toBe('number');
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, text });
  })
})

describe('generate-location-message', () => {
  it('should generate correct locaiton object', () => {
    let from = 'Bab';
    let latitude = 15;
    let longitude = 19;
    let url = 'https://www.google.com/maps?q=15,19';
    let message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, url });
  })
})
