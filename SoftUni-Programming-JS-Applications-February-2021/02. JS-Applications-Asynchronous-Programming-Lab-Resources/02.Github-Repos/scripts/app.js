function loadRepos() {
	const username = document.getElementById('username').value
	const url = `https://api.github.com/users/${username}/repos`


	 fetch(url)
	 .then(response =>response.json())
	 .then(data => {
		 console.log(data)
        const ulElement = document.getElementById('repos');
		ulElement.innerHTML = ''
         data.forEach(element => {
			const liElement = document.createElement('li')
			const aElement = document.createElement('a')
			aElement.innerHTML = `https://github.com/${element.full_name}`
			let adress = `https://github.com/${element.full_name}`
			aElement.setAttribute('title',`${element.full_name}`) 
			aElement.setAttribute('href',adress) 
			aElement.setAttribute('target',"_blank") 

			liElement.appendChild(aElement)
			 ulElement.appendChild(liElement)

			


		 });
		 

	 });
	 
	 
	

	

}