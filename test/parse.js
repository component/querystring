
var query = require('querystring');

describe('.parse(str)', function(){
  describe('when the string is empty', function(){
    it('should return {}', function(){
      expect(query.parse('')).to.eql({});
      expect(query.parse('    ')).to.eql({});
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

  describe('when strings are padded', function(){
    it('should parse normally', function(){
      var obj = query.parse('   name=tobi&species=ferret    ');
      expect(obj).to.eql({ name: 'tobi', species: 'ferret' });
    })
  })

  describe('when the string includes a question-mark', function(){
    it('should remove the question-mark', function(){
      var obj = query.parse('?name=tobi&species=ferret');
      expect(obj).to.eql({ name: 'tobi', species: 'ferret' });
    })
  })

  describe('when arrays are implied', function() {
    it('should parse key[]=value as an array', function() {
      var obj = query.parse('names[]=tobi&names[]=toby&names[]=tobias');
      expect(obj).to.eql({ names: ['tobi', 'toby', 'tobias'] });
    })

    it('should parse key=value1&key=value2 as an array', function() {
      var obj = query.parse('names=tobi&names=toby&names=tobias');
      expect(obj).to.eql({ names: ['tobi', 'toby', 'tobias'] });
    })

    it('should parse key[n]=value as an array', function() {
      var obj = query.parse('names[]=tobi&names[10]=toby');
      expect(Array.isArray(obj.names)).to.be(true);
      expect(obj.names[0]).to.eql('tobi');
      expect(obj.names[10]).to.eql('toby');
      expect(obj.names.length).to.eql(11);
    });
  })

  describe('when nested values are passed', function() {
    it('should merge nested values into a tree', function() {
      var obj = query.parse('name[first]=tobi&name[last]=seaworth&species=ferret');
      expect(obj).to.eql({ name: { first: 'tobi', last: 'seaworth' }, species: 'ferret' });
    })

    it('should parse deeply nested values', function() {
      var obj = query.parse('i[am][a][very][deeply][nested]=value');
      expect(obj).to.eql({ i: { am: { a: { very: { deeply: { nested: 'value' } } } } } });
    })

    it('should parse complex trees', function() {
      var obj = query.parse('people[tobi][boring]=false'
                          + '&people[tobi][hobbies][]=birdwatching'
                          + '&people[tobi][hobbies][]=archery'
                          + '&people[toby][boring]=true'
                          + '&people[toby][hobbies][]');
      expect(obj).to.eql({
        people: {
          tobi: { boring: 'false', hobbies: ['birdwatching', 'archery'] },
          toby: { boring: 'true', hobbies: [''] }
        }
      });
    })
  })

  describe('when parsing malicious querystrings', function() {
    it('should not manipulate prototypes', function() {
      var obj = query.parse('toString=noop&attack[toString]=noop');
      expect(obj.toString).to.be.a(Function);
      expect(obj.attack.toString).to.be.a(Function);
    })

    it('should not manipulate the prototypal chain', function() {
      var obj = query.parse('constructor[prototype][toString]=noop');
      expect(obj.constructor.prototype.toString).to.be.a(Function);
      expect(Object.prototype.toString).to.be.a(Function);
    })

    it('should not add to the Object prototype', function() {
      query.parse('constructor[prototype][attack]=noop');
      query.parse('attack[constructor][prototype][attack]=noop');
      expect(Object.prototype.attack).to.be(undefined);
    })
  })
})
