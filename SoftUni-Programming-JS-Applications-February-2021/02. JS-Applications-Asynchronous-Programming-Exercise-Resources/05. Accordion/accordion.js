window.addEventListener('load', solution)
async function solution() {
    const main = document.getElementById('main')
    let getList = await list()
    Object.entries(getList).forEach(o => {
    
        let accordion = e('div', { className: 'accordion'}, 
                        e('div', { className: 'head'}, 
                        e('span', {},`${o[1].title}`), 
                        e('button', { className: 'button',id :`${o[1]._id}`},'More')
                        )
                        ,
                        e('div', { className: 'extra'}, 
                        e('p',{},`${o[1].content}`)
                        )
         
        
        
        )
       
        main.appendChild(accordion)


       
        
    })
    const btns = document.querySelectorAll('button')
       
     Array.from(btns).map((btn) =>{
         btn.addEventListener('click',()=>{
         const content  = document.getElementById(`${btn.id}`);
         content.classList.toggle("show")

         if(content.classList.value.includes("show")){
            content.parentNode.parentNode.getElementsByClassName('extra')[0].style.display = 'block';
             btn.innerText = 'LESS'
         }else{
             btn.innerText = 'MORE'
             content.parentNode.parentNode.getElementsByClassName('extra')[0].style.display = 'none';
         }
         })
     })


async function list(){
    const url = 'http://localhost:3030/jsonstore/advanced/articles/details/'
    const responce = await fetch(url)
    const data = await responce.json()
 
    return data
  
    
}





}

function e(type, attributes, ...content) {
    const result = document.createElement(type);
    
    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }
    
    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);
    
    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });
    
    return result;
    }