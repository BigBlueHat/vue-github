var Fetchable = require('../fetchable');

var repoBaseUrl = 'https://api.github.com/repos/';

module.exports = Fetchable.extend({
  computed: {
    apiUrl: function() {
      if (this.user && this.project) {
        var url = repoBaseUrl + this.user + '/' + this.project + '/branches';
        return url;
      }
    }
  },
  created: function () {
    this.$watch('user', function () {
      if (this.project) {
        this.fetchData();
      }
    });
    this.$watch('project', function () {
      this.fetchData();
    });
  }
});
