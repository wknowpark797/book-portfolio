const visualPanel = document.querySelector('#visualPanel');
const btnPrevVisual = document.querySelector('#btnPrevVisual');
const btnNextVisual = document.querySelector('#btnNextVisual');
const currentWrap = document.querySelector('.current-number');
let totalSlideNum = 0;
let currentSlideNum = 1;

const userId = '105834502729522452212';
const shelf = '1002';
const listURL = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=30`;

fetchData(listURL);

btnPrevVisual.addEventListener('click', () => {
	parseInt(currentSlideNum) === 1 ? (currentSlideNum = totalSlideNum) : currentSlideNum--;
	createCurrent();

	visualPanel.prepend(visualPanel.lastElementChild);
});

btnNextVisual.addEventListener('click', () => {
	currentSlideNum === totalSlideNum ? (currentSlideNum = 1) : currentSlideNum++;
	createCurrent();

	visualPanel.append(visualPanel.firstElementChild);
});

// 이벤트 위임
document.body.addEventListener('click', (e) => {
	if (e.target.id === 'btnDetailVisual') {
		const detailURL = `https://www.googleapis.com/books/v1/volumes/${e.target.dataset.detail}`;
		fetchDetail(detailURL);
	}

	if (e.target.closest('.pop-close')) removePop();
});

// 도서 목록 fetch 함수
async function fetchData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();

		createDOM(data.items);

		totalSlideNum = data.items.length;
		createCurrent();

		console.log(data.items);
	} catch (err) {
		console.log('err: ', err);
	}
}

// 도서 슬라이드 create 함수
function createDOM(arr) {
	let tags = '';

	arr.forEach((item) => {
		const imgOriginReplace = item.volumeInfo.imageLinks.thumbnail
			.replace('zoom=1', 'zoom=10')
			.replace('edge=curl', 'edge=');
		const imgShadowReplace = item.volumeInfo.imageLinks.thumbnail.replace('edge=curl', 'edge=');

		tags += `
      <div>
        <div class="detail-wrap">
          <h1>${item.volumeInfo.title}</h1>

          <div class="rating-wrap">
            <div class="star-box">
              <span class="on"><i class="fa-solid fa-star"></i></span>
              <span class="on"><i class="fa-solid fa-star"></i></span>
              <span class="on"><i class="fa-solid fa-star"></i></span>
              <span><i class="fa-solid fa-star"></i></span>
              <span><i class="fa-solid fa-star"></i></span>
            </div>
            <p>3.0</p>
          </div>

          <p class="content">${item.volumeInfo.description}</p>

          <button type="button" 
								id="btnDetailVisual" 
								class="btn-more"
								data-detail="${item.id}">
						VIEW DETAIL
					</button>
        </div>

        <div class="ratio-wrap">
          <div class="double-wrap">

            <div class="img-box origin">
              <img src="${imgOriginReplace}" alt="">
            </div>

            <div class="img-box shadow">
              <img src="${imgShadowReplace}" alt="">
            </div>

          </div>
        </div>
      </div>
    `;

		visualPanel.innerHTML = tags;
	});
}

// 도서 슬라이드 indicator create 함수
function createCurrent() {
	currentSlideNum = parseInt(currentSlideNum);
	totalSlideNum = parseInt(totalSlideNum);

	if (currentSlideNum < 10) {
		currentSlideNum = '0' + currentSlideNum;
	}
	if (totalSlideNum < 10) {
		totalSlideNum = '0' + totalSlideNum;
	}
	currentWrap.innerHTML = `<span>${currentSlideNum}</span> / ${totalSlideNum}`;
}

// 도서 상세 fetch 함수
async function fetchDetail(url) {
	try {
		const response = await fetch(url);
		const detail = await response.json();
		console.log(detail.volumeInfo);

		createPop(detail.volumeInfo);
	} catch (err) {
		console.log('err: ', err);
	}
}

// 도서 상세 팝업 생성 함수
function createPop(obj) {
	const tags = `
		<div class="inner-pop">
      <div class="inner-content">

				<div class="inner-detail">
					<div class="img-box">
						<img src="${obj.imageLinks.small.replace('edge=curl', 'edge=')}">
					</div>
					
					<div class="info-wrap">
						<h1>${obj.title}</h1>
						<h2>${obj.subtitle ? obj.subtitle : ''}</h2>
						
						<p class="authors">작가 : ${obj.authors}</p>
						<div class="description">${obj.description}</div>
						<p>카테고리 : ${obj.categories}</p>
						<p>출판사 : ${obj.publisher}</p>
						<p>출판일 : ${obj.publishedDate}</p>
					</div>
				</div>

			</div>

      <button type="button" class="pop-close">
        <i class="fa-solid fa-circle-xmark"></i>
      </button>
    </div>
	`;

	const pop = document.createElement('aside');
	pop.className = 'pop-wrap';
	pop.innerHTML = tags;
	document.body.append(pop);

	setTimeout(() => {
		document.querySelector('.pop-wrap').classList.add('on');
	}, 0);

	document.body.style.overflow = 'hidden';
}

// 팝업 제거 함수
function removePop() {
	document.querySelector('.pop-wrap').classList.remove('on');

	setTimeout(() => {
		document.querySelector('.pop-wrap').remove();
	}, 400);

	document.body.style.overflow = 'auto';
}
