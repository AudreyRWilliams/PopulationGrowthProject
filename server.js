// server.js
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// simulation logic
function runSimulation(opts) {
  const model = opts.model || 'exponential'; // 'exponential' or 'logistic'
  let P = Number(opts.P0 || 100);
  const r = Number(opts.r || 0.05); // rate per step
  const K = Number(opts.K || 1000); // carrying capacity for logistic
  const steps = Number(opts.steps || 50);

  const result = [];
  for (let t = 0; t <= steps; t++) {
    result.push({ t: t, population: Number(P.toFixed(6)) });
    if (model === 'logistic') {
      // discrete logistic step: P_{t+1} = P_t + r * P_t * (1 - P_t/K)
      P = P + r * P * (1 - P / K);
    } else {
      // continuous exponential step per time-step: multiply by e^r
      P = P * Math.exp(r);
    }
  }
  return result;
}

// API: POST /api/simulate with JSON { model, P0, r, K, steps }
app.post('/api/simulate', (req, res) => {
  try {
    const out = runSimulation(req.body || {});
    res.json(out);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// small health endpoint
app.get('/api/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening: http://localhost:${port}`);
});
