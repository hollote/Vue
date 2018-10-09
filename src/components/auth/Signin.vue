<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">{{$t('common.email')}}</label>
          <input
              type="email"
              id="email"
              @blur="$v.email.$touch()"
              v-model="email"
              autocomplete="email">
          <p v-if="!$v.email.email">{{$t('errorMessages.email')}}</p>
          <p v-if="!$v.email.required">{{$t('errorMessages.required')}}</p>
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">{{$t('common.password')}}</label>
          <input
              type="password"
              id="password"
              @blur="$v.password.$touch()"
              v-model="password"
              autocomplete="password">
          <p v-if="!$v.password.minLength">{{$t('errorMessages.minLength', {min:
            $v.password.$params.minLength.min})}}</p>
          <p v-if="!$v.password.required">{{$t('errorMessages.required')}}</p>
        </div>
        <p v-if="serverErr === 'INVALID_PASSWORD'">{{$t('errorMessages.invalidPassword')}}</p>
        <p v-if="serverErr === 'PASSWORD_LOGIN_DISABLED'">{{$t('errorMessages.loginDisabled')}}</p>
        <div class="submit">
          <button type="submit" :disabled="$v.$invalid">{{$t('common.submit')}}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { email, minLength, required } from "vuelidate/lib/validators";

  export default {
    data() {
      return {
        email: '',
        password: '',
        serverErr: ''
      };
    },
    methods: {
      onSubmit() {
        this.serverErr = '';
        const formData = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch('auth/login', {email: formData.email, password: formData.password})
        .then(() => {
          this.$router.push('/');
        })
        .catch(err => {
          this.serverErr = err.response.data.error.message;
        })
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  };
</script>

<style scoped lang="scss">
  .signin-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
    label {
      display: block;
      color: #4e4e4e;
      margin-bottom: 6px;
    }
    input {
      font: inherit;
      width: 100%;
      padding: 6px 12px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      &:focus {
        outline: none;
        border: 1px solid #521751;
        background-color: #eee;
      }
    }
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
    &:hover, &:active {
      background-color: #521751;
      color: white;
    }
    &[disabled] {
      border: 1px solid #ccc;
      background-color: transparent;
      color: #ccc;
      cursor: not-allowed;
      &:hover, &:active {
        border: 1px solid #ccc;
        background-color: transparent;
        color: #ccc;
        cursor: not-allowed;
      }
    }
  }
</style>
