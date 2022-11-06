<template>
  <b-modal
    v-model="show"
    title="Registrar autor"
    title-tag="h3"
    hide-footer
    size="lg"
    scrollable
    @hidden="close(false)"
  >
    <ValidationObserver ref="form">
      <b-row>
        <b-col cols="6">
          <ValidationProvider rules="required" #default="{ errors }">
            <b-form-group
              label="Nombres:"
              :state="errors.length > 0 ? false : null"
            >
              <b-form-input
                v-model="form.first_name"
                :state="errors.length > 0 ? false : null"
              ></b-form-input>
              <small v-if="errors[0]" class="text-danger">
                El campo es requerido
              </small>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col cols="6">
          <ValidationProvider rules="required" #default="{ errors }">
            <b-form-group
              label="Apellidos:"
              :state="errors.length > 0 ? false : null"
            >
              <b-form-input
                v-model="form.last_name"
                :state="errors.length > 0 ? false : null"
              ></b-form-input>
              <small v-if="errors[0]" class="text-danger">
                El campo es requerido
              </small>
            </b-form-group>
          </ValidationProvider>
        </b-col>
      </b-row>
    </ValidationObserver>

    <b-container class="mt-1 text-center">
      <b-button variant="outline-secondary" class="mr-1" @click="close(false)">
        Cerrar
      </b-button>
      <b-button submit variant="primary" @click="registerAuthor()">
        Guardar
      </b-button>
    </b-container>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "@validations";

export default {
  name: "RegisterAuthorComponent",
  data() {
    return {
      required,

      form: {
        first_name: "",
        last_name: "",
      },

      authors: [],

      show: false,
    };
  },
  methods: {
    ...mapActions({
      A_REGISTER_AUTHOR: "authors/A_REGISTER_AUTHOR",
    }),
    async registerAuthor() {
      try {
        const validate = await this.$refs.form.validate();

        if (validate) {
          const response = await this.A_REGISTER_AUTHOR(this.form);

          if (response.status == 201) {
            alert("Se registro correctamente");
            this.close(true);
          }
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: registerAuthor Component.vue ~ line 41 ~ registerAuthor  ~ error",
          error
        );
      }
    },
    close(saved) {
      this.$emit("onClose", saved);
    },
  },
  async created() {
    this.show = true;
  },
};
</script>

<style></style>
