import { useRoutes, BrowserRouter } from "react-router-dom";
import './App.css'
import { Home, Landing, Form, Detail } from "./Views";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

function App() {

  const AppRoutes = () =>{
    let routes = useRoutes([
      { path:"/", element:<Landing/>},
      { path:"/home", element:<Home/>},
      { path:"/create", element:<Form/>},
      { path:`/pokemon/:name/:id`, element:<Detail/>}
    ])
    return routes;
  }
  

  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App
