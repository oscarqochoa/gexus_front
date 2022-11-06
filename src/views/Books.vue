<template>
  <div>
    <b-container class="mt-3">
      <b-button class="float-right mb-3" @click="openModalRegisterBook"
        >Registrar</b-button
      >
      <b-table small bordered :fields="table.fields" :items="books.data">
        <template #cell(actions)="data">
          <b-button
            @click="openModalUpdateBook(data.item.id)"
            variant="warning"
            size="sm"
          >
            Editar
          </b-button>
          <b-button
            @click="deleteBook(data.item.id)"
            variant="danger"
            size="sm"
            class="ml-1"
          >
            Eliminar
          </b-button>
        </template>
      </b-table>

      <b-pagination
        v-model="books.page"
        :total-rows="books.total"
        :per-page="books.perPage"
        aria-controls="my-table"
      ></b-pagination>
    </b-container>

    <register-book-component
      v-if="showModalRegisterBook"
      @onClose="closeModalRegisterBook"
    />

    <update-book-component
      v-if="showModalUpdateBook"
      :id="selectedBookId"
      @onClose="closeModalUpdateBook"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";

// Components
import RegisterBookComponent from "@/components/RegisterBookComponent.vue";
import UpdateBookComponent from "@/components/UpdateBookComponent.vue";

export default {
  name: "app-books",
  components: {
    RegisterBookComponent,
    UpdateBookComponent,
  },
  data() {
    return {
      table: {
        fields: [
          {
            key: "title",
            label: "Titulo",
          },
          {
            key: "author",
            label: "Autor",
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

      books: {
        data: [],
        total: 0,
        from: "",
        to: "",
        perPage: 25,
        page: 1,
      },

      // Modals
      showModalRegisterBook: false,
      showModalUpdateBook: false,
    };
  },
  watch: {
    async "books.page"(newVal) {
      await this.getBooks();
    },
  },
  methods: {
    ...mapActions({
      A_GET_BOOKS: "books/A_GET_BOOKS",
      A_DELETE_BOOK: "books/A_DELETE_BOOK",
    }),
    openModalRegisterBook() {
      this.showModalRegisterBook = true;
    },
    async closeModalRegisterBook(saved) {
      if (saved) await this.getBooks();
      this.showModalRegisterBook = false;
    },
    openModalUpdateBook(id) {
      this.selectedBookId = id;
      this.showModalUpdateBook = true;
    },
    async closeModalUpdateBook(saved) {
      if (saved) await this.getBooks();
      this.showModalUpdateBook = false;
    },
    async getBooks() {
      try {
        const response = await this.A_GET_BOOKS({
          page: this.books.page,
          perPage: this.books.perPage,
        });

        if (response.status == 200) {
          this.books.data = response.data.data;
          this.books.from = response.data.meta.from;
          this.books.to = response.data.meta.to;
          this.books.total = response.data.meta.total;
        }
      } catch (error) {
        console.log("🚀 ~ file: Books.vue ~ line 82 ~ getBooks ~ error", error);
      }
    },
    async deleteBook(id) {
      try {
        const response = await this.A_DELETE_BOOK(id);

        if (response.status == 200) {
          alert("Se elimino correctamente");
          await this.getBooks();
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: Books.vue ~ line 89 ~ deleteBook ~ error",
          error
        );
      }
    },
  },
  async created() {
    await this.getBooks();
  },
};
</script>

<style>
</style>