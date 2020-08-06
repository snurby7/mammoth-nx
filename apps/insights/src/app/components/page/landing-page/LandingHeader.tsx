import styled from '@emotion/styled';
import { Header, MammothIcon } from '@mammoth/insights-ui';
import React from 'react';
import { AuthButton } from '../../common';

const StyledMammothIcon = styled(MammothIcon)`
  align-self: flex-start;
`;

const FlexEndContainer = styled.div`
  display: flex;
  align-self: flex-end;
  flex-grow: 1;
`;

export const LandingHeader: React.FC = (): JSX.Element => {
  return (
    <Header>
      <StyledMammothIcon />
      <FlexEndContainer>
        <div className="ml-auto">
          <AuthButton />
        </div>
      </FlexEndContainer>
    </Header>
  );
};
