import React from "react";
import { Item } from "./styled";
import { Link } from "react-router-dom";
import olxAPI from "../../../helpers/olxAPI";

export default (props) => {
    let to = `/ad/${props.ad.id}`;
    if (props.to) to = `${props.to}/${props.ad.id}`;

    return (
        <Item className="aditem">
            
                <Link to={to} className="itemLink">
                    <div className="itemImage">
                        <img
                            src={props.ad.image}
                            alt=""
                        />
                    </div>

                    <div className="itemName">{props.ad.title}</div>

                    <div className="itemPrice">
                        {props.ad.priceNegotiable
                            ? "Preço Negociável"
                            : "R$ " + props.ad.price}
                    </div>
                </Link>
                <a className="to-ad" href={`/ad/${props.ad.id}`}>
                    Ver Mais
                </a>
            
            
            
        </Item>
    );
};
