import styled from "@emotion/styled";

const Button = styled.button`
    width: 195px;
    height: 77px;
    border: none;
    color: white;
    font-weight: 600;
    
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    
    background-color: black;
`;

export default function Button01(props) {
  return <Button isActive={props.isActive}>{props.title}</Button>;
}
