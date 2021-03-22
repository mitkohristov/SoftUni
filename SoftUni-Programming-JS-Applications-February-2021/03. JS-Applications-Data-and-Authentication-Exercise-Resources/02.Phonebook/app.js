function attachEvents() {
 const loadBtn = document.getElementById('btnLoad').addEventListener('click', e=> {
 e.preventDefault()
 getData()

 })

  
}

attachEvents();

async function getData(){
    const ul = document.getElementById('phonebook')
    ul.innerHTML = ''
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }

    const response = await fetch('http://localhost:3030/jsonstore/phonebook',options)
    const data = await response.json()
   Object.values(data).forEach(o =>{
    const li = document.createElement('li')
    li.id = o._id
     li.textContent = `${o.person}: ${o.phone}`
     li.classList.add('button')

     ul.appendChild(li)
   })
}