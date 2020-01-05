import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelfQuery } from "../generated/graphql";

interface Props {
    component: React.ComponentType<any>;
    [key: string]: any;
}

export const AuthRoute: React.FC<Props> = ({
    component: Component,
    ...rest
}) => {
    const { data } = useSelfQuery();

    debugger;
    let isAuth = false;

    if (data && data.self) {
        isAuth = true;
    }

    return (
        <Route
            {...rest}
            render={props =>
                isAuth ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};
