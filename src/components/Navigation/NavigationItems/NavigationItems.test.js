import React from 'react'
import { shallow } from 'enzyme';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

describe('<NavigationItems/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })

    it('should render 2 <NavigationItem/> components when not authenticated ', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('should render 3 <NavigationItem/> when authenticated', () => {
        wrapper = shallow(<NavigationItems isAuthenticated />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('should render a Logout NavigationItem when authenticated', () => {
        wrapper = shallow(<NavigationItems isAuthenticated />);
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>));
    })
})