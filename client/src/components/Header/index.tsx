import { FC } from 'react';
import * as C from './styles';

export const Header: FC = () => {
  return (
    <C.Container>
      <h1>CV Generator</h1>
      <p>Fill out the form to create a CV</p>
    </C.Container>
  );
};
