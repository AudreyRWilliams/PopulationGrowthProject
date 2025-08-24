// public/app.js
function el(id){return document.getElementById(id);}
const form = el('simForm');
const canvas = el('chart');
const ctx = canvas.getContext('2d');
const tableWrap = el('tableWrap');

function drawChart(data){
  // clear
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (!data || data.length === 0) return;
  const padding = 30;
  const w = canvas.width - padding*2;
  const h = canvas.height - padding*2;

  const xs = data.map(d=>d.t);
  const ys = data.map(d=>d.population);
  const minY = Math.min.apply(null, ys);
  const maxY = Math.max.apply(null, ys);

  // axes
  ctx.strokeStyle = '#ddd';
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, padding+h);
  ctx.lineTo(padding+w, padding+h);
  ctx.stroke();

  // plot
  ctx.strokeStyle = '#1e88e5';
  ctx.lineWidth = 2;
  ctx.beginPath();
  data.forEach((p,i)=>{
    const x = padding + (i/(data.length-1)) * w;
    const y = padding + h - ((p.population - minY) / (maxY - minY || 1)) * h;
    if (i===0) ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  });
  ctx.stroke();

  // labels
  ctx.fillStyle = '#333';
  ctx.font = '12px system-ui';
  ctx.fillText('t', canvas.width - padding, canvas.height - 8);
  ctx.fillText('population', 8, padding-8);
}

function buildTable(data){
  if (!data) { tableWrap.innerHTML=''; return; }
  const rows = data.map(d => `<tr><td>${d.t}</td><td>${d.population}</td></tr>`).join('');
  tableWrap.innerHTML = `<table><thead><tr><th>t</th><th>population</th></tr></thead><tbody>${rows}</tbody></table>`;
}

async function runSimulationForm(e){
  e && e.preventDefault();
  const payload = {
    model: el('model').value,
    P0: Number(el('P0').value),
    r: Number(el('r').value),
    K: Number(el('K').value),
    steps: Number(el('steps').value)
  };
  try {
    const res = await fetch('/api/simulate', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    drawChart(data);
    buildTable(data);
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

form.addEventListener('submit', runSimulationForm);
el('resetBtn').addEventListener('click', ()=>{ form.reset(); runSimulationForm(); });

// run once at load
runSimulationForm();
