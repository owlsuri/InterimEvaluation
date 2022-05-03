import { gql, useMutation, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { Modal } from "antd"
import { isPunctuatorTokenKind } from "graphql/language/lexer"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PointPaymentPage from "../../../componunts/Point/inedex"
import "antd/dist/antd.css";
import Head from 'next/head'
import { useRecoilState } from "recoil"
import { accessTokenState, basketaaa } from "../../store"

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
cursor: pointer;
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
const SelectTitle = styled.div`
font-size: 20px;
font-weight: 700;
text-align: center;
padding-bottom: 20px;
`
const Drop = styled.select`
width: 460px;
height: 55px;
padding: 10px;
border: none;
border-bottom: 2px solid black ;
`
const Option = styled.option`
width: 460px;
height: 55px;
padding: 10px;
font-size: 20px;
`
const ChargeBtn = styled.option`
width: 460px;
height: 51px;
background: #BDBDBD;
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px;
margin-top: 20px;
color: white;
cursor: pointer;
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
// 충전하기
export const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      impUid
      amount
      balance
    }
  }
`;

export const FETCH_POINT_TRANSACTIONS_OF_LOADING = gql`
    query fetchPointTransactionsOfLoading($search: String, $page: Int){
      fetchPointTransactionsOfLoading(search: $search, page: $page){
        _id
        impUid
        amount
        balance
        user {
          email
          name
        }
        createdAt
      }
    }
`
declare const window: typeof globalThis & {
    IMP:  any
}

export default function LayoutHeader(){

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const { data } = useQuery(FETCH_USER_LOGGED_IN)

    // 장바구니 상품
  const [basketItems, setBasketItems] = useRecoilState(basketaaa);

  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    setBasketItems(baskets);
  }, []);

    const onClicktoLogin = () => {
        router.push('/login')
    }

    const onClicktoJoin = () => {
        router.push('/join')
    }

    // 충전모달
    const onToggleModal = () => {
        setIsOpen(true)
    }

    const handleOk = () => {
      setIsOpen(false);
    };
  
    const handleCancel = () => {
      setIsOpen(false);
    };

    const [amount, setAmount] = useState(0)
    
    const onChangeOption = (event) => {
      let value = Number(event.target.value)
      setAmount(value)
    };

     const [ createPointTransactionOfLoading ] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING)


    // 충전하기
    const requestPay = () => {   
      setIsOpen(false)     
        const IMP = window.IMP; // 생략 가능
        IMP.init("imp49910675"); // Example: imp00000000
        
      // IMP.request_pay(param, callback) 결제창 호출
      IMP.request_pay({ // param
        pg: "html5_inicis",
        pay_method: "card",
        // merchant_uid: "ORD20180131-0000011", 중복되면 안됨 없으면 랜덤으로 생성됨
        name: "seoulOwlPoint",
        amount: amount,
        buyer_email: "suri@suri.com",
        buyer_name: "수리",
        buyer_tel: "010-4242-4242",
        buyer_addr: "코드캠프",
        buyer_postcode: "01181",
        m_redirect_url:'http:localhost:3000/market'
      }, 
       (rsp:any) => { // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
            try{
                const point = createPointTransactionOfLoading({
                    variables : {
                        impUid : rsp.imp_uid,
                    }
                })
                Modal.success({ content: "포인트 충전이 완료되었습니다!" });
                
            } catch(error){
            if(error instanceof Error)
                Modal.error({ content: error.message });
            }
          console.log(rsp)
          // 백엔드에 결제 관련 데이터 넘겨주기(-> 뮤테이션 실행하기)
          // ex. createTransactionOfLoading
        } else {
          // 결제 실패 시 로직,
          alert("결제에 실패했습니다. 다시 시도해주세요.")
        }
        
      });
    }

    const [ accessToken, setAccessToken ] = useRecoilState(accessTokenState)
   
    const onClickLogOut = () => {
        localStorage.removeItem("accessToken")
        setAccessToken("")
    }



    return(
         <Wrapper>
         <Head>
            {/* <!-- jQuery --> */}
            <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>
            {/* <!-- iamport.payment.js --> */}
            <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>

        </Head>
          {isOpen && (
          <Modal visible={isOpen} onOk={handleOk} onCancel={handleCancel}>
            <SelectTitle>충전하실 금액을 선택해주세요!</SelectTitle>
            <Drop id="option" onChange={onChangeOption}>                                        
                <Option selected disabled>포인트 선택</Option>
                <Option value="100">100</Option>
                <Option value="500">500</Option>
                <Option value="2000">2,000</Option>
                <Option value="5000">5,000</Option>
            </Drop>
            <ChargeBtn onClick={requestPay}>충전하기</ChargeBtn>
          </Modal>
        )}
            <Label>{ accessToken ? (
          <Container>
            <div>
              {data?.fetchUserLoggedIn.name} 님의 포인트{" "}
              <Point>{data?.fetchUserLoggedIn.userPoint.amount}P</Point>
            </div>
            <Charge onClick={onToggleModal}>충전</Charge>
            <Charge onClick={onClickLogOut}>로그아웃</Charge>
          </Container>
        ) : (
          <Container>
            <Charge onClick={onClicktoLogin}>로그인</Charge>
            <Charge onClick={onClicktoJoin}>회원가입</Charge>
          </Container> 
        )}
        
        </Label>
                <Basket>
                    <BLabel>장바구니</BLabel>
                    <BasketLength>{basketItems.length}</BasketLength>
                </Basket>
            </Wrapper>

    )

}