
import React, {useState, useRef, useEffect} from "react";

import {useNavigate} from "react-router-dom";
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { PageContainer, PageTitle, ErrorMessage } from "../../components/mainComponents";
import { PageArea } from "./styled";

import useApi from "../../helpers/olxAPI"


const Page = () => {

    const api = useApi();

    const fileField = useRef();

    const navigate = useNavigate();

    const[title,setTitle] = useState('');
    const[categories, setCategories]=useState([]);
    
    const[category, setCategory]=useState('');
    const[price,setPrice]=useState('');
    const[priceNegotiable,setPriceNegotiable]=useState(false);
    const[desc,setDesc]=useState('');
    
    const[disabled, setDisabled] = useState(false);
    const[error, setError] = useState("");

    useEffect(
        () => {
            const getCategories = async () => {
                const clist = await api.getCategories();
                    setCategories(clist);
                
            }
            getCategories();
        }, []
    );

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setDisabled(true);
        setError("");
        let errors = [];

        if(!title.trim()) {
            errors.push("Título é obrigatório"); 
        }
        if(!category) {
            errors.push("Categoria é obrigatória"); 
        }

        if(errors.length !== 0){
            setError(errors.join("\n"));
            setDisabled(false);
            return;
        }

        const fData = new FormData();

        fData.append('title', title);
        fData.append('cat', category);
        fData.append('price', price);
        fData.append('priceneg', priceNegotiable);
        fData.append('desc', desc);
    
        if(fileField.current.files.length > 0){
            for (let i = 0; i < fileField.current.files.length; i++) {
                fData.append('img', fileField.current.files[i]);
            }
        }
        
        const json = await api.newAd(fData);

        if(!json.error){
            navigate(`/ad/${json.id}`);
            return;

        } else {
            setError(json.error);
            
        }

        setDisabled(false);
     
        
        
    }

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    })

    return (
        <PageContainer>
            <PageTitle> Poste um anúncio </PageTitle>
            <PageArea>
                {error && !error.email &&  !error.password && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title required">Título</div>
                        <div className="area--input">
                            <input 
                                type="text"
                                disabled ={disabled}
                                value = {title}
                                onChange = {(e) => setTitle(e.target.value)}
                                required
                                
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select
                                disabled ={disabled}
                                onChange = {(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                {categories.map((cat) => (
                                    <option key = {cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                            <div>
                                <MaskedInput
                                
                                        mask= {priceMask}
                                        placeholder = "R$ 0,00"
                                        disabled ={disabled || priceNegotiable}
                                        value = {price}
                                        onChange = {(e) => setPrice(e.target.value)}

                                
                                />
                            </div>
                        </div>

                    </label>

                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div>
                            <input
                            
                                type= "checkbox"
                                disabled = {disabled}
                                checked = {priceNegotiable}
                                onChange = {(e) => setPriceNegotiable(e.target.checked)}
                            />
                            
                        </div>

                    </label>

                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                            <div>

                                <textarea

                                    disabled = {disabled}
                                    value = {desc}
                                    onChange = {(e) => setDesc(e.target.value)}>

                                </textarea>
                                
                            </div>
                        </div>

                    </label>

                    <label className="area">
                        <div className="area--title">Imagens</div>
                        <div>
                            <input
                            
                                type= "file"
                                disabled = {disabled}
                                ref = {fileField}
                                multiple 
                            />
                            
                        </div>

                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled ={disabled}> Adicionar Anúncio </button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;