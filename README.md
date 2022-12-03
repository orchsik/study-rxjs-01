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
