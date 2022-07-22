import styled from "styled-components";

export const PageArea = styled.div`

    .required::after{
        content: "*";
    }
    
    form{
        background-color: white;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0 0 3px #999;

        .area{
            display: flex;
            align-items: center;
            padding: 10px;
            max-width: 500px;
        
            .area--title{
                width: 200px;
                text-align: right;
                padding-right: 20px;
                font-weight: bold;
                font-size: 14px;


            }

            .area--input{

                flex: 1;

                input, select, textarea {
                    width: 100%;
                    font-size: 14px;
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    outline: 0;
                    transition: all ease .4s;

                    &:focus{
                        border-color: #333;
                        color: #333;

                    }
                }

                textarea{
                    resize: none;
                    height: 150px;
                }

                button{
                    background-color: #0089FF;
                    border: 0;
                    outline: 0;
                    border-radius: 3px;
                    padding: 5px 10px;
                    color: white;
                    font-size: 14px;
                    cursor: pointer;

                    &:hover{
                        background-color: #0076D6;
                    }
                }
9
        
            }
        }

    }



`;
