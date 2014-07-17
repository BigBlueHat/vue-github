var Vue = require('vue');

module.exports = Vue.extend({
  data: {
    items: []
  },
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
