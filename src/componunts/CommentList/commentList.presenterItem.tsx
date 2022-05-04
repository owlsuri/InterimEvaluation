import * as S from '../detail/detail.styles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { getDate } from '../../../src/commons/libraries/utils'
import CommentWrite from '../CommentWrite/commentWrite.container';

export default function CommentReadUIitem(props){
    const [isEdit, setIsEdit] = useState(false);

    const onClickEdit = () => {
        setIsEdit(true);
    };

    console.log(props.data.user)

    return(
        <>
        {!isEdit && (
                <S.CommentShow>
                <S.CommentUser>
                    <S.CUserImg></S.CUserImg>
                    <S.CUserInfo>
                        <div>
                            <S.CUserName>{props.el.user.name}</S.CUserName>
                            <S.CreatedAt>{getDate(props.el?.createdAt)}</S.CreatedAt>
                        </div>
                        <S.IconBox>
                            <FontAwesomeIcon onClick={onClickEdit} icon={faPencil}  color="#BDBDBD" />
                                <FontAwesomeIcon id={props.el._id} onClick={props.onClickDelete} icon={faX} color="#BDBDBD" />
                        </S.IconBox>
                    </S.CUserInfo>
                </S.CommentUser>
                    <S.CommentContents>{props.el?.contents}</S.CommentContents>
            </S.CommentShow>
        )}
        {isEdit && (
            <CommentWrite isEdit={true} setIsEdit={setIsEdit} el={props.el} />
        )}
            </>
    )
}