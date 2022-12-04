import { of } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

of(1, 7, 3, 6, 2)
  .pipe(
    filter((value) => value > 5),
    map((value) => value * 2),
    tap({
      next: (value) => console.log("Spy:", value),
    }),
  )
  .subscribe((value) => console.log("Output:", value));
