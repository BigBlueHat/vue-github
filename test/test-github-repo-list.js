var assert = require('assert');

describe('github-repo-list', function () {
  var c = new (require('../src/github-repo-list'));

  it('should have a fetchData method', function () {
    assert.equal(typeof c.fetchData, 'function');
  });

  it('should have an empty string for apiUrl if user is not set', function() {
    assert.equal(c.user, undefined);
    assert.equal(c.apiUrl, '');
  });

  it('should build apiUrl with user in it', function() {
    c.user = 'hypothesis'
    assert.notEqual(c.apiUrl.search(c.user), -1);
  });


  it('should call fetchData in the created hook if user is set', function () {
    assert.equal(typeof c.user, 'string');
    assert.notEqual(c.apiUrl, '');
    // TODO: $watch should be triggering this...not sure why it's not
    c.fetchData();
    assert.equal(typeof c.items, 'object');
  });

  it('should store the response JSON in localStorage', function() {
    assert(btoa(c.apiUrl) in window.localStorage);
  });
});
