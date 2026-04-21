FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# ✅ install node (REQUIRED)
RUN apt-get update && apt-get install -y nodejs npm

COPY . ./

# ✅ install frontend deps
RUN npm install

# ✅ build app
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 10000
ENV ASPNETCORE_URLS=http://+:10000

ENTRYPOINT ["dotnet", "QuizWebApp.dll"]
