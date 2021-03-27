<template>
  <section class="logos" data-invert>
    <h2 class="a11y">주제말씀</h2>
    <p class="reveal">
      또 네가 많은 증인 앞에서 내게 들은 바를 충성된 사람들에게 부탁하라. 그들이 또 다른 사람들을 가르칠 수 있으리라
    </p>
    <span class="reveal">디모데후서 2장 2절</span>
  </section>
</template>

<style lang="scss" scoped>
.logos {
  padding: 6rem 0;

  p {
    max-width: 748px;
    margin: 0 auto;
    padding: 0 3.8rem;
    color: $gray9;
    font-family: $serif;
    font-size: 18px;
    text-align: center;
    line-height: 1.6;

    @include icon(quotes) {
      display: block;
      margin-bottom: 6px;
      color: $gray2;
      font-size: 24px;
    }
  }

  span {
    display: block;
    margin-top: 18px;
    color: $gray5;
    font-size: 16px;
    text-align: center;
  }
}
</style>
