
import {setupHome,showHome,postTopic} from '../src/views/home.js'
import {setupCommentsSection,showCommentsSection} from '../src/views/comments.js'

const main = document.querySelector('.container > main')
const homeSection  = document.getElementById('homeSection')
 const topicSection  =document.querySelector('.topic-title')
 const commentsSection  =document.getElementById('comments')

 window.addEventListener('click', (ev) => {
   if(ev.target.tagName != 'H2'){

   }else {
    showCommentsSection(ev.target.id)
   }
})

const form = homeSection.querySelector('form')
form.addEventListener('submit',event => {
    event.preventDefault()
    const formData = new FormData(form)
    const title = formData.get('topicName')
    const username = formData.get('username')
    const text = formData.get('postText')
    if(title == '' || username == '' || text == ''){
        return alert('All fields required!')
    }
    const body ={
        title:title.trim(),
        username :username.trim(),
        text:text.trim()
    }
    postTopic(body)
    showHome()
})


setupHome(main,homeSection,topicSection)
showHome()
setupCommentsSection(main,commentsSection)
