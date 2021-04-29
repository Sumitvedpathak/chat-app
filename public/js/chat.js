const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log('Count is updated' + count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked')
//     socket.emit('increment')
// })

const $msgForm = document.querySelector('#msg_form')
const $msgTemplate = document.querySelector('#msg-template')
const $messages = document.querySelector('#messages')


const messageTemplate = $msgTemplate.innerHTML


socket.on('message', (message) => {
    // console.log(message)
    const html = Mustache.render(messageTemplate,{
        message:message
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

$msgForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message)
    e.target.elements.message.value = ''
})

document.querySelector('#geoLocation').addEventListener('click', () => {
    document.querySelector('#message').setAttribute('disabled','disabled')
    if(!navigator.geolocation) {
        document.querySelector('#message').removeAttribute('disabled')
        return alert('Location not supported')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        console.log({ lat:position.coords.latitude, long:position.coords.longitude})
        socket.emit('sendLocation',{ lat:position.coords.latitude, long:position.coords.longitude})
        document.querySelector('#message').removeAttribute('disabled')
    })
})