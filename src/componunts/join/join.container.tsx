import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../commons/store";
import JoinUI from "./join.presenter";
import { CREATE_USER } from "./join.queries";
import "antd/dist/antd.css";

export default function Join(){
     const router = useRouter()

    const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

    const [createUser] = useMutation(CREATE_USER);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [name, setName] = useState("")
    const [inputErrors, setInputErrors] = useState({
        email:"",
        password:"",
        passwordAgain:"",
        name:""        
    });

    const onChangeEmail = (event) =>{
        setEmail(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };    
    const onChangePasswordAgain = (event) => {
        setPasswordAgain(event.target.value);
    };  

    const onChangeName = (event) => {
        setName(event.target.value);
    };   

   const onClickJoin = async() => {     
    setInputErrors({
      email: email ? "" : "이메일을 입력해주세요.",
      password: password ? "" : "비밀번호를 입력해주세요.",
      passwordAgain: passwordAgain ? "" : "비밀번호를 다시 입력해주세요.",
      name: name ? "" : "이름을 입력해주세요.",
    });  
    try{
       const result =  await createUser({
            variables: { 
                createUserInput: {
                email,
                password,
                name,
            },
        },
        })
        


        let check = true
        const emailRule = /^\w+@\w+\.\w+/
    
        if(!emailRule.test(email)){
            Modal.error({
                content: "이메일이 올바르지 않습니다.", 
            });
            check = false
        } 

        if(password.length < 4 || password.length > 20){
            Modal.error({
                content: "비밀번호가 올바르지 않습니다.", 
            });
            check = false
        }

        if(password !== passwordAgain){
            Modal.error({
                content: "비밀번호가 일치하지 않습니다.", 
            });
            check = false            
        }
        if(check === true){
            setAccessToken(accessToken);
            Modal.success({
                content: `회원가입을 환영합니다!`,
            });
            router.push("/login")
        }
    } catch(error){
        if(error instanceof Error)
        Modal.error({
                content: error.message,
            });
    }
    }

    const onClickCancel = () =>{
        router.back()
    }
    const onClickToLogin = () =>{
        router.push('login')
    }
    
    return(
        <JoinUI 
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onChangePasswordAgain={onChangePasswordAgain}
        onChangeName={onChangeName}
        onClickJoin={onClickJoin}
        inputErrors={inputErrors}
        onClickCancel={onClickCancel}
        onClickToLogin={onClickToLogin}
        />
    )
}