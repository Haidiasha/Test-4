import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const FEEDBACK_FORM_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

data();

function onFormInput() {
  const formData = {
    email: emailInput.value,
    messageInput: messageInput.value,
  };

  if (formData.email === '' || formData.message === '') {
    alert('Please fill in all the fields!');
    return;
  }
  localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(formData));
}

function data() {
  const savedFormData = localStorage.getItem(FEEDBACK_FORM_KEY);
  if (savedFormData) {
    const { email, message } = JSON.parse(formElem);
    emailInput.value = email;
    messageInput.value = message;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const formData = {
    email: emailInput.value,
    messageInput: messageInput.value,
  };

  console.log(formData);
  localStorage.removeItem(FEEDBACK_FORM_KEY);
  form.reset();
}
