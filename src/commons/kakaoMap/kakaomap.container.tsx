// 카카오지도
import { useEffect, useState } from 'react'
import { CLIENT_RENEG_WINDOW } from 'tls'
import KakaoMapUI from './kakaomap.presenter'

declare const window: typeof globalThis & {
    kakao: any
}
export default function KakaoMapPage(props){

    // console.log(props.data?.fetchUseditem.useditemAddress?.address)

    useEffect(()=>{

    const script = document.createElement("script") // <script></script>
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=f2354913af21df03ad4d0ed912052c38&libraries=services&autoload=false"
    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(function () {
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
                };
        
            // 지도를 생성합니다    
            const map = new window.kakao.maps.Map(mapContainer, mapOption); 
            
            // 주소-좌표 변환 객체를 생성합니다
            let geocoder = new window.kakao.maps.services.Geocoder();
            

            console.log(props.address)
            console.log(props.data?.fetchUseditem.useditemAddress?.address)
            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(props.address || props.data?.fetchUseditem.useditemAddress?.address, function(result, status) {

                // 정상적으로 검색이 완료됐으면 
                if (status === window.kakao.maps.services.Status.OK) {

                    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    const marker = new window.kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // console.log(coords)
                    // props.setGps(coords)

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                          const infowindow = new window.kakao.maps.InfoWindow({
                              content: '<div style="width:150px;text-align:center;padding:6px 0;">거래장소</div>'
                          });
                          infowindow.open(map, marker);

                          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                          map.setCenter(coords);
                      } 
                  });
      });
      }
    },[props.address, props.data?.fetchUseditem.useditemAddress?.address])

    return (
     <KakaoMapUI />
    );
}

