import React from "react";

import {
  Container,
  Label,
  Input,
  Box,
  Title,
  TitleFilter,
} from "./checkbox.style";

const CheckBox = ({ name, label, handleChange, checked }) => (
  <Container>
    <Label isChecked={checked}>
      <Input
        checked={checked}
        name={name}
        onChange={handleChange}
        type="checkbox"
      />
      <Box isChecked={checked}>&#10004;</Box>
    </Label>
    <Title>{label.split("@")[0]}</Title>
  </Container>
);

const CheckBoxFilter = ({ name, label, handleChange, checked }) => (
  <Container>
    <Label isChecked={checked}>
      <Input
        checked={checked}
        name={name}
        onChange={handleChange}
        type="checkbox"
      />
      <Box isChecked={checked}>&#10004;</Box>
    </Label>
    <TitleFilter>
      {label.split("@")[0]}
      <span>{"(" + label.split("@")[1] + ")"}</span>
    </TitleFilter>
  </Container>
);

export { CheckBox, CheckBoxFilter };
