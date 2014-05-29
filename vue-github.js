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

var fetchData = function () {
  if (!this.apiUrl) return false;
  var xhr = new XMLHttpRequest(),
      self = this;
  xhr.open('GET', self.apiUrl);
  xhr.onload = function () {
    self.items = JSON.parse(xhr.responseText);
  };
  xhr.send();
};

Vue.component('github-repo-list', {
  computed: {
    apiUrl: function() {
      if (this.user) {
        var url = userBaseUrl + this.user + '/repos';
        return url;
      }
    }
  },
  created: function () {
    this.$watch('user', function () {
      this.fetchData();
    });
  },
  methods: {
    fetchData: fetchData
  }
});

Vue.component('github-branch-list', {
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
  },
  methods: {
    fetchData: fetchData
  }
});

Vue.component('github-commit-list', {
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
  },
  methods: {
    fetchData: fetchData
  }
});

Vue.component('github-commit', {
  template: '#template-github-commit'
});

Vue.component('github-milestone-list', {
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
    },
    fetchData: fetchData
  }
});

Vue.component('github-issue-list', {
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
    },
    fetchData: fetchData
  },
  filters: {
    marked: function(v) {
      return marked(v, {renderer: renderer});
    },
    stripComments: function(v) {
      return v.replace(/<![\s\S]*?--[ \t\n\r]*>/g,'');
    }
  }
});

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
