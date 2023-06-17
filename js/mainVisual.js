const visualPanel = document.querySelector('#visualPanel');

const currentWrap = document.querySelector('.current-number');
let totalSlideNum = 0;
let currentSlideNum = 1;
const btnPrevVisual = document.querySelector('#btnPrevVisual');
const btnNextVisual = document.querySelector('#btnNextVisual');

const userId = '105834502729522452212';
const shelf = '1001';
const url = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes`;

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
		const imgReplace = item.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=10');

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
              <img src="${imgReplace}" alt="">
            </div>

            <div class="img-box shadow">
              <img src="${item.volumeInfo.imageLinks.thumbnail}" alt="">
            </div>

          </div>
        </div>
      </div>
    `;

		visualPanel.innerHTML = tags;
	});
}

function createCurrent() {
	currentWrap.innerHTML = `<span>${'0' + currentSlideNum}</span> / ${'0' + totalSlideNum}`;
}

btnPrevVisual.addEventListener('click', () => {
	currentSlideNum === 1 ? (currentSlideNum = totalSlideNum) : currentSlideNum--;
	createCurrent();

	visualPanel.prepend(visualPanel.lastElementChild);
});

btnNextVisual.addEventListener('click', () => {
	currentSlideNum === totalSlideNum ? (currentSlideNum = 1) : currentSlideNum++;
	createCurrent();

	visualPanel.append(visualPanel.firstElementChild);
});
