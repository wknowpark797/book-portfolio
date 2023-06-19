const mapContainer = document.querySelector('#map');
const btns = document.querySelectorAll('.list-branch li');

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
		imgSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
		imgSize: new kakao.maps.Size(64, 69),
		imgOption: { offset: new kakao.maps.Point(27, 69) },
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
		imgSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
		imgSize: new kakao.maps.Size(64, 69),
		imgOption: { offset: new kakao.maps.Point(27, 69) },
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
		imgSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
		imgSize: new kakao.maps.Size(64, 69),
		imgOption: { offset: new kakao.maps.Point(27, 69) },
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
		imgSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
		imgSize: new kakao.maps.Size(64, 69),
		imgOption: { offset: new kakao.maps.Point(27, 69) },
		button: btns[3],
	},
];

// 지도 생성
const mapOption = { center: markerInfo[0].position, level: 3 };
const map = new kakao.maps.Map(mapContainer, mapOption);

markerInfo.forEach((item, idx) => {
	const markerImage = new kakao.maps.MarkerImage(item.imgSrc, item.imgSize, item.imgOption);
	const marker = new kakao.maps.Marker({
		position: item.position,
		image: markerImage,
	});
	marker.setMap(map);

	item.button.addEventListener('click', (e) => {
		for (const btn of btns) btn.classList.remove('on');
		e.target.classList.add('on');

		map.panTo(item.position);
	});
});
