// Entrada 1
var G1 = (function() {

  // Vertices
  var V = ['u','v','w','x','y','z'];

  // Arestas
  var E = [ ['u','w'],
            ['v','w'],
            ['v','z'],
            ['z','y'],
            ['w','x'] ];

  var G = {V: V, E: E};
  return G;
}());

// Entrada 2
var G2 = (function() {
  var V = ['a','b','c','d','e','f','g'];
  var E = [ ['a','b'],
            ['b','c'],
            ['c','d'],
            ['c','e'],
            ['d','e'],
            ['d','f'],
            ['e','f'],
            ['d','g']];
  var G = {V: V, E: E};
  return G;
}());

// Retorna os vertices vizinhos
var neighborsOf = function(G, v) {
  var E = G.E;
  var neighbors = [];
  E.forEach(function(e) {
    var a = e[0];
    var b = e[1];
    if (a == v) {
      neighbors.push(b);
    } else if (b == v) {
      neighbors.push(a);
    }
  });
  return neighbors;
};

// Retorna o grau de um vertice
var degree = function(G, v) {
  var E = G.E;
  var count = 0;
  E.forEach(function(e) {
    if (e.indexOf(v) >= 0) {
      count += 1;
    }
  });
  return count;
};

// Retorna um array de vertices ordenados conforme sequencia de grau
var degreeSequence = function(G) {
  var V = G.V;
  var sequence = [];
  V.forEach(function(v) {
    var d = degree(G, v);
    sequence.push({v: v, d: d});
  });
  sequence.sort(function(a, b) {
    if (a.d > b.d) return -1;
    if (a.d == b.d) return 0;
    return 1;
  });
  return sequence;
};

// Cria uma funcao que indica se um elemento nao esta em um array
var notIn = function(array) {
  return function(element) {
    return array.indexOf(element) < 0;
  };
};

// Cria uma funcao que indica se um elemento esta em um array
var isIn = function(array) {
  return function(element) {
    return array.indexOf(element) >= 0;
  };
};

// Heuristica de lista para cobertura dos vertices, conforme
// "A list heuristic for vertex cover" de David Avis e Tomokazu Imamura (2006)
var vertexCoverListLeft = function(G) {
  var sequence = degreeSequence(G);
  var v;
  var neighbors;
  var C = [];
  while (sequence.length > 0) {
    v = sequence.shift().v;
    neighbors = neighborsOf(G, v);
    if (neighbors.some(notIn(C))) {
      C.push(v);
    }
  }
  return C;
};

// Heuristica de lista para cobertura dos vertices, conforme
// "A better list heuristic for vertex cover" de François Delbot e Christian Laforest (2008)
var vertexCoverListRight = function(G) {
  var sequence = degreeSequence(G);
  var v;
  var neighbors;
  var C = [];
  var visited = [];
  while (sequence.length > 0) {
    v = sequence.pop().v;
    neighbors = neighborsOf(G, v).filter(isIn(visited));
    if (neighbors.some(notIn(C))) {
      C.push(v);
    }
    visited.push(v);
  }
  return C;
};

// Executa o algoritmo
var resultLeft1 = vertexCoverListLeft(G1);
var resultRight1 = vertexCoverListRight(G1);
var resultLeft2 = vertexCoverListLeft(G2);
var resultRight2 = vertexCoverListRight(G2);

// Exibe a lista de vertices que formam a cobertura de vertices
console.log('G1:')
console.log('  left: ' + resultLeft1);
console.log('  right: ' + resultRight1);
console.log('G2:');
console.log('  left: ' + resultLeft2);
console.log('  right: ' + resultRight2);
