import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

export const Header: React.FC = ({ children }): JSX.Element => {
  return <Container>{children}</Container>;
};
