import PropTypes from 'prop-types';
export const LoginPrimary = ({onBackToLoginClick}) => {
    return (
      <>
        {/* Conteúdo do terceiro componente quando a data de login estiver vazia */}
        <p>Data de login está vazia. Exibindo o Terceiro Componente.</p>
        <button onClick={onBackToLoginClick}>Voltar para o login</button>
      </>
    );
}

LoginPrimary.propTypes = {
  onBackToLoginClick : PropTypes.func,
};
