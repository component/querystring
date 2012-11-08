
var query = require('querystring');

describe('.parse(str)', function(){
  describe('when the string is empty', function(){
    it('should return {}', function(){
      expect(query.parse('')).to.eql({});
    })
  })

  describe('when a non-string is passed', function(){
    it('should return {}', function(){
      expect(query.parse(null)).to.eql({});
      expect(query.parse(0)).to.eql({});
      expect(query.parse()).to.eql({});
    })
  })

  describe('when values are omitted', function(){
    it('should default values to ""', function(){
      var obj = query.parse('name&species');
      expect(obj).to.eql({ name: '', species: '' });
    })
  })

  describe('when values are present', function(){
    it('should parse map the key / value pairs', function(){
      var obj = query.parse('name=tobi&species=ferret');
      expect(obj).to.eql({ name: 'tobi', species: 'ferret' });
    })
  })
})