import * as S from '../detail/detail.styles'
export default function CommentWriteUI(props){

    return(
        <S.CommentInput>
            <S.Title>댓글</S.Title>
            <S.CommentSay type="text" 
                            maxlength={100} 
                            value={props.contents || props.el?.contents || ""}
                            onChange={props.onChangeContents}  /><br />
            <S.CommentBtn onClick={props.isEdit ? props.onClickUpdateQna : props.onClickAsk}>
                {props.isEdit ? "수정" : "작성"}하기</S.CommentBtn>
        </S.CommentInput>
    )
}