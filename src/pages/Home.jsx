import Menu from '../assets/components/Menu/Menu.jsx';
import MainSection from '../assets/components/Main/Main.jsx';
import Header from '../assets/components/Header/Header.jsx';
import '../assets/styles/home.scss';
// import '../assets/styles/menu.scss';
import { useState } from 'react';

function Home() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    // console.log("MenuItem:", menuItem);
  };
  return (
    <div className="home">
      <Menu onMenuItemClick={handleMenuItemClick} />
      <div className="container-main">
        {/** HEADER */}
        <Header selectedMenuItem={selectedMenuItem}/>
        {/** BODY */}
        <MainSection selectedMenuItem={selectedMenuItem}/>
      </div>
      {/* <Header selectedMenuItem={selectedMenuItem}/> */}
    </div>
  );
}

export default Home;
