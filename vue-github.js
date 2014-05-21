var repoBaseUrl = 'https://api.github.com/repos/';
var orgBaseUrl = 'https://api.github.com/orgs/';

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
        var url = orgBaseUrl + this.user + '/repos';
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

var vuegithub = new Vue({
  el: '#vue-github',
  lazy: true,
  data: {
    user: 'hypothesis',
    branch: 'master'
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
