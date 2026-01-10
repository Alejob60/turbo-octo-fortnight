# Script de despliegue para Azure App Service

# Variables
RESOURCE_GROUP="orbital-prime"
APP_NAME="orbitalprime-frontend"
LOCATION="canadacentral"
PLAN_NAME="ASP-RealCulture"

# Crear archivo de configuración de Azure
echo "Configurando la aplicación web para usar contenedores..."
az webapp config set --resource-group $RESOURCE_GROUP --name $APP_NAME --generic-configurations '{"http20Enabled": true}'

# Configurar variables de entorno
az webapp config appsettings set --resource-group $RESOURCE_GROUP --name $APP_NAME --settings NEXT_PUBLIC_MISYBOT_API_URL="https://api.misybot.com/api" NODE_ENV="production"

# Configurar deployment de Git
az webapp deployment source config-local-git --resource-group $RESOURCE_GROUP --name $APP_NAME

echo "Despliegue preparado. Ahora puedes:"
echo "1. git remote add azure <URL_DEL_REPOSITORIO_AZURE>"
echo "2. git push azure main"