
/**
 * Module dependencies.
 */

var trim = require('trim');

/**
 * Parse the given query `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if ('string' != typeof str) return {};

  str = trim(str).replace(/^\?/, '');
  if ('' == str) return {};

  var obj = {};
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('=');
    var key = decodeURIComponent(parts[0]);
    var keys = key.split('][');
    var lastKeyPos = keys.length - 1;

    // splits initial 'foo[bar' and removes terminal ']'
    if (~keys[0].indexOf('[') && keys[lastKeyPos].slice(-1) == ']') {
      keys[lastKeyPos] = keys[lastKeyPos].slice(0, -1);
      keys = keys.shift().split('[').concat(keys);
      lastKeyPos = keys.length - 1;
    }

    var val = decodeURIComponent(parts[1] || '');

    if (lastKeyPos) {

      /**
       * complex nesting
       *
       * cur starts at obj root
       * '' indicates [], aka array push. key becomes array length
       * if last key, set val and finish
       * if level exists, move into it
       *   otherwise look to the next key to determine if this new level
       *   should be an object ([string]) or array ([], [number])
       */

      var cur = obj;
      for (var j = 0; j <= lastKeyPos; j++) {
        key = keys[j] === '' ? cur.length : keys[j];
        if (j === lastKeyPos) {
          cur[key] = val;
        } else if (cur[key]) {
          cur = cur[key];
        } else {
          cur = cur[key] = keys[j + 1] && isNaN(keys[j + 1]) ? {} : [];
        }
      }
    } else {

      /**
       * plain key=value
       *
       * if key is an array, push value
       * if key already exists, create an array with old and new value
       * otherwise just set key=value
       */

      if (obj[key] && obj[key].push) {
        obj[key].push(val);
      } else if (obj[key] !== undefined) {
        obj[key] = [obj[key], val];
      } else {
        obj[key] = val;
      }
    }
  }

  return obj;
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
  var key, val;
  for (key in obj) {
    parameterize(key, obj[key], push);
  }
  return pairs.join('&');
  function push (key, val) {
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
  }
};

/**
 * recurses over object keys and values,
 * coding paths as querystring parameters
 *
 * @param {String} key
 * @param {Mixed} val
 * @param {Function} push
 * @api private
 */

function parameterize(key, val, push){
  if (Object.prototype.toString.call(val) == '[object Array]') {
    for (var i = 0; i < val.length; i++) {
      if (/\[\]$/.test(val[i])) push([key, obj[key]]);
      parameterize(key + '[' + (typeof val[i] === 'object' ? i : '') + ']', val[i], push);
    }
  } else if (typeof val === 'object') {
    var item;
    for (item in val) {
      parameterize(key + '[' + item + ']', val[item], push);
    }
  } else {
    push(key, val);
  }
}
