import { Colors } from '../../shared/colors';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 50px 0 0 50px;

  p {
    display: block;
  }

  h2 {
    display: block;
    margin-bottom: 5px;
    color: ${Colors.secondary};
  }

  .step {
    margin-bottom: 20px;
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

  textarea {
    display: block;
    margin-top: 7px;
    box-sizing: border-box;
    min-height: 220px;
    width: 100%;
    padding: 20px 10px;
    border: 2px solid ${Colors.secondary};
    border-radius: 10px;
    font-size: 28px;
    outline: 0;
    font-size: 15px;
    background-color: ${Colors.lightGrey};
    max-width: 280px;
  }

  input {
    max-width: 280px;
  }

  .tooltip-styles {
    left: 420px;
  }

  .component-line {
    margin-top: 20px;
    border: 0.5px solid ${Colors.secondary};
    width: 490px;
  }

  .component-wrapper-period {
    margin-bottom: 20px;
  }

  .component-wrapper-period label {
    margin-top: 20px;
  }

  .component-wrapper-project-name {
    margin-bottom: 20px;
  }

  .component-wrapper {
    display: flex;
  }

  .component-handler {
    position: relative;
    top: 65px;
    left: 430px;
  }

  .component-wrapper-left {
    margin-right: 50px;
  }

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

  .component-footer {
    margin-bottom: 20px;
  }
`;
