import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      userPoint {
        _id
        amount
      }
    }
  }
`;


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

export default function PointPaymentPage(){

    const router = useRouter()

    const [ createPointTransactionOfLoading ] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING)
    // 충전 State
    const [ amount, setAmount ] = useState(100)

    // 충전하기
    const requestPay = () => {        
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
                console.log(point)
                Modal.success({ content: "포인트 충전이 완료되었습니다!" });
                router.push('/mypage')
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
    const onChangeOption = (event) => {
        const value = Number(event.target.value)
        setAmount(value)
    }

    return(
        <div></div>
    )
}