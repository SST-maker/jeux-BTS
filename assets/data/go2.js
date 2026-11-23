window.NCR_GAMES = window.NCR_GAMES || {};
window.NCR_GAMES.go2 = {
  id: "go2",
  year: "2e année",
  code: "S12",
  title: "Opération Flux",
  company: "Équipement Local",
  subtitle: "Rétablis le circuit des budgets, du chiffre d’affaires au bon mois d’encaissement",
  intro: "Équipement Local prépare son activité de janvier et février. Le responsable veut un plan fiable : les ventes, les achats et la TVA doivent être calculés, puis chaque mouvement d’argent doit retrouver son mois. À toi de remettre les flux dans l’ordre et de conserver les reports jusqu’en mars",
  role: "Assistant de gestion",
  duration: "40–50 min",
  coreCount: 5,
  objectives: [
    "Construire les ventes et les achats HT/TTC.",
    "Distinguer TVA collectée, déductible et nette.",
    "Placer les encaissements et les paiements de TVA au bon mois.",
    "Expliquer les décalages sans inventer un solde bancaire."
  ],
  sourceNote: "Cas pédagogique fictif NCR Solutions · Adaptation interactive du dossier GO-2A-S12 « Construire les budgets partiels ». Durées indicatives. Le taux de TVA et le paiement au mois suivant sont les conventions de ce dossier.",
  missions: [
    {
      id: "ventes",
      title: "Reconstituer les ventes",
      kicker: "Budget des ventes",
      duration: "7 min",
      optional: false,
      intro: "Deux prévisions de commandes arrivent sur ton bureau. Le responsable attend les montants hors taxe et toutes taxes comprises, clairement séparés",
      goal: "Complète les quatre cases du budget des ventes",
      visual: "sales",
      documents: [
        {
          title: "Prévisions commerciales",
          text: "Les quantités et le prix unitaire sont les données de départ. La TVA du cas est de 20 %.",
          table: {
            headers: ["Période", "Quantité prévue", "Prix unitaire HT", "TVA"],
            rows: [
              ["Janvier", "100 unités", "50 €", "20 %"],
              ["Février", "120 unités", "50 €", "20 %"]
            ]
          },
          note: "Tu construis ici le budget des ventes. Le mois d’encaissement sera traité plus tard."
        }
      ],
      questions: [
        {
          id: "go2-jan-ht",
          type: "numeric",
          label: "Quel chiffre d’affaires HT est prévu en janvier ?",
          unit: "€ HT",
          answer: 5000,
          tolerance: 0.005,
          hint: "Multiplie le nombre d’unités par le prix de vente unitaire hors taxe.",
          explanation: "CA HT = quantité × prix unitaire HT = 100 × 50 = 5 000 € HT. C’est le montant prévu avant l’ajout de la TVA."
        },
        {
          id: "go2-jan-ttc",
          type: "numeric",
          label: "Quel montant TTC correspond aux ventes prévues en janvier ?",
          unit: "€ TTC",
          answer: 6000,
          tolerance: 0.005,
          hint: "Calcule d’abord le HT. Avec une TVA de 20 %, TTC = HT × 1,20.",
          explanation: "TVA = 5 000 × 20 % = 1 000 €. CA TTC = 5 000 + 1 000 = 6 000 € TTC. Ce montant facturé n’est pas encore un encaissement."
        },
        {
          id: "go2-fev-ht",
          type: "numeric",
          label: "Quel chiffre d’affaires HT est prévu en février ?",
          unit: "€ HT",
          answer: 6000,
          tolerance: 0.005,
          hint: "Le prix unitaire reste à 50 € HT, mais le nombre d’unités change.",
          explanation: "CA HT de février = 120 × 50 = 6 000 € HT. La quantité prévue augmente alors que le prix unitaire reste identique."
        },
        {
          id: "go2-fev-ttc",
          type: "numeric",
          label: "Quel montant TTC correspond aux ventes prévues en février ?",
          unit: "€ TTC",
          answer: 7200,
          tolerance: 0.005,
          hint: "Ajoute 20 % de TVA au chiffre d’affaires HT de février.",
          explanation: "TVA = 6 000 × 20 % = 1 200 €. CA TTC = 6 000 + 1 200 = 7 200 € TTC. Garde bien séparées les colonnes HT et TTC."
        }
      ],
      takeaway: "Le budget des ventes part des quantités et du prix HT. Le TTC ajoute la TVA ; il ne dit pas à quelle date l’argent entre."
    },
    {
      id: "achats",
      title: "Préparer les achats",
      kicker: "Approvisionnements",
      duration: "6 min",
      optional: false,
      intro: "Les approvisionnements sont prévus, mais le dossier mélange achats et règlements clients. Vérifie les montants, puis classe chaque information dans le bon budget",
      goal: "Calcule deux achats TTC et distingue budget des achats et budget des encaissements",
      visual: "purchases",
      documents: [
        {
          title: "Prévisions d’approvisionnement",
          text: "Les achats sont exprimés hors taxe. La TVA déductible retenue dans ce cas est de 20 % des achats HT.",
          table: {
            headers: ["Période", "Achats HT", "TVA du cas"],
            rows: [
              ["Janvier", "3 000 €", "20 %"],
              ["Février", "3 600 €", "20 %"]
            ]
          },
          note: "Les échéances de règlement des fournisseurs ne sont pas précisées. Un achat prévu n’est pas automatiquement un paiement du même mois."
        },
        {
          title: "Une information à ranger",
          text: "Des créances clients de décembre, déjà exprimées TTC, seront encaissées en janvier : 4 800 €."
        }
      ],
      questions: [
        {
          id: "go2-achats-jan",
          type: "numeric",
          label: "Quel est le montant des achats TTC de janvier ?",
          unit: "€ TTC",
          answer: 3600,
          tolerance: 0.005,
          hint: "Achats TTC = achats HT + TVA sur les achats. La TVA vaut ici 20 % du HT.",
          explanation: "TVA déductible de janvier = 3 000 × 20 % = 600 €. Achats TTC = 3 000 + 600 = 3 600 €. Cela ne permet pas de connaître leur mois de paiement."
        },
        {
          id: "go2-achats-fev",
          type: "numeric",
          label: "Quel est le montant des achats TTC de février ?",
          unit: "€ TTC",
          answer: 4320,
          tolerance: 0.005,
          hint: "Applique le même raisonnement aux 3 600 € HT de février.",
          explanation: "TVA déductible de février = 3 600 × 20 % = 720 €. Achats TTC = 3 600 + 720 = 4 320 €."
        },
        {
          id: "go2-classer-achat",
          type: "choice",
          label: "Où classer « Prévision d’approvisionnement : 3 000 € HT en janvier » ?",
          options: [
            { id: "encaissements", label: "Budget des encaissements : c’est une entrée d’argent." },
            { id: "achats", label: "Budget des achats : c’est un approvisionnement prévu." },
            { id: "ventes", label: "Budget des ventes : c’est du chiffre d’affaires prévu." }
          ],
          answer: "achats",
          hint: "Identifie le sens de l’opération : l’entreprise prévoit-elle de vendre, d’acheter ou de recevoir un règlement ?",
          explanation: "Les 3 000 € HT sont une prévision d’approvisionnement : ils relèvent du budget des achats. Ils ne sont ni une vente, ni un encaissement client."
        },
        {
          id: "go2-classer-encaissement",
          type: "choice",
          label: "Où classer « Règlement client de 4 800 € TTC attendu en janvier » ?",
          options: [
            { id: "ventes", label: "Ventes de janvier : toute somme reçue correspond à une vente du mois." },
            { id: "achats", label: "Achats de janvier : la somme est exprimée TTC." },
            { id: "encaissements", label: "Encaissements de janvier : c’est un paiement client attendu ce mois-là." }
          ],
          answer: "encaissements",
          hint: "La vente remonte à décembre. Quelle information donne maintenant le mot « règlement » ?",
          explanation: "Les 4 800 € TTC sont une créance de décembre qui devient un encaissement en janvier. Recevoir le paiement en janvier ne transforme pas la vente de décembre en vente de janvier."
        }
      ],
      takeaway: "Le budget des achats prévoit les approvisionnements. Le budget des encaissements positionne les règlements clients dans le temps."
    },
    {
      id: "tva",
      title: "Fermer le circuit TVA",
      kicker: "Collectée, déductible, nette",
      duration: "9 min",
      optional: false,
      intro: "La TVA sur les ventes et celle sur les achats arrivent dans deux circuits différents. Fais-les converger pour déterminer la TVA nette de chaque mois",
      goal: "Complète les six valeurs en euros, puis vérifie le sens de la différence",
      visual: "vat",
      documents: [
        {
          title: "Bases de calcul du dossier",
          text: "Le taux de 20 % s’applique aux ventes et aux achats de ce cas pédagogique.",
          table: {
            headers: ["Période", "Ventes prévues", "Achats HT"],
            rows: [
              ["Janvier", "100 unités × 50 € HT", "3 000 €"],
              ["Février", "120 unités × 50 € HT", "3 600 €"]
            ]
          },
          note: "La TVA nette est calculée au titre d’un mois. Sa date de paiement est une autre information."
        }
      ],
      questions: [
        {
          id: "go2-tva-col-jan",
          type: "numeric",
          label: "TVA collectée sur les ventes de janvier",
          unit: "€",
          answer: 1000,
          tolerance: 0.005,
          hint: "La TVA collectée se calcule sur le chiffre d’affaires HT, pas sur les achats.",
          explanation: "CA HT = 100 × 50 = 5 000 €. TVA collectée = 5 000 × 20 % = 1 000 €."
        },
        {
          id: "go2-tva-ded-jan",
          type: "numeric",
          label: "TVA déductible sur les achats de janvier",
          unit: "€",
          answer: 600,
          tolerance: 0.005,
          hint: "Pour la TVA déductible, utilise les achats HT de janvier.",
          explanation: "TVA déductible = achats HT × 20 % = 3 000 × 0,20 = 600 €."
        },
        {
          id: "go2-tva-nette-jan",
          type: "numeric",
          label: "TVA nette de janvier",
          unit: "€",
          answer: 400,
          tolerance: 0.005,
          hint: "TVA nette = TVA collectée − TVA déductible.",
          explanation: "TVA nette de janvier = 1 000 − 600 = 400 €. Selon le dossier, ces 400 € seront payés en février."
        },
        {
          id: "go2-tva-col-fev",
          type: "numeric",
          label: "TVA collectée sur les ventes de février",
          unit: "€",
          answer: 1200,
          tolerance: 0.005,
          hint: "Calcule d’abord 120 × 50 € HT, puis 20 % de ce montant.",
          explanation: "CA HT = 120 × 50 = 6 000 €. TVA collectée = 6 000 × 20 % = 1 200 €."
        },
        {
          id: "go2-tva-ded-fev",
          type: "numeric",
          label: "TVA déductible sur les achats de février",
          unit: "€",
          answer: 720,
          tolerance: 0.005,
          hint: "La base des achats de février est 3 600 € HT.",
          explanation: "TVA déductible = 3 600 × 20 % = 720 €."
        },
        {
          id: "go2-tva-nette-fev",
          type: "numeric",
          label: "TVA nette de février",
          unit: "€",
          answer: 480,
          tolerance: 0.005,
          hint: "Retranche la TVA déductible de février à sa TVA collectée.",
          explanation: "TVA nette de février = 1 200 − 720 = 480 €. Selon la convention du dossier, ces 480 € seront payés en mars."
        }
      ],
      takeaway: "La TVA nette est la différence entre collectée et déductible. Dans ce dossier, le paiement intervient le mois suivant ; cette convention ne vaut pas pour toutes les situations réelles."
    },
    {
      id: "calendrier",
      title: "Replacer les flux",
      kicker: "Calendrier des règlements",
      duration: "9 min",
      optional: false,
      intro: "Le dossier s’arrête à février, mais les flux continuent en mars. Associe chaque carte au mois où l’argent entre ou sort réellement selon l’énoncé",
      goal: "Affecte les cinq cartes à janvier, février ou mars",
      visual: "calendar",
      documents: [
        {
          title: "Règles du dossier Équipement Local",
          text: "Les clients paient le mois suivant leur achat. Les créances de décembre à encaisser en janvier représentent 4 800 € TTC. La TVA calculée pour un mois est payée le mois suivant, selon la convention de cet exercice.",
          note: "Place une carte en choisissant son mois. Tous les contrôles fonctionnent au clavier et au tactile. Les échéances de TVA indiquées ici sont propres au cas pédagogique."
        }
      ],
      questions: [
        {
          id: "go2-flux-dec",
          type: "allocation",
          label: "Entrée client · Créance de décembre : 4 800 € TTC",
          options: [
            { id: "jan", label: "Janvier" },
            { id: "feb", label: "Février" },
            { id: "mar", label: "Mars" }
          ],
          answer: "jan",
          hint: "Cette créance existe avant janvier. Relis le mois d’encaissement prévu dans l’énoncé.",
          explanation: "La créance de décembre, 4 800 € TTC, est encaissée en janvier. Elle est déjà TTC : aucune TVA supplémentaire n’est à ajouter à l’encaissement."
        },
        {
          id: "go2-flux-jan",
          type: "allocation",
          label: "Entrée client · Ventes de janvier : 6 000 € TTC",
          options: [
            { id: "jan", label: "Janvier" },
            { id: "feb", label: "Février" },
            { id: "mar", label: "Mars" }
          ],
          answer: "feb",
          hint: "Les ventes sont datées de janvier, et les clients règlent le mois suivant.",
          explanation: "Les ventes de janvier, 6 000 € TTC, sont encaissées en février. Elles figurent donc dans les ventes de janvier et dans les encaissements de février."
        },
        {
          id: "go2-flux-fev",
          type: "allocation",
          label: "Entrée client · Ventes de février : 7 200 € TTC",
          options: [
            { id: "jan", label: "Janvier" },
            { id: "feb", label: "Février" },
            { id: "mar", label: "Mars" }
          ],
          answer: "mar",
          hint: "Le tableau d’activité s’arrête en février, mais la créance doit être conservée jusqu’à son règlement.",
          explanation: "Les ventes de février sont encaissées en mars : 7 200 € TTC à reporter. Une créance ne disparaît pas parce que la période étudiée se termine."
        },
        {
          id: "go2-flux-tva-jan",
          type: "allocation",
          label: "Sortie TVA · TVA nette de janvier : 400 €",
          options: [
            { id: "jan", label: "Janvier" },
            { id: "feb", label: "Février" },
            { id: "mar", label: "Mars" }
          ],
          answer: "feb",
          hint: "Applique uniquement la convention du dossier : TVA du mois payée le mois suivant.",
          explanation: "Les 400 € sont calculés au titre de janvier et payés en février selon l’énoncé. Le mois de calcul et le mois du décaissement sont distincts."
        },
        {
          id: "go2-flux-tva-fev",
          type: "allocation",
          label: "Sortie TVA · TVA nette de février : 480 €",
          options: [
            { id: "jan", label: "Janvier" },
            { id: "feb", label: "Février" },
            { id: "mar", label: "Mars" }
          ],
          answer: "mar",
          hint: "Quel mois suit février ? Cette sortie fait partie des reports à conserver.",
          explanation: "Les 480 € de TVA nette de février sont payés en mars selon la convention du cas. Mars comporte donc un encaissement client de 7 200 € et ce paiement de TVA de 480 €, sans que ces deux flux suffisent à déterminer le solde bancaire final."
        }
      ],
      takeaway: "Un budget des encaissements suit les dates de paiement, pas les dates de vente. Les créances et paiements après février restent dans le calendrier."
    },
    {
      id: "audit",
      title: "L’audit du responsable",
      kicker: "Décider et rendre compte",
      duration: "5 min + note",
      optional: false,
      intro: "Le responsable t’envoie trois conclusions à vérifier. Choisis à chaque fois celle qui respecte les données, puis rédige ta note de transmission",
      goal: "Détecte les trois confusions qui pourraient fausser les décisions",
      visual: "audit",
      documents: [
        {
          title: "Le dossier reste ouvert",
          text: "Tu disposes des prévisions de ventes et d’achats, du calendrier client et de la convention de TVA. Le solde bancaire initial, les autres charges et les dates de paiement des fournisseurs ne sont pas indiqués.",
          note: "Une conclusion professionnelle distingue ce qui est calculable et les informations encore nécessaires."
        }
      ],
      questions: [
        {
          id: "go2-audit-banque",
          type: "choice",
          label: "« Nos ventes de janvier font 6 000 € TTC : nous avons donc 6 000 € disponibles en banque. » Que réponds-tu ?",
          options: [
            { id: "preuve", label: "Les encaissements clients de janvier sont de 4 800 €, issus de décembre. Le solde disponible en banque n’est pas calculable avec ce seul dossier." },
            { id: "addition", label: "Nous avons 10 800 € disponibles : les ventes de janvier s’ajoutent forcément aux créances de décembre." },
            { id: "accord", label: "C’est exact : une vente prévue constitue immédiatement une somme disponible en banque." }
          ],
          answer: "preuve",
          hint: "Distingue trois éléments : les ventes du mois, les encaissements du mois et le solde du compte bancaire.",
          explanation: "Janvier prévoit 6 000 € TTC de ventes, payées en février. Il encaisse 4 800 € de créances de décembre. Le dossier ne donne pas le solde initial ni tous les décaissements : il ne permet donc pas de calculer un solde bancaire final."
        },
        {
          id: "go2-audit-report",
          type: "choice",
          label: "« Notre étude s’arrête en février. On peut supprimer ses ventes du suivi des encaissements. » Quelle décision prends-tu ?",
          options: [
            { id: "effacer", label: "Je supprime les ventes de février : les flux hors période n’ont plus d’utilité." },
            { id: "anticiper", label: "J’ajoute les 7 200 € aux encaissements de février pour fermer le dossier immédiatement." },
            { id: "reporter", label: "Je conserve la créance et reporte les 7 200 € TTC dans les encaissements de mars." }
          ],
          answer: "reporter",
          hint: "Une fin de tableau n’annule pas une créance. Suis le délai de règlement jusqu’à son échéance.",
          explanation: "Les 7 200 € TTC de ventes de février sont réglés en mars. Les supprimer ferait perdre une entrée attendue ; les encaisser fictivement en février avancerait à tort la trésorerie."
        },
        {
          id: "go2-audit-tva",
          type: "choice",
          label: "« La TVA de janvier est toujours payée en février, dans toutes les entreprises. » Cette conclusion est-elle justifiée ?",
          options: [
            { id: "universel", label: "Oui : le calendrier de cet exercice est obligatoirement celui de toutes les entreprises." },
            { id: "convention", label: "Non : le paiement au mois suivant est une convention de ce dossier. Il ne faut pas la généraliser à toutes les situations." },
            { id: "aucun", label: "Non : la TVA nette n’est jamais payée, car ce n’est qu’un indicateur sans décaissement." }
          ],
          answer: "convention",
          hint: "Relis la portée de la consigne : décrit-elle ce cas précis ou toutes les situations possibles ?",
          explanation: "Le dossier fixe le paiement de la TVA au mois suivant. Il faut respecter cette convention pour l’exercice et éviter d’en faire une règle universelle : ici, 400 € sont payés en février et 480 € en mars."
        }
      ],
      takeaway: "Une décision fiable relie montant, origine et échéance, conserve les reports et reconnaît les données manquantes."
    }
  ],
  report: {
    title: "Ta note au responsable",
    prompt: "Rédige quatre à six phrases. Distingue les ventes et les encaissements de janvier, indique les encaissements de février et les reports en mars. Cite aussi une information manquante pour calculer le solde de trésorerie final. Ta rédaction sera à relire avec le formateur : elle n’est pas notée automatiquement",
    minLength: 80,
    checklist: [
      "Je distingue les 6 000 € TTC de ventes de janvier des 4 800 € encaissés ce mois-là, issus de décembre.",
      "J’identifie les 6 000 € encaissés en février comme les règlements des ventes de janvier.",
      "Je conserve les 7 200 € TTC à encaisser en mars.",
      "Je place les paiements de TVA de 400 € en février et 480 € en mars, selon la convention du cas.",
      "Je précise qu’il manque le solde initial, les autres charges ou les dates de paiement des fournisseurs pour calculer un solde final."
    ],
    example: "En janvier, nous prévoyons 6 000 € TTC de ventes, mais les encaissements clients du mois sont de 4 800 €, issus de décembre. En février, nous encaissons 6 000 € provenant des ventes de janvier. Les ventes de février, 7 200 € TTC, sont encaissées en mars et doivent rester dans notre suivi. La TVA nette de janvier, 400 €, est payée en février, et celle de février, 480 €, en mars, selon la convention du dossier. Pour calculer le solde de trésorerie final, il manque notamment le solde initial et les autres décaissements."
  },
  glossary: [
    { term: "Budget des ventes", definition: "Prévision du chiffre d’affaires par période. CA HT = quantité prévue × prix de vente unitaire HT." },
    { term: "HT et TTC", definition: "HT signifie hors taxe ; TTC signifie toutes taxes comprises. Dans ce cas à 20 % de TVA, TTC = HT × 1,20." },
    { term: "Budget des achats", definition: "Prévision des approvisionnements. Dans le dossier, achats TTC = achats HT + TVA déductible sur les achats." },
    { term: "TVA collectée", definition: "Montant de TVA calculé sur les ventes du dossier : CA HT × 20 %." },
    { term: "TVA déductible", definition: "Montant de TVA retenu sur les achats du dossier : achats HT × 20 %." },
    { term: "TVA nette", definition: "TVA collectée − TVA déductible. Pour les deux mois de ce cas, cette différence est positive." },
    { term: "Créance client", definition: "Somme que le client doit encore payer. Une vente peut donc exister avant son encaissement." },
    { term: "Encaissement", definition: "Entrée d’argent reçue ou attendue à une date de règlement. Elle peut concerner une vente d’un mois précédent." },
    { term: "Report", definition: "Flux conservé dans le suivi parce que son règlement intervient après la dernière période du tableau, ici en mars." }
  ]
};
