
var query = require('..');

describe('.stringify(obj)', function(){
  describe('when the object is empty', function(){
    it('should return ""', function(){
      query.stringify({}).should.eql('');
    })
  })

  describe('when a non-object is given', function(){
    it('should return ""', function(){
      query.stringify(null).should.eql('');
      query.stringify(undefined).should.eql('');
      query.stringify(0).should.eql('');
      query.stringify().should.eql('');
      query.stringify('').should.eql('');
    })
  })

  describe('when an object is given', function(){
    it('should return a query-string', function(){
      query.stringify({ name: 'tobi', species: 'ferret' })
        .should.equal('name=tobi&species=ferret');
    })

    it('should uri encode', function(){
      query.stringify({ 'some thing': 'something else' })
        .should.equal('some%20thing=something%20else')
    })
  })
})