// Mike is from New Delhi and likes to eat pasta.
import { forkJoin, Observable } from "rxjs";

import { ajax } from "rxjs/ajax";

const randomName$ = ajax<any>(
  "https://random-data-api.com/api/name/random_name",
);
const randomNation$ = ajax<any>(
  "https://random-data-api.com/api/nation/random_nation",
);
const randomFood$ = ajax<any>(
  "https://random-data-api.com/api/food/random_food",
);
const error$ = new Observable((subscriber) => {
  subscriber.error(new Error("Faiilure"));
});

// randomName$.subscribe((ajaxResponse) =>
//   console.log(ajaxResponse.response.first_name),
// );
// randomNation$.subscribe((ajaxResponse) =>
//   console.log(ajaxResponse.response.capital),
// );
// randomFood$.subscribe((ajaxResponse) =>
//   console.log(ajaxResponse.response.dish),
// );

forkJoin([
  randomName$,
  randomNation$,
  randomFood$,
  // , error$
]).subscribe({
  next: ([nameAjax, nationAjax, foodAjax]) =>
    console.log(
      `${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes to eat ${foodAjax.response.dish}.`,
    ),
  error: (err) => console.error(err.message),
});
