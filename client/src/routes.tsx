import React from "react"
import { Switch, Route, Redirect} from "react-router-dom"
import { AuthPage } from "./pages/AuthPage"
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { TransportFormPage } from "./pages/TransportFormPage"


export const useRoutes = (isAuthenticated:boolean) => {
    if (isAuthenticated){
        return (
            <Switch>
                <Route path = "/transport" exact>
                    <TransportFormPage />
                </Route>

                <Route path = "/create" exact>
                    <CreatePage />
                </Route>

                <Route path = "/transport-detail/:id" exact>
                    <DetailPage />
                </Route>
                <Redirect to = '/create'></Redirect>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to = '/' />
        </Switch>
    )
}

