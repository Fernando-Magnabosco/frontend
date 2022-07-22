import styled from "styled-components";

export const DataArea = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    span {
        margin-left: 10px;
    }
    img {
        width: 40px;
        aspect-ratio: 1;
    }
    &:hover {
        filter: invert(75%) sepia(17%) saturate(1459%) hue-rotate(32deg)
            brightness(88%) contrast(89%);
    }
`;
export const PageArea = styled.div`
    h2 {
        font-size: 20px;
        font-weight: lighter;
        color: #333;
    }
    .adList {
        background-color: white;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0 0 3px #999;
        border: 1px solid #ccc;
        min-width: 100%;
        min-height: 500px;
        display: flex;
        flex-wrap: wrap;
        position: relative;

        .aditem {
            width: 25%;
            position: relative;
            transition: 0.2s ease-in-out;

            .itemLink:hover::before {
                content: url("edit.png");
            }
        }
    }
    #noads {
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @media (max-width: 768px) {
        .adList {
            flex-direction: column;
            .aditem {
                width: 100%;
            }
        }
    }
`;

export const PageTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    h1 {
        display: inline-block;
    }
    .update {
        display: flex;
        padding: 10px;
        background-color: var(--color-primary);

        justify-content: center;
        align-items: center;

        border-radius: 3px;
        color: white;
        text-decoration: none;
        transition: background-color 0.2s ease-in-out;

        &:hover {
            background-color: var(--primary-hover);
        }
    }
`;
