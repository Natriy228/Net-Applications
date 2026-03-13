window.onload = function(){
	let parkingCost = '0'
	let parkingHours = ''
	let blockerOperator = ''

	const output = document.getElementById("result")
	const digitButtons = document.querySelectorAll('[id ^= "d_button_"]')
	const blockerOperatorButtons = document.querySelectorAll('.main_op')
	const eraseButton = document.getElementById('button_clear')
	const switchButton = document.getElementById('button_sign_switch')
	const executeButton = document.getElementById('button_equal')
	const percentButton = document.getElementById('button_percent')
	const themeChange = document.getElementById('background_select')
	const backspaceButton = document.getElementById('backspace_button')
	const sqrtButton = document.getElementById('button_sqrt')
	const squareButton = document.getElementById('button_sq')
	const factButton = document.getElementById('button_fact')
	const parkingCostButton = document.getElementById('button_parkingcost')
	
	function updateDisplay(carHandler) {
		if (carHandler.length <= 14) {
			output.innerHTML = '<tr><td style = "text-align: left">' + blockerOperator + '</td><td style = "text-align: right">' + carHandler + '</td></tr>';
		}
		else {
			output.innerHTML = '<tr><td style = "text-align: left">' + blockerOperator + '</td><td style = "text-align: right">' + carHandler.slice(0, 15) + '</td></tr>';
		}
	}

	function onDigitButtonClicked(digit) {
		if (blockerOperator === '') {
			if (digit === '.' && parkingCost.includes(digit)) { return; }
			if ((digit === '0' || digit === "000") && parkingCost === '0') { return; }
			if (parkingCost === '0' && digit != '.') { parkingCost = ''; }
			parkingCost += digit;
			updateDisplay(parkingCost);
		}
		else {
			if (digit === '.' && parkingHours === '') { parkingHours += '0'; }
			if (digit === '.' && parkingHours.includes(digit)) { return; }
			if (digit === '0' && parkingHours === '0') { return; }
			parkingHours += digit;
			updateDisplay(parkingHours);
		}
	}

	digitButtons.forEach(button => {
		button.onclick = function() {
			const digitValue = button.innerHTML;
			onDigitButtonClicked(digitValue);
		}
	});
		
	blockerOperatorButtons.forEach(button => {
		button.onclick = function() {
			if (parkingCost === '') return;
			blockerOperator = button.innerHTML;
			updateDisplay(parkingHours);
		}
	});
	
	switchButton.onclick = function() {
		if (blockerOperator === '') {
			parkingCost = ((parkingCost) * (-1)).toString();
			updateDisplay(parkingCost);
		}
		else {
			parkingHours = ((parkingHours) * (-1)).toString();
			updateDisplay(parkingHours);
		}
	}
	
	executeButton.onclick = function() {
		if (blockerOperator === '' || parkingHours === '') return;
		switch (blockerOperator) {
			case '+':
				parkingCost = (parseFloat(parkingCost) + parseFloat(parkingHours)).toString();
				break;
			case '-':
				parkingCost = (parseFloat(parkingCost) - parseFloat(parkingHours)).toString();
				break;
			case '*':
				parkingCost = (parseFloat(parkingCost) * parseFloat(parkingHours)).toString();
				break;
			case '/':
				parkingCost = (parseFloat(parkingCost) / parseFloat(parkingHours)).toString();
				break;
		}
		blockerOperator = '';
		parkingHours = '';
		if (parkingCost.length > 14) { 
			parkingCost = parkingCost.slice(0, 15);
			let lastdigit = parseFloat(parkingCost[13]);
			if (parseFloat(parkingCost[14]) >= 5) lastdigit += 1;
			parkingCost = parkingCost.slice(0, 13);
			parkingCost += lastdigit.toString();
		}
		updateDisplay(parkingCost);
	}
	
	percentButton.onclick = function() {
		if (blockerOperator === '') {
			if (parkingCost === '') return;
			if (parseFloat(parkingCost) <= 1 && parseFloat(parkingCost) >= 0) parkingCost = (parseFloat(parkingCost) * 100).toString();
			updateDisplay(parkingCost);
		}
		else {
			if (parkingHours === '') return;
			if (parseFloat(parkingHours) <= 1 && parseFloat(parkingHours) >= 0) parkingHours = (parseFloat(parkingHours) * 100).toString();
			updateDisplay(parkingHours);
		}
	}
	
	themeChange.onchange = function() {
		if (themeChange.value === 'white') {
			document.getElementById("theme_link").setAttribute('href', "parking_style_white.css");
		}
		else {
			document.getElementById("theme_link").setAttribute('href', "parking_style_black.css");
		}
	}
	
	backspaceButton.addEventListener('click', function() {
		if (blockerOperator === '') {
			parkingCost = parkingCost.slice(0, parkingCost.length - 1);
			if (parkingCost === '') parkingCost = '0';
			updateDisplay(parkingCost);
		}
		else {
			if (parkingHours.length > 0) {
				parkingHours = parkingHours.slice(0, parkingHours.length - 1);
			}
			updateDisplay(parkingHours);
		}
	});
	
	sqrtButton.addEventListener('click', function() {
		if (blockerOperator === '') {
			if (parseFloat(parkingCost) >= 0) {
				parkingCost = Math.sqrt(parkingCost).toString();
			}
			else {
				console.log("Этот калькулятор не умеет работать с комплексными числами");
			}
			updateDisplay(parkingCost);
		}
		else {
			if (parseFloat(parkingHours) >= 0) {
				parkingHours = Math.sqrt(parkingHours).toString();
			}
			else {
				console.log("Этот калькулятор не умеет работать с комплексными числами");
			}
			updateDisplay(parkingHours);
		}
	});
	
	squareButton.addEventListener('click', function() {
		if (blockerOperator === '') {
			parkingCost = (parkingCost * parkingCost).toString();
			updateDisplay(parkingCost);
		}
		else {
			parkingHours = (parkingHours * parkingHours).toString();
			updateDisplay(parkingHours);
		}
	});
	
	factButton.addEventListener('click', function() {
		if (blockerOperator === '') {
			let buf = Math.trunc(parseFloat(parkingCost));
			if (buf == 0) parkingCost = '1';
			if (buf > 25) {
				console.log("Слишком большое число для факториала");
			}
			else if (buf > 0) {
				parkingCost = buf;
				for (let i = buf - 1; i > 0; i--) {
					parkingCost *= i;
				}
			}
			parkingCost = parkingCost.toString();
			updateDisplay(parkingCost);
		}
		else {
			let buf = Math.trunc(parseFloat(parkingHours));
			if (buf == 0) parkingHours = '1';
			if (buf > 25) {
				console.log("Слишком большое число для факториала");
			}
			else if (buf > 0) {
				parkingHours = buf;
				for (let i = buf - 1; i > 0; i--) {
					parkingHours *= i;
				}
			}
			parkingHours = parkingHours.toString();
			updateDisplay(parkingHours);
		}
	});
	
	let timeArr = [];
	let parkingCostPerMinute = 1.5;
	
	parkingCostButton.addEventListener('click', function() {
		let currentTimeValue = null;
		
		if (timeArr.length < 4) {
			if (blockerOperator === '') {
				currentTimeValue = Math.trunc(parseFloat(parkingCost));
				parkingCost = '0';
				updateDisplay(parkingCost);
			}
			else {
				currentTimeValue = Math.trunc(parseFloat(parkingHours));
				parkingHours = '0';
				updateDisplay(parkingHours);
			}
			
			if (timeArr.length == 0 || timeArr.length == 2) {
				if (currentTimeValue >= 0 && currentTimeValue <= 23) timeArr.push(currentTimeValue);
			}
			else {
				if (currentTimeValue >= 0 && currentTimeValue <= 59) timeArr.push(currentTimeValue);
			}
			
			parkingCostButton.style.background = "linear-gradient(to right, rgb(255, 185, 185) " + (timeArr.length / 4 * 100 - 5).toString() + "%, white " + (timeArr.length / 4 * 100 + 5).toString() + "%)";
		}
		else {
			let lenMinutes = timeArr[3] - timeArr[1];
			let lenHours = timeArr[2] - timeArr[0];
			if (lenMinutes < 0) {
				lenMinutes += 60;
				lenHours -= 1;
			}
			if (lenHours < 0) {
				console.log("Некорректный ввод времени парковки");
				timeArr = [];
				parkingCostButton.style.background = "linear-gradient(to right, rgb(255, 185, 185) " + (timeArr.length / 4 * 100 - 5).toString() + "%, white " + (timeArr.length / 4 * 100 + 5).toString() + "%)";
				return;
			}
			
			let finalCost = (lenMinutes + lenHours * 60) * parkingCostPerMinute;
			
			if (blockerOperator === '') {
				parkingCost = finalCost.toString();
				updateDisplay(parkingCost);
			}
			else {
				parkingHours = finalCost.toString();
				updateDisplay(parkingHours);
			}
			
			timeArr = [];
			parkingCostButton.style.background = "linear-gradient(to right, rgb(255, 185, 185) " + (timeArr.length / 4 * 100 - 5).toString() + "%, white " + (timeArr.length / 4 * 100 + 5).toString() + "%)";
		}
	});
	
	eraseButton.onclick = function() {
		if (blockerOperator != '') {
			blockerOperator = '';
			parkingHours = '';
			updateDisplay(parkingCost);
			return;
		}
		parkingCost = '0';
		updateDisplay(parkingCost);
		timeArr = [];
		parkingCostButton.style.background = "linear-gradient(to right, rgb(255, 185, 185) " + (timeArr.length / 4 * 100 - 5).toString() + "%, white " + (timeArr.length / 4 * 100 + 5).toString() + "%)";
	}
}