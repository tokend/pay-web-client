import Vue from 'vue'
import Router from 'vue-router'

import store from '../vuex'
import config from '../config'
import { PAGES_NAMES } from '../js/const/const'

import { resolveRedirect } from './redirect'

// route components:
import Auth from '../vue/auth/Auth'
import Login from '../vue/auth/Login'
import Signup from '../vue/auth/Signup'
import Recovery from '../vue/auth/Recovery'
import EmailResend from '../vue/auth/ConfirmEmail'
import Terms from '../vue/public/legals/Legal.Terms'
import Downloads from '../vue/public/Public.Downloads'

import AppContent from '../vue/root/AppContent'

import Dashboard from '../vue/app/dashboard/Dashboard.Entry'
import DashboardIndex from '../vue/app/dashboard/index/Dashboard.Index'

import Deposit from '../vue/app/deposit/Deposit.Entry'
import DepositMake from '../vue/app/deposit/make/Deposit.Make'

import Transfers from '../vue/app/transfers/Transfers.Entry'
import TransfersMake from '../vue/app/transfers/make/Transfers.Make'

import MassTransfers from '../vue/app/massTransfers/MassTransfers.Entry'
import MassTransfersMake from '../vue/app/massTransfers/MassTransfers.Make'

import Withdrawal from '../vue/app/withdrawal/Withdrawal.Entry'
import WithdrawalMake from '../vue/app/withdrawal/make/Withdrawal.Make'

import Tokens from '../vue/app/tokens/Tokens.Entry'
import TokensExplore from '../vue/app/tokens/Tokens.Explore'

import History from '../vue/app/history/History.Entry'
import HistoryIndex from '../vue/app/history/index/History.Index'

import Limits from '../vue/app/limits/Limits.Entry'
import LimitsIndex from '../vue/app/limits/Limits.Index'

import Trade from '../vue/app/trade/Trade.Entry'
import TradeIndex from '../vue/app/trade/index/Trade.Index'

import Settings from '../vue/app/settings/Settings.Entry'
import SettingsSecurity from '../vue/app/settings/security/Settings.Security'

import Verification from '../vue/app/verification/Verification.Entry'
import VerificationMake from '../vue/app/verification/make/Verification.Make'

import TokenCreation from '../vue/app/tokenCreation/TokenCreation.Entry'
import TokenCreationIndex from '../vue/app/tokenCreation/index/TokenCreation.Index'

import IssuanceCreation from '../vue/app/issuanceCreation/IssuanceCreation.Entry'
import IssuanceCreationIndex from '../vue/app/issuanceCreation/index/IssuanceCreation.Index'

import SaleCreation from '../vue/app/saleCreation/SaleCreation.Entry'
import SaleCreationIndex from '../vue/app/saleCreation/SaleCreation.Index'

import Requests from '../vue/app/requests/Requests.Entry'
import RequestsIndex from '../vue/app/requests/index/Requests.Index'

import Sales from '../vue/app/sales/Sales.Entry'
import SalesDetails from '../vue/app/sales/sale_details/Sales.Details'
import SalesExplore from '../vue/app/sales/overview/Sales.Explore'

import SalesOwned from '../vue/app/salesOwned/SalesOwned.Entry'
import SalesOwnedIndex from '../vue/app/salesOwned/SalesOwned.Index'

import PreissuanceUpload from '../vue/app/preissuanceUpload/PreissuanceUpload.Entry'
import PreissuanceUploadIndex from '../vue/app/preissuanceUpload/index/PreissuanceUpload.Index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: { name: 'app' }
    },
    {
      path: '/r/*',
      name: 'horizon-redirect',
      beforeEnter: resolveRedirect
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms,
      meta: { pageName: PAGES_NAMES.terms }
    },
    {
      path: '/downloads',
      name: 'downloads',
      component: Downloads,
      meta: { pageName: PAGES_NAMES.downloads }
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      redirect: { name: 'login' },
      children: [
        {
          path: '/sign-in',
          name: 'login',
          component: Login,
          meta: { some: 'alalal' },
          beforeEnter: authPageGuard
        },
        {
          path: '/sign-up',
          name: 'signup',
          component: Signup,
          beforeEnter: authPageGuard
        },
        {
          path: '/verify-email',
          name: 'email',
          component: EmailResend,
          beforeEnter: authPageGuard
        },
        {
          path: '/recovery',
          name: 'recovery',
          component: Recovery,
          beforeEnter: authPageGuard
        }
      ]
    },
    {
      path: '/',
      name: 'app',
      component: AppContent,
      beforeEnter: inAppRouteGuard,
      redirect: { name: 'app.dashboard' },
      children: [
        {
          feature_flag: config.FEATURE_FLAGS.dashboard,
          name: 'app.dashboard',
          path: '/dashboard',
          component: Dashboard,
          redirect: { path: '/dashboard/index' },
          children: [
            {
              path: '/dashboard/index',
              name: 'dashboard.index',
              meta: { pageName: PAGES_NAMES.dashboard },
              component: DashboardIndex
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.deposit,
          name: 'app.deposit',
          path: '/deposit',
          component: Deposit,
          redirect: { path: '/deposit/make' },
          children: [
            {
              path: '/deposit/make',
              name: 'deposit.make',
              meta: { pageName: PAGES_NAMES.deposit },
              component: DepositMake
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.limits,
          name: 'app.limits',
          path: '/limits',
          component: Limits,
          redirect: {path: '/limits/index'},
          children: [
            {
              path: '/limits/index',
              name: 'limits.index',
              meta: { pageName: PAGES_NAMES.limits },
              component: LimitsIndex
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.transfers,
          name: 'app.transfers',
          path: '/transfers',
          component: Transfers,
          redirect: { path: '/transfers/make' },
          children: [
            {
              path: '/transfers/make',
              name: 'transfers.make',
              meta: { pageName: PAGES_NAMES.send },
              component: TransfersMake
            },
            {
              path: '/transfers/make/:tokenCode',
              name: 'transfers.make:tokenCode',
              meta: { pageName: PAGES_NAMES.send },
              component: TransfersMake
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.massTransfers,
          name: 'app.mass-transfers',
          path: '/mass-transfers',
          component: MassTransfers,
          redirect: { path: '/mass-transfers/make' },
          children: [
            {
              path: '/mass-transfers/make',
              name: 'mass-transfers.make',
              component: MassTransfersMake
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.withdrawal,
          name: 'app.withdrawal',
          path: '/withdrawal',
          component: Withdrawal,
          redirect: { path: '/withdrawal/make' },
          children: [
            {
              path: '/withdrawal/make',
              name: 'withdrawal.make',
              meta: { pageName: PAGES_NAMES.withdraw },
              component: WithdrawalMake
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.tokens,
          name: 'app.tokens',
          path: '/tokens',
          component: Tokens,
          redirect: { path: '/tokens/explore' },
          children: [
            {
              path: '/tokens/explore',
              name: 'tokens.explore',
              meta: { pageName: PAGES_NAMES.exploreTokens },
              component: TokensExplore
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.history,
          name: 'app.history',
          path: '/history',
          component: History,
          redirect: { path: '/history/index' },
          children: [
            {
              path: '/history/index',
              name: 'history.index',
              meta: { pageName: PAGES_NAMES.history },
              component: HistoryIndex
            },
            {
              path: '/history/index/:tokenCode',
              name: 'history.index:tokenCode',
              meta: { pageName: PAGES_NAMES.history },
              component: HistoryIndex
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.trade,
          name: 'app.trade',
          path: '/trade',
          component: Trade,
          redirect: { path: '/trade/index' },
          children: [
            {
              path: '/trade/index',
              name: 'trade.index',
              meta: { pageName: PAGES_NAMES.trade },
              component: TradeIndex
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.settings,
          name: 'app.settings',
          path: '/settings',
          component: Settings,
          redirect: { path: '/settings/security' },
          children: [
            {
              path: '/settings/security',
              name: 'settings.security',
              meta: { pageName: PAGES_NAMES.settings },
              component: SettingsSecurity
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.verification,
          name: 'app.verification',
          path: '/verification',
          component: Verification,
          redirect: { path: '/verification/make' },
          children: [
            {
              path: '/verification/make',
              name: 'verification.make',
              meta: { pageName: PAGES_NAMES.verification },
              component: VerificationMake
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.tokenCreation,
          name: 'app.tokenCreation',
          path: '/token-creation',
          component: TokenCreation,
          redirect: { path: '/token-creation/index' },
          children: [
            {
              path: '/token-creation/index',
              name: 'token-creation.index',
              meta: { pageName: PAGES_NAMES.createToken },
              component: TokenCreationIndex,
              props: true
            },
            {
              path: '/token-creation/index/:id',
              name: 'token-creation.index:id',
              meta: { pageName: PAGES_NAMES.createToken },
              component: TokenCreationIndex,
              props: true
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.saleCreation,
          name: 'app.saleCreation',
          path: '/sale-creation',
          component: SaleCreation,
          redirect: { path: '/sale-creation/index' },
          children: [
            {
              path: '/sale-creation/index',
              name: 'sale-creation.index',
              meta: { pageName: PAGES_NAMES.createSale },
              component: SaleCreationIndex,
              props: true
            },
            {
              path: '/sale-creation/index/:id',
              name: 'sale-creation.index:id',
              meta: { pageName: PAGES_NAMES.createSale },
              component: SaleCreationIndex,
              props: true
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.issuanceCreation,
          name: 'app.issuanceCreation',
          path: '/issuance-creation',
          component: IssuanceCreation,
          redirect: { path: '/issuance-creation/index' },
          children: [
            {
              path: '/issuance-creation/index',
              name: 'issuance-creation.index',
              meta: { pageName: PAGES_NAMES.createIssuance },
              component: IssuanceCreationIndex,
              props: true
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.requests,
          name: 'app.requests',
          path: '/requests',
          component: Requests,
          redirect: { path: '/requests/index' },
          children: [
            {
              path: '/requests/index',
              name: 'requests.index',
              meta: { pageName: PAGES_NAMES.requests },
              component: RequestsIndex
            },
            {
              path: '/requests/token-creation',
              name: 'requests.token-creation',
              meta: { pageName: PAGES_NAMES.requests },
              component: RequestsIndex
            },
            {
              path: '/requests/sale-creation',
              name: 'requests.sale-creation',
              meta: { pageName: PAGES_NAMES.requests },
              component: RequestsIndex
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.sales,
          name: 'app.sales',
          path: '/sales',
          component: Sales,
          redirect: { path: '/sales/explore' },
          children: [
            {
              path: '/sales/explore',
              name: 'sales.explore',
              meta: { pageName: PAGES_NAMES.exploreSales },
              component: SalesExplore
            },
            {
              path: '/sales/details/:id',
              name: 'sales.sale-details',
              meta: { pageName: PAGES_NAMES.exploreSales },
              component: SalesDetails,
              props: true
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.sales,
          name: 'app.my-sales',
          path: '/my-sales',
          component: SalesOwned,
          redirect: { path: '/my-sales/index' },
          children: [
            {
              path: '/my-sales/index',
              name: 'my-sales.index',
              component: SalesOwnedIndex
            }
          ]
        },
        {
          feature_flag: config.FEATURE_FLAGS.preIssuanceUpload,
          name: 'app.preissuance-upload',
          path: '/preissuance-upload',
          component: PreissuanceUpload,
          redirect: { path: '/preissuance-upload/index' },
          children: [
            {
              path: '/preissuance-upload/index',
              name: 'preissuance-upload.index',
              meta: { pageName: PAGES_NAMES.preIssuance },
              component: PreissuanceUploadIndex,
              props: true
            }
          ]
        }
      ].filter(route => route.feature_flag !== false)
    }
  ]
})

export default router

// doesn't allow to visit auth page if user is already logged in
function authPageGuard (to, from, next) {
  const isLoggedIn = store.getters.isLoggedIn
  isLoggedIn ? next({ name: 'app' }) : next()
}

// doesn't allow to visit in-app page if user is not already logged in
function inAppRouteGuard (to, from, next) {
  const isLoggedIn = store.getters.isLoggedIn
  isLoggedIn
    ? next()
    : next({
      name: 'login',
      params: {
        redirect: {
          name: to.name || 'app'
        }
      }
    })
}
