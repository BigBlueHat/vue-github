var GitHubMilestoneList = require('../github-milestone-list');

var siteBaseUrl = 'https://github.com/';

module.exports = GitHubMilestoneList.extend({
  template: require('./template.html'),
  computed: {
    htmlUrl: function() {
      if (this.user && this.project) {
        var url = siteBaseUrl + this.user + '/' + this.project + '/issues';
        return url;
      }
    }
  }
});
