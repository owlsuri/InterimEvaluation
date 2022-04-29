import { GraphQLClient, gql } from 'graphql-request'; 

  const RESTORE_ACCESS_TOKEN = gql`
    mutation restoreAccessToken{
      restoreAccessToken{
        accessToken
      }
    }
  `


export async function getAccessToken(){

    try{
        const graphQLClient = new GraphQLClient(
            "https://backend06.codebootcamp.co.kr/graphql",
            // cookie의 secure 쓰기위해 https로 바꿈
            { credentials: "include"}            
            )
            const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN)
            const newAccessToken = result.restoreAccessToken.accessToken
            return newAccessToken

    } catch(error){
        console.log(error.message)
    }
}