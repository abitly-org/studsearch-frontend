
var plural = function(k : string, n : number){
  var postfix = '_other';

  var a = (n % 10 === 1);
  var b = (n % 100 !== 11);
  if( a && b ){ postfix = '_one' }

  var c = [2, 3, 4].indexOf(n % 10)     !== -1;
  var d = [12, 13, 14].indexOf(n % 100) === -1;
  if( c && d ){ postfix = '_few' }

  var e = n % 10 === 0;
  var f = [5, 6, 7, 8, 9].indexOf(n % 10)   !== -1;
  var g = [11, 12, 13, 14].indexOf(n % 100) !== -1;
  if( e || f || g ){ postfix = '_many' }

  return k + postfix;
}
export default plural;