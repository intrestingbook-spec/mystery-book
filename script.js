
  
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
// Firebase Init
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

// Load reviews
db.collection("reviews")
  .orderBy("created", "desc")
  .onSnapshot(snapshot => {
    reviewsList.innerHTML = "";
    let ratings = [];

    snapshot.forEach(doc => {
      const r = doc.data();
      ratings.push(r.rating);

      const div = document.createElement("div");
      div.className = "review";

      div.innerHTML = `
        <div class="review-header">
          <div class="avatar">${r.name.charAt(0).toUpperCase()}</div>
          <strong>${r.name}</strong>
        </div>
        <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <p>${r.comment}</p>
        <div class="review-actions">
          <button onclick="likeReview('${doc.id}')">❤️ ${r.likes || 0}</button>
        </div>
      `;

      reviewsList.appendChild(div);
    });

    avgRatingEl.textContent = ratings.length
      ? (ratings.reduce((a,b)=>a+b)/ratings.length).toFixed(1)
      : "0.0";

    totalReviewsEl.textContent = ratings.length;
  });

// Submit review
reviewForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("username").value.trim();
  const comment = document.getElementById("comment").value.trim();
  const rating = Number(document.getElementById("rating").value);

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

// Like
function likeReview(id) {
  db.collection("reviews").doc(id)
    .update({
      likes: firebase.firestore.FieldValue.increment(1)
    });
}


const secret = Date.now().toString(36) + Math.random().toString(36).slice(2);
localStorage.setItem("review_secret", secret);

db.collection("reviews").add({
  name,
  comment: commentText,
  rating: ratingValue,
  likes: 0,
  secret: secret,
  created: firebase.firestore.FieldValue.serverTimestamp()
});
function deleteReview(id, secret) {
  const savedSecret = localStorage.getItem("review_secret");

  if (savedSecret !== secret) {
    alert("You can delete only your own review.");
    return;
  }

  db.collection("reviews").doc(id).delete();
}
