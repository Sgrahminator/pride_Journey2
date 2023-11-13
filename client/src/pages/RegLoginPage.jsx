import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';

const RegLoginPage = () => {
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate('/home');
    };

    const handleRegistrationSuccess = () => {
        setRegistrationSuccess(true);
    };

    return (
        <div>
        <h1>Welcome to Pride Journey</h1>

        <div>
            <h2>Register</h2>
            <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
            {registrationSuccess && <p>Registered successfully. Please log in.</p>}
        </div>

        <div>
            <h2>Login</h2>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
        </div>
    );
};

export default RegLoginPage;
