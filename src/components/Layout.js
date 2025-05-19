import React from 'react';
import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Sidebar = styled.nav`
  width: 220px;
  background: #0d0d0d;
  color: #00f0ff;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Content = styled.main`
  flex: 1;
  background: #121212;
  color: #fff;
  padding: 40px;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const MenuItem = styled(NavLink)`
  color: #00f0ff;
  padding: 12px 8px;
  margin-bottom: 8px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.3s;

  &.active, &:hover {
    background-color: #00f0ff;
    color: #0d0d0d;
  }
`;

export default function Layout() {
  return (
    <Container>
      <Sidebar>
        <h2>Menu</h2>
        <MenuItem to="/hosts">Hosts</MenuItem>
        <MenuItem to="/cadastrar-host">Cadastrar Host</MenuItem>
        <MenuItem to="/vlans">VLANs</MenuItem>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}
