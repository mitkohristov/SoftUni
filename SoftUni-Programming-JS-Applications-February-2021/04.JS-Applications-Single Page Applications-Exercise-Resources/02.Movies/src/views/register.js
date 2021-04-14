







let main ;
let section;


export function setupRegister(mainTarget,sectionTarget){
    main = mainTarget;
    section = sectionTarget;
  

    const form = section.querySelector('form')
    form.addEventListener('submit',(event => {
       // event.preventDefault();
        console.log(event)
    
        const formData = new FormData(form)
        const email = formData.get('email')
        const password = formData.get('password')
        const repeatPassword = formData.get('repeatPassword')
        
        console.log(formData)

    }))
    
    
    
    }
    
    export async function showRegister(){
     
        main.innerHTML = ''
        main.appendChild(section)
        
        
    
    }