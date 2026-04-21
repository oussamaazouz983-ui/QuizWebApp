namespace QuizWebApp

open WebSharper
open WebSharper.JavaScript
open System

[<JavaScript>]
module Client =

    type Question = {
        Text: string
        Answers: string list
        Correct: int
        Category: string
    }

    let allQuestions = [|
        { Text="2+2?"; Answers=["3";"4";"5";"6"]; Correct=1; Category="Math" }
        { Text="5*3?"; Answers=["10";"15";"20";"25"]; Correct=1; Category="Math" }
        { Text="10/2?"; Answers=["2";"3";"5";"6"]; Correct=2; Category="Math" }

        { Text="Capital of France?"; Answers=["Berlin";"Paris";"Rome";"Madrid"]; Correct=1; Category="Geography" }

        { Text="HTML stands for?"; Answers=["HyperText Markup Language";"HighText Machine Language";"None";"Tool"]; Correct=0; Category="Programming" }
        { Text="CSS used for?"; Answers=["Style";"Logic";"DB";"Server"]; Correct=0; Category="Programming" }

        { Text="Water formula?"; Answers=["H2O";"CO2";"O2";"NaCl"]; Correct=0; Category="Science" }
        { Text="Sun is?"; Answers=["Planet";"Star";"Moon";"Rock"]; Correct=1; Category="Science" }
        { Text="Largest planet?"; Answers=["Earth";"Mars";"Jupiter";"Venus"]; Correct=2; Category="Science" }
    |]

    let mutable questions = allQuestions
    let mutable index = 0
    let mutable score = 0
    let mutable lastResult = ""

    let root () = JS.Document.GetElementById("main")

    let clear () =
        root().InnerHTML <- ""

    let createButton txt onClick =
        let btn = JS.Document.CreateElement("button")
        btn.TextContent <- txt
        btn.SetAttribute("style", "display:block;margin:5px;padding:10px;width:100%")
        btn.AddEventListener("click", Action(fun () -> onClick()))
        btn

    let filterQuestions category =
        if category = "All" then allQuestions
        else allQuestions |> Array.filter (fun q -> q.Category = category)

    let rec showQuestion () =
        clear()

        if index >= questions.Length then
            showResult()
        else
            let q = questions.[index]

            let title = JS.Document.CreateElement("h1")
            title.TextContent <- "Quiz Web App"

            let progress = JS.Document.CreateElement("h3")
            progress.TextContent <- "Question " + string (index + 1) + " / " + string questions.Length

            let feedback = JS.Document.CreateElement("p")
            feedback.TextContent <- lastResult

            let question = JS.Document.CreateElement("h2")
            question.TextContent <- q.Text

            root().AppendChild(title) |> ignore
            root().AppendChild(progress) |> ignore
            root().AppendChild(feedback) |> ignore
            root().AppendChild(question) |> ignore

            q.Answers
            |> List.iteri (fun i a ->
                let btn =
                    createButton a (fun () ->
                        if i = q.Correct then
                            score <- score + 1
                            lastResult <- "Correct!"
                        else
                            lastResult <- "Wrong!"

                        index <- index + 1
                        showQuestion()
                    )

                root().AppendChild(btn) |> ignore
            )

    and showResult () =
        clear()

        let title = JS.Document.CreateElement("h1")
        title.TextContent <- "Quiz Finished"

        let result = JS.Document.CreateElement("h2")
        result.TextContent <- "Score: " + string score + " / " + string questions.Length

        let percent = float score / float questions.Length * 100.0

        let percentText = JS.Document.CreateElement("h3")
        percentText.TextContent <- "Percentage: " + string percent + "%"

        let message =
            if percent >= 80.0 then "Excellent!"
            elif percent >= 50.0 then "Good!"
            else "Try again!"

        let msg = JS.Document.CreateElement("h3")
        msg.TextContent <- message

        let restartBtn =
            createButton "Restart" (fun () ->
                index <- 0
                score <- 0
                lastResult <- ""
                showStartScreen()
            )

        root().AppendChild(title) |> ignore
        root().AppendChild(result) |> ignore
        root().AppendChild(percentText) |> ignore
        root().AppendChild(msg) |> ignore
        root().AppendChild(restartBtn) |> ignore

    and showStartScreen () =
        clear()

        let title = JS.Document.CreateElement("h1")
        title.TextContent <- "Quiz Web App"

        let subtitle = JS.Document.CreateElement("h3")
        subtitle.TextContent <- "Choose Category"

        root().AppendChild(title) |> ignore
        root().AppendChild(subtitle) |> ignore

        let categories = [|"All"; "Math"; "Programming"; "Science"; "Geography"|]

        categories
        |> Array.iter (fun c ->
            let btn =
                createButton c (fun () ->
                    questions <- filterQuestions c
                    index <- 0
                    score <- 0
                    lastResult <- ""
                    showQuestion()
                )

            root().AppendChild(btn) |> ignore
        )

    [<SPAEntryPoint>]
    let Main () =
        showStartScreen()