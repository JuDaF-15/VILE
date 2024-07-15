<template>
    <div class="col-sm-8 col-lg-6" style="border: 2px solid black;" id="element">
        <div class="row border-bottom">
            <!-- imagen -->
            <div class="col-10 items-center justify-center flex q-pa-sm border-right">
                <img src="../../../assets/sena-icono-nuevo.png" style="height: 70px; width:70px" />
            </div>

            <div class="col-2" style="font-size: 12px;">
                <div class="row border-bottom">
                    <div class="col-12 q-my-md">
                        <p class="q-my-none text-center">Versión: 03</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 q-my-sm">
                        <p class="q-my-none text-center">Código: GTH-F-090</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row border-bottom" style="background-color: #575757; color: white; font-size: 12px;">
            <div class="col-12 q-my-sm justify-center flex">
                <p class="q-my-none">GESTIÓN DE TALENTO HUMANO</p>
            </div>
            <div class="col-12 q-my-sm justify-center flex">
                <p class="q-my-none">FORMATO AGENDA DESPLAZAMIENTO CONTRATISTA</p>
            </div>
        </div>

        <div class="row q-mt-sm" style="font-size: 12px;">
            <div class="col-12 justify-center flex" style="border-top: 2px solid black; border-bottom: 2px solid black;">
                <p class="q-my-none">DATOS DEL CONTRATISTA QUE SE DESPLAZA</p>
            </div>

            <div class="col-12">
                <div class="row border-bottom">
                    <div class="col-7 items-center flex border-right">
                        <p class="q-my-none q-pl-sm">FECHA DE ELABORACIÓN DE AGENDA</p>
                    </div>

                    <div class="col-5 justify-center flex">
                        <p v-text="createdAt && currentUser.role.data !== 'user' ? date.formatDate(createdAt, 'DD/MM/YYYY') : date.formatDate(Date.now(), 'DD/MM/YYYY')"
                            class="q-my-sm" />
                    </div>
                </div>

                <div class="row border-bottom">
                    <div class="col-7 justify-center flex border-right">
                        <p class="q-my-xs">NOMBRES Y APELLIDOS</p>
                    </div>

                    <div class="col-5 justify-center items-center flex">
                        <p class="q-my-none">IDENTIFICACIÓN</p>
                    </div>
                </div>

                <div class="row border-bottom">
                    <div class="col-7 justify-center flex border-right">
                        <p v-text="contractor || '-'" class="q-my-sm" />
                    </div>

                    <div class="col-1 items-center justify-center flex border-right">
                        <p class="q-my-none">Tipo</p>
                    </div>
                    <div class="col-1 items-center justify-center flex border-right">
                        <p v-text="identification.data || 'C.C.'" class="q-my-none" />
                    </div>

                    <div class="col-1 items-center justify-center flex border-right">
                        <p class="q-my-none">No.</p>
                    </div>

                    <div class="col-2 items-center justify-center flex">
                        <p v-text="identification || '0000000000'" class="q-my-none" />
                    </div>
                </div>

                <div class="row border-bottom">
                    <div class="col-2 items-center flex border-right">
                        <p class="q-my-none q-pl-sm">CONTRATO</p>
                    </div>
                    <div class="col-1 items-center justify-center flex border-right">
                        <p class="q-my-none">No.</p>
                    </div>
                    <div class="col-2 justify-center flex border-right">
                        <p v-text="contract.number || '0000000000'" class="q-my-sm" />
                    </div>
                    <div class="col-1 items-center justify-center flex border-right">
                        <p class="q-my-none">AÑO</p>
                    </div>
                    <div class="col-1 items-center justify-center flex border-right">
                        <p v-text="contract.date.start.slice(0, 4) || '0000'" class="q-my-none" />
                    </div>

                    <div class="col-2 items-center flex border-right">
                        <p class="q-my-none q-pl-sm" style="font-size: 9px;">FECHA VENCIMIENTO DEL CONTRATO</p>
                    </div>
                    <div class="col-1 items-center justify-center flex border-right">
                        <p v-text="contract.date.end.slice(8, 10)" class="q-my-none" />
                    </div>
                    <div class="col-1 items-center justify-center flex border-right">
                        <p v-text="contract.date.end.slice(5, 7)" class="q-my-none" />
                    </div>
                    <div class="col-1 items-center justify-center flex">
                        <p v-text="contract.date.end.slice(0, 4)" class="q-my-none" />
                    </div>
                </div>

                <div class="row border-bottom">
                    <div class="col-3 items-center flex border-right">
                        <p class="q-my-none q-pl-sm">OBJETO CONTRACTUAL</p>
                    </div>
                    <div class="col-9 justify-center flex">
                        <p v-text="object || 'Objeto'" class="q-my-sm q-mx-sm" />
                    </div>
                </div>

                <div class="row border-bottom">
                    <div class="col-2 items-center flex border-right">
                        <p class="q-my-none q-pl-sm" style="font-size: 9px;">DIRECCIÓN GENERAL / REGIONAL</p>
                    </div>
                    <div class="col-4 justify-center flex border-right">
                        <p v-text="currentRegional || 'Regionales'" class="q-my-sm" />
                    </div>

                    <div class="col-2 items-center flex border-right">
                        <p class="q-my-none q-pl-sm" style="font-size: 9px;">DEPENDENCIA / CENTRO</p>
                    </div>

                    <div class="col-4 items-center justify-center flex">
                        <p v-text="currentInstitute || 'Centro'" class="q-my-none" />
                    </div>
                </div>

                <div class="row border-bottom">
                    <div class="col-3 items-center flex border-right">
                        <p class="q-my-none q-pl-sm" style="font-size: 9px;">
                            NOMBRE DEL ORDENADOR DEL GASTO (de la Movilización)
                        </p>
                    </div>
                    <div class="col-4 justify-center flex border-right">
                        <p v-text="paymaster.name || '-'" class="q-my-sm" />
                    </div>

                    <div class="col-2 items-center flex border-right">
                        <p class="q-my-none q-pl-sm">CARGO</p>
                    </div>

                    <div class="col-3 items-center justify-center flex">
                        <p v-text="paymaster.position || '-'" class="q-my-none" />
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 items-center flex border-right">
                        <p class="q-my-none q-pl-sm" style="font-size: 9px;">
                            NOMBRE DEL SUPERVISOR(A) DEL CONTRATO
                        </p>
                    </div>
                    <div class="col-4 justify-center flex border-right">
                        <p v-text="supervisor.name || '-'" class="q-my-sm" />
                    </div>

                    <div class="col-2 items-center flex border-right">
                        <p class="q-my-none q-pl-sm">CARGO</p>
                    </div>
                    <div class="col-3 items-center justify-center flex">
                        <p v-text="supervisor.position || '-'" class="q-my-none" />
                    </div>
                </div>
            </div>

            <div class="col-12 justify-center flex" style="border-top: 2px solid black; border-bottom: 2px solid black;">
                <p class="q-my-none">INFORMACIÓN DEL DESPLAZAMIENTO</p>
            </div>

            <div class="col-12">
                <div class="row border-bottom">
                    <div class="col-2 items-center flex border-right">
                        <p class="q-my-none q-pl-sm">RUTA</p>
                    </div>

                    <div class="col-10 justify-center flex">
                        <p v-text="getRoute()" class="q-my-sm" />
                    </div>
                </div>

                <div class="row border-bottom">
                    <div class="col-2 items-center flex border-right">
                        <p class="q-my-none q-pl-sm" style="font-size: 9px;">DIRECCIÓN GENERAL / REGIONAL</p>
                    </div>
                    <div class="col-4 justify-center flex border-right">
                        <p v-text="regional || '-'" class="q-my-sm" />
                    </div>

                    <div class="col-2 items-center flex border-right">
                        <p class="q-my-none q-pl-sm" style="font-size: 9px;">DEPENDENCIA / CENTRO</p>
                    </div>
                    <div class="col-4 items-center justify-center flex">
                        <p v-text="institute || '-'" class="q-my-none" />
                    </div>
                </div>

                <div class="row border-bottom">
                    <div class="col-3 items-center flex border-right">
                        <p class="q-my-none q-pl-sm" style="font-size: 10px;">CIUDAD/DEPARTAMENTO O MUNICIPIO/DEPARTAMENTO O
                            CIUDAD/PAÍS</p>
                    </div>
                    <div class="col-2 justify-center items-center flex border-right">
                        <p v-text="place ? place[0].data : '-'" class="q-my-none" />
                    </div>

                    <div class="col-1 items-center flex border-right">
                        <p class="q-my-none q-pl-sm" style="font-size: 10px;">ENTIDAD O EMPRESA</p>
                    </div>
                    <div class="col-2 items-center justify-center flex border-right">
                        <p v-text="company || '-'" class="q-my-none" />
                    </div>

                    <div class="col-1 items-center flex border-right">
                        <p class="q-my-none q-pl-sm" style="font-size: 10px;">CONTACTO</p>
                    </div>
                    <div class="col-3 items-center justify-center flex">
                        <p v-text="companyContact || '-'" class="q-my-none" />
                    </div>
                </div>

                <div class="row border-bottom">
                    <div class="col-3 items-center flex border-right">
                        <p class="q-my-none q-pl-sm">FECHA INICIO DEL DESPLAZAMIENTO</p>
                    </div>
                    <div class="col-1 items-center justify-center flex border-right">
                        <p v-text="tripStart.slice(8, 10) || 'DD'" class="q-my-none" />
                    </div>
                    <div class="col-1 items-center justify-center flex border-right">
                        <p v-text="tripStart.slice(5, 7) || 'MM'" class="q-my-none" />
                    </div>
                    <div class="col-1 items-center justify-center flex border-right">
                        <p v-text="tripStart.slice(2, 4) || 'AA'" class="q-my-none" />
                    </div>

                    <div class="col-3 items-center flex border-right">
                        <p class="q-my-none q-pl-sm">FECHA FIN DESPLAZAMIENTO</p>
                    </div>
                    <div class="col-1 items-center justify-center flex border-right">
                        <p v-text="tripEnd.slice(8, 10) || 'DD'" class="q-my-none" />
                    </div>
                    <div class="col-1 items-center justify-center flex border-right">
                        <p v-text="tripEnd.slice(5, 7) || 'MM'" class="q-my-none" />
                    </div>
                    <div class="col-1 items-center justify-center flex">
                        <p v-text="tripEnd.slice(2, 4) || 'AA'" class="q-my-none" />
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 items-center flex border-right">
                        <p class="q-my-none q-pl-sm">OBJETIVO DEL DESPLAZAMIENTO</p>
                    </div>
                    <div class="col-9 justify-center flex">
                        <p v-text="tripObjective || 'Objetivo'" class="q-my-sm q-mx-sm" />
                    </div>
                </div>

                <div class="row" style="border-top: 2px solid black; border-bottom: 2px solid black;">
                    <div class="col-12 justify-center flex">
                        <p class="q-my-none">OBLIGACIONES DEL CONTRATO</p>
                    </div>
                </div>

                <div class="row border-bottom" v-for="(element, index) in duties" :key="index">
                    <div class="col-1 items-center justify-center flex border-right">
                        <p v-text="index + 1" class="q-my-none" />
                    </div>
                    <div class="col-10 justify-center flex">
                        <p v-text="element.data || 'Obligación'" class="q-my-sm q-mx-sm" />
                    </div>
                </div>

                <div class="row" style="border-top: 1px solid black; border-bottom: 2px solid black;">
                    <div class="col-12 justify-center flex">
                        <p class="q-my-none">AGENDA</p>
                    </div>
                </div>

                <div class="row border-bottom">
                    <div class="col-12 justify-center flex">
                        <p class="q-my-none">ACTIVIDADES</p>
                    </div>
                </div>

                <template v-for="(element, index) in activities">
                    <div class="row">
                        <div class="col-12 q-mt-sm q-ml-sm">
                            <p class="q-my-none"><strong
                                    v-text="`Día ${index + 1}: ${element.date.slice(8)}/${element.date.slice(5, 7)}/${element.date.slice(2, 4)}`" />
                            </p>

                            <template v-for="(item, itemIndex) in element.items">
                                <div v-if="index == 0">
                                    <div v-if="itemIndex == 0">
                                        <p v-text="item.data" class="q-my-none" />
                                        <p class="q-my-none">Medios de Transporte: <span
                                                v-for="(gomeantransport, gomeanIndex) in goMeanstransport"
                                                v-text="gomeanIndex !== goMeanstransport.length - 1 ? gomeantransport.label + ', ' : gomeantransport.label" />
                                        </p>
                                        <p v-if="element.items.length > 2 || activities.length > 1 && element.items.length > 1"
                                            class="q-my-none q-mt-sm">Actividades a Ejecutar:</p>
                                    </div>
                                    <div v-else-if="activities.length == 1 && itemIndex == element.items.length - 1">
                                        <p v-text="item.data" class="q-my-none q-mt-sm" />
                                    </div>
                                    <div v-else>
                                        <p v-text="item.data || 'Actividad'"
                                            :class="`q-my-none q-ml-sm ${itemIndex == element.items.length - 1 && activities.length == 1 ? 'q-mb-sm' : ''}`" />
                                    </div>
                                </div>

                                <div v-else-if="index == activities.length - 1">
                                    <div v-if="itemIndex !== element.items.length - 1">
                                        <p v-if="itemIndex == 0" class="q-my-none">Actividades a Ejecutar:</p>
                                        <p v-text="item.data || 'Actividad'" class="q-my-none q-ml-sm" />
                                    </div>
                                    <div v-else>
                                        <p v-if="element.items.length == 1" v-text="item.data" class="q-my-none" />
                                        <p v-else v-text="item.data" class="q-my-none q-mt-sm" />
                                    </div>
                                </div>
                                <div v-else>
                                    <p v-if="itemIndex == 0" class="q-my-none">Actividades a Ejecutar:</p>
                                    <p v-text="item.data || 'Actividad'" class="q-my-none q-ml-sm" />
                                </div>
                            </template>

                            <p v-if="index == activities.length - 1" class="q-my-none">Medios de Transporte: <span
                                    v-for="(returnmeantransport, returnmeanIndex) in returnMeanstransport"
                                    v-text="returnmeanIndex !== returnMeanstransport.length - 1 ? returnmeantransport.label + ', ' : returnmeantransport.label" />
                            </p>
                        </div>
                    </div>
                </template>

                <div class="row q-my-sm q-ml-sm">
                    <div class="col-12 ">
                        <p class="q-my-none"><strong>Observaciones:</strong></p>
                    </div>
                    <div v-for="(element, index) in observations" class="col-12">
                        <p v-text="element.data || 'Observación'" class="q-my-none" />
                    </div>
                </div>

                <div class="row" style="border-top: 2px solid black; border-bottom: 2px solid black;">
                    <div class="col-12 justify-center flex">
                        <p class="q-my-none">FIRMAS</p>
                    </div>
                </div>

                <div class="row">

                    <div class="col-12">
                        <div class="row">
                            <div class="col-4 border-right border-bottom">
                                <p class="q-my-none q-pl-sm">FIRMA ORDENADOR DE GASTO:</p>

                                <q-img v-if="sign.paymaster" fit="contain" :src="sign.paymaster"
                                    style="width: 140px; height: 80px;" />
                            </div>

                            <div class="col-4 border-right border-bottom">
                                <p class="q-my-none q-pl-sm">FIRMA SUPERVISOR DEL CONTRATO:</p>

                                <q-img v-if="sign.supervisor" fit="contain" :src="sign.supervisor"
                                    style="width: 140px; height: 80px;" />

                            </div>

                            <div class="col-4">
                                <p class="q-my-none q-pl-sm">FIRMA DEL CONTRATISTA:</p>

                                <q-img v-if="sign.contractor" fit="contain" :src="sign.contractor"
                                    style="width: 140px; height: 80px;" />
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="row border-bottom">
                            <div class="col-4 border-right">
                                <p v-text="`Nombres y Apellidos: ${paymaster.name}`" class="q-my-none q-pl-sm" />
                            </div>

                            <div class="col-4 border-right">
                                <p v-text="`Nombres y Apellidos: ${supervisor.name}`" class="q-my-none q-pl-sm" />
                            </div>
                            <div class="col-4"></div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="row">
                            <div class="col-4 border-right">
                                <p v-text="`Cargo: ${paymaster.position}`" class="q-my-none q-pl-sm" />
                            </div>

                            <div class="col-4 border-right">
                                <p v-text="`Cargo: ${supervisor.position}`" class="q-my-none q-pl-sm" />
                            </div>

                            <div class="col-4">
                                <p v-text="`Nombres y Apellidos: ${contractor || ''}`" class="q-my-none q-pl-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { date, useQuasar } from 'quasar'
import { useUserStore } from '../../../stores/user.js'


const $q = useQuasar()

const userStore = useUserStore()


const props = defineProps({
    row: Object
})

async function getContractor(id) {
    const { data } = await userStore.getUserParams(id)

    return data
}


function getRoute() {

    let route = ''

    if (goRoute.value.length !== 0 && returnRoute.value.length !== 0) {
        for (let index = 0; index < goRoute.value.length; index++) {
            if (index !== goRoute.value.length - 1) {
                route = route + `${goRoute.value[index].data} - `
            } else {
                route = route + `${goRoute.value[index].data}`
            }
        }

        for (let index = 0; index < returnRoute.value.length; index++) {
            // if(index == 0 && goRoute.value[goRoute.value.length - 1].id == returnRoute.value[0].id) {
            //     console.log('')
            // } else {
            route = route + ` - ${returnRoute.value[index].data}`
            // }
        }
    }

    return route

}

onBeforeMount(async () => {
    currentUser.value = $q.localStorage.getItem('user')

    const user = await getContractor(props.row.contractor)

    console.log(user)

    contractor.value = user.name

    identification.value = user.identification

    contract.value = user.contract

    object.value = props.row.contract.object

    currentRegional.value = props.row.contract.regional

    currentInstitute.value = props.row.contract.institute

    createdAt.value = props.row.createdAt

    supervisor.value = props.row.supervisor

    paymaster.value = props.row.paymaster

    regional.value = props.row.regional

    institute.value = props.row.institute

    if (props.row.place !== null) {
        place.value = [{ data: props.row.place }]
    }

    company.value = props.row.company

    companyContact.value = props.row.companyContact

    tripStart.value = props.row.tripStart

    tripEnd.value = props.row.tripEnd

    tripObjective.value = props.row.tripObjective

    duties.value = props.row.duties

    observations.value = props.row.observations

    activities.value = props.row.activities

    sign.value = props.row.signature

    goRoute.value = props.row.route.go

    returnRoute.value = props.row.route.return

    for (let index = 0; index < props.row.meanstransport.go.length; index++) {
        goMeanstransport.value.push({ label: props.row.meanstransport.go[index].data })
    }

    for (let index = 0; index < props.row.meanstransport.return.length; index++) {
        returnMeanstransport.value.push({ label: props.row.meanstransport.return[index].data })
    }
})

const currentUser = ref({})

const contractor = ref(null)

const identification = ref({})

const createdAt = ref('')

const contract = ref({
    number: null, date: {
        start: '',
        end: ''
    }
})

const object = ref(null)

const currentRegional = ref(null)

const currentInstitute = ref(null)

const supervisor = ref({})


const paymaster = ref({})

const regional = ref(null)

const institute = ref(null)

const place = ref(null)

const company = ref(null)

const companyContact = ref(null)

const tripStart = ref('')

const tripEnd = ref('')

const tripObjective = ref(null)

const duties = ref([])

const observations = ref([{ data: '' }])

const activities = ref([{ data: [], date: '' }])

const sign = ref({})

const goRoute = ref([])

const returnRoute = ref([])

const goMeanstransport = ref([])

const returnMeanstransport = ref([])
</script>

<style scoped>
.border-bottom {
    border-bottom: 1px solid black;
}

.border-right {
    border-right: 1px solid black;
}
</style>