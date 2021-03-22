function loadCommits() {
    const username = document.getElementById('username').value
    const repo = document.getElementById('repo').value

    const url = `https://api.github.com/repos/${username}/${repo}/commits`

    fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error(response.status)
            }
            return response.json()
           
        })
        .then(data => {
            const ulCommits = document.getElementById('commits')
            ulCommits.innerHTML = ''
            data.forEach(el => {
                const liElement = document.createElement('li')
                liElement.textContent = `${el.commit.author.name}: ${el.commit.message}`
                ulCommits.appendChild(liElement)

            });
 
        })
        .catch(error => {
            const ulCommits = document.getElementById('commits')
            ulCommits.innerHTML = ''
            const liElement = document.createElement('li')
            liElement.textContent = `Error:${error.message} (Not Found)"`
            ulCommits.appendChild(liElement)

        })



}