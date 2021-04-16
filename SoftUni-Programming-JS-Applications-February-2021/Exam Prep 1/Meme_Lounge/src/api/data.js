import * as api from './api.js'


const host = 'http://localhost:3030'
api.settings.host = host


export const login  = api.login
export const register = api.register
export const logout = api.logout





export async  function getMemes(){

    return await api.get(host + '/data/memes?sortBy=_createdOn%20desc')
}

export async function createMeme(meme){
    return await api.post(host + '/data/memes',meme)
}

export async function getMemeById(id){
   return await api.get(host + '/data/memes/' + id)

}

export async function updateMeme(id,meme){
return await api.put(host + '/data/memes/' + id,meme)

}