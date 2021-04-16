import {setupCatalog, showCatalog}  from '../src/catalog.js';
import {setupLogin,showLogin} from '../src/login.js';
import {setupRegister,showRegister} from '../src/register.js';


const main = document.querySelector('main');
const movieSection = document.getElementById('movie')
const loginSection = document.getElementById('form-login')
const registerSection = document.getElementById('form-sign-up')



// const nav = [...document.querySelectorAll('#container >nav')]

window.addEventListener('click', (ev) => {
    ev.preventDefault()
   if(links.hasOwnProperty(ev.target.id)){
    const view = links[ev.target.id]
    ev.preventDefault()
     view()
   }else {

   }
})




const links = {
    'catalogLink':showCatalog,
     'loginLink' : showLogin,
     'registerLink' : showRegister
}



setupCatalog(main,movieSection);
showCatalog()
setupLogin(main,loginSection)
setupRegister(main,registerSection)
