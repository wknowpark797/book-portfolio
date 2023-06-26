const formSignup = document.querySelector('#formSignup');
const inputBoxs = formSignup.querySelectorAll('.input-box input');
const textareaBoxs = formSignup.querySelectorAll('.input-box textarea');
const guideListWrap = document.querySelector('.guideListWrap');

inputBoxs.forEach((item) => {
	item.addEventListener('focus', (e) => {
		const name = e.target.name;
		let tags = '';

		if (name === 'userid') {
			tags += `
        <li>아이디 입력 항목 입니다.</li>
        <li>입력 항목에 5글자 이상 입력하세요.</li>
      `;
			guideListWrap.innerHTML = tags;
		}

		if (name === 'pwd1' || name === 'pwd2') {
			tags += `
        <li>비밀번호 입력 항목 입니다.</li>
        <li>입력 항목에 4글자 이상 입력하세요.</li>
        <li>특수문자와 영문자 그리고 숫자를 포함하여 입력하세요.</li>
      `;
			guideListWrap.innerHTML = tags;
		}

		if (name === 'email') {
			tags += `
        <li>이메일 입력 항목 입니다.</li>
        <li>입력 항목에 @를 포함하여 입력하세요.</li>
        <li>@ 앞쪽과 뒤쪽에 문자를 입력하세요.</li>
        <li>@ 뒤쪽의 서비스명을 올바르게 입력하세요.</li>
      `;
			guideListWrap.innerHTML = tags;
		}
	});

	item.addEventListener('focusout', () => {
		const tags = `
      <li>회원가입을 위한 입력 항목입니다.</li>
      <li>입력 항목에 커서를 올리면 안내사항이 표시됩니다.</li>
    `;
		guideListWrap.innerHTML = tags;
	});
});

textareaBoxs.forEach((item) => {
	item.addEventListener('focus', (e) => {
		const name = e.target.name;
		let tags = '';

		if (name === 'comments') {
			tags += `
        <li>남기는 글 입력 항목 입니다.</li>
        <li>입력 항목에 10글자 이상 입력하세요.</li>
      `;
			guideListWrap.innerHTML = tags;
		}
	});

	item.addEventListener('focusout', () => {
		const tags = `
      <li>회원가입을 위한 입력 항목입니다.</li>
      <li>입력 항목에 커서를 올리면 안내사항이 표시됩니다.</li>
    `;
		guideListWrap.innerHTML = tags;
	});
});
