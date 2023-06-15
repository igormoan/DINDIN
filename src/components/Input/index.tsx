import React from "react";
import * as Styles from "./styles";

interface InputProps {
  name: string;
  label: string;
  type: string;
  value?: string;
  onChange?: (event: any) => void;
}

export default function Input(props: InputProps) {
  return (
    <Styles.InputContainer>
      <label>{props.label}</label>
      <input
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    </Styles.InputContainer>
  );
}
