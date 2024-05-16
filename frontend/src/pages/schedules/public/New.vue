<template>
    <q-page class="q-pa-md">
        <div class="text-h4 text-center q-mb-md">Agendas</div>
        <div class="row justify-center q-pt-md">

            <div v-show="!showPreview" class="col-8 q-mt-md" style="width: 90%;">
               <!--  <q-table class="my-sticky-header-table" :filter="filter" :rows="rows" :columns="columns">
                    <template v-slot:top-right>
                        <q-input dense debounce="300" color="primary" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>

                    <template v-slot:top-left>
                        <div @click="showDialog = true" v-show="!showPreview" class="col-8 justify-end flex">
                            <q-btn label="Crear Agenda" color="primary" icon="add" />
                        </div>
                    </template>
                    <template v-slot:body="props">
                        <tr>
                            <td key="route" :props="props">
                                <div class="row">
                                    <div class="col-12">
                                        <p v-if="props.row.route.go.length !== 0"
                                            v-text="`Ida: ${props.row.route.go[0].data} - ${props.row.route.go[props.row.route.go.length - 1].data}`"
                                            class="q-my-none text-center" />
                                    </div>

                                    <div class="col-12">
                                        <p v-if="props.row.route.return.length !== 0"
                                            v-text="`Regreso: ${props.row.route.return[0].data} - ${props.row.route.return[props.row.route.return.length - 1].data}`"
                                            class="q-my-none text-center" />
                                    </div>
                                </div>
                            </td>

                            <td key="place" :props="props">
                                <p v-if="props.row.regional & props.row.regional !== null" v-text="props.row.regional"
                                    class="q-my-none text-center" />
                                <p v-else-if="props.row.places && props.row.places.length !== 0"
                                    v-text="props.row.places[0].data" class="q-my-none text-center" />
                                <p v-else class="q-my-none text-center">-</p>
                            </td>

                            <td key="company" :props="props">
                                <p v-text="props.row.institutes.length !== 0 ? props.row.institutes[0].data : '-'"
                                    class="q-my-none text-center" />
                            </td>

                            <td key="tripDate" :props="props">
                                <div class="row">
                                    <div class="col-12">
                                        <p v-text="`Ida: ${props.row.tripStart.slice(8, 10)}/${props.row.tripStart.slice(5, 7)}/${props.row.tripStart.slice(0, 4)}`"
                                            class="q-my-none text-center" />
                                    </div>

                                    <div class="col-12">
                                        <p v-text="`Regreso: ${props.row.tripEnd.slice(8, 10)}/${props.row.tripEnd.slice(5, 7)}/${props.row.tripEnd.slice(0, 4)}`"
                                            class="q-my-none text-center" />
                                    </div>
                                </div>
                            </td>

                            <td key="opciones">
                                <q-icon @click="showEdit(props.row)" name="fa-solid fa-eye" size="20px" color="blue">
                                    <q-tooltip>Ver</q-tooltip>
                                </q-icon>
                            </td>
                        </tr>
                    </template>
                </q-table> -->

                <!-- TABLA MIA -->
                <q-table :loading="cargando" class="my-sticky-header-table" :rows="rows" :columns="columns" row-key="name" :filter="filter">
                    <template v-slot:top-left>
                        <div @click="showDialog = true" v-show="!showPreview" class="col-8 justify-end flex">
                            <q-btn label="Crear Agenda" color="primary" icon="add" />
                        </div>
                    </template>

                    <template v-slot:top-right>
                        <q-input dense debounce="300" color="primary" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>

                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon @click="showEdit(props.row)" name="fa-solid fa-eye" size="20px" color="blue">
                                <q-tooltip>
                                    Ver
                                </q-tooltip>
                            </q-icon>
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
                            <p v-if="props.row.regional & props.row.regional !== null" v-text="props.row.regional"
                                class="q-my-none text-center" />
                            <p v-else-if="props.row.places && props.row.places.length !== 0"
                                v-text="props.row.places[0].data" class="q-my-none text-center" />
                            <p v-else class="q-my-none text-center">-</p>
                        </q-td>
                    </template>

                    <template v-slot:body-cell-tripDate="props">
                        <q-td :props="props">
                            <div class="row">
                                <div class="col-12">
                                    <p v-text="`Ida: ${props.row.tripStart.slice(8, 10)}/${props.row.tripStart.slice(5, 7)}/${props.row.tripStart.slice(0, 4)}`"
                                        class="q-my-none text-center" />
                                </div>

                                <div class="col-12">
                                    <p v-text="`Regreso: ${props.row.tripEnd.slice(8, 10)}/${props.row.tripEnd.slice(5, 7)}/${props.row.tripEnd.slice(0, 4)}`"
                                        class="q-my-none text-center" />
                                </div>
                            </div>
                        </q-td>

                    </template>

                    <template v-slot:body-cell-company="props">
                        <q-td key="company" :props="props">
                            <p v-text="props.row.institutes.length !== 0 ? props.row.institutes[0].data : '-'"
                                class="q-my-none text-center" />
                        </q-td>
                    </template>
                </q-table>
            </div>

            <div v-show="showPreview" class="col-8 justify-end  flex q-mb-md">
                <q-btn @click="showPreview = false; showDialog = true" label="Continuar Creación"
                    class="bg-green text-white" />
            </div>

            <Preview v-if="showPreview" :row="row" />

            <q-dialog v-model="showDialog" persistent>
                <q-card style="width: 700px;">
                    <q-card-section class="bg-primary text-white justify-between flex z-top"
                        style="position: sticky; top: 0;">
                        <p v-text="labelDialog" class="q-my-none text-white" style="font-size: 25px;" />
                        <q-btn @click="getPreview()" label="Vista Previa" class="bg-white text-primary" />
                    </q-card-section>

                    <q-space />

                    <q-card-section v-if="status !== null && status.index == 0">
                        <div class="row justify-center">
                            <div class="col-10">
                                <q-banner rounded class="bg-red">
                                    <template v-slot:default>
                                        <div class="row">
                                            <div class="col-12">
                                                <p class="q-my-none text-white items-center flex"
                                                    style="font-size: 18px;"><q-icon name="error_outline" size="24px"
                                                        class="text-white" />Agenda Rechazada</p>
                                            </div>

                                            <div class="col-12">
                                                <p v-text="status.justification || '-'"
                                                    class="q-my-none text-white q-pa-sm" />
                                            </div>
                                        </div>
                                    </template>
                                </q-banner>
                            </div>
                        </div>
                    </q-card-section>

                    <q-space />

                    <q-card-section>
                        <div class="row justify-center">
                            <div class="col-12">
                                <p class="q-my-none text-primary" style="font-size: 18px;">Información Desplazamiento
                                </p>
                            </div>

                            <div class="col-10 q-mt-sm">
                                <div class="row" style="background-color: whitesmoke;">
                                    <div class="col-12">
                                        <p class="q-my-none q-pl-sm q-pt-sm" style="font-size: 12px; color: grey;">Ruta
                                            de Ida</p>
                                    </div>

                                    <div class="col-12">
                                        <div class="row q-px-sm">
                                            <div class="col-auto" v-for="(element, index) in goRoute">
                                                <q-chip @remove="goRoute.splice(index, 1)" :label="element.data"
                                                    removable>
                                                    <q-popup-edit v-model="element.data" v-slot="scope" buttons>
                                                        <q-input v-model="scope.value" filled />
                                                    </q-popup-edit>

                                                    <q-tooltip v-if="element.data.length > 56" v-text="element.data"
                                                        class="text-center" style="width: 500px;" />
                                                </q-chip>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 q-pr-sm q-pb-sm justify-end flex">
                                        <q-btn @click="savegoOption = true" label="+" class="bg-primary text-white" />
                                    </div>

                                    <div class="col-12" style="background-color: white;">
                                        <q-menu fit max-width="200px" v-model="savegoOption">
                                            <div class="row">
                                                <div class="col-12 q-pa-sm">
                                                    <q-input filled clearable stack-label
                                                        :disable="goCounty !== null || goCity !== null"
                                                        v-model.trim="goOther" label="Otro" />
                                                </div>

                                                <div class="col-12 q-pa-sm q-pt-md">
                                                    <q-select filled stack-label use-chips use-input
                                                        :disable="goOther !== null && goOther.length !== 0"
                                                        v-model="goCounty" :options="gocountyOptions"
                                                        label="Departamento"
                                                        @filter="function (val, update) { update(() => { gocountyOptions = mainCounty.filter(element => element.label.toLowerCase().indexOf(val.toLowerCase()) > -1) }) }"
                                                        @update:model-value="async (value) => {
                if (value) {
                    maingoCity = await getCity([value]); gocityOptions = await getCity([value]); goCity = null; loadingCity = false;
                } else {
                    goCity = null
                    maingoCity.splice(0)
                    gocityOptions.splice(0)
                }
            }" />
                                                </div>

                                                <div class="col-12 q-pa-sm">
                                                    <q-select filled stack-label use-input
                                                        :disable="goOther !== null && goOther.length !== 0"
                                                        v-model="goCity" :options="gocityOptions" label="Municipio"
                                                        @filter="function (val, update) { update(() => { gocityOptions = maingoCity.filter(element => element.label.toLowerCase().indexOf(val.toLowerCase()) > -1) }) }" />
                                                </div>
                                            </div>
                                            <div class="row justify-end q-pt-sm q-pb-md q-pr-sm">
                                                <q-btn @click="() => {
                if (goOther !== null && goOther.length !== 0) {
                    goRoute.push({ data: goOther, id: null })
                } else if (goCity !== null) {
                    goRoute.push({ data: goCity.label, id: goCity.data })
                }
                goOther = null

                goCounty = null

                gocityOptions.splice(0)
                maingoCity.splice(0)

                goCity = null

                savegoOption = false
            }" label="AGREGAR" class="bg-primary text-white" />
                                            </div>
                                        </q-menu>
                                    </div>
                                </div>
                            </div>

                            <div class="col-10 q-mt-sm">
                                <div class="row" style="background-color: whitesmoke;">
                                    <div class="col-12">
                                        <p class="q-my-none q-pl-sm q-pt-sm" style="font-size: 12px; color: grey;">
                                            Medios de
                                            Transporte de Ida</p>
                                    </div>
                                    <div class="col-12">
                                        <div class="row q-px-sm">
                                            <div class="col-auto" v-for="(element, index) in goMeanstransport">
                                                <q-chip removable :label="element.data"
                                                    @remove="goMeanstransport.splice(index, 1)" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 q-pr-sm q-pb-sm justify-end flex">
                                        <q-btn @click="savegoMeanstransport = true; temporarygoMeanstransport = null;"
                                            label="+" class="bg-primary text-white" />
                                    </div>

                                    <div class="col-12" style="background-color: white;">
                                        <q-menu fit v-model="savegoMeanstransport">
                                            <div class="row">
                                                <div class="col-12 q-pa-sm">
                                                    <q-select filled stack-label v-model="temporarygoMeanstransport"
                                                        :options="meanstransportOptions" label="Medio de Tranporte" />
                                                </div>
                                            </div>

                                            <div class="row justify-end q-pt-sm q-pb-md q-pr-sm">
                                                <q-btn @click="() => {
                if (temporarygoMeanstransport !== null) {
                    goMeanstransport.push({ data: temporarygoMeanstransport.label })

                    temporarygoMeanstransport = null
                }

                savegoMeanstransport = false
            }" label="AGREGAR" class="bg-primary text-white" />
                                            </div>
                                        </q-menu>
                                    </div>
                                </div>
                            </div>

                            <div class="col-10 q-mt-md">
                                <div class="row" style="background-color: whitesmoke;">
                                    <div class="col-12">
                                        <p class="q-my-none q-pl-sm q-pt-sm" style="font-size: 12px; color: grey;">Ruta
                                            de Regreso
                                        </p>
                                    </div>

                                    <div class="col-12">
                                        <div class="row q-px-sm">
                                            <div class="col-auto" v-for="(element, index) in returnRoute">
                                                <q-chip removable :label="element.data"
                                                    @remove="returnRoute.splice(index, 1)" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 q-pr-sm q-pb-sm justify-end flex">
                                        <q-btn @click="savereturnOption = true" label="+"
                                            class="bg-primary text-white" />
                                    </div>

                                    <div class="col-12" style="background-color: white;">
                                        <q-menu fit max-width="200px" v-model="savereturnOption">
                                            <div class="row">
                                                <div class="col-12 q-pa-sm">
                                                    <q-input filled clearable stack-label
                                                        :disable="returnCounty !== null || returnCity !== null"
                                                        v-model.trim="returnOther" label="Otro" />
                                                </div>

                                                <div class="col-12 q-pa-sm q-pt-md">
                                                    <q-select filled stack-label use-chips use-input
                                                        :disable="returnOther !== null && returnOther.length !== 0"
                                                        v-model="returnCounty" :options="returncountyOptions"
                                                        label="Departamento"
                                                        @filter="function (val, update) { update(() => { returncountyOptions = mainCounty.filter(element => element.label.toLowerCase().indexOf(val.toLowerCase()) > -1) }) }"
                                                        @update:model-value="async (value) => {
                if (value) {
                    mainreturnCity = await getCity([value]); returncityOptions = await getCity([value]); returnCity = null; loadingCity = false
                } else {
                    returnCity = null

                    mainreturnCity.splice(0)
                    returncityOptions.splice(0)
                }
            }" />
                                                </div>
                                                <div class="col-12 q-pa-sm">
                                                    <q-select filled stack-label use-input
                                                        :disable="returnOther !== null && returnOther.length !== 0"
                                                        :loading="loadingCity" v-model="returnCity"
                                                        :options="returncityOptions" label="Municipio"
                                                        @filter="function (val, update) { update(() => { returncityOptions = mainreturnCity.filter(element => element.label.toLowerCase().indexOf(val.toLowerCase()) > -1) }) }" />
                                                </div>
                                            </div>
                                            <div class="row justify-end q-pt-sm q-pb-md q-pr-sm">
                                                <q-btn @click="() => {
                if (returnOther !== null && returnOther.length !== 0) {
                    returnRoute.push({ data: returnOther, id: null })
                } else if (returnCity !== null) {
                    returnRoute.push({ data: returnCity.label, id: returnCity.data })
                }
                returnOther = null

                returnCounty = null

                mainreturnCity.splice(0)
                returncityOptions.splice(0)

                returnCity = null

                savereturnOption = false
            }" label="AGREGAR" class="bg-primary text-white" />
                                            </div>
                                        </q-menu>
                                    </div>
                                </div>
                            </div>

                            <div class="col-10 q-mt-sm">
                                <div class="row" style="background-color: whitesmoke;">
                                    <div class="col-12">
                                        <p class="q-my-none q-pl-sm q-pt-sm" style="font-size: 12px; color: grey;">
                                            Medios de
                                            Transporte de Regreso</p>
                                    </div>
                                    <div class="col-12">
                                        <div class="row q-px-sm">
                                            <div class="col-auto" v-for="(element, index) in returnMeanstransport">
                                                <q-chip removable :label="element.data"
                                                    @remove="returnMeanstransport.splice(index, 1)" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 q-pr-sm q-pb-sm justify-end flex">
                                        <q-btn
                                            @click="savereturnMeanstransport = true; temporaryreturnMeanstransport = null;"
                                            label="+" class="bg-primary text-white" />
                                    </div>

                                    <div class="col-12" style="background-color: white;">
                                        <q-menu fit v-model="savereturnMeanstransport">
                                            <div class="row">
                                                <div class="col-12 q-pa-sm">
                                                    <q-select filled stack-label v-model="temporaryreturnMeanstransport"
                                                        :options="meanstransportOptions" label="Medio de Tranporte" />
                                                </div>
                                            </div>
                                            <div class="row justify-end q-pt-sm q-pb-md q-pr-sm">
                                                <q-btn @click="() => {
                if (temporaryreturnMeanstransport !== null) {
                    returnMeanstransport.push({ data: temporaryreturnMeanstransport.label })

                    temporaryreturnMeanstransport = null
                }

                savereturnMeanstransport = false
            }" label="AGREGAR" class="bg-primary text-white" />
                                            </div>
                                        </q-menu>
                                    </div>
                                </div>
                            </div>

                            <div class="col-10 q-mt-md">
                                <div class="row" style="background-color: whitesmoke;">
                                    <div class="col-12">
                                        <p class="q-my-none q-pl-sm q-pt-sm" style="font-size: 12px; color: grey;">
                                            Ciudad o
                                            Municipio</p>
                                    </div>

                                    <div class="col-12">
                                        <div class="row q-px-sm">
                                            <div class="col-auto" v-for="(element, index) in place">
                                                <q-chip removable @remove="place.splice(index, 1)">
                                                    {{ element.data }}
                                                    <q-popup-edit v-model="element.data" v-slot="scope" buttons>
                                                        <q-input v-model="scope.value" filled />
                                                    </q-popup-edit>
                                                </q-chip>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 q-pr-sm q-pb-sm justify-end flex">
                                        <q-btn label="+" class="bg-primary text-white"
                                            @click="saveplaceOption = true" />
                                    </div>

                                    <div class="col-12" style="background-color: white;">
                                        <q-menu fit max-width="200px" v-model="saveplaceOption">
                                            <div class="row">
                                                <div class="col-12 q-pa-sm">
                                                    <q-input filled stack-label clearable
                                                        :disable="placeCounty !== null || placeCity !== null"
                                                        v-model.trim="otherPlace" label="Otro" />
                                                </div>

                                                <div class="col-12 q-pa-sm q-pt-md">
                                                    <q-select filled stack-label use-chips use-input
                                                        :disable="otherPlace !== null && otherPlace.length !== 0"
                                                        v-model="placeCounty" :options="placecountyOptions"
                                                        label="Departamento"
                                                        @filter="function (val, update) { update(() => { placecountyOptions = mainCounty.filter(element => element.label.toLowerCase().indexOf(val.toLowerCase()) > -1) }) }"
                                                        @update:model-value="async (value) => {
                if (value) {
                    mainplaceCity = await getCity([value]); placecityOptions = await getCity([value]); placeCity = null; loadingCity = false
                } else {
                    placeCity = null
                    mainplaceCity.splice(0)
                    placecityOptions.splice(0)
                }
            }" />
                                                </div>
                                                <div class="col-12 q-pa-sm">
                                                    <q-select filled stack-label use-input
                                                        :disable="otherPlace !== null && otherPlace.length !== 0"
                                                        :loading="loadingCity" v-model="placeCity"
                                                        :options="placecityOptions" label="Municipio"
                                                        @filter="function (val, update) { update(() => { placecityOptions = mainplaceCity.filter(element => element.label.toLowerCase().indexOf(val.toLowerCase()) > -1) }) }" />
                                                </div>
                                            </div>
                                            <div class="row justify-end q-pt-sm q-pb-md q-pr-sm">
                                                <q-btn @click="() => {
                if (otherPlace !== null && otherPlace.length !== 0) {
                    place.push({ data: otherPlace, id: null })
                } else if (placeCity !== null) {
                    place.push({ data: placeCity.label, id: placeCity.data })
                }

                otherPlace = null
                placeCounty = null
                placeCity = null

                mainplaceCity.splice(0)
                placecityOptions.splice(0)

                saveplaceOption = false
            }" label="AGREGAR" class="bg-primary text-white" />
                                            </div>
                                        </q-menu>
                                    </div>
                                </div>
                            </div>

                            <div class="col-10 q-mt-md">
                                <q-select filled stack-label use-chips use-input v-model="regional"
                                    :options="regionalOptions" label="Dirección General / Regional" @filter="function (val, update, abort) {
                update(() => {
                    const needle = val.toLowerCase()

                    regionalOptions = mainRegional.filter(element => element.label.toLowerCase().indexOf(needle) > -1)
                })
            }" />
                            </div>


                            <div class="col-10 q-mt-md">
                                <div class="row" style="background-color: whitesmoke;">
                                    <div class="col-6">
                                        <p class="q-my-none q-ml-sm q-mt-sm" style="font-size: 12px; color: grey;">
                                            Dependencia /
                                            Centro de Formación / Sede / Institución a Visitar</p>
                                    </div>

                                    <div class="col-12" />

                                    <div class="col-12">
                                        <div class="row q-px-sm">
                                            <div class="col-auto" v-for="(element, index) in mainInstitute">
                                                <q-chip @remove="mainInstitute.splice(index, 1)" removable
                                                    :label="element.data" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 q-pr-sm q-pb-sm justify-end flex">
                                        <q-btn @click="saveinstituteOption = true" label="+"
                                            class="bg-primary text-white" />
                                    </div>

                                    <div class="col-12" style="background-color: white;">
                                        <q-menu v-model="saveinstituteOption" fit max-width="200px">
                                            <div class="row">
                                                <div class="col-12 q-pa-sm">
                                                    <q-input v-model.trim="otherInstitute"
                                                        :disable="otherRegional !== null || institute !== null" filled
                                                        clearable stack-label label="Otro" />
                                                </div>

                                                <div class="col-12 q-px-sm q-mt-sm">
                                                    <q-select v-model="otherRegional"
                                                        :disable="otherInstitute !== null && otherInstitute.length !== 0"
                                                        filled use-input use-chips stack-label
                                                        label="Dirección General / Regional"
                                                        :options="otherregionalOptions"
                                                        @filter="function (val, update, abort) { update(() => { otherregionalOptions = mainRegional.filter(element => element.label.toLowerCase().indexOf(val.toLowerCase()) > -1) }) }"
                                                        @update:model-value="async function (value) {
                if (value) {
                    await getInstitute(value)
                } else {
                    institute = null
                    instituteOptions.splice(0)
                }
            }" />
                                                </div>

                                                <div class="col-12 q-pa-sm">
                                                    <q-select v-model="institute" :options="instituteOptions"
                                                        :disable="otherInstitute !== null && otherInstitute.length !== 0"
                                                        filled use-chips stack-label label="Dependencia / Centro" />
                                                </div>
                                            </div>
                                            <div class="row justify-end q-pr-sm q-my-sm">
                                                <q-btn @click="function () {
                if (otherInstitute !== null && otherInstitute.length !== 0) {
                    mainInstitute.push({ data: otherInstitute, id: null })
                } else if (institute !== null) {
                    mainInstitute.push({ data: institute.label, id: institute.data })
                }

                otherInstitute = null

                otherRegional = null

                institute = null

                instituteOptions.splice(0)

                saveinstituteOption = false
            }" label="Agregar" class="bg-primary text-white" />
                                            </div>
                                        </q-menu>
                                    </div>
                                </div>
                            </div>

                            <div class="col-10 q-mt-md">
                                <q-input v-model="dateStart" filled label="Fecha Inicio" type="date" />
                            </div>

                            <div class="col-10 q-mt-sm">
                                <q-input v-model="dateEnd" filled label="Fecha Fin" type="date" />
                            </div>

                            <div class="col-10 q-mt-sm">
                                <q-input v-model="object" autogrow filled stack-label label="Objeto" />
                            </div>
                        </div>

                        <div class="row  justify-center q-mt-md">
                            <div class="col-12">
                                <p class="q-my-none text-primary" style="font-size: 18px">Actividades</p>
                            </div>

                            <div class="col-10" v-for="(element, index) in getActivities">
                                <p class="q-my-none q-pl-sm q-mt-xs"><strong v-text="`Día ${index + 1}: `"></strong>{{
                `${element.date.slice(8, 10)}/${element.date.slice(5, 7)}/${element.date.slice(0,
                    4)}` }}</p>

                                <template v-for="(item, itemIndex) in element.items">
                                    <div class="row q-my-sm">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-10">
                                                    <div v-if="index == 0 && itemIndex == 0 || index == getActivities.length - 1 && itemIndex == element.items.length - 1"
                                                        class="row q-mt-md"
                                                        style="height: 56px; background-color: whitesmoke;">
                                                        <div class="col-12" style="height: 26px">
                                                            <p v-text="'Actividad'" class="q-my-none q-pl-sm q-pt-sm"
                                                                style="font-size: 12px; color: grey;" />
                                                        </div>

                                                        <div class="col-12">
                                                            <p v-if="index == 0 && itemIndex == 0 && item.data.length !== 0"
                                                                v-text="`Desplazamiento Ruta de Ida: ${item.data}`"
                                                                class="q-my-none q-pl-sm" />
                                                            <p v-else-if="index == getActivities.length - 1 && itemIndex == element.items.length - 1 && item.data.length !== 0"
                                                                v-text="`Desplazamiento Ruta de Regreso: ${item.data}`"
                                                                class="q-my-none q-pl-sm" />
                                                        </div>
                                                    </div>
                                                    <div v-else class="row">
                                                        <div class="col-12 q-pa-sm">
                                                            <q-input v-model="item.data" autogrow filled stack-label
                                                                label="Actividad" />
                                                        </div>
                                                        <div class="col-12 q-px-sm">
                                                            <q-input v-model="item.time" filled label="Hora"
                                                                type="time" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div v-if="index == 0 && itemIndex == 0 || index == getActivities.length - 1 && itemIndex == element.items.length - 1 || index !== getActivities.length - 1 && itemIndex == 0"
                                                    class="col-2"></div>

                                                <div v-else class="col-2 items-center flex">
                                                    <q-btn @click="element.items.splice(itemIndex, 1)" dense
                                                        label="Eliminar" class="bg-red text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>

                                <div class="col-12 justify-end flex">
                                    <q-btn
                                        @click="index == getActivities.length - 1 ? element.items.splice(element.items.length - 1, 0, { data: '', time: '' }) : element.items.push({ data: '', time: '' })"
                                        :disable="index == 0 && element.items[0].data.length == 0" label="+" size="md"
                                        class="bg-primary text-white" />
                                </div>
                            </div>
                        </div>

                        <div class="row justify-center">
                            <div class="col-12">
                                <p class="q-my-none text-primary" style="font-size: 18px;">Firma</p>
                            </div>

                            <div class="col-10">
                                <div class="row" style="background-color: whitesmoke;">
                                    <div class="col-12">
                                        <p class="q-my-none q-pl-sm q-pt-sm" style="font-size: 12px; color: grey;">Firma
                                            Funcionario:</p>
                                    </div>

                                    <div class="col-12">
                                        <q-img :src="sign.publicWorker" style="width: 140px; height: 80px;" />
                                    </div>

                                    <div class="col-12 justify-end flex q-pb-sm q-pr-sm">
                                        <q-btn :disable="sign.publicWorker !== null" @click="getSign()" label="Firmar"
                                            class="bg-primary text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions class="justify-around">
                        <q-btn @click="async function () {
                await cleanDialog()

                showDialog = false
            }" class="bg-red text-white" label="Cerrar" />
                        <q-btn @click="id !== null ? updateSchedule() : createSchedule()" :loading="loading"
                            :disable="loading" class="bg-primary text-white" label="Guardar" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </q-page>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'

import { date, useQuasar } from 'quasar'

import { useScheduleStore } from '../../../stores/schedule.js'

import { useUserStore } from '../../../stores/user.js'

import { showNotify } from '../../../components/notify.js'

import Preview from './Preview.vue'

const scheduleStore = useScheduleStore()

const userStore = useUserStore()

const $q = useQuasar()

let cargando = ref(false)

onBeforeMount(async function () {
    gocountyOptions.value = await getCounty()
    mainCounty.value = await getCounty()

    returncountyOptions.value = await getCounty()

    placecountyOptions.value = await getCounty()

    regionalOptions.value = await getCounty({ regional: true })
    mainRegional.value = await getCounty({ regional: true })

    otherregionalOptions.value = await getCounty({ regional: true })

    const user = $q.localStorage.getItem('user')

    const { data } = await userStore.getUserParams(user.id)

    currentUser.value = data

    console.log(data)

    cargando.value = true
    if (user.role.data == 'user') {
        currentUser.value.role = 'user'

        rows.value = await getSchedule(currentUser.value._id)
    }

    if (user.role.data == 'supervisor') {
        currentUser.value.role = 'supervisor'

        console.log(data)

        rows.value = await getSchedule(user.id, { supervisor: true })
    }
    cargando.value = false
})

async function getSign() {
    if (currentUser.value.sign) {
        sign.value.publicWorker = currentUser.value.sign.url

        showNotify('Agenda firmada', 'positive', '')
    } else {
        showNotify('Error, Firma no encontrada', 'negative')
    }
}

async function getCounty(query = {}) {
    const { data } = await scheduleStore.getCounty(query)

    const county = []

    for (let index = 0; index < data.length; index++) {
        county.push({ data: data[index]._id, label: data[index].name })
    }

    return county
}

async function getSchedule(id, query = { publicWorker: true }) {
    const { data } = await scheduleStore.getScheduleParams(id, query)
    console.log(data)

    return data
}
let filter = ref('')
function getPreview() {
    row.value = {
        createdAt: null,
        publicWorker: currentUser.value.role == 'user' ? currentUser.value._id : null,
        supervisor_id: currentUser.value.role == 'supervisor' ? currentUser.value._id : null,
        paymaster: {
            id: currentUser.value.paymaster._id,
            name: currentUser.value.paymaster.name,
            position: currentUser.value.paymaster.position
        },
        tripStart: dateStart.value,
        tripEnd: dateEnd.value,
        places: place.value,
        regional: regional.value !== null ? regional.value.label : null,
        institutes: mainInstitute.value,
        tripObjective: object.value,
        activities: activities.value,
        meanstransport: {
            go: goMeanstransport.value,
            return: returnMeanstransport.value
        },
        status: { index: null },
        signature: sign.value
    }

    showPreview.value = true

    showDialog.value = false
}

async function getCity(value) {
    // loadingCity.value = true

    const { data } = await scheduleStore.getCity(value[0].data)

    const cities = []

    for (let index = 0; index < data.length; index++) {
        cities.push({ data: data[index]._id, label: data[index].name })
    }

    return cities
}

async function getInstitute(value) {
    const { data } = await scheduleStore.getInstitute(value.data)

    institute.value = null

    instituteOptions.value.splice(0)

    for (let index = 0; index < data.length; index++) {
        instituteOptions.value.push({ data: data[index]._id, label: data[index].name })
    }

}

async function cleanDialog() {
    row.value = {}

    sign.value = {
        publicWorker: null,
        paymaster: null
    }

    status.value = null

    loading.value = false

    goRoute.value = []

    labelDialog.value = 'Crear Agenda'

    returnRoute.value = []

    goMeanstransport.value = []

    returnMeanstransport.value = []

    place.value = []

    regional.value = null

    mainInstitute.value = []

    id.value = null

    dateStart.value = ''

    dateEnd.value = ''

    object.value = null

    activities.value = [{ date: '', items: [] }]

    sign.value = {
        publicWorker: null,
        paymaster: null
    }

    if (currentUser.value.role == 'user') {
        rows.value = await getSchedule(currentUser.value._id)
    }
}

async function createSchedule() {
    loading.value = true

    await scheduleStore.postSchedule({
        publicWorker: currentUser.value.role == 'user' ? currentUser.value._id : null,
        supervisor_id: currentUser.value.role == 'supervisor' ? currentUser.value._id : null,
        contract: {
            publicName: currentUser.value.name,
            publicBranch: currentUser.value.branch
        },
        typeSchedule: 'commission',
        route: {
            go: goRoute.value,
            return: returnRoute.value
        },
        paymaster: {
            id: currentUser.value.paymaster._id,
            name: currentUser.value.paymaster.name,
            position: currentUser.value.paymaster.position
        },
        meanstransport: {
            go: goMeanstransport.value,
            return: returnMeanstransport.value
        },
        places: place.value,
        regional: otherRegional.value !== null ? regional.value.label : null,
        institutes: mainInstitute.value,
        tripStart: dateStart.value,
        tripEnd: dateEnd.value,
        tripObjective: object.value,
        activities: activities.value,
        signature: sign.value,
        status: {
            index: sign.value.publicWorker !== null ? 2 : null,
            data: sign.value.publicWorker !== null ? 'Agenda firmada por Funcionario' : 'Agenda Creada',
            number: 1
        }
    })

    if (sign.value.publicWorker !== null) {
        showNotify('Agenda firmada por Funcionario', 'positive', '')
    } else {
        showNotify('Agenda Creada', 'positive', '')
    }

    await cleanDialog()

    showDialog.value = false
}

async function updateSchedule() {
    loading.value = true

    await scheduleStore.putSchedule({
        route: {
            go: goRoute.value,
            return: returnRoute.value
        },
        meanstransport: {
            go: goMeanstransport.value,
            return: returnMeanstransport.value
        },
        places: place.value,

        regional: otherRegional.value !== null ? regional.value.label : null,
        tripStart: dateStart.value,
        tripEnd: dateEnd.value,
        tripObjective: object.value,
        activities: activities.value,
        signature: sign.value,
        status: {
            index: sign.value.publicWorker !== null ? 2 : null,
            data: sign.value.publicWorker !== null ? 'Agenda firmada por Funcionario' : 'Agenda Creada',
            number: 1
        }
    }, id.value)

    await cleanDialog()

    showDialog.value = false
}

function showEdit(row) {
    labelDialog.value = 'Editar Agenda'

    goRoute.value = row.route.go

    status.value = row.status

    dateStart.value = row.tripStart.slice(0, 10)

    dateEnd.value = row.tripEnd.slice(0, 10)

    returnRoute.value = row.route.return

    goMeanstransport.value = row.meanstransport.go

    returnMeanstransport.value = row.meanstransport.return

    id.value = row._id

    place.value = row.places

    if (row.regional !== null) {
        regional.value = { label: row.regional }
    }

    mainInstitute.value = row.institutes

    object.value = row.tripObjective

    activities.value = row.activities

    showDialog.value = true
}

const currentUser = ref(null)

const sign = ref({
    publicWorker: null,
    paymaster: null
})

const columns = ref([
    {
        name: 'route',
        label: 'Ruta',
        align: 'center',
        style: 'width: 300px',
        headerStyle: 'width: 300px'
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

const rows = ref([])

const id = ref(null)

const status = ref(null)

const loading = ref(false)

const showDialog = ref(false)

const showPreview = ref(false)

const labelDialog = ref('Crear Agenda')

const row = ref({})

const goRoute = ref([])

const savegoOption = ref(false)

const goCounty = ref(null)

const goCity = ref(null)

const goOther = ref(null)

const mainCounty = ref([])

const gocountyOptions = ref([])

const loadingCity = ref(false)

const gocityOptions = ref([])

const maingoCity = ref([])


const returnRoute = ref([])

const savereturnOption = ref(false)

const returnCounty = ref(null)

const returnCity = ref(null)

const returnOther = ref(null)

const returncountyOptions = ref({})

const returncityOptions = ref([])

const mainreturnCity = ref([])


const goMeanstransport = ref([])

const savegoMeanstransport = ref(false)

const temporarygoMeanstransport = ref(null)

const meanstransportOptions = ref([
    { data: 0, label: 'Aéreo' },
    { data: 1, label: 'Terrestre' },
    { data: 2, label: 'Fluvial' }
])

const returnMeanstransport = ref([])

const savereturnMeanstransport = ref(false)

const temporaryreturnMeanstransport = ref(null)


const place = ref([])

const saveplaceOption = ref(false)

const placeCounty = ref(null)

const placeCity = ref(null)

const otherPlace = ref(null)

const placecountyOptions = ref([])

const placecityOptions = ref([])

const mainplaceCity = ref([])


const regional = ref(null)

const regionalOptions = ref([])

const mainRegional = ref([])


const mainInstitute = ref([])

const saveinstituteOption = ref(false)

const otherInstitute = ref(null)

const institute = ref(null)

const instituteOptions = ref([])

const otherRegional = ref(null)

const otherregionalOptions = ref([])


const object = ref(null)

const activities = ref([{ date: '', items: [] }])

const dateStart = ref('')

const dateEnd = ref('')

const getActivities = computed(function () {
    const dateNow = date.formatDate(Date.now(), 'YYYY-MM-DD')

    // if(dateStart.value.length == 0 || dateEnd.value.length == 0) {

    // }
    activities.value.splice(0)

    if (dateStart.value <= dateEnd.value && dateStart.value > dateNow && goRoute.value.length !== 0 && returnRoute.value.length !== 0) {
        // const unit = 'days'
        const dateDifference = date.getDateDiff(new Date(dateEnd.value.slice(0, 4), parseInt(dateEnd.value.slice(5, 7)) - 1, dateEnd.value.slice(8)), new Date(dateStart.value.slice(0, 4), parseInt(dateStart.value.slice(5, 7)) - 1, dateStart.value.slice(8)), 'days')

        // activities.value.splice(0)

        for (let index = 0; index < dateDifference + 1; index++) {
            const activityDate = new Date(dateStart.value.slice(0, 4), parseInt(dateStart.value.slice(5, 7)) - 1, parseInt(dateStart.value.slice(8)) + index)

            if (index == 0) {
                if (dateDifference == 0) {
                    activities.value.push({ date: activityDate.toISOString().slice(0, 10), items: [{ data: `${goRoute.value[0].data} - ${goRoute.value[goRoute.value.length - 1].data}`, time: '' }, { data: `${returnRoute.value[0].data} - ${returnRoute.value[returnRoute.value.length - 1].data}`, time: '' }] })
                } else {
                    activities.value.push({ date: activityDate.toISOString().slice(0, 10), items: [{ data: `${goRoute.value[0].data} - ${goRoute.value[goRoute.value.length - 1].data}`, time: '' }] })
                }
            } else if (index == dateDifference) {
                activities.value.push({ date: activityDate.toISOString().slice(0, 10), items: [{ data: `${returnRoute.value[0].data} - ${returnRoute.value[returnRoute.value.length - 1].data}`, time: '' }] })
            } else {
                activities.value.push({ date: activityDate.toISOString().slice(0, 10), items: [{ data: '', time: '' }] })
            }
        }

        return activities.value
    }

    activities.value.push({ date: '', items: [{ data: '', time: '' }] })

    return activities.value
})
</script>