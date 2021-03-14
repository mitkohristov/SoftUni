function lockedProfile() {
 
  
    getAccount()
}

async function getAccount() {
    const main = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/profiles'
    const response = await fetch(url)
    const data = await response.json()
   Object.entries(data).forEach(o =>{
      let userCount = 1 
      let profile = e('div',{ className : 'profile'},
                   e('img', { src: './iconProfile2.png', className : 'userIcon'}), 
                    e('label',{},'Lock'),
                    e('input',{type: 'radio',name :`user${userCount}Locked`,value: lock,onclick:lockProfile}), 
                    e('label',{},'Unlock'),
                    e('input',{type: 'radio',name:`user${userCount}Unlocked`,value: 'unlock',onclick:unlockProfile}),
                    e('br',{}), 
                    e('hr',{}),
                    e('label',{},'Username'),
                    e('input',{type: 'text',name : `user${userCount}Username`,value :o[1].username,disabled : 'disabled',readonly :'readonly'}),
                    e('div',{id:`user${userCount}HiddenFields`},
                    e('hr',{}),
                    e('label',{},'Email:'),
                    e('input',{type:'email',name :`user${userCount}Email`,value :o[1].email,disabled:'disabled',readonly:'readonly'}),
                    e('label',{},'Age'),
                    e('input',{type: 'age',name :`user${userCount}Age`,value :o[1].age,disabled:'disabled',readonly:'readonly'})),
                    e('button',{onclick: showMore,disabled :true},'Show More'))

                    
                    
                    main.appendChild(profile);

                    userCount++
                       
   }
   )
   
}

function showMore(e){ 
    if(e.target.parentNode.getElementsByTagName('div')[0].style.display === 'block'){
        e.target.parentNode.getElementsByTagName('div')[0].style.display = 'none'
    }else {
        e.target.parentNode.getElementsByTagName('div')[0].style.display = 'block'
    }


}

function lockProfile(e){
    e.target.parentNode.getElementsByTagName('button')[0].disabled = true
}
function unlockProfile(e){
    e.target.parentNode.getElementsByTagName('button')[0].disabled = false
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