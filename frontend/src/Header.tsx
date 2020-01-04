import React from "react";
import { Link } from "react-router-dom";
import { useSelfQuery, useLogoutMutation } from "./generated/graphql";
import { setAccessToken } from "./accessToken";

interface Props {}

export const Header: React.FC<Props> = () => {
    const { data, loading } = useSelfQuery();
    const [logout, { client }] = useLogoutMutation();

    let body: any = null;
    let loggedIn: Boolean = false;

    if (loading) {
        body = null;
    } else if (data && data.self) {
        body = <div> You are logged in as: {data.self.email} </div>;
        loggedIn = true;
    } else {
        body = <div> not logged in </div>;
    }

    return (
        <header>
            <div>
                <div>
                    <Link to="/"> Home </Link>
                </div>
                <div>
                    <Link to="/register"> Register </Link>
                </div>
                <div>
                    <Link to="/login"> Login </Link>
                </div>
                <div>
                    <Link to="/bye"> Bye </Link>
                </div>
                <div>
                    {loggedIn && (
                        <button
                            onClick={async () => {
                                await logout();
                                setAccessToken("");
                                await client!.resetStore();
                            }}
                        >
                            logout
                        </button>
                    )}
                </div>
                {body}
            </div>
        </header>
    );
};
