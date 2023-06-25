// 회원가입 Form
const formSignup = document.querySelector('#formSignup');
formSignup && signUpValidate();

function signUpValidate() {
	const btnSignup = formSignup.querySelector('input[type=submit]');

	btnSignup.addEventListener('click', (e) => {
		if (!isText(formSignup, 'userid', 5)) e.preventDefault();
		if (!isText(formSignup, 'comments', 10)) e.preventDefault();
		if (!isPwd(formSignup, 'pwd1', 'pwd2', 4)) e.preventDefault();
		if (!isEmail(formSignup, 'email')) e.preventDefault();
		if (!isCheck(formSignup, 'gender')) e.preventDefault();
		if (!isCheck(formSignup, 'hobby')) e.preventDefault();
		if (!isSelect(formSignup, 'edu')) e.preventDefault();
	});
}

// Location Form
const formContact = document.querySelector('#formContact');
formContact && contactValidate();

function contactValidate() {
	const btnContact = formContact.querySelector('input[type=submit]');

	btnContact.addEventListener('click', (e) => {
		if (!isText(formContact, 'username', 2)) e.preventDefault();
		if (!isEmail(formContact, 'email')) e.preventDefault();
		if (!isText(formContact, 'message', 10)) e.preventDefault();
	});
}

// 텍스트 항목 인증
function isText(form, name, length) {
	const input = form.querySelector(`[name=${name}]`);
	const value = input.value.trim();

	if (value.length < length) {
		resetError(input);
		const errMsg = document.createElement('p');
		errMsg.className = 'error';
		errMsg.innerText = `${length}글자 이상 입력하세요.`;
		input.closest('.input-box').append(errMsg);
		return false;
	} else {
		resetError(input);
		return true;
	}
}

// 비밀번호 항목 인증
function isPwd(form, pwd1, pwd2, length) {
	const pwdEl1 = form.querySelector(`[name=${pwd1}]`);
	const pwdVal1 = form.querySelector(`[name=${pwd1}]`).value;
	const pwdVal2 = form.querySelector(`[name=${pwd2}]`).value;

	const num = /[0-9]/;
	const eng = /[a-zA-Z]/;
	const spc = /[!@#$%^&*()_+]/;

	if (
		pwdVal1 !== pwdVal2 ||
		pwdVal1.length < length ||
		!num.test(pwdVal1) ||
		!eng.test(pwdVal1) ||
		!spc.test(pwdVal1)
	) {
		resetError(pwdEl1);
		const errMsg = document.createElement('p');
		errMsg.className = 'error';
		errMsg.innerText = `비밀번호는 ${length}글자 이상, 특수문자, 영문, 숫자를 모두 포함하세요.`;
		pwdEl1.closest('.input-box').append(errMsg);
		return false;
	} else {
		resetError(pwdEl1);
		return true;
	}
}

// 이메일 항목 인증
function isEmail(form, name) {
	const email = form.querySelector(`[name=${name}]`);
	const emailVal = email.value;

	if (/@/.test(emailVal)) {
		const [beforeTxt, afterTxt] = emailVal.split('@');

		if (!beforeTxt || !afterTxt) {
			resetError(email);
			const errMsg = document.createElement('p');
			errMsg.className = 'error';
			errMsg.innerText = `@ 앞쪽이나 뒤쪽에 문자값이 없습니다.`;
			email.closest('.input-box').append(errMsg);
			return false;
		} else {
			if (!/\./.test(afterTxt)) {
				resetError(email);
				const errMsg = document.createElement('p');
				errMsg.className = 'error';
				errMsg.innerText = `@ 뒤쪽에 서비스명이 올바른지 확인하세요.`;
				email.closest('.input-box').append(errMsg);
				return false;
			} else {
				resetError(email);
				return true;
			}
		}
	} else {
		resetError(email);
		const errMsg = document.createElement('p');
		errMsg.className = 'error';
		errMsg.innerText = `@를 포함하여 입력하세요.`;
		email.closest('.input-box').append(errMsg);
		return false;
	}
}

// radio, check 요소 인증
function isCheck(form, name) {
	const inputs = form.querySelectorAll(`[name=${name}]`);

	let isChecked = false;

	for (const input of inputs) input.checked && (isChecked = true);

	if (!isChecked) {
		resetError(inputs);
		const errMsg = document.createElement('p');
		errMsg.className = 'error';
		errMsg.innerText = `해당 선택사항을 하나 이상 선택하세요.`;
		inputs[0].closest('.input-box').append(errMsg);
		return false;
	} else {
		resetError(inputs);
		return true;
	}
}

// select 요소 인증
function isSelect(form, name) {
	const input = form.querySelector(`[name=${name}]`);
	const selectedIndex = input.options.selectedIndex;
	const value = input.options[selectedIndex].value;

	if (value === '') {
		resetError(input);
		const errMsg = document.createElement('p');
		errMsg.className = 'error';
		errMsg.innerText = `해당 요소 중 하나를 선택해주세요.`;
		input.closest('.input-box').append(errMsg);
		return false;
	} else {
		resetError(input);
		return true;
	}
}

// 에러 메세지 제거 함수
function resetError(inputs) {
	let element = null;
	inputs.length ? (element = inputs[0]) : (element = inputs);
	const errMsg = element.closest('.input-box').querySelector('.error');
	if (errMsg) element.closest('.input-box').querySelector('.error').remove();
}
