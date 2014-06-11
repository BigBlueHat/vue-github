var Vue = require('vue');

window.VueGithub = Vue.extend({
  filters: {
    truncate: require('./filters/truncate'),
    formatDate: require('./filters/formatDate'),
    stripComments: require('./filters/stripComments'),
    marked: require('./filters/marked')
  },
  components: {
    'github-repo-list': require('./github-repo-list'),
    'github-branch-list': require('./github-branch-list'),
    'github-commit-list': require('./github-commit-list'),
    'github-milestone-list': require('./github-milestone-list'),
    'github-milestone-accordion': require('./github-milestone-accordion'),
    'github-milestone-flattened': require('./github-milestone-flattened'),
    'github-issue-list': require('./github-issue-list'),
    'github-issue-accordion': require('./github-issue-accordion'),
    'github-issue-flattened': require('./github-issue-flattened')
  }
});
