import logo from './logo.svg';
import './App.css';
import ListMoviesComponents from './components/ListMoviesComponents';
import HeaderComponent from './components/HeaderComponent';
import RentMovie from './components/RentMovie';
import ReturnMovie from './components/ReturnMovie';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (// here all the component come toghether this is the main react componet ir render all the individual components onto the browser
    <Router>
      <div>
        <HeaderComponent/>    
        <div className="container"> 
          <Switch>             {/*  this routes redirect the use to the righe page */}
            <Route path="/" exact component={ListMoviesComponents}></Route>             
            <Route path="/movies" exact component={ListMoviesComponents}></Route>             
            <Route path="/rent-movie/:id" exact component={RentMovie}></Route>
            <Route path="/return-movie" exact component={ReturnMovie}></Route>
          </Switch>         
        </div>
          <FooterComponent/>
      </div>
    </Router>
    
  );  
}


export default App;

