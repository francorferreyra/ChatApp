<template>
    <div class="q-px-xl">
        <h5>Formulario de {{acceder ? 'Login' : 'Registro'}}</h5>
        <q-form class="q-gutter-md" @submit.prevent="procesarFormulario">
            <q-input label="Email" v-model="email"/>
            <q-input label="Password" v-model="password"/>
            <q-btn :label="acceder ? 'Login' : 'Registro'" type="submit" color="primary"/>
            <q-btn color="primary" outline v-if="!acceder" @click="acceder = true">¿Ya tienes cuenta?</q-btn>
            <q-btn color="negative" outline v-else  @click="acceder = false">¿No tienes cuenta?</q-btn>
        </q-form>
    </div>
</template>

<script>
import {ref} from 'vue'
import {auth, db} from 'boot/firebase.js'
import firebase from 'firebase'
import { useAuth } from '@vueuse/firebase/useAuth';

export default{
    setup() {
        const email = ref('prueba@prueba.com');
        const password = ref('123456');
        const acceder = ref(true);

        const { isAuthenticated, user } = useAuth(firebase.auth)

        const procesarFormulario = async() => {
            if(!email.value.trim() || !password.value.trim()){
                console.log('campos vacios')
                return;
            }
            try {
                if (!acceder.value) {
                    //Registrar
                    const usuario = await auth.createUserWithEmailAndPassword(email.value, password.value);

                    await db.collection('usuarios').doc(usuario.user.uid).set({
                        email: usuario.user.email,
                        estado: true,
                        uid: usuario.user.uid
                    })

                    console.log(usuario.user);
                }else {
                    //Login
                    const usuario = await auth.signInWithEmailAndPassword(email.value, password.value);

                    await db.collection('usuarios').doc(usuario.user.uid).update({
                        estado: true,
                    })

                    console.log(usuario.user);
                }
                email.value = '';
                password.value = '';
            } catch (error) {
                console.log(error);

            }
        }

        return{
            email,
            password,
            procesarFormulario,
            acceder,
            isAuthenticated, user
        }
    },
}
</script>
