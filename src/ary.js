module.exports = ary;
ary.nullary = ary(0);
ary.unary = ary(1);
ary.binary = ary(2);
ary.ternary = ary(3);

function ary(n, func) {
  if (!func) {
    return function(func) {
      return ary(n, func);
    };
  }
  var funcName = func.name || '';
  var argNames = [];
  for (var i = 0; i < n; i++) {
    argNames.push('arg' + i);
  }
  argNames = argNames.join(', ');
  return eval(
    '(function ' + funcName + '(' + argNames + ') {\n' +
    '  return func.apply(this, [' + argNames + ']);\n' +
    '})'
  );
}