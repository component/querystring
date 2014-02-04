
var query = require('querystring');

describe('.stringify(obj)', function(){
  describe('when the object is empty', function(){
    it('should return ""', function(){
      expect(query.stringify({})).to.eql('');
    })
  })

  describe('when a non-object is given', function(){
    it('should return ""', function(){
      expect(query.stringify(null)).to.eql('');
      expect(query.stringify(undefined)).to.eql('');
      expect(query.stringify(0)).to.eql('');
      expect(query.stringify()).to.eql('');
      expect(query.stringify('')).to.eql('');
    })
  })

  describe('when an object is given', function(){
    it('should return a query-string', function(){
      expect(query.stringify({ name: 'tobi', species: 'ferret' }))
        .to.eql('name=tobi&species=ferret');
    })

    it('should uri encode', function(){
      expect(query.stringify({ 'some thing': 'something else' }))
        .to.eql('some%20thing=something%20else')
    })
  })

  describe('when a nested object is given', function() {
    it('should return a query-string with nested params', function() {
      expect(query.stringify({ name: { first: 'tobi', last: 'seaworth'}, species: 'ferret' }))
        .to.eql('name%5Bfirst%5D=tobi&name%5Blast%5D=seaworth&species=ferret');
    })
  })

  describe('when an object with nested arrays is given', function(){
    var example = { ferrets: { names: ['tobi', 'toby', 'tobias'] }};

    it('should return a query-string with nested arrays', function(){
      var out = 'ferrets%5Bnames%5D%5B%5D=tobi&ferrets%5Bnames%5D'
              + '%5B%5D=toby&ferrets%5Bnames%5D%5B%5D=tobias';
      expect(query.stringify(example)).to.eql(out);
    })
  })

  describe('when a complex tree is given', function(){
    var example = {
      people: {
        tobi: { boring: false, hobbies: ['birdwatching', 'archery'] },
        toby: { boring: true, hobbies: [''] }
      }
    };

    it('should return a complex query-string', function(){
      var out = 'people%5Btobi%5D%5Bboring%5D=false&people%5Btobi%5D'
              + '%5Bhobbies%5D%5B%5D=birdwatching&people%5Btobi%5D%5B'
              + 'hobbies%5D%5B%5D=archery&people%5Btoby%5D%5Bboring%5D'
              + '=true&people%5Btoby%5D%5Bhobbies%5D%5B%5D=';
      expect(query.stringify(example)).to.eql(out);
    })
  })
})
