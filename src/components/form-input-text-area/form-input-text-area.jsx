import React from "react";

import {
  Group,
  Input,
  Label,
  WarningMessage,
} from "./form-input-text-area.style";

const FormInputTextArea = ({
  handleChange,
  label,
  required,
  warningMessage,
  name,
  value,
}) => (
  <Group>
    <Label>
      {label}
      {required ? <span>*</span> : null}
    </Label>
    <Input
      onChange={handleChange}
      required={required}
      name={name}
      value={value}
      warningMessage={warningMessage}
      rows={5}
    />
    {warningMessage.length > 0 ? (
      <WarningMessage>{warningMessage}</WarningMessage>
    ) : null}
  </Group>
);

export default FormInputTextArea;
