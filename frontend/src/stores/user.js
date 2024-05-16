import { defineStore } from 'pinia'

import { instance } from './index.js'

import { jwtDecode } from "jwt-decode";

export const useUserStore = defineStore('User', {
    state: () => ({}),
    getters: {},
    actions: {
        async login(identification, password) {
            try {
                const response = await instance({
                    method: 'post',
                    url: '/user/login',
                    data: {
                        identification: identification,
                        password: password
                    }
                })

                if (response) {
                    const { data, status } = response

                    const decode = jwtDecode(data.token)

                    const { role } = decode

                    if (role.data == 'supervisor') {
                        decode.role.label = 'Supervisor'
                    }

                    if (role.data == 'user') {
                        decode.role.label = 'Usuario'
                    }

                    if (role.data == 'administrator') {
                        decode.role.label = 'Administrador'
                    }

                    if (role.data == 'paymaster') {
                        decode.role.label = 'Ordenador'
                    }

                    data.user = decode

                    return { data, status }
                }

            } catch (error) {
                const { data, status } = error.response

                return { data, status }
            }
        },

        async getUser(query = {}) {
            const { data, status } = await instance({
                method: 'get',
                url: '/user',
                params: query
            })

            console.log(data)

            return { data, status }
        },

        async getUserParams(id) {
            const { data, status } = await instance({
                method: 'get',
                url: `/user/${id}`
            })

            return { data }
        },

        async postUser(data) {
            console.log(data)
            try {
                const response = await instance({
                    method: 'post',
                    url: '/user',
                    data: data
                })

                console.log(response)

                if (response) {
                    const { data, status } = response

                    return { data, status }
                }
            } catch (error) {
                const { data, status } = error.response

                return { data, status }
            }
        },

        async putUser(id, data) {
            try {
                const response = await instance({
                    method: 'put',
                    url: `/user/${id}`,
                    data: data
                })

                if (response) {
                    const { data, status } = response

                    return { data, status }
                }
            } catch (error) {
                console.log(error)
            }
        },

        async putSign(id, data) {
            try {
                const response = await instance({
                    method: 'put',
                    url: `/user/sign/${id}`,
                    data: data,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (response) {
                    const { data, status } = response

                    return { data, status }
                }
            } catch (error) {
                console.log(error)
                const { data, status } = error.response

                return { data, status }
            }
        },

        async cambiarEstado(id, status) {
            try {
                const response = await instance({
                    method: 'patch',
                    url: `/user/${id}`,
                    data: {
                        status: status
                    }
                })

                if (response) {
                    const { data, status } = response

                    return { data, status }
                }

            } catch (error) {
                console.log(error);
            }
        },

        async envioCorreo(mail) {
            try {
                const response = await instance({
                    method: 'put',
                    url: `/user/email/clave`,
                    data: {
                        mail: mail
                    }
                })
                if (response) {
                    const { data, status } = response
                    return { data, status }
                }
            } catch (error) {
                console.log(error);
                throw error
            }
        },

        async nuevaContrasena(nuevaContrasena, reset) {
            try {
                const response = await instance({
                    method: 'put',
                    url: `/user/nueva/contrasena`,
                    data: {
                        nuevaContrasena: nuevaContrasena
                    },
                    headers: {
                        reset: reset
                    }
                })

                if (response) {
                    const { data, status } = response
                    return { data, status }
                }

            } catch (error) {
                console.log(error);
                throw error
            }
        }


    },
})