// 글로벌 스테이트
import { atom } from 'recoil'

export const accessTokenState = atom({
    key: "accessTokenState", 
    default:"", 
})