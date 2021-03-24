const createForm = document.getElementById('create')
createForm.addEventListener('submit',ev =>{
   ev.preventDefault()
const formData = new FormData(createForm)
const name = formData.get('name')
const img = formData.get('img')
const ingredientsRaw = formData.get('ingredients')
const stepsRaw = formData.get('steps')
if(name == '' || img == '' || ingredientsRaw == '' || stepsRaw == ''){
    return alert('All fields are required')
}
const ingredients = ingredientsRaw.split('\n').map(i => i.trim())
const steps = stepsRaw.split('\n').map(s =>s.trim())

createRecipe(name,img,ingredients,steps);


})


async function createRecipe(name,img,ingredients,steps){
    const options = {
        method: 'POST',
        headers: {},
        body: JSON.stringify({name,img,ingredients,steps})
    }
    const token = sessionStorage.getItem('authToken')
    if(token == null){
        alert('You need to be logged in to create a recipe')
        window.location.pathname = '/login.html'
    }else if(token !== null){
        options.headers['X-Authorization'] = token
    }

    const response = await fetch('http://localhost:3030/data/recipes',options)
    const data = response.json()
    if(response.ok){
      alert('Recepie Submitted')

    }else if(!response.ok){
        return alert(data.message)
    }


}