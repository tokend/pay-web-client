<template>
  <nav class="navbar">
    <h2 class="navbar__title">{{ $route.meta.pageName }}</h2>
    <div class="navbar__user">
      <div class="navbar__user-notif navbar__user-notif--mobile">
        <!-- NOTE: notifications are temporarily disabled -->
        <!-- <button @click="toggleNotificationCardVisibility"
                class="app__button-icon">
          <md-icon>notifications</md-icon>
        </button>
        <md-card class="navbar__notif-card md-elevation-6" :class="{ 'navbar__notif-card--active': isNotificationCardOpen }">
          <md-card-content>
            <div class="navbar__notif-card-content">
              <p v-if="accountType === ACCOUNT_TYPES.notVerified" class="navbar__notif-status">
                Your account functionality is restricted. To get advanced functionality go to
                <a class="notif-link" @click="goKyc">KYC</a>.
              </p>
              <p v-else class="navbar__notif-status">No new notifications!</p>
            </div>
          </md-card-content>
        </md-card> -->
      </div>
      <div class="navbar__user-picture" @click="isUserCardOpen = true">
        {{ userEmail.substr(0, 1).toUpperCase() }}
      </div>
      <div class="navbar__user-info">
        <div class="navbar__user-name" @click="isUserCardOpen = true">
          {{ userEmail }}
          <md-icon class="navbar__user-name-icon" :class="{ 'navbar__user-name-icon--active': isUserCardOpen }">
            keyboard_arrow_down
          </md-icon>
        </div>
        <div class="navbar__account-type">
          <template v-if="accountTypeI === ACCOUNT_TYPES.notVerified">
            {{ i18n.lbl_type_unverified() }}
          </template>
          <template v-else-if="accountTypeI === ACCOUNT_TYPES.individual">
            {{ i18n.lbl_type_general() }}
          </template>
          <template v-else-if="accountTypeI === ACCOUNT_TYPES.syndicate">
            {{ i18n.lbl_type_corporate() }}
          </template>
        </div>
        <!-- NOTE: notifications are temporarily disabled -->
        <!-- <div class="navbar__user-notif"
              :class="{ 'navbar__user-notif--has-value': true }"
              @click="toggleNotificationCardVisibility">
          <span v-if="!hasSeenNotif && accountType === ACCOUNT_TYPES.notVerified" class="navbar__notif-counter">1</span>
          2 notifications

          <md-card class="navbar__notif-card md-elevation-6" :class="{ 'navbar__notif-card--active': isNotificationCardOpen }">
            <md-card-content>
              <div class="navbar__notif-card-content">
                <p v-if="accountType === ACCOUNT_TYPES.notVerified" class="navbar__notif-status">
                  Your account functionality is restricted. To get advanced functionality go to
                  <a class="notif-link" @click="goKyc">KYC</a>.
                </p>
                <p v-else class="navbar__notif-status">No new notifications!</p>
              </div>
            </md-card-content>
          </md-card>
        </div> -->
      </div>

      <md-card class="navbar__user-card md-elevation-6" :class="{ 'navbar__user-card--active': isUserCardOpen }">
        <md-card-content class="navbar__user-card-ctn">
          <div class="navbar__user-card-content">
            <div class="navbar__user-avatar">
              {{ userEmail.substr(0, 1).toUpperCase() }}
            </div>
            <div class="navbar__user-card-info">
              <p class="navbar__user-card-name">{{ userEmail }}</p>
              <!-- TODO: account status temporarily disabled -->
              <!-- <p class="navbar__user-card-status" v-if="!accountBlocked">{{ `${i18n.lbl_account()} ${accountState === 'nil' ? 'not verifed' : accountState }` }}</p>
              <p class="navbar__user-card-status navbar__user-card-status--blocked" v-else>{{ i18n.lbl_userBlocked() }}</p> -->
              <div class="navbar__user-card-status">
                <template v-if="accountTypeI === ACCOUNT_TYPES.notVerified">
                  {{ i18n.lbl_type_unverified() }}
                </template>
                <template v-else-if="accountTypeI === ACCOUNT_TYPES.individual">
                  {{ i18n.lbl_type_general() }}
                </template>
                <template v-else-if="accountTypeI === ACCOUNT_TYPES.syndicate">
                  {{ i18n.lbl_type_corporate() }}
                </template>
              </div>
              <button v-ripple="'rgba(255, 255, 255, .2)'"
                      @click="goKyc"
                      class="navbar__user-card-account-btn">
                {{ i18n.lbl_my_account() }}
              </button>
            </div>
          </div>
          <div class="navbar__user-actions">
            <button v-ripple class="navbar__user-action" @click="goSettings">
              {{ i18n.lbl_settings() }}
            </button>
            <button v-ripple class="navbar__user-action" @click="signOut">
              {{ i18n.lbl_signout() }}
            </button>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </nav>
</template>

<script>
  import { vuexTypes } from '../../vuex/types'
  import { i18n } from '../../js/i18n'
  import { mapActions, mapGetters } from 'vuex'
  import { commonEvents } from '../../js/events/common_events'
  import { attachEventHandler } from '../../js/events/helpers'
  import { vueRoutes } from '../../vue-router/const'
  import { ACCOUNT_TYPES } from '../../js/const/xdr.const'
  import { closeElement } from '@/js/helpers/closeElement'

  export default {
    name: 'root-navbar',

    data: () => ({
      routes: [],
      isUserCardOpen: false,
      isNotificationCardOpen: false,
      hasSeenNotif: null,
      i18n,
      ACCOUNT_TYPES
    }),

    computed: {
      ...mapGetters([
        vuexTypes.isLoggedIn,
        vuexTypes.userEmail,
        vuexTypes.userType,
        vuexTypes.accountState,
        vuexTypes.accountType,
        vuexTypes.accountTypeI,
        vuexTypes.accountBlocked
      ])
    },

    created () {
      attachEventHandler(commonEvents.routesUpdateEvent, this.updateRoutes)
      this.hasSeenNotif = localStorage.hasOwnProperty('seen')
    },

    methods: {
      ...mapActions([
        vuexTypes.LOG_OUT
      ]),
      updateRoutes (routes) {
        this.routes = routes
      },
      toggleUserCardVisibility () {
        this.isUserCardOpen = !this.isUserCardOpen
        this.isNotificationCardOpen = false
      },

      toggleNotificationCardVisibility () {
        this.isNotificationCardOpen = !this.isNotificationCardOpen
        this.isUserCardOpen = false
        if (!this.hasSeenNotif) {
          localStorage.setItem('seen', 'User saw it')
          this.hasSeenNotif = true
        }
      },
      signOut () {
        this.LOG_OUT()
      },
      goSettings () {
        this.isUserCardOpen = false
        this.$router.push(vueRoutes.settings)
      },
      goKyc () {
        this.isUserCardOpen = false
        this.isNotificationCardOpen = false
        this.$router.push(vueRoutes.verification)
      }
    },
    watch: {
      isUserCardOpen (value) {
        closeElement('navbar__user-card', value, this.toggleUserCardVisibility)
      },
      isNotificationCardOpen (value) {
        closeElement('navbar__user-notif', value, this.toggleNotificationCardVisibility)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/mixins";
  @import "../../scss/variables";

  $custom-breakpoint: 800px;

  .navbar {
    width: 100%;
    min-height: 121px;
    background-color: $col-md-background;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include respond-to(xsmall) {
      padding: 0 16px;
    }
  }

  .navbar__user-info {
    @include respond-to-custom($custom-breakpoint) {
      display: none;
    }
  }

  .navbar__title {
    color: $col-md-primary;
  }

  .navbar__user {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .navbar__user-picture {
    width: 55px;
    height: 55px;
    font-size: 24px;
    box-shadow: 0 4px 10px 0 rgba($col-md-primary, .15);
    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: rgba($col-md-primary, .15);

    @include respond-to-custom($custom-breakpoint) {
      margin-right: 0;
    }
  }

  .navbar__user-action {
    @include button-flat();
  }

  .navbar__user-name,
  .navbar__user-name-icon {
    font-size: 18px;
    cursor: pointer;
    color: $col-md-primary !important; // TODO: remove important rule when possible
  }

  .navbar__user-name:hover > .navbar__user-email {
    text-decoration: underline;
  }

  .navbar__account-type {
    color: $col-md-primary;
    font-size: 12px;
  }

  .navbar__user-notif {
    color: $col-md-primary;
    padding-left: 12px;
    font-size: 12px;
    cursor: pointer;
    display: inline-block;

    &.navbar__user-notif--mobile {
      display: none;

      @include respond-to-custom($custom-breakpoint) {
        display: flex;
      }
    }

    @include respond-to-custom($custom-breakpoint) {
      display: none;
      margin-right: 16px;
      display: flex;

      i {
        color: rgba($col-md-primary, .8) !important;
        font-size: 28px !important;
      }
    }

    &:not(.navbar__user-notif--mobile):hover {
      text-decoration: underline;
    }
  }

  .navbar__user-notif--has-value {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: calc(50% - 2px);
      left: 2px;
      height: 4px;
      width: 4px;
      border-radius: 50%;
      background-color: #f5645b;
    }
  }

  .navbar__user-name-icon {
    transition: .3s ease-out;
    will-change: transform;

    &.navbar__user-name-icon--active {
      transform: rotate(-180deg)
    }
  }

  .navbar__root-links {
    display: flex;
    flex-wrap: nowrap;
  }

  .navbar__notif,
  .navbar__user {
    position: relative;
  }

  .navbar__open-info-btn {
    text-transform: none;
    margin-left: 0;
  }

  .navbar__notif-card,
  .navbar__user-card {
    position: absolute;
    right: 0;
    top: calc(100% + 14px);
    overflow: visible;
    visibility: hidden;
    opacity: 0;
    margin-top: -15px;
    transition: .3s ease-out;

    & > .md-card-content {
      padding: 0;
    }

    &:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 8px 8px 8px;
      border-color: transparent transparent #ffffff transparent;
      top: -8px;
      right: 4px;
    }
  }

  .navbar__user-card {
    padding: 24px 24px 0 24px;

    @include respond-to-custom($custom-breakpoint) {
      width: calc(100vw - 230px - 40px); // 230px - sidebar width
    }
    @include respond-to(small) {
      padding: 16px;
      width: calc(100vw - 16px);
      max-width: 404px;
    }
    @include respond-to(xsmall) {
      width: calc(100vw - 32px);
    }

    &:before {
      @include respond-to-custom($custom-breakpoint) {
        right: 19px;
      }
    }
  }

  .navbar__user-card--active {
    visibility: visible;
    opacity: 1;
    margin-top: 0;
  }

  .navbar__open-notif-btn {
    position: relative;

    & .navbar__notif-counter {
      position: absolute;
      top: 0;
      right: 0;
      width: 15px;
      height: 15px;
      background-color: #ffa000;
      border-radius: 50%;
      color: #ffffff;
    }
  }

  .navbar__notif-card {
    padding: 0;
    width: 404px;

    & .navbar__notif-card-content { font-size: 12px; }
    &:before {
      border-color: transparent transparent #fff transparent;
      @include respond-to-custom($custom-breakpoint) {
        right: 150px;
      }
    }
    @include respond-to-custom($custom-breakpoint) {
      right: 0;
      max-width: 404px;
      width: calc(100vw - 404px + 125px);
    }
    @include respond-to(small) {
      width: calc(100vw - 24px);
    }
    @include respond-to(xsmall) {
      width: calc(100vw - 32px);
    }
  }

  .navbar__notif-card--active {
    margin: 0;
    visibility: visible;
    opacity: 1;
  }

  .navbar__user-card-content {
    display: flex;
    padding-bottom: 21px;
    position: relative;

    @include respond-to(small) {
      flex-direction: column;
      align-items: center;
    }
  }

  .navbar__user-actions {
    position: relative;
    padding: 8px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:after {
      content: '';
      position: absolute;
      height: 1px;
      width: calc(100% + 48px);
      background-color: #e8e8e8;
      left: -24px;
      top: 0;
    }
  }

  .navbar__user-avatar {
    width: 102px;
    height: 102px;
    border-radius: 50%;
    font-size: 48px;
    color: #fff;
    background-color: #ccc;
    margin-right: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;

    @include respond-to(small) {
      margin-right: 0;
      margin-bottom: 12px;
    }
  }

  .navbar__user-card-name {
    font-size: 16px;
    line-height: 1;
    text-align: left;
    color: $col-md-primary;
    margin-top: 4px;
    margin-bottom: 4px;

    @include respond-to-custom($custom-breakpoint) {
      word-break: break-word;
    }
  }

  .navbar__user-card-status {
    font-size: 12px;
    line-height: 1;
    text-align: left;
    color: $col-md-primary;

    @include respond-to(small) {
      text-align: center;
    }
  }

  .navbar__user-card-account-btn {
    margin: 26px 0 0 0;
    @include button-raised();

    @include respond-to(small) {
      display: block;
      margin-right: auto;
      margin-left: auto;

      &:last-child {
        margin-right: auto;
        margin-left: auto;
      }
    }
  }

  .navbar__user-action-btn {
    color: rgba(0, 0, 0, .75) !important;
  }

  .notif-link {
    cursor: pointer;
    text-decoration: underline;
    color: #03a9f4;
  }

  .navbar__user-card-ctn {
    padding: 0 !important;
  }

  .navbar__user-card-status--blocked {
    color: red;
  }
</style>
