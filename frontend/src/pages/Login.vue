<template>
    <q-layout view="hHh lpr fFf">
        <q-page-container>
            <br>
            <q-page>
                <div class="row justify-center items-center" style="height: 90vh;">
                    <q-card id="card">
                        <q-card-section style="background-color: rgb(46, 125, 50); height: 70px;">
                            <div class="row items-center justify-center">
                                <!-- <div class="col-12"> -->
                                <p class="q-my-none text-center" style="font-size: 35px; color: white;">
                                    <strong>VILE</strong>
                                </p>
                                <!-- </div> -->
                            </div>
                        </q-card-section>

                        <q-card-section>
                            <div class="row">
                                <div class="col-12 justify-center flex">
                                    <q-img src="../assets/sena-icono-nuevo.png" fit="container"
                                        style="width: 110px; height: 110px;" />
                                </div>
                                <div class="col-12 q-mt-lg">
                                    <p class="q-my-none text-center" style="font-size: 25px;"><strong>INICIAR SESIÓN</strong>
                                    </p>
                                </div>
                            </div>
                        </q-card-section>

                        <q-separator />

                        <q-card-section>
                            <div class="row">
                                <div class="col-12">
                                    <q-input v-model="identification" filled stack-label label="No. de documento"
                                        type="number" />
                                </div>
                            </div>

                            <div class="row q-mt-md">
                                <div class="col-12">
                                    <q-input v-model="password" filled stack-label label="Contraseña"
                                        :type="showPassword ? 'text' : 'password'">
                                        <template v-slot:append>
                                            <q-icon :name="showPassword ? 'visibility' : 'visibility_off'"
                                                class="cursor-pointer" @click="showPassword = !showPassword" />
                                        </template>
                                    </q-input>
                                </div>
                            </div>
                        </q-card-section>

                        <q-space />

                        <p @click="openModal" class="q-mt-sm"
                            style="cursor: pointer; color: rgb(5, 13, 255);text-align: center;">
                            ¿OLVIDÓ
                            SU
                            CONTRASEÑA?</p>

                        <q-card-section>
                            <div class="row justify-center q-mb-md">
                                <q-btn @click="goHome()" :loading="loading" label="Iniciar Sesión"
                                    style="background-color: rgb(46, 125, 50); color: white;" />
                            </div>
                        </q-card-section>
                        <!-- <q-card-actions class="justify-center">
                            </q-card-actions> -->
                    </q-card>
                </div>
            </q-page>
        </q-page-container>

        <q-footer style="background-color: rgb(224, 224, 224);">
            <div class="row items-center justify-center" style=" height: 50px;">
                <p class="q-my-none" style="font-size: 18px; color: black;text-align: center;"><strong>VILE - Sena 2024
                        © Todos
                        los derechos reservados</strong></p>
            </div>
        </q-footer>

        <q-dialog v-model="modalVisible" persistent>
            <q-card id="cardContra" style="width: 36%;">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Restablecer Contraseña</div>
                    <q-space />
                    <q-btn icon="close" color="negative" flat round dense v-close-popup />
                </q-card-section>

                <q-separator inset style="height: 5px;margin-top: 5px;" color="primary" /><br>

                <q-card-section class="q-pt-none">
                    Ingrese la dirección de correo electrónico que 
                    tenga registrada para comenzar:

                    <q-input style="margin-top: 5%;" filled dense v-model="mail" autofocus
                        @keyup.enter="prompt = false" placeholder="Correo electrónico" />
                </q-card-section>

                <q-card-actions align="center">

                    <div class="row">
                        <q-btn label="Enviar Correo" :loading="cargando" color="primary" @click="envioCorreo" />
                    </div>

                </q-card-actions>
                <br>
            </q-card>
        </q-dialog>

    </q-layout>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

import { useRouter } from 'vue-router'

import { useUserStore } from '../stores/user.js'

import { showNotify } from '../components/notify.js'

import { useQuasar } from 'quasar'

const router = useRouter()

const userStore = useUserStore()

const $q = useQuasar()

const identification = ref('')

const password = ref('')

let mail = ref('')

const showPassword = ref(false)

let loading = ref(false);

let cargando = ref(false)

const modalVisible = ref(false);

function openModal() {
    modalVisible.value = true;
}

onBeforeMount(async () => {
    if ($q.localStorage.has('token')) {
        router.push('/layout')
    }
})

async function goHome() {
    loading.value = true
    if (identification.value === '') {
        showNotify('Digite el documento', 'negative')
    } else if (!password.value.trim()) {
        showNotify('Digite la Contraseña', 'negative')
    } else {
        const { data, status } = await userStore.login(identification.value, password.value)

        if (status !== 200) {
            showNotify(data.msg, 'negative')
        } else {
            $q.localStorage.set('token', data.token)
            $q.localStorage.set('user', data.user)
            router.push('/layout')
            showNotify('Inicio de sesión exitoso', 'positive', 'check')
        }
    }
    loading.value = false
}

function validarHayCorreo() {
    if (mail.value.trim() === "") {
        $q.notify({
            message: 'Debe proporcionar el correo',
            color: 'negative',
            icon: 'warning',
            position: 'top',
            timeout: 3000
        })
    } else {
        return true
    }
}

async function envioCorreo() {
    if (validarHayCorreo() === true) {
        cargando.value = true
        try {
            let envio = await userStore.envioCorreo(mail.value)
            $q.notify({
                message: envio.data.msg,
                color: "positive",
                icon: 'check',
                position: 'top',
                timeout: 4500
            })
            modalVisible.value = false
            mail.value = ''
        } catch (error) {
            if (error.response && error.response.data.errors) {

                const faltaCorreo = error.response.data.errors[0].msg

                $q.notify({
                    message: faltaCorreo,
                    color: 'negative',
                    icon: 'warning',
                    position: 'top',
                    timeout: 3000
                })
            } else {
                $q.notify({
                    message: error.response.data,
                    color: 'negative',
                    icon: 'warning',
                    position: 'top',
                    timeout: 3000
                })
            }
        }
        cargando.value = false
    }
}

</script>

<style scoped>
#card {
    width: 37%;
}

@media screen and (max-width: 600px) {
    #card {
        width: 90%
    }
}
</style>