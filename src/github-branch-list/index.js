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
    this.user_and_project = [this.user, this.project];
    this.$watch('user_and_project', function () {
      this.fetchData();
    });
  }
});
