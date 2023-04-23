import "./Home.css";
import Sidebar from "./Sidebar.jsx"

function Home() {
  

  return (
    <div className="app">
      
        <div className="app_body">
          <Sidebar />
          {/* {user.chat ? <Chat messages={messages} /> : " "} */}

        </div>
     
    </div>


  )
}

export default Home;
