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
    const errors = []
    for (const error in res) {
      errors.push(res[error].message)
    }

    alert(errors)
  }
})
