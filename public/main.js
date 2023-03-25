(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "90%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  // var privacyPolicyButton = document.getElementById("privacy-policy-button");
  // var privacyPolicyPopup = document.getElementById("privacy-policy-popup");

  // privacyPolicyButton.onclick = function () {
  //   privacyPolicyPopup.style.display = "block";
  // };
  // var closeButton = document.getElementById("close-button");

  // closeButton.onclick = function () {
  //   privacyPolicyPopup.style.display = "none";
  // };
  // window.onclick = function (event) {
  //   if (event.target == privacyPolicyPopup) {
  //     privacyPolicyPopup.style.display = "none";
  //   }
  // };

  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");
  
  // Custom validation for the name field
  const nameInput = form.querySelector("#name");
  nameInput.pattern = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
  nameInput.addEventListener("input", (event) => {
    if (nameInput.validity.patternMismatch) {
      nameInput.setCustomValidity("Please enter a valid name");
    } else {
      nameInput.setCustomValidity("");
    }
  });
  
  // Custom validation for the email field
  const emailInput = form.querySelector("#email");
  emailInput.addEventListener("input", (event) => {
    if (emailInput.validity.typeMismatch) {
      emailInput.setCustomValidity("Please enter a valid email address");
    } else {
      emailInput.setCustomValidity("");
    }
  });
  
  // Custom validation for the message field
  const messageInput = form.querySelector("textarea[name='message']");
  messageInput.addEventListener("input", (event) => {
    if (messageInput.validity.valueMissing) {
      messageInput.setCustomValidity("Please enter a message");
    } else {
      messageInput.setCustomValidity("");
    }
  });
  
  // Combined event listener for form validation and submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();
  
    // Perform form validation
    if (!form.reportValidity()) {
      return;
    }
  
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  
    // Submit form data
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        // Show the success message and reset the form
        successMessage.style.display = "block";
        form.reset();
      } else {
        const error = await response.json();
        console.error("Error:", error.message);
        // Show an error message, if needed
      }
    } catch (error) {
      console.error("Error:", error);
      // Show an error message, if needed
    }
  });
  
})();
