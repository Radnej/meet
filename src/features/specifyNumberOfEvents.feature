Feature: SPECIFY NUMBER OF EVENTS

Scenario : When user hasn’t specified a number, 15 is the default number
Given: The user hasn’t specified the number of events
When: The user begins their search
Then: 15 events are listed

Scenario: User can change the number of events they want to see
Given: The user has specified the number of events
When: The user has chosen how many events to see
Then: The number of displayed events matches the number chosen by user