<template>
    <q-page class="q-pa-md">
        <div class="text-h4 text-center q-mb-md">
            <b>BIENVENIDO</b>
        </div>


        <div class="card-container q-mt-xl">
            <q-card class="my-card" id="cardP">
                <router-link to="perfil" class="cardP">
                    <q-card-section>
                        <div class="text-h6" id="name">Perfil de Usuario</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-img id="img" src="../assets/perfil.png" />
                    </q-card-section>
                </router-link>
            </q-card>

            <q-card v-if="dataUser === 0" class="my-card" id="cardP">
                <router-link to="agenda/contratista/crear" class="cardP">
                    <q-card-section>
                        <div class="text-h6" id="name">Agendas</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-img id="img" src="../assets/calendario.png" />
                    </q-card-section>
                </router-link>
            </q-card>

            <q-card v-if="role !== 'Ordenador'" class="my-card" id="cardP">
                <router-link to="agenda/legalizacion" class="cardP">
                    <q-card-section>
                        <div class="text-h6" id="name">Legalizaciones</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-img id="img" src="../assets/contrato.png" />
                    </q-card-section>
                </router-link>
            </q-card>

            <q-card v-if="role !== 'Ordenador' && role !== 'Administrador'" class="my-card" id="cardP">
                <router-link to="agenda/historico" class="cardP">
                    <q-card-section>
                        <div class="text-h6" id="name">Histórico</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-img id="img" src="../assets/historial.png" />
                    </q-card-section>
                </router-link>
            </q-card>

            <!-- admin -->

            <q-card v-if="role === 'Administrador'" class="my-card" id="cardP">
                <router-link to="usuario" class="cardP">
                    <q-card-section>
                        <div class="text-h6" id="name">Usuarios</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-img id="img" src="../assets/usuarios.png" />
                    </q-card-section>
                </router-link>
            </q-card>

            <!-- funcionario -->
            <q-card v-if="dataUser === 1 || role === 'Supervisor'" class="my-card"
                id="cardP">
                <router-link to="agenda/funcionario/crear" class="cardP">
                    <q-card-section>
                        <div class="text-h6" id="name">Agendas</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-img id="img" src="../assets/calendario.png" />
                    </q-card-section>
                </router-link>
            </q-card>


            <!-- solicitudes -->

            <q-card v-if="role === 'Ordenador' || role === 'Administrador' || role === 'Supervisor'" class="my-card"
                id="cardP">
                <router-link to="agenda/solicitudes" class="cardP">
                    <q-card-section>
                        <div class="text-h6" id="name">Solicitudes</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-img id="img" src="../assets/solicitante.png" />
                    </q-card-section>
                </router-link>
            </q-card>



        </div>

    </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from '../stores/user.js'


const $q = useQuasar()
const role = ref(null)
const currentUser = ref(null)
const userStore = useUserStore()
const dataUser = ref(null)
const user = ref(null)

onBeforeMount(async () => {
    currentUser.value = $q.localStorage.getItem('user')
    //console.log(currentUser);
    role.value = currentUser.value.role.label
    user.value = await userStore.getUserParams(currentUser.value.id)
    dataUser.value = user.value.data.staffType.index
})

console.log(dataUser);
console.log(role);
</script>

<style scoped>
.cardP {
    text-decoration: none;
    font-size: 15%;

}

#name {
    font-weight: 800;
    color: black;

}

#cardP {
    margin: 6%;
    background-color: #38a90063;
    text-align: center;
    transition: box-shadow 0.3s, transform 0.3s;
}

#cardP:hover {
    transform: scale(1.1);
}

.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
}
</style>