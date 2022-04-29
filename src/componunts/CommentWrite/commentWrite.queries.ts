// 마켓 댓글 QnA 쿼리
import { gql } from "@apollo/client";


export const CREATE_USED_ITEM_QUESTION = gql`
    mutation createUseditemQuestion($createUseditemQuestionInput:CreateUseditemQuestionInput!, $useditemId: ID!){
        createUseditemQuestion(createUseditemQuestionInput:$createUseditemQuestionInput, useditemId:$useditemId){
            _id 
            contents 
            user{
                _id
                email
                name
            } 
            createdAt 
        }
    }
` 

export const UPDATE_USED_ITEM_QUESTION = gql`
    mutation updateUseditemQuestion($updateUseditemQuestionInput:UpdateUseditemQuestionInput!, $useditemQuestionId: ID!){
        updateUseditemQuestion(UpdateUseditemQuestionInput:$UpdateUseditemQuestionInput, useditemQuestionId:$useditemQuestionId){
            _id 
            contents 
            user{
                _id
                email
                name
            } 
            createdAt 
        }
    }
` 
export const FETCH_USED_ITEM_QUESTIONS = gql`
    query fetchUseditemQuestions($page: Int, $useditemId: ID!){
        fetchUseditemQuestions(page:$page, useditemId:$useditemId){
            _id 
            user{
                _id
                email
                name
            } 
            contents 
            createdAt 
        }
    }
`

export const UPDATE_USEDITEM_QUESTION = gql`
  mutation updateUseditemQuestion(
    $updateUseditemQuestionInput: UpdateUseditemQuestionInput!
    $useditemQuestionId: ID!
  ) {
    updateUseditemQuestion(
      updateUseditemQuestionInput: $updateUseditemQuestionInput
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
      contents
      user {
        name
      }
    }
  }
`;