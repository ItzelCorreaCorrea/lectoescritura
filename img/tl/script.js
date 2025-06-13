const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const letterSelect = document.getElementById('letter');
const caseSelect = document.getElementById('case');

const alphabet = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz"
};

// Coordenadas ejemplo para trazar la letra A y a
const letterGuides = {
  'A': {
    points: [
      { x: 200, y: 300, number: 1 },
      { x: 150, y: 100, number: 2 },
      { x: 250, y: 100, number: 3 },
      { x: 200, y: 200, number: 4 },
      { x: 180, y: 200, number: 5 },
      { x: 220, y: 200, number: 6 },
    ],
    lines: [
      [0, 1], [0, 2], [4, 5]
    ]
  },
  'a': {
    points: [
      { x: 200, y: 200, number: 1 },
      { x: 240, y: 200, number: 2 },
      { x: 240, y: 240, number: 3 },
      { x: 200, y: 240, number: 4 },
      { x: 200, y: 280, number: 5 },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 0], [3, 4]
    ]
  }
};

function populateLetters() {
  const selectedCase = caseSelect.value;
  const letters = alphabet[selectedCase].split('');
  letterSelect.innerHTML = '';
  letters.forEach(letter => {
    const option = document.createElement('option');
    option.value = letter;
    option.textContent = letter;
    letterSelect.appendChild(option);
  });
  drawSelectedLetter();
}

function drawSelectedLetter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const letter = letterSelect.value;
  const guide = letterGuides[letter];
  if (!guide) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Guía no disponible', 130, 200);
    return;
  }

  // Líneas punteadas
  ctx.strokeStyle = '#aaa';
  ctx.setLineDash([6, 4]);
  guide.lines.forEach(([startIdx, endIdx]) => {
    const start = guide.points[startIdx];
    const end = guide.points[endIdx];
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  });

  // Puntos numerados
  ctx.setLineDash([]);
  guide.points.forEach(pt => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#4285f4';
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.fillText(pt.number, pt.x - 4, pt.y + 4);
  });
}

caseSelect.addEventListener('change', populateLetters);
letterSelect.addEventListener('change', drawSelectedLetter);

populateLetters();
