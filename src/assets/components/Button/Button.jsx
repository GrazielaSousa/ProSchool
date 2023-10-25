import PropTypes from 'prop-types';
import '../Forms/form_login.scss';

export const Button = ({textButton, onClick}) => {
  return (
    <>
      <div className="container-btn">
        <button className="btn-submit" onClick={onClick}>{textButton}</button>
      </div>
    </>
  );
};

Button.propTypes = {
  textButton: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
