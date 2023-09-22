const form = document.body.querySelector('form')

form.addEventListener('submit', async e => {
  e.preventDefault()
  const formData = Object.fromEntries(new FormData(form))

  const url = '/user/signup'

  const reqConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  }

  const res = await fetch(url, reqConfig).then(res => res.json())

  if (res.created) {
    window.location.href = '/user/signin'
  } else {
    for (const error of res.errors) {
      const capitalizedLocation = error.location.charAt(0).toUpperCase() + error.location.slice(1)

      const string = error.message.replace(
        'String',
        capitalizedLocation
      )
      alert(string)
    }
  }
})
