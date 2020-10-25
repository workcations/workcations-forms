import React from "react";

import { ButtonDiv } from "./button.style";

const Button = ({ value, isActive, onClick }) => (
  <ButtonDiv onClick={onClick} isActive={isActive}>
    {value}
  </ButtonDiv>
);

export default Button;
