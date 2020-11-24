import React, { Fragment, useEffect, useRef, useState } from "react";
import Autosuggest from "react-autosuggest";
import { Spinner } from "reactstrap";
import "./AutoSuggest.css";

// Imagine you have a list of languages that you'd like to autosuggest.
var timeout;

// Teach Autosuggest how to calculate suggestions for any given input value.

const MyAutoSuggest = (props) => {
  // Autosuggest is a controlled component.
  // This means that you need to provide an input value
  // and an onChange handler that updates this value (see below).
  // Suggestions also need to be provided to the Autosuggest,
  // and they are initially empty because the Autosuggest is closed.
  const [state, setState] = useState({
    value: "",
    suggestions: [],
  });
  const [show, setShow] = useState(false);
  const inputRef = useRef();

  useEffect(async () => {
    timeout = setTimeout(async () => {
      if (state.value === inputRef.current.value) {
        if (state.value.length !== 0) {
          setShow(true);
          await props.onInputChangeAsync(state.value, () => setShow(false));
        }
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [state.value, inputRef]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      suggestions: [...props.options],
    }));
  }, [props.options]);

  const getSuggestionValue = (suggestion) => suggestion.name;

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : props.options.filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // Use your imagination to render suggestions.
  //   renderSuggestion = (suggestion) => <div>{suggestion.name}</div>

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = async ({ value }) => {
    // await props.onInputChangeAsync(value);
    await setState((prev) => ({
      ...prev,
      suggestions: getSuggestions(value),
    }));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setState((prev) => ({
      ...prev,
      suggestions: [],
    }));
  };

  const onChange = async (event, { newValue }) => {
    await setState((prev) => ({
      ...prev,
      value: newValue,
    }));
    if (props.onInputChange) props.onInputChange(event);
    // else if (props.onInputChangeAsync) {
    //   await props.onInputChangeAsync(newValue);
    //   //   onSuggestionsFetchRequested({ value: newValue });
    // }
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.

  const { value, suggestions } = state;

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: "Type a programming language",
    value,
    onChange: onChange,
    ref: inputRef,
    ...props.inputProps,
  };

  // Finally, render it!
  return (
    <Fragment>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={
          props.eachSuggestion
            ? props.eachSuggestion
            : (suggestion) => <div>{suggestion.name}</div>
        }
        inputProps={inputProps}
      />
      {show && state.suggestions.length === 0 ? (
        <Fragment>
          <br />
          <Spinner />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default MyAutoSuggest;
