<template>
  <div class="container">
    <div class="nav">
      <select v-model="theWeek">
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
        <router-link :to="{name: 'lesson-info', params:{lessonInfo:lesson}}" tag='p'>
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
      lessonData: [// excel to json是真的好用
        {'id': '0', 'name': '第二外语（日语）', 'room': '研713', 'day': 2, 'class': 1, 'length': 2, 'teacher': '西西木', 'start': 1, 'end': 16},
        {'id': '1', 'name': '计算科学与数值方法', 'room': '研701阶', 'day': 3, 'class': 1, 'length': 2, 'teacher': '算数数', 'start': 1, 'end': 16},
        {'id': '2', 'name': '计算科学与数值方法', 'room': '研1213', 'day': 5, 'class': 3, 'length': 2, 'teacher': '算数数', 'start': 8, 'end': 15},
        {'id': '3', 'name': '毛泽东思想和中国科学社会主义理论体系概论', 'room': '研201阶', 'day': 2, 'class': 3, 'length': 2, 'teacher': '张冰冰', 'start': 1, 'end': 16},
        {'id': '4', 'name': '毛泽东思想和中国科学社会主义理论体系概论', 'room': '研1101阶', 'day': 4, 'class': 5, 'length': 2, 'teacher': '张冰冰', 'start': 1, 'end': 16},
        {'id': '5', 'name': '操作系统', 'room': '研1101阶', 'day': 3, 'class': 3, 'length': 2, 'teacher': '陈思思', 'start': 1, 'end': 16},
        {'id': '6', 'name': '操作系统', 'room': '研1213', 'day': 4, 'class': 3, 'length': 2, 'teacher': '陈思思', 'start': 14, 'end': 16, 'oddOrDual': false},
        {'id': '7', 'name': '操作系统', 'room': '研1213', 'day': 5, 'class': 5, 'length': 2, 'teacher': '陈思思', 'start': 5, 'end': 15, 'oddOrDual': true},
        {'id': '8', 'name': '操作系统', 'room': '研201阶', 'day': 5, 'class': 5, 'length': 2, 'teacher': '陈思思', 'start': 2, 'end': 16, 'oddOrDual': false},
        {'id': '9', 'name': 'Java语言程序设计', 'room': '研713', 'day': 4, 'class': 3, 'length': 2, 'teacher': '从岗岗', 'start': 1, 'end': 15, 'oddOrDual': true},
        {'id': '10', 'name': 'Java语言程序设计', 'room': '研1213', 'day': 5, 'class': 3, 'length': 2, 'teacher': '从岗岗', 'start': 2, 'end': 7},
        {'id': '11', 'name': 'Java语言程序设计', 'room': '研1213', 'day': 5, 'class': 3, 'length': 2, 'teacher': '从岗岗', 'start': 16, 'end': 16},
        {'id': '12', 'name': 'Java语言程序设计', 'room': '研1213', 'day': 1, 'class': 5, 'length': 2, 'teacher': '从岗岗', 'start': 16, 'end': 16},
        {'id': '13', 'name': 'Java语言程序设计', 'room': '研601阶', 'day': 2, 'class': 5, 'length': 2, 'teacher': '从岗岗', 'start': 1, 'end': 16},
        {'id': '14', 'name': 'Java语言程序设计', 'room': '研1213', 'day': 1, 'class': 9, 'length': 2, 'teacher': '从岗岗', 'start': 8, 'end': 15},
        {'id': '15', 'name': '计算机网络', 'room': '研1213', 'day': 1, 'class': 5, 'length': 2, 'teacher': '高成成', 'start': 8, 'end': 15},
        {'id': '16', 'name': '计算机网络', 'room': '研601阶', 'day': 1, 'class': 7, 'length': 2, 'teacher': '高成成', 'start': 1, 'end': 16},
        {'id': '17', 'name': '计算机网络', 'room': '研701阶', 'day': 2, 'class': 7, 'length': 2, 'teacher': '高成成', 'start': 2, 'end': 16, 'oddOrDual': false},
        {'id': '18', 'name': '计算机组成原理', 'room': '研1101阶', 'day': 2, 'class': 7, 'length': 2, 'teacher': '张彩彩', 'start': 1, 'end': 15, 'oddOrDual': true},
        {'id': '19', 'name': '计算机组成原理', 'room': '研201阶', 'day': 5, 'class': 7, 'length': 2, 'teacher': '张彩彩', 'start': 1, 'end': 16},
        {'id': '20', 'name': '计算机组成原理', 'room': '东3教808', 'day': 3, 'class': 9, 'length': 2, 'teacher': '李津津', 'start': 9, 'end': 16},
        {'id': '21', 'name': 'Internet技术与应用', 'room': '研213', 'day': 4, 'class': 7, 'length': 2, 'teacher': '陈思思', 'start': 1, 'end': 16},
        {'id': '22', 'name': 'Internet技术与应用', 'room': '研1213', 'day': 1, 'class': 11, 'length': 2, 'teacher': '陈思思', 'start': 8, 'end': 15},
        {'id': '23', 'name': '形势与政策', 'room': '研201阶', 'day': 1, 'class': 9, 'length': 2, 'teacher': '温媛媛', 'start': 1, 'end': 3}
      ]
    }
  },
  methods: {
    show: function (id) {
      for (let item of this.lessonData) {
        if (item.id === id) {
          alert(`课程名：${item.name}\n授课地点：${item.room}\n授课教师：${item.teacher}`)
          break
        }
      }
    }
  },
  computed: {
    lessonFilter: function () {
      var newList = []
      this.lessonData.forEach(item => {
        if (item.start <= this.theWeek && item.end >= this.theWeek) { // 如果在选中周
          if (typeof (item.oddOrDual) === 'undefined') { // 如果单双周没有定义
            newList.push(item)
          } else if (this.theWeek % 2 === (item.oddOrDual ? 1 : 0)) { // 单周时，oddOrDual为true，true==1；双周时，oddOrDual为false，false=0。
            newList.push(item)
          }
        }
      })
      return newList
    }
  },
  created () {
    var now = new Date()
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

    for (let key in this.dayName) {
      this.dayName[key] = `${firstDay}<br/>${this.dayName[key]}`
      firstDay++
    }
    this.dayName.mon = month + '/' + this.dayName.mon
  }
}
</script>
