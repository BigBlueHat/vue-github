var marked = require('marked');

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

module.exports = function(v, k) {
  return marked(v, {renderer: renderer});
};
