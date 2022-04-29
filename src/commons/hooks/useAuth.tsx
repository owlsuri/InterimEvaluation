import { useRouter } from "next/router"
import { useEffect } from "react"

export function useAuth(){

     const router = useRouter()

    // 권한 분기 로직 추가하기
        useEffect(()=>{
        if(!localStorage.getItem("accessToken")){
            alert("로그인 후 이용이 가능 합니다!")
            router.push("/login")
        }
    }, [])

}