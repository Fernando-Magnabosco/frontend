import React, { useState, useEffect } from "react";

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

    const [name, setName] = useState("");
    const [stateLoc, setStateLoc] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");
    const [stateList, setStateList] = useState([]);

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        };
        getStates();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Senhas não correspondem");
            setDisabled(false);
            return;
        }

        const json = await api.signUp(name, stateLoc, email, password);

        if (json.error) {
            setError(json.error);
            setDisabled(false);
        } else {
            doLogin(json.token, false);
            window.location.href = "/";
        }

        setDisabled(false);
        return;
    };

    return (
        <PageContainer>
            <PageTitle> Cadastro </PageTitle>
            <PageArea>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Nome Completo </div>
                        <div className="area--input">
                            <input
                                type="text"
                                disabled={disabled}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select
                                value={stateLoc}
                                onChange={(e) => setStateLoc(e.target.value)}
                                required
                            >
                                <option>Selecione</option>
                                {stateList.map((state, index) => (
                                    <option key={index} value={state._id}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input
                                type="email"
                                disabled={disabled}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input
                                type="password"
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}> Cadastrar </button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
};

export default Page;
