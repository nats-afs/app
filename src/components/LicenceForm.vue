<template lang="pug">
  v-card.px-3
    v-card-title
      span.headline {{ formTitle }}
    v-card-text
      v-alert(color='success', icon='check_circle', :value='alert', transition='scale-transition')
        | {{alertMessage}}
      v-layout(row)
        v-flex(xs12)
          v-form
            v-text-field(label='Razon Social', v-model='item.name', :error-messages='nameErrors', @input='$v.item.name.$touch()', @blur='$v.item.name.$touch()')
            v-text-field(label='RUC', v-model='item.ruc', :error-messages='rucErrors', @input='$v.item.ruc.$touch()', @blur='$v.item.ruc.$touch()')
            v-text-field(label='Establecimiento Autorizado', v-model='item.establecimiento', :error-messages='establecimientoErrors', @input='$v.item.establecimiento.$touch()', @blur='$v.item.establecimiento.$touch()')
            v-text-field(label='Giro', v-model='item.giro', :error-messages='giroErrors', @input='$v.item.giro.$touch()', @blur='$v.item.giro.$touch()')
            v-text-field(label='Horario', v-model='item.horario', :error-messages='horarioErrors', @input='$v.item.horario.$touch()', @blur='$v.item.horario.$touch()')
            v-text-field(label='Area de Edificacion', v-model='item.area', :error-messages='areaErrors', @input='$v.item.area.$touch()', @blur='$v.item.area.$touch()')
            v-text-field(label='Zonificacion', v-model='item.zona', :error-messages='zonaErrors', @input='$v.item.zona.$touch()', @blur='$v.item.zona.$touch()')
            v-text-field(label='Ubicacion', v-model='item.ubica', :error-messages='ubicaErrors', @input='$v.item.ubica.$touch()', @blur='$v.item.ubica.$touch()')
            v-text-field(label='Tipo de Licencia', v-model='item.tipo', :error-messages='tipoErrors', @input='$v.item.tipo.$touch()', @blur='$v.item.tipo.$touch()')
            v-text-field(label='Expediente Administrativo', v-model='item.exp', :error-messages='expErrors', @input='$v.item.exp.$touch()', @blur='$v.item.exp.$touch()')
            v-text-field(label='Resolucion de Gerencia', v-model='item.res', :error-messages='resErrors', @input='$v.item.res.$touch()', @blur='$v.item.res.$touch()')
    v-card-actions.py-3
      v-btn(@click='submit') guardar
      v-btn(v-if='!edit', @click='clear') limpiar
</template>
<script>
import { licenceRef } from "../config/firebaseConfig";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  mixins: [validationMixin],
  validations: {
    item: {
      name: { required },
      ruc: { required, minLength: minLength(11),maxLength: maxLength(11) },
      establecimiento: { required },
      giro: { required },
      horario: { required },
      area: { required },
      zona: { required },
      ubica: { required },
      tipo: { required },
      exp: { required },
      res: { required }
    }
  },
  data: () => ({
    alert: false,
    items: []
  }),
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.item.$error) {
        console.log("Error de validacion");
        return;
      }
      this.edit ? this.editLicence() : this.addLicence();
    },
    addLicence() {
      licenceRef
        .push(this.item)
        .then(() => this.displayAlert(), () => console.log("No se guardo"));
      this.clear();
    },
    displayAlert() {
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 4000);
    },
    editLicence() {
      licenceRef
        .child(this.item.uid)
        .set(this.item)
        .then(() => this.displayAlert(), () => console.log("No se edito"));
    },
    clear() {
      this.$v.$reset();
      this.item.name = null;
      this.item.ruc = null;
      this.item.establecimiento = null;
      this.item.giro = null;
      this.item.horario = null;
      this.item.area = null;
      this.item.zona = null;
      this.item.ubica = null;
      this.item.tipo = null;
      this.item.exp = null;
      this.item.res = null;
    }
  },
  computed: {
    formTitle() {
      return !this.edit ? "Nueva Licencia" : "Editar Licencia";
    },
    alertMessage() {
      return !this.edit
        ? "Categoria guardada exitosamente"
        : "Categoria editada exitosamente";
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.item.name.$dirty) return errors;
      !this.$v.item.name.required && errors.push("Nombre es requerido.");
      return errors;
    },
    rucErrors() {
      const errors = [];
      if (!this.$v.item.ruc.$dirty) return errors;
      !this.$v.item.ruc.maxLength &&
        errors.push("Descripcion debe tener un maximo de 11 caracteres");
      !this.$v.item.ruc.minLength &&
        errors.push("Descripcion debe tener un minimo de 11 caracteres");
      !this.$v.item.ruc.required && errors.push("Ruc de requerido");
      return errors;
    },
    establecimientoErrors() {
      const errors = [];
      if (!this.$v.item.establecimiento.$dirty) return errors;
      !this.$v.item.establecimiento.required &&
        errors.push("Establecimiento requerido");
      return errors;
    },
    giroErrors() {
      const errors = [];
      if (!this.$v.item.giro.$dirty) return errors;
      !this.$v.item.giro.required && errors.push("Giro requerido");
      return errors;
    },
    horarioErrors() {
      const errors = [];
      if (!this.$v.item.horario.$dirty) return errors;
      !this.$v.item.horario.required && errors.push("Horario requerido");
      return errors;
    },
    areaErrors() {
      const errors = [];
      if (!this.$v.item.area.$dirty) return errors;
      !this.$v.item.area.required && errors.push("Area requerido");
      return errors;
    },
    zonaErrors() {
      const errors = [];
      if (!this.$v.item.zona.$dirty) return errors;
      !this.$v.item.zona.required && errors.push("Zona requerida");
      return errors;
    },
    ubicaErrors() {
      const errors = [];
      if (!this.$v.item.ubica.$dirty) return errors;
      !this.$v.item.ubica.required && errors.push("Ubicacion requerida");
      return errors;
    },
    tipoErrors() {
      const errors = [];
      if (!this.$v.item.tipo.$dirty) return errors;
      !this.$v.item.tipo.required && errors.push("Tipo requerido");
      return errors;
    },
    expErrors() {
      const errors = [];
      if (!this.$v.item.exp.$dirty) return errors;
      !this.$v.item.exp.required && errors.push("Expediente requerida");
      return errors;
    },
    resErrors() {
      const errors = [];
      if (!this.$v.item.res.$dirty) return errors;
      !this.$v.item.res.required && errors.push("Resolucion requerida");
      return errors;
    }
  }
};
</script>
