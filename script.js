window.onload = function(){
	let num1 = '0'
	let num2 = ''
	let op = ''

	const output = document.getElementById("result")
	const digitButtons = document.querySelectorAll('[id ^= "d_button_"]')
	const opButtons = document.querySelectorAll('.main_op')
	const eraseButton = document.getElementById('button_clear')
	const switchButton = document.getElementById('button_sign_switch')
	const executeButton = document.getElementById('button_equal')
	const percentButton = document.getElementById('button_percent')
	const themeChange = document.getElementById('background_select')
	const backspaceButton = document.getElementById('backspace_button')
	const sqrtButton = document.getElementById('button_sqrt')
	const squareButton = document.getElementById('button_sq')
	const factButton = document.getElementById('button_fact')
	const rndButton = document.getElementById('button_rnd')
	
	function updateDisplay(num) {
		if (num.length <= 14) {
			output.innerHTML = '<tr><td style = "text-align: left">' + op + '</td><td style = "text-align: right">' + num + '</td></tr>';
		}
		else {
			output.innerHTML = '<tr><td style = "text-align: left">' + op + '</td><td style = "text-align: right">' + num.slice(0, 15) + '</td></tr>';
		}
	}

	function onDigitButtonClicked(digit) {
		if (op === '') {
			if (digit === '.' && num1.includes(digit)) { return; }
			if (digit === '0' && num1 === '0') { return; }
			if (num1 === '0' && digit != '.') { num1 = ''; }
			num1 += digit;
			updateDisplay(num1);
		}
		else {
			if (digit === '.' && num2 === '') { num2 += '0'; }
			if (digit === '.' && num2.includes(digit)) { return; }
			if (digit === '0' && num2 === '0') { return; }
			num2 += digit;
			updateDisplay(num2);
		}
	}

	digitButtons.forEach(button => {
		button.onclick = function() {
			const digitValue = button.innerHTML;
			onDigitButtonClicked(digitValue);
		}
	});
		
	opButtons.forEach(button => {
		button.onclick = function() {
			if (num1 === '') return;
			op = button.innerHTML;
			updateDisplay(num2);
		}
	});
	
	eraseButton.onclick = function() {
		if (op != '') {
			op = '';
			num2 = '';
			updateDisplay(num1);
			return;
		}
		num1 = '0';
		updateDisplay(num1);
	}
	
	switchButton.onclick = function() {
		if (op === '') {
			num1 = ((num1) * (-1)).toString();
			updateDisplay(num1);
		}
		else {
			num2 = ((num2) * (-1)).toString();
			updateDisplay(num2);
		}
	}
	
	executeButton.onclick = function() {
		if (op === '' || num2 === '') return;
		switch (op) {
			case '+':
				num1 = (parseFloat(num1) + parseFloat(num2)).toString();
				break;
			case '-':
				num1 = (parseFloat(num1) - parseFloat(num2)).toString();
				break;
			case '*':
				num1 = (parseFloat(num1) * parseFloat(num2)).toString();
				break;
			case '/':
				num1 = (parseFloat(num1) / parseFloat(num2)).toString();
				break;
			case 'x<span class="power">y</span>':
				num1 = (Math.pow(parseFloat(num1), parseFloat(num2))).toString();
				break;
		}
		op = '';
		num2 = '';
		if (num1.length > 14) { 
			num1 = num1.slice(0, 15);
			let lastdigit = parseFloat(num1[13]);
			if (parseFloat(num1[14]) >= 5) lastdigit += 1;
			num1 = num1.slice(0, 13);
			num1 += lastdigit.toString();
		}
		updateDisplay(num1);
	}
	
	percentButton.onclick = function() {
		if (op === '') {
			if (num1 === '') return;
			if (parseFloat(num1) <= 1 && parseFloat(num1) >= 0) num1 = (parseFloat(num1) * 100).toString();
			updateDisplay(num1);
		}
		else {
			if (num2 === '') return;
			if (parseFloat(num2) <= 1 && parseFloat(num2) >= 0) num2 = (parseFloat(num2) * 100).toString();
			updateDisplay(num2);
		}
	}
	
	themeChange.onchange = function() {
		if (themeChange.value === 'white') {
			document.getElementById("theme_link").setAttribute('href', "style_white.css");
		}
		else {
			document.getElementById("theme_link").setAttribute('href', "style_black.css");
		}
	}
	
	backspaceButton.addEventListener('click', function() {
		if (op === '') {
			num1 = num1.slice(0, num1.length - 1);
			if (num1 === '') num1 = '0';
			updateDisplay(num1);
		}
		else {
			if (num2.length > 0) {
				num2 = num2.slice(0, num2.length - 1);
			}
			updateDisplay(num2);
		}
	});
	
	sqrtButton.addEventListener('click', function() {
		if (op === '') {
			if (parseFloat(num1) >= 0) {
				num1 = Math.sqrt(num1).toString();
			}
			else {
				alert("Этот калькулятор не умеет работать с комплексными числами");
			}
			updateDisplay(num1);
		}
		else {
			if (parseFloat(num2) >= 0) {
				num2 = Math.sqrt(num2).toString();
			}
			else {
				alert("Этот калькулятор не умеет работать с комплексными числами");
			}
			updateDisplay(num2);
		}
	});
	
	squareButton.addEventListener('click', function() {
		if (op === '') {
			num1 = (num1 * num1).toString();
			updateDisplay(num1);
		}
		else {
			num2 = (num2 * num2).toString();
			updateDisplay(num2);
		}
	});
	
	factButton.addEventListener('click', function() {
		if (op === '') {
			let buf = Math.trunc(parseFloat(num1));
			if (buf == 0) num1 = '1';
			if (buf > 25) {
				alert("Слишком большое число");
			}
			else if (buf > 0) {
				num1 = buf;
				for (let i = buf - 1; i > 0; i--) {
					num1 *= i;
				}
			}
			num1 = num1.toString();
			updateDisplay(num1);
		}
		else {
			let buf = Math.trunc(parseFloat(num2));
			if (buf == 0) num2 = '1';
			if (buf > 25) {
				alert("Слишком большое число");
			}
			else if (buf > 0) {
				num2 = buf;
				for (let i = buf - 1; i > 0; i--) {
					num2 *= i;
				}
			}
			num2 = num2.toString();
			updateDisplay(num2);
		}
	});
	
	rndButton.addEventListener('click', function() {
		if (op === '') {
			num1 = Math.random().toString();
			updateDisplay(num1);
		}
		else {
			num2 = Math.random().toString();
			updateDisplay(num2);
		}
	});
}