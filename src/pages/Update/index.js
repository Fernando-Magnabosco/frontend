import React, { useState, useEffect } from "react";

import {
    PageContainer,
    PageTitle,
    ErrorMessage,
} from "../../components/mainComponents";

import { PageArea } from "./styled";

import useApi from "../../helpers/olxAPI";

const Page = () => {
    const api = useApi();

    const [disabled, setDisabled] = useState(false);

    const [name, setName] = useState("");
    const [stateLoc, setStateLoc] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [stateList, setStateList] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Senhas não correspondem");
            setDisabled(false);
            return;
        }

        const json = await api.updateUser({
            name: name.length > 0 ? name : undefined,
            stateLoc: stateLoc.length > 0 ? stateLoc : undefined,
            email: email.length > 0 ? email : undefined,
            password: password.length > 0 ? password : undefined,
        });

        if (json.error) {
            console.log(json.error);
            setError(json.error);
            setDisabled(false);
        } else window.location.href = "/";

        setDisabled(false);
        return;
    };

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        };
        getStates();
    }, [api]);

    return (
        <PageContainer>
            <PageTitle>Atualização de Cadastro</PageTitle>

            <PageArea>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title ">Nome</div>
                        <div className="area--input">
                            <input
                                type="text"
                                disabled={disabled}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title ">Email</div>
                        <div className="area--input">
                            <input
                                type="email"
                                disabled={disabled}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select
                                onChange={(e) => setStateLoc(e.target.value)}
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
                        <div className="area--title ">Senha</div>
                        <div className="area--input">
                            <input
                                type="password"
                                disabled={disabled}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title ">Confirme a senha</div>
                        <div className="area--input">
                            <input
                                type="password"
                                disabled={disabled}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>
                                {" "}
                                Alterar Cadastro{" "}
                            </button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
};
export default Page;
