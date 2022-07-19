Feature: SHOW/HIDE AN EVENT'S DETAILS

Scenario : An event element is collapsed by default
Given: The user is viewing the list of events
When: The user hasn’t clicked on event element
Then: The event details are collapsed

Scenario : User can expand an event to see its details
Given: The user is viewing the list of events
When: The user has clicked on event element
Then: The event details are expanded

Scenario : User can collapse an event to hide its details
Given: The user no longer wants to see the events details
When: The user clicks on the details
Then: The event details can be collapsed