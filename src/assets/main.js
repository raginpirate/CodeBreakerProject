let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == '' || attempt.value == '') {
    	setHiddenFields();
    }
    if (!validateInput(input.value)) {
    	return false;
    }
    attempt.value++;
    if(getResults(input.value)) {
    	setMessage("You Win! :)");
    	showAnswer(true);
    	showReplay();
    } 
    else if (attempt.value > 9) {
    	setMessage("You Lose! :(");
    	showAnswer(false);
    	showReplay();
    } 
    else {
    	setMessage("Incorrect, try again.");
    }
}

function setHiddenFields() { 
	answer.value = Math.floor(Math.random()*9999);
	answer.value = answer.value.toString();
	while (answer.value.length < 4) {
		answer.value = '0' + answer.value;
	}
	attempt.value = 0;
}

function setMessage(param) {
	document.getElementById('message').innerHTML = param;
}

function validateInput(param) {
	if (param.length != 4) {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
	return true;
}

function getResults(param) {
	var retVal = true;
	var div_vals = '<div class="row"><span class="col-md-6">' + param + '</span><div class="col-md-6">';
	for (var x = 0; x < param.length; x++) {
		if (param.charAt(x) == answer.value.charAt(x)) {
			div_vals += '<span class="glyphicon glyphicon-ok"></span>';
		} 
		else if (answer.value.indexOf(param.charAt(x)) != -1) {
			div_vals += '<span class="glyphicon glyphicon-transfer"></span>';
			retVal = false;
		} 
		else {
			div_vals += '<span class="glyphicon glyphicon-remove"></span>';
			retVal = false;
		}
	}
	div_vals += '</div></div>'
	document.getElementById('results').innerHTML += div_vals;
	return retVal;
}

function showAnswer(param) {
	document.getElementById('code').innerHTML = answer.value;
	if (param) {
		document.getElementById('code').className += " success";
	} 
	else {
		document.getElementById('code').className += " failure";
	}
}

function showReplay() {
	document.getElementById('guessing-div').style.display = "none";
	document.getElementById('replay-div').style.display = "block";
}


//implement new functions here