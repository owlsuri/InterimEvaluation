import * as S from './login.styles'

export default function LoginUI(props){

    return(
        <S.Wrapper>
            <S.Header>
                <S.Logo src="/whitelogo 1.png"/>
            </S.Header>
            <S.Container>
                <S.Title>
                    <S.Main>로그인</S.Main><S.MainEn>Login</S.MainEn>
                </S.Title>
                <S.InputBox>
                    <S.Inputs>
                        <S.Input onChange={props.onChangeEmail} type="text" placeholder='아이디'/>
                        <S.Error>{props.emailError}</S.Error>
                    </S.Inputs>
                    <S.Inputs>
                    <S.Input onChange={props.onChangePassword} type="password" placeholder='비밀번호'/>
                    <S.Error>{props.passwordError}</S.Error>
                    </S.Inputs>
                    <S.LBtn onClick={props.onClickLogin}>로그인</S.LBtn>
                    <S.JoinBox>
                        <S.Not>아직 계정이 없으신가요?</S.Not>
                        <S.Join onClick={props.onClickToJoin}>회원가입</S.Join>
                    </S.JoinBox>
                </S.InputBox>
            </S.Container>
        </S.Wrapper>
    )

}