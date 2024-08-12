<template>
    <q-page class="q-pa-md">
        <div class="text-h4 text-center q-mb-md">Legalización</div>
        <div class="row justify-center q-pt-md">
            <div v-if="!showPreview" class="col-8 q-mt-md" style="width: 90%;">
                <!-- <q-table class="my-sticky-header-table" :rows="rows" :columns="columns" row-key="name">

                    <template v-slot:body="props">
                        <tr :props="props" @click="function () {
                row = props.row
                if (user.role.data == 'user' || props.row.typeSchedule == 'commission' && user.role.data !== 'administrator') {
                    showDialog = true
                } else {
                    if (user.role.data == 'administrator' && props.row.typeSchedule == 'commission') {
                        showOther = true
                    }
                    showPreview = true
                }
            }">
                            <td v-if="user.role.data !== 'user' && props.row.typeSchedule == 'contractor'"
                                :props="props" key="name">
                                <p v-text="props.row.contract.contractorName" class="q-my-none text-center" />
                            </td>

                            <td v-if="user.role.data == 'administrator' && props.row.typeSchedule == 'commission'"
                                :props="props" key="name">
                                <p v-text="props.row.contract.publicName" class="q-my-none text-center" />
                            </td>

                            <td v-if="props.row.status.index == 6" :props="props" key="typeSchedule">
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
                                <p v-if="props.row.place && props.row.place !== null" v-text="props.row.place || '-'"
                                    class="q-my-none text-center" />

                                <div v-else class="row justify-center">
                                    <div class="col-12">
                                        <p v-text="props.row.regional" class="q-my-none text-center" />
                                    </div>

                                    <div class="col-10">
                                        <p v-text="props.row.institute" class="q-my-none text-center" />
                                    </div>
                                </div>

                                <p v-if="props.row.places && props.row.places.length !== 0 ? props.row.places[0] : ''"
                                    v-text="props.row.places[0].data" class="q-my-none text-center" />
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
                <q-table class="my-sticky-header-table" :loading="cargando" :rows="rows" :columns="columns" row-key="name"
                    :filter="filter">
                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon @click="function () {
                                row = props.row
                                if (user.role.data == 'user' || props.row.typeSchedule == 'commission' && user.role.data !== 'administrator') {
                                    showDialog = true
                                } else {
                                    if (user.role.data == 'administrator' && props.row.typeSchedule == 'commission') {
                                        showOther = true
                                    }
                                    showPreview = true
                                }
                            }" name="fa-solid fa-eye" size="20px" color="blue">
                                <q-tooltip>
                                    Ver y Firmar
                                </q-tooltip>
                            </q-icon>
                        </q-td>

                    </template>

                    <template v-slot:top-right>
                        <q-input dense debounce="300" color="primary" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>

                    <template v-slot:body-cell-name="props">
                        <q-td :props="props" v-if="user.role.data !== 'user' && props.row.typeSchedule == 'contractor'">
                            <p v-text="props.row.contract.contractorName" class="q-my-none text-center" />
                        </q-td>

                        <q-td v-if="user.role.data == 'administrator' && props.row.typeSchedule == 'commission'"
                            :props="props">
                            <p v-text="props.row.contract.publicName" class="q-my-none text-center" />
                        </q-td>
                    </template>

                    <template v-slot:body-cell-typeSchedule="props">
                        <q-td v-if="props.row.status.index == 6" :props="props">
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
                            <p v-if="props.row.place && props.row.place !== null" v-text="props.row.place || '-'"
                                class="q-my-none text-center" />

                            <div v-else class="row justify-center">
                                <div class="col-12">
                                    <p v-text="props.row.regional" class="q-my-none text-center" />
                                </div>

                                <div class="col-10">
                                    <p v-text="props.row.institute" class="q-my-none text-center" />
                                </div>
                            </div>

                            <p v-if="props.row.places && props.row.places.length !== 0 ? props.row.places[0] : ''"
                                v-text="props.row.places[0].data" class="q-my-none text-center" />
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

                    <template v-slot:body-cell-company="props">
                        <q-td key="company" :props="props">
                            <p v-if="props.row.company" v-text="props.row.company" class="q-my-none text-center" />

                            <p v-else-if="props.row.institutes && props.row.institutes.length !== 0"
                                v-text="props.row.institutes[0].data" class="q-my-none text-center" />

                            <p v-else class="q-my-none text-center">-</p>
                        </q-td>
                    </template>
                </q-table>
                <!-- FIN TABLA MIA -->
            </div>

            <div v-show="showPreview" class="justify-end start q-mb-md" style="font-size: 12px;">
                <q-btn @click="descargarFormatoPDF" label="Descargar como PDF" icon="download" class="bg-blue text-white" />
            </div>

            <div v-if="showPreview" class="col-8 justify-end  flex q-mb-md">
                <q-btn @click="function () {
                    if (user.role.data == 'user' || row.typeSchedule == 'commission' && user.role.data !== 'administrator') {
                        showPreview = false
                        showOther = false
                        showDialog = true
                    } else {
                        showPreview = false
                        showOther = false
                    }
                }" label="Atrás" icon="fa-solid fa-arrow-left" color="negative" />
            </div>

            <div class="col-12" />

            <div v-if="showPreview">
                <div id="invoice" ref="invoice" style="margin: 0 auto;">
                    <Preview v-if="!showOther" :row="row" />

                    <OtherPreview v-if="showOther" :row="row" />
                </div>
            </div>

            <div v-if="showPreview && user.role.data !== 'user' && user.role.data !== 'administrator' && row.typeSchedule !== 'commission'"
                class="col-8 q-my-md">
                <div v-if="!showReject" class="row justify-around">
                    <q-btn @click="justification = null; showReject = true" :disable='loading' icon="fa-solid fa-xmark"
                        color="negative" label="Rechazar" />
                    <q-btn @click="getSign()" :loading="loading" :disable='loading' icon="fa-solid fa-signature"
                        class="bg-primary text-white" label="Firmar" />
                </div>

                <div v-show="showReject" class="row">
                    <div class="col-12">
                        <q-input v-model="justification" filled autogrow stack-label label="Justificación" />
                    </div>

                    <div class="col-12 justify-around flex q-mt-md">
                        <q-btn @click="justification = null; showReject = false" :disable="loading" label="Cancelar"
                            color="negative" />
                        <q-btn @click="postReject()" :loading="loading" :disable="loading" label="Enviar"
                            class="bg-primary text-white" />
                    </div>
                </div>
            </div>

            <q-dialog v-model="showDialog" persistent>
                <q-card style="width: 700px;">
                    <q-card-section class="justify-between flex bg-primary">
                        <p v-text="'Crear Legalización'" class="q-my-none text-white" style="font-size: 25px;" />

                        <q-btn @click="getPreview()" label="Vista Previa" icon="fa-solid fa-eye"
                            class="bg-white text-primary" />
                    </q-card-section>

                    <q-space />

                    <q-card-section v-if="row.status.justification">
                        <div class="row justify-center">
                            <div class="col-10 text-white">
                                <q-banner rounded class="bg-red">
                                    <template v-slot:default="scope">
                                        <div class="row">
                                            <div class="col-12">
                                                <p class="q-my-none items-center flex" style="font-size: 18px;"><q-icon
                                                        name="error_outline" size="24px" />Legalización Rechazada</p>
                                            </div>
                                            <div class="col-12">
                                                <p v-text="row.status.justification" class="q-my-none q-pa-sm" />
                                            </div>
                                        </div>
                                    </template>
                                </q-banner>
                            </div>
                        </div>
                    </q-card-section>

                    <q-card-section>

                        <div class="row">
                            <div v-if="currentUser.staffType && currentUser.staffType.data == 'contractor'" class="col-12">
                                <p class="q-my-none text-primary" style="font-size: 18px;">Resultados</p>
                            </div>

                            <div v-if="currentUser.staffType && currentUser.staffType.data == 'contractor'" class="col-12">
                                <template v-for="(element, index) in results">
                                    <div class="row q-mt-sm">
                                        <div class="col-10 q-px-sm">
                                            <q-input v-model="element.data" filled stack-label autogrow label="Resultado" />
                                        </div>

                                        <div v-if="index !== 0" class="col-2 items-center flex">
                                            <q-btn @click="results.splice(index, 1)" dense label="Eliminar"
                                                color="negative" />
                                        </div>

                                        <div v-else class="col-2" />
                                    </div>
                                </template>

                                <div class="row justify-end q-mt-sm q-pr-md">
                                    <q-btn @click="results.push({})" label="+" sixe="sm" class="bg-primary text-white"
                                        style="font-size: 14px;" />
                                </div>
                            </div>

                            <div class="col-12 q-mt-md">
                                <p class="q-my-none text-primary" style="font-size: 18px;">Evidencias o Soportes</p>
                            </div>

                            <div class="col-12">
                                <div v-for="(element, index) in collections" class="row q-mt-md">
                                    <div class="col-10">
                                        <div class="row">
                                            <div class="col-12 q-pa-sm">
                                                <q-input v-model="element.name" filled stack-label label="Nombre" />
                                            </div>

                                            <div class="col-12 q-px-sm">
                                                <q-input v-model="element.items" multiple filled stack-label
                                                    label="Archivos" type="file" accept="image/*" />
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="index !== 0" class="col-2 items-center flex">
                                        <q-btn @click="collections.splice(index, 1)" dense label="Eliminar"
                                            color="negative" />
                                    </div>

                                    <div v-else class="col-2"></div>
                                </div>

                                <div class="row justify-end q-mt-sm q-pr-md">
                                    <q-btn @click="collections.push({ name: '', items: [], keys: [] })" label="+" size="sm"
                                        class="bg-primary text-white" style="font-size: 14px;" />
                                </div>
                            </div>

                            <!-- <div class="col-12">
                                <template v-for="(element, index) in collections">
                                    <div class="row justify-center">
                                        <div class="col-10 q-pa-sm">
                                            <q-input v-model="element.name" filled stack-label label="Nombre Colección" />
                                        </div>

                                        <div class="col-10 q-pa-sm">
                                            <q-uploader hide-upload-btn multiple class="full-width">
                                                <template v-slot:header="scope">
                                                    <div class="row" style="background-color: whitesmoke; height: 60px;">
                                                        <div class="col-12 justify-between flex">
                                                                <p class="q-my-none q-pt-sm q-pl-md" style="color: grey; font-size: 12px;">Archivos</p>
                                                                <q-btn @click="scope.pickFiles" icon="add_box" round dense flat color="primary" style="height: 10px;">
                                                                    <q-uploader-add-trigger />
                                                                </q-btn>
                                                        </div>
                                                    </div>
                                                </template>

                                                <template v-slot:list="scope">
                                                    <div class="row">
                                                        <div  v-for="(item, index) in getImg(index, scope.files)" class="col-12 justify-center flex q-mb-sm">
                                                            <q-img fit="contain" :src="item.__img.src" style="width: 370px; height: 240px;">
                                                                <q-btn @click="scope.removeFile(item)" dense flat  icon="close" class="bg-red text-white absolute-top-right all-pointer-events" style="font-size: 7px;" />
                                                            </q-img>
                                                        </div>
                                                    </div>
                                                </template>
                                            </q-uploader>
                                        </div>

                                        <div class="col-12 justify-end flex q-pr-md q-mb-md">
                                            <q-btn v-if="index !== 0" @click="collections.splice(index, 1)" dense label="Eliminar" color="negative" />
                                        </div>
                                    </div>
                                </template>

                                <div class="row justify-end q-pr-md">
                                    <q-btn @click="collections.push({name: '', items: [], keys: [] })" label="+" size="sm" class="bg-primary text-white" style="font-size: 14px;" />
                                </div>
                            </div> -->
                        </div>

                        <div class="col-12 q-mt-md">
                            <p class="q-my-none text-primary" style="font-size: 18px;">Conclusiones</p>
                        </div>

                        <div class="col-12">
                            <template v-for="(element, index) in conclusions">
                                <div class="row q-mt-sm">
                                    <div class="col-10 q-px-sm">
                                        <q-input type="textarea" rows="3" v-model="element.data" filled stack-label
                                            label="Conclusión" />
                                    </div>

                                    <div v-if="index !== 0" class="col-2 items-center flex">
                                        <q-btn @click="conclusions.splice(index, 1)" dense label="Eliminar"
                                            color="negative" />
                                    </div>
                                </div>
                            </template>

                            <div class="row justify-end q-pr-md q-mt-sm">
                                <q-btn @click="conclusions.push({})" label="+" size="sm" class="bg-primary text-white"
                                    style="font-size: 14px;" />
                            </div>
                        </div>

                        <div class="col-12 q-mt-md">
                            <p class="q-my-none text-primary" style="font-size: 18px;">Firma</p>
                        </div>

                        <div class="col-12 q-mt-sm">
                            <div class="row justify-center">
                                <div class="col-10" style="background-color: whitesmoke;">
                                    <p class="q-my-none q-pl-md q-pt-sm" style="font-size: 12px; color: grey;">Firma:
                                    </p>
                                </div>

                                <div class="col-10 q-pl-sm" style="background-color: whitesmoke;">
                                    <q-img fit="contain"
                                        :src="currentUser.staffType && currentUser.staffType.data == 'contractor' ? sign.contractor : sign.publicWorker"
                                        style="width: 200px; height: 80px;" />
                                </div>

                                <div class="col-10 justify-end flex q-pb-sm q-pr-sm" style="background-color: whitesmoke;">
                                    <q-btn :disable="sign.contractor !== null || sign.publicWorker !== null"
                                        @click="getSign()" class="bg-primary text-white" icon="fa-solid fa-signature"
                                        label="Firmar" />
                                </div>
                            </div>
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions class="justify-around">
                        <q-btn @click="cleanDialog(); yaFirmo = false" :disable="loading" label="Cerrar"
                            icon="fa-solid fa-xmark" color="negative" />
                        <q-btn @click="postLegalization()" icon="fa-solid fa-floppy-disk" :loading="loading"
                            :disable="yaFirmo === false" label="Guardar" class="bg-primary text-white" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
        <q-page-sticky position="bottom-right" :offset="[20, 20]">
            <q-btn @click="recargar()" color="primary" fab icon="fa-solid fa-rotate-right">
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    Recargar página
                </q-tooltip>
            </q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar'
import { showNotify } from '../../../components/notify.js'
import { useScheduleStore } from '../../../stores/schedule.js'
import { useUserStore } from '../../../stores/user.js'
import { jsPDF } from "jspdf";


import Preview from './Preview.vue'

import OtherPreview from '../public/Preview.vue'

let cargando = ref(false)

const loading = ref(false)

const invoice = ref(null)


function recargar() {
    window.location.reload()
}

function descargarFormatoPDF() {
    const notif = $q.notify({
        type: 'ongoing',
        message: 'Generando PDF...'
    })

    const doc = new jsPDF('p', 'pt', 'letter');

    // Obtener el HTML del div con la referencia
    const invoiceElement = invoice.value

    // Guardar el ancho original del elemento
    const originalWidth = invoiceElement.style.width;

    // Establecer un ancho fijo para el contenido
    invoiceElement.style.width = '915px'; // Ajusta este valor según tus necesidades

    // Convertir el HTML a PDF usando jsPDF
    doc.html(invoiceElement, {
        callback: function (doc) {
            // Restaurar el ancho original del elemento
            invoiceElement.style.width = originalWidth;
            doc.save('formatoLegalización.pdf');
            notif({
                type: 'positive',
                message: 'Formato en PDF descargado',
                timeout: 1300
            })
        },
        x: 20,
        y: 20,
        html2canvas: {
            scale: 0.58,
        },
        margin: [20, 20, 20, 20],
        autoPaging: 'text',
        width: 500 // Ajusta el ancho del contenido si es necesario
    });
}

onBeforeMount(async function () {
    user.value = $q.localStorage.getItem('user')

    currentUser.value = await getUser(user.value.id)

    cargando.value = true
    if (user.value.role.data == 'user') {
        if (currentUser.value.staffType.data == 'contractor') {
            const { data } = await scheduleStore.getScheduleParams(user.value.id, {
                contractor: true,
                legalization: true
            })

            rows.value = data

        } else {
            const { data } = await scheduleStore.getScheduleParams(user.value.id, {
                publicWorker: user.value.id,
                legalization: true
            })

            rows.value = data
        }
    }

    if (user.value.role.data == 'supervisor') {
        if ($q.localStorage.has('new') && $q.localStorage.getItem('new')) {
            const { data } = await scheduleStore.getScheduleParams(user.value.id, {
                supervisor: true,
                legalization: true
            })

            rows.value = data
        } else {
            rows.value = await getSchedule()

            columns.value.unshift({
                name: 'name',
                label: 'Nombres y Apellidos',
                align: 'center'
            })
        }
    }

    if (user.value.role.data == 'administrator') {
        const { data } = await scheduleStore.getSchedule({
            legalization: true
        })

        columns.value.unshift(
            {
                name: 'name',
                label: 'Nombres y Apellidos',
                align: 'center'
            },

            {
                name: 'typeSchedule',
                label: 'Tipo de Agenda',
                align: 'center'
            }
        )
        rows.value = data
    }
    //console.log(currentUser.value);
    cargando.value = false
})

async function getUser(id) {
    const { data } = await userStore.getUserParams(id)

    return data
}

function getPreview() {
    row.value.collections = collections.value

    row.value.conclusions = conclusions.value

    row.value.legalization.signature = sign.value

    showDialog.value = false

    showPreview.value = true

    if (row.value.typeSchedule == 'commission' || currentUser.value !== null && currentUser.value.staffTYpe && currentUser.value.staffType.data == 'publicWorker') {
        showOther.value = true
        row.value.legalization.createdAt = null
    } else {
        row.value.results = results.value
    }
}

async function getSchedule() {
    const { data } = await scheduleStore.getSchedule({
        supervisor: user.value.id,
        legalization: true
    })


    return data
}

const $q = useQuasar()

const user = ref(null)

const currentUser = ref(null)

const scheduleStore = useScheduleStore()

const userStore = useUserStore()

const showPreview = ref(false)

const showOther = ref(false)

const showReject = ref(false)

const rows = ref([])
let filter = ref('')
const row = ref(null)

let yaFirmo = ref(false)

// const prueba = ref([{ name: '', items: []}])

const columns = ref([
    {
        name: 'route',
        label: 'Ruta',
        align: 'center',
        style: 'width: 300px'
    },

    {
        name: 'place',
        field: "regional",
        label: 'Lugar Desplazamiento',
        align: 'center'
    },

    {
        name: 'company',
        label: 'Entidad o Empresa',
        align: 'center',
        field: "company"
    },
    {
        name: 'tripDate',
        label: 'Fecha Desplazamiento',
        align: 'center'
    },
    {
        name: 'opciones',
        field: 'opciones',
        label: 'Acciones',
        align: 'center'
    }
])


// function getImg(index, items) {
//     collections.value[index].items = items

//     return items
// }

async function postLegalization() {
    // if(sign.value.contractor !== null || sign.value.publicWorker !== null) {
    loading.value = true

    const test = {}

    for (let index = 0; index < collections.value.length; index++) {
        for (let otherIndex = 0; otherIndex < collections.value[index].items.length; otherIndex++) {
            test[`${index}${otherIndex}`] = collections.value[index].items[otherIndex]

            collections.value[index].keys.push(`${index}${otherIndex}`)
        }

        collections.value[index].items = []
    }


    if (Object.keys(test).length !== 0) {
        await scheduleStore.postLegalization(test, row.value._id)
    }

    const data = {
        userId : currentUser.value._id,
        collections: collections.value,
        results: results.value,
        conclusions: conclusions.value,
        legalization: {
            createdAt: Date.now(),
            signature: sign.value
        }
    }

    data.status = currentUser.value.staffType && currentUser.value.staffType.data == 'contractor' ? {
        data: sign.value.contractor !== null ? 'Legalización firmada por Contratista' : 'Agenda en Proceso de Legalización',
        index: sign.value.contractor !== null ? 5 : 4,
        justification: null
    } : {
        data: 'Legalización firmada por Funcionario',
        index: 6,
        justification: null
    }

    data.signature = sign.value
    data.createdAt = Date.now()

    const { status } = await scheduleStore.putLegalization(data, row.value._id)

    /*if (currentUser.value.staffType && currentUser.value.staffType.data == 'contractor' && results.value.length === 1) {
        showNotify('Faltan resultados', 'negative')
    }*/
    if (data.status.index == 5 || data.status.index == 6) {
        showNotify('Legalización firmada', 'positive', 'check')
    } else {
        showNotify('legalización creada', 'positive', 'check')
    }

    await cleanDialog()
}

async function getSign() {
    if (user.value.role.data == 'user' || row.value.typeSchedule == 'commission') {
        if (currentUser.value.staffType && currentUser.value.staffType.data == 'contractor') {
            sign.value.contractor = currentUser.value.sign.url
            yaFirmo.value = true
        } else {
            sign.value.publicWorker = currentUser.value.sign.url
            yaFirmo.value = true
        }
    }

    if (user.value.role.data == 'supervisor' && row.value.typeSchedule !== 'commission') {
        loading.value = true

        const { data } = await userStore.getUserParams(user.value.id)

        await scheduleStore.putLegalization({
            //userId: user.value._id,
            status: {
                data: 'Legalización firmada por Supervisor',
                index: 6,
                justification: null,
                number: 1
            },

            legalization: {
                signature: {
                    supervisor: data.sign.url
                }
            }
        }, row.value._id)

        loading.value = false

        rows.value = await getSchedule()

        showNotify('Legalización firmada', 'positive', 'check')

        showPreview.value = false
    }
}


const sign = ref({
    contractor: null,
    publicWorker: null,
    supervisor: null
})

const showDialog = ref(false)

async function cleanDialog() {
    results.value = [{ data: '' }]

    collections.value = [{ name: '', items: [], keys: [] }]

    conclusions.value = [{ data: '' }]

    sign.value = { contractor: null, publicWorker: null }

    if (currentUser.value.staffType) {
        const { data } = await scheduleStore.getScheduleParams(user.value.id, currentUser.value.staffType.data == 'contractor' ? { contractor: true, legalization: true } : { publicWorker: true, legalization: true })

        rows.value = data
    } else {
        const { data } = await scheduleStore.getScheduleParams(user.value.id, { supervisor: true, legalization: true })

        rows.value = data
    }

    loading.value = false

    showDialog.value = false

    row.value = null
}

async function postReject() {
    loading.value = true
    //console.log(currentUser.value);
    
    if (!justification.value) {
        showNotify('Proporcione una justificación', 'negative')
    } else {
        await scheduleStore.putLegalization({
            userId: currentUser.value._id,
            status: {
                data: 'Legalización Rechazada',
                index: 4,
                justification: justification.value ? justification.value : '-'
            },
            legalization: {
                signature: {
                    contractor: null
                }
            }
        }, row.value._id)

        showNotify('Legalización rechazada', 'info', 'info')

        rows.value = await getSchedule()

        loading.value = false

        showPreview.value = false
    }
    loading.value = false
}


const justification = ref(null)

const results = ref([{ data: '' }])

const collections = ref([{ name: '', items: [], keys: [] }])

const conclusions = ref([{ data: '' }])
</script>

<style scoped>
#invoice {
    font-family: Arial, sans-serif;
    word-spacing: 1px;
}
</style>