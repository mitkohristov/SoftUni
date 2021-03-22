function main() {
    document.getElementById("edit-form").style.display = "none";
    const submitForm = document.getElementById('form')
    submitForm.addEventListener('submit', ev => {
        ev.preventDefault()
        const formData = new FormData(submitForm)

        const title = formData.get('title')
        const author = formData.get('author')
        if (title == '' || author == '') {
            return alert('All fields are required')
        }
     
        sendData(title,author)
        getData()
    })

    const editForm = document.getElementById('edit-form')
    editForm.addEventListener('submit', ev => {
        ev.preventDefault()
        const formData = new FormData(editForm)
        const titleEdit = formData.get('titleEdit')
        const authorEdit = formData.get('authorEdit')
        updateData(titleEdit, authorEdit, ev.submitter.value)
        getData()

    })


    getData()


    document.getElementById('loadBooks').addEventListener('click', ev => {
        ev.preventDefault()
        getData()


    })



    document.body.addEventListener('click', function (event) {

        if (event.target.textContent == 'Edit') {
            document.getElementById("form").style.display = "none";
            document.getElementById("edit-form").style.display = "block";


            const promise = getDataById(event.target.id)
            promise.then(result => {
                const editTitle = document.getElementById('titleEdit')
                const editAuthor = document.getElementById('authorEdit')
                console.log(result)
                editTitle.value = result.title
                editAuthor.value = result.author
                document.getElementById('update').value = result._id

            })

        } else if (event.target.textContent == 'Delete') {
            deleteRecord(event.target.id)
            setTimeout(() => {
                getData()
            }, 300);
        }

    });


}


main()

async function updateData(title, author, id) {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
    }
    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, options)


}

async function getDataById(id) {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id,
        {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
    const data = await response.json()
    return data

}



async function getData() {
    const tbody = document.querySelector('table > tbody')
    tbody.innerHTML = ''
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch('http://localhost:3030/jsonstore/collections/books', options)
    const data = await response.json()

    Object.entries(data).forEach(o => {
        const result = e('tr', {},
            e('td', {}, o[1].author),
            e('td', {}, o[1].title),
            e('td', {},
                e('button', { id: `${o[0]}`, }, 'Edit'),
                e('button', { id: `${o[0]}` }, 'Delete')
            )
        )

        tbody.appendChild(result)



    })


}


async function sendData(title,author) {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title,author})
    }
    const responce = await fetch('http://localhost:3030/jsonstore/collections/books', options)
    const data = await responce.json()

}

async function deleteRecord(id) {
    const options = {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    }

    const responce = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, options)
    const data = await responce.json()

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
