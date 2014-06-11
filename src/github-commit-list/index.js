var Fetchable = require('../fetchable');

var repoBaseUrl = 'https://api.github.com/repos/';

module.exports = Fetchable.extend({
  template: '<li v-component="github-commit" v-repeat="items"></li>',
  components: {
    'github-commit': {
      template: require('./template.html')
    }
  },
  computed: {
    apiUrl: function() {
      if (this.user && this.project) {
        var url = repoBaseUrl + this.user + '/' + this.project + '/commits?per_page=3&sha=' + (this.branch == 'master' ? '' : this.branch);
        return url;
      }
    }
  },
  created: function () {
    this.$watch('user', function () {
      this.branch = 'master';
      this.fetchData();
    });
    this.$watch('project', function () {
      this.branch = 'master';
      this.fetchData();
    });
    this.$watch('branch', function () {
      this.fetchData();
    });
  }
});
