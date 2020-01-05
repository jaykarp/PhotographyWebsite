import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Bye } from "./pages/Bye";
import { Header } from "./Header";
import { Photos } from "./pages/Photos";
import { AuthRoute } from "./components/AuthRoute";

export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <AuthRoute exact path="/bye" component={Bye} />
                    <Route exact path="/photos" component={Photos} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};
