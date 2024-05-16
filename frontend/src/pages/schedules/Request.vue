<template>
    <q-page class="q-pa-md">
        <div class="text-h4 text-center q-mb-md">Solicitudes</div>
        <div v-if="!showPreview" class="row justify-center q-mt-md">
            <div class="col-8" style="width: 90%;">
                <!-- <q-table class="my-sticky-header-table" :filter="filter" :columns="columns" :rows="rows">
                    <template v-slot:body="props">
                        <tr :props="props" @click="function () {
            row = props.row

            console.log(row)

            if (props.row.typeSchedule !== 'contractor') {
                showOther = true
            }

            showPreview = true
        }">
                            <td key="name" :props="props">
                                <div class="row">
                                    <div v-if="props.row.typeSchedule == 'contractor'" class="col-12">
                                        <p v-text="props.row.contract.contractorName" class="q-my-none text-center" />
                                    </div>

                                    <div class="col-12">
                                        <p v-text="props.row.contract.publicName" class="q-my-none text-center" />
                                    </div>
                                </div>
                            </td>

                            <td key="typeSchedule">
                                <p v-if="props.row.typeSchedule == 'contractor'" class="q-my-none text-center">
                                    Contratista</p>

                                <p v-else class="q-my-none text-center">Funcionario</p>
                            </td>

                            <td key="route" :props="props">
                                <div class="row">
                                    <div class="col-12">
                                        <p v-text="`Ida: ${props.row.route.go[0].data} - ${props.row.route.go[props.row.route.go.length - 1].data}`"
                                            class="q-my-none text-center" />
                                    </div>

                                    <div class="col-12">
                                        <p v-text="`Regreso: ${props.row.route.return[0].data} - ${props.row.route.return[props.row.route.return.length - 1].data}`"
                                            class="q-my-none text-center" />
                                    </div>
                                </div>
                            </td>

                            <td key="place" :props="props">
                                <p v-if="props.row.place && props.row.place !== null" v-text="props.row.place"
                                    class="q-my-none text-center" />
                                <p v-else-if="props.row.places && props.row.places.length !== 0"
                                    v-text="props.row.places[0].data" class="q-my-none text-center" />
                                <div v-else class="row">
                                    <div class="col-12">
                                        <p v-text="props.row.regional || '-'" class="q-my-none text-center" />
                                    </div>
                                    <div class="col-12">
                                        <p v-text="props.row.institute" class="q-my-none text-center" />
                                    </div>
                                </div>
                            </td>

                            <td key="company" :props="props">
                                <p v-if="props.row.company" v-text="props.row.company" class="q-my-none text-center" />
                                <p v-else-if="props.row.institutes && props.row.institutes.length !== 0"
                                    v-text="props.row.institutes[0].data" class="q-my-none text-center" />
                                <p v-else class="q-my-none text-center">-</p>
                            </td>

                            <td key="tripDate" :props="props">
                                <div class="row">
                                    <div class="col-12">
                                        <p v-text="`Inicio: ${props.row.tripStart.slice(8, 10)}/${props.row.tripStart.slice(5, 7)}/${props.row.tripStart.slice(0, 4)}`"
                                            class="q-my-none text-center" />
                                    </div>

                                    <div class="col-12">
                                        <p v-text="`Fin: ${props.row.tripEnd.slice(8, 10)}/${props.row.tripEnd.slice(5, 7)}/${props.row.tripEnd.slice(0, 4)}`"
                                            class="q-my-none text-center" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </template>
                    <template v-slot:top-right>
                        <q-input dense debounce="300" color="primary" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>
                </q-table> -->

                <!-- TABLA MIA -->
                <q-table :loading="cargando" class="my-sticky-header-table" :filter="filter" :columns="columns" :rows="rows">
                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon @click="function () {
            row = props.row

            console.log(row)

            if (props.row.typeSchedule !== 'contractor') {
                showOther = true
            }

            showPreview = true
        }" name="fa-solid fa-eye" size="20px" color="blue">
                                <q-tooltip>
                                    Ver y Firmar
                                </q-tooltip>

                            </q-icon>
                        </q-td>
                    </template>

                    <template v-slot:body-cell-name="props">
                        <q-td :props="props">
                            <div class="row">
                                <div v-if="props.row.typeSchedule == 'contractor'" class="col-12">
                                    <p v-text="props.row.contract.contractorName" class="q-my-none text-center" />
                                </div>

                                <div class="col-12">
                                    <p v-text="props.row.contract.publicName" class="q-my-none text-center" />
                                </div>
                            </div>
                        </q-td>
                    </template>

                    <template v-slot:body-cell-typeSchedule="props">
                        <q-td :props="props">
                            <p v-if="props.row.typeSchedule == 'contractor'" class="q-my-none text-center">
                                Contratista</p>
                            <p v-else class="q-my-none text-center">Funcionario</p>
                        </q-td>
                    </template>

                    <template v-slot:body-cell-route="props">
                        <q-td :props="props">
                            <div class="row">
                                <div class="col-12">
                                    <p v-text="`Ida: ${props.row.route.go[0].data} - ${props.row.route.go[props.row.route.go.length - 1].data}`"
                                        class="q-my-none text-center" />
                                </div>

                                <div class="col-12">
                                    <p v-text="`Regreso: ${props.row.route.return[0].data} - ${props.row.route.return[props.row.route.return.length - 1].data}`"
                                        class="q-my-none text-center" />
                                </div>
                            </div>
                        </q-td>
                    </template>

                    <template v-slot:body-cell-place="props">
                        <q-td :props="props">
                            <p v-if="props.row.place && props.row.place !== null" v-text="props.row.place"
                                class="q-my-none text-center" />
                            <p v-else-if="props.row.places && props.row.places.length !== 0"
                                v-text="props.row.places[0].data" class="q-my-none text-center" />
                            <div v-else class="row">
                                <div class="col-12">
                                    <p v-text="props.row.regional || '-'" class="q-my-none text-center" />
                                </div>
                                <div class="col-12">
                                    <p v-text="props.row.institute" class="q-my-none text-center" />
                                </div>
                            </div>
                        </q-td>
                    </template>

                    <template v-slot:body-cell-company="props">
                        <q-td :props="props">
                            <p v-if="props.row.company" v-text="props.row.company" class="q-my-none text-center" />
                            <p v-else-if="props.row.institutes && props.row.institutes.length !== 0"
                                v-text="props.row.institutes[0].data" class="q-my-none text-center" />
                            <p v-else class="q-my-none text-center">-</p>
                        </q-td>
                    </template>

                    <template v-slot:body-cell-tripDate="props">
                        <q-td :props="props">
                            <div class="row">
                                <div class="col-12">
                                    <p v-text="`Inicio: ${props.row.tripStart.slice(8, 10)}/${props.row.tripStart.slice(5, 7)}/${props.row.tripStart.slice(0, 4)}`"
                                        class="q-my-none text-center" />
                                </div>

                                <div class="col-12">
                                    <p v-text="`Fin: ${props.row.tripEnd.slice(8, 10)}/${props.row.tripEnd.slice(5, 7)}/${props.row.tripEnd.slice(0, 4)}`"
                                        class="q-my-none text-center" />
                                </div>
                            </div>
                        </q-td>
                    </template>

                    <template v-slot:top-right>
                        <q-input dense debounce="300" color="primary" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>

                </q-table>
            </div>
        </div>
        <div v-else class="row justify-center q-my-md">
            <div class="col-6 q-mb-md">
                <q-btn @click="row = null; showOther = false; showPreview = false" label="Atrás"
                    class="bg-green text-white" />
            </div>

            <div class="col-12" />

            <Preview v-if="!showOther" :row="row" />

            <OtherPreview v-else :row="row" />

            <div class="col-12" />

            <div v-if="!showReject" class="col-6 q-mt-md">
                <div v-if="user.role.data == 'supervisor' || user.role.data == 'paymaster'" class="row">
                    <div class="col-12 justify-around flex">
                        <q-btn @click="showReject = !showReject" label="Rechazar" class="bg-red text-white" />

                        <q-btn @click="getSign()" label="Firmar" class="bg-green text-white" />

                    </div>
                </div>

                <div v-else class="row">
                    <div class="col-12 q-pa-sm">
                        <q-input v-model="tripOrder" filled stack-label label="Número Orden de Viaje" />
                    </div>

                    <div align="right" class="col-12 q-pa-sm">
                        <q-btn @click="updateSchedule(row._id)" label="Crear Legalización"
                            class="bg-green text-white" />
                    </div>
                </div>
            </div>

            <div v-if="showReject" class="col-6 q-mt-md">
                <div class="row">
                    <div class="col-12 q-pa-sm">
                        <q-input filled autogrow stack-label v-model="justification" label="Justificación" />
                    </div>
                    <div class="col-12 justify-around flex q-mt-sm">
                        <q-btn @click="justification = null; showReject = false" label="Cancelar"
                            class="bg-red text-white" />
                        <q-btn @click="updateSchedule(row._id)" label="Enviar" class="bg-green text-white" />
                    </div>
                </div>
            </div>

        </div>
    </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useScheduleStore } from '../../stores/schedule.js'

import { showNotify } from '../../components/notify.js'

import { useUserStore } from '../../stores/user.js'

import Preview from './contractor/Preview.vue'

import OtherPreview from './public/Preview.vue'

import { useQuasar } from 'quasar'

const scheduleStore = useScheduleStore()

const userStore = useUserStore()

const $q = useQuasar()

let cargando = ref(false)


onBeforeMount(async () => {
    user.value = $q.localStorage.getItem('user')

    console.log(user.value)

    cargando.value = true

    if (user.value.role.data == 'supervisor') {
        rows.value = await getSchedule({
            supervisor: user.value.id
        })
    }

    if (user.value.role.data == 'administrator') {
        rows.value = await getSchedule()
    }

    if (user.value.role.data == 'paymaster') {
        rows.value = await getSchedule({
            paymaster: user.value.id
        })
    }

    cargando.value = false


    console.log(rows.value)
})

async function getSign() {
    const { data } = await userStore.getUserParams(user.value.id)

    if (data.sign && data.sign.url) {
        const { signature } = row.value

        if (user.value.role.data == 'supervisor') {
            signature.supervisor = data.sign.url

            await scheduleStore.putSchedule({
                signature: signature,
                status: {
                    index: 2,
                    data: 'Agenda firmada por Supervisor',
                    number: 1
                }
            }, row.value._id)

            rows.value = await getSchedule({
                supervisor: user.value.id
            })
        }

        if (user.value.role.data == 'paymaster') {
            signature.paymaster = data.sign.url

            await scheduleStore.putSchedule({
                signature: signature,
                status: {
                    index: 3,
                    data: 'Agenda firmada por Ordenador',
                    number: 1
                }
            }, row.value._id)

            rows.value = await getSchedule({
                paymaster: user.value.id
            })
        }

        row.value = null

        showNotify('Agenda firmada', 'positive', '')

        showPreview.value = false
    } else {
        showNotify('Firma no encontrada', 'negative')
    }
}

async function getSchedule(query = {}) {
    const { data } = await scheduleStore.getSchedule(query)

    return data
}
const user = ref(null)

const rows = ref([])
let filter = ref('')
const row = ref(null)

const showPreview = ref(false)

const showOther = ref(false)

const columns = ref([
    {
        name: 'name',
        label: 'Nombres y Apellidos',
        align: 'center'
    },

    {
        name: 'typeSchedule',
        label: 'Tipo de Agenda',
        align: 'center'
    },

    {
        name: 'route',
        label: 'Ruta',
        align: 'center',
        style: 'width: 300px',
        headerStyle: 'width: 300px;'
    },

    {
        name: 'place',
        label: 'Lugar Desplazamiento',
        align: 'center'
    },

    {
        name: 'company',
        label: 'Entidad o Empresa',
        align: 'center'
    },

    {
        name: 'tripDate',
        label: 'Fecha Desplazamiento',
        align: 'center'
    },
    {
        name: 'opciones',
        label: 'Opciones',
        align: 'center'
    }
])

async function updateSchedule(id) {
    if (showReject.value) {
        await scheduleStore.putSchedule({
            status: {
                index: 0,
                data: 'Agenda rechazada',
                justification: justification.value ? justification.value : '-',
                number: 1
            },
            signature: {
                contractor: null,
                supervisor: null,
                paymaster: null,
                publicWorker: null
            }
        }, id)

        if (user.value.role.data == 'supervisor') {
            rows.value = await getSchedule({
                supervisor: user.value.id
            })
        }

        if (user.value.role.data == 'paymaster') {
            rows.value = await getSchedule({
                paymaster: user.value.id
            })
        }


        showReject.value = false

        row.value = null

        showPreview.value = false
    } else {
        if (user.value.role.data == 'administrator' && tripOrder.value !== null) {
            const { status } = row.value

            status.index = 4

            status.data = 'Agenda en Proceso de Legalización'

            console.log(status)

            await scheduleStore.putSchedule({
                tripOrder: tripOrder.value,
                status: status
            }, id)

            rows.value = await getSchedule()

            row.value = null

            tripOrder.value = null

            showPreview.value = false
        } else {
            showNotify(`Digite el número ${row.value.typeSchedule == 'contractor' ? 'Orden de Viaje' : 'Comisión de Servicios'}`, 'negative')
            showReject.value = false
        }
    }

}

const showReject = ref(false)

const justification = ref(null)

const tripOrder = ref(null)
</script>