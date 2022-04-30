import * as S from '../../componunts/write/write.styles'
import { Modal } from 'antd';
import DaumPostcode from 'react-daum-postcode';
export default function KakaoMapUI(props){

  return(
        <S.BlockLo>
           <div>
        <div id="clickLatlng"></div>
        <div>
          <div id="map" style={{ width: "500px", height: "400px" }}></div>
        </div>
      </div>

              {props.isOpen && (<Modal title="주소를 검색해주세요" 
                    visible={true} onOk={props.handleOk}  
                    onCancel={props.handleCancel}>
                <DaumPostcode onComplete={props.handleComplete}/>
            </Modal>
            )}


                <S.AddressBox>
                    <div>
                        <S.Label>주소</S.Label>
                        <S.ZipBox>
                        <S.Zip type="text" id="zipcode" placeholder="07250" 
                          value={props.zipcode} readOnly/>
                        <S.ZipBtn type="button" onClick={props.showModal}>우편번호 검색</S.ZipBtn>
                        </S.ZipBox>
                        <S.Address type="text" id="address" value={props.address || ""} readOnly/>
                        <S.Address type="text" />
                    </div>
                </S.AddressBox>
            </S.BlockLo>
  )
}