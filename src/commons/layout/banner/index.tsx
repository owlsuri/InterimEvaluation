import styled from "@emotion/styled"
import { useRouter } from "next/router"

const Wrapper = styled.div`

height: 180px;
display: flex;
justify-content: space-between;
align-items: center;
border-top: 1px solid #BDBDBD;
border-bottom: 1px solid #BDBDBD;
margin-top: 30px;
`

const Logo = styled.div`
width: 300px;
padding-left: 100px;
`

const Sell = styled.div`
padding-right: 50px;
width: 160px;
display: flex;
align-items: center;
justify-content: space-between;

`
const SellT = styled.span`
cursor: pointer;
`
export default function LayoutBanner(){

    const router = useRouter()

    const onClickNew = () =>{
        router.push("/market/new")
    }

    const onClickMain = () =>{
        router.push("/")
    }

    return(
        <Wrapper>
            <Logo>
                <img onClick={onClickMain} src="/logo 1.png"/>
            </Logo>
            <Sell>
                <img src="/sell1.png" />
                    <SellT onClick={onClickNew}>판매하기</SellT>
            </Sell>            
        </Wrapper>
    )
}