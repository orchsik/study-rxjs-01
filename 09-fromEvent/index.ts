import { fromEvent, Observable } from "rxjs";

const triggerButton = document.querySelector("button#trigger");

// const triggerClick$ = new Observable<MouseEvent>((subscriber) => {
//   const handleClick = (event) => {
//     console.log("Emmited Listner");
//     subscriber.next(event);
//   };
//   triggerButton.addEventListener("click", handleClick);

//   return () => {
//     triggerButton.removeEventListener("click", handleClick);
//   };
// });

const triggerClick$ = fromEvent<MouseEvent>(triggerButton, "click");

const subscription = triggerClick$.subscribe({
  next: (event) => console.log(event.type, event.x, event.y),
});

setTimeout(() => {
  console.log("Unsubscribe");
  subscription.unsubscribe();
}, 5_000);
