import { defineStore } from 'pinia'
import { instance } from './index.js'

export const useScheduleStore = defineStore('Schedules', {
    states: () => ({}),
    getters: {},
    actions: {
        async getCounty(query) {
            const { data, status } = await instance({
                method: 'get',
                url: '/county',
                params: query
            })

            return { data, status }
        },

        async getCity(county) {
            const { data, status } = await instance({
                method: 'get',
                url: '/city/search',
                params: {
                    county: county
                }
            })

            return { data, status }
        },

        async getInstitute(regional) {
            const { data, status } = await instance({
                method: 'get',
                url: '/institute/search',
                params: {
                    regional: regional
                }
            })

            return { data, status }
        },

        async postSchedule(data) {
            try {
                const response = await instance({
                    method: 'post',
                    url: '/schedule',
                    data: data
                })

                if (response) {
                    const { data, status } = response

                    return { data, status }
                }
            } catch (error) {
                const { data, status } = error.response

                return { data, status }
            }

        },

        async putSchedule(data, id) {
            await instance({
                method: 'put',
                url: `/schedule/${id}`,
                data: data
            })
        },

        async getSchedule(query = {}) {
            const { data, status } = await instance({
                method: 'get',
                url: '/schedule',
                params: query
            })

            return { data, status }
        },

        async getScheduleParams(id, query = {}) {
            const { data, status } = await instance({
                method: 'get',
                url: `/schedule/${id}`,
                params: query
            })

            return { data, status }
        },

        async postLegalization(data, id) {
            const { status } = await instance({
                method: 'post',
                url: `/schedule/legalization/${id}`,
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            return { status }
        },

        async putLegalization(data, id) {
            const { status } = await instance({
                method: 'put',
                url: `/schedule/legalization/${id}`,
                data: data
            })

            return { status }
        }
    }
})