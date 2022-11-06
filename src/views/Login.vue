<template>
  <div>
    <ValidationObserver ref="form">
      <b-container class="my-5 col-3">
        <br />
        <h4>Iniciar sesion</h4>
        <br />

        <ValidationProvider rules="required" #default="{ errors }">
          <b-form-group :state="errors.length > 0 ? false : null">
            <b-form-input v-model="form.email"></b-form-input>
            <b-small class="text-danger" v-if="errors[0]">
              El campo es requerido
            </b-small>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider rules="required" #default="{ errors }">
          <b-form-group :state="errors.length > 0 ? false : null">
            <b-form-input
              type="password"
              v-model="form.password"
            ></b-form-input>
            <b-small class="text-danger" v-if="errors[0]">
              El campo es requerido
            </b-small>
          </b-form-group>
        </ValidationProvider>

        <b-button block variant="primary" @click="login">Ingresar</b-button>
      </b-container>
    </ValidationObserver>
  </div>
</template>

<script>
import { required } from "@validations";

import { mapActions } from "vuex";
import { bus } from "@/main";

export default {
  name: "app-login",
  data() {
    return {
      required,

      form: {
        email: "test@gmail.com",
        password: "test",
      },
    };
  },
  methods: {
    ...mapActions({
      A_LOGIN: "users/A_LOGIN",
    }),
    async login() {
      try {
        const validate = await this.$refs.form.validate();

        if (validate) {
          const response = await this.A_LOGIN(this.form);

          if (response.status == 200) {
            bus.$emit("onLogin", true);

            localStorage.setItem("accessToken", response.data.access_token);
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            );

            this.$router.push("/books");
          }
        }
      } catch (error) {
        console.log("🚀 ~ file: Login.vue ~ line 56 ~ login ~ error", error);
      }
    },
  },
};
</script>

<style>
</style>