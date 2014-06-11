var Fetchable = require('../fetchable');

var siteBaseUrl = 'https://github.com/';
var repoBaseUrl = 'https://api.github.com/repos/';

module.exports = Fetchable.extend({
  template: require('./template.html'),
  paramAttributes: ['data-milestone'],
  computed: {
    apiUrl: function() {
      if (this.user && this.project) {
        var url = repoBaseUrl + this.user + '/' + this.project + '/issues';
        if (this['data-milestone'] || (this.milestone && this.milestone.number)) {
          var number = this['data-milestone'] || this.milestone.number;
          url += '?milestone=' + number;
          if (this.milestone && this.milestone.state == 'closed') {
            url += '&state=all';
          }
        }
        return url;
      }
    },
    htmlUrl: function() {
      if (this.user && this.project) {
        var url = siteBaseUrl + this.user + '/' + this.project + '/issues';
        return url;
      }
    }
  },
  created: function () {
    this.$watch('user', function () {
      this.fetchData();
    });
    this.$watch('project', function () {
      this.fetchData();
    });
    this.$watch('milestone', function () {
      this.fetchData();
    });
  },
  methods: {
    toggleActive: function(e) {
      if (e.targetVM.accordionOpen) {
        e.targetVM.accordionOpen = false;
      } else {
        e.targetVM.accordionOpen = true;
      }
    }
  }
});
