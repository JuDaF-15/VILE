<template>
    <div class="col-6" style="border: 2px solid black" id="element">
        <div class="row" style="border-bottom: 1px solid black;">
            <div class="col-2 justify-center flex q-py-xs" style="border-right: 1px solid black">
                <q-img src="../../../assets/sena-icono-nuevo.png" fit="contain" style="height: 70px; width: 70px;" />
            </div>
            <div class="col-10">
                <p class="q-my-none q-pt-lg text-center" style="font-size: 18px;"><strong>{{ props.row.status.index !== 4 &&
                    props.row.status.index !== 6 ? 'AGENDA DE LABORES PARA COMISIÓN SERVIDORES PÚBLICOS' : 'INFORME DE LA COMISIÓN DE SERVIDORES PUBLICOS' }}</strong></p>
            </div>
        </div>

        <div v-if="props.row.status.index !== 4 && props.row.status.index !== 6" class="row border-bottom"
            style="background-color: rgb(217, 217, 217);">
            <div class="col-12">
                <p class="q-my-none q-pt-xs text-center"><strong>DATOS DE LA AGENDA DE COMISIÓN</strong></p>
            </div>
        </div>

        <div class="row border-bottom">
            <div class="col-5 border-right">
                <p class="q-my-none q-pl-xs q-pt-xs"><strong>{{ `${props.row.status.index !== 4 && props.row.status.index
                    !== 6 ? 'FECHA DE ELABORACIÓN DE AGENDA' : 'FECHA DE ELABORACIÓN DEL INFORME'}` }}</strong></p>
            </div>
            <div class="col-7">
                <p v-if="props.row.status.index !== 4 && props.row.status.index !== 6"
                    v-text="date.formatDate(props.row.createdAt !== null ? props.row.createdAt : Date.now(), 'DD/MM/YYYY')"
                    class="q-my-none q-pl-xs" />

                <p v-else
                    v-text="date.formatDate(legalization.createdAt !== null ? legalization.createdAt : Date.now(), 'DD/MM/YYYY')"
                    class="q-my-none q-pl-xs" />
            </div>
        </div>

        <div class="row border-bottom">
            <div class="col-5 border-right">
                <p class="q-my-none q-pl-xs"><strong>NOMBRES Y APELLIDOS DEL COMISIONADO</strong></p>
            </div>
            <div class="col-7">
                <p v-text="publicWorker" class="q-my-none q-pl-xs" />
            </div>
        </div>

        <template v-if="props.row.status.index == 4 || props.row.status.index == 6">
            <div class="row border-bottom">
                <div class="col-5 border-right">
                    <p class="q-my-none q-pl-xs"><strong>DEPENDENCIA</strong></p>
                </div>

                <div class="col-7">
                    <p v-text="props.row.contract.publicBranch" class="q-my-none q-pl-xs" />
                </div>
            </div>

            <div class="row border-bottom" style="background-color: rgb(217, 217,217)">
                <div class="col-12">
                    <p class="q-my-none q-pt-xs text-center"><strong>INFORMACIÓN DE LA COMISIÓN</strong></p>
                </div>
            </div>

            <div class="row border-bottom">
                <div class="col-4 border-right">
                    <p class="q-my-none q-pl-xs q-pt-xs"><strong>No. COMISIÓN DE SERVICIOS</strong></p>
                </div>

                <div class="col-8">
                    <p v-text="props.row.tripOrder" class="q-my-none q-pl-xs" />
                </div>
            </div>
        </template>

        <div class="row border-bottom">
            <div class="col-4 border-right">
                <p class="q-my-none q-pl-xs q-pt-xs"><strong>FECHA INICIO DE COMISIÓN</strong></p>
            </div>
            <div class="col-2 border-right">
                <p v-text="tripStart.length !== 0 ? `${tripStart.slice(8, 10)}/${tripStart.slice(5, 7)}/${tripStart.slice(0, 4)}` : 'DD/MM/YYYY'"
                    class="q-my-none q-pl-xs" />
            </div>

            <div class="col-4 border-right">
                <p class="q-my-none q-pl-xs q-pt-xs"><strong>FECHA FIN DE LA COMISIÓN</strong></p>
            </div>
            <div class="col-2">
                <p v-text="tripEnd.length !== 0 ? `${tripEnd.slice(8, 10)}/${tripEnd.slice(5, 7)}/${tripEnd.slice(0, 4)}` : 'DD/MM/YYYY'"
                    class="q-my-none q-pl-xs" />
            </div>
        </div>

        <div class="row border-bottom" style="background-color: rgb(217, 217, 217);">
            <div class="col-12">
                <p class="q-my-none q-pt-xs text-center"><strong>{{ `${props.row.status.index !== 6 &&
                    props.row.status.index !== 4 ? 'LUGAR DE LA COMISIÓN' : 'LUGAR DONDE SE REALIZÓ LA COMISIÓN'}`
                }}</strong></p>
            </div>
        </div>

        <div class="row border-bottom">
            <div class="col-2 border-right">
                <p class="q-my-none q-pl-xs"><strong>MUNICIPIO O CIUDAD</strong></p>
            </div>

            <div class="col-2 border-right">
                <p class="q-my-none q-pl-xs q-pt-xs"><strong>DIRECCIÓN GENERAL / REGIONAL</strong></p>
            </div>

            <div class="col-8 border-right">
                <p class="q-my-none q-pl-xs q-pt-xs"><strong>{{ `DEPENDENCIA / CENTRO DE FORMACIÓN / SEDE / INSTITUCIÓN
                        ${props.row.status.index !== 4 && props.row.status.index !== 6 ? 'A VISITAR' : 'VISITADA'}`
                }}</strong></p>
            </div>
        </div>

        <div class="row border-bottom">
            <div class="col-2 border-right">
                <p class="q-my-none q-pl-xs"><span v-for="(element, index) in place"
                        v-text="`${element.data}${index !== place.length - 1 ? ', ' : ''}`" /></p>
            </div>
            <div class="col-2 border-right">
                <p v-text="props.row.regional !== null ? props.row.regional : '-'" class="q-my-none q-pl-xs" />
            </div>

            <div class="col-8 border-right">
                <p class="q-my-none q-pl-xs"><span v-for="(element, index) in institute"
                        v-text="`${element.data}${index !== institute.length - 1 ? ', ' : ''}`" /></p>
            </div>
        </div>

        <div class="row border-bottom">
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <p class="q-my-none q-pl-xs q-pt-xs"><strong>OBJETO DE LA COMISIÓN:</strong></p>
                    </div>
                    <div class="col-12">
                        <p v-text="props.row.tripObjective ? props.row.tripObjective : '-'" class="q-my-none q-px-sm" />
                    </div>
                </div>
            </div>
        </div>

        <div class="row border-bottom" style="background-color: rgb(217, 217, 217)">
            <div class="col-12">
                <p class="q-my-none q-pt-xs text-center"><strong>ACTIVIDADES A DESARROLLAR DURANTE LA COMISIÓN RESOLUCIÓN
                        2838/2016 Art.17:</strong></p>
            </div>
        </div>

        <div class="row border-bottom">
            <div class="col-12">
                <template v-for="(element, index) in activities">
                    <div class="row">
                        <div class="col-12 q-mt-sm q-px-sm">
                            <p class="q-my-none"><strong v-text="`Día ${index + 1}: `" />{{ element.date.length !== 0 ?
                                `${element.date.slice(8)}/${element.date.slice(5, 7)}/${element.date.slice(0, 4)}` :
                                'DD/MM/AAAA' }}</p>

                            <template v-for="(item, itemIndex) in element.items">
                                <div v-if="index == 0">
                                    <div v-if="itemIndex == 0">
                                        <p class="q-my-none"><strong v-text="'Desplazamiento Ruta de Ida: '" />{{ item.data
                                        }}</p>
                                        <p class="q-my-none"><strong v-text="'Medios de Transporte: '" /><span
                                                v-for="(meangotransport, meangoIndex) in goMeanstransport"
                                                v-text="meangoIndex !== goMeanstransport.length - 1 ? meangotransport.data + ', ' : meangotransport.data" />
                                        </p>
                                        <p v-if="element.items.length > 2 || activities.length > 1 && element.items.length > 1"
                                            class="q-my-none q-mt-sm"><strong v-text="'Actividades a Ejecutar:'" /></p>
                                    </div>
                                    <div v-else-if="activities.length == 1 && itemIndex == element.items.length - 1">
                                        <p class="q-my-none q-mt-sm"><strong
                                                v-text="'Desplazamiento Ruta de Regreso: '" />{{ item.data }}</p>
                                    </div>
                                    <div v-else>
                                        <p class="q-my-none q-pl-sm q-mb-xs"><span v-text="'-'" class="q-mr-sm" />{{
                                            `${item.time.length !== 0 ? date.extractDate(item.time,
                                                'hh:mm').toLocaleTimeString().slice(0, 1) == 0 ? `12${item.time.slice(2)}` :
                                                date.extractDate(item.time, 'hh:mm').toLocaleTimeString().slice(0,
                                                    parseInt(item.time.slice(0, 2)) > 9 && item.time.slice(0, 2) < 12 ? 5 : 4) : ''
                                            } ${item.time.length !== 0 ? item.time >= '12:00' ? 'pm:' : 'am:' : ''}
                                                                                        ${item.data || 'Actividad'}` }}</p>
                                    </div>
                                </div>

                                <div v-else-if="index == activities.length - 1">
                                    <div v-if="itemIndex !== element.items.length - 1">
                                        <p v-if="itemIndex == 0" class="q-my-none"><strong
                                                v-text="'Actividades a Ejecutar:'" /></p>
                                        <p :class="`q-my-none q-pl-sm ${itemIndex !== 0 ? 'q-mt-xs' : ''}`"><span
                                                v-text="'-'" class="q-mr-sm" />{{ `${item.time.length !== 0 ?
                                                    date.extractDate(item.time, 'hh:mm').toLocaleTimeString().slice(0, 1) == 0 ?
                                                        `12${item.time.slice(2)}` : date.extractDate(item.time,
                                                            'hh:mm').toLocaleTimeString().slice(0, parseInt(item.time.slice(0, 2)) > 9 &&
                                                                item.time.slice(0, 2) < 12 ? 5 : 4) : ''} ${item.time.length !== 0 ? item.time >=
                                                                    '12:00' ? 'pm:' : 'am:' : ''} ${item.data || 'Actividad'}` }}</p>
                                    </div>
                                    <div v-else>
                                        <p class="q-my-none q-mt-xs"><strong
                                                v-text="'Desplazamiento Ruta de Regreso: '" />{{ item.data }}</p>
                                    </div>
                                </div>
                                <div v-else>
                                    <p v-if="itemIndex == 0" class="q-my-none"><strong v-text="'Actividades a Ejecutar:'" />
                                    </p>

                                    <p class="q-my-none q-pl-sm">
                                        <span v-text="'-'" class="q-mr-sm" />
                                        {{
                                            `${item.time.length !== 0 ?
                                                date.extractDate(item.time, 'hh:mm').toLocaleTimeString().slice(0, 1) == 0 ?
                                                    `12${item.time.slice(2)}`
                                                    : date.extractDate(item.time, 'hh:mm').toLocaleTimeString().slice(0,
                                                        parseInt(item.time.slice(0, 2)) > 9 && parseInt(item.time.slice(0, 2)) < 12 ||
                                                            parseInt(item.time.slice(0, 2)) > 21 && parseInt(item.time.slice(0, 2)) < 24 ? 5
                                                            : 4) : ''} ${item.time.length !== 0 ? item.time >= '12:00' ? 'pm:' : 'am:' :
                                                                ''} ${item.data || 'Actividad'
                                                }`
                                        }}
                                    </p>
                                </div>
                            </template>

                            <p v-if="index == activities.length - 1" class="q-my-none q-pb-sm"><strong
                                    v-text="'Medios de Transporte: '" /><span
                                    v-for="(meanreturntransport, meanreturnIndex) in returnMeanstransport"
                                    v-text="meanreturnIndex !== returnMeanstransport.length - 1 ? meanreturntransport.data + ', ' : meanreturntransport.data" />
                            </p>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <template v-if="props.row.status.index !== 4 && props.row.status.index !== 6">
            <div class="row border-bottom" style="background-color: rgb(217, 217, 217);">
                <div class="col-6 border-right">
                    <p class="q-my-none q-pl-xs"><strong>COMISIONADO</strong></p>
                </div>

                <div class="col-6">
                    <p class="q-my-none q-pl-xs q-pt-xs"><strong>AUTORIZA LA COMISIÓN</strong></p>
                </div>
            </div>

            <div class="row">
                <div class="col-6 border-right">
                    <div class="row">
                        <div class="col-12">
                            <q-img v-if="signature.publicWorker !== null" :src="signature.publicWorker" fit="contain"
                                style="width: 140px; height: 80px;" />
                            <p class="q-my-none q-pl-sm"><strong v-text="'Firma'" /></p>
                        </div>
                        <div class="col-12">
                            <p class="q-my-none q-pl-sm"><strong>Nombres y Apellidos: </strong>{{ publicWorker }}</p>
                        </div>
                    </div>
                </div>

                <div class="col-6">
                    <div class="row">
                        <div class="col-12">
                            <q-img v-if="signature.paymaster !== null" :src="signature.paymaster" fit="contain"
                                style="width: 140px; height: 80px;" />
                            <p class="q-my-none q-pl-sm"><strong v-text="'Firma'" /></p>
                        </div>

                        <div class="col-12">
                            <p class="q-my-none q-pl-sm"><strong v-text="'Nombres y Apellidos: '" />{{ paymaster.name || '-'
                            }}</p>
                            <p class="q-my-none q-pl-sm"><strong v-text="'Cargo: '" />{{ paymaster.position || '-' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="row border-bottom" style="background-color: rgb(217, 217, 217)">
                <div class="col-12">
                    <p class="q-my-none text-center"><strong>CONCLUSIONES</strong></p>
                </div>
            </div>

            <div class="row border-bottom">
                <div class="col-12">
                    <p class="q-my-none q-pl-xs"><strong>Relacione los resultados de la comisión</strong></p>
                </div>

                <div v-for="(element, index) in conclusions" class="col-12">
                    <p class="q-my-none q-pl-sm"><strong v-text="`${index + 1}. `" />{{ element.data || 'Conclusión' }}</p>
                </div>
            </div>

            <div class="row border-bottom">
                <div class="col-12">
                    <p class="q-my-none q-pl-xs"><strong>EVIDENCIAS O SOPORTES: Enuncie y anexe los documentos que soportan
                            los resultados de la comisión</strong></p>
                </div>
            </div>

            <div class="row border-bottom">
                <div v-for="(element, index) in collections" class="col-12">
                    <p class="q-my-none q-pl-sm"><strong v-text="`${index + 1}. `" />{{ element.name || 'Evidencia' }}</p>
                </div>
            </div>

            <div class="row border-bottom">
                <div class="col-8 border-right">
                    <p class="q-my-none text-center"><strong>NOMBRES Y APELLIDOS DEL COMISIONADO</strong></p>
                </div>

                <div class="col-4">
                    <p class="q-my-none text-center"><strong>FIRMA</strong></p>
                </div>
            </div>

            <div class="row">
                <div class="col-8 border-right">
                    <p v-text="publicWorker" class="q-my-none q-pl-xs" />
                </div>

                <div class="col-4">
                    <q-img v-if="legalization.signature.publicWorker !== null" :src="legalization.signature.publicWorker"
                        style="width: 140px; height: 80px;" />
                </div>
            </div>
        </template>
    </div>

    <div class="col-12" />

    <div class="col-6">
        <div class="row justify-end">
            <p v-text="props.row.status.index !== 4 && props.row.status.index !== 6 ? 'GTH-F-188 V01' : 'GTH-F-064 V04'" />
        </div>
    </div>

    <div class="col-12" />

    <div v-if="user.role.data !== 'supervisor' && user.role.data !== 'user' && props.row.status.index == 6"
        class="col-6 q-mt-md">
        <div class="row">
            <div class="col-12">
                <p class="q-my-none text-center" style="font-size: 18px;"><strong v-text="'SOPORTES DE DESPLAZAMIENTO'" />
                </p>

            </div>
        </div>

        <div v-for="(element, index) in collections" class="row">
            <div class="col-12 q-mb-sm">
                <p v-text="`${index + 1} ${element.name}`" class="q-my-none" style="font-size: 18px;" />
            </div>

            <div v-for="(item, itemIndex) in element.items" class="col-12 justify-center flex q-pa-xs">
                <q-img :src="item.url" fit="contain" style="width: 600px; height: 400px;" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

import { useUserStore } from '../../../stores/user.js'

import { date, useQuasar } from 'quasar'

const props = defineProps({ row: Object })

const userStore = useUserStore()

const $q = useQuasar()

onBeforeMount(async function () {
    user.value = $q.localStorage.getItem('user')

    console.log(user)

    if (props.row.publicWorker && props.row.publicWorker !== null) {
        const { data } = await userStore.getUserParams(props.row.publicWorker)
        publicWorker.value = data.name

    } else {
        const { data } = await userStore.getUserParams(props.row.supervisor_id)
        publicWorker.value = data.name
    }

    tripStart.value = props.row.tripStart.slice(0, 10)

    tripEnd.value = props.row.tripEnd.slice(0, 10)

    paymaster.value.name = props.row.paymaster.name

    paymaster.value.id = props.row.paymaster.id

    paymaster.value.position = props.row.paymaster.position

    place.value = props.row.places

    institute.value = props.row.institutes

    activities.value = props.row.activities

    goMeanstransport.value = props.row.meanstransport.go

    returnMeanstransport.value = props.row.meanstransport.return

    console.log(props.row)

    if (props.row.status.index == 4 || props.row.status.index == 6) {
        conclusions.value = props.row.conclusions
        collections.value = props.row.collections

        legalization.value = props.row.legalization
    } else {
        signature.value = props.row.signature
    }
})

const signature = ref({
    publicWorker: null,
    paymaster: null
})

const legalization = ref({
    createdAt: null,
    signature: {
        publicWorker: null
    }
})

const user = ref({})

const publicWorker = ref('')

const paymaster = ref({})

const place = ref([])

const institute = ref([])

const activities = ref([])

const goMeanstransport = ref([])

const returnMeanstransport = ref([])

const tripStart = ref('')

const tripEnd = ref('')

const conclusions = ref([])

const collections = ref([])
</script>

<style scoped>
.border-bottom {
    border-bottom: 1px solid black;
}

.border-right {
    border-right: 1px solid black;
}</style>