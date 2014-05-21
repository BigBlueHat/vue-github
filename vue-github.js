var orgUrl = 'https://api.github.com/repos/';

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

Vue.component('github-branch-list', Fetchable.extend({
  computed: {
    apiUrl: function() {
      var url = orgUrl + this.user_project + '/branches';
      return url;
    }
  },
  created: function () {
    var self = this;
    this.$watch('user_project', function () {
      if (this.$parent.invalidUserProject) return false;
      self.fetchData();
    });
  }
}));

Vue.component('github-commit-list', Fetchable.extend({
  computed: {
    apiUrl: function() {
      var url = orgUrl + this.user_project + '/commits?per_page=3&sha=' + this.branch;
      return url;
    }
  },
  created: function () {
    var self = this;
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
    branch: 'master',
    user_project: 'hypothesis/h'
  },
  computed: {
    user: function() {
      return this.user_project.split('/')[0];
    },
    project: {
      $get: function() {
        return this.user_project.split('/')[1];
      }
    },
    invalidUserProject: {
      $get: function() {
        var regex = /\w\/\w/;
        return !regex.test(this.user_project);
      }
    }
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
