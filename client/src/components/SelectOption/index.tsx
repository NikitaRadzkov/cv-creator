import { FC } from 'react';
import * as C from './styles';

interface Props {
  title: string;
  description: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}

export const SelectOption: FC<Props> = ({ title, description, icon, selected, onClick }) => {
  return (
    <C.Container onClick={onClick} selected={selected}>
      <C.Icon>{icon}</C.Icon>
      <C.Info>
        <C.Title>{title}</C.Title>
        <C.Description>{description}</C.Description>
      </C.Info>
    </C.Container>
  );
};
