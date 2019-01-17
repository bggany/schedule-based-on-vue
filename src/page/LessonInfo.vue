<template>
  <div>
    <div class="nav">
      <span class='iconfont icon-back' style='padding-left:20px;' @click='goBack'></span>
      <span>课程信息</span>
      <span class='iconfont icon-menu' style="padding-right:20px;"></span>
    </div>
    <div class="header">
      <p v-text='lesson.name'></p>
    </div>
    <div class="content">
      <div class='item'>
        <span class='iconfont icon-trajectorypath' style='color:#1874ad'></span>
        <span class='item-title'>教室</span>
        <span class='item-content' v-text='lesson.room'></span>
      </div>
      <div class='item'>
        <span class='iconfont icon-date' style='color:#25C6FC'></span>
        <span class='item-title'>周数</span>
        <span class='item-content' v-text='lesson.week'></span>
      </div>
      <div class='item'>
        <span class='iconfont icon-class' style='color:#524DFF'></span>
        <span class='item-title'>节数</span>
        <span class='item-content' v-text='lesson.class'></span>
      </div>
      <div class='item'>
        <span class='iconfont icon-people' style='color:#FF534D'></span>
        <span class='item-title'>老师</span>
        <span class='item-content' v-text='lesson.teacher'></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      lesson: {
        'name': '',
        'room': '',
        'week': '',
        'teacher': ''
      }
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    var id = this.$route.query.lessonId
    this.$api.get('lessons/' + id, r => {
      this.lesson.name = r.name
      this.lesson.room = r.room
      if (r.start === r.end) {
        this.lesson.week = r.start + '周'
      } else {
        this.lesson.week = `${r.start}-${r.end}周`
      }
      if (typeof (r.oddOrDual) !== 'undefined') {
        this.lesson.week += `（${r.oddOrDual ? '单' : '双'}周）`
      }
      var arr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      this.lesson.class = `${arr[r.day - 1]} ${r.class}-${r.class + r.length - 1}节`
      this.lesson.teacher = r.teacher
    })
  }
}
</script>

<style lang="sass" scoped>
@import "../style/lessonInfo";
</style>
