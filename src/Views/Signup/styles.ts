import styled from "styled-components";

export const SignupContainer = styled.div`
position: absolute;
left: 50%;
transform: translateX(-50%) scale(0.9);
top: 80px;

width: 500px;

background-color: white;

form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 32px 16px;
}

color: ${(props) => props.theme.colors.grayBlue};

a:hover{
    filter: brightness(1.2);
    cursor: pointer;
}
`
