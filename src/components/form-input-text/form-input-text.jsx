import React from "react";

import { Group, Input, Label, WarningMessage } from "./form-input-text.style";

const FormInput = ({
  handleChange,
  label,
  required,
  warningMessage,
  name,
  value,
  type,
}) => (
  <Group>
    <Label>
      {label}
      {required ? <span>*</span> : null}
    </Label>
    <Input
      onChange={handleChange}
      required={required}
      type={type}
      name={name}
      value={value}
      warningMessage={warningMessage}
    />
    {warningMessage.length > 0 ? (
      <WarningMessage>{warningMessage}</WarningMessage>
    ) : null}
  </Group>
);

export default FormInput;
