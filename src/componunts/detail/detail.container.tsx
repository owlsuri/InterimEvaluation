import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import UsedItemReadUI from "./detail.presenter";
import { CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING, DELETE_USEDITEM, FETCH_USEDITEM_QUESTIONS, FETCH_USED_ITEM, FETCH_USER_LOGGED_IN, TOGGLE_USEDITEM_PICK } from "./detail.queries";
import "antd/dist/antd.css";
import { useState } from "react";
import { useAuth } from "../../commons/hooks/useAuth";
import { useRecoilState } from "recoil";
import { basketaaa } from "../../commons/store";

export default function UsedItemRead(){

  useAuth()

    const router = useRouter()
    const { data:userData } = useQuery(FETCH_USER_LOGGED_IN)

    const [deleteUseditem] = useMutation(DELETE_USEDITEM);
    const { data } = useQuery(FETCH_USED_ITEM,{
      variables: { useditemId : router.query.useditemId },
    });
    const {data:commentData} = useQuery(FETCH_USEDITEM_QUESTIONS,{
         variables:{ useditemId: String(router.query.useditemId)  }
    })

    const [createPointTransactionOfBuyingAndSelling] = useMutation(CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING)

    const [toggleUsedItemPick] = useMutation(TOGGLE_USEDITEM_PICK);
    
    // 장바구니에 담기
    const [basketItems, setBasketItems] = useRecoilState(basketaaa);

    const onClickBasket = (el) => () =>{
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]")
    console.log(baskets)

    const temp = baskets.filter((basketEl) => basketEl._id === el._id)

     if(temp.length === 1){
         Modal.error({ content: "이미 장바구니에 담겨있습니다." });
        return 
    }

    const {__typename, ...newEl} = el;
        baskets.push(newEl)
        localStorage.setItem("baskets", JSON.stringify(baskets))
        setBasketItems(baskets)

        Modal.success({ content: "장바구니에 담았습니다." });

        
    }

      // 찜하기
  const onClickPick = async () => {
    try {
      await toggleUsedItemPick({
        variables: { useditemId: String(router.query.useditemId) },
        refetchQueries: [{
                    query: FETCH_USED_ITEM,
                    variables: { useditemId: String(router.query.useditemId) },
                    },
                ],
      });
    } catch (error) {
        if(error instanceof Error)
        Modal.error({
          content: error.message,
        });
    }
  };

    const onClickMoveEdit = () => {
        router.push(`/market/${router.query.useditemId}/edit`)
    }

        const onClickDelete = async() => {
        try{
        const result = await deleteUseditem({
            variables:{ useditemId : router.query.useditemId }
        })
        Modal.success({
              content: '삭제가 완료되었습니다!',
        });
        router.push(`/`);
        } catch (error) {
        if(error instanceof Error)
        Modal.error({
          content: error.message,
        });
      }
    }

    // 결제하기
    const onClickPay = async() => {
      if(userData?.fetchUserLoggedIn?.userPoint.amount >= data?.fetchUseditem?.price){
         try{
                const pay = await createPointTransactionOfBuyingAndSelling({
                    variables : {
                        useritemId : router.query.useditemId,
                    },
                    refetchQueries: [
                    {
                      query: FETCH_USER_LOGGED_IN,
                      variables: { useditemId: router.query.useditemId },
                    },
                  ]
                })
                console.log(pay)
                Modal.success({ content: "결제가 완료되었습니다!" });
            } catch(error){
            if(error instanceof Error)
                Modal.error({ content: error.message });
            }
           } else {
        Modal.error({ content: "충전을 먼저 해주세요" });
        router.back()
      }
    }

    return(
        <>
        <UsedItemReadUI 
        onClickPick={onClickPick}
        onClickBasket={onClickBasket}
        data={data}
        userData={userData}
        commentData={commentData}
        onClickMoveEdit={onClickMoveEdit}
        onClickDelete={onClickDelete}
        onClickPay={onClickPay}
        />
        </>
    )

}