# Vérification — NCR Missions GO

Version 1.0.0 — 23 novembre 2026. Vérifications locales ; aucun hébergement de production n’a été créé ou modifié.

## Tests automatisés

Commande : `node --test tests/core.test.cjs`.

**21 tests réussis, 0 échec** après correction des deux incohérences détectées dans la restauration des anciennes réponses et du statut du bilan.

Les tests couvrent les 36 contrôles des parcours principaux et les 10 contrôles facultatifs, les nombres français avec espaces et virgules, le signe moins, la distinction entre un champ vide et zéro, les tolérances et les erreurs d’arrondi du CUMP. Ils vérifient aussi les essais, indices et corrections consultées, le verrouillage des réponses terminées, le déblocage des missions, le bilan GO1 sans bonus imposé, les exigences de rédaction, l’indépendance des deux sessions et l’assainissement des sauvegardes incompatibles ou incohérentes.

Les fichiers JavaScript ont passé `node --check`. Le HTML autonome est généré depuis les mêmes sources, sans copie manuelle de ses questions.

## Vérification interactive exécutée

Dans le navigateur Chromium fourni pour la prévisualisation :

- Accueil et choix des deux parcours ; logo original et scènes SVG chargés.
- GO1 : parcours principal complet, avec une erreur, un indice, une deuxième tentative et consultation de la correction. Résultat affiché : 14/14 contrôles terminés, 13/14 au premier essai sans indice, 1 indice et 1 correction consultée.
- Rechargement entre les missions GO1 : état et progression conservés.
- Bilan GO1 accessible alors que les deux bonus sont encore non réalisés.
- Note écrite et critères nécessaires à la préparation du bilan.
- Téléchargement réel du bilan TXT ; contenu relu : nom de test, résultats, note complète, essai initial et consultation du modèle présents.
- GO2 : cinq missions principales achevées, 22/22 contrôles terminés. Saisies avec espaces et virgule acceptées ; affectation des cinq flux dans les mois et audit final vérifiés.
- Préparation du bilan GO2 avec ses cinq critères de relecture.
- HTML autonome servi localement : images intégrées en données chargées, navigation interne entre accueil et jeux, session retrouvée.
- Réinitialisation GO2 avec confirmation ; progression GO1 conservée.
- Mise en page inspectée sur écran de bureau et dans un cadre de 390 × 844 pixels. Accueil, bilan et champs/corrections GO1 contrôlés ; aucun débordement horizontal du corps de page observé (largeur utile de 375 pixels avec la barre de défilement).

Les sessions de test sont synthétiques et ne correspondent pas à des résultats d’élèves.

## Relecture pédagogique et technique

Périmètres et résultats rapprochés des conducteurs, activités et corrigés cités dans le guide formateur. Les données du jour, les données annuelles et le lot à valoriser restent séparés. Les réponses calculées des visuels apparaissent après la mission correspondante.

La quantité à commander n’est pas inventée. CUMP et PEPS sont calculés avec les arrondis appropriés. Les encaissements et les ventes restent distincts. Le paiement de TVA au mois suivant est indiqué comme convention du cas, et aucun solde bancaire final n’est prétendu calculable sans les informations manquantes.

Échappement des textes utilisateur, fichiers exportés nommés avec une chaîne filtrée, aucune exécution de code saisi, aucun envoi réseau applicatif. Le lien d’évitement, les radios, les unités, les explications et les retours de focus ont été revus. Le défilement et les animations prennent en compte la réduction des mouvements.

## Limites de vérification

- Aucun essai réalisé dans une vraie classe : les durées sont des estimations pédagogiques.
- Aucun déploiement Cloudflare, GitHub ou autre environnement de production effectué.
- Aucun essai sur un iPhone physique, Safari ou Firefox dans cette exécution. La vérification mobile est une simulation de largeur dans Chromium.
- L’impression utilise la fonction native du navigateur et une feuille CSS dédiée ; l’export PDF final et une impression papier n’ont pas été contrôlés dans cette exécution. L’export TXT a été testé réellement.
- Le fichier autonome a été testé en HTTP local. L’ouverture directe en `file://` n’a pas été testée dans le navigateur de contrôle ; la disponibilité du stockage local des fichiers dépend du navigateur.
- Il s’agit d’un outil d’entraînement autonome : aucune garantie d’intégrité de notes d’examen, aucun suivi collectif ou partage automatique des résultats.
