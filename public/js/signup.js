const form = document.body.querySelector('form')

function validateInput(inputField) {
  const input = inputField.children[1]
  const validationDiv = inputField.children[2]

  if (input.checkValidity()) {
    input.classList.add('valid')
    input.classList.remove('invalid')
    validationDiv.style.display = 'none'
  } else {
    input.classList.add('invalid')
    input.classList.remove('valid')
    validationDiv.style.display = 'block'
  }
}

form.addEventListener('submit', async e => {
  e.preventDefault()

  if (form.checkValidity()) {
    const formData = Object.fromEntries(new FormData(form))

    const url = ' /signup'

    const reqConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }

    const res = await fetch(url, reqConfig).then(res => res.json())

    if (res.created) {
      window.location.href = '/signin'
    } else if (res.errors) {
      for (const error of res.errors) {
        const capitalizedLocation =
          error.location.charAt(0).toUpperCase() + error.location.slice(1)

        const string = error.message.replace('String', capitalizedLocation)
        alert(string)
      }
    } else {
      alert('The ' + res.location + ' is already taken! Try another one.')
    }
  } else {
    const inputFields = form.querySelectorAll('.inputField')

    for (let i = 0; i < inputFields.length; i++) {
      validateInput(inputFields.item(i))

      const input = inputFields.item(i).children[1]

      input.addEventListener('input', () => validateInput(inputFields.item(i)))
    }
  }
})
