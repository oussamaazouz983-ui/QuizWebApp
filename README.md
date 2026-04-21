# Quiz Web App

## Overview

This project is a simple **Quiz Web Application** built using **F# and WebSharper**.
It allows users to answer multiple-choice questions, track their score, and restart the quiz.

The purpose of this project is to demonstrate core concepts of functional programming in a web environment, including state management, event handling, and dynamic UI updates.

---

## Live Demo

This application runs locally.

Start the app using:

```
dotnet run
```

Then open in your browser:

```
http://localhost:33198/
```

*(Note: the port may change depending on your environment.)*

---

## Features

* Multiple-choice quiz questions
* Real-time score tracking
* Question progress indicator
* Restart quiz functionality
* Interactive button-based UI
* Clean and simple design

---

## Technologies Used

* F#
* WebSharper
* HTML
* CSS

---

## How to Run the Project

1. Open a terminal in the project folder
2. Run:

```
dotnet run
```

3. Open your browser and navigate to:

```
http://localhost:5000
```

*(or the port shown in the terminal output)*

---

## How It Works

* Questions are stored in a list
* Each question contains:

  * Text
  * Answer options
  * Correct answer index

The application:

* Displays one question at a time
* Updates the score when a correct answer is selected
* Automatically moves to the next question
* Displays the final score at the end

---

## Project Structure

* `Client.fs` → Main quiz logic and UI rendering
* `Startup.fs` → Web server configuration
* `wwwroot/index.html` → Entry point of the application
* `QuizWebApp.css` → Styling and layout

---

## Possible Improvements

* Add a timer for each question
* Add categories or filters
* Introduce difficulty levels
* Store high scores
* Improve animations and transitions

---

## Screenshot

<img width="1916" height="985" alt="image" src="https://github.com/user-attachments/assets/b165ea04-4b8f-43de-8954-018cddb6576c" />



## Conclusion

This project demonstrates how to build an interactive web application using F#.
It covers essential concepts such as user interaction, state management, and dynamic UI updates in a functional programming context.

---

