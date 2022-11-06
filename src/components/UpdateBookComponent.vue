<template>
  <b-modal
    v-model="show"
    title="Actualizar libro"
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
      <b-button submit variant="primary" @click="updateBook()">
        Guardar
      </b-button>
    </b-container>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "@validations";

export default {
  name: "UpdateBookComponent",
  props: {
    id: {
      type: Number,
    },
  },
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
      A_UPDATE_BOOK: "books/A_UPDATE_BOOK",
      A_GET_BOOK: "books/A_GET_BOOK",
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
          "🚀 ~ file: UpdateBookComponent.vue ~ line 139 ~ getAuthors ~ error",
          error
        );
      }
    },
    async getBook() {
      try {
        const response = await this.A_GET_BOOK(this.id);

        if (response.status == 200) {
          this.form = response.data.data;
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: UpdateBookComponent.vue ~ line 130 ~ getBook ~ error",
          error
        );
      }
    },
    async updateBook() {
      try {
        const validate = await this.$refs.form.validate();

        if (validate) {
          const response = await this.A_UPDATE_BOOK({
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
          "🚀 ~ file: UpdateBookComponent.vue ~ line 161 ~ registerBook ~ error",
          error
        );
      }
    },
    close(saved) {
      this.$emit("onClose", saved);
    },
  },
  async created() {
    await Promise.all([this.getBook(), this.getAuthors()]);

    this.show = true;
  },
};
</script>

<style></style>
