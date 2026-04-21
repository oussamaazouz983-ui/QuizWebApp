open System
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.Hosting
open Microsoft.AspNetCore.Http
open Microsoft.Extensions.DependencyInjection
open WebSharper.AspNetCore
open QuizWebApp

[<EntryPoint>]
let main args =
    let builder = WebApplication.CreateBuilder(args)

    builder.Services.AddWebSharper()
    |> ignore

    let app = builder.Build()

    if not (app.Environment.IsDevelopment()) then
        app.UseExceptionHandler("/Error")
           .UseHsts()
        |> ignore

    app.UseHttpsRedirection()
#if DEBUG        
        .UseWebSharperScriptRedirect(startVite = true)
#endif
        .UseDefaultFiles()
        .UseStaticFiles()
        .UseWebSharper()
    |> ignore

    app.Run()

    0