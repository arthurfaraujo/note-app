const form = document.body.querySelector('form')

form.addEventListener('submit', async e => {
  const formData = Object.fromEntries(new FormData(form))

  const url = '/user/authenticate'

  const reqConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  }

  await fetch(url, reqConfig)
})
