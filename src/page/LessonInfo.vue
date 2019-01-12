<template>
  <div>
    <div class="nav" style="justify-content:space-between;align-items: center;">
      <router-link to='/schedule' tag='span' style='padding-left:10px;'> 返回 </router-link>
      <span>课程信息</span>
      <span style="padding-right:19px;">删除</span>
    </div>
    <div class="header" style="justify-content:space-between;">
      <p style="font-size:20px;padding:10px 10px;margin:0;">{{$route.params.lessonInfo.name}}</p>
    </div>
    <div class="content">
      <div class='item'>
        <span class='item-title'>教室</span>
        <span class='item-content'>{{$route.params.lessonInfo.room}}</span>
      </div>
      <div class='item'>
        <span class='item-title'>教师</span>
        <span class='item-content'>{{$route.params.lessonInfo.teacher}}</span>
      </div>
    </div>
  </div>
</template>
<style lang="sass">
@import "../style/scss/lessonInfo";
</style>
