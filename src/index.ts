import { EMPTY, fromEvent, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, concatMap, debounceTime, map } from "rxjs/operators";

const endpointInput: HTMLInputElement =
  document.querySelector("input#endpoint");

const fetchButton = document.querySelector("button#fetch");

fromEvent(fetchButton, "click")
  .pipe(
    debounceTime(1000),
    map(() => endpointInput.value),
    concatMap((value) =>
      ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
        catchError((err) => {
          return EMPTY;
          // return of(`Could not fetch data : ${err}`);
        }),
      ),
    ),
    // catchError((err) => EMPTY), // 여기에서 하면 main Observable 종료되버린다.
  )
  .subscribe({
    next: (value) => console.log("[next]", value),
    error: (err) => console.log("[error]", err.message),
    complete: () => console.log("[complete]"),
  });
