import './alert.scss';

const Alert = () => {
  return (
    <div className="container">
      <div className="container-alert">
        <div className="alert-flex">
          <span className="material-icons-outlined icon-alert">info</span>
          <p className="alert-text">Aviso</p>
        </div>
        <p className="text-alert">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
          architecto maxime sapiente veniam expedita quae et quo? Labore, rem
          repellendus in reiciendis, tempora dolorem nemo ullam odit, quidem
          necessitatibus laborum?
        </p>
      </div>
    </div>
  );
}

export default Alert;

