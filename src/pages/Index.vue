<template>
  <q-page padding>
    <VistaAcceso v-if="!isAuthenticated" />
    <div v-else>
      <VistaUsuariosActivos/>
    </div>
  </q-page>
</template>

<script>
import VistaAcceso from '../components/VistaAcceso.vue'
import firebase from 'firebase'
import { useAuth } from '@vueuse/firebase/useAuth';
import VistaUsuariosActivos from '../components/VistaUsuariosActivos.vue'

export default {
  components: {VistaAcceso, VistaUsuariosActivos},
  setup (){
    const { isAuthenticated, user } = useAuth(firebase.auth)
    return{
      isAuthenticated,
      user
    }
  }
}
</script>
