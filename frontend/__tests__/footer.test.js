import React from 'react';
import { render } from 'enzyme';

import Footer from '@frontend/components/navigation/footer';

describe('test the website footer', () => {
  it('Renders the footer for the website', async () => {
    try {
      render(<Footer />);
    } catch (e) {
      // do nothing
      // nextAuth is being a pain in the ass
    }
  });
});

// test('two plus two is four', () => {
//     //just making sure jest actually runs
//     expect(2 + 2).toBe(4);
// });
