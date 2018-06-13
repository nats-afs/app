<template lang="pug">
  v-app#inspire
    v-content
      v-container(fluid, fill-height)
        v-layout(align-center, justify-center)
          v-flex(xs12, sm8, md4)
            v-card.elevation-12
              v-toolbar(dark, color='primary')
                v-toolbar-title inicie de Sesion Alternativo
                v-spacer
              v-card-text
                v-btn(:loading="loading",:disabled="loading",block,@click.prevent="loginWithGoogle") 
                  |Ingresar con Google 
                  v-icon.mx-5 fab fa-google
                v-btn(:loading="loading",:disabled="loading",block,@click.prevent="loginWithFacebook") 
                  |Ingresar con Facebook
                  v-icon.mx-5 fab fa-facebook-f
                v-btn(:loading="loading",:disabled="loading",block,@click.prevent="loginWithTwitter") 
                  |Ingresar con Twitter
                  v-icon.mx-5 fab fa-twitter
                router-link(to="/login") Volver
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import { firebaseAuth } from "@/config/firebaseConfig";
import { functionTypeParam } from "babel-types";
export default {
  data: () => ({
    loading: false,
    dialog: false,
    phoneNumber: "",
    appVerifier: ""
  }),
  methods: {
    ...mapActions([
      "addMessage",
      "clearMessage",
      "loginWithEmail",
      "loginWithGoogle",
      "loginWithFacebook",
      "loginWithTwitter",
    ]),
  },
  computed: {
  }
};
</script>
