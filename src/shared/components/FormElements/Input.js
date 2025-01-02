import React, {useEffect, useReducer} from "react";
import { validate } from "../util/validators";
import './Input.css';

// useReducer Ne Zaman Kullanılır?
// Karmaşık State Yönetimi: State mantığı karmaşıksa (örneğin birden fazla state ilişkiliyse veya çok fazla güncelleme varsa).
// Birden Fazla State Güncelleme: Birden fazla state'in aynı anda güncellenmesi gerekiyorsa.
// Action Tabanlı Yapılar: Redux benzeri bir mantık kullanarak state güncellemeleri yapmak istenirse.
// Modal, tooltip gibi ilişkili state'lerin yönetiminde kullanılır.
//--------------------------------------------------------------------
// state: mevcut durum
// action: durumu değiştirmek için kullanılan nesne.
//--------------------------------------------------------------------
// Kullanıcı bir giriş alanına (input/textarea) veri girdiğinde, inputReducer çalışır ve:
// State'i Günceller: Giriş alanının değerini (value) ve doğruluk durumunu (isValid) günceller.
//--------------------------------------------------------------------
// action nesnesine göre state değişir!!!!!
//--------------------------------------------------------------------

const inputReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE':  // Giriş değişikliği olduğunda çalışır
            return{
                ...state,  // Mevcut state'i korur
                value: action.val,  // Yeni değeri state'e atar

                // INPUT VALIDATION
                isValid: validate(action.val, action.validators)  // Varsayılan olarak 'isValid' değerini true yapar
            };

        case "TOUCH": // inBlur için
            return{
                ...state,
                isTouched: true
            };

        default:  // Belirtilmeyen bir action.type gelirse mevcut durumu döndürür
            return state;
    }
};

const Input = props => {
    // useReducer(reducerFcn(STATE GÜNCELLEMELERİNİ KONTROL EDER), INITIAL STATES)
    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false, isTouched: false});

    const { onInput, id } = props;
    const { value, isValid, isTouched } = inputState;

    useEffect(() => {
        onInput(id, value, isValid) //BU DEĞERLERDEN HERHANGİ BİRİ DEĞİŞİRSE, BU NEWPLACE(ÜST BİLEŞEN)'E BİLDİRİLİR.
    }, [id, value, isValid, onInput]); //BU DEĞERLERDEN HERHANGİ BİRİ DEĞİŞİRSE, BU USEEFFECT YENİDEN ÇALIŞACAK.


    const changeHandler = event =>{
        dispatch({
            type: 'CHANGE', 
            val: event.target.value, 
            validators: props.validators
        }); // user ın girdiği input
    };

    const touchHandler = () => {
        dispatch({
            type: "TOUCH",
        
        })
    }

    const element 
    = props.element === "input" 
        ? <input 
            type={props.type} 
            id={props.id} 
            placeholder={props.placeholder} 
            onChange={changeHandler} 
            onBlur={touchHandler}
            value={value}/> 
        : <textarea 
            id={props.id} 
            rows={props.rows || 3} 
            onChange={changeHandler}
            onBlur={touchHandler} 
            value={value}/>;

    return(
        <div className={`form-control ${!isValid && isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>
                {props.label}
            </label>

            {element}

            {!isValid && isTouched && <p>{props.errorText}</p>}
        </div>
    )
};


export default Input;
