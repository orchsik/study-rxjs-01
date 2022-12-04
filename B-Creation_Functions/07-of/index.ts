import { Observable, of } from "rxjs";

// of("Alice", "Ben", "Charlie").subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log("Compelete"),
// });

// const observable$ = new Observable<string>((subscriber) => {
//   subscriber.next("Alice");
//   subscriber.next("Ben");
//   subscriber.next("Charlie");
//   subscriber.complete();
// });
// observable$.subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log("Complete"),
// });

const ownOf = <T>(...args: T[]): Observable<T> => {
  return new Observable((subscriber) => {
    args.forEach((value) => {
      subscriber.next(value);
    });
    subscriber.complete();
  });
};
ownOf("Alice", "Ben", "Charlie").subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Compelete"),
});
