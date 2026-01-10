# Script de despliegue para Azure App Service (PowerShell)

# Variables
$RESOURCE_GROUP = "orbital-prime"
$APP_NAME = "orbitalprime-frontend"
$LOCATION = "canadacentral"
$PLAN_NAME = "ASP-RealCulture"

Write-Host "Configurando la aplicación web para usar contenedores..." -ForegroundColor Green

# Configurar variables de entorno
az webapp config appsettings set --resource-group $RESOURCE_GROUP --name $APP_NAME --settings "NEXT_PUBLIC_MISYBOT_API_URL=https://api.misybot.com/api" "NODE_ENV=production"

# Configurar deployment de Git
az webapp deployment source config-local-git --resource-group $RESOURCE_GROUP --name $APP_NAME

Write-Host "Despliegue preparado. Ahora puedes:" -ForegroundColor Green
Write-Host "1. git remote add azure <URL_DEL_REPOSITORIO_AZURE>" -ForegroundColor Yellow
Write-Host "2. git push azure main" -ForegroundColor Yellow

# Mostrar la URL de git para el deployment
$gitUrl = $(az webapp deployment source show --resource-group $RESOURCE_GROUP --name $APP_NAME --query url -o tsv)
Write-Host "URL de Git para el deployment: $gitUrl" -ForegroundColor Cyan