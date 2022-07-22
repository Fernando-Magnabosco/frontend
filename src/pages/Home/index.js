import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AdItem from "../../components/partials/AdItem";
import { PageContainer } from "../../components/mainComponents";
import { PageArea, SearchArea } from "./styled";

import useApi from "../../helpers/olxAPI";

const Page = () => {
    const api = useApi();
    const [stateList, setStateList] = useState([]);

    const [categories, setCategories] = useState([]);
    const [categoriesShowing, setCategoriesShowing] = useState([]);

    const [ads, setAds] = useState([]);

    const [noPages, setNoPages] = useState(1);
    const [page, setPage] = useState(0);

    const categoriesPerPage = 4;

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        };
        getStates();
    }, []);

    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: "desc",
                limit: 8,
            });
            setAds(json.ads);
        };
        getRecentAds();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const clist = await api.getCategories();
            setCategories(clist);
        };
        getCategories();
    }, []);

    useEffect(() => {
        const offset = page * categoriesPerPage;

        setNoPages(Math.ceil(categories.length / categoriesPerPage));
        setCategoriesShowing(
            categories.slice(offset, offset + categoriesPerPage)
        );
    }, [categories]);

    useEffect(() => {
        const offset = page * categoriesPerPage;
        setCategoriesShowing(
            categories.slice(offset, offset + categoriesPerPage)
        );

        const timeout = setTimeout(() => {
            if (noPages) setPage((page + 1) % noPages);
            else setPage(1);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [page, categories]);

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input
                                name="q"
                                type="text"
                                placeholder="O que você procura?"
                            ></input>
                            <select name="state">
                                <option disabled value="">
                                    Selecione
                                </option>
                                {stateList.map((state, index) => (
                                    <option key={index} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                            <button> Pesquisar </button>
                        </form>
                    </div>
                    <div
                        className="categoryList"
                        onMouseEnter={() => {
                            const button =
                                document.getElementsByClassName("icon")[0];
                            button.style.display = "block";
                        }}
                        onMouseLeave={() => {
                            const button =
                                document.getElementsByClassName("icon")[0];
                            button.style.display = "none";
                        }}
                    >
                        {categoriesShowing.map((category, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={`/ads?cat=${category.slug}`}
                                    className="categoryItem"
                                >
                                    <img src={category.img} alt="" />
                                    <span> {category.name} </span>
                                </Link>
                            );
                        })}

                        <div
                            onClick={() => {
                                setPage((page + 1) % noPages);
                            }}
                            className="icon"
                        ></div>
                    </div>
                </PageContainer>
            </SearchArea>

            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="adList">
                        {ads.map((ad, index) => {
                            return <AdItem key={index} ad={ad} />;
                        })}
                    </div>
                    <Link to="/ads" className="seeAllAds">
                        Ver todos
                    </Link>
                    <hr />
                </PageArea>
            </PageContainer>
        </>
    );
};

export default Page;
