import styled from 'styled-components';
import { Colors } from '../../shared/colors';

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
    cursor: pointer;
    width: 120px;
    height: 50px;
    border-radius: 10px;
    background-color: ${Colors.secondary};
    color: whitesmoke;
    border: none;
    margin-top: 20px;
  }

  a {
    padding: 0 15px 0 15px;
    text-decoration: none;
    color: ${Colors.secondary};
  }

  input {
    width: 150px;
  }

  .step {
    margin-bottom: 20px;
  }

  .component-line {
    margin-top: 20px;
    border: 0.5px solid ${Colors.secondary};
    width: 500px;
  }

  .input-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .section-input input {
    width: 200px;
  }

  .section-tooltip {
    left: 430px;
  }

  .tools-tooltip {
    top: 45px;
    left: 430px;
  }

  .section-wrapper {
    display: flex;
    align-items: center;
  }

  .section-icons-wrapper {
    cursor: pointer;
    position: relative;
    top: 35px;
  }
`;
