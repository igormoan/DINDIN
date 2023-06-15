import styled from "styled-components";

export const ButtonFormContainer = styled.button` 
border: none;
width: 284px;
left: 105px;
top: 626px;
color: white;
min-height: 48px;
max-height: 48px;

border-radius: 5px;

background-color: ${(props)=>props.theme.colors.grayBlue};
cursor: pointer;
&:hover{
    filter: brightness(1.2);
}

`