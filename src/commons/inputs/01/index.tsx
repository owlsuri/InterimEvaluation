import styled from '@emotion/styled';



const Input = styled.input`
    width: 1117px;
    height: 56px;
    border: none;
    padding: 10px;
    background: #E9E9E9;
`

export default function Input01(props){
    
    return <Input placeholder={props.placeholder} defaultValue={props.defaultValue} type={props.mytype} {...props.register}/>
}