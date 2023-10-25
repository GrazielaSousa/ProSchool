import './headerRegister.scss';
import { PropTypes } from 'prop-types';

export const HeaderRegister = ({currentStep}) => {
  return (
    <>
      <header className="header-register">
        <h1 className="title-register">Insira as informações do usuário</h1>

        <div className="steps">

        <div className="progress-register">
          <p className={`text-step ${currentStep === 0 ? 'active-text' : 'inactive-text'}`}>1. Dados do usuário</p>
          <div className={`progress ${currentStep === 0 ? 'active-step' : 'inactive-step'}`}></div>
        </div>

        <div className="progress-register">
          <p className={`text-step ${currentStep === 1 ? 'active-text' : 'inactive-text'}`}>2. Endereço</p>
          <div className={`progress ${currentStep === 1? 'active-step' : 'inactive-step'}`}></div>
        </div>

        <div className="progress-register">
          <p className={`text-step ${currentStep === 2 ? 'active-text' : 'inactive-text'}`}>3. Dados escolar</p>
          <div className={`progress ${currentStep === 2 ? 'active-step' : 'inactive-step'}`}></div>
        </div>

        </div>
      </header>
    </>
  );
};

HeaderRegister.propTypes= {
  currentStep: PropTypes.number.isRequired,
}