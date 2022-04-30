import LayoutHeader from "./header";
import LayoutBanner from "./banner"
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Today from "./today";

    const BodyWrapper=styled.div`
        display: flex;
    `

    const Body=styled.div`

    `
    const Wrapper=styled.div`
        display: flex;
    `
    const TodayShown=styled.div`
        display: flex;
        width: 155px;
        height: 373px;
        border: 1px solid black;
        margin: 50px;
    `
    const HIDDEN_HEADERS = [
        "/login",
        "/join"
    ]

export default function Layout(props){
    const router=useRouter();
    const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath)

    return(
        <>
        {!isHiddenHeader && <LayoutHeader/>}
        {!isHiddenHeader && <LayoutBanner />}
        <Wrapper>
        <div>
            <BodyWrapper> 
               <Body>{props.children}</Body>
            </BodyWrapper > 
        </div>
        <TodayShown>
        {!isHiddenHeader && <Today />}
        </TodayShown>
        </Wrapper>
        </>
    )
}