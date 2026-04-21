FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Install node
RUN apt-get update && apt-get install -y nodejs npm

COPY . ./

# Install dependencies BEFORE WebSharper runs
RUN npm install || true

# Build WebSharper first (important)
RUN dotnet build

# Then publish
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 10000
ENV ASPNETCORE_URLS=http://+:10000

ENTRYPOINT ["dotnet", "QuizWebApp.dll"]
