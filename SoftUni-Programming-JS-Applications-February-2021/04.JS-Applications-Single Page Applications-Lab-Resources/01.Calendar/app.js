const yearSelect = document.getElementById('years')

const years = [...document.querySelectorAll('.monthCalendar')].reduce((acc,c) => {
    acc[c.id] = c
    return acc
},{})


const months = [...document.querySelectorAll('.daysCalendar')].reduce((acc,c) => {
    acc[c.id] = c
    return acc
},{})


 document.body.innerHTML = ''
document.body.appendChild(yearSelect)

yearSelect.addEventListener('click',ev => {
 if(ev.target.classList.contains('date') || ev.target.classList.contains('day')){

    console.log(ev.target)
 }

})

document.body.addEventListener('click',ev => {
  
})