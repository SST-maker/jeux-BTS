'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const C = require(path.join(root, 'dist/assets/core.js'));
const sandbox = { window: {} };
for (const id of ['go1', 'go2']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, `dist/assets/data/${id}.js`), 'utf8'), sandbox, { filename: `${id}.js` });
}
const games = sandbox.window.NCR_GAMES;
const clone = value => JSON.parse(JSON.stringify(value));
const questions = game => game.missions.flatMap(m => m.questions);
const getQ = (game, id) => questions(game).find(q => q.id === id);
const finishMission = (mission, state) => {
  for (const q of mission.questions) state.answers[q.id] = C.attempt(q, state.answers[q.id], String(q.answer));
};
const finishCore = (game, state) => {
  for (const mission of game.missions.slice(0, game.coreCount)) finishMission(mission, state);
};
const fillReport = (game, state) => {
  state.report = 'Une décision justifiée doit distinguer les données du dossier, les calculs effectués et les limites de notre conclusion.';
  state.criteria = game.report.checklist.map((_, i) => i);
};

test('les deux parcours proposent 36 contrôles principaux et 10 prolongements séparés', () => {
  const a = C.fresh(games.go1), b = C.fresh(games.go2);
  assert.equal(C.stats(games.go1, a).total, 14);
  assert.equal(C.stats(games.go2, b).total, 22);
  assert.equal(C.stats(games.go1, a, true).total, 10);
  assert.equal(C.stats(games.go2, b, true).total, 0);
  assert.equal(questions(games.go1).length + questions(games.go2).length, 46);
  const ids = [...questions(games.go1), ...questions(games.go2)].map(q => q.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('la saisie numérique comprend les espaces français, virgules, décimales et signes', () => {
  const samples = [
    ['5 000', 5000], ['5\u00a0000,50', 5000.5], ['1\u202f234,56', 1234.56],
    ['  -2  ', -2], ['-10', -10], ['10,67', 10.67], ['0', 0], [0, 0],
    ['+480', 480], ['0.25', 0.25]
  ];
  for (const [input, expected] of samples) assert.equal(C.numeric(input), expected, String(input));
});

test('les saisies vides ou non numériques ne deviennent pas des montants', () => {
  for (const input of ['', '   ', '\u00a0\u202f', null, undefined, 'cinq', '12 euros', 'Infinity', Infinity, NaN, '-Infinity', '1,2,3', '3.4.5', '<script>']) {
    assert.equal(C.numeric(input), null, String(input));
  }
});

test('un champ vide ne vaut jamais zéro et ne consomme pas un essai', () => {
  const zero = { id: 'zero', type: 'numeric', answer: 0, tolerance: 0 };
  const firstQ = games.go1.missions[0].questions[0];
  const initial = C.fresh(games.go1).answers[firstQ.id];
  for (const blank of ['', ' ', '\n\t', null, undefined]) {
    assert.equal(C.correct(zero, blank), false);
    const next = C.attempt(zero, initial, blank);
    assert.equal(next.attempts, 0);
    assert.equal(next.firstValue, null);
    assert.equal(next.firstCorrect, false);
    assert.equal(next.status, 'pending');
    assert.equal(next.missing, true);
  }
  const entered = C.attempt(zero, initial, '0');
  assert.equal(entered.attempts, 1);
  assert.equal(entered.status, 'valid');
  assert.equal(entered.firstCorrect, true);
});

test('une réponse incorrecte puis une réponse vide conserve le premier essai', () => {
  const q = games.go1.missions[0].questions[0];
  const first = C.attempt(q, C.fresh(games.go1).answers[q.id], '999');
  const blank = C.attempt(q, first, ' ');
  assert.equal(blank.attempts, 1);
  assert.equal(blank.firstValue, '999');
  assert.equal(blank.status, 'invalid');
  assert.equal(blank.missing, true);
});

test('la tolérance CUMP accepte le prix affiché sans accepter les arrondis prématurés', () => {
  const unit = getQ(games.go1, 'g1-cump');
  const out = getQ(games.go1, 'g1-sorties-cump');
  const final = getQ(games.go1, 'g1-stock-cump');
  assert.equal(C.correct(unit, '10,67'), true);
  assert.equal(C.correct(unit, 1600 / 150), true);
  assert.equal(C.correct(unit, '10,66'), false);
  assert.equal(C.correct(out, '960'), true);
  assert.equal(C.correct(out, '960,30'), false);
  assert.equal(C.correct(final, '640'), true);
  assert.equal(C.correct(final, '640,20'), false);
});

test('le choix est contrôlé par son identifiant, sans accepter le libellé ou une option voisine', () => {
  const q = getQ(games.go2, 'go2-classer-achat');
  assert.equal(C.correct(q, 'achats'), true);
  assert.equal(C.correct(q, 'encaissements'), false);
  assert.equal(C.correct(q, q.options.find(o => o.id === q.answer).label), false);
  assert.equal(C.correct(q, ''), false);
});

test('réussir sans aide au premier essai est distinct de la réussite après entraînement', () => {
  const game = games.go1, state = C.fresh(game), q = game.missions[0].questions[0];
  state.answers[q.id] = C.attempt(q, state.answers[q.id], String(q.answer));
  const first = C.stats(game, state);
  assert.equal(first.completed, 1);
  assert.equal(first.first, 1);
  assert.equal(first.hints, 0);
  const retry = C.attempt(q, state.answers[q.id], String(q.answer));
  assert.equal(retry.attempts, 1, 'revérifier une réponse validée ne multiplie pas les essais');
  assert.equal(retry.firstValue, String(q.answer));
});

test('une réponse fausse corrigée ensuite reste identifiée comme un apprentissage en deux essais', () => {
  const game = games.go2, state = C.fresh(game), q = game.missions[0].questions[0];
  state.answers[q.id] = C.attempt(q, state.answers[q.id], '6000');
  assert.equal(state.answers[q.id].status, 'invalid');
  state.answers[q.id] = C.attempt(q, state.answers[q.id], '5000');
  assert.equal(state.answers[q.id].attempts, 2);
  assert.equal(state.answers[q.id].firstValue, '6000');
  assert.equal(C.stats(game, state).completed, 1);
  assert.equal(C.stats(game, state).first, 0);
});

test('une réussite après indice reste validée sans devenir une réussite autonome', () => {
  const game = games.go1, state = C.fresh(game), q = game.missions[0].questions[0];
  state.answers[q.id].hintUsed = true;
  state.answers[q.id] = C.attempt(q, state.answers[q.id], String(q.answer));
  assert.equal(state.answers[q.id].status, 'valid');
  assert.equal(state.answers[q.id].attempts, 1);
  assert.equal(C.stats(game, state).completed, 1);
  assert.equal(C.stats(game, state).first, 0);
  assert.equal(C.stats(game, state).hints, 1);
});

test('consulter la correction termine le contrôle en conservant le statut guidé', () => {
  const game = games.go2, state = C.fresh(game), q = game.missions[0].questions[0];
  state.answers[q.id] = C.attempt(q, state.answers[q.id], '100');
  state.answers[q.id] = C.attempt(q, state.answers[q.id], '50');
  state.answers[q.id] = C.solve(q, state.answers[q.id]);
  const a = state.answers[q.id];
  assert.equal(a.status, 'guided');
  assert.equal(a.solutionUsed, true);
  assert.equal(a.attempts, 2);
  assert.equal(a.firstValue, '100');
  assert.equal(C.correct(q, a.value), true);
  assert.equal(C.stats(game, state).completed, 1);
  assert.equal(C.stats(game, state).guided, 1);
  assert.equal(C.stats(game, state).first, 0);
});

test('un contrôle déjà clos conserve la réponse qui l’a validé', () => {
  const q = games.go1.missions[0].questions[0];
  const initial = C.fresh(games.go1).answers[q.id];
  for (const closed of [C.attempt(q, initial, String(q.answer)), C.solve(q, initial)]) {
    const next = C.attempt(q, closed, '999');
    assert.equal(next.value, closed.value, 'une réponse verrouillée ne doit pas être remplacée par une valeur erronée');
    assert.equal(next.status, closed.status);
    assert.equal(next.attempts, closed.attempts);
  }
});

test('les missions GO1 se débloquent dans l’ordre ; ses bonus ne conditionnent pas le bilan', () => {
  const game = games.go1, state = C.fresh(game);
  assert.equal(C.unlocked(game, state, 0), true);
  for (let i = 1; i < game.missions.length; i++) assert.equal(C.unlocked(game, state, i), false);
  for (let i = 0; i < game.coreCount; i++) {
    assert.equal(C.unlocked(game, state, i), true);
    finishMission(game.missions[i], state);
    assert.equal(C.missionDone(game.missions[i], state), true);
  }
  assert.equal(C.coreDone(game, state), true);
  assert.equal(C.unlocked(game, state, 3), true);
  assert.equal(C.unlocked(game, state, 4), true);
  assert.equal(C.stats(game, state, true).completed, 0);
  fillReport(game, state);
  assert.equal(C.canReport(game, state), true);
  assert.equal(C.unlocked(game, state, -1), false);
  assert.equal(C.unlocked(game, state, game.missions.length), false);
});

test('les 36 contrôles du cœur des deux jeux sont réalisables, puis les 10 bonus restent séparés', () => {
  let total = 0;
  for (const game of [games.go1, games.go2]) {
    const state = C.fresh(game);
    finishCore(game, state);
    const before = C.stats(game, state);
    total += before.completed;
    assert.equal(before.completed, before.total);
    assert.equal(before.first, before.total);
    assert.equal(before.percent, 100);
    for (const mission of game.missions.slice(game.coreCount)) finishMission(mission, state);
    assert.deepEqual(C.stats(game, state), before, 'les bonus ne changent pas le score du parcours principal');
    if (game.id === 'go1') assert.equal(C.stats(game, state, true).completed, 10);
  }
  assert.equal(total, 36);
});

test('le bilan exige le cœur terminé, 80 caractères utiles et tous les critères cochés', () => {
  for (const game of [games.go1, games.go2]) {
    const state = C.fresh(game);
    assert.equal(game.report.minLength, 80);
    fillReport(game, state);
    assert.equal(C.canReport(game, state), false, 'une note seule ne termine pas les missions');
    finishCore(game, state);
    state.report = ' '.repeat(100);
    assert.equal(C.canReport(game, state), false, 'les espaces ne constituent pas une note');
    state.report = 'a'.repeat(79);
    assert.equal(C.canReport(game, state), false);
    state.report = 'a'.repeat(80);
    state.criteria = [];
    assert.equal(C.canReport(game, state), false);
    state.criteria = game.report.checklist.map((_, i) => i).slice(0, -1);
    assert.equal(C.canReport(game, state), false);
    state.criteria = game.report.checklist.map((_, i) => i);
    assert.equal(C.canReport(game, state), true, 'seule la complétude est vérifiée, pas la qualité du texte');
  }
});

test('les sessions et réponses des deux jeux sont indépendantes', () => {
  const a = C.fresh(games.go1), aSecond = C.fresh(games.go1), b = C.fresh(games.go2);
  finishCore(games.go1, a); fillReport(games.go1, a);
  a.pseudo = 'Élève A';
  assert.equal(C.stats(games.go1, aSecond).completed, 0);
  assert.equal(C.stats(games.go2, b).completed, 0);
  assert.equal(aSecond.report, '');
  assert.equal(b.report, '');
  assert.equal(b.pseudo, '');
  assert.notEqual(a.answers, aSecond.answers);
  assert.notEqual(a.criteria, b.criteria);
});

test('une reprise JSON conserve le travail valide, les essais, les aides et la rédaction', () => {
  const game = games.go2, state = C.fresh(game), q = game.missions[0].questions[0];
  state.started = true; state.pseudo = 'Élève 2'; state.seconds = 132; state.createdAt = '2026-11-23T12:00:00Z';
  state.answers[q.id].hintUsed = true;
  state.answers[q.id] = C.attempt(q, state.answers[q.id], '5000');
  state.report = 'Je prépare ma note et je souhaite la retrouver après fermeture.';
  state.criteria = [0, 2];
  const restored = C.restore(game, clone(state));
  assert.equal(restored.pseudo, state.pseudo);
  assert.equal(restored.seconds, 132);
  assert.equal(restored.report, state.report);
  assert.deepEqual(restored.criteria, [0, 2]);
  assert.equal(restored.answers[q.id].status, 'valid');
  assert.equal(restored.answers[q.id].hintUsed, true);
  assert.equal(restored.answers[q.id].attempts, 1);
  assert.equal(C.stats(game, restored).first, 0);
});

test('une sauvegarde d’un autre jeu, d’une ancienne version ou sans réponses est ignorée', () => {
  const game = games.go1, fresh = C.fresh(game);
  for (const raw of [null, {}, { ...fresh, version: 'obsolete' }, { ...fresh, game: 'go2' }, { ...fresh, answers: null }]) {
    assert.deepEqual(C.restore(game, raw), fresh);
  }
});

test('la restauration assainit les champs de forme corrompus et les réponses incohérentes', () => {
  const game = games.go1, raw = C.fresh(game), q = game.missions[0].questions[0];
  Object.assign(raw, { started: 'true', pseudo: 'x'.repeat(100), mission: 999, seconds: -200, report: 'z'.repeat(7000), criteria: [-1, 0, '1', 999], createdAt: 7 });
  Object.assign(raw.answers[q.id], { value: '999', status: 'valid', attempts: -6, feedback: 'true' });
  const restored = C.restore(game, raw);
  assert.equal(restored.started, false);
  assert.equal(restored.pseudo.length, 40);
  assert.equal(restored.mission, game.missions.length - 1);
  assert.equal(restored.seconds, 0);
  assert.equal(restored.report.length, 6000);
  assert.deepEqual(restored.criteria, [0]);
  assert.equal(restored.createdAt, null);
  assert.equal(restored.answers[q.id].attempts, 0);
  assert.equal(restored.answers[q.id].status, 'pending');
  assert.equal(restored.answers[q.id].feedback, false);
  assert.equal(C.coreDone(game, restored), false);
});

test('une sauvegarde incohérente ne peut compter une mauvaise première réponse comme réussite autonome', () => {
  const game = games.go1, raw = C.fresh(game), q = game.missions[0].questions[0];
  Object.assign(raw.answers[q.id], { value: '999', status: 'valid', attempts: 1, firstValue: '999', firstCorrect: true });
  const restored = C.restore(game, raw);
  assert.equal(C.stats(game, restored).completed, 0);
  assert.equal(C.stats(game, restored).first, 0, 'le drapeau premier essai doit rester cohérent avec sa réponse');
});

test('un bilan restauré ne reste pas prêt si son texte ou ses critères sont incomplets', () => {
  const game = games.go2, raw = C.fresh(game);
  finishCore(game, raw);
  raw.report = ''; raw.criteria = []; raw.reportReady = true;
  const restored = C.restore(game, raw);
  assert.equal(C.canReport(game, restored), false);
  assert.equal(restored.reportReady, false, 'le statut prêt doit correspondre à un bilan réellement complet');
});
