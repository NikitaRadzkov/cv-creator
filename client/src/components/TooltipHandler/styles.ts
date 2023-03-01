import { Colors } from './../../shared/colors';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  top: 65px;
  left: 380px;

  .component-handler-icon {
    font-size: 22px;
    cursor: pointer;
    background-color: ${Colors.secondary};
    border-radius: 50%;
    margin-right: 20px;
    width: 22px;
    height: 22px;
    fill: #fff;
  }

  .component-line {
    margin-top: 20px;
    border: 0.5px solid ${Colors.secondary};
    width: 450px;
  }
`;
