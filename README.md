# calender-my-tasks

Problem statement:
    With more responsibility comes more work and we need to manage/schedule the daily events to keep track of it and not miss out anything.

Solution for the statement:
    Designing a web application which can keep track of your events. It can add new events, modify existing events and deleting the events. It also provides the capability of searching for events based on title, description and date.

Architecture:
    It is MERN stack web application. The mongodb is pointing to cloud ATLAS.

Tradeoffs:
    - Not many trade-offs that i have made, but the one thing that i majorly avoided was to use a calender library itself which  actually would save alot of time but didn't make sense to have that extra dependency.
    - If i had more time i could go one level deeper displaying  the events on time period for each day. And also more filter and search capabilities.
    - Could have designed the backend architecture better with time.

Live demo:
    https://tasks-calender.herokuapp.com/

Pre-requisites:
    nodeJs

Development:
    1) Clone this repository
    2) Run npm install
    3) Open a command prompt and run 'npm run start:client'
    4) Open another command prompt and run 'npm run start:service'
    5) Frontend will run on port 5000 and backend will run on port 9091
    6) Hit http://localhost:5000/

Production:
    1) Run 'npm run build'
    2) Redirect to build/service and run 'node service.js'
    3) Hit http://localhost:9000/

