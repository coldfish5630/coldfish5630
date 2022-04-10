const submitButton = document.querySelector('#submitButton')
const form = document.querySelector('#form')
submitButton.addEventListener('click', function onSubmitButtonClicked (event) {
  form.classList.add('was-validated')
})
