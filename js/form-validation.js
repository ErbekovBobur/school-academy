class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (this.form) this.init();
  }

  init() {
    this.setMinDate();
    this.addValidation();
    this.initPhoneMask();
  }

  setMinDate() {
    const dateInput = this.form.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
    }
  }

  initPhoneMask() {
    const phoneInput = this.form.querySelector('input[type="tel"]');
    if (phoneInput) {
      phoneInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.startsWith("998")) value = value.slice(3);
        const match = value.match(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);
        if (match) {
          e.target.value = `+998${match[1] ? " (" + match[1] : ""}${match[2] ? ") " + match[2] : ""}${
            match[3] ? "-" + match[3] : ""
          }${match[4] ? "-" + match[4] : ""}`;
        }
      });
    }
  }

  addValidation() {
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        await this.submitForm();
      }
    });
  }

  validateForm() {
    let isValid = true;
    this.form.querySelectorAll("[required]").forEach((field) => {
      field.classList.remove("error");
      const errorMessage = field.nextElementSibling?.classList.contains("error-message")
        ? field.nextElementSibling
        : null;
      if (errorMessage) errorMessage.remove();

      if (!field.value.trim()) {
        field.classList.add("error");
        this.showError(field, "required-error");
        isValid = false;
      } else if (field.type === "email" && !this.validateEmail(field.value)) {
        field.classList.add("error");
        this.showError(field, "email-error");
        isValid = false;
      }
    });
    return isValid;
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showError(field, messageKey) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.setAttribute("data-translate", messageKey);
    field.parentNode.insertBefore(errorElement, field.nextSibling);
    // Update translation dynamically
    const lang = localStorage.getItem("selectedLang") || "ru";
    errorElement.textContent = translations[messageKey]?.[lang] || "Ошибка";
  }

  async submitForm() {
    const formData = new FormData(this.form);
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Отправка...";

      const response = await fetch(this.form.action, {
        method: "POST",
        body: formData,
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      const data = await response.json();

      if (data.success) {
        this.showSuccessMessage();
        this.form.reset();
      } else {
        alert(`Ошибка: ${data.message}`);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка соединения");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  showSuccessMessage() {
    const successMsg = document.createElement("div");
    successMsg.className = "success-message";
    successMsg.setAttribute("data-translate", "form-success");
    this.form.parentNode.insertBefore(successMsg, this.form.nextSibling);
    setTimeout(() => {
      successMsg.classList.add("fade-out");
      setTimeout(() => successMsg.remove(), 500);
    }, 3000);
  }
}

const translations = {
  "required-error": { ru: "Это поле обязательно", uz: "Bu maydon majburiy" },
  "email-error": { ru: "Введите корректный email", uz: "To'g'ri email kiriting" },
  "form-success": {
    ru: "Спасибо! Мы свяжемся с вами в ближайшее время.",
    uz: "Rahmat! Tez orada siz bilan bog'lanamiz.",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  new FormValidator("schoolTourForm");
});
