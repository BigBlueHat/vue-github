var Vue = require('vue');

var siteBaseUrl = 'https://github.com/';
var repoBaseUrl = 'https://api.github.com/repos/';

module.exports = Vue.extend({
  template: require('./template.html'),
  paramAttributes: ['user', 'project', 'milestone'],
  computed: {
    apiUrl: function() {
      if (this.user && this.project) {
        var url = repoBaseUrl + this.user + '/'
          + this.project + '/milestones/';
        if (!isNaN(this.milestone)) {
          url += this.milestone;
        } else {
          url += this.milestone.number;
        }
        return url;
      }
    },
    htmlUrl: function() {
      var url;
      if (this.user && this.project) {
        var url = siteBaseUrl + this.user + '/' + this.project + '/issues';
        if (!isNaN(this.milestone)) {
          url += '?milestone=' + this.milestone;
        } else if (this.milestone && this.milestone.number) {
          url += '?milestone=' + this.milestone.number;
        } else {
          url += '/milestones';
        }
        return url;
      }
    }
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function () {
      if (!this.apiUrl) return false;

      var apiUrlHash = btoa(this.apiUrl),
          xhr = new XMLHttpRequest(),
          self = this;
      if (window.localStorage[apiUrlHash]) {
        self.milestone = JSON.parse(window.localStorage[apiUrlHash]);
      } else {
        xhr.open('GET', self.apiUrl);
        xhr.onload = function () {
          window.localStorage[apiUrlHash] = xhr.responseText;
          self.milestone = JSON.parse(xhr.responseText);
        };
        xhr.send();
      }
    }
  }
});
