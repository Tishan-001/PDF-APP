import { useState, useEffect } from "react";
import { message } from "antd";
import { useAuth } from '../Contexts/AuthContext.jsx';

const useLogin = () =>{
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginUser = async (values) => {
        try {
            setError(null);
            setLoading(true);

            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if (res.ok) {
                if (data.status === 'success') {
                    message.success(data.message);
                    login(data.token, data.user);
                } else {
                    message.error(data.message);
                }
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            message.error(error.message);
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

    return { loading, error, loginUser };
};

export default useLogin;
