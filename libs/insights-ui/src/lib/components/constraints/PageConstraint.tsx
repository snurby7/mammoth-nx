import styled from '@emotion/styled';
import React from 'react';
const Constraint = styled.div`
  padding: 1rem;
`;

export const PageConstraint: React.FC = ({ children }): JSX.Element => {
  return <Constraint>{children}</Constraint>;
};
