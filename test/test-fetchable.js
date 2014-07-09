var assert = require('assert');

describe('fetchable', function () {
  var c = new (require('../src/fetchable'));

  it('should have a fetchData method', function () {
    assert.equal(typeof c.fetchData, 'function');
  });

  it('should have items property after apiUrl is set', function() {
    c.apiUrl = 'https://api.github.com/';
    c.fetchData();
    // TODO: use Chai as Promised to deal with network lag
    assert.equal(typeof c.items, 'object');
  });
});
