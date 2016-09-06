/**
 * Test the HomePage
 */

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

import { IntlProvider } from 'react-intl';
import { HomePage } from '../index';

describe('<HomePage />', () => {
  it('should link to /categories', () => {
    const openRouteSpy = expect.createSpy();

    // Spy on the openRoute method of the HomePage
    const openRoute = (dest) => {
      if (dest === '/categories') {
        openRouteSpy();
      }
    };

    const renderedComponent = mount(
      <IntlProvider locale="en">
        <HomePage loading changeRoute={openRoute} />
      </IntlProvider>
    );
    const button = renderedComponent.find('button');
    button.simulate('click');
    expect(openRouteSpy).toHaveBeenCalled();
  });
});
