/**
 * 일반적인 옵저버 형태를 말한다.
 * 누가 구독해주지 않으면 데이터를 배출해주지 않는다.
 * 일반적인 웹 요청, 데이터베이스 쿼리 등이 사용되며 내가 요청하면 결과를 받는 과정을 거친다.
 * 처음부터 발행하는 것을 기본으로 한다.
 *
 * Cold Observable은 VOD로 설명할 수 있을 것 같습니다.
 * 언제부터 시청을 하더라도 처음부터 끝까지 원하는 부분을 시청하는 것이 가능하죠? 대표적으로 뭐 Netflix, 왓챠 같은 동영상 스트리밍 서비스들을 생각할 수 있습니다.
 *
 * Cold Observable에 대표적인 것으로는 RxSwift에서는 무엇이 있을까요?
 * Single, just, of 등등의 컴포넌트 들이 있을 것 같습니다. 음 이렇게 표현하기도 애매한데 보통 HTTP 요청으로
 * Observable을 생성해서 사용하는 경우가 가장 대표적인 예가 될 것 같습니다.
 * Cold Observable은 역시 상태를 저장한다기보다는 Observer들이 구독을 시작했을 때,
 * 처음부터 끝까지의 이벤트 스트림을 받아볼 수 있습니다. 즉, 모든 시점에 대한 스트림 이벤트를 받아볼 수 있습니다.
 * 이러한 Observable들은 Hot Observable과는 다르게 각 리소스에 대해 공유가 불가능하겠죠?~
 * 구독하는 즉시 이벤트가 방출되기 때문에 Observer들이 다 다른 인스턴스들을 공유하게 됩니다.
 */

import { ajax } from "rxjs/ajax";

const ajax$ = ajax<any>("https://random-data-api.com/api/name/random_name");

ajax$.subscribe({
  next: (data) => console.log("Sub 1:", data.response.first_name),
});

ajax$.subscribe({
  next: (data) => console.log("Sub 2:", data.response.first_name),
});

ajax$.subscribe({
  next: (data) => console.log("Sub 3:", data.response.first_name),
});

export {};
