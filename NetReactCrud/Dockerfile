FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

ARG BUILDCONFIG=DEBUG
ARG VERSION=1.0.0

COPY NetReactCrud.csproj build/

WORKDIR build/
RUN dotnet restore

COPY . .

RUN dotnet publish NetReactCrud.csproj -c $BUILDCONFIG -o out /p:Version=$VERSION

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR out/

COPY --from=build build/out .
COPY --from=build build/appsettings.json .

ENTRYPOINT ["dotnet", "NetReactCrud.dll"]
