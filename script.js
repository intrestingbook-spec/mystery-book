
  
function goToChapter(id) {
  document.getElementById(id)
    .scrollIntoView({ behavior: "smooth" });
}
    // Scroll reveal
  function scrollToChapter() {
  document.getElementById("chapter-one")
    .scrollIntoView({ behavior: "smooth" });
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


const characterCards = document.querySelectorAll(".character");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  document.querySelectorAll(".line, .character").forEach(el => {
    if (el.getBoundingClientRect().top < trigger) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = "0.8s ease";
    }
  });

  localStorage.setItem("scrollPos", window.scrollY);
});
// 🔥 Firebase Config (REPLACE with your keys)
const firebaseConfig = {
  apiKey: "AIzaSyXXXX",
  authDomain: "yourproject.firebaseapp.com",
  projectId: "yourproject",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const reviewsList = document.getElementById("reviewsList");
const avgRatingEl = document.getElementById("avgRating");
const totalReviewsEl = document.getElementById("totalReviews");
const reviewForm = document.getElementById("reviewForm");

let ratings = [];

db.collection("reviews").orderBy("created", "desc")
  .onSnapshot(snapshot => {
    reviewsList.innerHTML = "";
    ratings = [];

    snapshot.forEach(doc => {
      const r = doc.data();
      ratings.push(r.rating);

      const div = document.createElement("div");
      div.className = "review";

      div.innerHTML = `
        <div class="review-header">
          <div class="avatar">${r.name[0].toUpperCase()}</div>
          <strong>${r.name}</strong>
        </div>
        <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <p>${r.comment}</p>
        <div class="review-actions">
          <button onclick="likeReview('${doc.id}')">❤️ ${r.likes || 0}</button>
          <button onclick="deleteReview('${doc.id}', '${r.name}')">🗑</button>
        </div>
      `;

      reviewsList.appendChild(div);
    });

    const avg = ratings.length
      ? (ratings.reduce((a,b)=>a+b)/ratings.length).toFixed(1)
      : "0.0";

    avgRatingEl.textContent = avg;
    totalReviewsEl.textContent = ratings.length;
  });

reviewForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("username").value.trim();
  const commentText = document.getElementById("comment").value.trim();
  const ratingValue = Number(document.getElementById("rating").value);

  if (!name || !commentText || !ratingValue) {
    alert("Please fill all fields");
    return;
  }

  db.collection("reviews").add({
    name: name,
    comment: commentText,
    rating: ratingValue,
    likes: 0,
    created: firebase.firestore.FieldValue.serverTimestamp()
  });

  reviewForm.reset();
});


function likeReview(id) {
  const ref = db.collection("reviews").doc(id);
  ref.update({ likes: firebase.firestore.FieldValue.increment(1) });
}

function deleteReview(id, name) {
  const user = prompt("Enter your name to delete:");
  if (user === name) {
    db.collection("reviews").doc(id).delete();
  } else {
    alert("You can delete only your own review.");
  }
}


const lines = document.querySelectorAll(".line");
const characters = document.querySelectorAll(".character");


const characterCards = document.querySelectorAll(".character");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  document.querySelectorAll(".line, .character").forEach(el => {
    if (el.getBoundingClientRect().top < trigger) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = "0.8s ease";
    }
  });

  localStorage.setItem("scrollPos", window.scrollY);
});
// 🔥 Firebase Config (REPLACE with your keys)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const reviewsList = document.getElementById("reviewsList");
const avgRatingEl = document.getElementById("avgRating");
const totalReviewsEl = document.getElementById("totalReviews");
const reviewForm = document.getElementById("reviewForm");

let ratings = [];

db.collection("reviews").orderBy("created", "desc")
  .onSnapshot(snapshot => {
    reviewsList.innerHTML = "";
    ratings = [];

    snapshot.forEach(doc => {
      const r = doc.data();
      ratings.push(r.rating);

      const div = document.createElement("div");
      div.className = "review";

      div.innerHTML = `
        <div class="review-header">
          <div class="avatar">${r.name[0].toUpperCase()}</div>
          <strong>${r.name}</strong>
        </div>
        <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <p>${r.comment}</p>
        <div class="review-actions">
          <button onclick="likeReview('${doc.id}')">❤️ ${r.likes || 0}</button>
          <button onclick="deleteReview('${doc.id}', '${r.name}')">🗑</button>
        </div>
      `;

      reviewsList.appendChild(div);
    });

    const avg = ratings.length
      ? (ratings.reduce((a,b)=>a+b)/ratings.length).toFixed(1)
      : "0.0";

    avgRatingEl.textContent = avg;
    totalReviewsEl.textContent = ratings.length;
  });

reviewForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = username.value.trim();
  const comment = comment.value.trim();
  const rating = Number(rating.value);

  if (!name || !comment || !rating) return;

  db.collection("reviews").add({
    name,
    comment,
    rating,
    likes: 0,
    created: firebase.firestore.FieldValue.serverTimestamp()
  });

  reviewForm.reset();
});

function likeReview(id) {
  const ref = db.collection("reviews").doc(id);
  ref.update({ likes: firebase.firestore.FieldValue.increment(1) });
}

function deleteReview(id, name) {
  const user = prompt("Enter your name to delete:");
  if (user === name) {
    db.collection("reviews").doc(id).delete();
  } else {
    alert("You can delete only your own review.");
  }
}

