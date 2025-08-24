// simulate.js
// Usage: node simulate.js [model] [P0] [r] [K] [steps]
// example: node simulate.js logistic 100 0.1 1000 30

function runSimulation(opts) {
  const model = opts.model || 'exponential';
  let P = Number(opts.P0 || 100);
  const r = Number(opts.r || 0.05);
  const K = Number(opts.K || 1000);
  const steps = Number(opts.steps || 50);

  const out = [];
  for (let t=0; t<=steps; t++){
    out.push({ t, population: Number(P.toFixed(6)) });
    if (model === 'logistic') {
      P = P + r * P * (1 - P / K);
    } else {
      P = P * Math.exp(r);
    }
  }
  return out;
}

const args = process.argv.slice(2);
const opts = {
  model: args[0] || 'exponential',
  P0: args[1] !== undefined ? Number(args[1]) : 100,
  r: args[2] !== undefined ? Number(args[2]) : 0.05,
  K: args[3] !== undefined ? Number(args[3]) : 1000,
  steps: args[4] !== undefined ? Number(args[4]) : 30
};

const out = runSimulation(opts);
console.log('t,population');
out.forEach(row => console.log(row.t + ',' + row.population));
