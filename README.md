# Quiz Web App

## Overview

This project is a simple Quiz Web Application built using F# and WebSharper.
It allows users to answer multiple-choice questions, track their score, and restart the quiz.

The goal of this project is to demonstrate basic programming concepts such as state management, event handling, and UI interaction in a web environment.

---

## Features

- Multiple choice questions
- Score tracking
- Question progress indicator
- Restart quiz option
- Interactive buttons
- Clean and modern UI design

---

## Technologies Used

- F#
- WebSharper
- HTML
- CSS

---

## How to Run the Project

1. Open terminal in the project folder

2. Run the following command:

   dotnet run

3. Open your browser and go to:

   http://localhost:5000
   (or the port shown in the terminal)

---

## How It Works

- Questions are stored in a list

- Each question has:
  - Text
  - Answer options
  - Correct answer index

- The app:
  - Displays one question at a time
  - Updates score when correct answer is selected
  - Moves to the next question
  - Shows final result at the end

---

## Project Structure

- Client.fs → Main logic of the quiz
- Startup.fs → Web server configuration
- index.html → Web page structure
- QuizWebApp.css → Styling and UI

---

## Possible Improvements

- Add timer for each question
- Add categories
- Add difficulty levels
- Store high scores
- Add animations

---

## Conclusion

This project helped me understand how to build an interactive web application using F#.
It covers core concepts like user interaction, dynamic UI updates, and basic application structure.

---
