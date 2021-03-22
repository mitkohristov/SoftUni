function attachEvents() {
 const loadBtn = document.getElementById('btnLoad').addEventListener('click', e=> {
 e.preventDefault()
 getData()
 })

 const createBtn = document.getElementById('btnCreate').addEventListener('click', e=> {
     e.preventDefault()
     const person = document.getElementById('person').value
     const phone = document.getElementById('phone').value
     addRecord({person,phone})
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
    const button = document.createElement('button')
    button.addEventListener('click',e =>{
        e.preventDefault()
        deleteRecord(e.target.id)
       setTimeout(() => {
        getData()
       }, 500);
    })
    button.textContent = 'Delete'
    button.id= o._id
    li.id = o._id
     li.textContent = `${o.person}: ${o.phone}`
    //  li.classList.add('button')
     li.appendChild(button)

     ul.appendChild(li)
   })
}

async function addRecord(record){
   const options = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' }, 
       body: JSON.stringify(record)
   }

   const response = await fetch('http://localhost:3030/jsonstore/phonebook',options)
   const data = await response.json()

}

async function deleteRecord(recordId){
    const options ={
        method:'delete',
        headers: { 'Content-Type': 'application/json' },

    }

    const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + recordId,options)
    const data = await response.json()



}