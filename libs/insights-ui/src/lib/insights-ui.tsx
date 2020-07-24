import React from 'react';

import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface InsightsUiProps {}

const StyledInsightsUi = styled.div`
  color: pink;
`;

export const InsightsUi = (props: InsightsUiProps) => {
  return (
    <StyledInsightsUi>
      <h1>Welcome to insights-ui!</h1>
    </StyledInsightsUi>
  );
};

export default InsightsUi;
