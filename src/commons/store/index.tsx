// 글로벌 스테이트
import { atom } from 'recoil'

export const accessTokenState = atom({
    key: "accessTokenState", 
    default:"", 
})

export const basket = atom({
    key: "basketItems", 
    default:[], 
})

export const basketaaa = atom({
    key: "basketaaa", 
    default:[], 
})