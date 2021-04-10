

async function getTopic(){

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
    const topics = await response.json()

    return topics
  
  
  }
  


async function postTopic (d){
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





let main ;
let section;


export function setupHome(mainTarget,sectionTarget){

    main = mainTarget;
    section = sectionTarget;
}

export async function showHome(){

    const topics = await getTopic()
    console.log(topics)

    main.innerHTML = '';
    main.appendChild(section);

}


