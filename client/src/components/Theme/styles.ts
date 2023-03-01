import { Colors } from './../../shared/colors';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Area = styled.div`
  width: 70%;
  margin: auto;
  height: 100vh;
`;

export const Steps = styled.div`
  width: 100%;
  display: flex;
`;

export const Sidebar = styled.div`
  width: 40%;
  border-right: 1px solid ${Colors.secondary};
`;

export const Page = styled.div`
  width: 60%;
`;
