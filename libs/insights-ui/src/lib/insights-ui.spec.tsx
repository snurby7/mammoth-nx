import React from 'react';
import { render } from '@testing-library/react';

import InsightsUi from './insights-ui';

describe(' InsightsUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InsightsUi />);
    expect(baseElement).toBeTruthy();
  });
});
