import './style.css';
import HeaderLogin from '../../components/Header-Login';
import SignInForm from '../../components/FormSignIn';

function LoginScreen() {

    return (
        <div className='container-main'>
            <HeaderLogin />
            <SignInForm />
            <div>
            </div>
        </div>
    )
}

export default LoginScreen;

