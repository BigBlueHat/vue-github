module.exports = function (v) {
  if (v) {
    return (new Date(v)).toDateString();
  }
};
