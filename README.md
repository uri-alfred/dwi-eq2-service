# DWI-EQ2-service

# Pasos para ejecutar
1. npm i
2. iniciar back con "nodemon app.js" (para que se actualizen los cambios al instante) o "npm run dev" o "node app.js"

# Claves y variables de entorno
- las claves de private1.pem y public1.pem se agregaron aparte en render con nombre de archivo, extensión y contenido
- .env tambien se agrego aparte en render con nombre y valor 
    + PORT=3001
    + DATABASE_URL='bd que subio alex en planetScale'
    + CLIENT_URL='url del client desplegado'
    + CLIENT_DOMAIN='dominio del client desplegado'