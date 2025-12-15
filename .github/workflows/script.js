  function scrollToStory() {
      document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
    }
function goToChapter(id) {
  document.getElementById(id)
    .scrollIntoView({ behavior: "smooth" });
}
    // Scroll reveal
  function scrollToChapter() {
  document.getElementById("chapter-one")
    .scrollIntoView({ behavior: "smooth" });
}

const lines = document.querySelectorAll(".line");
const characters = document.querySelectorAll(".character");

lines.forEach((line, index) => {
  setTimeout(() => {
    line.style.transition = "0.8s ease";
    line.style.opacity = 1;
    line.style.transform = "translateY(0)";
  }, index * 400);
  
  
});
const characterCards = document.querySelectorAll(".character");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  characterCards.forEach(card => {
    if (card.getBoundingClientRect().top < trigger) {
      card.classList.add("show");
    }
  });
});
const audio = document.getElementById("bg-audio");
let playing = false;

function toggleAudio() {
  if (!playing) {
    audio.play();
  } else {
    audio.pause();
  }
  playing = !playing;
}
function toggleTheme() {
  document.body.classList.toggle("light");
}
const elements = document.querySelectorAll(".line, .character");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  elements.forEach(el => {
    if (el.getBoundingClientRect().top < trigger) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = "0.8s ease";
    }
  });
});

window.addEventListener("scroll", () => {
  localStorage.setItem("scrollPos", window.scrollY);
});

window.onload = () => {
  window.scrollTo(0, localStorage.getItem("scrollPos") || 0);
};
