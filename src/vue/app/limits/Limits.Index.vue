<template>
  <div class="limits app__page-content-wrp">
    <h2 class="app__page-heading">{{ i18n.lim_heading() }}</h2>

    <div class="limits__select-wrp">
      <select-field-unchained v-model="filters.tokenCode"
                    :values="Object.keys(accountBalances)"
                    :label="i18n.lbl_asset()"
      />
      <div class="app__form-field-description">
        <p v-if="filters.tokenCode">
          {{ i18n.transfer_balance({ amount: balance.balance, asset: filters.tokenCode }) }}
        </p>
      </div>
    </div>


      <template v-if="filters.tokenCode">
        <template v-for="[op, name] in Object.entries(LIMIT_OPS)">
          <div class="limits__list">

            <h3 class="limits__op-name">{{ name }}</h3>

            <div class="limits__list-content">
              <p class="limits__list-item">
                <span class="limits__list-item-label">{{ i18n.lim_daily() }}:</span>
                {{ limits[op].dailySpent ? i18n.c(limits[op].dailySpent) : '—' }}
                <template v-if="limits[op].dailySpent">{{ i18n.lim_spent() }}</template>
                /
                {{ limits[op].dailyLimit ? i18n.c(limits[op].dailyLimit) : '—' }}
                <template v-if="limits[op].dailyLimit">{{ i18n.lim_total() }}</template>
              </p>


              <p class="limits__list-item">
                <span class="limits__list-item-label">{{ i18n.lim_weekly() }}:</span>
                {{ limits[op].weeklySpent ? i18n.c(limits[op].weeklySpent) : '—' }}
                <template v-if="limits[op].weeklySpent">{{ i18n.lim_spent() }}</template>
                /
                {{ limits[op].weeklyLimit ? i18n.c(limits[op].weeklyLimit) : '—' }}
                <template v-if="limits[op].weeklyLimit">{{ i18n.lim_total() }}</template>
              </p>


              <p class="limits__list-item">
                <span class="limits__list-item-label">{{ i18n.lim_monthly() }}:</span>
                {{ limits[op].monthlySpent ? i18n.c(limits[op].monthlySpent) : '—' }}
                <template v-if="limits[op].monthlySpent">{{ i18n.lim_spent() }}</template>
                /
                {{ limits[op].monthlyLimit ? i18n.c(limits[op].monthlyLimit) : '—' }}
                <template v-if="limits[op].monthlyLimit">{{ i18n.lim_total() }}</template>
              </p>


              <p class="limits__list-item">
                <span class="limits__list-item-label">{{ i18n.lim_annual() }}:</span>
                {{ limits[op].annualSpent ? i18n.c(limits[op].annualSpent) : '—' }}
                <template v-if="limits[op].annualSpent">{{ i18n.lim_spent() }}</template>
                /
                {{ limits[op].annualLimit ? i18n.c(limits[op].annualLimit) : '—' }}
                <template v-if="limits[op].annualLimit">{{ i18n.lim_total() }}</template>
              </p>

            </div>
          </div>
        </template>
      </template>


  </div>
</template>

<script>
  import LimitsRequestsList from './Limits.List'
  import FormMixin from '../../common/mixins/form.mixin'
  import LimitsIndexMixin from './limits-index.mixin'

  export default {
    name: 'LimitsIndex',
    mixins: [LimitsIndexMixin, FormMixin],
    components: { LimitsRequestsList }
  }
</script>

<style lang="scss">
  @import '../../../scss/variables';

  .limits__select-wrp {
    margin-bottom: 4 * $point;
  }

  .limits__op-name,
  .limits__list-item {
    color: $col-md-primary;
  }

  .limits__list { margin-bottom: 3.2 * $point }
  .limits__op-name { margin-bottom: 1.6 * $point }
  .limits__list-item { margin-bottom: .75 * $point }
  .limits__list-item-label {
    display: inline-block;
    margin-right: 1 * $point;
    width: 10 * $point;
    /*width: 100%;*/
  }
</style>
