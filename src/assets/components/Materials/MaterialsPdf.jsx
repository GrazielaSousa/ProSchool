
export const MaterialsPdf = ({ materials, onBackClick }) => {
  const handleBackClick = () => {
    onBackClick();
  };
  return (
    <>
      <button onClick={handleBackClick}>Voltar</button>
      <h1>{materials.text}</h1>
    </>
  );
};
