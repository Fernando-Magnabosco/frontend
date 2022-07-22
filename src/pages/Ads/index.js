import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdItem from "../../components/partials/AdItem";
import { PageContainer } from "../../components/mainComponents";
import { PageArea, SearchArea } from "./styled";

import useApi from "../../helpers/olxAPI";

let timer;
const itemPerPage = 2;

const Page = () => {
    const api = useApi();
    const navigate = useNavigate();

    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQueryString();

    const [q, setQ] = useState(query.get("q") != null ? query.get("q") : "");
    const [cat, setCat] = useState(
        query.get("cat") != null ? query.get("cat") : ""
    );
    const [qState, setQstate] = useState(
        query.get("state") != null ? query.get("state") : ""
    );

    const [totalAds, setTotalAds] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ads, setAds] = useState([]);
    const [opacity, setOpacity] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(true);

    const getAdsList = async () => {
        setLoading(true);
        let offset = (currentPage - 1) * itemPerPage;

        const json = await api.getAds({
            sort: "desc",
            limit: itemPerPage,
            q,
            cat,
            state: qState,
            offset,
        });
        setAds(json.ads);
        setTotalAds(json.total);
        setOpacity(1);
        setLoading(false);
    };

    useEffect(() => {
        if (ads.length === 0) {
            setPageCount(0);
            return;
        }

        setPageCount(Math.ceil(totalAds / itemPerPage));
        if (pageCount > 10) setPageCount(10);
    }, [totalAds]);

    useEffect(() => {
        setOpacity(0.3);
        getAdsList();
    }, [currentPage]);

    useEffect(() => {
        let queryString = [];

        if (q) queryString.push(`q=${q}`);
        if (cat) queryString.push(`cat=${cat}`);
        if (qState) queryString.push(`state=${qState}`);

        navigate(`/ads?${queryString.join("&")}`);

        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 500);
        setOpacity(0.3);
        setCurrentPage(1);
    }, [q, cat, qState]);

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        };
        getStates();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const clist = await api.getCategories();
            setCategories(clist);
        };
        getCategories();
    }, []);

    let pagination = [];

    for (let i = 0; i < pageCount; i++) {
        pagination.push(i + 1);
    }

    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        <input
                            type="text"
                            name="query"
                            placeholder="O que você procura?"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />

                        <div className="filterName">Estado:</div>
                        <select
                            name="state"
                            value={qState}
                            onChange={(e) => setQstate(e.target.value)}
                        >
                            <option></option>
                            {stateList.map((state, index) => (
                                <option key={index} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </select>

                        <div className="filterName">Categoria:</div>

                        <ul>
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    className={
                                        cat == category.slug
                                            ? "categoryItem active"
                                            : "categoryItem"
                                    }
                                    onClick={() => {
                                        if (cat == category.slug) setCat("");
                                        else setCat(category.slug);
                                    }}
                                >
                                    <img src={category.img} alt=""></img>
                                    <span> {category.name} </span>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>

                <div className="rightSide">
                    <h2>Resultados</h2>
                    {loading && ads.length === 0 && (
                        <div className="listWarning"> Carregando... </div>
                    )}
                    {!loading && ads.length == 0 && (
                        <div className="listWarning">
                            {" "}
                            Nenhum resultado encontrado{" "}
                        </div>
                    )}
                    <div className="list" style={{ opacity: opacity }}>
                        {ads.map((ad, index) => (
                            <AdItem key={index} ad={ad} />
                        ))}
                    </div>

                    {pageCount > 1 && (
                        <div className="pagination">
                            {pagination.map((page, index) => (
                                <div
                                    onClick={() => setCurrentPage(page)}
                                    key={index}
                                    className={
                                        page === currentPage
                                            ? "pageItem active"
                                            : "pageItem"
                                    }
                                >
                                    {page}
                                </div>
                            ))}

                            <div
                                onClick={() => {
                                    if (currentPage < pageCount)
                                        setCurrentPage(currentPage + 1);
                                }}
                                className={
                                    "pageItem wide" +
                                    (currentPage === pageCount
                                        ? " disabled"
                                        : "")
                                }
                            >
                                {" "}
                                Próxima Página{" "}
                            </div>
                        </div>
                    )}
                </div>
            </PageArea>
        </PageContainer>
    );
};

export default Page;
