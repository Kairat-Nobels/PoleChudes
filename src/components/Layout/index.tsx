import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Navbar, Nav } from "rsuite";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/auth/authSlice";
import { useAppDispatch } from "@hooks/hooks";

const Layout = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <Navbar className="navbar">
        <Nav>
          <Nav.Item as={Link} to="/">Главная</Nav.Item>
          <Nav.Item as={Link} to="/game">Игра</Nav.Item>
          {isAuth && <Nav.Item as={Link} to="/admin">Админ</Nav.Item>}
        </Nav>

        <Nav pullRight>
          {isAuth ? (
            <Button appearance="subtle" onClick={handleLogout}>
              Выйти
            </Button>
          ) : (
            <Button as={Link} to="/auth" appearance="primary">
              Вход в админ
            </Button>
          )}
        </Nav>
      </Navbar>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
