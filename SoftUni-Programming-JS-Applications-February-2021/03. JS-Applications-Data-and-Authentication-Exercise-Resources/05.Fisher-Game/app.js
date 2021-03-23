function attachEvents() {


    window.addEventListener('load',() =>{
        if(sessionStorage.getItem('authToken') !== null){
            document.getElementById('guest').style.display ='none'
    
        }
    })
    document.getElementById('logout').addEventListener('click',() =>{
        if(sessionStorage.getItem('authToken')!= null){
            sessionStorage.removeItem('authToken')
            location.reload()
            
            
        }
    })
    if(sessionStorage.getItem('authToken')!== null ){
        document.getElementById('logout').style.display ='inline-block'
    }else {
        document.getElementById('logout').style.display ='none'
        
    }
  




    getAllCatches()
}

attachEvents();


async function getAllCatches(){
    const divCatches = document.getElementById('catches').innerHTML = ''
  const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  }
const response = await fetch('http://localhost:3030/data/catches',options)
const data = await response.json()
  
}



function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}