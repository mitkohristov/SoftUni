async function getInfo() {
const id = document.getElementById('stopId').value;
buses.innerHTML = ''

try{
    const url =  'http://localhost:3030/jsonstore/bus/businfo/' + id
    const response = await fetch(url)
    if(!response.ok){
        throw new Error(response.message)
    }
    const data = await response.json()
    const stopName = document.getElementById('stopName')
    const buses= document.getElementById('buses')
    stopName.textContent = data.name
    
    
    Object.keys(data.buses).forEach(b =>{
            
        const liElement = document.createElement('li')
      liElement.textContent  =  `Bus ${b} arrives in ${data.buses[b]} minutes`
      buses.appendChild(liElement)
     
    
    })
    

}catch (err) {
    stopName.textContent = "Error"

}



}