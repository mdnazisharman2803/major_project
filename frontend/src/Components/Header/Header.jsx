import Logo from "../../assests/logo.png";

const Header = (props) => {
  return (
    <div className="header">
      <img src={Logo} className="logo" alt="" />
    </div>
  );
};

export default Header;
