const loginForm = document.getElementById('login')
loginForm.addEventListener('submit', ev =>{
  ev.preventDefault()
  const formData = new FormData(loginForm)
  const email = formData.get('email')
  const password = formData.get('password')
   if(email == '' || password == ''){
         return alert('All fields are required')
   }
  
   login(email, password)
})

async function login(email, password){
      const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body : JSON.stringify({email,password})
      }

const response = await fetch('http://localhost:3030/users/login',options)
const data = await response.json()
const token = data.accessToken
  if(response.ok){
    sessionStorage.setItem('authToken',token)
     alert('Success')
     window.location.pathname = '/index.html'
  }else if(!response.ok){
       return alert(data.message)
  }
 
    
}