/*global describe: false, it: false */
var expect = require('expect.js');
var ary = require('../');

describe('ary(n, func)', function() {
  it('is a function', function() {
    expect(ary).to.be.a('function');
  });
  it('returns a function', function() {
    expect(ary(0, function() {})).to.be.a('function');
  });
  it('returns a function of length n', function() {
    expect(ary(0, function() {})).to.have.property('length', 0);
    expect(ary(1, function() {})).to.have.property('length', 1);
    expect(ary(2, function() {})).to.have.property('length', 2);
  });
  it('passes exactly n arguments', function() {
    ary(0, function() {expect(arguments.length).to.equal(0);})();
    ary(1, function() {expect(arguments.length).to.equal(1);})();
    ary(2, function() {expect(arguments.length).to.equal(2);})();
    ary(3, function() {expect(arguments.length).to.equal(3);})();
  });
  it('sets missing arguments to undefined', function() {
    ary(1, function() {expect(arguments[0]).to.equal(undefined);})();
    ary(3, function() {
      expect(arguments[0]).to.equal('zero');
      expect(arguments[1]).to.equal('one');
      expect(arguments[2]).to.equal(undefined);
    })('zero', 'one');
  });
});

describe('ary(n)(func)', function() {
  it('is a function', function() {
    expect(ary(0)).to.be.a('function');
  });
  it('returns a function', function() {
    expect(ary(0)(function() {})).to.be.a('function');
  });
  it('returns a function of length n', function() {
    expect(ary(0)(function() {})).to.have.property('length', 0);
    expect(ary(1)(function() {})).to.have.property('length', 1);
    expect(ary(2)(function() {})).to.have.property('length', 2);
  });
  it('passes exactly n arguments', function() {
    ary(0)(function() {expect(arguments.length).to.equal(0);})();
    ary(1)(function() {expect(arguments.length).to.equal(1);})();
    ary(2)(function() {expect(arguments.length).to.equal(2);})();
    ary(3)(function() {expect(arguments.length).to.equal(3);})();
  });
  it('sets missing arguments to undefined', function() {
    ary(1)(function() {expect(arguments[0]).to.equal(undefined);})();
    ary(3)(function() {
      expect(arguments[0]).to.equal('zero');
      expect(arguments[1]).to.equal('one');
      expect(arguments[2]).to.equal(undefined);
    })('zero', 'one');
  });
  it('caps additional arguments', function() {
    ary(2)(function() {
      expect(arguments.length).to.equal(2);
      expect(arguments[0]).to.equal('zero');
      expect(arguments[1]).to.equal('one');
    })('zero', 'one', 'two', 'three');
  });
});