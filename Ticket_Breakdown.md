# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
1. create API contracts for adding agent / deleting agent for facilities
    - API contract will help UI and backend team work independently. Avoiding delay due to dependencies
    - helps in the documentation as well 
2. UI changes for adding agent and deleting agent for the facilities
    - Design UI, which will facilitate adding custom agent id for any agent by the facilities 
3. Frontend design for the UI changes and API contract
    - Implement the UI changes and API contract

4. create the APIs for adding/deleting agent with custom agent IDs for the facilities based on API contract
    - Database schema changes to keep custom agent id information for a particular facility and agent
    - PS (NOT PART OF TICKET), making a new table with facilities_id, agent_id, custom_id , makes sense.  facilities_id + agent_id + custom_id forms primary key
    - write add agent API
    - write delete agent API

6. Modify getShiftsByFacility to include custom agent Id added by facilities in the shift list
    - which sends custom agent id to generate report instead of db agent id
    - (NOT PART OF TICKET) generateReport does not need to be modified, will just given new input which will have custom agent id instead of db agent id
7. Document the changes 