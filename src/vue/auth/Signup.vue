<template>
  <div>
    <h2 class="auth-page__form-title">{{ i18n.lbl_get_started() }}</h2>
    <form novalidate @submit.prevent="submit">
      <div class="app__form-row">
        <div class="app__form-field">
          <input-field-unchained
            class="input-field"
            id="login-email"
            name="email"
            :label="i18n.su_email()"
            :errorMessage="errorMessage('email')"
            v-model.trim="form.email"
            v-validate="'required|email'"
          />
        </div>
      </div>

      <div class="app__form-row">
        <div class="app__form-field">
          <input-field-unchained
            class="input-field"
            id="login-password"
            type="password"
            name="password"
            :togglePassword="true"
            :label="i18n.su_pwd()"
            :errorMessage="errorMessage('password')"
            v-model.trim="form.password"
            v-validate="'required|min:6'"
          />
        </div>
      </div>

      <div class="app__form-row">
        <div class="app__form-field">
          <input-field-unchained
            class="input-field"
            id="login-confirm-password"
            type="password"
            name="confirm-password"
            :label="i18n.su_confirm()"
            :togglePassword="true"
            :errorMessage="errorMessage('confirm-password')"
            v-model.trim="form.confirmPassword"
            v-validate="'required|confirmed:password'"
            data-vv-as="password"
          />
        </div>
      </div>

      <div class="auth-page__submit">
        <button type="submit"
                class="auth-page__submit-btn"
                :disabled="isPending"
                v-ripple>
          {{ i18n.su_sign_up() }}
        </button>
      </div>
      <div class="auth-page__tips">
        <div class="auth-page__tip">
          {{ i18n.su_already_have_an_account() }}
          <router-link class="auth-page__tip-link" :to="routes.login">
            {{ i18n.su_sign_in() }}
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import formMixin from '../common/mixins/form.mixin'

  import { ErrorFactory, errorTypes, errors } from '../../js/errors/factory'
  import { ErrorHandler } from '../../js/errors/error_handler'
  import { vueRoutes } from '../../vue-router/const'
  import { Keypair } from 'tokend-js-sdk'
  import { showRememberSeedMessage } from '../../js/modals/remember_seed.modal'
  import config from '../../config'

  import { emailService } from '../../js/services/email.service'
  import { authService } from '../../js/services/auth.service'
  import { i18n } from '../../js/i18n'

  export default {
    mixins: [formMixin],

    data () {
      return {
        form: {
          email: '',
          password: '',
          confirmPassword: ''
        },
        routes: vueRoutes,
        i18n
      }
    },

    methods: {
      async submit () {
        if (!await this.isValid()) return
        this.form.email = this.form.email.toLowerCase()
        this.disable()
        try {
          await this.checkEmailValidity()
          const recoveryKeypair = Keypair.random()
          const walletId = await authService.signup(this.form, recoveryKeypair)
          this.enable()
          await showRememberSeedMessage(recoveryKeypair.secret())
          this.goShowEmail(walletId)
        } catch (error) {
          switch (error.constructor) {
            case errors.ConflictError:
              error.showBanner(i18n.auth_user_exists())
              break
            default:
              ErrorHandler.processUnexpected(error)
          }
          this.enable()
        }
      },

      async checkEmailValidity () {
        if (!config.VALIDATE_EMAILS) return Promise.resolve(true)

        const emailDetails = await emailService.validateOnMailgun(this.email)

        if (emailDetails.is_valid === false) {
          ErrorFactory.throwError(errorTypes.InvalidEmailError)
        }
        if (emailDetails.is_role_address) {
          ErrorFactory.throwError(errorTypes.RoleEmailError)
        }
        if (emailDetails.is_disposable_address) {
          ErrorFactory.throwError(errorTypes.DisposableEmailError)
        }
        return Promise.resolve(true)
      },

      goShowEmail (walletId) {
        const route = { ...vueRoutes.email, query: { walletId, email: this.form.email } }
        this.$router.push(route)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'auth';
</style>
