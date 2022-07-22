import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeaderArea } from "./styled";
import useApi from "../../../helpers/olxAPI";
import { isLogged, doLogout } from "../../../helpers/authHandler";

const Header = () => {
    const api = useApi();

    const [userInfo, setuserInfo] = useState([]);

    const [logged, setLogged] = useState(isLogged());

    useEffect(() => {
        const getUserInfo = async () => {
            const user = await api.getUserInfo();

            setuserInfo(user);
        };

        if (logged) {
            getUserInfo();
        }
    }, [logged]);

    const handleLogout = () => {
        doLogout();
        window.location.href = "/";
    };

    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <span className="logo-O">O</span>
                        <span className="logo-L">L</span>
                        <span className="logo-X">X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged && (
                            <>
                                <li>
                                    <Link to="/my-account">
                                        <span>{userInfo.name}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/post-an-ad" className="button">
                                        Novo Anúncio
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                            </>
                        )}

                        {!logged && (
                            <>
                                <li>
                                    <Link to="/signin">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Cadastrar</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
};

export default Header;
