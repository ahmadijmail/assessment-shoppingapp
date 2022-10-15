import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";


const Dashboard = () => {

  return (
    <StyledDashboard>
      <SideNav>
        <h3>Dashboard</h3>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/addproduct/add"
        >
          Add Product
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/addproduct/myproducts"
        >
          My Products
        </NavLink>
      </SideNav>
      <Content>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: 100%
  position: sticky;
  overflow-y: auto;
  width: 20%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }
  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
  }
`;

const Content = styled.div`
  margin-left: 30px;
  padding: 2rem 3rem;
  width: 100%;
`;
