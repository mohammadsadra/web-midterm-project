var typingTimer;                //timer identifier
var doneTypingInterval = 3000;  //time in ms, 5 second for example


//user is "finished typing," do something
const getPrediction = async () => {
    const nameInput = document.getElementById('name_textbox').value;
    console.log(nameInput.length);
    if (nameInput.length > 255) {
        showError('More than 255 char :(')
        return;
    }
    let person = {name: "", gender: "", probability: 0, count: 0};
    const response = await fetch('https://api.genderize.io/?name=' + nameInput);
    await response.json().then(data => {
        person.count = data['count'];
        person.name = data['name'];
        person.gender = data['gender'];
        person.probability = data['probability'];
    });

    document.getElementById("response-gender").innerHTML = person.gender;
    document.getElementById("response-probability").innerHTML = person.probability;
}

// show error in 1.5s 
function showError(message) {
    document.getElementById('error').innerHTML = message;
    document.getElementById('error').style.visibility = 'visible';
    window.setTimeout(() => {
        document.getElementById('error').style.visibility = 'hidden';
        document.getElementById('error').innerHTML = '';
    }, 2000);
  }