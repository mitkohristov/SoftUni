function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts)
    document.getElementById('btnViewPost').addEventListener('click', getAll)
    const posts = document.getElementsById('posts')


     


}
 function getAll(){
    const postid = posts.value
    loadComments(postid)
    loadPostDetails(postid)
}
async function loadComments(postid) {
    const  commentArea = document.getElementById('post-comments')
    commentArea.innerHTML = ''
    const postComments = 'http://localhost:3030/jsonstore/blog/comments/'
    // const postDetails = 'http://localhost:3030/jsonstore/blog/posts'
    const response = await fetch(postComments)
    const data = await response.json()
     const result = Object.values(data).filter(c =>c.postId == postid)
     result.forEach(c =>{
        const liElement = document.createElement('li')
        liElement.textContent = c.text
        commentArea.appendChild(liElement)
     })
     
    
    
}
async function loadPostDetails(postid) {
    const postTitle = document.getElementById('post-title')
    const postBody = document.getElementById('post-body')
    postBody.innerHTML = ''
    postTitle.innerHTML = ''
    const url = 'http://localhost:3030/jsonstore/blog/posts/' +postid
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
     postTitle.textContent = data.title
     const liElement = document.createElement('li')
     liElement.textContent =data.body
     postBody.appendChild(liElement)
     
  
}


async function loadPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts'
    const response = await fetch(url)
    const data = await response.json()

    Object.entries(data).forEach(o => {
        const res = document.createElement('option')
        res.value = o[0]
        res.innerText = o[1].title
        posts.appendChild((res))
    })

}




attachEvents();