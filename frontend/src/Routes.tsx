import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Bye } from "./pages/Bye";
import { Header } from "./Header";
import { AuthRoute } from "./components/AuthRoute";
import { ImgCatalog } from "./pages/ImgCatalog";

export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <div
                style={{
                    display: "flex",
                    flexFlow: "column",
                    height: "100%"
                }}
            >
                <Header />
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <AuthRoute exact path="/bye" component={Bye} />
                    <Route path="/catalog" component={ImgCatalog} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};
