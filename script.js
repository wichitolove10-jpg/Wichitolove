/* =========================================================
   ELEMENTOS
========================================================= */

const screens =
  document.querySelectorAll(".screen");

const progressDots =
  document.querySelectorAll(".progress-dot");

const nameInput =
  document.getElementById("nameInput");

const unlockBtn =
  document.getElementById("unlockBtn");

const error =
  document.getElementById("error");

const nameResult =
  document.getElementById("nameResult");

const finalName =
  document.getElementById("finalName");

const finalParagraph =
  document.getElementById("finalParagraph");

const whyBtn =
  document.getElementById("whyBtn");

const continueBtn =
  document.getElementById("continueBtn");

const finalBtn =
  document.getElementById("finalBtn");

const typeText =
  document.getElementById("typeText");

const cursor =
  document.getElementById("cursor");


let userName = "";

let typingStarted = false;



/* =========================================================
   CAMBIAR PANTALLA
========================================================= */

function showScreen(number) {

  screens.forEach(screen => {

    screen.classList.remove("active");

  });


  const newScreen =
    document.getElementById(
      "screen" + number
    );


  if (!newScreen) {

    console.error(
      "No existe la pantalla:",
      number
    );

    return;

  }


  newScreen.classList.add("active");


  updateProgress(number);


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



/* =========================================================
   PROGRESO
========================================================= */

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



/* =========================================================
   CAPITALIZAR NOMBRE
========================================================= */

function capitalizeName(name) {

  return name

    .split(" ")

    .filter(
      word =>
        word.trim() !== ""
    )

    .map(

      word =>

        word.charAt(0).toUpperCase()

        +

        word.slice(1).toLowerCase()

    )

    .join(" ");

}



/* =========================================================
   PRIMER BOTÓN
========================================================= */

unlockBtn.addEventListener(
  "click",
  unlock
);


nameInput.addEventListener(

  "keydown",

  event => {

    if (
      event.key === "Enter"
    ) {

      event.preventDefault();

      unlock();

    }

  }

);



function unlock() {

  const name =
    nameInput.value.trim();


  if (
    name.length < 2
  ) {

    error.textContent =
      "Antes necesito saber tu nombre ♡";


    shakeCard();


    nameInput.focus();


    return;

  }


  error.textContent =
    "";


  userName =
    capitalizeName(name);


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



/* =========================================================
   BOTÓN PANTALLA 2
========================================================= */

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



/* =========================================================
   BOTÓN PANTALLA 3
========================================================= */

continueBtn.addEventListener(

  "click",

  () => {

    createFloatingElements(
      15
    );


    showScreen(
      4
    );

  }

);



/* =========================================================
   BOTÓN FINAL
========================================================= */

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



/* =========================================================
   CARTA AUTOMÁTICA
========================================================= */

function startTyping() {

  typingStarted =
    true;


  const message =

`${userName}, desde que tuve la oportunidad de conocerte, hubo algo en ti que llamó mi atención de una manera muy especial.

Al principio pensé que tal vez era solamente lo hermosa que eres.

Pero con el tiempo comprendí que había algo mucho más bonito detrás de eso.

Me gusta tu forma de ser, la manera en que te expresas y esos pequeños detalles que te hacen diferente.

No pretendo apresurar nada ni convertir estas palabras en algo complicado.

Simplemente quería decirte, con toda sinceridad, que conocerte me parece algo muy bonito...

y que, sin darme cuenta, comenzaste a gustarme más de lo que imaginaba. ♡`;


  let index =
    0;


  typeText.innerHTML =
    "";


  cursor.style.display =
    "inline";


  function write() {

    if (
      index <
      message.length
    ) {

      const character =
        message.charAt(index);


      if (
        character === "\n"
      ) {

        typeText.innerHTML +=
          "<br>";

      } else {

        typeText.innerHTML +=
          character;

      }


      index++;


      let speed =
        21;


      if (
        character === "."
      ) {

        speed =
          125;

      }


      if (
        character === ","
      ) {

        speed =
          60;

      }


      setTimeout(
        write,
        speed
      );

    } else {

      cursor.style.display =
        "none";


      setTimeout(

        () => {

          finalBtn.classList.add(
            "show"
          );


          createFloatingElements(
            12
          );

        },

        600

      );

    }

  }


  write();

}



/* =========================================================
   CELEBRACIÓN FINAL
========================================================= */

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

    1300

  );


  setTimeout(

    () => {

      createFloatingElements(
        20
      );

    },

    2700

  );

}



/* =========================================================
   ELEMENTOS FLOTANTES
========================================================= */

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

    "✧",

    "✿"

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
      20 +

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



/* =========================================================
   ERROR
========================================================= */

function shakeCard() {

  const card =
    document.querySelector(
      "#screen1 .card"
    );


  if (!card) {

    return;

  }


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



/* =========================================================
   EFECTO 3D
========================================================= */

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



/* =========================================================
   PARTÍCULAS
========================================================= */

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
        1.6 +
        0.4,

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
          229,
          139,
          162,
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



/* =========================================================
   EFECTOS AUTOMÁTICOS
========================================================= */

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