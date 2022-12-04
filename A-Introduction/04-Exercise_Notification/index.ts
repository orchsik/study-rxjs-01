import { Observable } from "rxjs";

const observable$ = new Observable<string>((subscriber) => {
  console.log("Observable executed");
  subscriber.next("Alice");
  subscriber.next("Ben");
  setTimeout(() => subscriber.error(new Error("Failure")), 2_000);
  setTimeout(() => {
    subscriber.next("Charile");
    subscriber.complete();
  }, 4_000);

  return () => {
    console.log("Teardown");
  };
});

console.log("Before subscribe");
const subscription = observable$.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.error(err.message),
  complete: () => console.log("Completed"),
});
console.log("After subscribe");
