
# Installation 
Clonez le projet dans le répertoire de votre serveur applicatif :

```
git clone https://github.com/Eydan-gnt/Groupe-1-Atelier-Pro
```

Mettez en suite les dépendances à jour :

```
composer update
```

Faites une copie de .env.example et renommez la copie .env afin de pouvoir configurer l'application. 
Les points essentiels de la configuration sont :

```
PP_NAME=Eventhub  
APP_ENV=local  
APP_KEY=
APP_DEBUG=true  
APP_URL=http://localhost  
  
APP_LOCALE=en  
APP_FALLBACK_LOCALE=en  
APP_FAKER_LOCALE=en_US  
  
APP_MAINTENANCE_DRIVER=file  
# APP_MAINTENANCE_STORE=database  
  
PHP_CLI_SERVER_WORKERS=4  
  
BCRYPT_ROUNDS=12  
  
LOG_CHANNEL=stack  
LOG_STACK=single  
LOG_DEPRECATIONS_CHANNEL=null  
LOG_LEVEL=debug  
  
DB_CONNECTION=pgsql  
DB_HOST=192.168.1.248  
DB_PORT=5432  
DB_DATABASE=eventhub  
DB_USERNAME=eventhub_user  
DB_PASSWORD=Ev3nth*b  
  
SESSION_DRIVER=database  
SESSION_LIFETIME=120  
SESSION_ENCRYPT=false  
SESSION_PATH=/  
SESSION_DOMAIN=null  
  
BROADCAST_CONNECTION=log  
FILESYSTEM_DISK=local  
QUEUE_CONNECTION=database  
  
CACHE_STORE=database  
# CACHE_PREFIX=  
  
MEMCACHED_HOST=127.0.0.1  
  
REDIS_CLIENT=phpredis  
REDIS_HOST=127.0.0.1  
REDIS_PASSWORD=null  
REDIS_PORT=6379  
  
MAIL_MAILER=smtp  
MAIL_SCHEME=null  
MAIL_HOST=172.16.0.246  
MAIL_PORT=587  
MAIL_USERNAME=noreply@lurcat.local  
MAIL_PASSWORD=Ev3nth*b  
MAIL_FROM_ADDRESS="noreply@lurcat.local"  
MAIL_FROM_NAME="${APP_NAME}"  
  
AWS_ACCESS_KEY_ID=  
AWS_SECRET_ACCESS_KEY=  
AWS_DEFAULT_REGION=us-east-1  
AWS_BUCKET=  
AWS_USE_PATH_STYLE_ENDPOINT=false  
  
VITE_APP_NAME="${APP_NAME}"
```

Si vous ne le faites pas manuellement, pensez à générer une clé d'application valide avec la commande :

```
php artisan key:generate
```

Pour mettre en place la base de données :

```
php artisan migrate
```

ou si une base de données existe déjà :

```
php artisan migrate:fresh
```

Pour pouvoir accueillir les pièces jointes :

```
php artisan storage:link
```

Si vous souhaitez avoir des premiers comptes utilisateurs, un seeder est en place pour créer un compte par niveau de permission :

```
php artisan db:seed
```

- admin@mail.com - adminMDP
- user@mail.com - userMDP
- userProf@mail.com - userMDP

Pour lancer un serveur local pour le développement (127.0.0.1:8000) :

```
php artisan serve
```
