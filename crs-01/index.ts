import { name$, storeDataOnServer, storeDataOnServerError } from "./external";

// name$.subscribe((value) => console.log(value));

// storeDataOnServer("Some value").subscribe((value) => console.log(value));

// storeDataOnServerError("Some value").subscribe(
//   (value) => console.log(value),
//   (err) => console.log("Error when saving: ", err.message)
// );

storeDataOnServerError("Some value").subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log("Error when saving: ", err.message),
});
