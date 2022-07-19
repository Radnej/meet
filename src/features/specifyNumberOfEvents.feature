Feature: Specify number of events

    Scenario: When user hasn’t specified a number, 8 is the default number
        Given the user hasn’t specified the number of events
        When the user begins their search
        Then 8 events are listed

    Scenario: User can change the number of events they want to see
        Given the user hasn't specified the number of events
        When the user has chosen how many events to see
        Then the number of displayed events matches the number chosen by user

  