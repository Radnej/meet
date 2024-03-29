Feature: show/hide an event's details 

    Scenario: An event element is collapsed by default
        Given the user is viewing the list of events
        When the user has not clicked on event element
        Then the event details are collapsed

    Scenario: User can expand an event to see its details
        Given the user is viewing the list of events
        When the user has clicked on event element
        Then event details are expanded

    Scenario: User can collapse an event to hide its details
        Given the user did not collapse an event element
        When the user click again on the show details button
        Then the event details can be collapsed
      