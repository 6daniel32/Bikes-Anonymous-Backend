# Bikes-Anonymous-Backend
Cyclists certification service

How to run this project.

npm dependencies --> type "npm install" or "npm i" in your terminal.

install typescript --> npm instal typescript

External dependencies:

MongoDB: you need a connection with mongoDB Atlas, and provide the connection data in a ".env" file. 

For managing tokens, you will be using "passport" and "jwt" so you need a "SECRET_TOKEN" and a "SECRET_REFRESH_TOKEN" in your .env

Example .env file: 

"
ATLAS_URI=mongodb+srv://yourusername:yourpassword@myour-cluster.mk6ia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

SECRET_TOKEN=SecretToken
SECRET_REFRESH_TOKEN=SecretRefreshToken

REDIS_PORT=yourPort
"

Redis: you need to install redis version 3.0.6 (if you're using windows you can install it in the free ubuntu console which microsoft provides in his store).

If you do not have all the js files under "dist" directory, type "npx typescript" in the terminal.

For running the server you must write "node dist/server.js" changes.
