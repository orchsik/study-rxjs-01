import { Observable, of } from "rxjs";
import { concatMap } from "rxjs/operators";

const source$ = new Observable((subscriber) => {
  setTimeout(() => subscriber.next("A"), 2000);
  setTimeout(() => subscriber.next("B"), 5000);
});

console.log("App has started");
source$.pipe(concatMap((value) => of(`${value}-1`, `${value}-2`))).subscribe({
  next: (value) => console.log(value),
});
