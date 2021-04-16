import {getAllMovies} from './api.js'


function createMoviePreview(movie){
 
 const section = document.createElement('section')
 section.id = 'movie'
 section.innerHTML =`<h1 class="text-center">Movies</h1><section id="add-movie-button">
 <a href="#" class="btn btn-warning ">Add Movie</a>
</section>
 <div class="mt-3">
                <div class="row d-flex d-wrap">
    
                    <div class="card-deck d-flex justify-content-center">
    
                       
                           ${movie.map(m =>{
                            return `<div class="card mb-4">
                            <img class="card-img-top" src="${m.img}"
                                 alt="Card image cap" width="400">
                            <div class="card-body">
                                <h4 class="card-title">${m.title}</h4>
                            </div>
                            <div class="card-footer">
                                <a href="#/details/krPgQD6SWf39bM4x00co">
                                    <button type="button" class="btn btn-info">Details</button>
                                </a>
                            </div>
    
                        </div>`

                           })}
                          
                          

                       
    
                    </div>
                </div>
            </div>
        `

     return section
                    }


let main 
let section


export function setupCatalog (mainTarget,sectionTarget){
main = mainTarget;
section = sectionTarget;

}

export async function showCatalog(){
    

   main.innerHTML = ''

   const movie = await getAllMovies()
   const result = createMoviePreview(movie)
   main.appendChild(result)

}