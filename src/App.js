import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Users from "./users/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";

const App = () => {
    return (
        <Router>
            {/* Nav */}
            <main>
                <Switch>
                    <Route path="/" exact>
                        <Users />
                    </Route>
                    <Route path="/:userId/places" exact>
                        <UserPlaces />
                    </Route>
                    <Route path="/places/new" exact>
                        <NewPlace />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </main>
        </Router>
    );
};

export default App;