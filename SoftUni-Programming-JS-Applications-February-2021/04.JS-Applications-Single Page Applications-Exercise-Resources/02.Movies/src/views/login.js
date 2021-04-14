import {loginUser} from '../../src/api/api.js'














let main ;
let section;






export function setupLogin(mainTarget,sectionTarget){
main = mainTarget;
section = sectionTarget;


// const form = section.querySelector('form')
// form.addEventListener('submit',(ev => {
//     ev.preventDefault();
//     console.log(ev)

//     const formData = new FormData(ev.target)
//     const email = formData.get('email')
//     const password = formData.get('password')
//     console.log(formData)
//     console.log(email, password) 
  
// }))





}

export async function showLogin(){
 
    main.innerHTML = ''
    main.appendChild(section)
    

}