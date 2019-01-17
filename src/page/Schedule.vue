<template>
  <div>
    <div class="nav">
      <select v-model="selectWeek">
        <option v-for="index in 25" :value="index" :key='index'>第{{ index }}周</option>
      </select>
    </div>
    <div class="header">
      <div :class="['card',{'select-card': dayFlag[index]}]" v-html="value"
      v-for="(value,key,index) in dayName" :key='index'></div>
    </div>
    <div class="content">
      <div :class="['card','day-'+lesson.day,'class-'+lesson.class,'length-'+lesson.length]"
      :style="{'background-color':colorList[(lesson.name.length)%9]}"
      v-for="lesson in lessonFilter" :key='lesson.id'>
        <router-link :to="{name: 'lesson-info', query:{lessonId:lesson.id}}" tag='span'>
          {{lesson.name+'@'+lesson.room}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      theWeek: '1', // 当前周
      selectWeek: '1', // 要查看的周
      dayName: {
        mon: '星期一', tue: '星期二', wed: '星期三', thu: '星期四', fri: '星期五', sat: '星期六', sun: '星期日'
      },
      dayFlag: [// 周一到周日，当前日的值为true
        false, false, false, false, false, false, false
      ],
      colorList: [
        '#E03636', '#e4622c', '#1874ad', '#36e066', '#FF534D',
        '#25C6FC', '#FC275C', '#FCC727', '#524DFF'
      ],
      lessonData: []
    }
  },
  methods: {
    initHeader: function () {
      var now = new Date()
      var sub = this.selectWeek - this.theWeek
      if (sub !== 0) {
        now.setDate(now.getDate() + (sub * 7))
      }
      var month = now.getMonth() + 1
      var day = now.getDate()
      var week = now.getDay()

      week = parseInt(week)
      if (week === 0) {
        week = 7
      }
      week--// 把周一到周日（1……6,0)转换成(0……6)

      // 把当天置为选中状态
      this.dayFlag[week] = true

      var firstDay = day - week

      var flag = true

      for (let key in this.dayName) {
        let arr = this.dayName[key].split('<br/>')
        if (arr.length > 1) {
          this.dayName[key] = arr[arr.length - 1]
        }
        if (firstDay <= 0) {
          let tmp = new Date(now.valueOf())
          tmp.setDate(firstDay)
          this.dayName[key] = `${tmp.getDate()}<br/>${this.dayName[key]}`
        } else if (firstDay === 1) {
          this.dayName[key] = `${month}月<br/>${this.dayName[key]}`
          flag = !flag
        } else {
          this.dayName[key] = `${firstDay}<br/>${this.dayName[key]}`
        }
        firstDay++
      }
      if (flag) {
        this.dayName.mon = month + '/' + this.dayName.mon
      }
    }
  },
  watch: {
    'selectWeek': function (newval) {
      this.initHeader()
    }
  },
  computed: {
    lessonFilter: function () {
      var newList = []
      this.lessonData.forEach(item => {
        if (item.start <= this.selectWeek && item.end >= this.selectWeek) { // 如果在选中周
          if (typeof (item.oddOrDual) === 'undefined') { // 如果单双周没有定义
            newList.push(item)
          } else if (this.selectWeek % 2 === (item.oddOrDual ? 1 : 0)) { // 单周时，oddOrDual为true，true==1；双周时，oddOrDual为false，false=0。
            newList.push(item)
          }
        }
      })
      return newList
    }
  },
  created () {
    this.$api.get('setting', r => {
      this.theWeek = r.week
      this.selectWeek = r.week
    })
    this.$api.get('lessons', r => {
      this.$store.commit('init', r)
      this.lessonData = this.$store.getters.getList
    })
  }
}
</script>
<style lang="sass">
@import "../style/schedule";
</style>
