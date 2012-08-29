
var parse = require('..');

describe('parse(str)', function(){
  describe('when the string is empty', function(){
    it('should return {}', function(){
      parse('').should.eql({});
    })
  })

  describe('when a non-string is passed', function(){
    it('should return {}', function(){
      parse(null).should.eql({});
      parse(0).should.eql({});
      parse().should.eql({});
    })
  })

  describe('when values are omitted', function(){
    it('should default values to ""', function(){
      var obj = parse('name&species');
      obj.should.eql({ name: '', species: '' });
    })
  })

  describe('when values are present', function(){
    it('should parse map the key / value pairs', function(){
      var obj = parse('name=tobi&species=ferret');
      obj.should.eql({ name: 'tobi', species: 'ferret' });
    })
  })
})