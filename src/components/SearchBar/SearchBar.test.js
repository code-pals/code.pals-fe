import { render } from '@testing-library/react';
import SearchBar from './SearchBar.jsx';

it('should render SearchBar', () => {
  const { container } = render(<SearchBar />);
  expect(container).toMatchSnapshot();
});
