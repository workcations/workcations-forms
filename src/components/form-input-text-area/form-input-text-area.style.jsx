import styled from "styled-components";

export const Group = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "inputLabel inputInput"
    ". warning";
  column-gap: 25px;
  font-size: 1.1em;
  margin: 20px 0px;

  &:focus-within {
  }

  input[type="password"] {
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  @media only screen and (max-width: 900px) {
    grid-template-columns: auto 1fr;
    font-size: 0.9em;
    column-gap: 15px;
    height: 45px;
  }
`;

export const Label = styled.label`
  grid-area: inputLabel;
  font-weight: 600;
  color: #ffffff;
  height: 40px;
  line-height: 40px;

  @media only screen and (max-width: 900px) {
    height: 30px;
    line-height: 30px;
  }
`;

export const Input = styled.textarea`
  grid-area: inputInput;
  width: 100%;
  margin: 0px;
  border: none;
  border-bottom: 1.5px solid #777777;
  padding: 5px;
  color: #ffffff;
  background-color: ${(props) =>
    props.warningMessage.length > 0
      ? "rgba(255, 107, 108, 0.4)"
      : "transparent"};
  transition: background-color 0.4s;
  font-size: 1em;
  resize: none;

  :focus {
    background-color: #222222;
    outline: none;
    border-color: #ffffff;
  }

  @media only screen and (max-width: 900px) {
    height: 30px;
    padding: 2px 5px;
  }
`;

export const WarningMessage = styled.div`
  grid-area: warning;
  color: rgba(255, 107, 108, 0.8);
  height: 20px;
  line-height: 20px;
  font-size: 10px;

  @media only screen and (max-width: 900px) {
    height: 15px;
    line-height: 15px;
  }
`;
