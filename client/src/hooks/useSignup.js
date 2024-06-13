import { useState, useEffect } from "react";
import { message } from "antd";
import { useAuth } from '../Contexts/AuthContext.jsx';

const useSignup = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const registerUser = async (values) => {
        if (values.password !== values.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            setError(null);
            setLoading(true);
            const res = await fetch('http://localhost:3000/api/auth/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if (res.status === 201) {
                message.success(data.message);
                login(data.token, data.user);
            } else if (res.status === 400) {
                setError(data.message);
                message.error(data.message);
            } else {
                setError('Registration failed');
                message.error('Registration failed');
            }
        } catch (err) {
            setError(err.message);
            message.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Use effect to handle messages outside render
    useEffect(() => {
        return () => {
            message.destroy();
        };
    }, []);

    return { loading, error, registerUser };
};

export default useSignup;
