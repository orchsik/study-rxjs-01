import { filter, Observable } from "rxjs";

interface NewsItem {
  category: "Business" | "Sports";
  content: string;
}

const newsFeed$ = new Observable<NewsItem>((subscriber) => {
  setTimeout(
    () => subscriber.next({ category: "Business", content: "A" }),
    1_000,
  );
  setTimeout(
    () => subscriber.next({ category: "Sports", content: "B" }),
    2_000,
  );
  setTimeout(
    () => subscriber.next({ category: "Business", content: "C" }),
    3_000,
  );
  setTimeout(
    () => subscriber.next({ category: "Sports", content: "D" }),
    4_000,
  );
  setTimeout(
    () => subscriber.next({ category: "Business", content: "E" }),
    5_000,
  );
});

const sportsNewsFeed$ = newsFeed$.pipe(
  filter((value) => value.category === "Sports"),
);
sportsNewsFeed$.subscribe({
  next: (value) => console.log(value),
});
