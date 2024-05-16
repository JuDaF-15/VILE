<template>
    <q-page class="q-pa-md">
        <div class="text-h4 text-center q-mb-md">Usuarios</div>
        <div class="row justify-center">

            <!-- tabla -->
            <div class="col-10">
                <q-table class="my-sticky-header-table" :filter="filter" :columns="columns" :rows="rows">
                    <template v-slot:body-cell-options="props">
                        <!-- <td :props="props" class="justify-center flex">
                            <q-btn @click="cleanDialog(); showEdit(props.row)" label="Editar" style="font-size: 12px;" />
                        </td> -->
                    </template>
                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon color="orange" name="fa-solid fa-pen-to-square fa-xl" size="20px"
                                style="margin-right: 10px; cursor: pointer" @click="editarUsuario(props.row)">
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
                        <q-btn @click="cleanDialog(); edit = false; showDialog = true" icon="add" color="primary"
                            label="Crear" />
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
                        <p v-text="edit == true ? 'Editar Usuario' : 'Crear Usuario'" class="q-my-none text-white"
                            style="font-size: 25px;" />
                    </q-card-section>
                    <q-card-section>
                        <div class="row">
                            <div class="col-12 q-pa-sm">
                                <q-select filled stack-label label="Rol" v-model="role"
                                    :options="edit == true ? editOptionRole : optionsRole" @update:model-value="async (val) => {
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
                                    label="No. Identificación" />
                            </div>

                            <div v-if="role !== null && role.index !== 3 || staffType !== null && staffType.index == 1"
                                class="col-12 q-pa-sm">
                                <q-input filled stack-label v-model="password" label="Contraseña" />
                            </div>


                            <div v-if="staffType !== null && staffType.index == 0" class="col-12 q-pa-sm">
                                <q-select v-model="regional" :options="regionalOptions" use-chips filled stack-label
                                    label="Regional" @update:model-value="async function (value) {
                                        await getInstitute(value)
                                    }" />
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0" class="col-12 q-pa-sm">
                                <q-select v-model="institute" :options="instituteOptions" filled stack-label
                                    label="Centro" />
                            </div>

                            <div v-if="role !== null && role.index !== 3 && role.index !== 1 || staffType !== null && staffType.index == 1"
                                class="col-12 q-pa-sm">
                                <q-input filled stack-label v-model="position" label="Cargo" />
                            </div>

                            <div v-if="role !== null && role.index == 0 || staffType !== null && staffType.index == 1"
                                class="col-12 q-pa-sm">
                                <q-input v-model="branch" filled stack-label label="Dependencia" />
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0" class="col-12 q-pa-sm">
                                <q-input v-model="contractNumber" filled stack-label label="Número Contrato" />
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0" class="col-12 q-pa-sm">
                                <q-input v-model="contractDate.start" filled stack-label label="Fecha Inicio Contrato"
                                    type="date" />
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0" class="col-12 q-pa-sm">
                                <q-input v-model="contractDate.end" filled stack-label label="Fecha Fin Contrato"
                                    type="date" />
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0" class="col-12 q-pa-sm">
                                <q-input v-model="object" autogrow filled stack-label label="Objeto" />
                            </div>

                            <div v-if="staffType !== null && staffType.index == 0" class="col-12 q-pa-sm">
                                <q-select v-model="supervisor" :options="supervisorOptions" filled stack-label
                                    label="Supervisor" />
                            </div>

                            <div v-if="role !== null && role.index !== 2 && role.index !== 1" class="col-12 q-pa-sm">
                                <q-select v-model="paymaster" :options="paymasterOptions" filled stack-label
                                    label="Ordenador" />
                            </div>
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions class="justify-around flex">
                        <q-btn @click="showDialog = false" color="negative" label="Cerrar" />
                        <q-btn color="primary" @click="edit == true ? editUser() : createUser()" label="Guardar" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

import { useUserStore } from '../stores/user.js'

import { useScheduleStore } from '../stores/schedule.js'

import { showNotify } from '../components/notify.js'

import { useQuasar } from "quasar";


const userStore = useUserStore()
let filter = ref('')
const scheduleStore = useScheduleStore()

onBeforeMount(
    async () => {
        rows.value = await getUser()

        paymasterOptions.value = await getUser({ paymaster: true })

        regionalOptions.value = await getRegional()

        supervisorOptions.value = await getUser({ supervisor: true })
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
    const { data } = await userStore.getUser(query)

    if (query.paymaster || query.supervisor) {
        const user = []

        for (let index = 0; index < data.length; index++) {
            user.push({ label: data[index].name, id: data[index]._id })
        }

        return user
    }

    return data
}

async function createUser() {
    if (name.value == null) {
        showNotify('Digite el Nombre', 'negative')
    } else {
        const body = {
            role: role.value,
            name: name.value,
            mail: mail.value,
            identification: identification.value,
            password: password.value,
            position: position.value,
            branch: branch.value,
            paymaster: paymaster.value !== null ? paymaster.value.id : null,
            staffType: staffType.value
        }

        if (role.value !== null) {
            if (role.value.index == 3 && staffType.value !== null && staffType.value.index == 0) {
                body.contract = {
                    number: contractNumber.value,
                    date: contractDate.value
                }
                body.object = object.value
                body.institute = institute.value !== null ? institute.value.data : null,
                    body.regional = regional.value !== null ? regional.value.data : null,
                    body.supervisor = supervisor.value !== null ? supervisor.value.id : null
            }

            const { data, status } = await userStore.postUser(body)

            if (status !== 200) {
                showNotify(data.msg, 'negative')
            } else {
                showNotify(data.msg, 'positive', '')

                rows.value = await getUser()

                showDialog.value = false
            }
        }

    }
}

async function cleanDialog() {
    id.value = null
    name.value = null
    mail.value = null
    identification.value = null
    password.value = null
    role.value = null
    editOptionRole.value = []

    branch.value = null
    contractNumber.value = null
    contractDate.value = {
        start: '',
        end: ''
    }

    staffType.value = null
    supervisor.value = null

    institute.value = null
    regional.value = null

    object.value = null

    position.value = null
    paymaster.value = null

    rows.value = await getUser()

    supervisorOptions.value.splice(0)

    supervisorOptions.value = await getUser({ supervisor: true })

    paymasterOptions.value.splice(0)

    paymasterOptions.value = await getUser({ paymaster: true })
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
            color: "green",
            icon: "check",
            position: "bottom",
            timeout: 3000,
        });
    } catch (error) {
        console.log(error);
    }
}

function showEdit(data) {
    edit.value = true

    console.log(data)

    if (data.role.index == 1) {
        editOptionRole.value = [
            { label: 'Administrador', data: 'administrator', index: 1 }
        ]
    }

    if (data.role.index == 0) {
        editOptionRole.value = [
            { label: 'Supervisor', data: 'supervisor', index: 0 },
            { label: 'Usuario', data: 'user', index: 3 }
        ]
    }

    if (data.role.index == 2) {
        editOptionRole.value = [
            { label: 'Ordenador', data: 'paymaster', index: 2 }
        ]
    }

    if (data.role.index == 3) {
        editOptionRole.value = [
            { label: 'Supervisor', data: 'supervisor', index: 0 },
            { label: 'Usuario', data: 'user', index: 3 }
        ]
    }

    id.value = data._id
    name.value = data.name
    role.value = optionsRole.value[data.role.index],
        position.value = data.position
    showDialog.value = true
}

async function editUser() {
    const { data, status } = await userStore.putUser(id.value, {
        name: name.value,
        role: role.value,
        position: role.value.index == 1 ? '' : position.value,
    })

    if (status == 200) {
        showNotify(data.msg, 'positive', '')

        cleanDialog()

        rows.value = await getUser()
    }
    edit.value = false

    showDialog.value = false
}

const columns = ref([
    {
        name: 'name',
        label: 'Usuario',
        align: 'center',
        field: 'name'
    },

    {
        name: 'mail',
        label: 'Correo Electrónico',
        align: 'center',
        field: 'mail'
    },

    {
        name: 'role',
        label: 'Rol',
        align: 'center',
        field: row => row.role,
        format: (val, row) => optionsRole.value[val.index].label
    },

    {
        name: 'position',
        label: 'Cargo',
        align: 'center',
        field: row => row.position || '-'
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

const edit = ref(false)

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