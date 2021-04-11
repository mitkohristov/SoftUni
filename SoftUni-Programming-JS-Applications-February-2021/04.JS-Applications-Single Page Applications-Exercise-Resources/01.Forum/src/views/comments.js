async function postDetails(id) {
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + id);
    const data = await response.json();
    return data
}

async function postComment(d){
    const options ={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(d)
    }
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments',options);
    const data = await response.json();
    return data

}

async function getComments(){

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
    const data = await response.json();
    return data

}
 

 function createCommentsPreview(comment,comments) {
  
   console.log(Object.values(comments).filter(c => c.ownerId == comment._id));

    const div = document.createElement('div');
    div.classList.add('comment')

    div.innerHTML = `<div class="header">
                    <img src="./static/profile.png" alt="avatar">
                    <p><span>${comment.username}</span> posted on <time>2020-10-10 12:08:28</time></p>
            
                    <p class="post-content">${comment.text}</p>
                </div>
            </div>
            <div id="user-comment">
            
            </div>
            
            <div class="answer-comment">
            <p><span>currentUser</span> comment:</p>
            <div class="answer">
                <form id="answer-form">
                    <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                    <div>
                        <label for="username">Username <span class="red">*</span></label>
                        <input type="text" name="username" id="username">
                    </div>
                    <button id=${comment._id}>Post</button>
                </form>
            </div>
        </div>

            `

            
            
            
            


    return div

}



let main;
let section;



export function setupCommentsSection(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    
}



export async function showCommentsSection(id) {
   
 
    section.innerHTML = ''
    main.innerHTML = '';
    
    const result = await postDetails(id)
    const comments = await getComments()
    const preview = createCommentsPreview(result,comments)
    section.appendChild(preview);
    main.appendChild(section);


    
    const answerForm = document.getElementById('answer-form')
    answerForm.addEventListener('submit', (event) => {
       // console.log(event.submitter.id)
        event.preventDefault();
        const formData = new FormData(answerForm);
        const username = formData.get('username');
        const postText = formData.get('postText')
        if(username === '' || postText == ''){
           return alert('All fields are required')
        }
        const ownerId = event.submitter.id
       
        postComment({username, postText,ownerId})
    
        
         

    
    
    
    })
    
}


