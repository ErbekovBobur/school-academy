document.addEventListener("DOMContentLoaded", () => {
  // Calendar Validation
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.addEventListener("input", () => {
      const selectedDate = new Date(dateInput.value);
      const day = selectedDate.getDay();
      if (day === 0 || day === 6) {
        dateInput.setCustomValidity("Выберите будний день");
        dateInput.reportValidity();
        dateInput.value = "";
      } else {
        dateInput.setCustomValidity("");
      }
    });
  }

  // Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");
  if (tabButtons.length && tabPanes.length) {
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        tabPanes.forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        const tabId = btn.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
      });
    });
  }
});
