
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
})