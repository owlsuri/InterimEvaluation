import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../commons/store";
import LoginUI from "./login.presenter";
import { LOGIN_USER } from "./login.queries";
import { Modal } from 'antd'
import "antd/dist/antd.css";

export default function Login(){

    const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

    const router = useRouter()
    const [loginUser] = useMutation(LOGIN_USER)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const onChangeEmail = (event) =>{
        setEmail(event.target.value)
        if (event.target.value !== "") {
        setEmailError("");
    }
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }; 

const onClickLogin = async() => {
      try{
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });
       const accessToken = result.data.loginUser.accessToken;
       localStorage.setItem("accessToken", accessToken);

        let check = true
        const emailRule = /^\w+@\w+\.\w+/

        if(!emailRule.test(email) || email === "" ){
            setEmailError("이메일 아이디를 @까지 정확하게 입력해주세요.")
            check = false
        } 

        if(password.length < 4 || password.length > 20){
            setPasswordError("영문+숫자 조합 8~16자리의 비밀번호를 입력해주세요.")
            check = false
        }

        if(check === true){
            setAccessToken(accessToken);
            Modal.success({
                content: '웰컴!',
            });
            router.push('/')
        }
    } catch(error){
        if(error instanceof Error)
        Modal.error({
                content: error.message,
            });
    }
    }


    const onClickToJoin =()=>{
        router.push("/join")
    }

    const onClickLogo =()=>{
        router.push("/")
    }
    return(
        <LoginUI 
        onClickToJoin={onClickToJoin}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onClickLogin={onClickLogin}
        emailError={emailError}
        passwordError={passwordError}
        onClickLogo={onClickLogo}
        />
    )

}