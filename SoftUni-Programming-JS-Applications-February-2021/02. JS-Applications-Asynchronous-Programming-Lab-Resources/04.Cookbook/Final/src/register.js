const signUpForm = document.getElementById('register')
signUpForm.addEventListener('submit',ev =>{
    ev.preventDefault()
    const formData = new FormData(signUpForm)
    const email = formData.get('email')
    const password = formData.get('password')
    const repass = formData.get('rePass')
    if(email =='' || password == '' || repass == ''){
        return alert('All fields are required')
    }
    register(email,password)
})

async function register(email,password) {
  const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email,password})
  }


  const response = await fetch('http://localhost:3030/users/register',options)
  const data = await response.json()
const token = data.accessToken
   if(response.ok){
     sessionStorage.setItem('authToken',token)
     window.location.pathname = '/index.html'
   }else if(!response.ok){
       return alert(data.message)
   }

}