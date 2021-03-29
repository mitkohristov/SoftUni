import {setupCatalog,showCatalog} from './catalog.js'




const main = document.querySelector('main');
const catalogSection = document.getElementById('catalogSection');

setupCatalog(main,catalogSection)
showCatalog();

/*
window.addEventListener('load', async () => {
    if (sessionStorage.getItem('authToken') != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('logoutBtn').addEventListener('click', logout);
    } else {
        document.getElementById('guest').style.display = 'inline-block';
    }

   

    
});


async function logout() {
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken')
        },
    });
    if (response.status == 200) {
        sessionStorage.removeItem('authToken');
        window.location.pathname = 'index.html';
    } else {
        console.error(await response.json());
    }
}
*/
