<template>
    <q-layout view="hHh lpr fFf">
        <q-header style="padding: 3px;background-color: #2e7d32;">
            <q-toolbar>
                <q-btn flat @click="showDrawer = !showDrawer" icon="menu" />
                <q-avatar style="margin-left: 10px;" size="50px">
                    <img src="../assets/Logo-sena-blanco-sin-fondo.png" />
                </q-avatar>
                <q-toolbar-title id="titulo">
                    VILE
                </q-toolbar-title>
                <q-btn flat @click="goLogin()" style="font-size: larger;" icon="logout">
                    <q-tooltip>Cerrar Sesión</q-tooltip>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer overlay bordered v-model="showDrawer">
            <div style="display: flex; flex-direction: column; align-items: center;">
                <q-img src="../assets/sena-icono.png" style="height: 100px;width: 100px; margin-top: 10px;" />

                <b style="text-transform: uppercase;font-size: larger; margin-top: 15px;"
                    v-text="user ? user.role.label : null" class="q-my-none" />

                <p v-text="user ? user.mail : null" class="q-my-none" style="margin-top: 10px;" />
            </div><br>

            <!--  <div class="row q-py-sm">

                <div class="col-12 q-px-sm">
                    <p v-text="user ? user.mail : null" class="q-my-none" />
                </div>

                <div class="col-12 q-px-sm">
                    <p v-text="user ? user.role.label : null" class="q-my-none" />
                </div>
            </div> -->

            <q-separator />
            <q-list v-for="(item, index) in items">
                <q-item style="padding: 5px;" v-ripple >

                    <q-btn no-caps flat @click="goRoute(item); showDrawer = !showDrawer" class="full-width btn-menu">
                        <q-icon :name="item.icon" />
                        <q-item-section>{{ item.label }}</q-item-section>

                    </q-btn>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>


<script setup>
import { ref, onBeforeMount } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { useQuasar } from 'quasar'

import { useUserStore } from '../stores/user.js'

const router = useRouter()

const route = useRoute()

console.log('')

const $q = useQuasar()

const userStore = useUserStore()

onBeforeMount(async () => {
    user.value = $q.localStorage.getItem('user')

    const { role } = user.value

    if (role.data == 'user') {
        const { data } = await userStore.getUserParams(user.value.id)

        console.log(data)

        if (data.staffType.data == 'contractor') {
            items.value = [
                { label: 'Home', link: '/layout/home', icon: 'house' },
                { label: 'Perfil de Usuario', link: '/layout/perfil', icon: 'person' },
                { label: 'Crear Agenda', link: '/layout/agenda/contratista/crear', icon: 'fa-solid fa-calendar' },
                { label: 'Crear Legalización', link: '/layout/agenda/legalizacion', icon: 'fa-solid fa-signature' },
                { label: 'Histórico', link: '/layout/agenda/historico', icon: 'fa-solid fa-clipboard' }
            ]
        } else {
            items.value = [
                { label: 'Home', link: '/layout/home', icon: 'house' },
                { label: 'Perfil de Usuario', link: '/layout/perfil', icon: 'person' },
                { label: 'Crear Agenda', link: '/layout/agenda/funcionario/crear', icon: 'fa-solid fa-calendar' },
                { label: 'Crear Legalización', link: '/layout/agenda/legalizacion', icon: 'fa-solid fa-signature' },
                { label: 'Histórico', link: '/layout/agenda/historico', icon: 'fa-solid fa-clipboard' }
            ]
        }

    } else if (role.data == 'supervisor') {
        items.value = [
            { label: 'Home', link: '/layout/home', icon: 'house' },
            { label: 'Perfil de Usuario', link: '/layout/perfil', icon: 'person' },
            { label: 'Solicitudes', link: '/layout/agenda/solicitudes', icon: 'fa-solid fa-person-circle-question' },
            { label: 'Solicitudes Legalización', link: '/layout/agenda/legalizacion', icon: 'fa-solid fa-file-contract' },
            { label: 'Crear Agenda', link: '/layout/agenda/funcionario/crear', icon: 'fa-solid fa-calendar' },
            { label: 'Crear Legalización', link: '/layout/agenda/funcionario/legalizacion', index: true, icon: 'fa-solid fa-signature' },
            { label: 'Historico', link: '/layout/agenda/historico', icon: 'fa-solid fa-clipboard' }
        ]
    } else if (role.data == 'administrator') {
        items.value = [
            { label: 'Home', link: '/layout/home', icon: 'house' },
            { label: 'Perfil de Usuario', link: '/layout/perfil', icon: 'person' },
            { label: 'Usuarios', link: '/layout/usuario', icon: 'people' },
            { label: 'Solicitudes', link: '/layout/agenda/solicitudes', icon: 'fa-solid fa-person-circle-question' },
            { label: 'Legalizaciones', link: '/layout/agenda/legalizacion', icon: 'fa-solid fa-signature' }
        ]
    } else if (role.data == 'paymaster') {
        items.value = [
            { label: 'Home', link: '/layout/home', icon: 'house' },
            { label: 'Perfil de Usuario', link: '/layout/perfil', icon: 'person' },
            { label: 'Solicitudes', link: '/layout/agenda/solicitudes', icon: 'fa-solid fa-person-circle-question' }
        ]
    }
})

const showDrawer = ref(false)

const user = ref(null)

const items = ref([])

async function goRoute(item) {
    console.log(item)
    if (user.value.role.data == 'supervisor' && item.link == '/layout/agenda/legalizacion' || item.link == '/layout/agenda/funcionario/legalizacion') {
        if (item.index) {
            $q.localStorage.set('new', true)
        } else {
            if ($q.localStorage.has('new')) {
                $q.localStorage.remove('new')
            }
        }

        await router.replace('/')

    } else {
        if ($q.localStorage.has('new')) {
            $q.localStorage.remove('new')
        }
    }

    router.push(item.link)
}

function goLogin() {
    $q.localStorage.remove('token')
    $q.localStorage.remove('user')

    router.replace({ path: '/' })
}
</script>

<style scoped>
.btn-menu {
    background-color: #2e7d32;
    border-radius: 10px;
    color: white;
    transition: background-color 0.3s ease;
}

.btn-menu:hover {
    background-color: #39a900;
}


</style>