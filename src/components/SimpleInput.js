import { useState, useEffect } from "react";
import useInput from "../hooks/user-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    BlurHandler: inputBlurHandler,
    isValid:enteredNameIsValid,
    reset:resetNameHandler,
  } = useInput(value => value.trim()!=='');
 
  const [formIsValid, setFormIsValid] = useState(false);

 
  useEffect(() => {
    if (enteredNameIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid]);
 
  const submitHandler = (event) => {
    event.preventDefault();
    resetNameHandler()

    
    if (!enteredNameIsValid) {
      return;
    }
  };
  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={inputBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
