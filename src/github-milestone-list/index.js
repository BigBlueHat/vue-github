var Fetchable = require('../fetchable');

var siteBaseUrl = 'https://github.com/';
var repoBaseUrl = 'https://api.github.com/repos/';

module.exports = Fetchable.extend({
  template: require('./template.html'),
  paramAttributes: ['data-sort', 'data-state',
    'data-milestone'],
  computed: {
    apiUrl: function() {
      if (this.user && this.project) {
        var sort = this.$data['data-sort'] || 'due_date';
        var state = this.$data['data-state'] || 'open';
        var direction = this.$data['data-direction'] || 'asc';
        var url = repoBaseUrl + this.user + '/'
          + this.project + '/milestones'
          + '?sort=' + sort
          + '&state=' + state
          + '&direction=' + direction;
        return url;
      }
    },
    htmlUrl: function() {
      if (this.user && this.project) {
        var url = siteBaseUrl + this.user + '/' + this.project + '/issues/milestones';
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
  },
  methods: {
    toggleMilestone: function(e) {
      if (this.$parent.milestone == e.targetVM.$data) {
        this.$parent.milestone = {};
      } else {
        this.$parent.milestone = e.targetVM.$data;
      }
    }
  }
});
