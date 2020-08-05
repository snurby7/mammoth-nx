import styled from '@emotion/styled';
import { Button, Header, MammothIcon } from '@mammoth/insights-ui';
import { Person } from '@material-ui/icons';
import React from 'react';

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
          <Button>
            <Person />
            Login
          </Button>
        </div>
      </FlexEndContainer>
    </Header>
  );
};
