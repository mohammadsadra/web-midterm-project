// obj that will get from server
let person = {name: "", gender: "", probability: 0, count: 0};


// send api to the server and fill blanks part
const getPrediction = async () => {
    makeEmptyInputs();
    const nameInput = document.getElementById('name_textbox').value;
    if (nameInput.length > 255) {
        showMessage('More than 255 char :(', 'error');
        return;
    } else if (!/^[A-Za-z\s]*$/.test(nameInput)) {
        showMessage('Enter valid input :(', 'error');
        return;
    }

    
    let res;
    await fetch('https://api.genderize.io/?name=' + nameInput).then(r => res = r).catch(e=>{
        showMessage('Something went wrong(API!) :(', 'error')
        return;
    });
    await res.json().then(data => {
        console.log(data);
        person.count = data['count'];
        person.name = data['name'];
        person.gender = data['gender'];
        person.probability = data['probability'];
    });

    if (person.gender == null) {
        showMessage('\"' + person.name + '\" Not found :(');
        return;
    }

    const localAns = localStorage.getItem(nameInput);
    if (localAns != null) {
        document.getElementById('saved-ans').innerHTML = localAns;
    }

    if (person.gender != null) {
        document.getElementById(person.gender.toLowerCase()).checked = true;
    }
    showMessage('successful :)');
    document.getElementById("response-gender").innerHTML = person.gender;
    document.getElementById("response-probability").innerHTML = person.probability;
}

// save item to local storage
function save() {
    const nameInput = document.getElementById('name_textbox').value;
    if (nameInput.length > 255) {
        showMessage('More than 255 char :(', 'error');
        return;
    } else if (!/^[A-Za-z\s]*$/.test(nameInput)) {
        showMessage('Enter valid input :(', 'error');
        return;
    }

    if (document.querySelector('input[name="gender"]:checked') == null) {
            showMessage('Select gender please!', 'error');
            return;
    }
    showMessage('successfully added :)');
    localStorage.setItem(nameInput, document.querySelector('input[name="gender"]:checked').value);
    makeEmptyInputs();
}

// remove item from localstorage
function remove() {
    const nameInput = document.getElementById('name_textbox').value;
    if (nameInput != null && localStorage.getItem(nameInput) != null) {
        localStorage.removeItem(nameInput);
    }
}

// show error or success in 2s 
function showMessage(message, type) {

    if (type == 'error') {
        document.getElementById("error").classList.remove('success-message-container');
        document.getElementById("error").classList.add('error-message-container');
    }
    else{
        document.getElementById("error").classList.remove('error-message-container');
        document.getElementById("error").classList.add('success-message-container');
    }
    document.getElementById('error').innerHTML = message;
    document.getElementById('error').style.visibility = 'visible';
    window.setTimeout(() => {
        document.getElementById('error').style.visibility = 'hidden';
        document.getElementById('error').innerHTML = '';
    }, 2000);
}

// make show inputs ('----') ecept input name emptyy
function makeEmptyInputs() {
    document.getElementById("response-gender").innerHTML = '----';
    document.getElementById("response-probability").innerHTML = '----';
    document.getElementById('saved-ans').innerHTML = '----';
}
