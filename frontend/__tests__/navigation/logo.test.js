import { shallow, render } from 'enzyme';
import { Avatar, Heading } from '@chakra-ui/react';

import Logo from '@frontend/components/navigation/Logo';

describe('<Logo>', () => {
  it('renders logo', () => {
    const wrapper1 = render(<Logo />);
    const wrapper2 = shallow(<Logo />);

    expect(wrapper1.find('h3')).toHaveLength(1);
    expect(wrapper2.find(Avatar)).toHaveLength(1);
    expect(wrapper2.find(Heading)).toHaveLength(1);
  });
});
