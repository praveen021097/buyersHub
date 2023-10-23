
import { useEffect } from 'react';

import MainRoutes from './Pages/MainRoutes';
import WebFont from 'webfontloader';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import "./App.css"
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
          <MainRoutes />
      <Footer />
    </div>
  );
}

export default App;
