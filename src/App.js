
import { useEffect } from 'react';

import MainRoutes from './Pages/MainRoutes';
import WebFont from 'webfontloader';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './components/Home/HomePage';

function App() {
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid sans","chilanka"]
      }
    })
  },[])
  return (
    <div className="App">
      {/* <MainRoutes /> */}
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
