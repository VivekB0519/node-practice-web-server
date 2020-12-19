console.log('Cl ient side')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messagetwo = document.querySelector('#message-two')
weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value
    //console.log(location)
    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messagetwo.textContent = data.forecast
            }
            
        })
    })
})