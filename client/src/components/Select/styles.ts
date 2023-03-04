import styled from 'styled-components';
import { Colors } from '../../shared/colors';

export const Container = styled.div`
  select {
    display: block;
    margin-top: 7px;
    box-sizing: border-box;
    width: 100%;
    padding: 20px 10px;
    border: 2px solid ${Colors.secondary};
    border-radius: 10px;
    font-size: 28px;
    outline: 0;
    font-size: 15px;
    background-color: ${Colors.lightGrey};
    max-width: 250px;
  }
`;
