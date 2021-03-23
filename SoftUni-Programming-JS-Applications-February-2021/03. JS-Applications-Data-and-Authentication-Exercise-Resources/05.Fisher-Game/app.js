function attachEvents() {
    const divCatches = document.getElementById('catches')
    divCatches.innerHTML = ''
    document.querySelector('.load').addEventListener('click', () => {
        getAllCatches()
    })

    window.addEventListener('load', () => {
        //getAllCatches()
        if (sessionStorage.getItem('authToken') !== null) {
            document.getElementById('guest').style.display = 'none'
            document.querySelector('.add').disabled = false

        }
    })
    document.getElementById('logout').addEventListener('click', () => {
        if (sessionStorage.getItem('authToken') != null) {
            sessionStorage.removeItem('authToken')
            location.reload()


        }
    })
    if (sessionStorage.getItem('authToken') !== null) {
        document.getElementById('logout').style.display = 'inline-block'
    } else {
        document.getElementById('logout').style.display = 'none'

    }


    const addCatches = document.getElementById('addForm')
    addCatches.addEventListener('submit', (ev) => {
        ev.preventDefault()
        const formData = new FormData(addCatches)
        const angler = formData.get('angler')
        const weight = formData.get('weight')
        const species = formData.get('species')
        const location = formData.get('location')
        const bait = formData.get('bait')
        const captureTime = formData.get('captureTime')
        if (angler == '' || weight == '' || species == '' || location == '' || bait == '' || captureTime == '') {
            return alert('All fields are required')
        }
        submitData({ angler, weight, species, location, bait, captureTime })
        getAllCatches()
    })

    window.addEventListener('click', (ev) => {
       
        if (ev.target.className == 'delete') {
            deleteCatch(ev.target.id)
        } else if (ev.target.className == 'update') {
            const [...nodeList1] = ev.target.parentNode.parentNode.childNodes
           nodeList1.forEach(n =>{
              if(ev.target.id === n.id){
                  
                const angler      = n.childNodes[1].value
                const weight      = n.childNodes[4].value
                const species     = n.childNodes[7].value
                const location    = n.childNodes[10].value
                const bait        = n.childNodes[13].value
                const captureTime = n.childNodes[16].value
                  editCatch(ev.target.id,{angler,weight,species,location,bait,captureTime})
                 
              }
           })
        }
    })


}

attachEvents();


async function getAllCatches() {
    const divCatches = document.getElementById('catches')
    divCatches.innerHTML = ''
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch('http://localhost:3030/data/catches', options)
    const data = await response.json()

    Object.values(data).forEach(o => {

        const result = e('div', { className: 'catch', id: o._id },
            e('label', {}, 'Angler'),
            e('input', { type: 'text', className: 'angler', value: o.angler }),
            e('hr', {}),
            e('label', {}, 'Weight'),
            e('input', { type: 'number', className: 'weight', value: o.weight }),
            ('hr'),
            e('label', {}, 'Species'),
            e('input', { type: 'text', className: 'species', value: o.species }),
            e('hr', {}),
            e('label', {}, 'Location'),
            e('input', { type: 'text', className: 'location', value: o.location }),
            e('hr'),
            e('label', {}, 'Bait'),
            e('input', { type: 'text', className: 'bait', value: o.bait }),
            e('hr'),
            e('label', {}, 'Capture Time'),
            e('input', { type: 'number', className: 'captureTime', value: o.captureTime }),
            e('hr'),
            e('button', { className: 'update', id: o._id }, 'Update'),
            e('button', { className: 'delete', id: o._id }, 'Delete')

        )

        divCatches.appendChild(result)
    })

}





async function submitData(d) {
    const options = {
        method: 'post',
        headers: {},
        body: JSON.stringify(d)
    }
    const token = sessionStorage.getItem('authToken')
    if (token == null) {
        return alert('You need to register/login')
    } else if (token !== null) {
        options.headers['X-Authorization'] = token
    }

    const response = await fetch('http://localhost:3030/data/catches', options)
    const data = await response.json()
    if (response.ok) {
        alert('Success')
    } else if (data.message == "Invalid access token") {
        sessionStorage.removeItem('authToken')
        window.location.pathname = '/login.html'
        location.reload()
    } else {

        return alert(data.message)
    }


}


async function deleteCatch(id) {
    const options = {
        method: 'delete',
        headers: {},
    }

    if (sessionStorage.getItem('authToken') !== null) {
        options.headers['X-Authorization'] = sessionStorage.getItem('authToken')
    }
    const response = await fetch('http://localhost:3030/data/catches/' + id, options)
    const data = await response.json()
    if (response.ok) {
        alert('Deleted')
        getAllCatches()
    } else if (!response.ok || response.statusText == 'Forbidden') {

        alert(`${data.message} You dont have permissions`)
    }

}

async function editCatch(id, d) {

    const options = {
        method: 'PUT',
        headers: {},
        body: JSON.stringify(d)
    }
    if(sessionStorage.getItem('authToken') !== null) {
        options.headers['X-Authorization'] = sessionStorage.getItem('authToken')
    }

    const response = await fetch('http://localhost:3030/data/catches/' + id, options)
    const data = await response.json()

    if(response.status == 200) {
       alert("Updated")
    }else if(!response.ok){
        alert(response.statusText)
    }


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