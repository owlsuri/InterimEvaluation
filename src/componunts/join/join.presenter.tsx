import * as S from './join.styles'

export default function JoinUI(props){
    
    return(
        <S.Wrapper>
            <S.Header>
                <S.Logo src="/whitelogo 1.png"/>
            </S.Header>
            <S.Container>
                <S.Title>
                    <S.Main>회원가입</S.Main><S.MainEn>Sign up</S.MainEn>
                </S.Title>
                <S.InputBox>
                    <S.Inputs>
                        <S.Label>아이디</S.Label>
                        <S.Box>
                        <S.Input onChange={props.onChangeEmail} type="text" placeholder='이메일 아이디를 @까지 정확하게 입력하세요.'/>
                        <S.Error>{props.inputErrors.email}</S.Error>
                        </S.Box>
                    </S.Inputs>
                    <S.Inputs>
                        <S.Label>비밀번호</S.Label>
                        <S.Box>
                    <S.Input onChange={props.onChangePassword} type="password" placeholder='영문+숫자 조합 8~16 자리를 입력하세요.'/>
                    <S.Error>{props.inputErrors.password}</S.Error>
                    </S.Box>
                    </S.Inputs>
                    <S.Inputs>
                        <S.Label>비밀번호확인</S.Label>
                        <S.Box>
                    <S.Input onChange={props.onChangePasswordAgain} type="password" placeholder='영문+숫자 조합 8~16 자리를 입력하세요.'/>
                    <S.Error>{props.inputErrors.passwordAgain}</S.Error>
                    </S.Box>
                    </S.Inputs>
                    <S.Inputs>
                        <S.Label>이름</S.Label>
                        <S.Box>
                        <S.Input onChange={props.onChangeName} type="text" placeholder='ex) 홍길동'/>
                        <S.Error>{props.inputErrors.name}</S.Error>
                    </S.Box>
                    </S.Inputs>
                    <S.BtnBoxes>
                    <S.LBtn onClick={props.onClickJoin}>회원가입하기</S.LBtn>
                    <S.CBtn onClick={props.onClickCancel}>취소</S.CBtn>
                    </S.BtnBoxes>
                    <S.JoinBox>
                        <S.Not>이미 계정이 있으신가요? </S.Not>
                        <S.Join onClick={props.onClickToLogin}>로그인</S.Join>
                    </S.JoinBox>
                </S.InputBox>
            </S.Container>
        </S.Wrapper>
    )
}