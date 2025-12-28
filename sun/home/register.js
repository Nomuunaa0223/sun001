const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

function goBack() {
  window.history.back();
}
const API_URL = "http://localhost:3000";

/* ========== REGISTER ========== */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }

    try {
      // 🔍 email давхцаж байгаа эсэхийг шалгана
      const checkRes = await fetch(`${API_URL}/users?email=${email}`);
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        alert("Энэ email аль хэдийн бүртгэгдсэн байна");
        return;
      }

      // 🟢 Register
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!res.ok) throw new Error("Register failed");

      alert("Амжилттай бүртгэгдлээ. Нэвтэрнэ үү");

      // Sign in хэсэг рүү шилжүүлнэ
      document.getElementById("container").classList.remove("active");
    } catch (err) {
      console.error(err);
      alert("Бүртгэл үүсгэхэд алдаа гарлаа");
    }
  });
}

/* ========== LOGIN ========== */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("Email болон нууц үг оруулна уу");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/users?email=${email}&password=${password}`
      );
      const users = await res.json();

      if (users.length === 0) {
        alert("Email эсвэл нууц үг буруу байна");
        return;
      }

      const user = users[0];

      // 🔐 login user хадгална
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Booking page рүү шилжинэ
      window.location.href = "../booking page/index.html";
    } catch (err) {
      console.error(err);
      alert("Нэвтрэх үед алдаа гарлаа");
    }
  });
}
