import { fromEvent, Subject } from "rxjs";
import { map } from "rxjs/operators";

const emitButton = document.querySelector("button#emit");
const inputElement: HTMLInputElement = document.querySelector("#value-input");
const subscribeButton = document.querySelector("button#subscribe");

const subject$ = new Subject<string>();

fromEvent(emitButton, "click")
  .pipe(map(() => inputElement.value))
  .subscribe(subject$);

fromEvent(subscribeButton, "click").subscribe(() => {
  console.log("New Subscription");
  subject$.subscribe({
    next: (value) => console.log(value),
  });
});
