import styled from "styled-components";

export const ButtonDiv = styled.div`
  width: 300px;
  height: 60px;
  background-color: ${(props) =>
    props.isActive ? "#ff6b6c" : "rgba(255, 255, 255, 0.3)"};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1.2em;
  border: 2px solid
    ${(props) => (props.isActive ? "#ffffff" : "rgba(255, 255, 255, 0.3)")};
  cursor: ${(props) => (props.isActive ? "pointer" : "default")};
  transition: all 0.3s ease-in-out;
  margin-top: 15px;

  @media only screen and (max-width: 900px) {
    width: 200px;
    font-weight: 600;
    font-size: 1em;
    height: 40px;
  }
`;
