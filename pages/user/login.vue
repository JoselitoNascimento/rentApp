<template>
  <v-app dark>
    <div>
      <h1 class="purple--text">Login</h1>
      <hr />
      <br/>

      <div v-if="$route.params.registered == 'yes'" class="alert alert-success" >
        You have registered successfully
      </div>

      <div class="row">
        <div class="col-md-6">
          <form
            class="indigo--text"
            action=""
            method="post"
            @submit.prevent="submitForm()">
            <div class="form-group">
              <v-text-field
                v-model="email"
                type="text"
                placeholder="email"
                :class="{ 'is-invalid': errors && errors.email }"
                solo
              ></v-text-field>
              <div v-if="errors && errors.email" class="invalid-feedback">
                {{ errors.email.msg }}
              </div>
            </div>

            <div class="form-group">
              <v-text-field
                v-model="password"
                type="password"
                placeholder="senha"
                :class="{ 'is-invalid': errors && errors.password }"
                solo
              ></v-text-field>
              <div v-if="errors && errors.password" class="invalid-feedback">
                {{ errors.password.msg }}
              </div>
            </div>

            <div v-if="login_error" class="alert alert-danger">
              {{ login_error }}
            </div>

            <div class="my-2">
              <v-btn
                type="submit"
                small color="primary">Logar</v-btn>
              <v-btn
                redirect to="/"
                small color="error">Cancelar</v-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      errors: null,
      login_error: null,
      email: null,
      password: null,
      status: false,
    }
  },
  methods: {
    submitForm() {
      this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .catch((error) => {
         if (error.response.data.message) {
            this.login_error = error.response.data.message
          }
        })
    },
  },
}
</script>
