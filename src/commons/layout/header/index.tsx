import { gql, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { Modal } from "antd"
import { isPunctuatorTokenKind } from "graphql/language/lexer"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PointPaymentPage from "../../../componunts/Point/inedex"
import "antd/dist/antd.css";

const Wrapper = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 50px;
    padding-right: 30px;

`

const Label = styled.div`
    padding-right: 30px;
`
const BLabel = styled.div`
    padding-right: 3px;
`

const Basket = styled.div`
display: flex;
align-items: center;

`
const Container = styled.div`
display: flex;
align-items: center;

`
const Charge = styled.div`
padding-left: 40px;
`
const Point = styled.span`
font-weight: 700;
`
const BasketLength = styled.div`
width:20px;
height: 20px;
background-color: #FFE004;
color: white;
text-align: center;
border-radius: 30px;
`
const FETCH_USER_LOGGED_IN=gql`
    query fetchUserLoggedIn{
        fetchUserLoggedIn{
            _id
            email
            name
        userPoint {
            amount
        }
        }
    }
`
    


export default function LayoutHeader(){

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const { data } = useQuery(FETCH_USER_LOGGED_IN)

    console.log(data)

    const onClicktoLogin = () => {
        router.push('/login')
    }

    const onClicktoJoin = () => {
        router.push('/join')
    }

    const onClickLogOut = () => {
        
    }

    const onToggleModal = () => {
        setIsOpen(true)
    }

    // 장바구니 상품
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    setBasketItems(baskets);
  }, []);

   const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

    return(
            <Wrapper>
          {isOpen && (
          <Modal visible={isOpen} onOk={handleOk} onCancel={handleCancel}>
            <PointPaymentPage data={data} />
          </Modal>
        )}
            <Label onClick={onClicktoLogin}>{data?.fetchUserLoggedIn.email ? (
          <Container>
            <div>
              {data?.fetchUserLoggedIn.name} 님의 포인트{" "}
              <Point>{data?.fetchUserLoggedIn.userPoint.amount}P</Point>
            </div>
            <Charge onClick={onToggleModal}>충전</Charge>
            <Charge onClick={onClickLogOut}>로그아웃</Charge>
          </Container>
        ) : (
          <>
            <div onClick={onClicktoLogin}>로그인</div>
            <div onClick={onClicktoJoin}>회원가입</div>
          </>
        )}</Label>
                <Basket>
                    <BLabel>장바구니</BLabel>
                    <BasketLength>{basketItems.length}</BasketLength>
                </Basket>
            </Wrapper>

    )

}