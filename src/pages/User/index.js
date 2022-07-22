import React, { useState, useEffect } from "react";

import { PageContainer } from "../../components/mainComponents";

import { Link } from "react-router-dom";
import AdItem from "../../components/partials/AdItem";
import { PageArea, PageTitle } from "./styled";

import useApi from "../../helpers/olxAPI";

const Page = () => {
    const api = useApi();

    const [userInfo, setuserInfo] = useState([]);

    useEffect(() => {
        const getUserInfo = async () => {
            const user = await api.getUserInfo();

            setuserInfo(user);
        };
        getUserInfo();
    }, []);

    return (
        <PageContainer>
            <PageTitle>
                <h1> Meus anúncios </h1>
                <Link className="update" to="/update">
                    <span>Alterar cadastro</span>
                </Link>
            </PageTitle>
            <PageArea>
                {userInfo.name && (
                    <>
                        <br />

                        <div className="adList">
                            {userInfo.ads.length > 0 ? (
                                <>
                                    {userInfo.ads.map((ad, index) => {
                                        const formattedAd = {
                                            price: ad._doc.price,
                                            title: ad._doc.title,
                                            image:
                                                ad._doc.images.length > 0
                                                    ? api.getApi() +
                                                      "/media/" +
                                                      ad._doc.images[0].url
                                                    : api.getApi() +
                                                      "/media/default.jpg",
                                            id: ad._doc._id,
                                            priceNegotiable:
                                                ad._doc.priceNegotiable,
                                        };

                                        return (
                                            <AdItem
                                                key={index}
                                                ad={formattedAd}
                                                to={"/edit"}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <span id="noads">
                                    Você ainda não possui anúncios!
                                </span>
                            )}
                        </div>
                    </>
                )}
            </PageArea>
        </PageContainer>
    );
};
export default Page;
