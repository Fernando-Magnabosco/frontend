import styled from "styled-components";

export const SearchArea = styled.div`
    background-color: #ddd;
    border-bottom: 1px solid #ccc;
    padding: 20px 0;

    .searchBox {
        background-color: var(--color-primary);
        padding: 20px 15px;
        border-radius: 5px;
        box-shadow: 1px 1px 1px 0.3px rgba(0, 0, 0, 0.2);
        display: flex;

        form {
            flex: 1;
            display: flex;

            input,
            select {
                height: 40px;
                border: 0;
                border-radius: 5px;
                outline: 0;
                font-size: 15px;
                color: black;
                margin-right: 20px;
            }

            input {
                flex: 1;
                padding: 0 10px;
            }

            select {
                width: 100px;
            }

            button {
                background-color: var(--color-tertiary);
                font-size: 15px;
                border: 0;
                border-radius: 5px;
                color: white;
                height: 40px;
                padding: 0 20px;
                cursor: pointer;
                transition: background-color 0.2s;
                &:hover {
                    background-color: var(--tertiary-hover);
                }
            }
        }
    }

    .categoryList {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        position: relative;
        align-items: center;

        .categoryItem {
            width: 24%;
            display: flex;
            align-items: center;
            color: #000;
            text-decoration: none;
            height: 50px;
            position: relative;

            &:hover {
                color: #666;
            }

            img {
                width: 45px;
                height: 45px;
                margin-right: 10px;
            }

            &::after {
                content: "";
                position: absolute;
                background-color: rgba(0, 0, 0, 0);
                border-radius: 50%;
                left: 0;
                width: 45px;
                height: 45px;
                transition: background-color ease-in-out 150ms;
            }

            &:hover::after {
                background-color: rgba(0, 0, 0, 0.2);
            }

            transition: color ease-in-out 150ms;
        }

        .icon {
            display: none;
            width: 10%;
            position: absolute;
            cursor: pointer;
            right: 0;
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-left: 10px solid var(--color-primary);
            border-bottom: 5px solid transparent;
            transition: border-left ease-in-out 100ms;

            &:hover {
                border-left: 10px solid #999;
            }
        }
    }

    @media (max-width: 768px) {
        .searchBox form {
            flex-direction: column;
            input {
                padding: 10px;
                margin-right: 0;
                margin-bottom: 10px;
            }
            select {
                width: 100%;
                margin-bottom: 10px;
            }
        }

        .categoryList {
            min-height: 125px;
            align-items: flex-start;

            .categoryItem {
                width: 50%;
                padding: 10px;
                margin: 5px 0;

                &::after {
                    display: none;
                }
            }
        }
        .categoryList .categoryItem {
        }
    }
`;
export const PageArea = styled.div`
    h2 {
        font-size: 20px;
    }

    .adList {
        display: flex;
        flex-wrap: wrap;

        .aditem {
            width: 25%;
        }
    }

    .seeAllAds {
        color: black;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        margin-top: 20px;
    }

    @media (max-width: 768px) {
        & {
            margin: 10px;
        }
        .adList .aditem {
            width: 100%;
        }
    }
`;
