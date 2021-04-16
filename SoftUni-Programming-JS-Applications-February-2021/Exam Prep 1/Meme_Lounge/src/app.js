import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js';


import {logout as apiLogout } from './api/data.js'
import {homePage}  from './views/home.js'
import {loginPage} from './views/login.js'
import {registerPage} from './views/register.js'
import {catalogPage} from './views/catalog.js'
import {createMemePage} from './views/create.js'
import {detailsPage} from './views/details.js'
import {editPage} from './views/edit.js'

const main = document.querySelector('main')
setUserNav()
document.getElementById('logoutBtn').addEventListener('click',logout)



page('/',decorateContext,guestUsersOnly,homePage);
page('/login',decorateContext,loginPage);
page('/register',decorateContext,registerPage);
page('/catalog',decorateContext,catalogPage);
page('/create',decorateContext,createMemePage);
page('/details/:id',decorateContext,detailsPage);
page('/edit/:id',decorateContext,editPage);

page.start();


function guestUsersOnly(ctx,next) {
  const token = sessionStorage.getItem('authToken')
  if(token !== null) {
     return ctx.page.redirect('/catalog')

  }
  next()
}

function decorateContext(ctx,next){
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav 
   
     next();
}


function setUserNav(){

const email = sessionStorage.getItem('email');

if(email !== null){
    document.querySelector('div.profile > span').textContent =`Welcome, ${email}`
  document.querySelector('.user').style.display = '';
  document.querySelector('.guest').style.display = 'none';


}else {

    document.querySelector('.user').style.display = 'none';
    document.querySelector('.guest').style.display = '';
}
}

async function logout(){
    await apiLogout()
    setUserNav()
    page.redirect('/');

}
