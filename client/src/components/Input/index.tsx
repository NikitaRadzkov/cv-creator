import React, { ChangeEvent, FC } from 'react';
import * as C from './styles';

interface Props {
  type?: React.HTMLInputTypeAttribute;
  label: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  autoFocus?: boolean;
  className?: string;
}

export const Input: FC<Props> = ({
  type = 'text',
  label,
  handleChange,
  value,
  placeholder,
  className,
  autoFocus = false
}) => {
  return (
    <C.Container className={className}>
      <label>{label}</label>
      <input type={type} autoFocus={autoFocus} onChange={handleChange} value={value} placeholder={placeholder} />
    </C.Container>
  );
};
