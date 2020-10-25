import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Label = styled.label`
  position: relative;
  background-color: ${(props) => (props.isChecked ? "#ff6b6c" : "transparent")};
  cursor: pointer;
  border-radius: 3px;
  margin-right: 5px;
  border: ${(props) =>
    props.isChecked ? "1.5px solid #ff6b6c" : "1.5px solid #707070"};

  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
`;

export const Input = styled.input`
  cursor: pointer;
  opacity: 0;
`;

export const Box = styled.span`
  color: ${(props) => (props.isChecked ? "#ffffff" : "transparent")};
  display: ${(props) => (props.isChecked ? "unset" : "none")};
  position: absolute;
  left: 3px;
  transition: color 0.3s ease-out;
  -webkit-transition: color 0.3s ease-out;
  -moz-transition: color 0.3s ease-out;
  -ms-transition: color 0.3s ease-out;
  -o-transition: color 0.3s ease-out;
`;

export const Title = styled.div`
  color: #707070;
  font-weight: 600;
  font-size: 0.9vw;

  @media only screen and (max-width: 900px) {
    font-size: 3.4vw;
  }
  span {
    font-weight: 400;
    font-size: 0.7em;
  }
`;

export const TitleFilter = styled.div`
  font-size: 1vw;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  text-transform: capitalize;

  span {
    color: silver;
  }

  @media only screen and (max-width: 900px) {
    font-size: 3.4vw;
  }
`;
