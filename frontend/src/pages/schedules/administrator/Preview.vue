<template>
        <div class="col-6" style="border: 2px solid black;">
            <div class="row q-pb-md" style="border-bottom: 1px solid black;">
                <div class="col-2 q-mt-xs q-pl-xs">
                    <q-img src="../../../assets/sena-icono.png" fit="contain" style="height: 60px; width: 60px;" />
                </div>
                <div class="col-10 items-end flex">
                    <p class="q-my-none text-end" style="font-size: 18px;"><strong>FORMATO INFORME LEGALIZACION DESPLAZAMIENTO - CONTRATISTA</strong></p>
                </div>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <div class="col-12">
                    <p class="q-my-none q-pl-xs"><strong>CIUDAD Y FECHA</strong> (En la que se presenta el informe)</p>
                </div>

                <div class="col-12">
                    <p v-text="`San Gil - ${createdAt && currentUser.role.data !== 'user' ? date.formatDate(createdAt, 'DD/MM/YYYY') : date.formatDate(Date.now(), 'DD/MM/YYYY')}`" class="q-my-none q-pl-sm" />
                </div>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <div class="col-12">
                    <p class="q-my-none q-pl-xs"><strong>PRESENTADO A:</strong> (Nombre del ordenador del gasto y cargo)</p>
                </div>

                <div class="col-12">
                    <p v-text="`${paymaster.name} - ${paymaster.position}`" class="q-my-none q-pl-sm" />
                </div>
            </div>

            <div class="row" style="border-bottom: 1px solid black">
                <div class="col-4" style="border-right: 1px solid black;">
                    <div class="row">
                        <div class="col-12">
                            <p class="q-my-none q-pl-xs"><strong>ORDEN DE VIAJE No:</strong></p>
                        </div>

                        <div class="col-12">
                            <p v-text="tripOrder" class="q-my-none q-pl-sm" />
                        </div>
                    </div>
                </div>
                <div class="col-4" style="border-right: 1px solid black;">
                    <div class="row">
                        <div class="col-12" style="border-bottom: 1px solid black;">
                            <p class="q-my-none q-pl-xs"><strong>FECHA DE INICIO:</strong></p>
                        </div>
                        <div class="col-12">
                            <p v-text="`${tripStart.slice(8, 10)}/${tripStart.slice(5, 7)}/${tripStart.slice(0, 4)}`" class="q-my-none q-pl-sm" />
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row">
                        <div class="col-12" style="border-bottom: 1px solid black;">
                            <p class="q-my-none q-pl-xs"><strong>FECHA DE FINALIZACIÓN:</strong></p>
                        </div>
                        <div class="col-12">
                            <p v-text="`${tripEnd.slice(8, 10)}/${tripEnd.slice(5, 7)}/${tripEnd.slice(0, 4)}`" class="q-my-none q-pl-sm" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <div class="col-4" style="border-right: 1px solid black;">
                    <div class="row">
                        <div class="col-12">
                            <p class="q-my-none q-pl-xs"><strong>LUGAR A DONDE REALIZÓ EL DESPLAZAMIENTO</strong></p>
                        </div>

                        <div class="col-12">
                            <p v-text="company" class="q-my-none q-pl-sm" />
                        </div>
                    </div>
                </div>

                <div class="col-4" style="border-right: 1px solid black;">
                    <div class="row">
                        <div class="col-12" style="border-bottom: 1px Solid black;">
                            <p class="q-my-none q-pl-xs"><strong>REGIONAL / CENTRO DE FORMACIÓN</strong></p>
                        </div>

                        <div class="col-12">
                            <p v-text="regional !== null ? `${regional} / ${institute}` : '-'" class="q-my-none q-pl-sm" />
                        </div>
                    </div>
                </div>

                <div class="col-4">
                    <div class="row">
                        <div class="col-12" style="border-bottom: 1px solid black;">
                            <p class="q-my-none q-pl-xs"><strong>OTRA: (ciudad)</strong></p>
                        </div>

                        <div class="col-12">
                            <p v-text="place || '-'" class="q-my-none q-pl-sm" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <div class="col-12">
                    <p class="q-my-none q-pl-xs"><strong>OBJETIVO DEL DESPLAZAMIENTO:</strong></p>
                </div>

                <div class="col-12">
                    <p v-text="tripObjective" class="q-my-none q-px-sm" />
                </div>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <p class="q-my-none q-pl-xs"><strong>ACTIVIDADES DESARROLLADAS</strong></p>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <div v-for="(element, index) in mainActivities" class="col-12">
                    <p class="q-my-none q-pl-md"><strong  v-text="`${parseInt(index) + 1}. `" />{{ element.data || 'Actividad' }}</p>
                </div>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <p class="q-my-none q-pl-xs"><strong>RESULTADOS:</strong></p>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <div v-for="(element, index) in results" class="col-12">
                    <p class="q-my-none q-pl-md"><strong v-text="`${index + 1}. `" />{{ element.data || 'Resultado' }}</p>
                </div>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <p class="q-my-none q-pl-xs"><strong>EVIDENCIAS O SOPORTES:</strong> Enuncie los archivos que soportan estos resultados y anexe los correspondientes en este informe</p>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <div v-for="(element, index) in collections" class="col-12">
                    <p class="q-my-none q-pl-md"><strong v-text="`${index + 1}. `" />{{  element.name || 'Evidencia' }}</p>
                </div>
            </div>

            <div class="row justify-center" style="border-bottom: 1px solid black;">
                <p class="q-my-none"><strong>COMPROMISOS</strong></p>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <div class="col-4" style="border-right: 1px solid black;">
                    <p class="q-my-none text-center"><strong>ACTIVIDAD</strong></p>
                </div>

                <div class="col-4" style="border-right: 1px solid black;">
                    <p class="q-my-none text-center"><strong>REPONSABLE</strong></p>
                </div>

                <div class="col-4">
                    <p class="q-my-none text-center"><strong>FECHA</strong></p>
                </div>
            </div>

            <div v-for="(element, index) in activities" class="row">
                <div v-for="(item, itemIndex) in element.items" class="col-12" style="border-bottom: 1px solid black;">
                    <div class="row">
                        <div class="col-4" style="border-right: 1px solid black;">
                            <p class="q-my-none q-pl-sm"><strong v-text="`${getNumberOther()}. `" />{{ item.data || 'Actividad' }}</p>
                        </div>

                        <div class="col-4" style="border-right: 1px solid black;">
                            <p v-text="contractorName" class="q-my-none text-center" />
                        </div>

                        <div class="col-4">
                            <p v-text="`${element.date.slice(8, 10)}/${element.date.slice(5, 7)}/${element.date.slice(0,4)}`" class="q-my-none text-center" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <p class="q-my-none q-pl-xs"><strong>CONCLUSIONES:</strong></p>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <div v-for="(element, index) in conclusions" class="col-12">
                    <p class="q-my-none q-pl-xs"><strong  v-text="`${index + 1}. `" />{{ element.data || 'Conclusión' }}</p>
                </div>
            </div>

            <div class="row justify-center" style="border-bottom: 1px solid black;">
                <p class="q-my-none"><strong>DATOS DEL CONTRATISTA</strong></p>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <div class="col-8" style="border-right: 1px solid black;">
                    <p class="q-my-none q-pl-xs"><strong>NOMBRE Y APELLIDO</strong></p>
                </div>

                <div class="col-4">
                    <p class="q-my-none text-center"><strong>FIRMA</strong></p>
                </div>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <div class="col-8" style="border-right: 1px solid black;">
                    <p v-text="contractorName" class="q-my-none q-pl-sm" />
                </div>

                <div class="col-4">
                    <q-img v-if="sign.contractor" fit="container" :src="sign.contractor" style="width: 140px; height: 80px;" />
                </div>
            </div>

            <div class="row justify-center" style="border-bottom: 1px solid black;">
                <p class="q-my-none"><strong>VISTO BUENO SUPERVISOR</strong></p>
            </div>

            <div class="row" style="border-bottom: 1px solid black;">
                <div class="col-4" style="border-right: 1px solid black;">
                    <p class="q-my-none q-pl-xs"><strong>CARGO DEL SUPERVISOR</strong></p>
                </div>

                <div class="col-4" style="border-right: 1px solid black;">
                    <p class="q-my-none q-pl-xs"><strong>NOMBRE Y APELLIDO SUPERVISOR</strong></p>
                </div>

                <div class="col-4">
                    <p class="q-my-none text-center"><strong>FIRMA</strong></p>
                </div>
            </div>

            <div class="row">
                <div class="col-4" style="border-right: 1px solid black;">
                    <p v-text="props.row.supervisor.position" class="q-my-none q-pl-sm" />
                </div>

                <div class="col-4" style="border-right: 1px solid black;">
                    <p v-text="props.row.supervisor.name" class="q-my-none q-pl-sm" />
                </div>

                <div class="col-4">
                    <q-img v-if="sign.supervisor" fit="container" :src="sign.supervisor" style="width: 140px; height: 80px;" />
                </div>
            </div>
        </div>

        <div class="col-12" />

        <div class="col-6 q-mb-md">
            <div class="row justify-end">
                <p class="q-my-none q-pr-xs">GTH-F-087 V.01</p>
            </div>
        </div>

        <div class="col-12" />

        <div v-if="currentUser.role.data !== 'user'" class="col-6">
            <div class="row">
                <div class="col-12">
                    <p class="q-my-none text-center" style="font-size: 18px;"><strong>Anexos</strong></p>
                </div>
            </div>

            <div v-for="(element, index) in collections" class="row q-mt-sm">
                <div class="col-12 q-mb-sm">
                    <p v-text="`${index + 1}. ${element.name}`" class="q-my-none" style="font-size: 16px;" />
                </div>

                <div v-for="(item , itemIndex) in element.items" class="col-12 justify-center flex q-pa-xs">
                    <q-img :src="item.url" fit="contain" style="width: 600px; height: 400px;" />
                </div>
            </div>
        </div>
</template>

<script setup>
    import { ref, onBeforeMount } from 'vue'

    import { date, useQuasar } from 'quasar'

    const props = defineProps({
        row: Object
    })

    const $q = useQuasar()

    onBeforeMount(() => {
        currentUser.value = $q.localStorage.getItem('user')

        createdAt.value = props.row.legalization.createdAt

        paymaster.value = props.row.paymaster

        tripOrder.value = props.row.tripOrder

        tripStart.value = props.row.tripStart

        tripEnd.value = props.row.tripEnd

        place.value = props.row.place

        institute.value = props.row.institute

        regional.value = props.row.regional

        company.value = props.row.company

        tripObjective.value = props.row.tripObjective

        collections.value = props.row.collections

        sign.value = props.row.legalization.signature

        results.value = props.row.results

        contractorName.value = props.row.contract.contractorName

        conclusions.value = props.row.conclusions

        for(let index = 0; index < props.row.activities.length; index++) {
            for(let itemIndex = 0; itemIndex < props.row.activities[index].items.length; itemIndex++) {
                mainActivities.value.push({ data: props.row.activities[index].items[itemIndex].data })
            }
        }

        activities.value = props.row.activities
    })

    const createdAt = ref('')

    const currentUser = ref({})

    const paymaster = ref(null)

    const contractorName = ref(null)

    const tripOrder = ref(null)

    const tripStart = ref('')

    const tripEnd = ref('')

    const activities = ref([])

    const mainActivities = ref([])

    const tripObjective = ref('')

    const place = ref(null)

    let mainIndex = 1

    function getNumber(index) {
        return mainIndex++
    }

    let mainIndexOther = 1

    function getNumberOther(index) {
        return mainIndexOther++
    }

    const institute = ref(null)

    const regional = ref(null)

    const company = ref(null)

    const collections = ref([])

    const results = ref([])

    const conclusions = ref([])

    const sign = ref({
        contractor: null,
        supervisor: null
    })

    console.log(props.row)
</script>