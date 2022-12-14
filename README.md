0. Run `tsc --init`. This create a tsconfig.json file.
1. Run `yarn add`. This will install all needed dependencies.
2. Run `yarn start`. This will run the dev server.
3. Open your browser and navigate to the provided URL (default: `http://localhost:8080/`).
4. Open the Console/DevTools in your browser to see the `console.log`s.
5. Keep modifying the `src/index.html` and `src/index.ts` files to adjust the code you want to run. **Saving these files will automatically reload the page.**
6. Enjoy!


---

## Observable
* We need to subscribe to an Observable to run its logic.
* When we subscribe a few tiems to the same Observable: The logic of the Observable will be run independetly for each new Subscription.
* What happens each time you subscribe to an Observable?
  * The Observable's logic is executed.
  * The provided Observer is wrapped into a Subscriber object and passed to the Observable's logic.
* Wen we have an Observable which never ends and keeps emitting the values, how can we make it stop?
  * We can unsbscribe.

## Marbles
* What is the 'next' notification used for?
  * [O] emitting a value
  * [-] signaling that the Observable has completed
* How many values can an Observable emit during the Subscription's lifetime?
  * 0 ~ more
* The error notification signals an issue with the source and causes the Subscription to end. 
  Observable can't emit data anymore.
* What is the purpose of the complete notification?
  * to signal that the Observable has no more data to emit.
* Choose which doesn't apply to both - the error and complete notifications:
  * [O] can carry a playload with it
  * [-] can be emitted only once during the Subscription lifetime
  * [-] ends the Subscription
  * [-] all answers are true for both notifications type

## Subscription Lifecycle
* What are the ways in which a Subscription can end?
  * It can be ended by the Observable's logic by emitting an error or complete notification.
  * It can be ended by oure code by unsubcribing.
* What is the purpose of the Teardown logic?
  * [O] It can be used to perform a clean-up or cancellation if the Observable initialized some resources.
  * [-] It is used to send a special signal to RxJS that the Subscription has ended.
* Let's assume that an Observable has some Teardown logic provided. When will it be executed?
  * [O] Whenever the Subscription ends.
  * [-] Only when the Observable emits a complete or error notification.
  * [-] Only after we unsubscribe while the Subscriptions is still active.

## Hot vs Cold Observable
* Cold Observable: Each time we subscribe, the Observable emits the same set of values instantly and then completes. Which behavior is it?
* Cold Observable: We have an Observable which sends an HTTP request to an external server each time we subscribe to it.
* Hot Observable: We have an Observable which emits an event each time the user resizes the browser's window. 
* can change its behavior, for example it can be Cold at first and then become Hot

## of, from
* If you'd create an Observable using `of('Alice', 'Ben', 'Charlie')` and then subscribe to it, how many notifications will be emitted immediately?
  * There will be 3 next notifications (one for each provided value) and 1 complete notification.
* What can be the source provided to the `from` function as an arguments?
  * Arrray, Promise, Observable - All are correct.

## fromEvent, timer, interval
* Each time we subscribe, an Observable created using the `fromEvent` function uses things like
  addEvenlistener to connect to an already existing event source. This means that for each subscription a new
  connection to the same external source will be made, so all Subscriptions will in fact have the same source of
  emissions. This is what describes this Observable as hot.
* Should we unsubscribe to avoid memory leaks from the Observable created using the `timer(2000)` call
  after it emits a value?
  * No, at this point we're sure that the Observable has completed, so there's no nedd to unsubscribe.
* Which are the possible ways of ending a Subscription made to an Observable crated using the `interval(1000)` call?
  * [O] The interval function in that configuration creates an Observable which never ends. It'd keep on emtting the
    values forever. We need to unsubcribe to stop the emissions.
  * [O] We can unsubcribe.
  * [-] We can wailt some time for it to complete.

## forkJoin, combineLatest
* An Observable crated using the `forkjoin` function needs all source Observables to complete before emitting something.
  Also, `combinelatest` needs at least one value from each source before it emits something.
  They accept an array of Observables as input.
* What would an Observable created using `forkJoin([of('ABC'), timer(1000)])` emit once we subscribe to it?
  * It'd emit an array with the value 'ABC' and the value 0, one second after subscribing.
* What would an Observable created using `forkJoin([of('ABC'), interval(1000)])` emit once we subscribe to it?
  * it won't emit anything as the second provided Observable never completes.
* What would an Observable created using `combineLatest([of('ABC', interval(1000))])` emit once we subscribe to it?
  * It'd emit an array with the value 'ABC' and the value of the interval counter every second.

## Pipeable Operators
* Applying a Pipeable Operator creates a new Observable with some additional logic.
* Which can be accomplished by using the Pipeable Operators?
  * mapping the values of next notifications
  * debouncing the values in time
  * providing a fallback Observable in case of an error
* How does the `tap` operator transform the notifications?
  * It doesn't transform notifications of any type.
  * The tap operator just runs some code with side-effects without altering the notifications in the Observable stream.
* if we use a `catchError` operator applied like this: `catchError(() => fallbackObservable$)`
  , when will it subscribe to the `fallbackObservable$`?
  * [O]Immediately when we subscribe to the main/outer Observalbe.
  * [-] When the main/outer Observable will emit an error.

## Flattening Operators
* Which can be achieved by using a Flattening Operator such as concat/switch/mergeMap?
  * Storing some date on a server, each time the user changes some setting.
  * Fetching autocomplete ideas based on the users's search input query.
  * Mapping each emmited value to new Observable.
* How does a Flattening Operator such as concat/switch/mergeMap work?
  * It maps each value into a new Observable, creates a Subscription to this Observable and then
    passes the values emitted by it to the output.
* Which notifications coming from the inner Observable does a Flattening Operator pass to the output?
  * next and error notifications
* What will happen if the Inner Observable passed to a concat/switch/mergeMap operator emits an error?
  * This error will be passed to the output and the Outer Subscription will error as well.
* The concatMap operator waits until the Subscription handling the previous value completes before starting a new one.
* The switchMap operator cancels the previous Inner Subscription and starts a new one right away.
* The mergeMap operator concurrently handles all the values.

## Subjects
* It allows us to call the `next` method on it to emit value to all active subscriptions.
* It can be passed as an Observer to the `subscribe` method.
* We can subscribe to it the same way we can to regular Observables.
* We can mix it together with other Observables when using combineLastest.
* Which would be a better choice if you'd like to be able to store some value and react to its changes?
  * BehaviorSubject
* Which would be a better choice to emit events which would trigger a refresh of the data?
  * Subject
* Which is true for a BehaviorSubject?
  * You ALWAYS need to provide some inital value when creating a new BehaviorSubject.
  