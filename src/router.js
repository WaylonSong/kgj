import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    },{
      path: '/front/user',
      models: () => [import('./models/user')],
      component: () => import('./routes/user/'),
    }, {
      path: '/front/user/:id',
      models: () => [import('./models/user/detail')],
      component: () => import('./routes/user/detail/'),
    }, {
      path: '/front/application',
      models: () => [import('./models/application')],
      component: () => import('./routes/application/'),
    },{
      path: '/front/company',
      models: () => [import('./models/company')],
      component: () => import('./routes/company/'),
    },{
      path: '/front/statistics',
      models: () => [import('./models/statistics')],
      component: () => import('./routes/statistics/'),
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/front/application" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
