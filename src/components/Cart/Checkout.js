import classes from './Checkout.module.css';
import { useRef,useState } from 'react';

const isEmpty = value => value.trim().length ===0;
const isFourChars = value => value.trim().length !==4;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity]=useState({
        name:true,
        street:true,
        city:true,postal:true
    })
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    const confirmHandler = (event) => {
        console.log('ss')
        event.preventDefault();
            const enteredName = nameInputRef.current.value
            const enteredStreet = streetInputRef.current.value
            const enteredPostalCode = postalInputRef.current.value
            const enteredCity = cityInputRef.current.value
            
            const enteredNameIsValid = isEmpty(enteredName)
            const enteredStreetIsValid = isEmpty(enteredStreet)
            const enteredCityIsValid = isEmpty(enteredCity)
            const enteredPostalIsValid = isFourChars(enteredPostalCode)
            setFormInputsValidity({
                name:enteredNameIsValid,
                city:enteredCityIsValid,
                postal:enteredPostalIsValid,
                street:enteredStreetIsValid
            })
            const formIsValid = !enteredCityIsValid && !enteredNameIsValid && !enteredStreetIsValid && !enteredPostalIsValid
                if(!formIsValid){
                console.log('D')
                return;
                }
                props.onConfirm({
                    name: enteredName,
                    street: enteredStreet,
                    city: enteredCity,
                    postalCode: enteredPostalCode,
                  });
  
        };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${!formInputsValidity.name ?'':classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' ref={nameInputRef} id='name' />
                {formInputsValidity.name &&<p>Please Enter A Name</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.street ?'':classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text'  ref={streetInputRef}id='street' />
                {formInputsValidity.street &&<p>Please Enter A Street</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.postal ?'':classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text'  ref={postalInputRef}id='postal' />
                {formInputsValidity.postal &&<p>Please Enter A Valid Postal</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.city ?'':classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text'  ref={cityInputRef} id='city' />
                {formInputsValidity.city &&<p>Please Enter A City</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit} >Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;