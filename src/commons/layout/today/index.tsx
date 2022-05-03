import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getDate } from "../../libraries/utils";
import { basket } from "../../store";

const Wrapper=styled.div`
    
`
const Title=styled.div`
    padding-top: 15px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    width: 150px;
`
const Boxes=styled.div`
padding: 20px 20px 0px 35px;
`
const Box=styled.img`
width: 85px;
height: 85px;
background-color: gray;
cursor: pointer;
`

export default function Today(){
    
    const router = useRouter()
    const [basketItems, setBasketItems] = useRecoilState(basket);

    useEffect(() => {
        const aaa = JSON.parse(localStorage.getItem("watch") || "[]");
        const bbb = aaa.reverse().slice(0, 3);
        console.log(bbb);
        setBasketItems(bbb);
    }, []);

    const onClickToDetail = (event) => {
        router.push(event.target.id)
    }

    return(       
        <Wrapper>
            <Title>최근 본 상품</Title> 
            {basketItems.map((el, i)=>(
                <Boxes key={i} id={el._id}>
                   <Box 
                   onClick={onClickToDetail}
                   id={el._id}
                  src= { 
                      el.images[0] ?
                    `https://storage.googleapis.com/${el.images[0]}`
                    :  "/noimage.png"
                    }/>
                </Boxes>                
            ))}
        </Wrapper>
    )
}