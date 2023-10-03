const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
canvas.width = 400;
canvas.height = 400;
let coord = { x: 0, y: 0 };

const start = (e) =>  {
  canvas.addEventListener('mousemove', draw);
  reposition(e);
}

const stop = () => {
  canvas.removeEventListener('mousemove', draw);
}

const reposition = (e) =>  {
  coord.x = e.clientX - canvas.offsetLeft;
  coord.y = e.clientY - canvas.offsetTop;
}

const draw = (e) => {
  ctx.beginPath();
  ctx.lineWidth = 20;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#282828';
  ctx.moveTo(coord.x, coord.y);
  reposition(e);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mouseup', stop);