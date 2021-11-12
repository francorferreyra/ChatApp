<template>
    <div v-if="uidSeleccionado !== ''" class="q-mt-xl" ref="RefChat">
        <div class="q-pa-md row justify-center">
            <div style="width: 100%; max-width: 600px">
                <q-chat-message
                v-for="chat in chats" :key="chat.id"
                    :name="chat.user"
                    :text="[chat.texto]"
                    :sent="chat.uid == user.uid"
                />
            </div>
        </div>
        <q-footer>
            <q-form @submit.prevent="enviarMensaje">
                <q-toolbar class="bg-primary text-white row">
                    <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
                    <q-input rounded outlined dense class="col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
                    <q-btn round flat icon="send" type="submit" />
                </q-toolbar>
            </q-form>
        </q-footer>
    </div>
    <div v-else class="q-mt-xl">
        <h5 class="q-mt-xl">Selecciona un usuario para hablar.</h5>
    </div>   
</template>

<script>
import firebase from 'firebase'
import { useAuth } from '@vueuse/firebase/useAuth' 
import {marcaTiempo, db} from 'boot/firebase.js'
import { ref, inject, watch} from 'vue'

export default{
    setup() {
        const message = ref('')
        const uidSeleccionado = inject('uidSeleccionado')
        const {user} = useAuth(firebase.auth)
        const chats = ref([])
        const RefChat = ref(null)
        let unsubcribe;

        const obtenerData = (uidDelUsuarioSeleccionado) => {
            chats.value = []
            unsubcribe = db.collection('chat').doc(user.value.uid).collection(uidDelUsuarioSeleccionado).orderBy("fecha")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log("New city: ", change.doc.data());
                    chats.value.push({...change.doc.data(), id:change.doc.id})            
                    }
                    if(RefChat.value !== null){
                        setTimeout(() => {
                        window.scrollTo(0,RefChat.value.scrollHeight)
                    }, 50)
                    }
                    });
                });
        };
        watch(( ) => uidSeleccionado.value, (newUid)=>{if(unsubcribe){
            unsubcribe()
            if(newUid){
                obtenerData(newUid)
                }
            }else{
                obtenerData(newUid)
                }
        })
        const enviarMensaje = async() => {
            if(!message.value.trim()){
                return;
            }
            try{
                const objetoMensaje = {
                    user: user.value.email,
                    texto: message.value,
                    fecha: marcaTiempo(),
                    uid: user.value.uid,
                }

                await db.collection('chat').doc(user.value.uid).collection(uidSeleccionado.value).add(objetoMensaje);
                await db.collection('chat').doc(uidSeleccionado.value).collection(user.value.uid).add(objetoMensaje);

                message.value = ''
            } catch (error) {
                console.log(error)
            }
        }

        return{
            message,
            enviarMensaje,
            uidSeleccionado,
            chats,
            user,
            RefChat
        }
    },
}
</script>
