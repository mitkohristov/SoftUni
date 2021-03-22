function main(){
const submitForm = document.forms[0]
submitForm.addEventListener('submit',e=> {
e.preventDefault()

const formData = new FormData(submitForm)

const firstName = formData.get('firstName')
const lastName = formData.get('lastName')
const facultyNumber = formData.get('facultyNumber')
const grade = formData.get('grade')

 submitData(firstName, lastName,facultyNumber,grade)
getData()
})

getData()

}

main()


async function getData(){
    const tbody =document.querySelector('table > tbody')
    tbody.innerHTML = ''
 const options ={
      method:'get',
      headers:{'Content-Type':'application/json'}
}

const responce = await fetch('http://localhost:3030/jsonstore/collections/students',options)
const data = await responce.json()
Object.values(data).forEach(o =>{
 const result =    e('tr',{}, 
    e('td',{},`${o.firstName}`),
    e('td',{},`${o.lastName}`),
    e('td',{}, `${o.facultyNumber}`),
    e('td',{},`${o.grade}`)
    
    )

    tbody.appendChild(result)

})

}

async function submitData(firstName,lastName,facultyNumber,grade){
  const options ={
      method:'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({firstName,lastName,facultyNumber,grade})
    }
 const responce = await fetch('http://localhost:3030/jsonstore/collections/students',options)
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