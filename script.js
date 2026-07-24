const steps      = document.querySelectorAll(".step");
const stepDots   = document.querySelectorAll(".step-dot");
const progressFill = document.getElementById("progressFill");
const prevBtn    = document.getElementById("prevBtn");
const nextBtn    = document.getElementById("nextBtn");
const submitBtn  = document.getElementById("submitBtn");
const form       = document.getElementById("multiStepForm");
const summaryBox = document.getElementById("summaryBox");
const submitNote = document.getElementById("submitNote");
const autosaveNote = document.getElementById("autosaveNote");

const TOTAL_STEPS = steps.length;
const STORAGE_KEY = "multiStepFormData";

let currentStep = 1;
const stepFields = {
  1: ["fullName", "email"],
  2: ["phone", "address"],
  3: ["username", "password"],
  4: [] 
};
function validateField(id) {
  const input = document.getElementById(id);
  const errorEl = document.getElementById("err-" + id);
  const value = input.value.trim();

  let message = "";

  if (!value) {
    message = "This field is required.";
  } else if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    message = "Please enter a valid email address.";
  } else if (id === "phone" && !/^\+?[0-9\s-]{7,15}$/.test(value)) {
    message = "Please enter a valid phone number.";
  } else if (id === "password" && value.length < 6) {
    message = "Password must be at least 6 characters.";
  }

  errorEl.textContent = message;
  input.classList.toggle("invalid", Boolean(message));

  return message === "";
}

function validateStep(step) {
  const fields = stepFields[step];
  let allValid = true;

  fields.forEach((id) => {
    const valid = validateField(id);
    if (!valid) allValid = false;
  });

  return allValid;
}
function showStep(step) {
  steps.forEach((el) => {
    el.classList.toggle("active", Number(el.dataset.step) === step);
  });

  stepDots.forEach((dot) => {
    const dotStep = Number(dot.dataset.step);
    dot.classList.toggle("active", dotStep === step);
    dot.classList.toggle("done", dotStep < step);
  });

  const progressPercent = (step / TOTAL_STEPS) * 100;
  progressFill.style.width = progressPercent + "%";

  prevBtn.disabled = step === 1;

  if (step === TOTAL_STEPS) {
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
    renderSummary();
  } else {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
}

function goNext() {
  if (!validateStep(currentStep)) return;
  if (currentStep < TOTAL_STEPS) {
    currentStep++;
    showStep(currentStep);
  }
}

function goPrev() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}
function renderSummary() {
  const data = getFormData();
  summaryBox.innerHTML = `
    <div><strong>Full Name:</strong> ${escapeHTML(data.fullName)}</div>
    <div><strong>Email:</strong> ${escapeHTML(data.email)}</div>
    <div><strong>Phone:</strong> ${escapeHTML(data.phone)}</div>
    <div><strong>Address:</strong> ${escapeHTML(data.address)}</div>
    <div><strong>Username:</strong> ${escapeHTML(data.username)}</div>
    <div><strong>Password:</strong> ${"•".repeat(data.password.length)}</div>
  `;
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
function getFormData() {
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => { data[key] = value; });
  return data;
}

function fillFormData(data) {
  Object.keys(data).forEach((key) => {
    const input = document.getElementById(key);
    if (input) input.value = data[key];
  });
}
function autosave() {
  const data = getFormData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  autosaveNote.textContent = "Progress saved automatically ✓";
  clearTimeout(autosave.timeoutId);
  autosave.timeoutId = setTimeout(() => {
    autosaveNote.textContent = "";
  }, 1500);
}

function restoreAutosave() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const data = JSON.parse(saved);
      fillFormData(data);
    } catch (err) {
      console.warn("Could not restore saved form data:", err);
    }
  }
}

function clearAutosave() {
  localStorage.removeItem(STORAGE_KEY);
}
nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);

submitBtn.addEventListener("click", () => {
  submitNote.textContent = "✅ Form submitted successfully! (This is a demo — no data was actually sent anywhere.)";
  clearAutosave();
  submitBtn.disabled = true;
});

form.addEventListener("input", autosave);
window.addEventListener("DOMContentLoaded", () => {
  restoreAutosave();
  showStep(currentStep);
});