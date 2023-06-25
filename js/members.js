const membersWrap = document.querySelector('#membersWrap');
const directorsWrap = document.querySelector('#directorsWrap');

let membersTags = '';
let directorsTags = '';

// 멤버 데이터 Fetching
fetch('DB/members.json')
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		const membersArr = data.members;
		console.log(membersArr);

		membersArr.forEach((member) => {
			membersTags += `
        <article>
          <div class="img-box">
            <img src="img/members/${member.pic}" alt="">
          </div>
          <div class="info-box">
            <p class="name">${member.name}</p>
            <p>${member.position}</p>
          </div>
        </article>
      `;
		});

		console.log(membersTags);
		membersWrap.innerHTML = membersTags;
	})
	.catch((err) => {
		console.log(err);
	});

// 디렉터 데이터 Fetching
fetch('DB/members.json')
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		const directorsArr = data.directors;
		console.log(directorsArr);

		directorsArr.forEach((member) => {
			directorsTags += `
        <article>
          <div class="img-box">
            <img src="img/members/${member.pic}" alt="">
          </div>
          <div class="info-box">
            <p class="name">${member.name}</p>
            <p>${member.position}</p>
          </div>
        </article>
      `;
		});

		console.log(directorsTags);
		directorsWrap.innerHTML = directorsTags;
	})
	.catch((err) => {
		console.log(err);
	});

// Swiper
const swiper = new Swiper('.membersSwiper', {
	slidesPerView: 'auto',
	centeredSlides: true,
	breakpoints: {
		0: {
			spaceBetween: 30,
		},
		600: {
			spaceBetween: 50,
		},
	},
});
