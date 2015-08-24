
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

  describe('when a querystring value with spaces encoded as "+" is passed', function(){
    it('should decode them to spaces', function(){
      expect(query.parse('?names=friends+and+family')).to.eql({ names: 'friends and family' });
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

  describe('when the string includes a question-mark', function(){
    it('should remove the question-mark', function(){
      var obj = query.parse('?name=tobi&species=ferret');
      expect(obj).to.eql({ name: 'tobi', species: 'ferret' });
    })
  })

  describe('when querystring array is given', function(){
    it('should parse as array', function(){
      var obj = query.parse('items%5B0%5D=1&items%5B1%5D=2&items%5B2%5D=3&key=a');
      expect(obj).to.eql({ items: [1, 2, 3], key: 'a' });
    })
  })

  describe('when querystring dot notation is given', function () {
    it('should parse as object', function(){
      var obj = query.parse('trip.flight.time=6%3A30%20PM&trip.hotel.name=Four%20Seasons');
      expect(obj).to.eql({ trip: { flight: { time: '6:30 PM' }, hotel: { name: 'Four Seasons' } } });
    })

    it('should not override existing properties', function(){
      var obj = query.parse('height=120&height.minimum=60&height.maximum=180');
      expect(obj).to.eql({ height: 120 });
    })

    it('should not parse empty properties', function(){
      var obj = query.parse('movie...showtime=9%20PM');
      expect(obj).to.eql({ 'movie...showtime': '9 PM' });
    })
  })
})
