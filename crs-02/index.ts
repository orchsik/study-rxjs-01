import { Observable } from "rxjs";

const observable$ = new Observable<string>((subscriber) => {
  console.log("Observable executed.");
  subscriber.next("Alice");
  setTimeout(() => subscriber.next("Ben"), 2_000);
  setTimeout(() => subscriber.next("Charlie"), 4_000);
});

const subscription = observable$.subscribe((value) => console.log(value));

setTimeout(() => {
  console.log("Unsubscribe");
  subscription.unsubscribe();
}, 3_000);
