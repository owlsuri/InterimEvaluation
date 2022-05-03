// 마켓 상품 리스트 프레젠터
import * as S from './list.styles'
import InfiniteScroll from "react-infinite-scroller";
import { getDate } from '../../commons/libraries/utils';
import { useEffect} from 'react';
import { useRecoilState } from 'recoil';
import { basket } from '../../commons/store';



export default function MarketListUI(props){

    return(
       <S.Wrapper>
           <InfiniteScroll
                    pageStart={0}
                    loadMore={props.onLoadMore}
                    hasMore={true}
                >
           <S.Container>
                {props.data?.fetchUseditems.map((el:any) => (
                  <S.Row key={el._id}  id={el._id} 
                          onClick={props.onClickToDetail(el)}>
                      <S.Info>
                        <div>
                            <S.Img  
                              // onClick={onClickToday(el)}
                              id={el._id}
                              src={
                                el.images[0]
                                  ? `https://storage.googleapis.com/${el.images?.[0]}`
                                  : `/noimage.png`
                              }/>
                  <S.ItemInfo>
                    <div>
                          <S.Name id={el._id}>
                            {el.name}
                          </S.Name>
                          <S.Price>{el.price}</S.Price>
                          </div>
                  </S.ItemInfo>
                        </div>
                      </S.Info>
                    </S.Row>
                  ))}
            </S.Container>
            </InfiniteScroll>
        </S.Wrapper>
    )
}