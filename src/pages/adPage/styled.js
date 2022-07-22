import styled from "styled-components";

export const Fake = styled.div`
    height: ${(props) => props.height || 20}px;
    background-color: #ddd;
`;
export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;

    .box {
        background-color: white;
        border-radius: 5px;
        box-shadow: 0px 0px 4px #999;
        margin-bottom: 20px;
    }

    .box-padding {
        padding: 10px;
    }

    .leftSide {
        flex: 1;
        margin-right: 20px;
        padding-right: 2px;

        .box {
            display: flex;
        }
        .adImage {
            width: 320px;
            height: 320px;
            margin-right: 20px;

            .each-slide img {
                display: flex;
                align-items: center;
                justify-content: center;
                background-size: cover;
                height: 320px;
            }
        }

        .adStuff {
            flex: 1;
            small {
                color: #777;
            }
            .adName {
                margin-bottom: 10px;
                h2 {
                    margin: 0;
                    margin-top: 20px;
                }
            }
            .adDescription {
            }
        }
    }

    .rightSide {
        width: 250px;

        .price span {
            display: block;
            font-size: 27px;
        }

        .contactSellerLink {
            background-color: blue;
            color: white;
            height: 30px;
            border-radius: 5px;
            box-shadow: 0px 0px 4px #999;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            margin-bottom: 20px;
            transition: all 0.2s ease-in-out;

            &:hover {
                background-color: #0066ff;
            }
        }

        .createdBy small {
            display: block;
            color: #555;
            margin-top: 10px;
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;
        .leftSide {
            margin-right: 0;
            .box {
                width: 320px;
                margin: auto;
                flex-direction: column;
            }
            .adStuff {
                padding: 10px;
            }
        }
        .rightSide {
            width: auto;
            margin-top: 20px;
            .box {
                width: 320px;
                margin: auto;
            }

            .contactSellerLink {
                width: 320px;
                margin: 10px auto;
            }
        }
    }
`;

export const OthersArea = styled.div`
    h2 {
        font-size: 20px;
    }

    .list {
        display: flex;
        flex-wrap: wrap;

        .aditem {
            width: 25%;
        }
    }

    @media (max-width: 768px) {
        margin: 10px;

        .list .aditem {
            width: 100%;
        }
    }
`;

export const BreadCrumb = styled.div`
    font-size: 13px;
    margin-top: 20px;

    a {
        display: inline-block;
        margin: 0px 5px;
        text-decoration: underline;
        color: black;
    }

    @media (max-width: 768px) {
        margin: 20px;
    }
`;
