document.addEventListener("DOMContentLoaded", () => {
  // 🔑 DOM ELEMENTS
  const form = document.getElementById("bookingForm");
  const payment = document.getElementById("paymentSection");
  const success = document.getElementById("successSection");

  let bookingStatus = "draft";

  // 🟢 Book Now
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      bookingStatus = "submitted";
      console.log("STATUS:", bookingStatus);

      form.style.display = "none";
      payment.style.display = "block";
    });
  }

  // 🟢 Pay button (event delegation)
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "payBtn") {
      bookingStatus = "confirmed";
      console.log("STATUS:", bookingStatus);

      payment.style.display = "none";
      success.style.display = "block";

      // ⏳ 2 секундийн дараа нүүр хуудас руу
      setTimeout(() => {
        window.location.href = "../home/index.html"; // эсвэл "/"
      }, 2000);
    }
  });
});
