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
    max-width: 450px;
  }

  input {
    max-width: 300px;
    margin-bottom: 20px;
  }

  .component-footer {
    margin-bottom: 20px;
  }

  .selected-file {
    margin-top: 20px;
  }

  .file-upload {
    margin-top: 20px;
    width: 150px;
    height: 50px;
    overflow: hidden;
    border: 1px solid ${Colors.secondary};
    border-radius: 4px;
  }

  .file-upload input[type='file'] {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .custom-button {
    display: block;
    width: 100%;
    height: 100%;
    padding: 13px 10px 10px 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
`;
