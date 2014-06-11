module.exports = function(v) {
  return v.replace(/<![\s\S]*?--[ \t\n\r]*>/g,'');
};
