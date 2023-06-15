import { FormEvent } from "react";
import * as Styles from "./styles";
import Input from "../../components/Input";
import ButtonForm from "../../components/ButtonForm";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";


export default function SignIn() {
  const { signIn } = useAuth();
  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    signIn({
      email: form.get("email") as string,
      senha: form.get("senha") as string,
    });
  }
  return (
    <Styles.SignInContainer>
      <div className="title">
 
        <h1>
          Controle suas <span>finanças</span>, sem planilha chata.
        </h1>
        <h2>
          Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem
          tudo num único lugar e em um clique de distância.
        </h2>
        <Link to="signup">
          <ButtonForm>Cadastre-se</ButtonForm>
        </Link>
      </div>
      <div className="login">
        <h2 className="login-title">login</h2>
        <form onSubmit={handleLogin}>
          <Input name="email" label="E-mail" type="email" />
          <Input name="senha" label="Password" type="password" />
          <ButtonForm>Entrar</ButtonForm>
        </form>
      </div>
    </Styles.SignInContainer>
  );
}
