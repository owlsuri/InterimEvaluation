import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { useState } from "react";
import CommentWriteUI from "./commentWrite.presenter";
import { CREATE_USED_ITEM_QUESTION, FETCH_USED_ITEM_QUESTIONS, UPDATE_USEDITEM_QUESTION } from "./commentWrite.queries";

export default function CommentWrite(props){

    const router = useRouter()

    const [contents, setContents] = useState("");

    const [createUseditemQuestion] = useMutation(CREATE_USED_ITEM_QUESTION)

    const [updateUseditemQuestion] = useMutation(UPDATE_USEDITEM_QUESTION);

    const { data } = useQuery(FETCH_USED_ITEM_QUESTIONS, {
        variables: {useditemId:router.query.useditemId},
    })
    
    const onChangeContents = (event) => {
        setContents(event.target.value);
    };

        const onClickAsk = async() => {
        try{
        const result = await createUseditemQuestion({
            variables:{
                createUseditemQuestionInput:{
                    contents
                },
                useditemId: String(router.query.useditemId)
            },
            refetchQueries: {
                query : FETCH_USED_ITEM_QUESTIONS,
                variables : { useditemId : router.query.useditemId },
            },
        })
        Modal.success({
                content: '문의 등록이 완료되었습니다!',
            });
            
        router.push(`/market/${router.query.useditemId}`);
        setContents("")
    }catch(error){
        if (error instanceof Error)
        Modal.error({
            content: error.message,
        });
    }
    }

    const onClickUpdateQna = async() => {

    if (!contents) {
        Modal.error({ content: "수정된 내용이 없습니다." });
        return
    }

    try{
    const result2 = await updateUseditemQuestion({
        variables: {
                updateUseditemQuestionInput: { 
                    contents 
                    },
                useditemQuestionId: props.el?._id,
                },
            })
    props.setIsEdit(false)
    Modal.success({
                content: '문의 수정이 완료되었습니다!',
            });
        } catch(error){
            if (error instanceof Error)
            Modal.error({
                content: error.message,
            })
        }
    }


    return(
        <CommentWriteUI 
        onChangeContents={onChangeContents}
        onClickAsk={onClickAsk}
        onClickUpdateQna={onClickUpdateQna}
        data={data}
        isEdit={props.isEdit}
        el={props.el}
        contents={contents}
        />
    )
}