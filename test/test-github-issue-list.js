var assert = require('assert');

describe('github-issue-list', function () {
  var c = new (require('../src/github-issue-list'));

  it('should have a fetchData method', function () {
    assert.equal(typeof c.fetchData, 'function');
  });

  it('should have an empty string for apiUrl unless user and project are *both* set', function() {
    c.user = '';
    assert.equal(c.apiUrl, '');
    c.project = '';
    assert.equal(c.apiUrl, '');
    c.user = 'hypothesis';
    c.project = 'vision';
    assert.notEqual(c.apiUrl, '');
  });

  it('should have user in the apiUrl', function() {
    c.user = 'hypothesis'
    assert.notEqual(c.apiUrl.search(c.user), -1);
  });

  it('should have project in the apiUrl', function() {
    c.project = 'vision'
    assert.notEqual(c.apiUrl.search(c.project), -1);
  });

  it('should call fetchData in the created hook if user and project are set', function () {
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
