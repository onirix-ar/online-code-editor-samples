// Get navigator language
const language = navigator.language || navigator.userLanguage; 

if (language == 'es') {
document.getElementById("my_custom_div").innerHTML = 
        `Tu navegador esta en español`
} else {
    document.getElementById("my_custom_div").innerHTML = 
        `Your browser is in english`    
}
