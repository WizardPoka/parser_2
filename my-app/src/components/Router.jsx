import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Home() {
    return <h2>Добро пожаловать на главную страницу</h2>;
  }
  
  function About() {
    return <h2>О нас</h2>;
  }
  
  function Contact() {
    return <h2>Контакты</h2>;
  }

function Router() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Главная</Link>
              </li>
              <li>
                <Link to='/about'>О нас</Link>
              </li>
              <li>
                <Link to='/contact'>Контакты</Link>
              </li>
            </ul>
          </nav>
  
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/contact'>
              <Contact />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

export default Router