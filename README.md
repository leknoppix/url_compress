## Configuration

Le comportement de l'API peut être ajusté via les variables d'environnement suivantes :

- `PORT` : Le port sur lequel l'API écoutera (par défaut : 3000)
- `NODE_ENV` : L'environnement d'exécution (development, production, etc.)
- `MAX_URLS` : Le nombre maximum d'URLs autorisées par requête. Mettre à 0 pour désactiver la limite.

Ces variables peuvent être définies dans un fichier `.env` à la racine du projet.