const form = document.body.querySelector('form')

form.addEventListener('submit', async e => {
  e.preventDefault()
  const formData = Object.fromEntries(new FormData(form))

  const url = '/user/authenticate'

  const reqConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  }

  const res = await fetch(url, reqConfig)

  if (res.status === 200) {
    window.location.href = '/'
  } else {
    alert('Invalid username or password!')
  }
})
