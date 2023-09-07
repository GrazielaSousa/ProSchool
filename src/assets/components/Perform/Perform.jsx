
import CardDescription from "../Cards/CardDescription";

import Artes from '../../images/artes.svg';
import Historia from '../../images/historia.svg'

function Desempenho () {
  return (
    <div className="container-perform">
      <div className="cards-container">
        <CardDescription src={Artes} className="artes" alt="Artes" />
        <CardDescription src={Historia} className="Historia" alt="Historia" />       
        <CardDescription src={Historia} className="Historia" alt="Historia" />       
        <CardDescription src={Historia} className="Historia" alt="Historia" />       
        <CardDescription src={Historia} className="Historia" alt="Historia" />       
        <CardDescription src={Historia} className="Historia" alt="Historia"/>             

        <CardDescription src={Artes} className="artes" alt="Artes" />
        <CardDescription src={Historia} className="Historia" alt="Historia" />       
        <CardDescription src={Historia} className="Historia" alt="Historia" />       
        <CardDescription src={Historia} className="Historia" alt="Historia" />       
        <CardDescription src={Historia} className="Historia" alt="Historia" />       
        <CardDescription src={Artes} className="artes" alt="Artes" />        
      </div>    
    </div>
  )
}

export default Desempenho;