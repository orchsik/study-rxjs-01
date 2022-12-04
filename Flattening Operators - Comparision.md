### concatmap
  * Queues / Buffers
  * Memory leaks easy to notice
  * Values handled one by one
  * Possible delayed reactions

### switchMap
  * Cancels / Unsubscribes
  * Memory leaks not dangerous
  * Quick reaction to new source values
  * Order mostly safe

### mergeMap
  * Concurrent
  * Memory leaks hard to notice
  * No definite order
  * 