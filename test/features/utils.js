define(function () {
  return function (ParsleyUtils) {
    describe('Utils', function () {
      it('should have a proper deserializeValue() function', function () {
        expect(ParsleyUtils.deserializeValue('true')).to.be(true);
        expect(ParsleyUtils.deserializeValue('1')).to.be(1);
        expect(ParsleyUtils.deserializeValue('["foo", "bar"]')).to.be.an('array');
        expect(ParsleyUtils.deserializeValue('{"foo": "bar"}')).to.be.an('object');
      });
      it('should have a proper camelize() function', function () {
        expect(ParsleyUtils.camelize('foo-bar')).to.be('fooBar');
        expect(ParsleyUtils.camelize('foo-bar-baz')).to.be('fooBarBaz');
        expect(ParsleyUtils.camelize('foo-bAr-baz')).to.be('fooBArBaz');
      });
      it('should have a proper dasherize() function', function () {
        expect(ParsleyUtils.dasherize('fooBar')).to.be('foo-bar');
        expect(ParsleyUtils.dasherize('fooBarBaz')).to.be('foo-bar-baz');
        expect(ParsleyUtils.dasherize('fooBArBaz')).to.be('foo-b-ar-baz');
      });
      it('should have a proper attr() function', function () {
        var element = [{
          attributes: [
            {
              specified: true,
              name: "data-parsley-foo",
              value: "bar"
            },
            {
              specified: true,
              name: "parsley-foo",
              value: "baz"
            },
            {
              specified: true,
              name: "data-parsley-bar",
              value: "[0, 42]"
            },
            {
              specified: false,
              name: "data-parsley-foo",
              value: "bar"
            },
            {
              foo: "bar"
            }
          ]
        }],
        attr = ParsleyUtils.attr(element, 'data-parsley-');

        expect(attr).to.eql({'foo': 'bar', 'bar': [0, 42]});
      });
      it('should have a proper get() function', function () {
        var object = {
          foo: {bar: 'baz'},
          bar: 'qux'
        };
        expect(ParsleyUtils.get(object, 'bar')).to.be('qux');
        expect(ParsleyUtils.get(object, 'foo.bar')).to.be('baz');
        expect(ParsleyUtils.get(object, 'foo.baz')).to.be(undefined);
        expect(ParsleyUtils.get(object, 'foobarbaz', 'foo')).to.be('foo');
      });
    });
  }
});
