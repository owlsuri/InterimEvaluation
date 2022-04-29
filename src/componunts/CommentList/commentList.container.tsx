import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { UPDATE_USEDITEM_QUESTION } from "../CommentWrite/commentWrite.queries";
import CommentReadUI from "./commentList.presenter";
import { DELETE_USEDITEM_QUESTION, FETCH_USEDITEM_QUESTIONS, FETCH_USER_LOGGED_IN } from "./commentList.queries";

export default function CommentRead(props){
    const router = useRouter()

    const [contents, setContents] = useState("");
    const [useditemQuestionId, setUseditemQuestionId] = useState("");
    
    const {data, fetchMore} = useQuery(FETCH_USEDITEM_QUESTIONS,{
        variables:{ useditemId: String(router.query.useditemId)  }
    })

    const { data:userData } = useQuery(FETCH_USER_LOGGED_IN)

    const [updateUseditemQuestion] = useMutation(UPDATE_USEDITEM_QUESTION);
    

    const [deleteUseditemQuestion] = useMutation(DELETE_USEDITEM_QUESTION)

        const onLoadMore = () => {
        if (!data) return;

        fetchMore({
        variables: { page: Math.ceil(data?.fetchUseditemQuestions.length / 10) + 1 },
        updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult?.fetchUseditemQuestions)
            return { fetchUseditemQuestions: [...prev.fetchUseditemQuestions] };
            return {
            fetchUseditemQuestions: [
                ...prev.fetchUseditemQuestions,
                ...fetchMoreResult.fetchUseditemQuestions,
            ],
            };
        },
        });
    };


    const onClickDelete = async(event) => {
        try{
        const result = await deleteUseditemQuestion({
            variables:{
                useditemQuestionId: event?.target.id,
            },
            refetchQueries: [{
                    query: FETCH_USEDITEM_QUESTIONS,
                    variables: { useditemId: router.query.useditemId },
                    },
                ],
        })
         setUseditemQuestionId("")

            Modal.success({
                content: '댓글 삭제가 완료되었습니다!',
            });
            router.push(`/market/${router.query.useditemId}`);

        } catch (error) {
            if(error instanceof Error)
            Modal.error({
                content: error.message,
            });
        }
        }



    return(
        <CommentReadUI
        data={data}
        onLoadMore={onLoadMore}
        onClickDelete={onClickDelete}
        userData={userData}
        />
    )
}