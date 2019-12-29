<template>
  <section
    class="page login full-absolute flex-row justify-content-end align-items-center"
  >
    <a-card class="login-form" :title="$t('title')">
      <template #extra>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link">
            {{ $t('lang') }}
            <a-icon type="down" />
          </a>
          <template v-slot:overlay>
            <a-menu
              v-model="locale"
              selectable
              @select="onSelectLangage($event)"
            >
              <a-menu-item key="zh-cn">
                <a>中文</a>
              </a-menu-item>
              <a-menu-item key="en-us">
                <a>English</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <a-form
        :form="form"
        @submit="onSumbit"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 16, offset: 1 }"
      >
        <a-form-item :label="$t('form.username')">
          <a-input
            v-decorator="[
              'username',
              {
                rules: rules.username
              }
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('form.password')">
          <a-input
            v-decorator="[
              'password',
              {
                rules: rules.password
              }
            ]"
          />
        </a-form-item>
        <a-form-item :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }">
          <a-button class="full-width" type="primary" html-type="submit">
            {{ $t('form.login') }}
          </a-button>
        </a-form-item>
      </a-form>
      <div class="form-tips">{{ $t('tips') }}</div>
    </a-card>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Page } from '~/core/decorators'
import { namespace } from 'vuex-class'

const userModule = namespace('userModule')

@Page({
  name: 'login',
  layout: 'empty'
})
@Component({
  components: {}
})
export default class Login extends Vue {
  private locale
  private form

  @userModule.Mutation('login')
  private login

  public created() {
    this.form = this.$form.createForm(this)
    this.locale = [this.$app.state.locale]
  }

  private get rules() {
    return {
      username: [
        { required: true, message: this.$t('rules.username_require') }
      ],
      password: [{ required: true, message: this.$t('rules.password_require') }]
    }
  }

  private onSelectLangage({ key }) {
    this.$app.store.commit('updateLocale', key)
  }

  private onSumbit() {
    this.form.validateFields((error, values) => {
      if (error) {
        return
      }

      this.login(values)
      this.$router.replace({ path: '/' })
    })
  }
}
</script>

<style lang="less" scoped>
.login {
  background-image: url('~@/assets/images/login-bg.jpg');
  background-size: cover;
  background-position: 50%;
}

.login-form {
  margin-right: 120px;
  min-width: 330px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.form-tips {
  text-align: center;
  color: lightgray;
  font-size: 10px;
}
</style>

<i18n>
{
  "en-us": {
    "lang": "Language",
    "tips": "you can input any username and password",
    "title":"User Login",
    "form":{
       "username":"Username",
       "password":"Password",
       "login":"Login"
    },
    "rules":{
      "username_require":"please input username",
      "password_require":"please input username"
    }
  },
  "zh-cn": {
    "lang": "语言",
    "tips": "输入任意用户名密码即可",
    "title":"用户登录",
    "form":{
       "username":"用户名",
       "password":"密码",
       "login":"登录"
    },
    "rules":{
      "username_require":"请输入用户名",
      "password_require":"请输入密码"
    }
  }
}
</i18n>
