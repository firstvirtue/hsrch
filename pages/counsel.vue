<template>
  <div class="counsel" data-invert>
    <div class="wrapper wrapper--m-p">

      <form @submit.prevent="onSubmit">
        <h1 class="a11y">신앙 상담</h1>

        <h2 class="counsel__title"><i>1.</i> 상담할 내용을 자세히 적어주세요.</h2>
        <v-container fluid>
          <v-row>
            <v-col>
              <v-textarea
                name="counsel-content"
                label="상담내용"
                v-model="counsel.contents"
                hint="상담내용은 비밀입니다. 안심하세요:)"
                counter
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <h2 class="counsel__title"><i>2.</i> 상담에 필요한 몇 가지 질문드려요.</h2>
        <h3 class="counsel__sub-title">신앙생활 하신지 얼마나 되셨나요?</h3>
        <v-slider
          v-model="counsel.experienceLevel"
          :tick-labels="counsel.experienceLabel"
          :max="3"
          step="1"
          ticks="always"
          tick-size="4"></v-slider>

        <h3 class="counsel__sub-title">현재 교회에 출석하고 계신가요?</h3>
        <v-radio-group v-model="counsel.isAttendance" row>
          <v-radio
            :key="1"
            :label="`네`"
            :value="true"
          ></v-radio>
          <v-radio
            :key="0"
            :label="`아니오`"
            :value="false"
          ></v-radio>
        </v-radio-group>

        <transition name="fade">
        <div v-show="!counsel.isAttendance">
          <h3 class="counsel__sub-title">교회에 출석하시지 않은 기간을 알 수 있을까요?</h3>
          <v-slider
            v-model="counsel.nonattendancePeriodLevel"
            :tick-labels="counsel.nonattendancePeriodLabel"
            :max="3"
            step="1"
            ticks="always"
            tick-size="4"></v-slider>
        </div>
        </transition>

        <h2 class="counsel__title"><i>3.</i> 저희가 연락 드릴 수 있는 연락처와 이름을 적어주세요.</h2>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              label="연락처"
              v-model="counsel.contact"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              label="이름"
              v-model="counsel.username"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="func">
          <v-btn block type="submit">보내기</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" src="~/assets/scss/page/_counsel.scss"></style>

<script>
  export default {
    data() {
      return {
        counsel: {
          contents: '',
          experienceLabel: [
            '없음',
            '2년 미만',
            '5년 미만',
            '10년 이상'
          ],
          experienceLevel: 0,
          isAttendance: false,
          nonattendancePeriodLabel: [
            '1년 미만',
            '3년 이상',
            '5년 이상',
            '10년 이상'
          ],
          nonattendancePeriodLevel: 0,
          contact: '',
          username: ''
        }
      }
    },
    methods: {
      async onSubmit() {

        console.log(this.counsel);
      }
    }
  }
</script>
