import { Observable } from "rxjs";

const observable$ = new Observable<string>((subscriber) => {
  console.log("Observable executed.");
  subscriber.next("Alice");
  setTimeout(() => subscriber.next("Ben"), 2_000);
  setTimeout(() => subscriber.next("Charlie"), 4_000);
});

console.log("Subscription 1 starts");
observable$.subscribe((value) => console.log(`Subscription 1: ${value}`));

setTimeout(() => {
  console.log("Subscription 2 starts");
  observable$.subscribe((value) => console.log(`Subscription 2: ${value}`));
}, 1_000);
