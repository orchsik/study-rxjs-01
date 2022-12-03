// 2초마다 증가시켜
// 시작하고 7초후에 멈춰.

import { Observable } from "rxjs";

const interval$ = new Observable<number>((subscriber) => {
  let cnt = 1;
  const intervalId = setInterval(() => {
    console.log("Emitted", cnt);
    subscriber.next(cnt++);
  }, 2_000);

  return () => {
    clearInterval(intervalId);
    console.log("Teardown");
  };
});

console.log("Before subscribe.");
const subscription = interval$.subscribe({
  next: (value) => console.log(value),
});
console.log("After subscribe.");

setTimeout(() => {
  console.log("Unsubscribe");
  subscription.unsubscribe();
}, 7_000);
