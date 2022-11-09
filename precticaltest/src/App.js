import './App.css';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import { createContext, useState } from 'react';

export const Logincontext=createContext()

function App() {
  const [isLogin,SetisLogin]=useState(false);
  return (
    <Logincontext.Provider value={{isLogin,SetisLogin}}>
      <BrowserRouter>
		    <Main/>
      </BrowserRouter>
    </Logincontext.Provider>
  );
}

export default App;
