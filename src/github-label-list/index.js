var Fetchable = require('../fetchable');

var repoBaseUrl = 'https://api.github.com/repos/';

module.exports = Fetchable.extend({
  template: require('./template.html'),
  paramAttributes: ['user', 'project'],
  computed: {
    apiUrl: function() {
      var url, number;
      if (this.user && this.project) {
        url = repoBaseUrl + this.user + '/' + this.project + '/labels';
        return url;
      }
    }
  },
  created: function () {
    this.watchable = ['user', 'project'];
    this.$watch('watchable', function () {
      if (this.user && this.project) {
        this.fetchData();
      }
    });
  },
  methods: {
    toggleActive: function(e) {
      var name = e.targetVM.name;
      var i = this.labels.indexOf(name);
      // if the labels already in the active list,
      if (i >= 0) {
        // remove it.
        this.labels.splice(i, 1);
      } else {
        // otherwise, add it.
        this.labels.push(name);
      }
    }
  }
});
