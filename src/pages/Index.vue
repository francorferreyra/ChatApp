<template>
  <q-page padding>
    <VistaAcceso v-if="!isAuthenticated" />
    <div v-else>
      <VistaUsuariosActivos/>
      <VistaChat/>
    </div>
  </q-page>
</template>

<script>
import VistaAcceso from '../components/VistaAcceso.vue'
import VistaChat from '../components/VistaChat.vue'
import firebase from 'firebase'
import { useAuth } from '@vueuse/firebase/useAuth';
import VistaUsuariosActivos from '../components/VistaUsuariosActivos.vue'
import { provide, ref} from 'vue'

export default {
  components: {VistaAcceso, VistaUsuariosActivos, VistaChat},
  setup (){
    const { isAuthenticated, user } = useAuth(firebase.auth)
    const uidSeleccionado = ref('')
    provide('uidSeleccionado',uidSeleccionado)
    return{
      isAuthenticated,
      user
    }
  }
}
</script>
