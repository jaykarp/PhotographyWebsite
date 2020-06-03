import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { DesktopHome, MobileHome } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Bye } from "./pages/Bye";
import { DesktopHeader, MobileHeader } from "./Header";
import { DesktopFooter } from "./Footer";
import { DesktopCatalog } from "./pages/Catalog";
import { DesktopContact } from "./pages/Contact";
import { AuthRoute } from "./components/AuthRoute";
import { BrowserView, MobileView } from "react-device-detect";
import styled from "styled-components";
import {
    useBirdPhotosQuery,
    useWildlifePhotosQuery,
    useNaturePhotosQuery
} from "./generated/graphql";

const StyledBrowserRouter = styled(BrowserRouter)`
    display: flex;
    flex-flow: column;
    height: 100%;
`;

export const Routes: React.FC = () => {
    return (
        <>
            <BrowserView>
                <StyledBrowserRouter>
                    <DesktopHeader />
                    <Switch>
                        <Route
                            exact
                            path="/Birds"
                            render={() => (
                                <DesktopCatalog Query={useBirdPhotosQuery} />
                            )}
                        />
                        <Route
                            exact
                            path="/Wildlife"
                            render={() => (
                                <DesktopCatalog
                                    Query={useWildlifePhotosQuery}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/Nature"
                            render={() => (
                                <DesktopCatalog Query={useNaturePhotosQuery} />
                            )}
                        />
                        <Route path="/Contact" component={DesktopContact} />
                        <Route path="/" component={DesktopHome} />
                    </Switch>
                    <DesktopFooter />
                </StyledBrowserRouter>
            </BrowserView>
            <MobileView>
                <StyledBrowserRouter>
                    <MobileHeader />
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <AuthRoute exact path="/bye" component={Bye} />
                        <Route path="/" component={MobileHome} />
                    </Switch>
                </StyledBrowserRouter>
            </MobileView>
        </>
    );
};
