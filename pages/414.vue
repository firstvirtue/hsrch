<template>
  <main class="main">
    <div class="list view" data-invert>
      <h1 class="h2 title">414생활관</h1>

      <Logos/>

      <section class="section">
        <div class="wrapper wrapper--m-p">
          <!-- <p>
            414란 4세부터 14세로 대표되는 <strong>다음세대</strong>를 의미합니다.<br>
            생활관에서 아이들은 함께 또 홀로 학습하며 인성과 신앙을 훈련받게 됩니다.
          </p> -->

          <p>
            414생활관은 자녀들이 매일 교회에서 함께 생활하며 <strong>메타인지</strong> 자기주도 학습을 하는 신앙과 삶의 터전입니다.<br>
            <a href="#" class="link">414생활관 자세히보기</a>
          </p>
        </div>
      </section>

      <section class="section">
        <div class="wrapper wrapper--m-p">
          <h2 class="section__title">메타인지</h2>
          <p>
            메타인지란 인지에 대한 인지, 즉 내가 무엇을 알고 모르는지에 대해 아는 것입니다. 어떤 사물과 그에 대한 자기 생각을 스스로 판단할 수 있는 능력입니다.

            414생활관은 이 능력을 배양하여 기존 주입식 교육과 사교육으로 도달할 수 없는 학습 성취를 목표로 하는 교육의 대안입니다.
          </p>
        </div>
      </section>

      <section class="section section--meta">
        <div class="wrapper wrapper--m-p">
          <h2 class="section__title">414 학습 전략</h2>
          <p>414생활관은 인출, 정교화, 반추의 과정을 통해 메타인지를 배양합니다.</p>

          <div class="meta-cognition">
            <svg id="bg-svg">
              <line class="bg-line" x1="1" y1="1" x2="100" y2="100"/>
              <line class="bg-line" x1="1" y1="1" x2="100" y2="100"/>
            </svg>

            <ul class="meta-cognition__list">
              <!-- [TODO] 스르륵 점이 퍼지며 연결되어 나오는 모션 -->
              <!-- https://codepen.io/ejones/pen/omBIt -->
              <li class="meta-cognition__item">
                <span>인출</span>
                <small>교재와 필기의 도움없이 기억에서 정보를 꺼내 나열해 보기.</small>
              </li>
              <li class="meta-cognition__item">
                <span>정교화</span>
                <small>기존의 지식과 새로운 지식을 서로 연결해 보기.</small>
              </li>
              <li class="meta-cognition__item">
                <span>반추</span>
                <small>인출 + 정교화 과정을 돌이켜보며 만들어진 지식을 다른 사람에게 설명할 수 있을 정도까지 나만의 지식으로 만듦.</small>
              </li>
            </ul>
          </div>

          <div class="desc">
            <strong>메타인지란 내가 무엇을 알고 모르는지 스스로 생각하는 습관을 기르는 것입니다.</strong>
            <br>
            <small>414생활관은 구체적이고 실천적인 4가지 방법을 통해 아이들이 스스로 생각하는 습관을 훈련합니다.</small>
          </div>

          <ul class="feature">
            <li class="feature__item">
              <div class="feature__header">
                <img class="feature__icon" src="~/assets/image/414/icon-4.svg" alt="">
                <strong>복습노트</strong>
              </div>
              <p>
                열심히 공부해도 성적이 떨어지는 이유는 메타인지 과정이 빠졌기 때문입니다. 메타인지 과정은 인출을 통하여 시작됩니다. 이 메타인지와 자기주도 학습의 시작이 되는 인출은 복습노트로 훈련됩니다.<br>
                매일매일 수업내용을 복습노트에 써봄으로 수업 자세와 자신이 무엇을 모르고 무엇을 공부해야 하는지를 알게하여 자기주도적 학습 습관을 길러줍니다.
              </p>
            </li>
            <li class="feature__item">
              <div class="feature__header">
                <img class="feature__icon" src="~/assets/image/414/icon-2.svg" alt="">
                <strong>독서훈련</strong>
              </div>
              <p>
                우리나라 아이들은 생각없이 줄거리만 읽는 거짓독서 습관에 빠져있습니다.<br>
                414생활관은 바른 독서 훈련으로 슬로우 리딩과 바른 한글 교육을 합니다. 읽기만 잘하는 것이 아닌 생각하는 한글을 배우고 책을 읽음으로써 메타인지 자기주도 학습의 가장 중요한 기초를 세워 줍니다.
              </p>
            </li>
            <li class="feature__item">
              <div class="feature__header">
                <img class="feature__icon" src="~/assets/image/414/icon-1.svg" alt="">
                <strong>수학 자기주도학습</strong>
              </div>
              <p>
                학원에서 몇 번의 문제풀이로 공부하는 아이들은 수학을 포기하게 됩니다. 스스로 공부하여 깊이 아는 것이 아니라 단순이해하고 기억한 것으로만 습득하기 때문입니다. 414생활관 에서는 깊고 천천히 수학 교과서를 읽고 알게 한 후 고차원의 문제들을 스스로 해결하는 훈련을 합니다. 7세부터 훈련받은 아이들은 학년이 올라갈수록 자연스럽게 어려운 수학까지 해결하게 됩니다.
              </p>
            </li>
            <li class="feature__item">
              <div class="feature__header">
                <img class="feature__icon" src="~/assets/image/414/icon-3.svg" alt="">
                <strong>영어 자기주도학습</strong>
              </div>
              <p>
                영어 공부를 많이 하는 아이들도 영어가 늘지 않는 이유는 배운 영어가 망각되기 때문입니다. 망각의 이유는 영어를 쓰지않기 때문입니다.<br>
                우리는 아이들에게 매일 영어 통문장 암송을 시킵니다. 이것이 영어를 쓸 일이 없는 아이들에게 해주는 최고의 방법입니다.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="wrapper wrapper--m-p">
          <h2 class="section__title">414 얼굴들</h2>

          <p>
            나는 심었고 아볼로는 물을 주었으되 오직 하나님은 자라나게 하셨나니
            <small>고린도전서 3장 6절</small>
          </p>

          414생활관이 준비하는 모든 과정 앞에 하나님의 돌보심과 자라나게 하심을 믿습니다. 모든 교육 과정은 영적 양육과 함께 합니다.

          <ul>
            <li>
              사진 1
            </li>
            <li>
              사진 2
            </li>
            <li>
              사진 3
            </li>
          </ul>

          아이들의 인성과 지성 그리고 영성이 자라나 이웃을 섬기고 돌보는 한 사람으로 자라기를 기도합니다.
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_view.scss"></style>

<script>
import Logos from '~/components/Logos.vue';
import gsap from 'gsap';

export default {
  components: {
    Logos,
  },
  mounted() {

    const svg = document.querySelector('#bg-svg');
    const svgRect = svg.getBoundingClientRect();


    const lines = document.querySelectorAll('.bg-line');
    const items = document.querySelectorAll('.meta-cognition__item');

    function animate() {
      let currentRect = { x: 0, y: 0 };
      items.forEach((el, i) => {
        const rect = { x: el.offsetLeft, y: el.offsetTop };

        if( i !== 0) {
          lines[i-1].setAttribute(`x1`, Math.floor(currentRect.x));
          lines[i-1].setAttribute(`y1`, Math.floor(currentRect.y));
          lines[i-1].setAttribute(`x2`, Math.floor(rect.x));
          lines[i-1].setAttribute(`y2`, Math.floor(rect.y));
        }

        currentRect = {x: rect.x, y: rect.y};
      })

      requestAnimationFrame(animate);
    }

    animate();

    const elem = document.querySelector('.meta-cognition');
    gsap.set('.meta-cognition__item', { opacity: 0 });

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          // gsap.to(elem, options.dur, { opacity: 1, y: 0, delay: options.delay });

          // gsap.to('.meta-cognition__item:nth-child(1)', opacity:)
          const tl = gsap.timeline();
          tl
            .to('.meta-cognition__item:nth-child(1)', { opacity: 1, duration: 0.5,
              onStart: () => {
                document.querySelector('.meta-cognition__item:nth-child(1)').classList.add('is-active');
              },
              onComplete: () => {
                document.querySelector('.bg-line:nth-child(1)').classList.add('is-active');
              },
            })
            .to('.meta-cognition__item:nth-child(2)', { opacity: 1, duration: 0.5, delay: 0.5,
              onStart: () => {
                document.querySelector('.meta-cognition__item:nth-child(2)').classList.add('is-active');
              },
              onComplete: () => {
                document.querySelector('.bg-line:nth-child(2)').classList.add('is-active');
              },
            })
            .to('.meta-cognition__item:nth-child(3)', { opacity: 1, duration: 0.5, delay: 0.5,
              onStart: () => {
                document.querySelector('.meta-cognition__item:nth-child(3)').classList.add('is-active');
              },
            });


        }
      })
    }, {
      threshold: 1,
    });

    io.observe(elem);

  }
}
</script>
