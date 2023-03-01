import styled from 'styled-components';
import { Colors } from '../../shared/colors';

export const Container = styled.div`
  width: 100%;
  height: 120px;
  border-bottom: 1px solid ${Colors.secondary};
  h1 {
    padding: 30px 0 5px 30px;
    color: ${Colors.secondary};
    font-weight: bold;
  }
  p {
    padding: 5px 0 10px 40px;
  }
`;
