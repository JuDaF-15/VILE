import { LocalStorage } from 'quasar'
import Layout from '../layouts/Layout.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'
import Home from '../pages/Home.vue'
import Recuperar from "../pages/Recuperar.vue"


// schedules
import NewPublic from '../pages/schedules/public/New.vue'


import NewContractor from '../pages/schedules/contractor/New.vue'
// import Preview from '../pages/schedules/contractor/Preview.vue'

// import PreviewLegalization from '../pages/schedules/administrator/Preview.vue'
import Legalization from '../pages/schedules/administrator/Legalization.vue'

import Historical from '../pages/schedules/Historical.vue'
import Request from '../pages/schedules/Request.vue'

import User from '../pages/User.vue'

import Profile from '../pages/Profile.vue'

const routes = [
    { path: '/', component: Login },
    { path: "/nueva/contrasena", component: Recuperar, name: "recuperar" },
    {
        path: '/layout',
        component: Layout,
        beforeEnter: (to, from) => {
            if(!LocalStorage.has('token')) {
                return '/'
            }

            if(!LocalStorage.getItem('token')) {
                LocalStorage.remove('token')
                return '/'
            }

            return true
        },
        redirect: '/layout/home',
        children: [
            { path: 'perfil', component: Profile },
            { path: 'home', component: Home },
            {
                path: 'agenda',
                // beforeEnter: (to, from) => {
                //     const roles = ['user', 'supervisor']

                //     const { role } = LocalStorage.getItem('user')

                //     if (roles.includes(role.data)) {
                //         return true
                //     }

                //     return false
                // },
                children: [
                    {
                        path: 'funcionario', children: [
                            { path: 'crear', component: NewPublic },
                            { path: 'legalizacion', component: Legalization }
                        ]
                    },
                    {
                        path: 'contratista', children: [
                            { path: 'crear', component: NewContractor },
                            { path: 'legalizacion', component: Legalization }
                        ]
                    },

                    { path: 'historico', component: Historical },

                    { path: 'solicitudes', component: Request },

                    { path: 'legalizacion', component: Legalization },
                ]
            },
            { path: 'usuario', component: User }
        ]
    },
    { path: '/:pathMatch(.*)*', component: NotFound },
]

export default routes