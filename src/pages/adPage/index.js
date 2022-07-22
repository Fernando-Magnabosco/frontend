import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import {Slide} from "react-slideshow-image";
// import Carousel from "react-elastic-carousel";
import Carousel from "react-material-ui-carousel";
import { PageContainer } from "../../components/mainComponents";
import AdItem from "../../components/partials/AdItem";

import { PageArea, Fake, OthersArea, BreadCrumb } from "./styled";

import useApi from "../../helpers/olxAPI";

const Page = () => {
    const api = useApi();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState([]);

    useEffect(() => {
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        };
        getAdInfo(id);

        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [id]);

    const formatDate = (date) => {
        let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        let newDate = new Date(date);

        let day = newDate.getDate();
        let month = months[newDate.getMonth()];
        let year = newDate.getFullYear();

        return `${day} de ${month} de ${year}`;
    };

    return (
        <PageContainer>
            {adInfo.category && (
                <BreadCrumb>
                    <Link to="/">Home</Link>/
                    <Link to={`/ads?state=${adInfo.stateName}`}>
                        {adInfo.stateName}
                    </Link>
                    /
                    <Link
                        to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}
                    >
                        {adInfo.category.name}
                    </Link>
                    / {adInfo.title}
                </BreadCrumb>
            )}

            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300} />}
                            {adInfo.images && (
                                <Carousel indicators={false}>
                                    {adInfo.images.map((image, index) => {
                                        return (
                                            <div
                                                className="each-slide"
                                                key={index}
                                            >
                                                <img src={image} alt={""} />
                                            </div>
                                        );
                                    })}
                                </Carousel>
                            )}
                        </div>

                        <div className="adStuff">
                            <div className="adName">
                                {loading && <Fake height={20} />}
                                {adInfo.title && <h2>{adInfo.title}</h2>}
                                {adInfo.dateCreated && (
                                    <small>
                                        Criado em{" "}
                                        {formatDate(adInfo.dateCreated)}{" "}
                                    </small>
                                )}
                            </div>

                            <div className="adDescription">
                                {loading && <Fake height={100} />}

                                {adInfo.description}
                                <hr />

                                {adInfo.views && (
                                    <small>{adInfo.views} visualizações</small>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rightSide">
                    <div className="box box-padding">
                        {loading && <Fake height={20} />}
                        {adInfo.priceNegotiable && (
                            <span>Preço negociável</span>
                        )}
                        {!adInfo.priceNegotiable && adInfo.price && (
                            <div className="price">
                                Preço: <span> R$ {adInfo.price}</span>
                            </div>
                        )}
                    </div>

                    {loading && <Fake height={50} />}
                    {adInfo.userInfo && (
                        <>
                            <a
                                href={`mailto:${adInfo.userInfo.email}`}
                                className="contactSellerLink"
                            >
                                {" "}
                                Fale com o vendedor{" "}
                            </a>
                            <div className="createdBy box box-padding">
                                <span> {adInfo.userInfo.name} </span>
                                <small> E-mail: {adInfo.userInfo.email} </small>
                                <small> Estado: {adInfo.stateName} </small>
                            </div>
                        </>
                    )}
                </div>
            </PageArea>

            <OthersArea>
                {adInfo.others && (
                    <>
                        <h2> Outras ofertas do mesmo vendedor</h2>
                        <div className="list">
                            {adInfo.others.map((ad, index) => {
                                return <AdItem key={index} ad={ad} />;
                            })}
                        </div>
                    </>
                )}
            </OthersArea>
        </PageContainer>
    );
};

export default Page;
