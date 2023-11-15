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
        <div className="container">
            <h1 className="text-center my-4">Welcome to Pride Journey</h1>
        
            <div className="row">
                <div className="col-md-6">
                <h2>Register</h2>
                <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
                {registrationSuccess && <p className="alert alert-success">Registered successfully. Please log in.</p>}
                </div>
        
                <div className="col-md-6">
                <h2>Login</h2>
                <LoginForm onLoginSuccess={handleLoginSuccess} />
                </div>
            </div>
        </div>
    );
};

export default RegLoginPage;
