// 마켓 상품 리스트 프레젠터
import * as S from './list.styles'
import InfiniteScroll from "react-infinite-scroller";
import { getDate } from '../../commons/libraries/utils';
import { useEffect} from 'react';
import { useRecoilState } from 'recoil';
import { basket } from '../../commons/store';



export default function MarketListUI(props){

  const [basketItems, setBasketItems] = useRecoilState(basket);

      const onClickToday = (el) => () =>{
      // 불러오기
       const baskets = JSON.parse(
         localStorage.getItem(getDate(new Date())) || "[]"
       );
       console.log(baskets)

       const temp = baskets.filter((basketEl) => basketEl._id === el._id);
           if (temp.length === 1) {
             return;
           }
    
       // 담기
        const { __typename, ...newEl } = el;
        baskets.push(newEl);
        localStorage.setItem(getDate(new Date()), JSON.stringify(baskets));

        const newBaskets = JSON.parse(
            localStorage.getItem(getDate(new Date())) || "[]");
            setBasketItems(newBaskets);
        };
        

        useEffect(() => {
            const baskets = JSON.parse(
              localStorage.getItem(getDate(new Date())) || "[]"
            );
            setBasketItems(baskets);
        }, []);

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
                          onClick={props.onClickToDetail}>
                      <S.Info>
                        <div>
                            <S.Img  
                              onClick={onClickToday(el)}
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