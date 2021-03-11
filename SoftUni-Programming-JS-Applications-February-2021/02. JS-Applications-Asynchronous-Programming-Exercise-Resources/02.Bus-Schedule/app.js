function solve() {

    const departBtn = document.getElementById('depart')
    const arriveBtn = document.getElementById('arrive')
    const info = document.getElementById('info').getElementsByClassName('info')


    depot = {
        name: '',
        next: "depot"

    }

    async function depart() {
      
        const id = depot.next
        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + id
        const response = await fetch(url)
        const data = await response.json()
        console.log(depot)
       
            depot.name=  data.name
            depot.next = data.next
        
            console.log(depot)
        info[0].textContent = `Next stop ${depot.name}`
      
        departBtn.disabled = true
        arriveBtn.disabled = false

    }

     async function arrive() {
        info[0].textContent = `Arriving at ${depot.name}`
        const id = depot.next
        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + id
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        
            depot.name = data.name
            depot.next =  data.next
        
       
   console.log(depot)
        
        arriveBtn.disabled = true
        departBtn.disabled = false
        
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
