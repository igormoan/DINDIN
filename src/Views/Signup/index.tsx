import React, { FormEvent } from "react";
import * as Styles from "./styles";
import Input from "../../components/Input";
import ButtonForm from "../../components/ButtonForm";
import { useAuth } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Signup() {
  const { signUp } = useAuth();

  function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("senha") != form.get("confirmacao")) {
      alert("As senhas não coincidem");
      return;
    }
    signUp({
      email: form.get("email") as string,
      senha: form.get("senha") as string,
      nome: form.get("nome") as string,
    });
  }

  return (

    <Styles.SignupContainer>
   
      <form onSubmit={handleSignUp}>
   
        <h1>Cadastre-se</h1>
        <Input name="nome" label="nome" type="text" />
        <Input name="email" label="E-mail" type="email" />
        <Input name="senha" label="senha" type="password" />
        <Input name="confirmacao" label="confirme a senha" type="password" />
        <ButtonForm>Cadastrar</ButtonForm>
        <Link to="/">Você já tem cadastro? clique aqui</Link>
      </form>
    </Styles.SignupContainer>
  );
}
