
// TODO: use trim component

/**
 * Parse the given query `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
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

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

exports.stringify = function(obj){
  if (!obj) return '';
  var pairs = [];
  for (var key in obj) {
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return pairs.join('&');
};