import { useEffect, useState } from 'react';
import ApiDetails from './ApiDetails';
import apiData from './data/apis.json';
import './App.css';
import Overview from './components/Sections/Overview';
import Authorization from './components/Sections/Authorization';
import RequestPage from './components/Sections/RequestPage';
import Token from './components/Sections/Token';

function App() {
  const data = apiData.data;
  const [activeApi, setActiveApi] = useState(data[0]);
  const [rerender, setRerender] = useState(false);
  const [isOpen,setIsOpen] = useState(false)
  const [screenHandler,setscreenHandler] = useState("overview")

  const apiClickHandler = (apiDetails) => {
    if (activeApi.id === apiDetails.id) return;
    setActiveApi(apiDetails);
    setRerender(true);
  };

  const handleToggle=()=>{
    setIsOpen((prev)=>!prev)
  }

  useEffect(() => {
    rerender && setRerender(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  return (
    <div className='container'>
      <div className='menu'>
        <div className='button-header' style={{padding:'5px'}} onClick={()=>setscreenHandler("overview")}>Overview</div>
        <div className='button-header' style={{padding:'5px'}} onClick={()=>setscreenHandler("auth")}>Application Registration</div>
        <div className='button-header' style={{padding:'5px'}} onClick={()=>setscreenHandler("request")}>Registering new certificated to API Gateway</div>
        <div className='button-header' style={{padding:'5px'}} onClick={()=>setscreenHandler("real")}>Real-time API Access & Security</div>
        <button className='button-header' style={{padding:'5px'}} onClick={handleToggle}>API Reference</button>
        {isOpen && <div>
          {data.map((d) => {
            const name = 'menu-item ' + (activeApi.id === d.id ? 'menu-active' : '');
            return <div
              className={name}
              onClick={() => apiClickHandler(d)}
              key={d.id}
            >
              <span>{d.displayName}</span>
              <span className='float-right color-green'>{d.method}</span>
            </div>
          })}
        </div>
        }
      </div>
      <div className='api-details'>
        {!screenHandler && !rerender && <ApiDetails apiDetails={activeApi} />}
        {screenHandler == "overview" && <Overview/>}
        {screenHandler == "auth" && <Authorization/>}
        {screenHandler == "request" && <RequestPage/>}
        {screenHandler === "real" && <Token/>}
      </div>
    </div>
  );
}

export default App;
