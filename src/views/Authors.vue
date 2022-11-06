<template>
  <div>
    <b-container class="mt-3">
      <b-button class="float-right mb-3" @click="openModalRegisterAuthor"
        >Registrar</b-button
      >
      <b-table small bordered :fields="table.fields" :items="authors.data">
        <template #cell(actions)="data">
          <b-button
            @click="openModalUpdateAuthor(data.item.id)"
            variant="warning"
            size="sm"
          >
            Editar
          </b-button>
          <b-button
            @click="deleteAuthor(data.item.id)"
            variant="danger"
            size="sm"
            class="ml-1"
          >
            Eliminar
          </b-button>
        </template>
      </b-table>
    </b-container>

    <register-author-component
      v-if="showModalRegisterAuthor"
      @onClose="closeModalRegisterAuthor"
    />

    <update-author-component
      v-if="showModalUpdateAuthor"
      :id="selectedAuthorId"
      @onClose="closeModalUpdateAuthor"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";

// Components
import RegisterAuthorComponent from "@/components/RegisterAuthorComponent.vue";
import UpdateAuthorComponent from "@/components/UpdateAuthorComponent.vue";

export default {
  name: "app-books",
  components: {
    RegisterAuthorComponent,
    UpdateAuthorComponent,
  },
  data() {
    return {
      table: {
        fields: [
          {
            key: "name",
            label: "Nombre",
          },
          {
            key: "created_at",
            label: "Creacion",
          },
          {
            key: "actions",
            label: "Acciones",
          },
        ],
      },

      authors: {
        data: [],
      },

      selectedAuthorId: null,

      // Modals
      showModalRegisterAuthor: false,
      showModalUpdateAuthor: false,
    };
  },
  methods: {
    ...mapActions({
      A_GET_AUTHORS: "authors/A_GET_AUTHORS",
      A_DELETE_AUTHOR: "authors/A_DELETE_AUTHOR",
    }),
    openModalRegisterAuthor() {
      this.showModalRegisterAuthor = true;
    },
    async closeModalRegisterAuthor(saved) {
      if (saved) await this.getAuthors();
      this.showModalRegisterAuthor = false;
    },
    openModalUpdateAuthor(id) {
      this.selectedAuthorId = id;
      this.showModalUpdateAuthor = true;
    },
    async closeModalUpdateAuthor(saved) {
      if (saved) await this.getAuthors();
      this.showModalUpdateAuthor = false;
    },
    async getAuthors() {
      try {
        const response = await this.A_GET_AUTHORS();

        if (response.status == 200) {
          this.authors.data = response.data.data;
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: Books.vue ~ line 82 ~ getAuthors ~ error",
          error
        );
      }
    },
    async deleteAuthor(id) {
      try {
        const response = await this.A_DELETE_AUTHOR(id);

        if (response.status == 200) {
          alert("Se elimino correctamente");
          await this.getAuthors();
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: Books.vue ~ line 89 ~ deleteAuthor ~ error",
          error
        );
      }
    },
  },
  async created() {
    await this.getAuthors();
  },
};
</script>

<style>
</style>