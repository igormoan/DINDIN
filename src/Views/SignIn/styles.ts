import styled from "styled-components";

export const SignInContainer = styled.div`
    display: flex;
    justify-content: space-around;
    max-height: 100vh;
    margin-top: 40px;
    



    h1{
        font-size: ${({theme}) => theme.fontSizes.title};
        color: white;
        span{
            color: ${(props) => props.theme.colors.grayBlue};
        }
    }

    h2{
        color: white;
        font-size: ${({theme}) => theme.fontSizes.subTitle};
    }

    .login-title{
        margin-top: 30px;
        margin-bottom: 28px;
        color: ${(props) => props.theme.colors.grayBlue};
    }


    .title{

        padding-top: 50px;
        padding-left: 50px;


        width: 50vw;
        height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        gap: 32px;
        align-items: center;
        
    }

    .login{
        background-color: white;
        width: 413px;
        height: 435px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 20px;

        button{
            margin-top: 28px;
        }
    }
`