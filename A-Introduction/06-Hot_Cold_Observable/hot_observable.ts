/**
 *
 * 구독자의 존재 여부와 상관없이 데이터를 배출하는 Observable 이다.
 * 그래서 여러 구독자에 선택적으로 고려가 가능하다.
 * 구독 시점으로부터 발행하는 값을 받는 걸 기본으로 한다.
 * 마우스 이벤트, 키보드 이벤트, 시스템 이벤트 등이 주로 사용된다.
 * 멀티캐스팅도 포함된다.
 *
 * 가장 대표적으로 Hot Observable을 설명하는 개념은 실시간 Live Streaming 방송으로 들 수 있겠는데요.
 * 여러분이 언제든 방송에 입장하게 되면 방송이 처음에 시작됐을 때부터가 아닌 현재 방송중인 시점부터 방송을 받아볼 수 있게되죠? (그러니깐 본방사수를 하겠죠..?!)
 *
 * Hot Observable에 대표적인 것으로는 RxSwift에서는 무엇이 있을까요..?
 * 제가 생각했을 때는 Timer, Subject, UIEvent 같은 것들을 생각할 수 있을 것 같습니다.
 *
 * 이러한 것들은 상태를 저장하고 있고 구독하는 순간에 현재의 상태에 대해 이벤트를 방출해주는 것들이죠.
 * 즉, 이전에 방출했던 데이터에 대해서는 현재 구독을 시작한 Observer들은 받아볼 수 없습니다.
 * 그리고 이러한 Observable의 특징으로는 여러 Observer들이 동일한 Observable을 구독하고 리소스를 공유하는 것이 가능해집니다.
 * UI에 어떤 요소를 표현해야할 때 적절하게 사용할 수 있는 Observable이 됩니다..!!
 */

import { Observable } from "rxjs";

const helloButton = document.querySelector("button#hello");

const helloBtnClick$ = new Observable<MouseEvent>((subscriber) => {
  helloButton.addEventListener("click", (event: MouseEvent) => {
    subscriber.next(event);
  });
});

console.log("Before subscription 1");
helloBtnClick$.subscribe({
  next: (event) => console.log("Sub 1:", event.type, event.x, event.y),
});
console.log("After subscription 1");

setTimeout(() => {
  console.log("Before subscription 2");
  helloBtnClick$.subscribe({
    next: (event) => console.log("Sub 2:", event.type, event.x, event.y),
  });
  console.log("After subscription 2");
}, 5_000);
