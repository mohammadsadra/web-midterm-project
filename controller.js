// obj that will get from server
let person = {name: "", gender: "", probability: 0, count: 0};


// send api to the server and fill blanks part
const getPrediction = async () => {
    makeEmptyInputs();
    const nameInput = document.getElementById('name_textbox').value;
    if (nameInput.length > 255) {
        showError('More than 255 char :(');
        return;
    } else if (!/^[A-Za-z\s]*$/.test(nameInput)) {
        showError('Enter valid input :(');
        return;
    }

    
    const response = await fetch('https://api.genderize.io/?name=' + nameInput);
    await response.json().then(data => {
        console.log(data);
        person.count = data['count'];
        person.name = data['name'];
        person.gender = data['gender'];
        person.probability = data['probability'];
    });

    if (person.gender == null) {
        showError('\"' + person.name + '\" Not found :(');
        return;
    }

    const localAns = localStorage.getItem(nameInput);
    if (localAns != null) {
        document.getElementById('saved-ans').innerHTML = localAns;
    }

    if (person.gender != null) {
        document.getElementById(person.gender.toLowerCase()).checked = true;
    }
    document.getElementById("response-gender").innerHTML = person.gender;
    document.getElementById("response-probability").innerHTML = person.probability;
}

// save item to local storage
function save() {
    const nameInput = document.getElementById('name_textbox').value;
    if (nameInput.length > 255) {
        showError('More than 255 char :(');
        return;
    } else if (!/^[A-Za-z\s]*$/.test(nameInput)) {
        showError('Enter valid input :(');
        return;
    }

    if (document.querySelector('input[name="gender"]:checked') == null) {
            showError('Select gender please!');
            return;
    }
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

// show error in 2s 
function showError(message) {
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
