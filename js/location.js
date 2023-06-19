const mapContainer = document.querySelector('#map');
const infoWrap = document.querySelector('#infoWrap');
const btns = document.querySelectorAll('.list-branch li');
const btnTraffic = document.querySelector('.btn-traffic');
let trafficToggle = false;
let activeIndex = 0;

const markerInfo = [
	{
		title: '국회도서관',
		address: '서울특별시 영등포구 의사당대로 1',
		website: {
			title: 'nanet.go.kr',
			link: 'https://www.nanet.go.kr/main.do',
		},
		phone: '02-6788-4211',
		position: new kakao.maps.LatLng(37.531117, 126.917035),
		imgSrc: 'img/location-pin.png',
		imgSize: new kakao.maps.Size(50, 50),
		imgOption: { offset: new kakao.maps.Point(15, 50) },
		button: btns[0],
	},
	{
		title: '남산도서관',
		address: '서울특별시 용산구 소월로 109',
		website: {
			title: 'nslib.sen.go.kr',
			link: 'http://nslib.sen.go.kr/nslib_index.jsp',
		},
		phone: '02-754-7338',
		position: new kakao.maps.LatLng(37.552923, 126.981457),
		imgSrc: 'img/location-pin.png',
		imgSize: new kakao.maps.Size(50, 50),
		imgOption: { offset: new kakao.maps.Point(15, 50) },
		button: btns[1],
	},
	{
		title: '별마당 도서관',
		address: '서울특별시 강남구 영동대로 513 스타필드 코엑스몰 B1',
		website: {
			title: 'starfield.co.kr',
			link: 'https://www.starfield.co.kr/coexmall/starfieldLibrary/library.do',
		},
		phone: '02-6002-3031',
		position: new kakao.maps.LatLng(37.50999, 127.059986),
		imgSrc: 'img/location-pin.png',
		imgSize: new kakao.maps.Size(50, 50),
		imgOption: { offset: new kakao.maps.Point(15, 50) },
		button: btns[2],
	},
	{
		title: '국립중앙도서관',
		address: '서울특별시 서초구 반포대로 201',
		website: {
			title: 'nl.go.kr',
			link: 'https://www.nl.go.kr/',
		},
		phone: '02-535-4142',
		position: new kakao.maps.LatLng(37.497669, 127.002837),
		imgSrc: 'img/location-pin.png',
		imgSize: new kakao.maps.Size(50, 50),
		imgOption: { offset: new kakao.maps.Point(15, 50) },
		button: btns[3],
	},
];

// 화면 로딩 시 지도 생성
const mapOption = { center: markerInfo[0].position, level: 3 };
const map = new kakao.maps.Map(mapContainer, mapOption);
map.setZoomable(false); // 지도 확대, 축소 막기 (mousewheel)
createDOM();

// 지도 타입 컨트롤
const mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대, 축소 제어 줌 컨트롤
const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// Marker 이미지 등록
markerInfo.forEach((item, idx) => {
	const markerImage = new kakao.maps.MarkerImage(item.imgSrc, item.imgSize, item.imgOption);
	const marker = new kakao.maps.Marker({
		position: item.position,
		image: markerImage,
	});
	marker.setMap(map);

	item.button.addEventListener('click', (e) => {
		activeIndex = idx;
		map.panTo(item.position);

		for (const btn of btns) btn.classList.remove('on');
		btns[activeIndex].classList.add('on');
		createDOM();
	});
});

// 도서관 정보 DOM 생성
function createDOM() {
	const tags = `
		<h2>${markerInfo[activeIndex].title}</h2>
		<ul>
			<li>
				<i class="fa-solid fa-location-dot"></i>
				<p>${markerInfo[activeIndex].address}</p>
			</li>
			<li>
				<i class="fa-solid fa-globe"></i>
				<p>
					<a href="${markerInfo[activeIndex].website.link}" target="_blank">
						${markerInfo[activeIndex].website.title}
					</a>
				</p>
			</li>
			<li>
				<i class="fa-solid fa-phone"></i>
				<p>${markerInfo[activeIndex].phone}</p>
			</li>
		</ul>
		<div class="sns-wrap">
			<a href="#"><i class="fa-brands fa-instagram"></i></a>
			<a href="#"><i class="fa-brands fa-youtube"></i></a>
			<a href="#"><i class="fa-brands fa-facebook-f"></i></a>
		</div>
	`;

	infoWrap.innerHTML = tags;
}

// 지도 위치, Marker 가운데 고정
window.addEventListener('resize', () => {
	map.setCenter(markerInfo[activeIndex].position);
});

// 교통정보 표시
btnTraffic.addEventListener('click', () => {
	trafficToggle = !trafficToggle;

	if (trafficToggle) {
		map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		btnTraffic.innerHTML = '교통정보 ON';
	} else {
		map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		btnTraffic.innerHTML = '교통정보 OFF';
	}
});
