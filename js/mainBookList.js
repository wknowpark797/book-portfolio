const bookListPanel = document.querySelector('#bookListPanel');
const btnPrevBook = document.querySelector('#btnPrevBook');
const btnNextBook = document.querySelector('#btnNextBook');

const userId = '105834502729522452212';
const shelf = '1001';
const listURL = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=30`;

fetchData(listURL);

btnPrevBook.addEventListener('click', () => {
	bookListPanel.prepend(bookListPanel.lastElementChild);
});

btnNextBook.addEventListener('click', () => {
	bookListPanel.append(bookListPanel.firstElementChild);
});

// 이벤트 위임
document.body.addEventListener('click', (e) => {
	if (e.target.closest('.btnDetailBook')) {
		const detailURL = `https://www.googleapis.com/books/v1/volumes/${
			e.target.closest('.btnDetailBook').dataset.detail
		}`;
		fetchDetail(detailURL);
	}
});

// 도서 목록 fetch 함수
async function fetchData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();

		createDOM(data.items);
		console.log(data.items);
	} catch (err) {
		console.log('err: ', err);
	}
}

// 도서 슬라이드 create 함수
function createDOM(arr) {
	let tags = '';

	arr.forEach((item) => {
		const imgReplace = item.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=10');

		tags += `
      <div class="btnDetailBook" data-detail="${item.id}">
        <div class="ratio-wrap">
          <div class="img-box">
            <img src="${imgReplace}" alt="">
          </div>
        </div>

        <div class="info-box">
          <h2>${item.volumeInfo.title}</h2>
          <p>${item.volumeInfo.authors}</p>
        </div>
      </div>
    `;

		bookListPanel.innerHTML = tags;
	});
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
	}, 200);

	document.body.style.overflow = 'auto';
}
