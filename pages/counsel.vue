<template>
  <div class="counsel" data-invert>
    <div class="wrapper wrapper--m-p">

      <h1 class="a11y">신앙 상담</h1>
      <section class="counsel">
        <h2 class="counsel__title"><i>1.</i> 상담할 내용을 자세히 적어주세요.</h2>
        <v-textarea
          name="input-7-1"
          label="상담내용"
          value=""
          hint="Hint text"
          counter
        ></v-textarea>
      </section>

      <section class="counsel">
        <h2 class="counsel__title"><i>2.</i> 상담에 필요한 몇 가지 질문드려요.</h2>
        <h3 class="counsel__sub-title">신앙생활 하신지 얼마나 되셨나요?</h3>
        <v-slider
          v-model="fruits"
          :tick-labels="ticksLabels"
          :max="3"
          step="1"
          ticks="always"
          tick-size="4"></v-slider>

          <h3>혹시 현재 교회에 출석하고 계신가요?</h3>
          <v-switch v-model="mandatory" class="mx-2" label="아니오"></v-switch>

          <h3 class="counsel__sub-title">교회에 출석하시지 않은 기간을 알 수 있을까요?</h3>
          <v-slider
            v-model="fruits"
            :tick-labels="ticksLabels"
            :max="3"
            step="1"
            ticks="always"
            tick-size="4"></v-slider>
      </section>

      <section class="counsel">
        <h2 class="counsel__title"><i>3.</i> 연락드릴 수 있는 이메일 또는 전화번호를 적어주세요.</h2>
        v-
      </section>
    </div>
  </div>
</template>

<style lang="scss" src="~/assets/scss/page/_counsel.scss"></style>

<script>
  export default {
  }
</script>
