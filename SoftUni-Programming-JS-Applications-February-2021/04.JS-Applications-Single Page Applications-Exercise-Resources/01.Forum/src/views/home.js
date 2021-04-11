// import {e}  from '../dom.js'
//  import {showCommentsSection} from '../../src/views/comments.js'

async function getTopic(){

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
    const topics = await response.json()

    return topics
  
  
  }
  


export async function postTopic (d){
    const options = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d)
    }
  const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts',options)
  const data = await response.json()
  
  if(!response.ok){
     alert(data.message)
     throw new Error(data.message)
  }else {
    
  }

      
}

function createPreview(t){
  const div = document.createElement('div')
  div.classList.add('topic-container')
  div.innerHTML  =  '<div class="topic-name-wrapper">' +
  '<div class="topic-name">' +
      `<a href="javascript:void(0)"  class="normal">` +
          `<h2 id=${t._id}>${t.title}</h2>` +
      '</a>' +
      '<div class="columns">'+
          '<div>'+
              '<p>Date: <time>2020-10-10T12:08:28.451Z</time></p>'+
              '<div class="nick-name">' +
                  `<p>Username: <span>${t.username}</span></p>` +
              '</div>'+
          '</div>' +


      '</div>' +
  '</div>' +
'</div>' 


return div
}

  
    



let main ;
let section;
let topic


export function setupHome(mainTarget,sectionTarget,topicTarget){

    main = mainTarget;
    section = sectionTarget;
    topic = topicTarget;
}

export async function showHome(){
  main.innerHTML = '';
  main.appendChild(section);
  topic.innerHTML = ''

    const topics = await getTopic()
    const res =  Object.values(topics).map(createPreview)
    const fragment =document.createDocumentFragment()
     res.forEach((r) => {
        fragment.appendChild(r)
     })
     topic.appendChild(fragment)


 
    

}


