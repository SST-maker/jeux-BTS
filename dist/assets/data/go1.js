window.NCR_GAMES = window.NCR_GAMES || {};
window.NCR_GAMES.go1 = {
  id: "go1",
  year: "1re année",
  code: "S06 → S07",
  title: "Le quai sous contrôle",
  company: "Matériaux Local",
  subtitle: "Une alerte à traiter. Un stock à comprendre. Une décision à défendre",
  intro: "Tu prends la relève dans la réserve de Matériaux Local. Un seuil de réapprovisionnement a peut-être été franchi : sécurise la décision, puis mesure la vitesse du stock sur l’année. Ton responsable attend une note courte, appuyée sur les chiffres du dossier",
  role: "Responsable des stocks",
  duration: "30–35 min",
  coreCount: 3,
  objectives: [
    "Clore l’activité sur les seuils sans confondre alerte et quantité à commander.",
    "Calculer et interpréter le stock moyen, la rotation et la durée de stockage.",
    "Justifier une décision en séparant les données, les calculs et les informations manquantes."
  ],
  sourceNote: "",
  missions: [
    {
      id: "alerte",
      title: "Le signal d’alerte",
      kicker: "Clôturer S06",
      duration: "8–10 min",
      optional: false,
      intro: "Le quai prépare sa prochaine tournée. Avant d’ajouter une commande, vérifie les seuils et choisis une réponse adaptée à la situation du jour",
      goal: "Distinguer les trois niveaux de stock et déclencher la bonne procédure",
      visual: "stock",
      documents: [
        {
          title: "Relevé du jour",
          text: "Les ventes sont régulières dans le calcul de base. Le stock de sécurité doit couvrir deux jours supplémentaires.",
          table: {
            headers: ["Donnée", "Valeur"],
            rows: [
              ["Ventes régulières", "30 sacs par jour"],
              ["Délai de livraison habituel", "4 jours"],
              ["Couverture de sécurité choisie", "2 jours supplémentaires"],
              ["Stock observé aujourd’hui", "170 sacs"]
            ]
          }
        },
        {
          title: "Consigne du responsable logistique",
          text: "Un retard de deux jours a déjà été observé dans ce scénario. La réserve est partagée avec d’autres références. Signale tout stock inférieur au seuil, puis vérifie les commandes en cours avant d’en créer une nouvelle.",
          note: "Aucune cible de reconstitution et aucune quantité optimale de commande ne sont fournies."
        }
      ],
      questions: [
        {
          id: "g1-minimum",
          type: "numeric",
          label: "Combien de sacs faut-il pour couvrir le délai habituel de livraison ? Calcule le stock minimum",
          unit: "sacs",
          answer: 120,
          tolerance: 0,
          hint: "Multiplie les ventes d’une journée par le délai habituel, sans ajouter encore la sécurité.",
          explanation: "Stock minimum = ventes quotidiennes × délai habituel = 30 × 4 = 120 sacs. Cette quantité couvre les quatre jours de délai au rythme prévu."
        },
        {
          id: "g1-securite",
          type: "numeric",
          label: "Combien de sacs représentent les deux jours de sécurité choisis ?",
          unit: "sacs",
          answer: 60,
          tolerance: 0,
          hint: "La sécurité couvre des jours supplémentaires. Applique le rythme de vente aux deux jours indiqués.",
          explanation: "Stock de sécurité = ventes quotidiennes × jours supplémentaires = 30 × 2 = 60 sacs. Il s’ajoute à la couverture du délai habituel pour absorber l’imprévu prévu dans le scénario."
        },
        {
          id: "g1-alerte",
          type: "numeric",
          label: "À quel niveau de stock le réapprovisionnement doit-il être déclenché ?",
          unit: "sacs",
          answer: 180,
          tolerance: 0,
          hint: "Le seuil d’alerte additionne la couverture du délai habituel et la sécurité.",
          explanation: "Stock d’alerte = stock minimum + stock de sécurité = 120 + 60 = 180 sacs. C’est un seuil de déclenchement, pas une quantité à commander."
        },
        {
          id: "g1-decision",
          type: "choice",
          label: "Le stock observé est de 170 sacs. Quelle décision est la plus adaptée ?",
          options: [
            { id: "a", label: "Attendre que le stock atteigne zéro avant de réagir." },
            { id: "b", label: "Engager le réapprovisionnement après contrôle du stock disponible, des commandes en cours et du délai annoncé." },
            { id: "c", label: "Commander immédiatement 180 sacs, sans autre vérification." },
            { id: "d", label: "Ne rien faire : 170 sacs restent supérieurs au stock minimum." }
          ],
          answer: "b",
          hint: "Compare le stock observé au seuil d’alerte, puis relis la consigne sur les commandes déjà en cours.",
          explanation: "170 sacs sont inférieurs au seuil de 180 : l’alerte est franchie. On vérifie le stock disponible, les commandes en cours et le délai annoncé, puis on engage le réapprovisionnement adapté. Commander sans ces contrôles pourrait créer un doublon."
        },
        {
          id: "g1-risque-faible",
          type: "choice",
          label: "Quel risque une sécurité trop faible fait-elle courir ?",
          options: [
            { id: "a", label: "Une hausse certaine du prix d’achat." },
            { id: "b", label: "Un encombrement excessif de la réserve." },
            { id: "c", label: "Une rupture en cas de retard ou de demande imprévue." }
          ],
          answer: "c",
          hint: "À quoi sert la réserve de sécurité quand la livraison tarde ?",
          explanation: "Une sécurité trop faible protège mal contre les imprévus. Si la livraison tarde ou si la demande dépasse les prévisions, le magasin risque de manquer de sacs."
        },
        {
          id: "g1-risque-forte",
          type: "choice",
          label: "Pourquoi ne pas augmenter la sécurité sans limite ?",
          options: [
            { id: "a", label: "Elle peut immobiliser des capitaux, augmenter les coûts et occuper la réserve." },
            { id: "b", label: "Elle garantit automatiquement une rupture de stock." },
            { id: "c", label: "Elle fait obligatoirement baisser les ventes." }
          ],
          answer: "a",
          hint: "Les sacs en réserve prennent de la place et représentent de l’argent immobilisé.",
          explanation: "Une sécurité trop élevée mobilise de l’argent, de l’espace et des coûts de possession. Le bon niveau doit tenir compte de la demande et des délais, tout en respectant la capacité de la réserve."
        },
        {
          id: "g1-quantite-commande",
          type: "choice",
          label: "Peut-on déterminer la quantité exacte à commander avec ce dossier ?",
          options: [
            { id: "a", label: "Oui : il faut toujours commander 180 sacs." },
            { id: "b", label: "Oui : il suffit de commander 10 sacs pour atteindre le seuil." },
            { id: "c", label: "Oui : le stock de sécurité donne directement la quantité à commander." },
            { id: "d", label: "Non : le seuil est connu, mais la cible de reconstitution n’est pas fournie." }
          ],
          answer: "d",
          hint: "Le dossier indique quand agir. Indique-t-il à quel stock final on souhaite revenir ?",
          explanation: "On sait qu’il faut réagir, mais on ne peut pas inventer la quantité à commander. Le seuil d’alerte est de 180 sacs ; la cible de reconstitution et les commandes déjà en route ne sont pas chiffrées dans le dossier."
        }
      ],
      takeaway: "Un seuil indique quand agir. La quantité à commander exige d’autres informations et la vérification des commandes en cours."
    },
    {
      id: "rotation",
      title: "La vitesse du stock",
      kicker: "S07 · Mission 01",
      duration: "8 min",
      optional: false,
      intro: "L’alerte du jour est traitée. Le responsable veut maintenant savoir combien de stock reste immobilisé en moyenne et combien de fois il se renouvelle dans l’année",
      goal: "Choisir les bonnes données puis calculer le stock moyen et la rotation",
      visual: "rotation",
      documents: [
        {
          title: "Bilan annuel de stock",
          text: "Ces données portent sur l’année entière. Elles doivent rester séparées du dossier du lot à valoriser, réservé aux prolongements.",
          table: {
            headers: ["Donnée annuelle", "Valeur"],
            rows: [
              ["Stock initial", "200 sacs"],
              ["Stock final", "100 sacs"],
              ["Quantités vendues sur l’année", "1 800 sacs"],
              ["Base de calcul", "360 jours"]
            ]
          },
          note: "Le stock observé de 170 sacs dans le dossier précédent n’est pas le stock final annuel."
        }
      ],
      questions: [
        {
          id: "g1-perimetre",
          type: "choice",
          label: "Quel périmètre faut-il utiliser pour mesurer la rotation annuelle ?",
          options: [
            { id: "a", label: "Le stock observé aujourd’hui et le délai de livraison." },
            { id: "b", label: "Le lot de réception réservé à la valorisation." },
            { id: "c", label: "Le bilan annuel : stock initial, stock final et ventes de l’année." }
          ],
          answer: "c",
          hint: "Un indicateur annuel doit rapprocher des données qui concernent la même période.",
          explanation: "On utilise le bilan annuel : 200 sacs au départ, 100 à la fin et 1 800 vendus dans l’année. Mélanger le stock du jour ou un lot particulier avec les ventes annuelles fausserait l’analyse."
        },
        {
          id: "g1-stock-moyen",
          type: "numeric",
          label: "Calcule le stock moyen annuel",
          unit: "sacs",
          answer: 150,
          tolerance: 0,
          hint: "Additionne le stock initial et le stock final, puis divise la somme par deux.",
          explanation: "Stock moyen = (stock initial + stock final) ÷ 2 = (200 + 100) ÷ 2 = 150 sacs. Dans cette méthode, le stock moyen résume la quantité immobilisée sur la période."
        },
        {
          id: "g1-rotation",
          type: "numeric",
          label: "Calcule la rotation annuelle du stock",
          unit: "renouvellements par an",
          answer: 12,
          tolerance: 0,
          hint: "Divise les quantités vendues dans l’année par le stock moyen.",
          explanation: "Rotation = quantités vendues ÷ stock moyen = 1 800 ÷ 150 = 12 renouvellements par an. Le stock se renouvelle donc douze fois sur l’année de calcul."
        },
        {
          id: "g1-unite-rotation",
          type: "choice",
          label: "Comment exprimer correctement le résultat de la rotation ?",
          options: [
            { id: "a", label: "En nombre de renouvellements sur l’année." },
            { id: "b", label: "En jours de stockage." },
            { id: "c", label: "En euros immobilisés." },
            { id: "d", label: "En sacs disponibles aujourd’hui." }
          ],
          answer: "a",
          hint: "Les sacs vendus divisés par les sacs en stock moyen donnent un nombre de fois.",
          explanation: "La rotation est un nombre de renouvellements : ici, douze fois par an. La durée en jours est un autre indicateur, que tu vas calculer dans la mission suivante."
        }
      ],
      takeaway: "Stock moyen, ventes et période doivent correspondre. La rotation s’exprime en renouvellements, pas en jours."
    },
    {
      id: "duree",
      title: "Le temps en réserve",
      kicker: "S07 · Mission 02",
      duration: "7–8 min",
      optional: false,
      intro: "Le nombre de renouvellements ne parle pas à tout le monde. Transforme-le en durée de stockage et vérifie le résultat par un deuxième chemin",
      goal: "Obtenir la même durée avec deux méthodes et conserver l’unité correcte",
      visual: "duration",
      documents: [
        {
          title: "Ta base de calcul",
          text: "Reprends le stock moyen et la rotation calculés à la mission précédente. Le dossier utilise une année de 360 jours.",
          table: {
            headers: ["Donnée annuelle", "Valeur"],
            rows: [
              ["Stock initial", "200 sacs"],
              ["Stock final", "100 sacs"],
              ["Ventes annuelles", "1 800 sacs"],
              ["Année de calcul", "360 jours"]
            ]
          },
          note: "Utilise 360 jours, comme demandé dans ce dossier, pour les deux méthodes."
        }
      ],
      questions: [
        {
          id: "g1-duree-rotation",
          type: "numeric",
          label: "Avec la méthode 360 ÷ rotation, quelle est la durée moyenne de stockage ?",
          unit: "jours",
          answer: 30,
          tolerance: 0,
          hint: "Reprends la rotation de la mission précédente et divise les 360 jours par ce nombre.",
          explanation: "Durée moyenne = 360 ÷ rotation = 360 ÷ 12 = 30 jours. On exprime ici un temps moyen de stockage, pas une quantité en réserve."
        },
        {
          id: "g1-formule-duree",
          type: "choice",
          label: "Quelle deuxième formule permet de retrouver cette durée à partir du stock moyen et des ventes annuelles ?",
          options: [
            { id: "a", label: "Ventes annuelles × 360 ÷ stock moyen." },
            { id: "b", label: "Stock moyen × 360 ÷ ventes annuelles." },
            { id: "c", label: "Stock moyen ÷ 360 × ventes annuelles." },
            { id: "d", label: "Stock initial + stock final + 360." }
          ],
          answer: "b",
          hint: "La part du stock moyen dans les ventes annuelles est une fraction d’année. Il faut la convertir en jours.",
          explanation: "La formule est (stock moyen × 360) ÷ ventes annuelles. Le rapport stock moyen ÷ ventes annuelles représente une fraction de l’année ; la multiplication par 360 la convertit en jours."
        },
        {
          id: "g1-duree-stock",
          type: "numeric",
          label: "Applique cette seconde méthode. Quelle durée retrouves-tu ?",
          unit: "jours",
          answer: 30,
          tolerance: 0,
          hint: "Pose le calcul avec le stock moyen, les 360 jours et les ventes annuelles avant de comparer les deux résultats.",
          explanation: "Durée = (150 × 360) ÷ 1 800 = 54 000 ÷ 1 800 = 30 jours. Les deux méthodes sont cohérentes. Si elles donnent des résultats différents, contrôle les données, la formule et l’unité."
        }
      ],
      takeaway: "Deux méthodes cohérentes doivent conduire au même résultat : une durée de stockage exprimée en jours."
    },
    {
      id: "valorisation",
      title: "Deux méthodes, un même lot",
      kicker: "Prolongement S07 · M03–M04",
      duration: "12–15 min",
      optional: true,
      intro: "Après consigne du formateur, ouvre le dossier complémentaire. Commence par interpréter l’évolution annuelle, puis examine un lot distinct acheté à deux prix différents",
      goal: "Interpréter une évolution avec prudence et appliquer CUMP puis PEPS au même lot",
      visual: "valuation",
      documents: [
        {
          title: "Repère annuel de comparaison",
          text: "L’année précédente, la durée moyenne de stockage était de 40 jours. Compare cette donnée à la durée calculée dans le parcours principal.",
          note: "Ce bilan annuel ne doit pas être mélangé avec les quantités du lot ci-dessous."
        },
        {
          title: "Fiche du lot à valoriser",
          text: "La sortie intervient après la réception. Aucun autre mouvement n’est enregistré pour ce lot.",
          table: {
            headers: ["Mouvement du lot", "Quantité", "Coût unitaire HT"],
            rows: [
              ["Lot initial", "100 sacs", "10 €"],
              ["Réception", "50 sacs", "12 €"],
              ["Sortie après réception", "90 sacs", "À valoriser"]
            ]
          },
          note: "Pour le CUMP, conserve toutes les décimales jusqu’au montant final. Le prix affiché à deux décimales ne doit pas servir d’arrondi intermédiaire."
        }
      ],
      questions: [
        {
          id: "g1-evolution-duree",
          type: "numeric",
          label: "Calcule l’évolution signée : durée actuelle moins durée de l’année précédente",
          unit: "jours",
          answer: -10,
          tolerance: 0,
          hint: "Soustrais l’ancienne durée de la nouvelle. Une diminution donne un résultat négatif.",
          explanation: "Évolution = 30 − 40 = −10 jours. Le stock reste en moyenne dix jours de moins qu’auparavant. Le signe négatif indique ici une diminution de durée."
        },
        {
          id: "g1-interpretation-duree",
          type: "choice",
          label: "Quelle conclusion les données permettent-elles de défendre ?",
          options: [
            { id: "a", label: "Les ventes ont forcément augmenté." },
            { id: "b", label: "Les ruptures sont devenues impossibles." },
            { id: "c", label: "Le stock reste moins longtemps immobilisé, mais il faut surveiller les ruptures." },
            { id: "d", label: "La baisse de durée prouve que le stock physique est exact." }
          ],
          answer: "c",
          hint: "Distingue l’effet mesuré sur la durée des effets que le dossier ne démontre pas.",
          explanation: "La durée passe de 40 à 30 jours : l’immobilisation est plus courte. Cela peut libérer de la trésorerie, mais il faut vérifier que la disponibilité ne se dégrade pas. Ce seul indicateur ne prouve ni une hausse des ventes ni l’absence de ruptures."
        },
        {
          id: "g1-cump",
          type: "numeric",
          label: "Calcule le CUMP du lot. Saisis son affichage à deux décimales, puis conserve la valeur exacte pour la suite",
          unit: "€ HT par sac",
          answer: 10.67,
          tolerance: 0.005,
          hint: "Additionne les valeurs des deux lots, puis divise par la quantité totale. Les lots n’ont pas le même poids dans la moyenne.",
          explanation: "Valeur disponible = 100 × 10 + 50 × 12 = 1 600 € HT pour 150 sacs. CUMP = 1 600 ÷ 150 = 10,6666… € HT par sac, soit 10,67 € à l’affichage. Garde la fraction 1 600/150 pour les prochains montants. La moyenne simple des deux prix serait incorrecte."
        },
        {
          id: "g1-sorties-cump",
          type: "numeric",
          label: "Valorise les 90 sacs sortis selon le CUMP, sans arrondir le coût moyen avant le montant final",
          unit: "€ HT",
          answer: 960,
          tolerance: 0.005,
          hint: "Multiplie les 90 sacs par la fraction exacte représentant le CUMP, pas par son affichage arrondi.",
          explanation: "Sorties CUMP = 90 × (1 600/150) = 960 € HT. Utiliser 10,67 € trop tôt donne 960,30 € et introduit une erreur d’arrondi."
        },
        {
          id: "g1-stock-cump",
          type: "numeric",
          label: "Quelle est la valeur du stock final théorique selon le CUMP ?",
          unit: "€ HT",
          answer: 640,
          tolerance: 0.005,
          hint: "Calcule d’abord la quantité théorique restante, puis applique le CUMP exact.",
          explanation: "Il reste 100 + 50 − 90 = 60 sacs théoriques. Valeur CUMP = 60 × (1 600/150) = 640 € HT. Le résultat 640,20 € viendrait de l’utilisation prématurée du coût arrondi à 10,67 €."
        },
        {
          id: "g1-sorties-peps",
          type: "numeric",
          label: "Valorise les 90 sorties selon la méthode PEPS",
          unit: "€ HT",
          answer: 900,
          tolerance: 0.005,
          hint: "En PEPS, les premiers sacs entrés sont les premiers valorisés en sortie. Le lot initial suffit-il à couvrir les 90 sacs ?",
          explanation: "Le lot initial contient 100 sacs à 10 € HT. Les 90 sacs sortis proviennent donc entièrement de ce premier lot : 90 × 10 = 900 € HT."
        },
        {
          id: "g1-stock-peps",
          type: "numeric",
          label: "Quelle est la valeur du stock final théorique selon PEPS ?",
          unit: "€ HT",
          answer: 700,
          tolerance: 0.005,
          hint: "Après la sortie, il reste une partie du lot initial et la totalité du lot reçu. Valorise chaque partie à son coût.",
          explanation: "Il reste 10 sacs à 10 € et 50 sacs à 12 € : 10 × 10 + 50 × 12 = 100 + 600 = 700 € HT. La quantité théorique est la même qu’en CUMP ; la convention de valorisation change."
        }
      ],
      takeaway: "Une évolution demande une interprétation prudente. CUMP et PEPS changent les valeurs calculées, jamais les quantités physiques."
    },
    {
      id: "inventaire",
      title: "L’enquête d’inventaire",
      kicker: "Prolongement S07 · M04–M05",
      duration: "5–7 min",
      optional: true,
      intro: "Le comptage ne semble pas correspondre à la fiche du lot. Ton rôle consiste à établir l’écart et à organiser les vérifications avant de conclure sur sa cause",
      goal: "Séparer un écart de quantité d’une différence de valorisation et choisir des contrôles traçables",
      visual: "inventory",
      documents: [
        {
          title: "Mouvements du lot et comptage",
          table: {
            headers: ["Élément", "Quantité"],
            rows: [
              ["Stock initial du lot", "100 sacs"],
              ["Réception", "50 sacs"],
              ["Sortie enregistrée", "90 sacs"],
              ["Premier comptage physique final", "58 sacs"]
            ]
          },
          text: "Aucun autre mouvement n’est enregistré sur la fiche présentée."
        },
        {
          title: "Compte rendu de contrôle",
          text: "Le premier comptage a été réalisé avant fermeture. Une sortie pourrait avoir été enregistrée tardivement, mais cette piste n’est pas confirmée. Les lots sont identifiables dans les pièces de réception.",
          note: "Le responsable demande un second comptage et un rapprochement des mouvements avant toute accusation. Le stock annuel final de 100 sacs appartient à un autre périmètre."
        }
      ],
      questions: [
        {
          id: "g1-stock-theorique",
          type: "numeric",
          label: "Combien de sacs la fiche du lot permet-elle d’attendre au stock final théorique ?",
          unit: "sacs",
          answer: 60,
          tolerance: 0,
          hint: "Pars du stock initial de ce lot, ajoute la réception puis retire la sortie enregistrée.",
          explanation: "Stock final théorique du lot = 100 + 50 − 90 = 60 sacs. N’utilise pas les 100 sacs du stock final annuel : les deux dossiers n’ont pas le même périmètre."
        },
        {
          id: "g1-ecart",
          type: "numeric",
          label: "Calcule l’écart d’inventaire signé : stock physique moins stock théorique",
          unit: "sacs",
          answer: -2,
          tolerance: 0,
          hint: "Soustrais la quantité attendue de la quantité réellement comptée. Un manque donne un écart négatif.",
          explanation: "Écart = 58 − 60 = −2 sacs. Le comptage montre deux sacs de moins que la fiche théorique. La cause de ce manque n’est pas encore établie."
        },
        {
          id: "g1-controles",
          type: "choice",
          label: "Quelle procédure faut-il maintenant engager ?",
          options: [
            { id: "a", label: "Attribuer immédiatement les sacs manquants à un vol." },
            { id: "b", label: "Expliquer l’écart par la différence entre CUMP et PEPS." },
            { id: "c", label: "Remplacer la quantité théorique par le comptage, sans recherche ni justificatif." },
            { id: "d", label: "Recompter, rapprocher mouvements et pièces, puis ajuster de manière justifiée et traçable." }
          ],
          answer: "d",
          hint: "Un écart est un constat. Pour en comprendre la cause, il faut contrôler le comptage et les enregistrements.",
          explanation: "On commence par recompter et rapprocher les entrées, sorties et pièces disponibles. Une saisie tardive reste une hypothèse à vérifier. Les valeurs 640 € en CUMP et 700 € en PEPS résultent de conventions de coût : elles n’expliquent pas deux sacs physiquement manquants."
        }
      ],
      takeaway: "Constater un manque ne suffit pas à en expliquer la cause. Contrôle le comptage et la traçabilité avant toute conclusion."
    }
  ],
  report: {
    title: "Ta note au responsable",
    prompt: "Rédige une note courte sur le parcours du jour. Indique le seuil de réapprovisionnement, la situation observée et les vérifications à mener. Présente ensuite le stock moyen, la rotation et la durée moyenne avec leurs unités. Distingue ce que tu peux décider de ce que le dossier ne permet pas de chiffrer",
    minLength: 80,
    checklist: [
      "Je compare le stock observé au seuil d’alerte et je précise les contrôles avant commande.",
      "Je distingue le seuil de déclenchement de la quantité à commander, qui n’est pas déterminable ici.",
      "Je donne le stock moyen, la rotation et la durée avec leurs unités et une interprétation claire."
    ],
    example: "Le stock observé de 170 sacs est inférieur au seuil d’alerte de 180 sacs. Il faut contrôler le stock disponible, les commandes en cours et le délai annoncé avant d’engager le réapprovisionnement. Le dossier ne permet pas de fixer la quantité à commander. Sur l’année, le stock moyen est de 150 sacs ; il se renouvelle 12 fois et la durée moyenne de stockage est de 30 jours. Ces résultats décrivent le bilan annuel, distinct du relevé du jour. Ces éléments constituent un exemple de correction à discuter avec le formateur, pas une notation automatique de ton texte."
  },
  glossary: [
    {
      term: "Stock minimum",
      definition: "Quantité nécessaire pour couvrir le délai habituel de livraison au rythme de vente prévu. Dans le calcul de ce dossier : ventes quotidiennes × délai."
    },
    {
      term: "Stock de sécurité",
      definition: "Réserve supplémentaire destinée à couvrir des imprévus. Ici, elle correspond au nombre de jours supplémentaires choisi multiplié par les ventes quotidiennes."
    },
    {
      term: "Stock d’alerte",
      definition: "Seuil qui déclenche la procédure de réapprovisionnement. Dans ce dossier : stock minimum + stock de sécurité. Ce n’est pas la quantité à commander."
    },
    {
      term: "Stock moyen",
      definition: "Dans la méthode utilisée ici : (stock initial + stock final) ÷ 2. Il s’exprime dans la même unité que les stocks utilisés."
    },
    {
      term: "Rotation du stock",
      definition: "Quantités vendues sur une période ÷ stock moyen de cette période. Elle indique un nombre de renouvellements."
    },
    {
      term: "Durée moyenne de stockage",
      definition: "Temps moyen exprimé en jours. Pour l’année de calcul de ce dossier : 360 ÷ rotation, ou (stock moyen × 360) ÷ ventes annuelles."
    },
    {
      term: "CUMP",
      definition: "Coût unitaire moyen pondéré : valeur totale disponible ÷ quantité totale disponible. Les quantités de chaque lot comptent dans la moyenne."
    },
    {
      term: "PEPS",
      definition: "Premiers entrés, premiers sortis : les sorties sont valorisées d’abord au coût des lots les plus anciens."
    },
    {
      term: "Stock théorique",
      definition: "Quantité attendue d’après le stock initial et les mouvements enregistrés : stock initial + entrées − sorties."
    },
    {
      term: "Écart d’inventaire",
      definition: "Stock physique moins stock théorique. Un résultat négatif indique un manque à vérifier ; il n’en établit pas la cause."
    }
  ]
};
