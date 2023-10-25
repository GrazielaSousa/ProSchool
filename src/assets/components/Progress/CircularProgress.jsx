import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './progress.scss';

const percentage = 32;
function CircularProgress () {
  return (
      <div className="container-progress">

        <div className="progress" >
        <h2>Total de Faltas</h2>
          <CircularProgressbar 
            value={percentage} 
            text={`${percentage}%`}
            strokeWidth={11}
            styles={buildStyles({
              textColor: "#101828",
              pathColor: "#828DD9",
              trailColor: "#E6E8F7",
              textSize: "22px",
            })}/>
        </div>   

        <div className="progress">
          <h2>Média geral</h2>
          <CircularProgressbar 
            value={80} 
            text='6/10'
            strokeWidth={11}
            styles={buildStyles({
              textColor: "#101828",
              pathColor: "#F1D4AC",
              trailColor: "#FAF2E6",
              textSize: "22px",
            })} />
        </div>
        
      </div>
    )
}

export default CircularProgress;