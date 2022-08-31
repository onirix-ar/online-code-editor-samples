/* 
    Place this function inside the iframe and run it every time 
    you want to send data to its parent.
 */
function sendToParent(data) {
    const message = Object.assign({origin: 'onirix-iframe'}, JSON.stringify(data));
    window.parent.postMessage(message, '*');
}

/*
    Place this function in the iframe container to listen to the data it sends.
 */
window.addEventListener('message', (postedMessage) => {
    console.log('Message received', postedMessage);
    if (postedMessage && postedMessage.data) {
        const iframeMeesage = JSON.parse(postedMessage.data);
        if ('onirix-iframe' === iframeMeesage.origin) {
            console.log('Message from iframe', iframeMeesage);
        }
    } 
});