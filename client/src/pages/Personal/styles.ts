import { Colors } from '../../shared/colors';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 50px;
  p {
    display: block;
  }

  h2 {
    display: block;
    margin-bottom: 5px;
    color: ${Colors.secondary};
  }

  button {
    width: 120px;
    height: 50px;
    border-radius: 10px;
    background-color: ${Colors.secondary};
    color: whitesmoke;
    border: none;
    margin-top: 20px;
  }

  .step {
    margin-bottom: 20px;
  }

  .tooltip-styles {
    left: 280px;
    top: 25px;
  }

  .component-wrapper {
    display: flex;
    align-items: center;
  }

  .component-wrapper label {
    margin-top: 0;
  }

  .component-wrapper input {
    max-width: 250px;
  }

  .component-wrapper select {
    max-width: 250px;
    margin-top: 30px;
    margin-left: 50px;
  }
`;
