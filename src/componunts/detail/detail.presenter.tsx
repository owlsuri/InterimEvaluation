import * as S from './detail.styles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import Dompurify from 'dompurify'
import UsedItemReadQna from './detail.presenterItem'
import CommentWrite from '../CommentWrite/commentWrite.container';
import CommentRead from '../CommentList/commentList.container';
import { useState } from 'react';
import MarketWrite from '../write/write.container';
import KakaoMapFetchPage from '../../commons/kakaoMapFetch/kakaomap.container';

export default function UsedItemReadUI(props){

    const [isEdit, setIsEdit]=useState(false)

    return(
      <>
      {!isEdit && (
        <S.Wrapper>
            <S.Header>
                <S.ImgBox>
                 <S.MImg src={props.data?.fetchUseditem.images[0] ? `https://storage.googleapis.com/${props.data?.fetchUseditem.images[0]}` : "/noimage.png"}/>
                </S.ImgBox>
                <S.InfoBox>
                    <S.Icon>
                    <S.Name>{props.data ? props.data?.fetchUseditem.name : "loading..."}</S.Name>
                    <S.IconBox>
                        <FontAwesomeIcon onClick={props.onClickMoveEdit} icon={faPencil}  color="#BDBDBD" />
                        <FontAwesomeIcon  onClick={props.onClickDelete} icon={faX} color="#BDBDBD" />
                    </S.IconBox>
                    </S.Icon>
                    <S.PriceBox>
                    <S.Price>{props.data ? props.data?.fetchUseditem.price : "loading..."}</S.Price><S.PriceWon>원</S.PriceWon>
                    </S.PriceBox>
                    <S.Remarks>{props.data ? props.data?.fetchUseditem.remarks : "loading..."}</S.Remarks>
                    <S.Tags>
                        {props.data?.fetchUseditem.tags.map((el, i) => (
                            <S.Tag key={i}>{el}</S.Tag>
                        ))}
                    </S.Tags>
                    <S.Btns>
                        <S.Pick onClick={props.onClickPick}>♡찜{props.data?.fetchUseditem.pickedCount}</S.Pick> 
                        <S.Basket onClick={props.onClickBasket(props.data?.fetchUseditem)}>장바구니</S.Basket>
                        <S.Buy onClick={props.onClickPay}>바로구매</S.Buy>
                    </S.Btns>
                </S.InfoBox>
            </S.Header> 
            <S.Body>
                <S.Detail>
                <S.TitleIn>상품정보</S.TitleIn>
                    <S.DetailImg>
                    <div>
                {props.data?.fetchUseditem.images
                    ?.filter((el: string) => el)
                    .map((el: string) => (
                    <S.Img
                        key={el}
                        src={`https://storage.googleapis.com/${el}`}
                    />
                    ))}
                </div>
                    </S.DetailImg>
                    <S.ContentDetail>
                     {typeof window !== "undefined" && (<div dangerouslySetInnerHTML={{
                    __html: Dompurify.sanitize(props.data?.fetchUseditem.contents),
                    }}/>)}
                    </S.ContentDetail>
                    <S.Location>
                        <S.Pin src='/pin.png' />
                        <S.Subtitle>거래지역</S.Subtitle>
                        <S.Map>
                            <KakaoMapFetchPage data={props.data}/>
                        </S.Map>
                    </S.Location>
                </S.Detail>
                <S.CommentBox>                    
                    <S.Store>
                        <S.Title>상점정보</S.Title>
                        <S.User>
                            <S.UserImg></S.UserImg>
                            <S.UserName>{props.userData ? props.userData?.fetchUserLoggedIn.name : "loading..."}</S.UserName>
                        </S.User>
                    </S.Store>
                    <S.Comment>
                        {/* 댓글쓰기 */}
                        <CommentWrite />
                        {/* 댓글리스트 */}
                        <CommentRead />
                    </S.Comment>
                </S.CommentBox>
            </S.Body>       
        </S.Wrapper>
      )}
       {isEdit && <MarketWrite isEdit={true} data={props.data} setIsEdit={setIsEdit} /> }
      </>
    )

}