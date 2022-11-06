<template>
  <b-modal
    v-model="show"
    title="Registrar libro"
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
              label="Titulo:"
              :state="errors.length > 0 ? false : null"
            >
              <b-form-input
                v-model="form.title"
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
              label="Autor:"
              :state="errors.length > 0 ? false : null"
            >
              <b-form-select
                v-model="form.author_id"
                :options="authors"
                :state="errors.length > 0 ? false : null"
              ></b-form-select>
              <small v-if="errors[0]" class="text-danger">
                El campo es requerido
              </small>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col cols="6">
          <ValidationProvider rules="required" #default="{ errors }">
            <b-form-group
              label="Paginas:"
              :state="errors.length > 0 ? false : null"
            >
              <b-form-input
                v-model="form.pages"
                type="number"
                :state="errors.length > 0 ? false : null"
              ></b-form-input>
              <small v-if="errors[0]" class="text-danger">
                El campo es requerido
              </small>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col cols="12">
          <ValidationProvider rules="required" #default="{ errors }">
            <b-form-group
              label="Contenido:"
              :state="errors.length > 0 ? false : null"
            >
              <b-form-textarea
                v-model="form.summary"
                :state="errors.length > 0 ? false : null"
              ></b-form-textarea>
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
      <b-button submit variant="primary" @click="registerBook()">
        Guardar
      </b-button>
    </b-container>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "@validations";

export default {
  name: "RegisterBookComponent",
  props: {},
  watch: {},
  data() {
    return {
      required,

      form: {
        title: "",
        author_id: null,
        pages: null,
        summary: "",
      },

      authors: [],

      show: false,
    };
  },
  methods: {
    ...mapActions({
      A_REGISTER_BOOK: "books/A_REGISTER_BOOK",
      A_GET_AUTHORS: "authors/A_GET_AUTHORS",
    }),
    async getAuthors() {
      try {
        const response = await this.A_GET_AUTHORS();

        if (response.status == 200) {
          response.data.data.map((item) => {
            this.authors.push({
              text: item.name,
              value: item.id,
            });
          });
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: RegisterBookComponent.vue ~ line 86 ~ getAuthors ~ error",
          error
        );
      }
    },
    async registerBook() {
      try {
        const validate = await this.$refs.form.validate();

        if (validate) {
          const response = await this.A_REGISTER_BOOK(this.form);

          if (response.status == 201) {
            alert("Se registro correctamente");
            this.close(true);
          }
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: RegisterBookComponent.vue ~ line 41 ~ registerBook ~ error",
          error
        );
      }
    },
    close(saved) {
      this.$emit("onClose", saved);
    },
  },
  async created() {
    await this.getAuthors();

    this.show = true;
  },
};
</script>

<style></style>
