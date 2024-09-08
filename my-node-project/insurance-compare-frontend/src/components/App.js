import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home'; // Example of a Home component

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} /> {/* Home page route */}
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                {/* Add a 404 page or redirect for unmatched routes */}
                <Route path="*">
                    <h1>404 Not Found</h1>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

