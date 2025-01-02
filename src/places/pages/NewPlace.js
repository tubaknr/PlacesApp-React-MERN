import React, { useCallback, useReducer } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators';
import './NewPlace.css';




// BİR GİRİŞ ALANI DEĞİŞTİĞİNDE DURUMU GÜNCELLER.

const formReducer = (state, action) => {
  // action: dispatch tarafından oluşturuldu, buraya gönderildi.
  // state: ilk hal. useReducer'in içinde sonuncu paramter olar verildi.
  switch(action.type){
    case "INPUT_CHANGE":
      let formIsValid = true;

      // TÜM İNPUTLARIN GEÇERLİLİĞİNİ KONTROL EDER.
      for(const inputId in state.inputs){ // title ve description
        // console.log("inputId:", inputId);
        // console.log("action.inputId:", action.inputId);
        if(inputId === action.inputId){ //action.inputId = user ın şu anda yazdığı yer
          formIsValid = formIsValid && action.isValid;
        }else{
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      // YENİ DURUMU DÖNDÜRÜR.
      // console.log("isValidDDDDDDDDD: ",formIsValid)
      // console.log("state:: ",state.inputs)
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };


    default:
      return state;
  }
};







const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    // BAŞLANGIÇ STATE'İ: BURASI FORMREDUCER'A GÖNDERİLECEK OLAN STATE'İN İÇERİĞİ:
        inputs: { // state.inputs burası:
            title: { // ilk kullanıcı girişinin id'si
              value: '',
              isValid: false // whether the form is valid
            },
            description: { // ikinci kullanıcı girişinin id'si
              value: '',
              isValid: false
            }
        }, 
        // bu da state.isValid:
        isValid: false // TÜM GİRİŞ ALANLARININ GEÇERLİ OLUP OLMADIĞI.
      }
      
    );









// 2 INPUT HANDLERS -> USEREDUCER GEREK. MULTIPLE STATES CHANGE.
  const InputHandler = useCallback((id, value, isValid) => {
    // bu NewPlace her yeniden render edldiğinde bu titleInputHandler fonksiyonundan da yeniden oluşturulacak.
    // titleInputHandler yeniden oluşturulunca, Input'daki useEffect çalışacak, o da burayı tekrar çalıştıracak.
    // infinite loop. bu olmasın diye-->useCallback.
    dispatch({ 
      // DISPATCH, FORMREDUCER'A GÖNDERİLECEK OLAN ACTION'I OLUŞTURUR.
      type: "INPUT_CHANGE", // BU CASEİ ÇALIŞTIRIR.
      value: value, 
      isValid: isValid, 
      inputId: id //action.inputId buradan geliyor.
    })
  }, []);

  // const descriptionInputHandler = useCallback((id, value, isValid) => {

  // }, []);

  const placeSubmitHandler = event => {
    event.preventDefault(); // FORM'UN ONSUBMIT'İNE KONULUR. 
  }

  return (
    <>
    <form className='place-form' onSubmit={placeSubmitHandler}>
      
      <Input 
        id="title"
        element="input" 
        type="text" 
        validators={[VALIDATOR_REQUIRE()]} 
        label="Title" 
        errorText="Please enter a valid title"
        
        // BİR ŞEY YAZDIĞINDA, BURASI ÇALIŞIR. INPUTHANDLER ÇALIŞTIRILIR //}
        onInput={InputHandler}/> 
      
      <Input 
        id="description"
        element="textarea" 
        validators={[VALIDATOR_MINLENGTH(5)]} 
        label="Description" 
        errorText="Please enter a valid desc at least 5 chars."
        onInput={InputHandler}/>

        <Input 
        id="address"
        element="input"
        type="text" 
        validators={[VALIDATOR_REQUIRE()]} 
        label="Address" 
        errorText="Please enter a valid address."
        onInput={InputHandler}/>

      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>;
    </>
  );
};

export default NewPlace;
