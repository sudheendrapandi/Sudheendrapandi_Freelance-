// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// FAQ toggle removed — FAQ section no longer exists on the page

// ---- Lead form submission to Google Apps Script ----
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzbnZjm-CjLlzE5SJRAhUCMxbw0rcxHYWycJ4D9rE1TpKFsO95ma5owea1Pl8JR5k75vw/exec";

const leadForm = document.getElementById('leadForm');
const submitBtn = document.getElementById('submitBtn');
const formMsg = document.getElementById('formMsg');

function showSuccess(){
  formMsg.textContent = "Thanks! Your details have been received. I'll reach out soon.";
  formMsg.className = "form-msg success";
  submitBtn.disabled = false;
  submitBtn.textContent = "Start My Growth Journey";
  leadForm.reset();
}

function showError(){
  formMsg.textContent = "Something went wrong. Please try again or contact me directly.";
  formMsg.className = "form-msg error";
  submitBtn.disabled = false;
  submitBtn.textContent = "Start My Growth Journey";
}

leadForm.addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const businessName = document.getElementById('businessName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  formMsg.textContent = "";
  formMsg.className = "form-msg";

  const params = new URLSearchParams({ name, businessName, email, phone });
  const url = SCRIPT_URL + "?" + params.toString();

  fetch(url, { method: "GET", mode: "no-cors" })
    .then(() => showSuccess())
    .catch(() => showError());
});
