<template>
    <q-page class="q-pa-md">
        <div class="text-h4 text-center q-mb-md">Usuarios</div>
        <div class="row justify-center  q-pt-md">

            <!-- tabla -->
            <div class="col-8 q-mt-md" style="width: 90%;">
                <q-table :loading="cargando" class="my-sticky-header-table" :filter="filter" :columns="columns"
                    :rows="rows">

                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                                style="margin-right: 10px; cursor: pointer" @click="abrirEditar(props.row)">
                                <q-tooltip>
                                    Editar Usuario
                                </q-tooltip>
                            </q-icon>
                            <q-icon color="green" name="fa-solid fa-check fa-xl" size="20px"
                                style="margin-left: 10px; cursor: pointer" v-if="props.row.status == 0"
                                @click="editarEstado(props.row)">
                                <q-tooltip>
                                    Activar Usuario
                                </q-tooltip>
                            </q-icon>

                            <q-icon color="red" name="fa-solid fa-x" size="20px" style="margin-left: 10px; cursor: pointer"
                                v-else @click="editarEstado(props.row)">
                                <q-tooltip>
                                    Desactivar Usuario
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

                    <template v-slot:top-left>
                        <q-btn @click="showDialog = true; nuevo()" icon="add" color="primary" label="Crear" />
                    </template>

                    <template v-slot:body-cell-estado="props">
                        <q-td :props="props">
                            <span class="text-green" v-if="props.row.status === 1">Activo</span>
                            <span class="text-red" v-else>Inactivo</span>
                        </q-td>
                    </template>
                </q-table>
            </div>

            <!-- dialog -->
            <q-dialog v-model="showDialog">
                <q-card style="width: 700px;">
                    <q-card-section class="justify-start flex bg-primary">
                        <div class="text-h6" style="color: white;">
                            {{ bd === 0 ? "Editar Usuario" : "Agregar Usuario" }}
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <div class="row">
                            <div class="col-12 q-pa-sm">
                                <q-select filled stack-label label="Rol" v-model="role" :options="optionsRole"
                                    @update:model-value="async (val) => {
                                        staffType = null
                                    }" />
                            </div>

                            <div v-if="role !== null && role.index == 3" class="col-12 q-pa-sm">
                                <q-select v-model="staffType" :options="staffOptions" filled stack-label
                                    label="Tipo Usuario" />
                            </div>

                            <div class="col-12 q-pa-sm">
                                <q-input filled stack-label v-model="name" label="Nombre" />
                            </div>

                            <div class="col-12 q-pa-sm">
                                <q-input filled stack-label v-model="mail" label="Correo Electrónico" />
                            </div>

                            <div class="col-12 q-pa-sm">
                                <q-input filled stack-label v-model="identification" type="number"
                                    label="No. de documento" />
                            </div>

                            <div v-if="bd === 1" class="col-12 q-pa-sm">
                                <q-input filled stack-label v-model="password" label="Contraseña"
                                    :type="showPassword ? 'text' : 'password'">
                                    <template v-slot:append>
                                        <q-icon :name="showPassword ? 'visibility' : 'visibility_off'"
                                            class="cursor-pointer" @click="showPassword = !showPassword" />
                                    </template>
                                </q-input>
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0 && role.index == 3"
                                class="col-12 q-pa-sm">
                                <q-select v-model="regional" :options="regionalOptions" use-chips filled stack-label
                                    label="Regional" @update:model-value="async function (value) {
                                        await getInstitute(value)
                                    }" />
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0 && role.index == 3"
                                class="col-12 q-pa-sm">
                                <q-select v-model="institute" :options="instituteOptions" use-chips filled stack-label
                                    label="Centro" />
                            </div>

                            <div v-if="role !== null && role.index !== 3 && role.index !== 1 || staffType !== null && staffType.index == 1 && role.index == 3"
                                class="col-12 q-pa-sm">
                                <q-input filled stack-label v-model="position" label="Cargo" />
                            </div>

                            <div v-if="role !== null && role.index == 0 || (staffType !== null && staffType.index == 1 && role.index == 3)"
                                class="col-12 q-pa-sm">
                                <q-input v-model="branch" filled stack-label label="Dependencia" />
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0 && role.index == 3"
                                class="col-12 q-pa-sm">
                                <q-input v-model="contractNumber" filled stack-label type="number"
                                    label="Número Contrato" />
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0 && role.index == 3"
                                class="col-12 q-pa-sm">
                                <q-input v-model="contractDate.start" filled stack-label label="Fecha Inicio Contrato"
                                    type="date" />
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0 && role.index == 3"
                                class="col-12 q-pa-sm">
                                <q-input v-model="contractDate.end" filled stack-label label="Fecha Fin Contrato"
                                    type="date" />
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0 && role.index == 3"
                                class="col-12 q-pa-sm">
                                <q-input v-model="object" autogrow filled stack-label label="Objeto Contractual" />
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0 && role.index == 3 && supervisorOptions.length != 0"
                                class="col-12 q-pa-sm">
                                <q-select v-model="supervisor" label="Supervisor" filled stack-label :options="supervisorOptions.map((sup) => ({
                                    label: sup.label,
                                    value: sup.id
                                }))" emit-value map-options />
                            </div>

                            <div v-else-if="staffType !== null && staffType.index == 0 && role.index == 3"
                                class="col-12 q-pa-sm">
                                <q-select v-model="noSup" disable label="Supervisor" filled stack-label />
                            </div>

                            <div v-if="role !== null && role.index !== 2 && role.index !== 1 && paymasterOptions.length > 0"
                                class="col-12 q-pa-sm">
                                <q-select v-model="paymaster" label="Ordenador" filled stack-label :options="paymasterOptions.map((ord) => ({
                                    label: ord.label,
                                    value: ord.id
                                }))
                                    " emit-value map-options />
                            </div>

                            <div v-else-if="role !== null && role.index !== 2 && role.index !== 1" class="col-12 q-pa-sm">
                                <q-select v-model="noOrd" label="Ordenador" disable filled stack-label />
                            </div>
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions class="justify-around flex">
                        <q-btn @click="showDialog = false" color="negative" label="Cerrar" icon="fa-solid fa-xmark" />
                        <q-btn color="primary" :loading="loading" @click="bd === 0 ? editUser() : createUser()"
                            label="Guardar" icon="fa-solid fa-floppy-disk" />
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

import { useUserStore } from '../stores/user.js'

import { useScheduleStore } from '../stores/schedule.js'

import { showNotify } from '../components/notify.js'

import { useQuasar } from "quasar";

let cargando = ref(false)
let loading = ref(false)
const userStore = useUserStore()
let filter = ref('')
const scheduleStore = useScheduleStore()
let bd = ref("");
const showPassword = ref(false)
const noSup = ref('No hay supervisores disponibles')
const noOrd = ref('No hay ordenadores disponibles')

function recargar() {
    window.location.reload()
}

onBeforeMount(
    async () => {
        cargando.value = true

        rows.value = await getUser()

        rows.value.reverse()

        paymasterOptions.value = await getUser({ paymaster: true })

        regionalOptions.value = await getRegional()

        supervisorOptions.value = await getUser({ supervisor: true })

        cargando.value = false

    }
)

async function getInstitute(value) {
    institute.value = null

    instituteOptions.value.splice(0)

    if (value) {
        const { data } = await scheduleStore.getInstitute(value.data)

        for (let index = 0; index < data.length; index++) {
            instituteOptions.value.push({ label: data[index].name, data: data[index]._id })
        }
    }
}

async function getRegional() {
    const regional = []

    const { data } = await scheduleStore.getCounty({
        regional: true
    })

    for (let index = 0; index < data.length; index++) {
        regional.push({ label: data[index].name, data: data[index]._id })
    }

    return regional
}

async function getUser(query = {}) {
    const { data } = await userStore.getUser(query);

    // Verificar si el query especifica un rol
    if (query.paymaster || query.supervisor) {
        const user = [];

        for (let index = 0; index < data.length; index++) {
            // Filtrar según el rol especificado en el query
            if (data[index].status === 1) {
                if (query.paymaster && data[index].role.data === 'paymaster') {
                    user.push({ label: data[index].name, id: data[index]._id });
                }
                if (query.supervisor && data[index].role.data === 'supervisor') {
                    user.push({ label: data[index].name, id: data[index]._id });
                }
            }
        }
        return user;
    }
    return data;
}

async function cleanDialog() {
    id.value = ''
    name.value = ''
    mail.value = ''
    identification.value = ''
    password.value = ''
    role.value = ''
    editOptionRole.value = []

    branch.value = ''
    contractNumber.value = ''
    contractDate.value = {
        start: '',
        end: ''
    }

    staffType.value = ''
    supervisor.value = ''

    institute.value = ''
    regional.value = ''

    object.value = ''

    position.value = ''
    paymaster.value = ''

    rows.value = await getUser()

    rows.value.reverse()

    supervisorOptions.value.splice(0)

    supervisorOptions.value = await getUser({ supervisor: true })

    paymasterOptions.value.splice(0)

    paymasterOptions.value = await getUser({ paymaster: true })
}


function nuevo() {
    bd.value = 1;
    cleanDialog()
}

async function createUser() {
    loading.value = true

    const emailValido = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (!role.value) {
        showNotify('Asigne un rol', 'negative')
    } else if (role.value.index === 3 && !staffType.value) {
        showNotify('Seleccione el tipo de usuario', 'negative')
    } else if (!name.value.trim()) {
        showNotify('Digite el Nombre', 'negative')
    } else if (!mail.value.trim()) {
        showNotify('Digite el correo', 'negative')
    } else if (!emailValido.test(mail.value.trim())) {
        showNotify('El correo no es válido', 'negative')
    } else if (!identification.value) {
        showNotify('Digite la cédula/identificación', 'negative')
    } else if (!password.value.trim()) {
        showNotify('Digite la contraseña', 'negative')
    } else if ((role.value.data === 'paymaster' && !position.value.trim())
        || (role.value.data === 'supervisor' && !position.value.trim())
        || (role.value.index === 3 && staffType.value?.data === 'publicWorker' && !position.value.trim())) {
        showNotify('Digite el cargo', 'negative')
    } else if ((role.value.data === 'supervisor' && !branch.value.trim()) ||
        (role.value.index === 3 && staffType.value?.data === 'publicWorker' && !branch.value.trim())) {
        showNotify('Digite la dependencia', 'negative')
    } else if ((role.value.data === 'supervisor' || staffType.value?.data === 'publicWorker' || staffType.value?.data === 'contractor') && !paymaster.value) {
        showNotify('Seleccione un ordenador del gasto', 'negative')
    } else if ((staffType.value?.data === 'contractor') && !supervisor.value) {
        showNotify('Seleccione un supervisor', 'negative')
    } else if (role.value.index === 3 && staffType.value?.data === 'contractor' && !regional.value) {
        showNotify('Seleccione la regional', 'negative')
    } else if (staffType.value?.data === 'contractor' && !institute.value) {
        showNotify('Seleccione el centro de formación', 'negative')
    } else if (staffType.value?.data === 'contractor' && !contractNumber.value) {
        showNotify('Digite el número de contrato', 'negative')
    } else if (staffType.value?.data === 'contractor' && !contractDate.value.start) {
        showNotify('Seleccione la fecha de inicio', 'negative')
    } else if (staffType.value?.data === 'contractor' && !contractDate.value.end) {
        showNotify('Seleccione la fecha de fin', 'negative')
    } else if (staffType.value?.data === 'contractor' && contractDate.value.end < contractDate.value.start) {
        showNotify('La fecha de fin de contrato debe ser mayor a la fecha de inicio', 'negative')
    } else if (staffType.value?.data === 'contractor' && contractDate.value.start > contractDate.value.end) {
        showNotify('La fecha de inicio de contrato debe ser menor a la fecha de fin', 'negative')
    } else if (staffType.value?.data === 'contractor' && !object.value.trim()) {
        showNotify('Digite el objeto', 'negative')
    } else {
        const body = {
            role: role.value,
            name: name.value,
            mail: mail.value,
            identification: identification.value,
            password: password.value,
            position: position.value,
            branch: branch.value,
            staffType: staffType.value
        }

        if (role.value !== null) {
            if (role.value.index !== 2 && role.value.index !== 1) {
                body.paymaster = paymaster.value
            }

            if (role.value.index == 3 && staffType.value !== null && staffType.value.index == 0) {
                body.contract = {
                    number: contractNumber.value,
                    date: contractDate.value
                }
                body.object = object.value
                body.institute = institute.value !== null ? institute.value.data : null,
                    body.regional = regional.value !== null ? regional.value.data : null,
                    body.supervisor = supervisor.value
                body.paymaster = paymaster.value
            }

            const { data, status } = await userStore.postUser(body)

            if (status !== 200) {
                showNotify(data.msg, 'negative')
            } else {
                showNotify(data.msg, 'positive', 'check_circle')

                rows.value = await getUser()

                rows.value.reverse()

                paymasterOptions.value = await getUser({ paymaster: true })

                regionalOptions.value = await getRegional()

                supervisorOptions.value = await getUser({ supervisor: true })

                showDialog.value = false
            }
        }

    }
    loading.value = false
}

const $q = useQuasar()

async function editarEstado(x) {
    try {
        if (x.status === 1) {
            x.status = 0;
        } else {
            x.status = 1;
        }
        await userStore.cambiarEstado(x._id, x.status);
        $q.notify({
            message: "Estado editado exitosamente",
            color: "positive",
            type: 'positive',
            position: "bottom",
            timeout: 3000,
        });
    } catch (error) {
        console.log(error);
    }
}

function abrirEditar(data) {
    //console.log(data)

    bd.value = 0
    id.value = data._id
    name.value = data.name
    mail.value = data.mail
    identification.value = data.identification
    role.value = optionsRole.value[data.role.index]
    position.value = data.position

    if (data.role.index === 1) {
        editOptionRole.value = [
            { label: 'Administrador', data: 'administrator', index: 1 }
        ]
    } else if (data.role.index === 0) {
        paymaster.value = data.paymaster._id
        branch.value = data.branch
        editOptionRole.value = [
            { label: 'Supervisor', data: 'supervisor', index: 0 },
            { label: 'Usuario', data: 'user', index: 3 }
        ]
    } else if (data.role.index === 2) {
        editOptionRole.value = [
            { label: 'Ordenador', data: 'paymaster', index: 2 }
        ]
    } else if (data.role.index === 3 && data.staffType.data === "publicWorker") {
        staffType.value = staffOptions.value[data.staffType.index],
            position.value = data.position
        branch.value = data.branch
        paymaster.value = data.paymaster._id
        editOptionRole.value = [
            { label: 'Ordenador', data: 'paymaster', index: 2 },
            { label: 'Usuario', data: 'user', index: 3 }
        ]
    } else if (data.role.index === 3 && data.staffType.data === "contractor") {
        staffType.value = staffOptions.value[data.staffType.index],
            regional.value = data.regional.name
        institute.value = data.institute.name
        contractNumber.value = data.contract.number
        contractDate.value.start = data.contract.date.start
        contractDate.value.end = data.contract.date.end
        object.value = data.object
        paymaster.value = data.paymaster._id
        supervisor.value = data.supervisor._id
        editOptionRole.value = [
            { label: 'Supervisor', data: 'supervisor', index: 0 },
            { label: 'Usuario', data: 'user', index: 3 }
        ]
    }
    showDialog.value = true

}

async function editUser() {
    loading.value = true

    const emailValido = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (!role.value) {
        showNotify('Asigne un rol', 'negative')
    } else if (!name.value.trim()) {
        showNotify('Digite el Nombre', 'negative')
    } else if (!mail.value.trim()) {
        showNotify('Digite el correo', 'negative')
    } else if (!emailValido.test(mail.value.trim())) {
        showNotify('El correo no es válido', 'negative')
    } else if (!identification.value) {
        showNotify('Digite la cédula/identificación', 'negative')
    } else if ((role.value.data === 'paymaster' && !position.value.trim())
        || (role.value.data === 'supervisor' && !position.value.trim())
        || (role.value.index === 3 && staffType.value.data === 'publicWorker' && !position.value.trim())) {
        showNotify('Digite el cargo', 'negative')
    } else if ((role.value.data === 'supervisor' && !branch.value.trim()) ||
        (role.value.index === 3 && staffType.value?.data === 'publicWorker' && !branch.value.trim())) {
        showNotify('Digite la dependencia', 'negative')
    } else if (role.value.index === 3 && staffType.value?.data === 'contractor' && !regional.value) {
        showNotify('Seleccione la regional', 'negative')
    } else if (role.value.index === 3 && staffType.value?.data === 'contractor' && !institute.value) {
        showNotify('Seleccione el centro de formación', 'negative')
    } else if (role.value.index === 3 && staffType.value?.data === 'contractor' && !contractNumber.value) {
        showNotify('Digite el número de contrato', 'negative')
    } else if (role.value.index === 3 && staffType.value?.data === 'contractor' && contractDate.value.end < contractDate.value.start) {
        showNotify('La fecha de fin de contrato debe ser mayor a la fecha de inicio', 'negative')
    } else if (role.value.index === 3 && staffType.value?.data === 'contractor' && contractDate.value.start > contractDate.value.end) {
        showNotify('La fecha de inicio de contrato debe ser menor a la fecha de fin', 'negative')
    } else if (role.value.index === 3 && staffType.value?.data === 'contractor' && !object.value.trim()) {
        showNotify('Digite el objeto', 'negative')
    } else {
        const body = {
            role: role.value,
            name: name.value,
            mail: mail.value,
            identification: identification.value,
            position: position.value,
            branch: branch.value,
            staffType: staffType.value
        }

        if (role.value !== null) {
            if (role.value.index !== 2 && role.value.index !== 1) {
                body.paymaster = paymaster.value
            }

            if (role.value.index === 3 && staffType.value?.data === 'contractor') {
                body.contract = {
                    number: contractNumber.value,
                    date: contractDate.value
                }
                body.object = object.value
                body.institute = institute.value !== null ? institute.value.data : null,
                    body.regional = regional.value !== null ? regional.value.data : null,
                    body.supervisor = supervisor.value
                body.paymaster = paymaster.value
            }
        }

        const { data, status } = await userStore.putUser(body, id.value)

        if (status !== 200) {
            showNotify(data.msg, 'negative')
        } else {
            showNotify(data.msg, 'positive', 'check_circle')

            rows.value = await getUser()

            rows.value.reverse()

            paymasterOptions.value = await getUser({ paymaster: true })

            regionalOptions.value = await getRegional()

            supervisorOptions.value = await getUser({ supervisor: true })

            showDialog.value = false

        }
    }
    loading.value = false
}

const columns = ref([
    {
        name: 'name',
        label: 'Usuario',
        align: 'center',
        field: 'name',
        sortable: true
    },

    {
        name: 'mail',
        label: 'Correo Electrónico',
        align: 'center',
        field: 'mail',
        sortable: true
    },

    {
        name: 'identification',
        label: 'Documento',
        align: 'center',
        field: 'identification',
        sortable: true
    },

    {
        name: 'role',
        label: 'Rol',
        align: 'center',
        field: row => row.role,
        format: (val, row) => optionsRole.value[val.index].label,
        sortable: true
    },

    {
        name: 'position',
        label: 'Cargo',
        align: 'center',
        field: row => row.position || '-',
        sortable: true
    },
    {
        name: 'estado',
        label: 'Estado',
        align: 'center',
        sortable: true
    },
    {
        name: 'opciones',
        label: 'Acciones',
        align: 'center'
    }
])

const rows = ref([])

const branch = ref(null)

// dialog
const showDialog = ref(false)

const id = ref(null)

const optionsRole = ref([
    { label: 'Supervisor', data: 'supervisor', index: 0 },
    { label: 'Administrador', data: 'administrator', index: 1 },
    { label: 'Ordenador', data: 'paymaster', index: 2 },
    { label: 'Usuario', data: 'user', index: 3 }
])

const editOptionRole = ref([])

const staffOptions = ref([
    { label: 'Contratista', data: 'contractor', index: 0 },
    { label: 'Funcionario', data: 'publicWorker', index: 1 }
])

const staffType = ref(null)

const identification = ref(null)

const name = ref(null)

const mail = ref(null)

const password = ref(null)

const role = ref(null)

const institute = ref(null)

const instituteOptions = ref([])

const regional = ref(null)

const regionalOptions = ref([])

const position = ref(null)

const contractNumber = ref(null)

const contractDate = ref({
    start: '',
    end: ''
})

const object = ref(null)

const supervisor = ref(null)

const supervisorOptions = ref([])

const paymaster = ref(null)

const paymasterOptions = ref([])


</script>