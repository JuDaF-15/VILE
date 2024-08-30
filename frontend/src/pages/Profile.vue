<template>
    <q-page class="q-pa-md">
        <div class="text-h4 text-center q-mb-md">
            <b>Perfil de Usuario</b>
        </div>
        <div class="row justify-center q-pt-md">
            <q-card flat bordered style="padding: 20px;width: 60%;">
                <q-separator color="primary" style="
                height: 5px;
                margin-top: 5px;
              " /> <br>
                <div class="col-8" style="font-size: 18px;">

                    <div class="row q-pb-sm">
                        <div class="col-6">
                            <p class="q-my-none"><strong v-text="'Nombre de Usuario: '" />{{ name }}</p><br>
                            <p class="q-my-none"><strong v-text="'Correo electrónico: '" />{{ mail }}</p><br>
                            <p class="q-my-none"><strong>Cargo: </strong>{{ position ? position : 'N/A' }}</p>

                        </div>

                        <div class="col-6">
                            <p class="q-my-none"><strong v-text="'Tipo de Usuario: '" />{{ role }}</p><br>
                            <p class="q-my-none"><strong>Dependencia: </strong>{{ branch ? branch : 'N/A' }}</p>

                        </div>
                    </div>
                    <br>

                    <div v-if="showSign" class="row">
                        <div class="col-12 q-mb-sm">
                            <b>Firma</b>
                        </div>
                        <div class="col-6 q-px-sm">
                            <div class="row">
                                <div class="col-12 q-mb-sm">
                                    <q-input filled v-model="file" type="file" accept="image/*">
                                        <template v-slot:prepend>
                                            <q-icon name="image" />
                                        </template>
                                    </q-input>
                                </div>
                                <div class="col-12 justify-end flex">
                                    <q-btn @click="putSign()" :disable="loading" :loading="loading" icon="upload"
                                        class="bg-blue text-white" label="Subir" />
                                </div>
                            </div>
                        </div>
                        <div class="col-6 q-px-sm">
                            <div class="row" style="background-color: whitesmoke;">
                                <div class="col-12 justify-center flex">
                                    <q-img :src="sign.url" fit="contain" style="width: 280px; height: 160px;">
                                        <template v-slot:error>
                                            <div class="absolute-full flex flex-center"
                                                style="background-color: whitesmoke; color: red;">
                                                sin firma
                                            </div>
                                        </template>
                                    </q-img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </q-card>
        </div>
    </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar'

import { useUserStore } from '../stores/user.js'

import { showNotify } from '../components/notify.js'

const $q = useQuasar()

const userStore = useUserStore()

const currentUser = ref(null)

const file = ref(null)

const showSign = ref(false)

const loading = ref(false)

let mail = ref('')

let branch = ref('')

let position = ref('')

onBeforeMount(async () => {
    currentUser.value = $q.localStorage.getItem('user')

    const { data } = await userStore.getUserParams(currentUser.value.id)

    name.value = data.name
    branch.value = data.branch
    position.value = data.position

    role.value = currentUser.value.role.label
    mail.value = currentUser.value.mail
    console.log(currentUser.value);

    if (currentUser.value.role.data !== 'administrator') {
        if (data.sign) {
            sign.value = data.sign
        }

        showSign.value = true
    }
})

async function putSign() {
    if (!file.value) {
        showNotify('No ha cargado una firma', 'negative')

    } else {
        loading.value = true

        const { status } = await userStore.putSign(currentUser.value.id, { test: file.value[0] })

        if (status !== 200) {
            showNotify('Error, Firma no modificada', 'negative')
        } else {
            const { data } = await userStore.getUserParams(currentUser.value.id)

            sign.value = data.sign

            showNotify('Firma modificada', 'positive', 'check_circle')

            file.value = null
        }

        loading.value = false
    }
}

const name = ref(null)

const role = ref(null)

const sign = ref({
    url: 'no_image'
})
</script>