import { Colors } from '../../shared/colors';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 50px;

  p {
    display: block;
    font-size: 25px;
    color: ${Colors.primary};
  }

  h2 {
    display: block;
    margin-bottom: 5px;
    color: ${Colors.secondary};
    font-size: 35px;
  }

  .wait-loading {
    font-size: 15px;
  }
`;

export const IconArea = styled.div`
  margin: 30px;
`;
