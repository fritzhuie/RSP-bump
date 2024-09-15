# Bump It Up! 

![image](https://github.com/fritzhuie/bump-it-frontend/assets/150071971/82806cbd-a95e-4943-b987-6aaf75109f25)

Welcome to Bump It Up - a bump activated Rock, Paper, Scissors game collaborating with other users

## Wireframe & Component Heirarchy
![image](https://github.com/fritzhuie/bump-it-frontend/assets/150071971/878040ac-3d7b-48cb-917f-39d897649466)

## ERD 
![image](https://github.com/fritzhuie/bump-it-frontend/assets/150071971/179f1b74-0580-4c10-b31c-edad6ed16832)

## Trello Link 
https://trello.com/b/g4yTFtne/bump-it-up-sorry-joe-budden

## Tools Used 
React, Django, Python, Javascript, CSS 

## User Stories 

1. **Account Signup**: 
   - As a user, I want to sign into/log into the Bump It App.

2. **User Profile**: 
   - As a user, I want to edit/save/delete my user profile 

3. **Game Landing Page**: 
   - As a user, I want to match with a nearby second user through the build in accelerometer within Bump It Up.
   - As a user, I want to play with that nearby second user that I match with

## Future Ice Box 

1. **Achievements**
   - As a user, I want to see my achievements, wins/losses
  
2. **Additional mini games**
   - As a user, I want to play additional games with other users I connect with

# User Routes

**[Backend](https://github.com/Shyan-spec/bump-it-backend)**

| Category        | Action          | Method | Path                        | Type       | Parameters                                          |
|-----------------|-----------------|--------|-----------------------------|------------|----------------------------------------------------|
| Authentication  | Login           | POST   | `/users/login`              | JSON       | `email`, `password`                                 |
| Authentication  | Signup          | POST   | `/users/register`           | JSON       | `email`, `password`, `name`                         |
| User Profile    | Change Avatar   | PUT    | `/users/profile`            | JSON       | `url`                                               |
| User Profile    | View Profile    | GET    | `/users/profile/{userId}`   | JSON       | `userId` (optional, path parameter)                 |
| User Profile    | Delete Profile  | DELETE | `/users/token/refresh`      | JSON       | `userId`                                             
| Game Mechanics  | Bump Event      | POST   | `/game/bump`                | JSON       | `timestamp` (`Date`), `choice` (`rock`, `scissor`, `paper`) |
| Game Mechanics  | View Result     | GET    | `/game/result/`             | JSON       | `matchId` (path parameter)                          |
| Game Mechanics  | View Result     | GET    | `/game/result/{matchId}`    | JSON       | `matchId` (path parameter)                          |





<img width="500" alt="qr" src="https://github.com/fritzhuie/bump-it-frontend/assets/1472318/77fb688c-ed51-4aa8-8ed6-a46e2f127bf0">








