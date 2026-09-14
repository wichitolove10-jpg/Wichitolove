/* ==========================================================
   ELEMENTOS
========================================================== */

const screens =
  document.querySelectorAll(
    ".screen"
  );


const progressDots =
  document.querySelectorAll(
    ".progress-dot"
  );


const nameInput =
  document.getElementById(
    "nameInput"
  );


const unlockBtn =
  document.getElementById(
    "unlockBtn"
  );


const error =
  document.getElementById(
    "error"
  );


const nameResult =
  document.getElementById(
    "nameResult"
  );


const finalName =
  document.getElementById(
    "finalName"
  );


const whyBtn =
  document.getElementById(
    "whyBtn"
  );


const continueBtn =
  document.getElementById(
    "continueBtn"
  );


const finalBtn =
  document.getElementById(
    "finalBtn"
  );


const typeText =
  document.getElementById(
    "typeText"
  );


let userName = "";

let typingStarted = false;



/* ==========================================================
   CAMBIAR PANTALLA
========================================================== */

function showScreen(number) {

  screens.forEach(

    screen => {

      screen.classList.remove(
        "active"
      );

    }

  );


  const newScreen =
    document.getElementById(
      "screen" + number
    );


  newScreen.classList.add(
    "active"
  );


  updateProgress(
    number
  );


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });


  if (
    number === 4 &&
    !typingStarted
  ) {

    setTimeout(

      startTyping,

      700

    );

  }


  if (
    number === 5
  ) {

    finalCelebration();

  }

}



/* ==========================================================
   PROGRESO
========================================================== */

function updateProgress(number) {

  progressDots.forEach(

    (dot, index) => {

      dot.classList.toggle(

        "active",

        index < number

      );

    }

  );

}



/* ==========================================================
   CAPITALIZAR NOMBRE
========================================================== */

function capitalizeName(name) {

  return name

    .split(" ")

    .map(

      word =>

        word
          .charAt(0)
          .toUpperCase()

        +

        word
          .slice(1)
          .toLowerCase()

    )

    .join(" ");

}



/* ==========================================================
   DESBLOQUEAR
========================================================== */

unlockBtn.addEventListener(

  "click",

  unlock

);


nameInput.addEventListener(

  "keydown",

  event => {

    if (
      event.key ===
      "Enter"
    ) {

      unlock();

    }

  }

);


function unlock() {

  const name =
    nameInput.value.trim();


  if (
    name.length <
    2
  ) {

    error.textContent =
      "Antes necesito saber tu nombre ♡";


    shakeCard();


    return;

  }


  error.textContent =
    "";


  userName =
    capitalizeName(
      name
    );


  nameResult.textContent =
    userName;


  finalName.textContent =
    userName + "...";


  createFloatingElements(
    25
  );


  showScreen(
    2
  );

}



/* ==========================================================
   BOTONES
========================================================== */

whyBtn.addEventListener(

  "click",

  () => {

    createFloatingElements(
      12
    );


    showScreen(
      3
    );

  }

);



continueBtn.addEventListener(

  "click",

  () => {

    createFloatingElements(
      16
    );


    showScreen(
      4
    );

  }

);



finalBtn.addEventListener(

  "click",

  () => {

    createFloatingElements(
      45
    );


    showScreen(
      5
    );

  }

);



/* ==========================================================
   CARTA AUTOMÁTICA
========================================================== */

function startTyping() {

  typingStarted =
    true;


  const message =

`Desde que tuve la oportunidad de conocerte, hubo algo en ti que llamó mi atención de una manera muy especial.

Al principio pensé que simplemente era tu sonrisa o la forma tan hermosa en que te ves.

Pero con el tiempo comprendí que hay algo mucho más interesante.

Me gusta tu forma de ser, la manera en que te expresas y esos pequeños detalles que hacen que seas tú.

No pretendo apresurar nada, ni convertir estas palabras en algo complicado.

Simplemente quería que supieras que conocerte me parece algo verdaderamente bonito.

Y que, sin darme cuenta, comenzaste a ocupar un lugar especial en mis pensamientos...

un poco más de lo que esperaba. ♡`;


  let index =
    0;


  typeText.innerHTML =
    "";


  function write() {

    if (
      index <
      message.length
    ) {

      const character =
        message.charAt(
          index
        );


      if (
        character ===
        "\n"
      ) {

        typeText.innerHTML +=
          "<br>";

      } else {

        typeText.innerHTML +=
          character;

      }


      index++;


      let speed =
        22;


      if (
        character === "."
      ) {

        speed =
          145;

      }


      if (
        character === ","
      ) {

        speed =
          70;

      }


      setTimeout(

        write,

        speed

      );

    } else {

      setTimeout(

        () => {

          finalBtn.classList.add(
            "show"
          );


          createFloatingElements(
            12
          );

        },

        700

      );

    }

  }


  write();

}



/* ==========================================================
   CELEBRACIÓN FINAL
========================================================== */

function finalCelebration() {

  createFloatingElements(
    55
  );


  setTimeout(

    () => {

      createFloatingElements(
        25
      );

    },

    1500

  );


  setTimeout(

    () => {

      createFloatingElements(
        20
      );

    },

    3000

  );

}



/* ==========================================================
   ELEMENTOS FLOTANTES
========================================================== */

function createFloatingElements(
  amount = 15
) {

  const container =
    document.getElementById(
      "floatingElements"
    );


  const symbols = [

    "♥",

    "♡",

    "✦",

    "✧"

  ];


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const element =
      document.createElement(
        "span"
      );


    element.classList.add(
      "floating-element"
    );


    element.textContent =

      symbols[

        Math.floor(

          Math.random() *

          symbols.length

        )

      ];


    element.style.left =

      Math.random() *
      100 +

      "%";


    element.style.fontSize =

      10 +

      Math.random() *
      21 +

      "px";


    element.style.animationDuration =

      4 +

      Math.random() *
      3 +

      "s";


    element.style.animationDelay =

      Math.random() *
      0.7 +

      "s";


    element.style.opacity =

      0.35 +

      Math.random() *
      0.55;


    container.appendChild(
      element
    );


    setTimeout(

      () => {

        element.remove();

      },

      8200

    );

  }

}



/* ==========================================================
   EFECTO DE ERROR
========================================================== */

function shakeCard() {

  const card =
    document.querySelector(
      "#screen1 .card"
    );


  card.animate(

    [

      {
        transform:
          "translateX(0)"
      },

      {
        transform:
          "translateX(-8px)"
      },

      {
        transform:
          "translateX(8px)"
      },

      {
        transform:
          "translateX(-5px)"
      },

      {
        transform:
          "translateX(5px)"
      },

      {
        transform:
          "translateX(0)"
      }

    ],

    {

      duration:
        430

    }

  );

}



/* ==========================================================
   EFECTO 3D
========================================================== */

document
  .querySelectorAll(
    ".interactive-card"
  )
  .forEach(

    card => {

      card.addEventListener(

        "mousemove",

        event => {

          if (
            window.innerWidth <
            700
          ) {

            return;

          }


          const rect =
            card.getBoundingClientRect();


          const mouseX =

            event.clientX -
            rect.left;


          const mouseY =

            event.clientY -
            rect.top;


          const centerX =

            rect.width /
            2;


          const centerY =

            rect.height /
            2;


          const rotateX =

            (
              mouseY -
              centerY
            )

            /

            55;


          const rotateY =

            (
              centerX -
              mouseX
            )

            /

            55;


          card.style.transform =

            `
              perspective(1100px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
            `;

        }

      );


      card.addEventListener(

        "mouseleave",

        () => {

          card.style.transform =

            "perspective(1100px) rotateX(0deg) rotateY(0deg)";

        }

      );

    }

  );



/* ==========================================================
   PARTÍCULAS DE FONDO
========================================================== */

const canvas =
  document.getElementById(
    "particles"
  );


const ctx =
  canvas.getContext(
    "2d"
  );


let particles =
  [];



function resizeCanvas() {

  canvas.width =
    window.innerWidth;


  canvas.height =
    window.innerHeight;

}



window.addEventListener(

  "resize",

  () => {

    resizeCanvas();

    createParticles();

  }

);


resizeCanvas();



function createParticles() {

  particles =
    [];


  const amount =

    Math.min(

      75,

      Math.floor(

        window.innerWidth /
        15

      )

    );


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    particles.push({

      x:

        Math.random() *
        canvas.width,

      y:

        Math.random() *
        canvas.height,

      size:

        Math.random() *
        1.4 +
        0.3,

      speed:

        Math.random() *
        0.18 +
        0.04,

      opacity:

        Math.random() *
        0.45 +
        0.08

    });

  }

}


createParticles();



function animateParticles() {

  ctx.clearRect(

    0,

    0,

    canvas.width,

    canvas.height

  );


  particles.forEach(

    particle => {

      particle.y -=
        particle.speed;


      if (
        particle.y <
        0
      ) {

        particle.y =
          canvas.height;


        particle.x =

          Math.random() *
          canvas.width;

      }


      ctx.beginPath();


      ctx.arc(

        particle.x,

        particle.y,

        particle.size,

        0,

        Math.PI *
        2

      );


      ctx.fillStyle =

        `rgba(
          238,
          190,
          202,
          ${particle.opacity}
        )`;


      ctx.fill();

    }

  );


  requestAnimationFrame(
    animateParticles
  );

}


animateParticles();



/* ==========================================================
   EFECTOS AUTOMÁTICOS
========================================================== */

setInterval(

  () => {

    if (
      Math.random() >
      0.45
    ) {

      createFloatingElements(
        1
      );

    }

  },

  2100

);