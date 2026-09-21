const screens = [...document.querySelectorAll('.screen')];
const dots = [...document.querySelectorAll('.dot')];
const nameInput = document.getElementById('nameInput');
const nameError = document.getElementById('nameError');
const nameResult = document.getElementById('nameResult');
const finalName = document.getElementById('finalName');
const typedLetter = document.getElementById('typedLetter');
const cursor = document.getElementById('cursor');
let userName = '';
let letterStarted = false;

function showScreen(number){
  screens.forEach(s => s.classList.remove('active'));
  const next = document.getElementById(`screen${number}`);
  if(!next) return;
  next.classList.add('active');
  dots.forEach((d,i) => d.classList.toggle('active', i < number));
  window.scrollTo({top:0,behavior:'smooth'});
  shower(number === 5 ? 34 : 12);
  if(number === 5 && !letterStarted){
    letterStarted = true;
    setTimeout(typeLetter, 650);
  }
}

function capitalizeName(name){
  return name.split(' ').filter(Boolean).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function readName(){
  const raw = nameInput.value.trim();
  if(raw.length < 2){
    nameError.textContent = 'Antes necesito saber tu nombre 💛';
    nameInput.focus();
    document.querySelector('#screen2 .card')?.animate([
      {transform:'translateX(0)'},{transform:'translateX(-7px)'},{transform:'translateX(7px)'},{transform:'translateX(-4px)'},{transform:'translateX(0)'}
    ],{duration:380});
    return;
  }
  nameError.textContent = '';
  userName = capitalizeName(raw);
  nameResult.textContent = userName;
  finalName.textContent = `${userName}...`;
  showScreen(3);
}

document.getElementById('startBtn').addEventListener('click', () => showScreen(2));
document.getElementById('nameBtn').addEventListener('click', readName);
nameInput.addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); readName(); }});
document.getElementById('meaningBtn').addEventListener('click', () => showScreen(4));
document.getElementById('letterBtn').addEventListener('click', () => showScreen(5));

function typeLetter(){
  const message = `${userName}, quizá estas flores no puedan llegar a tus manos desde una pantalla, pero quería que la intención sí llegara hasta ti.\n\nHoy quise tener un pequeño detalle contigo, porque hay personas que hacen que ciertos días tengan un significado diferente.\n\nNo hace falta una ocasión perfecta para recordarle a alguien lo especial y hermosa que es. Y si hoy las flores son amarillas, entonces quería que al menos unas llevaran tu nombre.\n\nEspero que esto te saque una sonrisa. Para mí, eso ya haría que el detalle valiera la pena. 💛`;
  typedLetter.innerHTML = '';
  cursor.style.display = 'inline-block';
  let i = 0;
  function write(){
    if(i >= message.length){ cursor.style.display = 'none'; shower(26); return; }
    const ch = message[i++];
    typedLetter.innerHTML += ch === '\n' ? '<br>' : ch;
    let delay = 19;
    if(ch === '.') delay = 110;
    else if(ch === ',') delay = 55;
    setTimeout(write, delay);
  }
  write();
}

function createPetal(){
  const layer = document.getElementById('petals');
  const p = document.createElement('span');
  p.className = 'petal';
  p.textContent = Math.random() > .35 ? '🌼' : '✿';
  p.style.left = Math.random()*100 + '%';
  p.style.fontSize = (10 + Math.random()*15) + 'px';
  p.style.animationDuration = (5 + Math.random()*4) + 's';
  p.style.animationDelay = (Math.random()*.4) + 's';
  layer.appendChild(p);
  setTimeout(() => p.remove(), 9500);
}

function shower(amount=12){ for(let i=0;i<amount;i++) setTimeout(createPetal, i*55); }
setInterval(() => { if(Math.random() > .35) createPetal(); }, 1350);

function createSpark(){
  const layer = document.getElementById('sparkles');
  const s = document.createElement('span');
  s.className = 'spark';
  s.textContent = Math.random()>.5 ? '✦' : '✧';
  s.style.left = Math.random()*100 + '%';
  s.style.fontSize = (8 + Math.random()*10) + 'px';
  s.style.animationDuration = (4 + Math.random()*3) + 's';
  layer.appendChild(s);
  setTimeout(() => s.remove(), 8000);
}
setInterval(() => { if(Math.random()>.5) createSpark(); }, 1800);

document.querySelectorAll('.interactive-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    if(window.innerWidth < 700) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = (y - r.height/2)/65;
    const ry = (r.width/2 - x)/65;
    card.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = 'perspective(1100px) rotateX(0) rotateY(0)');
});

shower(8);
