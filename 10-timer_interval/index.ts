import { Observable, Observer, timer, interval } from "rxjs";

console.log("App started");

// const subscription = timer(2000).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log("Completed"),
// });

const timer$ = new Observable((subscriber) => {
  const timeoutId = setTimeout(() => {
    console.log("SetTimeout");
    subscriber.next(0);
    subscriber.complete();
  }, 2_000);

  return () => {
    clearTimeout(timeoutId);
  };
});

const subscription = timer$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed"),
});

setTimeout(() => {
  console.log("Unsubscribe");
  subscription.unsubscribe();
}, 1_000);
