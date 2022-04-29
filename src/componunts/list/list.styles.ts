import styled from "@emotion/styled";

export const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 1200px;
margin: 50px 0 0 110px;
`;

export const Container = styled.div`
display: grid;
grid-template-columns: 248px 248px 248px 248px 248px;
`;

export const Row = styled.div`
margin: 20px;
background: #FFFFFF;
:hover{
    box-shadow: 5px 5px 30px 5px rgba(0, 0, 0, 0.1);
}
border: 1px solid rgba(0, 0, 0, 0.1) ;
border-radius: 5px;
display: flex;
justify-content: center;
padding: 5px;
cursor: pointer;

`;
export const Img = styled.img`
width: 195px;
height: 210px;
margin-bottom: 10px;
padding-left: 10px;
`;
export const Info = styled.div`
padding: 5px;
display: flex;
flex-direction: row;
`;
export const Name = styled.div`
font-size: 19px;
font-weight: 700;
width: 200px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

`;

export const Price = styled.div`
font-size: 17px;
font-weight: 600;

`;
export const ItemInfo = styled.div`
padding: 10px;
width: 208px;
`;