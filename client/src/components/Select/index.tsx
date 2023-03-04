import { ChangeEvent } from 'react';
import * as C from './styles';

interface SelectProps {
  options: string[];
  value: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({ options, value, handleChange }) => {
  return (
    <C.Container>
      <select value={value} onChange={handleChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </C.Container>
  );
};
