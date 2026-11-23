(function(root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.NCRCore = api;
})(typeof window !== 'undefined' ? window : globalThis, function() {
  'use strict';
  const VERSION = '2026.11.23.1';
  function numeric(value) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : null;
    const clean = String(value ?? '').trim().replace(/[\s\u00a0\u202f]/g, '').replace(',', '.').replace(/\u2212/g, '-');
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(clean)) return null;
    const n = Number(clean);
    return Number.isFinite(n) ? n : null;
  }
  function empty(value) { return value == null || String(value).trim() === ''; }
  function correct(question, value) {
    if (empty(value)) return false;
    if (question.type === 'numeric') {
      const n = numeric(value);
      return n !== null && Math.abs(n - question.answer) <= (question.tolerance ?? 0.005) + 1e-10;
    }
    return String(value) === String(question.answer);
  }
  function questionState() { return {value:'',attempts:0,status:'pending',firstValue:null,firstCorrect:false,hintUsed:false,solutionUsed:false,feedback:false}; }
  function fresh(game) {
    const answers = {};
    game.missions.forEach(m => m.questions.forEach(q => {answers[q.id] = questionState();}));
    return {version:VERSION,game:game.id,started:false,pseudo:'',mission:0,seconds:0,answers,report:'',criteria:[],createdAt:null,completedAt:null,reportReady:false,reportExampleUsed:false};
  }
  function restore(game, raw) {
    const base=fresh(game);
    if (!raw || raw.version !== VERSION || raw.game !== game.id || !raw.answers || typeof raw.answers !== 'object') return base;
    base.started=raw.started===true;
    base.pseudo=typeof raw.pseudo==='string' ? raw.pseudo.slice(0,40) : '';
    base.mission=Number.isInteger(raw.mission) ? Math.max(0,Math.min(raw.mission,game.missions.length-1)) : 0;
    base.seconds=Number.isFinite(raw.seconds) ? Math.max(0,raw.seconds) : 0;
    base.report=typeof raw.report==='string' ? raw.report.slice(0,6000) : '';
    base.criteria=Array.isArray(raw.criteria) ? raw.criteria.filter(x=>Number.isInteger(x)&&x>=0&&x<game.report.checklist.length) : [];
    base.createdAt=typeof raw.createdAt==='string' ? raw.createdAt : null;
    base.completedAt=typeof raw.completedAt==='string' ? raw.completedAt : null;
    base.reportReady=raw.reportReady===true;
    base.reportExampleUsed=raw.reportExampleUsed===true;
    game.missions.forEach(m=>m.questions.forEach(q=>{
      const a=raw.answers[q.id];
      if (!a || typeof a!=='object') return;
      const value=(typeof a.value==='string'||typeof a.value==='number') ? String(a.value).slice(0,80) : '';
      const attempts=Number.isInteger(a.attempts)&&a.attempts>=0 ? Math.min(a.attempts,9999) : 0;
      const status=['valid','guided'].includes(a.status)&&correct(q,value) ? a.status : (a.status==='invalid'?'invalid':'pending');
      base.answers[q.id]={value,attempts,status,firstValue:typeof a.firstValue==='string'?a.firstValue.slice(0,80):null,firstCorrect:a.firstCorrect===true&&attempts>0&&typeof a.firstValue==='string'&&correct(q,a.firstValue),hintUsed:a.hintUsed===true,solutionUsed:a.solutionUsed===true,feedback:a.feedback===true};
    }));
    base.reportReady=base.reportReady&&canReport(game,base);
    return base;
  }
  function attempt(question, previous, value) {
    const next={...previous,value:String(value ?? '').trim()};
    if (['valid','guided'].includes(previous.status)) return {...previous};
    if (empty(value)) return {...next,feedback:true,missing:true};
    const ok=correct(question,value);
    if(next.attempts===0) { next.firstValue=next.value; next.firstCorrect=ok; }
    next.attempts+=1;
    next.status=ok?'valid':'invalid'; next.feedback=true; next.missing=false;
    return next;
  }
  function solve(question, previous) {
    return {...previous,value:String(question.answer),status:'guided',solutionUsed:true,feedback:true,missing:false};
  }
  function done(answer) { return answer && ['valid','guided'].includes(answer.status); }
  function missionDone(mission,state) {return mission.questions.every(q=>done(state.answers[q.id]));}
  function coreDone(game,state) {return game.missions.slice(0,game.coreCount).every(m=>missionDone(m,state));}
  function stats(game,state,optional=false) {
    const missions=optional?game.missions.slice(game.coreCount):game.missions.slice(0,game.coreCount);
    const qs=missions.flatMap(m=>m.questions);
    const completed=qs.filter(q=>done(state.answers[q.id])).length;
    const first=qs.filter(q=>{const a=state.answers[q.id];return a?.firstCorrect&&!a.hintUsed&&!a.solutionUsed;}).length;
    return {total:qs.length,completed,first,guided:qs.filter(q=>state.answers[q.id]?.solutionUsed).length,hints:qs.filter(q=>state.answers[q.id]?.hintUsed).length,percent:qs.length?Math.round(completed/qs.length*100):0};
  }
  function unlocked(game,state,index) {
    if(index<0||index>=game.missions.length) return false;
    if(index===0) return true;
    if(index>=game.coreCount) return coreDone(game,state);
    return game.missions.slice(0,index).every(m=>missionDone(m,state));
  }
  function canReport(game,state) {return coreDone(game,state)&&state.report.trim().length>=game.report.minLength&&game.report.checklist.every((_,i)=>state.criteria.includes(i));}
  return {VERSION,numeric,empty,correct,fresh,restore,attempt,solve,done,missionDone,coreDone,stats,unlocked,canReport};
});
