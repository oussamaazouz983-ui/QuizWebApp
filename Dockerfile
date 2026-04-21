FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Install Node.js (REQUIRED for WebSharper)
RUN apt-get update && apt-get install -y nodejs npm

COPY . ./

RUN npm install
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 10000
ENV ASPNETCORE_URLS=http://+:10000

ENTRYPOINT ["dotnet", "QuizWebApp.dll"]
