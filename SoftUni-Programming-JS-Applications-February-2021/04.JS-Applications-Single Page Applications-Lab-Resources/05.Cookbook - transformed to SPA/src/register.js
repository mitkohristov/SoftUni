// const form = document.querySelector('form');

// form.addEventListener('submit', (ev => {
//     ev.preventDefault();
//     const formData = new FormData(ev.target);
//     onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
// }));

async function onSubmit(data) {
    if (data.password != data.rePass) {
        return console.error('Passwords don\'t match');
    }

    const body = JSON.stringify({
        email: data.email,
        password: data.password,
    });

    try {
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
        const data = await response.json();
        if (response.status == 200) {
            sessionStorage.setItem('authToken', data.accessToken);
           onSuccess()
        } else {
            throw new Error(data.message);
        }
    } catch (err) {
        alert(err.message);
    }
}


let main 
let section 
let onSuccess
export function setupRegister(mainTarget,sectionTarget,onSuccessTarget){
 main = mainTarget
 section = sectionTarget
 onSuccess = onSuccessTarget

 const form = section.querySelector('form');

form.addEventListener('submit', (ev => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
}));

}

export function showRegister(){
    main.innerHTML = '';
    main.appendChild(section)

}