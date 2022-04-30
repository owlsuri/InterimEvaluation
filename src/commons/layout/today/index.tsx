import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { basket } from "../../store";

const Wrapper=styled.div`
    
`
const Title=styled.div`
padding-top: 20px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
`
const Boxes=styled.div`
padding: 20px 35px 30px 35px;
`
const Box=styled.img`
width: 85px;
height: 85px;
background-color: gray;
margin-bottom: 15px;
`

export default function Today(){

    const [basketItems, setBasketItems] = useRecoilState(basket);

    const router = useRouter()

    const onClickDetail = () => {

    }


    return(
        <Wrapper>
            <Title>최근 본 상품</Title>
            <Boxes>
                <Box onClick={onClickDetail} src={basketItems[basketItems.length-1]?.images[0] !== "" 
                        ? `https://storage.googleapis.com/${basketItems[basketItems.length-1]?.images[0]}`
                        : `/noimage.png` } />
                <Box src={basketItems[basketItems.length-2]?.images[0] !== "" 
                        ? `https://storage.googleapis.com/${basketItems[basketItems.length-2]?.images[0]}`
                        : `/noimage.png` } />
                <Box src={basketItems[basketItems.length-3]?.images[0] !== ""
                        ? `https://storage.googleapis.com/${basketItems[basketItems.length-3]?.images[0]}`
                        :  `/noimage.png` } />
            </Boxes>
        </Wrapper>
    )
}