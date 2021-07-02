import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from './Main'
import Registration from './components/Registration'
import Login from './components/Login'
import NotFound from './components/NotFound'

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/registration" component={Registration} />
                <Route path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;