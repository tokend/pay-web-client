<template>
  <div class="state-banner" :class="`state-banner--${accountState}`" v-if="accountState !== ACCOUNT_STATES.nil">
    <div class="state-banner__inner">


      <p class="state-banner__message" v-if="accountState === ACCOUNT_STATES.approved" >
        <md-icon class="md-icon-size-065x">verified_user</md-icon>
        {{ i18n.kyc_approved_msg() }}
      </p>
      <p class="state-banner__message" v-if="accountState === ACCOUNT_STATES.pending" >
        <md-icon class="md-icon-size-065x">watch_later</md-icon>
        {{ i18n.kyc_waiting_msg() }}
      </p>
      <p class="state-banner__message" v-if="accountState === ACCOUNT_STATES.rejected" >
        <md-icon class="md-icon-size-065x">warning</md-icon>
        {{ i18n.kyc_rejected_msg() }}
      </p>
    </div>

  </div>
</template>

<script>
  import { i18n } from '../../../../js/i18n'
  import { mapGetters } from 'vuex'
  import { vuexTypes } from '../../../../vuex/types'
  import { ACCOUNT_STATES } from '../../../../js/const/account.const'

  export default {
    name: 'state-banner',
    data: _ => ({
      i18n,
      ACCOUNT_STATES
    }),
    computed: {
      ...mapGetters([
        vuexTypes.accountState
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../scss/variables';

  .state-banner {
    font-size: $fs-tip;
    margin-bottom: .8rem;
    text-align: center;


    .md-icon {
      position: relative;
      bottom: .05rem;
      margin-right: .2rem;
    }

    &--pending {
      .state-banner__message,
      .md-icon {
        color: $col-md-pending;
      }
    }

    &--approved {
      .state-banner__message,
      .md-icon {
        color: $col-md-primary;
      }
    }

    &--rejected {
      .state-banner__message,
      .md-icon {
        color: $col-md-accent;
      }
    }
  }
</style>
