// Scroll Animation - элементүүд харагдахад анимацилагдана
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Features-уудад анимаци нэмэх
document.addEventListener("DOMContentLoaded", () => {
  // Features дээр fade-in эффект
  const features = document.querySelectorAll(".feature");
  features.forEach((feature, index) => {
    feature.style.opacity = "0";
    feature.style.transform = "translateY(50px)";
    feature.style.transition = `all 0.5s ease ${index * 0.2}s`;
    observer.observe(feature);
  });

  // Title-уудад анимаци
  const titles = document.querySelectorAll(".title");
  titles.forEach((title) => {
    title.style.opacity = "0";
    title.style.transform = "translateY(30px)";
    title.style.transition = "all 3s ease";
    observer.observe(title);
  });

  // Gallery зурагт hover эффект
  const galleryImage = document.querySelector(".images img");
  if (aglleryImage) {
    galleryImage.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
    galleryImage.addEventListener("mouseenter", () => {
      galleryImage.style.transform = "scale(1.02)";
      galleryImage.style.boxShadow = "0 20px 60px rgba(0,0,0,0.2)";
    });
    galleryImage.addEventListener("mouseleave", () => {
      galleryImage.style.transform = "scale(1)";
      galleryImage.style.boxShadow = "none";
    });
  }

  // Navigation hover эффект
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach((link) => {
    link.style.transition = "all 0.3s ease";
    link.addEventListener("mouseenter", () => {
      link.style.transform = "scale(1.1)";
      link.style.textShadow = "0 0 10px rgba(255,255,255,0.8)";
    });
    link.addEventListener("mouseleave", () => {
      link.style.transform = "scale(1)";
      link.style.textShadow = "none";
    });
  });

  // Feature number-ууд дээр hover эффект
  const featureNumbers = document.querySelectorAll(".feature-number");
  featureNumbers.forEach((num) => {
    num.style.transition = "all 0.3s ease";
    const feature = num.closest(".feature");

    feature.addEventListener("mouseenter", () => {
      num.style.color = "#04645f";
      num.style.transform = "scale(1.1)";
    });
    feature.addEventListener("mouseleave", () => {
      num.style.color = "";
      num.style.transform = "scale(1)";
    });
  });

  // Social icons hover эффект
  const socialIcons = document.querySelectorAll(".social-icons i");
  socialIcons.forEach((icon) => {
    icon.style.transition = "all 0.3s ease";
    icon.style.cursor = "pointer";
    icon.addEventListener("mouseenter", () => {
      icon.style.transform = "translateY(-5px) scale(1.2)";
      icon.style.color = "#04645f";
    });
    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "translateY(0) scale(1)";
      icon.style.color = "";
    });
  });

  // Newsletter button hover эффект
  const newsletter = document.querySelector(".newsletter");
  if (newsletter) {
    newsletter.style.transition = "all 0.3s ease";
    newsletter.style.cursor = "pointer";
    newsletter.addEventListener("mouseenter", () => {
      newsletter.style.backgroundColor = "#04645f";
      newsletter.style.color = "white";
      newsletter.style.transform = "translateY(-2px)";
      newsletter.style.boxShadow = "0 5px 15px rgba(4,100,95,0.3)";
    });
    newsletter.addEventListener("mouseleave", () => {
      newsletter.style.backgroundColor = "white";
      newsletter.style.color = "#888";
      newsletter.style.transform = "translateY(0)";
      newsletter.style.boxShadow = "none";
    });
  }

  // Logo fade-in анимаци
  const logo = document.querySelector(".logo img");
  if (logo) {
    logo.style.opacity = "0";
    logo.style.transform = "translateY(-30px)";
    setTimeout(() => {
      logo.style.transition = "all 1s ease";
      logo.style.opacity = "1";
      logo.style.transform = "translateY(0)";
    }, 300);
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Footer columns fade-in
  const columns = document.querySelectorAll(".column");
  columns.forEach((col, index) => {
    col.style.opacity = "0";
    col.style.transform = "translateY(30px)";
    col.style.transition = `all 0.9s ease ${index * 0.2}s`;
    observer.observe(col);
  });

  // Parallax эффект overlay text дээр
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    if (overlayText && scrolled < 800) {
      overlayText.style.transform = `translateY(${scrolled * 0.5}px)`;
      overlayText.style.opacity = 1 - scrolled / 800;
    }
  });
});

// Page load анимаци
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

const hover_sda = document.getElementById("feature_sda");
const myImg = document.getElementById("myImg");

//feature img анимаци
hover_sda.addEventListener("mouseover", () => {
  myImg.style.display = "block";
  myImg.style.display = "absolute";
});

hover_sda.addEventListener("mouseout", () => {
  myImg.style.display = "none";
});

// Menu functionality
(function () {
  console.log("Menu script loading...");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenu);
  } else {
    initMenu();
  }

  function initMenu() {
    console.log("Initializing menu...");

    const menuToggle = document.getElementById("menuToggle");
    const slideMenu = document.getElementById("slideMenu");
    const menuOverlay = document.getElementById("menuOverlay");
    const closeMenu = document.getElementById("closeMenu");

    console.log("Menu elements:", {
      menuToggle: menuToggle,
      slideMenu: slideMenu,
      menuOverlay: menuOverlay,
      closeMenu: closeMenu,
    });

    if (!menuToggle || !slideMenu || !menuOverlay || !closeMenu) {
      console.error("Menu elements not found! Check HTML.");
      return;
    }

    function toggleMenu(e) {
      if (e) e.preventDefault();
      console.log("Toggle menu clicked");
      slideMenu.classList.toggle("active");
      menuOverlay.classList.toggle("active");
    }

    window.closeMenuAndStay = function (e) {
      e.preventDefault();
      console.log("Close and stay clicked");
      toggleMenu();
    };

    window.scrollToFooter = function (e) {
      e.preventDefault();
      console.log("Scroll to footer clicked");
      toggleMenu();
      setTimeout(() => {
        const footer = document.getElementById("footer-section");
        if (footer) {
          footer.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 400);
    };

    menuToggle.addEventListener("click", toggleMenu);
    menuOverlay.addEventListener("click", toggleMenu);
    closeMenu.addEventListener("click", toggleMenu);

    console.log("Menu initialized successfully!");
  }
})();
