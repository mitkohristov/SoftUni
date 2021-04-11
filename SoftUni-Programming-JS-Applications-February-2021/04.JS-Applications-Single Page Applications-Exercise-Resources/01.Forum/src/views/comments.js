async function postDetails(id) {
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + id);
    const data = await response.json();
    return data
}

function createCommentsPreview(comment) {
    const div = document.createElement('div');
    div.classList.add('comment')

    div.innerHTML = `<div class="header">
                    <img src="./static/profile.png" alt="avatar">
                    <p><span>${comment.username}</span> posted on <time>2020-10-10 12:08:28</time></p>
            
                    <p class="post-content">${comment.text}</p>
                </div>
            </div>`

    return div

}

const userComments = `
<div class="answer-comment">
                <p><span>currentUser</span> comment:</p>
                <div class="answer">
                    <form>
                        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                        <div>
                            <label for="username">Username <span class="red">*</span></label>
                            <input type="text" name="username" id="username">
                        </div>
                        <button>Post</button>
                    </form>
                </div>
            </div>`

let main;
let section;


export function setupCommentsSection(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

}



export async function showCommentsSection(id) {
    main.innerHTML = '';
    main.appendChild(section);
    const result = await postDetails(id)
    const res = createCommentsPreview(result)
    main.appendChild(res);
    
}

