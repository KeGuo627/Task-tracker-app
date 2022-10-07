import PropTypes from "prop-types";

import Button from "./Button";

const Header = ({ title, onAddButton, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? "grey" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAddButton}
      />
    </header>
  );
};
Header.defaultProps = {
  title: "Task Tracker",
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
/*const headingStyle = {
  color: "red",
  backgroundColor: "black",
};*/
export default Header;
