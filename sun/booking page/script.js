document.addEventListener("DOMContentLoaded", () => {
  // 🔁 Reload болсон бол шууд Home руу шилжих
  if (sessionStorage.getItem("redirectHome") === "true") {
    sessionStorage.removeItem("redirectHome");
    window.location.replace("../home/index.html");
    return;
  }

  const form = document.getElementById("bookingForm");
  const payment = document.getElementById("paymentSection");
  const success = document.getElementById("successSection");
  const houseSelect = document.getElementById("houseType");
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");
  const phoneInput = document.getElementById("phone");
  const adultsSelect = document.getElementById("adults");
  const childrenSelect = document.getElementById("children");

  // 🔐 login user
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Та эхлээд нэвтэрнэ үү");
    window.location.href = "../home/index.html";
    return;
  }

  // 🔒 DOM safety check
  if (
    !form ||
    !payment ||
    !success ||
    !houseSelect ||
    !checkInInput ||
    !checkOutInput
  ) {
    console.error("❌ HTML element олдсонгүй", {
      form,
      payment,
      success,
      houseSelect,
      checkInInput,
      checkOutInput,
    });
    return;
  }

  let bookingData = null;

  // 🟢 Book Now
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!houseSelect.value) {
      alert("House / Room type сонгоно уу");
      return;
    }

    if (!checkInInput.value || !checkOutInput.value) {
      alert("Check-in / Check-out огноо сонгоно уу");
      return;
    }

    bookingData = {
      bookingNumber: "BK-" + Date.now(),
      userId: currentUser.id,
      houseType: houseSelect.value,
      checkIn: checkInInput.value,
      checkOut: checkOutInput.value,
      phone: phoneInput.value,
      adults: Number(adultsSelect.value), // ✅ ADULTS
      children: Number(childrenSelect.value), // ✅ CHILDREN
      totalPrice: 240000,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    form.style.display = "none";
    payment.style.display = "block";
  });

  // 🟢 Pay → POST booking
  document.addEventListener("click", async (e) => {
    if (e.target.id === "payBtn" && bookingData) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      try {
        const res = await fetch("http://localhost:3000/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...bookingData,
            status: "confirmed",
          }),
        });

        if (!res.ok) throw new Error("Booking failed");

        // 🔑 Reload дараа Home руу очих тэмдэг
        sessionStorage.setItem("redirectHome", "true");

        // 🔁 Page-г зориудаар reload хийнэ
        window.location.reload();
      } catch (err) {
        console.error(err);
        alert("Booking хадгалахад алдаа гарлаа");
      }
    }
  });
});
