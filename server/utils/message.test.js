var expect = require('expect');

var  { generateMessage } = require('./message');

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
