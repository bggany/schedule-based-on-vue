import Vue from 'vue'
import Router from 'vue-router'
import Schedule from '@/page/Schedule'
import LessonInfo from '@/page/LessonInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/schedule'
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/lesson-info',
      name: 'lesson-info',
      component: LessonInfo
    }
  ]
})
