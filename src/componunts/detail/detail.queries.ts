// 중고마켓 페치 쿼리
import { gql } from "@apollo/client";

export const FETCH_USED_ITEM = gql`
    query fetchUseditem($useditemId: ID!){
        fetchUseditem(useditemId:$useditemId){
                _id
                name
                remarks
                contents
                price
                tags
                createdAt
                images
                pickedCount
                useditemAddress {
                  zipcode
                  address 
                  addressDetail
                }
        }
    }
`

export const DELETE_USEDITEM = gql`
    mutation deleteUseditem($useditemId: ID!){
        deleteUseditem(useditemId:$useditemId)
    }
`

// 찜하기
export const TOGGLE_USEDITEM_PICK = gql`
  mutation toggleUseditemPick($useditemId: ID!) {
    toggleUseditemPick(useditemId: $useditemId)
  }
`;

// 결제하기 쿼리
export const CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!){
    createPointTransactionOfBuyingAndSelling(useritemId:$useritemId){
      _id
    }
  }
` 

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
export const FETCH_USEDITEM_QUESTIONS = gql`
  query fetchUseditemQuestions($page: Int, $useditemId: ID!) {
    fetchUseditemQuestions(page: $page, useditemId: $useditemId) {
      _id
      contents
      user {
        name
      }
      createdAt
    }
  }
`;

export const DELETE_USEDITEM_QUESTION = gql`
  mutation deleteUseditemQuestion($useditemQuestionId: ID!) {
    deleteUseditemQuestion(useditemQuestionId: $useditemQuestionId)
  }
`;