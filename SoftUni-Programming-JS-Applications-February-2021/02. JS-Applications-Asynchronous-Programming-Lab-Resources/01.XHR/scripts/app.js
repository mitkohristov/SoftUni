function loadRepos() {
  
    const repos = document.getElementById('res')
    const url = `https://api.github.com/users/testnakov/repos`

    fetch(url)
    .then(response =>response.text())
    .then(data => {
        
    
        repos.textContent = data

    })


    

}