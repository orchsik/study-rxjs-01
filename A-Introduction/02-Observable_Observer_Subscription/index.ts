import { Observable } from "rxjs";

const observable$ = new Observable<string>((subscriber) => {
  console.log("Observable executed.");
  subscriber.next("Alice");
  setTimeout(() => subscriber.next("Ben"), 2_000);
  setTimeout(() => subscriber.next("Charlie"), 4_000);
});

const observer = (value) => console.log(value);
const subscription = observable$.subscribe(observer);

setTimeout(() => {
  console.log("Unsubscribe");
  subscription.unsubscribe();
}, 3_000);
