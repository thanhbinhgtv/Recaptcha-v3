import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import RecaptchaV3 from './components/RecaptchaV3';
import Successful from './components/Successful';
import Failure from './components/Failure';
import Loading from './components/LoadingLogo';
import { useState } from 'react';

function App() {
  const [isloading, setIsLoading] = useState(false);
  return (
    <div className="App">
      {isloading && <Loading />}
      <Routes>
        <Route path='/' element={<RecaptchaV3 handleLoading={setIsLoading} />} />
        <Route path='/success' element={<Successful />} />
        <Route path='/failure' element={<Failure />} />
      </Routes>
    </div>
  );
}

export default App;
