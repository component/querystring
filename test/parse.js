
var query = require('..');

describe('.parse(str)', function(){
  describe('when the string is empty', function(){
    it('should return {}', function(){
      query.parse('').should.eql({});
    })
  })

  describe('when a non-string is passed', function(){
    it('should return {}', function(){
      query.parse(null).should.eql({});
      query.parse(0).should.eql({});
      query.parse().should.eql({});
    })
  })

  describe('when values are omitted', function(){
    it('should default values to ""', function(){
      var obj = query.parse('name&species');
      obj.should.eql({ name: '', species: '' });
    })
  })

  describe('when values are present', function(){
    it('should parse map the key / value pairs', function(){
      var obj = query.parse('name=tobi&species=ferret');
      obj.should.eql({ name: 'tobi', species: 'ferret' });
    })
  })
})