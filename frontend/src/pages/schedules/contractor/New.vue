<template>
    <q-page class="q-pa-md">
        <div class="text-h4 text-center q-mb-md">Agendas</div>
        <div class="row justify-center q-pt-md">

            <!-- table -->

            <div v-show="!showPreview" class="col-8" style="width: 90%;">
                <!-- <q-table class="my-sticky-header-table" :filter="filter" :rows="rows" :columns="columns">
                    <template v-slot:top-right>
                        <q-input dense debounce="300" color="primary" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>


                    <template v-slot:top-left>
                        <div v-show="!showPreview" class="col-10 justify-end flex">
                            <q-btn @click="showDialog = true" icon="add" label="Crear Agenda" color="primary" />
                        </div>
                    </template>

                    <template v-slot:body="props">

                        <tr :props="props" @click="showEdit(props.row)">
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
                                <p v-if="props.row.place !== null" v-text="props.row.place"
                                    class="q-my-none text-center" />
                                <div class="row justify-center">
                                    <div class="col-12">
                                        <p v-text="props.row.regional" class="q-my-none text-center" />
                                    </div>

                                    <div class="col-10">
                                        <p v-text="props.row.institute" class="q-my-none text-center" />
                                    </div>
                                </div>
                            </td>
                            <td key="company" v-text="props.row.company" class="text-center" />

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
                        </tr>
                    </template>
                </q-table> -->

                <!-- TABLA MIA -->
                <q-table class="my-sticky-header-table" :loading="cargando" :rows="rows" :columns="columns" row-key="name" :filter="filter">
                    <template v-slot:top-right>
                        <q-input dense debounce="300" color="primary" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </template>

                    <template v-slot:top-left>
                        <div v-show="!showPreview" class="col-10 justify-end flex">
                            <q-btn @click="showDialog = true" icon="add" label="Crear Agenda" color="primary" />
                        </div>
                    </template>

                    <template v-slot:body-cell-route="props">
                        <q-td :props="props">
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
                        </q-td>
                    </template>

                    <template v-slot:body-cell-place="props">
                        <q-td :props="props">
                            <p v-if="props.row.place !== null" v-text="props.row.place" class="q-my-none text-center" />
                            <div class="row justify-center">
                                <div class="col-12">
                                    <p v-text="props.row.regional" class="q-my-none text-center" />
                                </div>

                                <div class="col-10">
                                    <p v-text="props.row.institute" class="q-my-none text-center" />
                                </div>
                            </div>
                        </q-td>
                    </template>

                    <template v-slot:body-cell-company="props">
                        <q-td :props="props">
                            <p v-text="props.row.company" class="text-center" />
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

                    <template v-slot:body-cell-opciones="props">
                        <q-td :props="props">
                            <q-icon @click="showEdit(props.row)" name="fa-solid fa-eye" size="20px" color="blue">
                                <q-tooltip>
                                    Ver
                                </q-tooltip>
                            </q-icon>
                        </q-td>
                    </template>

                </q-table>
            </div>

            <!-- preview -->
            <div v-show="showPreview" class="justify-end start q-mb-md" style="font-size: 12px;">
                <q-btn @click="imprimirPagina" label="Descargar como PDF" icon="download" class="bg-blue text-white" />
            </div>

            <!-- preview -->
            <div v-show="showPreview" class="col-sm-8 col-lg-6 justify-end flex q-mb-md" style="font-size: 12px;">
                <q-btn @click="showPreview = false; showDialog = true" icon="fa-solid fa-arrow-right" label="Continuar Creación"
                    class="bg-green text-white" />
            </div>

            <div v-show="showPreview" class="col-12" />

            <div id="descargar" style="width:65%">
                <Preview v-if="showPreview == true" :row="row" />

                <div v-show="showPreview" class="col-12" />

                <div v-show="showPreview" class="col-sm-8 col-lg-6 justify-end flex">
                    <p class="q-my-none q-mr-sm q-mb-sm" style="font-size: 12px;">GTH-F-090 V.03</p>
                </div>
            </div>

            <!-- dialog -->
            <q-dialog v-model="showDialog">
                <q-card style="width: 700px;">
                    <q-card-section class="bg-primary justify-between flex z-top" style="position: sticky; top: 0;">
                        <p v-text="labelDialog" class="q-my-none text-white" style="font-size: 25px;" />
                        <q-btn @click="getPreview()" label="Vista Previa" icon="fa-solid fa-eye" class="bg-white text-primary" />
                    </q-card-section>

                    <q-space />

                    <q-card-section v-if="status !== null && status.index == 0">
                        <div class="row justify-center">
                            <div class="col-10">
                                <q-banner rounded class="bg-red">
                                    <template v-slot:default>
                                        <div class="row">
                                            <div class="col-12">
                                                <p class="q-my-none text-white items-center flex" style="font-size: 18px;">
                                                    <q-icon name="error_outline" size="24px" class="text-white" />Agenda
                                                    Rechazada
                                                </p>
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
                                                <q-chip removable :label="element.data"
                                                    @remove="goRoute.splice(index, 1)" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 q-pr-sm q-pb-sm justify-end flex">
                                        <q-btn :disable="loadingCounty" :loading="loadingCounty"
                                            @click="savegoOption = true" label="+" class="bg-primary text-white" />
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
                                                        :disable="goOther !== null" v-model="goCounty"
                                                        :options="gocountyOptions" label="Departamento"
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
                                                        :disable="goOther !== null || loadingCity" :loading="loadingCity"
                                                        v-model="goCity" :options="gocityOptions" label="Municipio"
                                                        @filter="function (val, update) { update(() => { gocityOptions = maingoCity.filter(element => element.label.toLowerCase().indexOf(val.toLowerCase()) > -1) }) }" />
                                                </div>
                                            </div>
                                            <div class="row justify-end q-pt-sm q-pb-md q-pr-sm">
                                                <q-btn @click="() => {
                                                    if (goOther !== null && goOther !== '') {
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

                            <div class="col-10 q-mt-lg">
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
                                        <q-btn :disable="loadingCounty" :loading="loadingCounty"
                                            @click="savereturnOption = true" label="+" class="bg-primary text-white" />
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
                                                        :disable="returnOther !== null" v-model="returnCounty"
                                                        :options="returncountyOptions" label="Departamento"
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
                                                        :disable="returnOther !== null || loadingCity"
                                                        :loading="loadingCity" v-model="returnCity"
                                                        :options="returncityOptions" label="Municipio"
                                                        @filter="function (val, update) { update(() => { returncityOptions = mainreturnCity.filter(element => element.label.toLowerCase().indexOf(val.toLowerCase()) > -1) }) }" />
                                                </div>
                                            </div>
                                            <div class="row justify-end q-pt-sm q-pb-md q-pr-sm">
                                                <q-btn @click="() => {
                                                    if (returnOther !== null && returnOther !== '') {
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

                            <div class="col-10 q-mt-lg">
                                <q-select filled stack-label use-chips use-input
                                    :disable="place.length !== 0 || loadingCounty" :loading="loadingCounty"
                                    v-model="regional" :options="regionalOptions" label="Dirección General / Regional"
                                    @filter="function (val, update, abort) {
                                        update(() => {
                                            const needle = val.toLowerCase()

                                            regionalOptions = mainRegional.filter(element => element.label.toLowerCase().indexOf(needle) > -1)
                                        })
                                    }" @update:model-value="async (value) => {
    await getOptions(value)
}" />
                            </div>

                            <div class="col-10 q-mt-sm">
                                <q-select filled stack-label
                                    :disable="place.length !== 0 ? true : false || loadingInstitute" v-model="institute"
                                    :loading="loadingInstitute" :options="instituteOptions" label="Dependencia / Centro" />
                            </div>


                            <div class="col-10 q-mt-md">
                                <div class="row" style="background-color: whitesmoke;">
                                    <div class="col-12">
                                        <p class="q-my-none q-pl-sm q-pt-sm" style="font-size: 12px; color: grey;">
                                            Ciudad o País
                                            Desplazamiento</p>
                                    </div>

                                    <div class="col-12">
                                        <div class="row q-px-sm">
                                            <div class="col-auto" v-for="(element, index) in place">
                                                <q-chip removable :label="element.data" @remove="place.splice(index, 1)" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 q-pr-sm q-pb-sm justify-end flex">
                                        <q-btn :disable="regional !== null || loadingCounty" :loading="loadingCounty"
                                            label="+" class="bg-primary text-white" @click="saveplaceOption = true" />
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
                                                        :disable="otherPlace !== null" v-model="placeCounty"
                                                        :options="placecountyOptions" label="Departamento"
                                                        @filter="function (val, update) { update(() => { placecountyOptions = mainplaceCounty.filter(element => element.label.toLowerCase().indexOf(val.toLowerCase()) > -1) }) }"
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
                                                        :disable="otherPlace !== null || loadingCity" :loading="loadingCity"
                                                        v-model="placeCity" :options="placecityOptions" label="Municipio"
                                                        @filter="function (val, update) { update(() => { placecityOptions = mainplaceCity.filter(element => element.label.toLowerCase().indexOf(val.toLowerCase()) > -1) }) }" />
                                                </div>
                                            </div>
                                            <div class="row justify-end q-pt-sm q-pb-md q-pr-sm">
                                                <q-btn @click="() => {
                                                    if (otherPlace !== null && otherPlace !== '') {
                                                        place.splice(0)
                                                        place.push({ data: otherPlace, id: null })
                                                    } else if (placeCity !== null) {
                                                        place.splice(0)
                                                        place.push({ data: placeCity.label, id: placeCity.data })
                                                    }

                                                    otherPlace = null

                                                    placeCounty = null

                                                    mainplaceCity.splice(0)
                                                    placecityOptions.splice(0)
                                                    placeCity = null

                                                    saveplaceOption = false
                                                }" label="AGREGAR" class="bg-primary text-white" />
                                            </div>
                                        </q-menu>
                                    </div>
                                </div>
                            </div>

                            <div class="col-10 q-mt-lg">
                                <q-input filled stack-label v-model="company" label="Entidad o Empresa" />
                            </div>

                            <div class="col-10 q-mt-sm q-mb-lg">
                                <q-input filled stack-label v-model="companyContact" label="Contacto" />
                            </div>

                            <div class="col-10">
                                <q-input filled stack-label v-model="tripStart" label="Fecha Inicio Desplazamiento"
                                    type="date" />
                            </div>
                            <div class="col-10 q-mt-sm">
                                <q-input filled stack-label v-model="tripEnd" label="Fecha Fin Desplazamiento"
                                    type="date" />
                            </div>

                            <div class="col-10 q-mt-lg">
                                <q-input filled autogrow stack-label v-model="tripObjective"
                                    label="Objetivo Desplazamiento" />
                            </div>
                        </div>

                        <div class="row q-mt-md q-mb-sm">
                            <div class="col-12">
                                <p class="q-my-none text-primary" style="font-size: 18px;">Obligaciones</p>
                            </div>

                            <div class="col-12">
                                <template v-for="(element, index) in duties">
                                    <div class="row">
                                        <div class="col-10 q-pa-sm">
                                            <q-input filled stack-label autogrow v-model="element.data"
                                                label="Obligación" />
                                        </div>

                                        <div v-if="index !== 0" class="col-2 items-center flex">
                                            <q-btn @click="duties.splice(index, 1)" dense label="Eliminar"
                                                class="bg-red text-white" />
                                        </div>

                                        <div v-else class="col-2" />
                                    </div>

                                </template>
                                <div class="row justify-end q-mt-sm q-pr-md">
                                    <q-btn @click="duties.push({})" label="+" sixe="sm" class="bg-primary text-white"
                                        style="font-size: 14px;" />
                                </div>
                            </div>
                        </div>

                        <div class="row q-mt-md q-mb-sm">
                            <div class="col-12">
                                <p class="q-my-none text-primary" style="font-size: 18px;">Actividades</p>
                            </div>
                            <div class="col-12">
                                <div v-for="(element, index) in getActivities" :key="element">
                                    <div class="row justify-center">
                                        <div class="col-12">
                                            <p v-text="`Fecha: ${element.date.slice(8)}/${element.date.slice(5, 7)}/${element.date.slice(0, 4)}`"
                                                class="q-my-sm q-ml-lg" />
                                        </div>
                                        <div class="col-12">
                                            <template v-for="(item, itemIndex) in element.items">
                                                <div class="row justify-end">
                                                    <div class="col-9">
                                                        <q-input
                                                            :disable="index == 0 && itemIndex == 0 || index == getActivities.length - 1 && itemIndex == element.items.length - 1"
                                                            filled stack-label autogrow v-model="item.data"
                                                            label="Actividad" class="q-my-sm" />
                                                    </div>
                                                    <div class="col-2 justify-center items-center flex">
                                                        <div class="row">
                                                            <div v-if="index !== 0 && index !== getActivities.length - 1"
                                                                class="col-12">
                                                                <q-btn v-if="itemIndex !== 0"
                                                                    @click="element.items.splice(itemIndex, 1)" dense
                                                                    label="Eliminar" class="bg-red text-white" />
                                                            </div>
                                                            <div v-else-if="getActivities.length - 1 !== 0" class="col-12">
                                                                <q-btn
                                                                    v-if="index == 0 && itemIndex !== 0 || index == getActivities.length - 1 && itemIndex !== element.items.length - 1"
                                                                    @click="element.items.splice(itemIndex, 1)" dense
                                                                    label="Eliminar" class="bg-red text-white" />
                                                            </div>
                                                            <div v-else class="col-12">
                                                                <q-btn
                                                                    v-if="itemIndex !== 0 && itemIndex !== element.data.length - 1"
                                                                    @click="element.items.splice(itemIndex, 1)" dense
                                                                    label="Eliminar" class="bg-red text-white" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>

                                        <div class="col-12 justify-end flex">
                                            <q-btn :disable="getActivities[0].date == ''"
                                                @click="index == getActivities.length - 1 ? element.items.splice(element.items.length - 1, 0, { data: '' }) : element.items.push({ data: '' })"
                                                label="+" sixe="sm" class="bg-primary text-white q-mr-sm" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="row q-mt-md justify-center">
                            <div class="col-12">
                                <p class="q-my-none text-primary" style="font-size: 18px">Observaciones</p>
                            </div>

                            <div class="col-12">
                                <template v-for="(element, index) in observations">
                                    <div class="row">
                                        <div class="col-10 q-pa-sm">
                                            <q-input v-model="element.data" filled autogrow stack-label
                                                label="Observación" />
                                        </div>

                                        <div v-if="index !== 0" class="col-2 items-center flex">
                                            <q-btn @click="observations.splice(index, 1)" dense label="Eliminar"
                                                class="bg-red text-white" />
                                        </div>

                                        <div v-else class="col-2" />
                                    </div>
                                </template>

                                <div class="row justify-end q-mt-sm q-pr-md">
                                    <q-btn @click="observations.push({ data: '' })" label="+" size="xs"
                                        class="bg-primary text-white" style="font-size: 14px;" />
                                </div>
                            </div>
                        </div>

                        <div class="row q-mt-md justify-center">
                            <div class="col-12">
                                <p class="q-my-none text-primary" style="font-size: 18px;">Firma</p>
                            </div>

                            <div class="col-10 q-mt-sm">
                                <div class="row" style="background-color: whitesmoke;">
                                    <div class="col-12">
                                        <p class="q-my-none q-pl-sm q-pt-sm" style="font-size: 12px; color: grey;">Firma
                                            Contratista
                                        </p>
                                    </div>

                                    <div class="col-12 q-pl-sm">
                                        <q-img :src="sign.contractor" style="width: 140px; height: 80px;" />
                                    </div>
                                    <div class="col-12 justify-end flex q-pb-sm q-pr-sm">
                                        <q-btn :disable="sign.contractor !== null" @click="getSign()" label="Firmar"
                                            class="bg-primary text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions class="justify-around">
                        <q-btn @click="cleanDialog()" label="Cerrar" v-close-popup class="bg-red text-white" />
                        <q-btn @click="id == null ? createSchedule() : updateSchedule()" label="Guardar"
                            class="bg-primary text-white" />
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

import { showNotify } from '../../../components/notify.js'

import Preview from './Preview.vue'

import { useUserStore } from '../../../stores/user'

const $q = useQuasar()

const scheduleStore = useScheduleStore()

const userStore = useUserStore()

let cargando = ref(false)


function imprimirPagina() {

    const printableContent = document.getElementById('descargar').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
}

async function getCounty(query = {}) {
    const { data, status } = await scheduleStore.getCounty(query)

    const county = []

    for (let index = 0; index < data.length; index++) {
        county.push({ data: data[index]._id, label: data[index].name })
    }

    return county
}

async function getCity(value) {
    loadingCity.value = true

    console.log(value)
    const { data, status } = await scheduleStore.getCity(value[0].data)

    const city = []

    for (let index = 0; index < data.length; index++) {
        city.push({ data: data[index]._id, label: data[index].name })
    }

    return city
}

async function getCurrentUser(id) {
    const { data } = await userStore.getUserParams(id)

    console.log(data)

    return data
}

const currentUser = ref(null)

async function getSchedule(id, query = {}) {
    const { data } = await scheduleStore.getScheduleParams(id, query)

    return data
}

onBeforeMount(
    async () => {
        cargando.value = true
        
        gocountyOptions.value = await getCounty()
        returncountyOptions.value = await getCounty()

        mainCounty.value = await getCounty()

        regionalOptions.value = await getCounty({ regional: true })

        mainRegional.value = await getCounty({ regional: true })

        placecountyOptions.value = await getCounty()

        mainplaceCounty.value = await getCounty()

        loadingCounty.value = false

        const user = $q.localStorage.getItem('user')

        rows.value = await getSchedule(user.id, { contractor: true })

        console.log(user)

        cargando.value = true
        if (user.role.data == 'user') {
            currentUser.value = await getCurrentUser(user.id)

            console.log(currentUser.value)

            currentUser.value.role = 'user'

            contractor.value = currentUser.value.name

            identification.value = currentUser.value.identification

            //identification.value.label = optionsIdentification.value[identification.value.index].label

            contract.value = currentUser.value.contract

            object.value = currentUser.value.object

            currentInstitute.value = currentUser.value.institute

            currentRegional.value = currentUser.value.regional

            supervisor.value.id = currentUser.value.supervisor._id

            supervisor.value.name = currentUser.value.supervisor.name

            supervisor.value.position = currentUser.value.supervisor.position

            paymaster.value.id = currentUser.value.paymaster._id

            paymaster.value.name = currentUser.value.paymaster.name

            paymaster.value.position = currentUser.value.paymaster.position
        }
        cargando.value = false

    })

// table
const columns = ref([
    {
        name: 'route',
        label: 'Ruta',
        align: 'center',
        style: 'width: 300px'
        // headerStyle: 'width: 400px;'
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
        label: 'Acciones',
        align: 'center'
    }
])

const rows = ref([])

const id = ref(null)

function showEdit(row) {
    labelDialog.value = 'Editar Agenda'

    createdAt.value = row.createdAt

    console.log(createdAt.value)

    goRoute.value = row.route.go

    status.value = row.status

    returnRoute.value = row.route.return

    goMeanstransport.value = row.meanstransport.go

    returnMeanstransport.value = row.meanstransport.return

    regional.value = row.regional

    institute.value = row.institute

    if (row.place) {
        place.value = [
            { data: row.place }
        ]
    }

    company.value = row.company

    companyContact.value = row.companyContact

    tripStart.value = row.tripStart.slice(0, 10)

    tripEnd.value = row.tripEnd.slice(0, 10)

    tripObjective.value = row.tripObjective

    duties.value = row.duties

    observations.value = row.observations

    console.log(activities.value, row)

    id.value = row._id

    showDialog.value = true
}

async function cleanDialog() {
    createdAt.value = ''

    status.value = null

    sign.value.contractor = null

    goRoute.value = []

    returnRoute.value = []

    goMeanstransport.value = []

    returnMeanstransport.value = []

    regional.value = null

    institute.value = null

    place.value.splice(0)

    company.value = null

    companyContact.value = null

    tripStart.value = ''

    tripEnd.value = ''

    tripObjective.value = null

    duties.value = [{}]

    observations.value = [{ data: '' }]

    activities.value = [{ items: [], date: '' }]

    rows.value = await getSchedule(currentUser.value._id, { contractor: true })

    id.value = null

    showDialog.value = false

    labelDialog.value = 'Crear Agenda'
}

const showDialog = ref(false)

const labelDialog = ref('Crear Agenda')

function getPreview() {
    row.value = {
        contractor: currentUser.value._id,
        contract: {
            date: contract.value.date,
            number: contract.value.number,
            contractorName: contractor.value,
            object: object.value,
            regional: currentRegional.value.name,
            institute: currentInstitute.value.name
        },
        route: {
            go: goRoute.value,
            return: returnRoute.value
        },
        meanstransport: {
            go: goMeanstransport.value,
            return: returnMeanstransport.value
        },
        regional: regional.value !== null ? regional.value.label : null,
        institute: institute.value !== null ? institute.value.label : null,
        place: place.value.length !== 0 ? place.value[0].data : null,
        company: company.value,
        companyContact: companyContact.value,
        tripStart: tripStart.value,
        tripEnd: tripEnd.value,
        tripObjective: tripObjective.value,
        duties: duties.value,
        observations: observations.value,
        activities: activities.value,
        supervisor: supervisor.value,
        paymaster: paymaster.value,
        signature: {
            contractor: sign.value.contractor !== null ? sign.value.contractor : null
        },
        createdAt: createdAt.value
    }

    showDialog.value = false

    showPreview.value = true
}

const showPreview = ref(false)

const row = ref({})

const sign = ref({
    contractor: null
})

const createdAt = ref('')

const status = ref(null)
let filter = ref('')
const contractor = ref(null)

const optionsIdentification = ref([{ label: 'Cédula de Ciudadanía', data: 'C.C.' }, { label: 'Cédula de Extranjero', data: 'C.E.' }])

const identification = ref({})

const contract = ref({})

const object = ref('')

const currentRegional = ref('')

const currentInstitute = ref('')

const supervisor = ref({})

const paymaster = ref({})

const mainCounty = ref([])

const gocountyOptions = ref([])

const gocityOptions = ref([])

const savegoOption = ref(false)

const goOther = ref(null)

const goCounty = ref(null)

const goCity = ref(null)

const goRoute = ref([])

const maingoCity = ref([])


const returncountyOptions = ref([])

const returncityOptions = ref([])

const savereturnOption = ref(false)

const returnOther = ref(null)

const returnCounty = ref(null)

const returnCity = ref(null)

const returnRoute = ref([])

const mainreturnCity = ref([])


const meanstransportOptions = ref([{ data: 0, label: 'Aéreo' }, { data: 1, label: 'Terrestre' }, { data: 2, label: 'Fluvial' }])

const goMeanstransport = ref([])

const temporarygoMeanstransport = ref(null)

const savegoMeanstransport = ref(null)

const returnMeanstransport = ref([])

const temporaryreturnMeanstransport = ref(null)

const savereturnMeanstransport = ref(false)


const loadingCounty = ref(true)

const loadingCity = ref(false)


const mainRegional = ref([])

const regional = ref(null)

const regionalOptions = ref([])

const institute = ref(null)

const loadingInstitute = ref(false)

const instituteOptions = ref([])

async function getOptions(value) {
    loadingInstitute.value = true
    if (value) {
        const { data } = await scheduleStore.getInstitute(value.data)

        institute.value = ''

        instituteOptions.value.splice(0)

        for (let index = 0; index < data.length; index++) {
            instituteOptions.value.push({ label: data[index].name, data: data[index]._id })
        }
    } else {
        instituteOptions.value.splice(0)
        institute.value = ''
    }
    loadingInstitute.value = false
}

const place = ref([])

const saveplaceOption = ref(false)

const placecountyOptions = ref([])

const placecityOptions = ref([])

const otherPlace = ref(null)

const placeCounty = ref(null)

const placeCity = ref(null)

const mainplaceCounty = ref([])

const mainplaceCity = ref([])


const company = ref(null)

const companyContact = ref(null)

let tripStart = ref('')

let tripEnd = ref('')

const tripObjective = ref(null)

const duties = ref([{}])

const activities = ref([{ items: [{ data: '' }], date: '', }])

const getActivities = computed(() => {
    if (tripStart.value && tripEnd.value && goRoute.value.length !== 0 && returnRoute.value.length !== 0) {

        const dateNow = date.formatDate(Date.now(), 'YYYY-MM-DD')

        const dateStart = new Date(tripStart.value.slice(0, 4), parseInt(tripStart.value.slice(5, 7)) - 1, parseInt(tripStart.value.slice(8)))

        const dateEnd = new Date(tripEnd.value.slice(0, 4), parseInt(tripEnd.value.slice(5, 7)) - 1, tripEnd.value.slice(8))

        if (tripStart.value > tripEnd.value || tripStart.value < dateNow) {
            showNotify('Fecha Desplazamiento incorrecta.', 'negative')
            // } else if(goRoute.value[goRoute.value.length - 1].id !== returnRoute.value[0].id) {

            // activities.value.push({data: [{activity: ''}], date: ''})

            //     showNotify('Ruta de Regreso incorrecta', 'negative')
        } else {
            const unit = 'days'

            const dateDifference = date.getDateDiff(dateEnd, dateStart, unit)


            //console.log(dateDifference, activities.value.length)

            // if(activities.value.length - 1 !== dateDifference)  {
            activities.value.splice(0)

            for (let index = 0; index < dateDifference + 1; index++) {
                const date = new Date(tripStart.value.slice(0, 4), parseInt(tripStart.value.slice(5, 7)) - 1, parseInt(tripStart.value.slice(8)) + index)

                //console.log(date.toISOString())

                if (index == 0) {
                    if (dateDifference == 0) {
                        activities.value.push({
                            items: [{ data: `Desplazamientos Ruta de Ida: ${goRoute.value[0].data || 'Ciudad'} - ${goRoute.value[goRoute.value.length - 1].data || 'Ciudad'}` }, { data: `Desplazamiento Ruta de Regreso: ${returnRoute.value[0].data || 'Ciudad'} - ${returnRoute.value[returnRoute.value.length - 1].data || 'Ciudad'}` }],
                            date: date.toISOString().slice(0, 10),
                        })
                    } else {
                        activities.value.push({
                            items: [{ data: `Desplazamiento Ruta de Ida: ${goRoute.value[0].data || 'Ciudad'} - ${goRoute.value[goRoute.value.length - 1].data || 'Ciudad'}` }],
                            date: date.toISOString().slice(0, 10),
                        })
                    }
                } else if (index == dateDifference) {
                    activities.value.push({
                        items: [{ data: `Desplazamiento Ruta de Regreso: ${returnRoute.value[0].data || 'Ciudad'} - ${returnRoute.value[returnRoute.value.length - 1].data || 'Ciudad'}` }],
                        date: date.toISOString().slice(0, 10),
                    })
                } else {
                    activities.value.push({
                        items: [{ data: '' }],
                        date: date.toISOString().slice(0, 10),
                    })
                }
            }
            // }
        }

        return activities.value

    } else {
        activities.value.splice(0)

        // console.log(tripStart.value > tripEnd.value, date.formatDate(Date.now(), 'YYYY-MM-DD'), tripStart)

        activities.value.push({ items: [{ data: '' }], date: '' })

        return activities.value
    }
})

const observations = ref([{ data: '' }])

const file = ref(null)

async function getSign() {

    if (currentUser.value.role == 'user') {
        if (currentUser.value.sign) {
            const { url } = currentUser.value.sign

            sign.value.contractor = url

            showNotify('Agenda Contratista firmada', 'positive', 'check')
        } else {
            showNotify('Error, Firma no encontrada', 'negative')
        }
    }
}

async function createSchedule() {
    await scheduleStore.postSchedule({
        contractor: currentUser.value._id,
        userId: currentUser.value._id,
        contract: {
            mail: currentUser.value.mail,
            number: contract.value.number,
            date: contract.value.date,
            contractorName: contractor.value,
            object: object.value,
            regional: currentRegional.value.name,
            institute: currentInstitute.value.name
        },
        route: {
            go: goRoute.value,
            return: returnRoute.value
        },
        meanstransport: {
            go: goMeanstransport.value,
            return: returnMeanstransport.value
        },
        regional: regional.value !== null ? regional.value.label : null,
        institute: institute.value !== null ? institute.value.label : null,
        place: place.value.length !== 0 ? place.value[0].data : null,
        company: company.value,
        companyContact: companyContact.value,
        tripStart: tripStart.value,
        tripEnd: tripEnd.value,
        tripObjective: tripObjective.value,
        duties: duties.value,
        observations: observations.value,
        activities: activities.value,
        supervisor: supervisor.value,
        paymaster: paymaster.value,
        signature: {
            contractor: sign.value.contractor !== null ? sign.value.contractor : null
        },
        status: {
            index: sign.value.contractor !== null ? 1 : null,
            data: sign.value.contractor !== null ? 'Agenda firmada por Contratista' : 'Agenda Contratista creada',
            number: 1
        }
    })

    $q.notify({
        message: "Agenda Creada, pendiente por aprobación del supervisor",
        color: "positive",
        icon: 'check',
        position: 'bottom',
        timeout: 4500
    })
    await cleanDialog()
}

async function updateSchedule() {
    await scheduleStore.putSchedule({
        route: {
            go: goRoute.value,
            return: returnRoute.value
        },
        meanstransport: {
            go: goMeanstransport.value,
            return: returnMeanstransport.value
        },
        regional: regional.value !== null ? regional.value.label : null,
        institute: institute.value !== null ? institute.value.label : null,
        place: place.value.length !== 0 ? place.value[0].data : null,
        company: company.value,
        companyContact: companyContact.value,
        tripStart: tripStart.value,
        tripEnd: tripEnd.value,
        tripObjective: tripObjective.value,
        duties: duties.value,
        observations: observations.value,
        activities: activities.value,
        signature: {
            contractor: sign.value.contractor !== null ? sign.value.contractor : null
        },
        status: {
            index: sign.value.contractor !== null ? 1 : null,
            data: sign.value.contractor !== null ? 'Agenda firmada por Contratista' : 'Agenda Contratista creada',
            justification: null,
            number: 1
        },
        createdAt: Date.now()
    }, id.value)

    await cleanDialog()
}
</script>

<style scoped>
.border-bottom {
    border-bottom: 1px solid black;
}

.border-right {
    border-right: 1px solid black;
}
</style>