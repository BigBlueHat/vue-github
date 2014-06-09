(function() {
  var siteBaseUrl = 'https://github.com/';
  var repoBaseUrl = 'https://api.github.com/repos/';
  var userBaseUrl = 'https://api.github.com/users/';

  var renderer = new marked.Renderer();
  renderer.listitem = function(text) {
    if (/^\s*\[[x ]\]\s*/.test(text)) {
      text = text
        .replace(/^\s*\[ \]\s*/, '<i class="empty checkbox icon"></i> ')
        .replace(/^\s*\[x\]\s*/, '<i class="checked checkbox icon"></i> ');
      return '<li style="list-style: none">' + text + '</li>';
    } else {
      return '<li>' + text + '</li>';
    }
  };

  /** Filters **/
  Vue.filter('marked', function(v, k) {
    return marked(v, {renderer: renderer});
  });
  Vue.filter('stripComments', function(v) {
    return v.replace(/<![\s\S]*?--[ \t\n\r]*>/g,'');
  });
  Vue.filter('truncate', function (v) {
    var newline = v.indexOf('\n');
    return newline > -1 ? v.slice(0, newline) : v;
  });
  Vue.filter('formatDate', function (v) {
    if (v) {
      return (new Date(v)).toDateString();
    }
  });

  var Fetchable = Vue.extend({
    methods: {
      fetchData: function () {
        if (!this.apiUrl) return false;

        var apiUrlHash = btoa(this.apiUrl),
            xhr = new XMLHttpRequest(),
            self = this;
        if (window.localStorage[apiUrlHash]) {
          self.items = JSON.parse(window.localStorage[apiUrlHash]);
        } else {
          xhr.open('GET', self.apiUrl);
          xhr.onload = function () {
            window.localStorage[apiUrlHash] = xhr.responseText;
            self.items = JSON.parse(xhr.responseText);
          };
          xhr.send();
        }
      }
    }
  });

  /** Resource Components **/
  var GitHubRepoList = Fetchable.extend({
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

  var GitHubBranchList = Fetchable.extend({
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

  var GitHubCommitList = Fetchable.extend({
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

  var GitHubMilestoneList = Fetchable.extend({
    paramAttributes: ['data-sort', 'data-state',
      'data-milestone'],
    computed: {
      apiUrl: function() {
        if (this.user && this.project) {
          var sort = this.$data['data-sort'] || 'due_date';
          var state = this.$data['data-state'] || 'open';
          var url = repoBaseUrl + this.user + '/'
            + this.project + '/milestones'
            + '?sort=' + sort
            + '&state=' + state;
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
    }
  });

  var GitHubIssueList = Fetchable.extend({
    computed: {
      apiUrl: function() {
        if (this.user && this.project) {
          var url = repoBaseUrl + this.user + '/' + this.project + '/issues';
          if (this.milestone && this.milestone.number) {
            url += '?milestone=' + this.milestone.number;
            if (this.milestone.state == 'closed') {
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
    }
  });

  /** Rendering Components **/
  Vue.component('github-repo-list', GitHubRepoList.extend({
  }));

  Vue.component('github-branch-list', GitHubBranchList.extend({
  }));

  Vue.component('github-commit-list', GitHubCommitList.extend({
  }));

  Vue.component('github-commit', {
    template: '#template-github-commit'
  });

  var toggleMilestone = function(e) {
    if (this.$parent.milestone == e.targetVM.$data) {
      this.$parent.milestone = {};
    } else {
      this.$parent.milestone = e.targetVM.$data;
    }
  };

  Vue.component('github-milestone-list', GitHubMilestoneList.extend({
    template: '#template-github-milestone-list',
    methods: {
      toggleMilestone: toggleMilestone
    }
  }));

  Vue.component('github-milestone-accordion', GitHubMilestoneList.extend({
    template: '#template-github-milestone-accordion',
    methods: {
      toggleMilestone: toggleMilestone
    }
  }));

  Vue.component('github-milestone-flattened', GitHubMilestoneList.extend({
    template: '#template-github-milestone-flattened',
    methods: {
      toggleMilestone: toggleMilestone
    }
  }));

  var toggleActive = function(e) {
    if (e.targetVM.accordionOpen) {
      e.targetVM.accordionOpen = false;
    } else {
      e.targetVM.accordionOpen = true;
    }
  };

  Vue.component('github-issue-list', GitHubIssueList.extend({
    template: '#template-github-issue-list',
    methods: {
      toggleActive: toggleActive
    }
  }));
  Vue.component('github-issue-accordion', GitHubIssueList.extend({
    template: '#template-github-issue-accordion',
    methods: {
      toggleActive: toggleActive
    }
  }));
  Vue.component('github-issue-flattened', GitHubIssueList.extend({
    template: '#template-github-issue-flattened',
    methods: {
      toggleActive: toggleActive
    }
  }));
})();
