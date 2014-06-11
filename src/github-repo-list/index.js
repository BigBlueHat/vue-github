var Fetchable = require('../fetchable');

var userBaseUrl = 'https://api.github.com/users/';

module.exports = Fetchable.extend({
  computed: {
    apiUrl: function() {
      if (this.user) {
        var url = userBaseUrl + this.user + '/repos';
        return url;
      }
    }
  },
  created: function() {
    this.$watch('user', function() {
      this.fetchData();
    });
  }
});
