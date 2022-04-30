// 카카오지도

import { useEffect, useState } from 'react'
import KakaoMapUI from './kakaomap.presenter'

export default function KakaoMapPage(){

  const [addressInputs, setAddressInputs] = useState({
    address:"",
    zipcode:"",
    addressDetail:""
  });

  // 모달 주소입력
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleComplete = (data:any) =>{
    setIsOpen(false);
    setAddressInputs({...addressInputs, address:data.address, zipcode:data.zonecode})
  }


    useEffect(()=>{

    const script = document.createElement("script") // <script></script>
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=f2354913af21df03ad4d0ed912052c38&autoload=false"
    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
          level: 4, // 지도의 레벨(확대, 축소 정도)
        };
        const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
       
        
                    // 마커가 표시될 위치입니다
                    const markerPosition = new kakao.maps.LatLng(33.1707573, 126.2726748);

                    
                    let imageSrc =
                    "/pin.png", // 마커이미지의 주소입니다
                    imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
                    imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    
                    let markerImage = new kakao.maps.MarkerImage(
                        imageSrc,
                        imageSize,
                        imageOption
                        );
                        // 지도에 클릭 이벤트를 등록합니다
                        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
                        // 마커를 생성합니다
                        const marker = new kakao.maps.Marker({
                            position: markerPosition,
                            image: markerImage, // 마커이미지 설정
                        });
                        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
                    // 클릭한 위도, 경도 정보를 가져옵니다
                    let latlng = mouseEvent.latLng;
                    
                    // 마커 위치를 클릭한 위치로 옮깁니다
                    marker.setPosition(latlng);
                    
                    let message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
                    message += "경도는 " + latlng.getLng() + " 입니다";
                    
                    let resultDiv = document.getElementById("clickLatlng");
                    resultDiv.innerHTML = message;
            
                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);
        });
      });

      
      }


    },[])

    return (
     <KakaoMapUI 
        isOpen={isOpen}
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleComplete={handleComplete}
        />
    );
}

