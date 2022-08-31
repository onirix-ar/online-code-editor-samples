const webarContextMenu = document.getElementById('webar-context-menu');
webarContextMenu.removeChild(webarContextMenu.firstChild);

const anchorElement = document.createElement('p');
anchorElement.id = 'my-link-text'
anchorElement.innerText = 'My link text';
anchorElement.onclick = () => {
    window.location.assign("https://this.is.a.sample.com")
}
anchorElement.style.color = '#003400';
webarContextMenu.prepend(anchorElement);