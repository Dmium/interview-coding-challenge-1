# TODO and Notes

## Running the project

I have included a readme in the daily-goal-tracker folder that details how to run the project
along with noting caveats around my implementation approach

## Notes

Happy to discuss in interview but honestly I'm not entirely happy with the approach I took for structuring
goals in this project. I tried to go for a more functional style than my usual hexagonal class based model.
In the end this approach (as most javascript approaches tend to) lead to me sitting half way between
functional style and dealing with javascript oddities that mutate variables by design.

## TODO

If I were to continue this project in it's current form I'd switch to using classes and a more hexagonal
approach. Especially as this would allow the "repo" to be dependency injected to switch from local storage.

If I were to do this project in production I'd want to be stricter on keeping business logic away from presentation areas. I'd also ofc move the entirety of the business logic into either an API service or in the Phoenix equivilent into contexts.
