
import {setupHome,showHome} from '../src/views/home.js'

const main = document.querySelector('.container > main')
const homeSection  = document.getElementById('homeSection')

setupHome(main,homeSection)
showHome()