import { createGlobalStyle } from 'styled-components';
import { Colors } from './shared/colors';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    color: ${Colors.primary};
    box-sizing: border-box;
    font-family: 'Mulish', sans-serif;
}
`;
