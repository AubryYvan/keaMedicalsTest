
                                                             Documentation de l’API

Objectifs :

Le document ci présent permet de lister les différents étapes nécessaires à l’installation de l’application de gestion de carrières et le process à suivre pour tester l’application.

Prérequis :
    -  installer nodejs 12.16
    -  Postgresql version 12.3


Installation Du Projet:



Après avoir effectué un tirage de la branche master de ce projet,
vous devez aller à la racine du projet, lancer le terminal et exécuter les commandes ci-dessous :
      - npm install (installation des librairies)
      - npx sequelize-cli db:create (ou sequelize db:create) pour créer la base de donnée du projet (Nb : postgresql doit être démarré sur son port par default 5432)
      - npm run dev ( cette commande démarre l’application sur le port 8000)


Test de l’application :

L’application comporte 2 types d’utilisateurs : Un administrateur et les candidats. Au démarrage de l’application un compte administrateur est crée.

    - L’administrateur a accéss à toutes les fonctionnalités de l’application.
    - Le candidat par contre pourra juste crée créer un compte, se connecter, afficher la liste poste disponible, soumettre sa candidature.

Les informations de connexion pour le compte administrateur sont les suivants : {phoneNumber : 237693200781, password : "keaMedicals"}

1. creation de compte d’un candidat:

endpoint : http://localhost:8000/register
headers : { "Content-Type" : "application/json" }
Method : Post,
données attendues (JSON) :
  { "phoneNumber": 237693200780, "password": "keaMedicals", "confirmPassword": "keaMedicals", "firstname": "test", "lastname": "test", "email": "test@yahooo.fr","profession": "testeur" }

Veuillez remplacer les données ci-dessous.

2. connexion du candidat :

endpoint : http://localhost:8000/login
method : POST
headers : { "Content-Type" : "application/json" }
data:  {"phoneNumber": 237693200781, "password": "keaMedicals"}

Le token reçu à la connexion sera utilisé par la suite à l'entete de chaque requêtre. sinon l'utilisateur se verra refuser l'accés aux fonctionnalités

3. Creation des postes à pourvoir par l’administrateur :

endpoint : http://localhost:8000/admin/offer
headers : {"Authorization" : Bearer token}
method : post
data: { "label": "Developpeur NodeJs", "description": "la description de l’offre", "experiences": 2,
    "qualification": "le candidat doit maitrise express et l’orm sequelize", "availablePlaces": 5, "expiryAt": "2020-11-12"}

4. lister les candidats 

endpoint : http://localhost:8000/admin/application
headers : {‘Authorization’ : Bearer token}
method : get

5. Supprimer un candidat 

endpoint : http://localhost:8000/admin/user/:idUser
headers : {"Authorization" : Bearer token}
method : delete

où idUser est l’identifiant de l’utilisateur(candidat). Nb : un candidat supprimer n’a plus le doit d’acceder à l’application.

6. Lister les offres 

endpoint : http://localhost:8000/user/offer
headers : {"Authorization" : Bearer token}
method : get

6. sauvegarder une nouvelle candidature

endpoint : http://localhost:8000/user/application
headers : { "Authorization" : Bearer token, "Content-Type" : "multipart/form-data" }
method : post
data( les données doivent être envoyé sur formualaire de donnée FormData) :  FormData(‘id’, idOffer); Formdata(‘document’, fichier.pdf)