# NCR — Missions GO

Deux jeux individuels de gestion opérationnelle pour les BTS MCO, dans **un seul dépôt**. L’accueil permet de choisir l’année ; chaque jeu possède également son adresse directe.

## Utiliser les fichiers

| Besoin | Fichier ou dossier |
|---|---|
| Héberger les deux jeux ensemble | Tout le contenu de `dist/` |
| Page d’accueil | `dist/index.html` |
| Accès direct GO 1re année | `dist/go1.html` |
| Accès direct GO 2e année | `dist/go2.html` |
| Ouvrir un seul HTML autonome | `standalone/NCR_GO_1A_2A.html` |
| Déroulé pédagogique, corrigés et sources | `docs/GUIDE_FORMATEUR.md` |
| Vérifications réellement exécutées | `docs/VALIDATION.md` |

Le fichier autonome contient les deux jeux, le logo et les illustrations. Il se régénère à partir des mêmes sources que le site : il n’existe pas de deuxième moteur à maintenir.

## Mise en ligne depuis un même dépôt

Décompresser l’archive, puis placer le contenu du dossier `ncr-go-missions` à la racine du dépôt choisi. Les fichiers sont déjà prêts : aucun téléchargement de bibliothèque et aucune compilation de l’application ne sont nécessaires.

### Cloudflare Pages

Dans le projet Pages relié au dépôt, utiliser ces paramètres :

| Paramètre | Valeur |
|---|---|
| Framework / preset | Aucun / None |
| Commande de build | `exit 0` |
| Dossier de sortie | `dist` |
| Dossier racine | Racine du dépôt, si le contenu de ce dossier y a été placé |
| Variables d’environnement | Aucune |

Après publication, partager l’adresse de l’accueil. Les routes `go1.html` et `go2.html` donnent un accès direct à chaque parcours. Si le projet est conservé dans un sous-dossier du dépôt, choisir ce sous-dossier comme racine de construction.

Référence vérifiée le 23/11/2026 : [Documentation Cloudflare — Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/). L’archive ne déclenche aucun déploiement.

Pour un hébergement statique classique, transférer **le contenu** de `dist/` dans le répertoire public, en conservant le dossier `assets`. Ne pas mettre les documents formateur dans ce répertoire public. Le fichier `_headers` est destiné aux plateformes qui reconnaissent ce format ; les balises CSP des trois pages protègent également le chargement de ressources.

## Tester sur un ordinateur

Le fichier `standalone/NCR_GO_1A_2A.html` peut être ouvert dans un navigateur. Le stockage local associé aux fichiers peut varier selon le navigateur ; la version hébergée est le choix prévu pour la classe.

Pour une prévisualisation HTTP locale, depuis la racine du dépôt :

```bash
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Ouvrir ensuite `http://127.0.0.1:8080`. Fermer le serveur avec `Ctrl+C`.

## Contenu pédagogique

**GO 1re année — Le quai sous contrôle.** Fin d’activité S06, puis S07 M01–M02 : alerte, stock moyen, rotation et durée de stockage. Trois missions principales, 14 contrôles et une note argumentée. Deux prolongements facultatifs ajoutent 10 contrôles sur l’interprétation, le CUMP, le PEPS et l’inventaire. Ils n’empêchent pas de terminer le bilan du jour. Durée principale estimée : 30–35 minutes, à ajuster à la classe.

**GO 2e année — Opération Flux.** S12, construire les budgets partiels : ventes, achats, TVA, calendrier des flux et audit. Cinq missions, 22 contrôles et une note argumentée. Durée estimée : 40–50 minutes, à ajuster à la classe.

Le jeu est une adaptation originale des cas fictifs NCR fournis ; ce n’est pas un export de la banque NCR MCO Quiz. Les calculs utilisent les données vérifiées des activités et des corrigés. Les sources et les résultats détaillés figurent dans le guide formateur.

## Fonctionnement en classe

1. Chaque élève ouvre le lien sur son appareil et choisit son année.
2. Le prénom ou pseudo est facultatif. Une calculatrice et un brouillon sont conseillés.
3. L’élève lit les données, répond et valide. Les réponses justes restent acquises.
4. Un indice est disponible. Après deux réponses non validées, la démarche complète devient accessible et sa consultation est signalée dans le bilan.
5. Les missions principales se débloquent progressivement. Les bonus GO1 restent facultatifs.
6. L’élève rédige sa conclusion, coche les critères de relecture, puis télécharge son bilan texte ou utilise l’impression/PDF du navigateur.

Les réponses d’entraînement, le premier essai sans indice, les aides et les corrections consultées sont distingués. La consultation de l’exemple de note est elle aussi tracée dans le bilan. **Le texte libre ne reçoit pas de note automatique** : il reste à apprécier par le formateur.

## Sauvegarde et limites

La progression est conservée dans le navigateur, séparément pour les deux années. Elle ne se synchronise pas entre les appareils. Le site n’envoie pas les résultats et ne comporte pas de tableau de bord collectif. Pour récupérer les productions, demander aux élèves de remettre leur fichier bilan par le canal habituel.

Sur un poste partagé : télécharger le bilan, puis utiliser « Nouvelle session ». Cette commande efface seulement le jeu courant, après confirmation. Si le stockage local est indisponible, un message demande de garder l’onglet ouvert jusqu’au téléchargement.

Ce projet est conçu pour l’entraînement. Les corrections sont présentes dans le JavaScript livré au navigateur : il ne s’agit pas d’une plateforme d’examen sécurisée. Les résultats locaux peuvent être modifiés par une personne ayant accès à l’appareil et ne constituent pas une note certifiée.

## Architecture et choix techniques

HTML, CSS et JavaScript natifs. Aucun framework, paquet distant, police distante, suivi d’audience, clé ou serveur applicatif. Ce choix facilite l’hébergement, la copie hors ligne et la maintenance pour ces deux parcours sans compte ni synchronisation.

| Fichier | Rôle |
|---|---|
| `dist/assets/data/go1.js` / `go2.js` | Scénarios, documents, questions, réponses, indices, explications |
| `dist/assets/core.js` | Parsing numérique, validation, progression, scores et restauration |
| `dist/assets/app.js` | Interface, interactions, sauvegarde locale, export et impression |
| `dist/assets/styles.css` | Charte, responsive, projection et impression |
| `dist/assets/scenes/` | Illustrations SVG originales |
| `dist/assets/ncr-logo.png` | Logo fourni, conservé sans redessin ni recoloration |
| `tests/core.test.cjs` | Tests de comportement sans dépendance externe |
| `tools/build_standalone.py` | Génération du HTML autonome |

Charte : blanc studio `#FBFBFD`, anthracite `#1D1D1F`, accent NCR `#2997FF`. Le bleu plus foncé `#0665C4` assure la lisibilité des boutons et des textes sur fond clair. La pile de polices utilise Inter si elle est installée, puis les polices système ; aucun chargement distant n’est nécessaire. Les animations respectent la préférence de réduction des mouvements. Les réponses sont accessibles au clavier ; aucune opération ne dépend exclusivement d’un glisser-déposer.

Pour modifier les exercices, éditer les fichiers de données. Les identifiants doivent rester uniques. Si le barème, les questions ou la structure changent, incrémenter `VERSION` dans `core.js` afin de ne pas reprendre une ancienne session incompatible.

### Vérifier et régénérer

Avec Node.js disponible :

```bash
node --test tests/core.test.cjs
```

Avec Python 3 :

```bash
python3 tools/build_standalone.py
```

Le dossier `dist/` constitue la version à héberger. Les documents et les outils restent à la racine du dépôt, hors du répertoire publié.
