import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const FORM_STATE_KEY = 'feedback-form-state';

populateForm();

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(FORM_STATE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  if (formData.email === '' || formData.message === '') {
    alert('Please fill in all the fields!');
    return;
  }

  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(FORM_STATE_KEY);
}

function populateForm() {
  const savedFormData = localStorage.getItem(FORM_STATE_KEY);
  if (savedFormData) {
    const { email, message } = JSON.parse(savedFormData);
    emailInput.value = email || '';
    messageInput.value = message || '';
  }
}
