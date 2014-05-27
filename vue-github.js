var siteBaseUrl = 'https://github.com/';
var repoBaseUrl = 'https://api.github.com/repos/';
var userBaseUrl = 'https://api.github.com/users/';

var Fetchable = Vue.extend({
  methods: {
    fetchData: function () {
      if (!this.apiUrl) return false;
      var xhr = new XMLHttpRequest(),
          self = this;
      xhr.open('GET', self.apiUrl);
      xhr.onload = function () {
        self.items = JSON.parse(xhr.responseText);
      };
      xhr.send();
    }
  }
});

Vue.component('github-repo-list', Fetchable.extend({
  computed: {
    apiUrl: function() {
      if (this.user) {
        var url = userBaseUrl + this.user + '/repos';
        return url;
      }
    }
  },
  created: function () {
    var self = this;
    this.$watch('user', function () {
      self.fetchData();
    });
  }
}));

Vue.component('github-branch-list', Fetchable.extend({
  computed: {
    apiUrl: function() {
      if (this.user && this.project) {
        var url = repoBaseUrl + this.user + '/' + this.project + '/branches';
        return url;
      }
    }
  },
  created: function () {
    var self = this;
    this.$watch('user', function () {
      if (this.project) {
        self.fetchData();
      }
    });
    this.$watch('project', function () {
      self.fetchData();
    });
  }
}));

Vue.component('github-commit-list', Fetchable.extend({
  computed: {
    apiUrl: function() {
      if (this.user && this.project) {
        var url = repoBaseUrl + this.user + '/' + this.project + '/commits?per_page=3&sha=' + (this.branch == 'master' ? '' : this.branch);
        return url;
      }
    }
  },
  created: function () {
    var self = this;
    this.$watch('user', function () {
      self.branch = 'master';
      self.fetchData();
    });
    this.$watch('project', function () {
      self.branch = 'master';
      self.fetchData();
    });
    this.$watch('branch', function () {
      self.fetchData();
    });
  }
}));

Vue.component('github-commit', {
  template: '#template-github-commit'
});

Vue.component('github-milestone-list', Fetchable.extend({
  template: '#template-github-milestone-list',
  computed: {
    apiUrl: function() {
      if (this.user && this.project) {
        var url = repoBaseUrl + this.user + '/' + this.project + '/milestones';
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
    var self = this;
    this.$watch('user', function () {
      self.fetchData();
    });
    this.$watch('project', function () {
      self.fetchData();
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
}));

Vue.component('github-issue-list', Fetchable.extend({
  template: '#template-github-issue-list',
  computed: {
    apiUrl: function() {
      if (this.user && this.project) {
        var url = repoBaseUrl + this.user + '/' + this.project + '/issues';
        if (this.milestone && this.milestone.number) {
          url += '?milestone=' + this.milestone.number;
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
    var self = this;
    this.$watch('user', function () {
      self.fetchData();
    });
    this.$watch('project', function () {
      self.fetchData();
    });
    this.$watch('milestone', function () {
      self.fetchData();
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
  },
  filters: {
    marked: marked,
    stripComments: function(v) {
      return v.replace(/<![\s\S]*?--[ \t\n\r]*>/g,'');
    }
  }
}));

Vue.component('vue-github', {
  data: {
    user: '',
    project: '',
    branch: '',
    milestone: {}
  },
  filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n');
      return newline > -1 ? v.slice(0, newline) : v;
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, ' ');
    }
  }
});

var app = new Vue({
  el: '#vue-github'
});
