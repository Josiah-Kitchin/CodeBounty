
import React from 'react';
import { render } from '@testing-library/react-native';
import MainHeader from '../../src/components/headers/main_header'; 

test('renders correctly', () => {
  const { getByText } = render(<MainHeader mainText='Hello World'/>);
  expect(getByText('Hello World')).toBeTruthy();
});