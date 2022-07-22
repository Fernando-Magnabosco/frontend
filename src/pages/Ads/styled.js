import styled from "styled-components";

export const PageArea = styled.div`


    display: flex;
    margin-top: 20px;

    .leftSide{

        width: 250px;
        margin-right: 10px;
        
    }

    .rightSide{

        flex: 1;
        h2{
            margin-left: 10px;
            margin-top: 0;
            font-size: 18px;
        }
        .listWarning{
            padding: 30px;
            text-align: center;
        }
        .list{
            display: flex;
            flex-wrap: wrap;
        }
        .aditem{
            flex-basis: 33.33%;
        }

    }

    .filterName{
        font-size: 15px;
        margin: 10px 0;
    }

    input, select{
        width: 100%;
        height: 40px;
        border 2px solid #ccc;
        border-radius 5px;
        outline: 0;
        font-size: 15px;
        color: black;
        padding: 10px;
        transition: border ease-in-out 0.2s;
        &:focus{
            border 2px solid var(--color-primary);
        }
    }

    ul, li{
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .categoryItem{
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        color: black;
        cursor: pointer;


        img{
            width: 25px;
            aspect-ratio: 1;
            margin-right: 5px;
        }

        span{
            font-size: 14px;
        }
    }

    .categoryItem:hover{
        background-color: #CDDC9E;
        
    }
    
    .categoryItem.active
    {
        background-color: var(--color-primary);
        color: white;
    }



    .pagination{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 10px;
        .pageItem{
            width: 30px;
            height: 30px;
            display: flex;        
            justify-content: center;
            align-items: center;
            font-size: 14px;
            font-weight: 1000;
            background-color: white;
            border-radius: 2px;
            color: var(--color-primary);
            margin: 2px;
            border: 1px solid var(--color-primary);
            cursor: pointer;
            transition: background-color ease-in-out 0.2s;
            
            &:hover,
            &.active{
                background-color: var(--color-primary);
                color: white;

            }
            
            &.wide{
                -webkit-user-select: none;
                width: fit-content;
                padding: 0 5px;
            }
            &.disabled{
                background-color: #ccc;
                border: 1px solid #ccc;
                color: white;
                cursor: default;
            }
        
        
        }


        
    }
    @media (max-width: 768px){
    
        flex-direction: column;
        

        .leftSide{
            width: auto;
            margin: 10px;
            
            ul{
                display: flex;
                flex-wrap: wrap;
                li{
                    width: 50%;
                }
            }
        }

        .rightSide{
            margin: 10px;

            .list .aditem{
                flex-basis: 100%;

            }
        }
    }


`;
