const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log('Count is updated' + count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked')
//     socket.emit('increment')
// })

socket.on('message', (data) => {
    console.log(data)
})

document.querySelector('#msg_form').addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('Clicked')
    //const data = document.querySelector('#message').value
    const data = e.target.elements.message.value
    socket.emit('sendMessage', data)
})