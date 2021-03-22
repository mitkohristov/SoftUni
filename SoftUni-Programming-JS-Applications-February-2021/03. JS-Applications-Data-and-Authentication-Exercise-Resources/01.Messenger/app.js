function attachEvents() {
    const refreshBtn = document.getElementById('refresh').addEventListener('click', e =>{
        e.preventDefault()
        
         getData()
    })
    
    const sumbitBtn = document.getElementById('submit').addEventListener('click',e =>{
        e.preventDefault();
    const author = document.getElementById('author').value
    const content = document.getElementById('content').value

    sendData({author,content})
       
        getData()
    })
}

attachEvents();


async function sendData(d) {

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d)
    }
     const response = await fetch('http://localhost:3030/jsonstore/messenger',options)
     const data = await response.json()
      return await response.json()
    
    
    
    }

    async function getData(){
        const textArea = document.getElementById('messages')
        textArea.value = ''
        const options = {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
           
        }
        const responce = await fetch('http://localhost:3030/jsonstore/messenger',options)
        const data = await responce.json()
      
        Object.values(data).forEach(o =>{
            textArea.value += `${o.author}: ${o.content}\n`
        })
    }