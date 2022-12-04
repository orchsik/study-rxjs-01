import { from } from "rxjs";

const somePromise = new Promise((res, rej) => {
  // res("Resolved!");
  rej(Error("Rejected!"));
});

const observalbeFromPromise$ = from(somePromise);

observalbeFromPromise$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed"),
  error: (err) => console.error(err.message),
});
