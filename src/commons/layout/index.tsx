import LayoutHeader from "./header";
import LayoutBanner from "./banner"
import styled from "@emotion/styled";
import { useRouter } from "next/router";

    const BodyWrapper=styled.div`
        display: flex;
    `

    const Body=styled.div`

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
            <BodyWrapper> 
               <Body>{props.children}</Body>
            </BodyWrapper > 
        </>
    )
}