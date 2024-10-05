
import React from 'react';
import { render } from '@testing-library/react-native';
import MainHeader from '../../src/components/headers/main_header'; 

test('renders correctly', () => {
  const { getByText } = render(
    <MainHeader mainText='Hello World' subText="hi there"/>
  );
  expect(getByText('Hello World')).toBeTruthy();
  expect(getByText('hi there')).toBeTruthy(); 
});




