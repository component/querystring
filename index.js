
// TODO: use trim module

/**
 * Parse the given query `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

module.exports = function(str){
  if ('string' != typeof str) return {};
  str = str.trim();
  if ('' == str) return {};
  return str
    .split('&')
    .reduce(function(obj, pair){
      var parts = pair.split('=');
      obj[parts[0]] = null == parts[1]
        ? ''
        : decodeURIComponent(parts[1]);
      return obj;
    }, {});
};