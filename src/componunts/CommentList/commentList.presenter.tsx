import InfiniteScroll from "react-infinite-scroller";
import CommentReadUIitem from "./commentList.presenterItem";
export default function CommentReadUI(props){

    return(
        <>
        {/* 무한스크롤 */}
            <div style={{ height:"700px", overflow:"auto" }}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={props.onLoadMore}
                    hasMore={true}
                    useWindow={false}
                >
                {props.data?.fetchUseditemQuestions.map((el:any) => (
                    <CommentReadUIitem  key={String(el?._id)} 
                    el={el}
                    data={props.data}  
                    onClickDelete={props.onClickDelete}  
                    userData={props.userData}             
                />                   
                ))}
                </InfiniteScroll>
                </div>
        </>
    )
}