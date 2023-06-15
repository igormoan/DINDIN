import React from "react";
import * as Styles from "./styles";

interface ButtonFormProps {
  children: React.ReactNode;
}

export default function ButtonForm(props: ButtonFormProps) {
  return (
    <Styles.ButtonFormContainer>{props.children}</Styles.ButtonFormContainer>
  );
}
