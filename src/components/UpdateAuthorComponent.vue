<template>
  <b-modal
    v-model="show"
    title="Actualizar autor"
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
      <b-button submit variant="primary" @click="updateAuthor()">
        Guardar
      </b-button>
    </b-container>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "@validations";

export default {
  name: "UpdateAuthorComponent",
  props: {
    id: {
      type: Number,
    },
  },
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
      A_GET_AUTHOR: "authors/A_GET_AUTHOR",
      A_UPDATE_AUTHOR: "authors/A_UPDATE_AUTHOR",
    }),
    async getAuthor() {
      try {
        const response = await this.A_GET_AUTHOR(this.id);

        if (response.status == 200) {
          this.form = response.data.data;
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: UpdateBookComponent.vue ~ line 87 ~ getAuthor ~ error",
          error
        );
      }
    },
    async updateAuthor() {
      try {
        const validate = await this.$refs.form.validate();

        if (validate) {
          const response = await this.A_UPDATE_AUTHOR({
            id: this.id,
            body: this.form,
          });

          if (response.status == 200) {
            alert("Se actualizo correctamente");
            this.close(true);
          }
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: UpdateBookComponent.vue ~ line 105 ~ updateAuthor ~ error",
          error
        );
      }
    },
    close(saved) {
      this.$emit("onClose", saved);
    },
  },
  async created() {
    await this.getAuthor();

    this.show = true;
  },
};
</script>

<style></style>
