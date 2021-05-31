import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from "./components/login"
import Header from "./components/header"
import Home from "./components/home"
import Detail from './components/detail';

import './App.css';

//

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/movie/:id"><Detail /></Route>
          <Route path="/home"><Home /></Route>
          <Route exact path="/"><Login/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
