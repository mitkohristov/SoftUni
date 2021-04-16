export async function getAllMovies(){

  const response = await fetch('http://localhost:3030/data/movies')
  const data = await response.json()
  return data

}


export async function loginUser(email,password){
    const response = await fetch('http://localhost:3030/login')

}