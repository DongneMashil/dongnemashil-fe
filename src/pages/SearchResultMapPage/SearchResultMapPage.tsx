// import React from 'react';
// import Map from 'components/common/Map/Map';
// import Marker from 'assets/icons/Marker.png';
import { ReviewsList } from 'api/reviewsApi';

export const SearchResultMapPage = ({
  reviewList,
}: {
  reviewList: ReviewsList[];
}) => {
  console.log('reviewList ', reviewList);

  // const imgSrc = Marker;
  // const imgSize = new kakao.maps.Size(36, 48);
  // const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

  // const initMap = (map: kakao.maps.Map) => {
  // //const markers: kakao.maps.Marker[] = []; // 마커 배열
  // // 마커 및 오버레이 세팅
  // reviewList.map((data: ReviewsList) => {
  //   const geocoder = new kakao.maps.services.Geocoder(); // 주소 -> 좌표 변환
  //   // 변환한 좌표가 유효할 경우 마커 및 오버레이 세팅
  //   geocoder.addressSearch(data.address, (result, status) => {
  //     console.log('geocoder ', result);
  //     if (status === kakao.maps.services.Status.OK) {
  //       // 주소 -> 좌표 변환
  //       const coord = new kakao.maps.LatLng(
  //         Number(result[0].y),
  //         Number(result[0].x)
  //       );
  //       // 마커 생성
  //       const marker = new kakao.maps.Marker({
  //         image: markerImage,
  //         position: coord,
  //       });
  //       marker.setMap(map); // 마커 맵에 추가
  //       //markers.push(marker); // 마커 저장
  //       // 툴팁 생성
  //       const overlay = new kakao.maps.CustomOverlay({
  //         position: coord,
  //         content: `<div style="background-color: #eeeeee; padding: 7px;border-radius: 10px;">
  //           <a href="/review/${data.id}">
  //         <img src='${data.mainImgUrl}' width="100px" height="100px"/>
  //         </a>
  //       </div>`,
  //         xAnchor: 0.45,
  //         yAnchor: 1.12,
  //         clickable: true,
  //       });
  //       kakao.maps.event.addListener(marker, 'click', () => {
  //         overlay.setMap(map); // 툴팁 열기 이벤트 리스너 추가
  //       });
  //       kakao.maps.event.addListener(map, 'click', () => {
  //         overlay.setMap(null); // 툴팁 닫기 이벤트 리스너 추가
  //       });
  //     }
  //   });
  // });
  // };
  // return <Map width="100%" height="100%" initMap={initMap} />;
};
