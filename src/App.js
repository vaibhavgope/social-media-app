import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/user/:username">
          <UserPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
