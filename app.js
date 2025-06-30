const svgCanvas = document.getElementById('svgCanvas');
const addCircleBtn = document.getElementById('addCircle');
const playBtn = document.getElementById('play');

let selectedElement = null;

addCircleBtn.addEventListener('click', () => {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "200");
  circle.setAttribute("cy", "200");
  circle.setAttribute("r", "30");
  circle.setAttribute("fill", "pink");
  svgCanvas.appendChild(circle);
  selectedElement = circle;
});

playBtn.addEventListener('click', () => {
  if (!selectedElement) return alert("Add a shape first!");

  // Remove any existing animation
  selectedElement.style.animation = '';

  const type = document.getElementById('animationType').value;
  const duration = document.getElementById('duration').value;
  const repeat = document.getElementById('repeat').checked ? 'infinite' : '1';

  let keyframes = '';
  if (type === 'move') {
    keyframes = `@keyframes moveAnim {
      0% { transform: translate(0,0); }
      50% { transform: translate(100px,100px); }
      100% { transform: translate(0,0); }
    }`;
  } else if (type === 'scale') {
    keyframes = `@keyframes scaleAnim {
      0% { transform: scale(1); }
      50% { transform: scale(1.5); }
      100% { transform: scale(1); }
    }`;
  } else if (type === 'rotate') {
    keyframes = `@keyframes rotateAnim {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }`;
  } else if (type === 'color') {
    keyframes = `@keyframes colorAnim {
      0% { fill: blue; }
      50% { fill: red; }
      100% { fill: blue; }
    }`;
  }

  // Inject keyframes into style tag
  const styleTag = document.createElement('style');
  styleTag.textContent = keyframes;
  document.head.appendChild(styleTag);

  // Apply animation
  selectedElement.style.animation = `${type}Anim ${duration}s ${repeat} linear`;
});
