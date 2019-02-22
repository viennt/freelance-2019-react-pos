import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaListUl, FaDesktop } from 'react-icons/fa';

const HeaderWrapper = styled.div`
  height: 3rem;
  display: flex;
`;

const MenuButton = styled.div`
  width: 3rem;
  height: 100%;
  background: #0071c5;
  color: #ffffff;
  text-align: center;
  line-height: 45px;
  font-size: 1.5rem;
`;

const TopMenuBar = styled.div`
  flex: 1;
  height: 3rem;
  display: flex;
`;

TopMenuBar.Menu = styled(Link)`
  flex: 1;
  height: 100%;
  background: #ffffff;
  color: #0071c5;
  text-align: center;
  line-height: 3rem;
  font-size: 1.5rem;
  text-decoration: none;
`;

TopMenuBar.MenuActive = styled(Link)`
  flex: 1;
  height: 100%;
  background: #0071c5;
  color: #ffffff;
  text-align: center;
  line-height: 3rem;
  font-size: 1.5rem;
  text-decoration: none;
`;

const LogButton = styled.div`
  width: 3rem;
  height: 100%;
  background: #00e260;
  color: #ffffff;
  text-align: center;
  line-height: 45px;
  font-size: 1.5rem;
`;

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <HeaderWrapper>
        <MenuButton>
          <FaListUl />
        </MenuButton>
        <TopMenuBar>
          <TopMenuBar.Menu to="/marketing">MARKETING</TopMenuBar.Menu>
          <TopMenuBar.MenuActive to="/appointment">
            APPOINTMENT
          </TopMenuBar.MenuActive>
          <TopMenuBar.Menu to="/checkout">CHECKOUT</TopMenuBar.Menu>
        </TopMenuBar>
        <LogButton>
          <FaDesktop />
        </LogButton>
      </HeaderWrapper>
    );
  }
}

export default Header;
