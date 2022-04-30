import { useEffect } from 'react';
import Input01 from '../../commons/inputs/01'
import Uploads01 from '../../commons/uploads/01/Uploads01.container';
import * as S from './write.styles'
import {v4 as uuidv4} from 'uuid'
import KakaoMapPage from '../../commons/kakaoMap/kakaomap.container';


export default function MarketWriteUI(props){
        useEffect(() => {
        props.reset({ contents: props.data?.fetchUseditem.contents });
    }, [props.data]);

    return(
        <S.Wrapper>
            <S.Title>{props.isEdit ? "상품 수정" : "상품 등록"}</S.Title>
            <form onSubmit={props.handleSubmit(props.onClickSubmit)} >
            <S.Container>
                <S.Block>
                    <S.Label>상품이름 </S.Label>
                <div>
                    <Input01 
                    mytype="text" register={props.register("name")}
                                defaultValue={props.data?.fetchUseditem.name}   
                                placeholder="상품명을 작성해주세요." /><br/>
                </div>
                </S.Block>
                <S.Block>
                    <S.Label>한줄요약</S.Label>
                <div>
                    <Input01 mytype="text" register={props.register("remarks")} 
                            defaultValue={props.data?.fetchUseditem.remarks}
                            placeholder="상품을 한줄로 요약해서 작성해주세요." 
                            defaultValues={props.data?.fetchUseditem.remarks}/><br/>
                </div>
                </S.Block>
                <S.Block>
                    <S.Label1>상품설명</S.Label1>
                <div>
                    <div style={{height : "430px", width:"1117px"}}>
                    <props.ReactQuill 
                    style ={{height:"75%"}}
                    onChange={props.onChangeContents}  
                    value={props.getValues("contents") || ""}/><br/>
                    </div>
                </div>
                </S.Block>
                <S.Block>
                    <S.Label>판매가격</S.Label>
                <div>
                    <Input01 mytype="number" register={props.register("price")} 
                            defaultValue={props.data?.fetchUseditem.price || ""}
                            placeholder="판매가격을 입력주세요." /><br/>
                </div>
                </S.Block>
                <S.Block>
                    <S.Label>태그입력</S.Label>
                <div>
                <S.TagInput type="text" {...props.register("tags")} 
                        onKeyUp={props.onKeyUpHash}
                        />
                </div>  
            </S.Block>
            <S.Tags>
                {props.hashArr.map((el: any, idx: any) => (
                <div key={idx}>{el}</div>
                ))}</S.Tags>            
            <S.Block>
                <S.Label>거래위치</S.Label>
            <S.Location>
                <KakaoMapPage />
            </S.Location>
           </S.Block>
                <S.Label>사진첨부</S.Label>
                          {props.fileUrls.map((el, index) => (
                            <Uploads01
                            type="button"
                            key={uuidv4()}
                            index={index}
                            fileUrl={el}
                            onChangeFileUrls={props.onChangeFileUrls}
                            />
                        ))}
            <S.BtnBox>
                <S.SubmitBtn onClick={props.onClickSubmit}> {props.isEdit ? "수정" : "등록"}</S.SubmitBtn>
                <S.CancelBtn onClick={props.onClickCancel}>취소</S.CancelBtn>
            </S.BtnBox>
        </S.Container>
        </form>
    </S.Wrapper>
    )
}