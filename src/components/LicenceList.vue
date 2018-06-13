<template lang="pug">
  v-card
    v-card-title
      | Categorias
      v-spacer
      v-text-field(append-icon='search', label='Buscar', single-line='', hide-details='', v-model='search')
    v-dialog(v-model='dialog', max-width='1000px')
      licence-form(:edit='edit', :item='item')
        v-btn(@click.native='close') cancelar
    v-dialog(v-model='modal', persistent='', max-width='290')
      v-card
        v-card-title.headline Borrar Registro?
        v-card-text Una vez eliminado el registro no hay vuelta atras
        v-card-actions
          v-spacer
          v-btn(color='blue darken-1', flat='', @click.native='modal = false') Cancelar
          v-btn(color='blue darken-1', flat='', @click.native='deleteItem()') Aceptar
    v-data-table.elevation-1(:headers='headers', :items='items', :search='search', :loading='loading')
      template(slot='items', slot-scope='props')
        td {{props.item.name}}
        td.text-xs-right {{ props.item.description }}
        td.justify-center.layout.px-0
          v-btn.mx-0(icon='', @click='editItem(props.item)')
            v-icon(color='teal') edit
          v-btn.mx-0(icon='', @click='confirm(props.item.uid)')
            v-icon(color='pink') delete
      template(slot='pageText', slot-scope='{ pageStart, pageStop }')
        | From {{ pageStart }} to {{ pageStop }}
</template>
<script>
import { licenceRef } from "../config/firebaseConfig";
import licenceForm from './LicenceForm';
export default {
  components: {licenceForm},
  data: () => ({
    loading:false,
    contain: true,
    tmp: "",
    search: "",
    pagination: {},
    dialog: false,
    modal: false,
    headers: [
      { text: "Categoria", align: "left", value: "name" },
      { text: "Descripcion", value: "description" },
      { text: "Acciones", value: "name", sortable: false }
    ],
    items: [],
    edit: false,
    item: {},
    delete: null
  }),
  created() {
    this.loading = true;
    licenceRef.on("value", snapshot => {
      this.fetchLicences(snapshot.key, snapshot.val());
      this.loading = false;
    });
  },
  methods: {
    fetchLicences(key, licence) {
      this.items = [];
      for (let key in licence) {
        this.items.push({
          value: false,
          uid: key,
          name: category[key].name,
          description: category[key].description
        });
      }
    },
    close() {
      this.dialog = false;
    },
    editItem(item) {
      this.item = item;
      this.edit = true;
      this.dialog = true;
    },
    confirm(item) {
      this.modal = true;
      this.delete = item;
    },
    deleteItem() {
      this.modal = false;
      licenceRef
        .child(this.delete)
        .remove()
        .then(console.log("Registro eliminado"));
      this.delete = null;
    }
  }
};
</script>