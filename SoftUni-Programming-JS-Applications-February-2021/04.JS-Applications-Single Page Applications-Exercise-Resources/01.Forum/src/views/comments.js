

let main ;
let section;


export function setupCommentsSection(mainTarget,sectionTarget){

    main = mainTarget;
    section = sectionTarget;
  
}



export async function showCommentsSection(id){
  main.innerHTML = '';
  main.appendChild(section);


    /*
     <div class="comment">
                <div class="header">
                    <img src="./static/profile.png" alt="avatar">
                    <p><span>David</span> posted on <time>2020-10-10 12:08:28</time></p>
            
                    <p class="post-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure facere sint
                        dolorem quam,
                        accusantium ipsa veniam laudantium inventore aut, tenetur quibusdam doloribus. Incidunt odio
                        nostrum facilis ipsum dolorem deserunt illum?</p>
                </div>
            </div>
            */


 
    

}

