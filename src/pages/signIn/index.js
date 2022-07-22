import React, { useState, useEffect } from "react";
import { isLogged } from "../../helpers/authHandler";
import {
    PageContainer,
    PageTitle,
    ErrorMessage,
} from "../../components/mainComponents";
import { PageArea } from "./styled";

import useApi from "../../helpers/olxAPI";
import { doLogin } from "../../helpers/authHandler";

const Page = () => {
    const api = useApi();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberPassword, setRememberPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isLogged()) window.location.href = "/";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");

        const json = await api.login(email, password);

        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, rememberPassword);
            window.location.href = "/";
        }

        setDisabled(false);
        return;
    };

    return (
        <PageContainer>
            <PageTitle> Login </PageTitle>
            <PageArea>
                {error && !error.email && !error.password && (
                    <ErrorMessage>{error}</ErrorMessage>
                )}
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input
                                type="email"
                                disabled={disabled}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input
                                type="password"
                                disabled={disabled}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Lembrar Senha</div>
                        <div>
                            <input
                                type="checkbox"
                                disabled={disabled}
                                checked={rememberPassword}
                                onChange={() =>
                                    setRememberPassword(!rememberPassword)
                                }
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}> Login </button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
};

export default Page;
