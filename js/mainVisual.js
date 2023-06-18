const visualPanel = document.querySelector('#visualPanel');

const currentWrap = document.querySelector('.current-number');
let totalSlideNum = 0;
let currentSlideNum = 1;
const btnPrevVisual = document.querySelector('#btnPrevVisual');
const btnNextVisual = document.querySelector('#btnNextVisual');

const userId = '105834502729522452212';
const shelf = '1002';
const url = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=30`;

fetchData(url);

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

          <button type="button" class="btn-more">VIEW DETAIL</button>
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
