import { expect } from 'chai';
import { shallow } from 'enzyme';
import NavBar from '@frontend/components/navigation/NavBar';

describe('<Navbar />', () => {
  it('renders a <Logo /> component and a Home <NavLink>', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find(Logo)).to.have.lengthOf(1);
    expect(wrapper.find(NavLink)).to.have.lengthOf(2);
    expect(wrapper.find(Fun)).to.have.lengthOf(1);
  });
});
