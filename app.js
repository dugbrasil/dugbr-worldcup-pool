/* DUGgiesbr WORLD CUP 2026 POOL - v3 */

// ===== CONFIG =====
// NOTE: Firebase API keys are designed to be public (per Google's docs).
// Security is enforced by Firebase Database Rules, not the API key.
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD8jOMPKgjmxVrwzEofrho-9YCwAcjZvGk",
  authDomain: "dugbr-worldcup-pool.firebaseapp.com",
  databaseURL: "https://dugbr-worldcup-pool-default-rtdb.firebaseio.com",
  projectId: "dugbr-worldcup-pool",
  storageBucket: "dugbr-worldcup-pool.firebasestorage.app",
  messagingSenderId: "211261594337",
  appId: "1:211261594337:web:edb00939a6122e75aef5a0"
};
// Admin password stored as SHA-256 hash (original not in source)
const ADMIN_HASH = "b2187fec904b5de878ba723ac9d25576ac0758638f290ea2642c62b389f02631";
const LOCKOUT_H = 0.25; // 15 minutes before kickoff
const BUY_IN = 75;
const CHAMP_LOCK = new Date("2026-06-23T02:59:00Z"); // June 22 23:59 BRT
// PIX code loaded from Firebase at runtime (not stored in source)
let PIX_CODE = "";
const SITE_URL = "https://dugbrasil.github.io/dugbr-worldcup-pool/";

// ===== PLAYERS (no emails in public code) =====
const PLAYERS = [
  {id:"p01",name:"Caio Castro"},
  {id:"p02",name:"Carlos Belem"},
  {id:"p03",name:"Carlos Saraiva"},
  {id:"p04",name:"Cauê Ponte"},
  {id:"p05",name:"Cleberton Oliveira"},
  {id:"p06",name:"Ed Ramos"},
  {id:"p07",name:"Jair Luiz"},
  {id:"p08",name:"Jaqueline Krueger"},
  {id:"p09",name:"Luis Cypriano"},
  {id:"p10",name:"Luiz Felão"},
  {id:"p11",name:"Márcia Corredera"},
  {id:"p12",name:"Rafaela Rossi"},
  {id:"p13",name:"Valter Marques"},
  {id:"p14",name:"Wilson Duarte"},
  {id:"p15",name:"Leonardo Moreira"}  
];
// Short name helper: appends last-name initial when first name is shared (e.g. CarlosB, CarlosS)
const SHORT_NAMES={};
PLAYERS.forEach(p=>{
  const first=p.name.split(' ')[0];
  const dups=PLAYERS.filter(x=>x.name.split(' ')[0]===first);
  SHORT_NAMES[p.id]=dups.length>1?first+p.name.split(' ').slice(-1)[0][0]:first;
});
function shortName(p){return SHORT_NAMES[p.id]||p.name.split(' ')[0]}

// ===== TEAMS (48) =====
const T={
MEX:{n:"Mexico",f:"🇲🇽"},RSA:{n:"South Africa",f:"🇿🇦"},KOR:{n:"South Korea",f:"🇰🇷"},CZE:{n:"Czechia",f:"🇨🇿"},
CAN:{n:"Canada",f:"🇨🇦"},BIH:{n:"Bosnia",f:"🇧🇦"},QAT:{n:"Qatar",f:"🇶🇦"},SUI:{n:"Switzerland",f:"🇨🇭"},
BRA:{n:"Brazil",f:"🇧🇷"},MAR:{n:"Morocco",f:"🇲🇦"},HTI:{n:"Haiti",f:"🇭🇹"},SCO:{n:"Scotland",f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿"},
USA:{n:"USA",f:"🇺🇸"},PRY:{n:"Paraguay",f:"🇵🇾"},AUS:{n:"Australia",f:"🇦🇺"},TUR:{n:"Turkey",f:"🇹🇷"},
GER:{n:"Germany",f:"🇩🇪"},CUW:{n:"Curacao",f:"🇨🇼"},CIV:{n:"Ivory Coast",f:"🇨🇮"},ECU:{n:"Ecuador",f:"🇪🇨"},
NED:{n:"Netherlands",f:"🇳🇱"},JPN:{n:"Japan",f:"🇯🇵"},SWE:{n:"Sweden",f:"🇸🇪"},TUN:{n:"Tunisia",f:"🇹🇳"},
BEL:{n:"Belgium",f:"🇧🇪"},EGY:{n:"Egypt",f:"🇪🇬"},IRN:{n:"Iran",f:"🇮🇷"},NZL:{n:"New Zealand",f:"🇳🇿"},
ESP:{n:"Spain",f:"🇪🇸"},CPV:{n:"Cape Verde",f:"🇨🇻"},SAU:{n:"Saudi Arabia",f:"🇸🇦"},URU:{n:"Uruguay",f:"🇺🇾"},
FRA:{n:"France",f:"🇫🇷"},SEN:{n:"Senegal",f:"🇸🇳"},IRQ:{n:"Iraq",f:"🇮🇶"},NOR:{n:"Norway",f:"🇳🇴"},
ARG:{n:"Argentina",f:"🇦🇷"},ALG:{n:"Algeria",f:"🇩🇿"},AUT:{n:"Austria",f:"🇦🇹"},JOR:{n:"Jordan",f:"🇯🇴"},
POR:{n:"Portugal",f:"🇵🇹"},COD:{n:"DR Congo",f:"🇨🇩"},UZB:{n:"Uzbekistan",f:"🇺🇿"},COL:{n:"Colombia",f:"🇨🇴"},
ENG:{n:"England",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿"},CRO:{n:"Croatia",f:"🇭🇷"},GHA:{n:"Ghana",f:"🇬🇭"},PAN:{n:"Panama",f:"🇵🇦"},
TBD:{n:"TBD",f:"🏳️"}
};

// ===== GROUPS =====
const GROUPS = {
A:["MEX","RSA","KOR","CZE"], B:["CAN","BIH","QAT","SUI"],
C:["BRA","MAR","HTI","SCO"], D:["USA","PRY","AUS","TUR"],
E:["GER","CUW","CIV","ECU"], F:["NED","JPN","SWE","TUN"],
G:["BEL","EGY","IRN","NZL"], H:["ESP","CPV","SAU","URU"],
I:["FRA","SEN","IRQ","NOR"], J:["ARG","ALG","AUT","JOR"],
K:["POR","COD","UZB","COL"], L:["ENG","CRO","GHA","PAN"]
};

// ===== MATCHES (104) =====
// k = kickoff UTC, g = group (null for knockout), v = venue, r = round for knockout
const M = [
// MD1: June 11-17
{id:"m01",h:"MEX",a:"RSA",g:"A",k:"2026-06-11T19:00Z",v:"Mexico City"},
{id:"m02",h:"KOR",a:"CZE",g:"A",k:"2026-06-12T02:00Z",v:"Guadalajara"},
{id:"m03",h:"CAN",a:"BIH",g:"B",k:"2026-06-12T19:00Z",v:"Toronto"},
{id:"m04",h:"USA",a:"PRY",g:"D",k:"2026-06-13T01:00Z",v:"Los Angeles"},
{id:"m05",h:"QAT",a:"SUI",g:"B",k:"2026-06-13T19:00Z",v:"San Francisco"},
{id:"m06",h:"BRA",a:"MAR",g:"C",k:"2026-06-13T22:00Z",v:"New York NJ"},
{id:"m07",h:"HTI",a:"SCO",g:"C",k:"2026-06-14T01:00Z",v:"Boston"},
{id:"m08",h:"AUS",a:"TUR",g:"D",k:"2026-06-14T04:00Z",v:"Vancouver"},
{id:"m09",h:"GER",a:"CUW",g:"E",k:"2026-06-14T17:00Z",v:"Houston"},
{id:"m10",h:"NED",a:"JPN",g:"F",k:"2026-06-14T20:00Z",v:"Dallas"},
{id:"m11",h:"CIV",a:"ECU",g:"E",k:"2026-06-14T23:00Z",v:"Philadelphia"},
{id:"m12",h:"SWE",a:"TUN",g:"F",k:"2026-06-15T02:00Z",v:"Monterrey"},
{id:"m13",h:"ESP",a:"CPV",g:"H",k:"2026-06-15T16:00Z",v:"Atlanta"},
{id:"m14",h:"BEL",a:"EGY",g:"G",k:"2026-06-15T19:00Z",v:"Vancouver"},
{id:"m15",h:"SAU",a:"URU",g:"H",k:"2026-06-15T22:00Z",v:"Miami"},
{id:"m16",h:"IRN",a:"NZL",g:"G",k:"2026-06-16T01:00Z",v:"Los Angeles"},
{id:"m17",h:"FRA",a:"SEN",g:"I",k:"2026-06-16T19:00Z",v:"New York NJ"},
{id:"m18",h:"IRQ",a:"NOR",g:"I",k:"2026-06-16T22:00Z",v:"Boston"},
{id:"m19",h:"ARG",a:"ALG",g:"J",k:"2026-06-17T01:00Z",v:"Kansas City"},
{id:"m20",h:"AUT",a:"JOR",g:"J",k:"2026-06-17T04:00Z",v:"San Francisco"},
{id:"m21",h:"POR",a:"COD",g:"K",k:"2026-06-17T17:00Z",v:"Houston"},
{id:"m22",h:"ENG",a:"CRO",g:"L",k:"2026-06-17T20:00Z",v:"Dallas"},
{id:"m23",h:"GHA",a:"PAN",g:"L",k:"2026-06-17T23:00Z",v:"Toronto"},
{id:"m24",h:"UZB",a:"COL",g:"K",k:"2026-06-18T02:00Z",v:"Mexico City"},
// MD2: June 18-23
{id:"m25",h:"CZE",a:"RSA",g:"A",k:"2026-06-18T16:00Z",v:"Atlanta"},
{id:"m26",h:"SUI",a:"BIH",g:"B",k:"2026-06-18T19:00Z",v:"Los Angeles"},
{id:"m27",h:"CAN",a:"QAT",g:"B",k:"2026-06-18T22:00Z",v:"Vancouver"},
{id:"m28",h:"MEX",a:"KOR",g:"A",k:"2026-06-19T01:00Z",v:"Guadalajara"},
{id:"m29",h:"SCO",a:"MAR",g:"C",k:"2026-06-19T22:00Z",v:"Boston"},
{id:"m30",h:"USA",a:"AUS",g:"D",k:"2026-06-19T19:00Z",v:"Seattle"},
{id:"m31",h:"BRA",a:"HTI",g:"C",k:"2026-06-20T00:30Z",v:"Philadelphia"},
{id:"m32",h:"TUR",a:"PRY",g:"D",k:"2026-06-20T03:00Z",v:"San Francisco"},
{id:"m33",h:"NED",a:"SWE",g:"F",k:"2026-06-20T17:00Z",v:"Houston"},
{id:"m34",h:"GER",a:"CIV",g:"E",k:"2026-06-20T20:00Z",v:"Toronto"},
{id:"m35",h:"ECU",a:"CUW",g:"E",k:"2026-06-21T03:00Z",v:"Kansas City"},
{id:"m36",h:"TUN",a:"JPN",g:"F",k:"2026-06-21T04:00Z",v:"Monterrey"},
{id:"m37",h:"ESP",a:"SAU",g:"H",k:"2026-06-21T16:00Z",v:"Atlanta"},
{id:"m38",h:"BEL",a:"IRN",g:"G",k:"2026-06-21T19:00Z",v:"Los Angeles"},
{id:"m39",h:"URU",a:"CPV",g:"H",k:"2026-06-21T22:00Z",v:"Miami"},
{id:"m40",h:"NZL",a:"EGY",g:"G",k:"2026-06-22T01:00Z",v:"Vancouver"},
{id:"m41",h:"ARG",a:"AUT",g:"J",k:"2026-06-22T17:00Z",v:"Dallas"},
{id:"m42",h:"FRA",a:"IRQ",g:"I",k:"2026-06-22T21:00Z",v:"Philadelphia"},
{id:"m43",h:"NOR",a:"SEN",g:"I",k:"2026-06-23T00:00Z",v:"New York NJ"},
{id:"m44",h:"JOR",a:"ALG",g:"J",k:"2026-06-23T03:00Z",v:"San Francisco"},
{id:"m45",h:"POR",a:"UZB",g:"K",k:"2026-06-23T17:00Z",v:"Houston"},
{id:"m46",h:"ENG",a:"GHA",g:"L",k:"2026-06-23T20:00Z",v:"Boston"},
{id:"m47",h:"PAN",a:"CRO",g:"L",k:"2026-06-23T23:00Z",v:"Toronto"},
{id:"m48",h:"COL",a:"COD",g:"K",k:"2026-06-24T02:00Z",v:"Guadalajara"},
// MD3: June 24-27 (simultaneous kickoffs per group)
{id:"m49",h:"SUI",a:"CAN",g:"B",k:"2026-06-24T19:00Z",v:"Vancouver"},
{id:"m50",h:"BIH",a:"QAT",g:"B",k:"2026-06-24T19:00Z",v:"Seattle"},
{id:"m51",h:"SCO",a:"BRA",g:"C",k:"2026-06-24T22:00Z",v:"Miami"},
{id:"m52",h:"MAR",a:"HTI",g:"C",k:"2026-06-24T22:00Z",v:"Atlanta"},
{id:"m53",h:"CZE",a:"MEX",g:"A",k:"2026-06-25T01:00Z",v:"Mexico City"},
{id:"m54",h:"RSA",a:"KOR",g:"A",k:"2026-06-25T01:00Z",v:"Monterrey"},
{id:"m55",h:"ECU",a:"GER",g:"E",k:"2026-06-25T20:00Z",v:"New York NJ"},
{id:"m56",h:"CUW",a:"CIV",g:"E",k:"2026-06-25T20:00Z",v:"Philadelphia"},
{id:"m57",h:"JPN",a:"SWE",g:"F",k:"2026-06-25T23:00Z",v:"Dallas"},
{id:"m58",h:"TUN",a:"NED",g:"F",k:"2026-06-25T23:00Z",v:"Kansas City"},
{id:"m59",h:"TUR",a:"USA",g:"D",k:"2026-06-26T02:00Z",v:"Los Angeles"},
{id:"m60",h:"PRY",a:"AUS",g:"D",k:"2026-06-26T02:00Z",v:"San Francisco"},
{id:"m61",h:"NOR",a:"FRA",g:"I",k:"2026-06-26T19:00Z",v:"Boston"},
{id:"m62",h:"SEN",a:"IRQ",g:"I",k:"2026-06-26T19:00Z",v:"Toronto"},
{id:"m63",h:"CPV",a:"SAU",g:"H",k:"2026-06-27T00:00Z",v:"Houston"},
{id:"m64",h:"URU",a:"ESP",g:"H",k:"2026-06-27T00:00Z",v:"Guadalajara"},
{id:"m65",h:"EGY",a:"IRN",g:"G",k:"2026-06-27T03:00Z",v:"Seattle"},
{id:"m66",h:"NZL",a:"BEL",g:"G",k:"2026-06-27T03:00Z",v:"Vancouver"},
{id:"m67",h:"PAN",a:"ENG",g:"L",k:"2026-06-27T21:00Z",v:"New York NJ"},
{id:"m68",h:"CRO",a:"GHA",g:"L",k:"2026-06-27T21:00Z",v:"Philadelphia"},
{id:"m69",h:"COL",a:"POR",g:"K",k:"2026-06-27T23:30Z",v:"Miami"},
{id:"m70",h:"COD",a:"UZB",g:"K",k:"2026-06-27T23:30Z",v:"Atlanta"},
{id:"m71",h:"ALG",a:"AUT",g:"J",k:"2026-06-28T02:00Z",v:"Kansas City"},
{id:"m72",h:"JOR",a:"ARG",g:"J",k:"2026-06-28T02:00Z",v:"Dallas"},
// KNOCKOUT: Round of 32 (June 28 - July 3)
{id:"r01",h:"TBD",a:"TBD",g:null,k:"2026-06-28T19:00Z",v:"Los Angeles",r:"R32"},
{id:"r02",h:"TBD",a:"TBD",g:null,k:"2026-06-29T19:00Z",v:"Houston",r:"R32"},
{id:"r03",h:"TBD",a:"TBD",g:null,k:"2026-06-29T20:30Z",v:"Boston",r:"R32"},
{id:"r04",h:"TBD",a:"TBD",g:null,k:"2026-06-30T01:00Z",v:"Monterrey",r:"R32"},
{id:"r05",h:"TBD",a:"TBD",g:null,k:"2026-06-30T17:00Z",v:"Dallas",r:"R32"},
{id:"r06",h:"TBD",a:"TBD",g:null,k:"2026-06-30T21:00Z",v:"New York NJ",r:"R32"},
{id:"r07",h:"TBD",a:"TBD",g:null,k:"2026-07-01T01:00Z",v:"Mexico City",r:"R32"},
{id:"r08",h:"TBD",a:"TBD",g:null,k:"2026-07-01T16:00Z",v:"Atlanta",r:"R32"},
{id:"r09",h:"TBD",a:"TBD",g:null,k:"2026-07-01T20:00Z",v:"Seattle",r:"R32"},
{id:"r10",h:"TBD",a:"TBD",g:null,k:"2026-07-02T00:00Z",v:"San Francisco",r:"R32"},
{id:"r11",h:"TBD",a:"TBD",g:null,k:"2026-07-02T19:00Z",v:"Los Angeles",r:"R32"},
{id:"r12",h:"TBD",a:"TBD",g:null,k:"2026-07-02T23:00Z",v:"Toronto",r:"R32"},
{id:"r13",h:"TBD",a:"TBD",g:null,k:"2026-07-03T03:00Z",v:"Vancouver",r:"R32"},
{id:"r14",h:"TBD",a:"TBD",g:null,k:"2026-07-03T18:00Z",v:"Dallas",r:"R32"},
{id:"r15",h:"TBD",a:"TBD",g:null,k:"2026-07-03T22:00Z",v:"Miami",r:"R32"},
{id:"r16",h:"TBD",a:"TBD",g:null,k:"2026-07-04T01:30Z",v:"Kansas City",r:"R32"},
// Round of 16 (July 4-7)
{id:"r17",h:"TBD",a:"TBD",g:null,k:"2026-07-04T17:00Z",v:"Houston",r:"R16"},
{id:"r18",h:"TBD",a:"TBD",g:null,k:"2026-07-04T21:00Z",v:"Philadelphia",r:"R16"},
{id:"r19",h:"TBD",a:"TBD",g:null,k:"2026-07-05T20:00Z",v:"New York NJ",r:"R16"},
{id:"r20",h:"TBD",a:"TBD",g:null,k:"2026-07-06T00:00Z",v:"Mexico City",r:"R16"},
{id:"r21",h:"TBD",a:"TBD",g:null,k:"2026-07-06T19:00Z",v:"Dallas",r:"R16"},
{id:"r22",h:"TBD",a:"TBD",g:null,k:"2026-07-07T00:00Z",v:"Seattle",r:"R16"},
{id:"r23",h:"TBD",a:"TBD",g:null,k:"2026-07-07T16:00Z",v:"Atlanta",r:"R16"},
{id:"r24",h:"TBD",a:"TBD",g:null,k:"2026-07-07T20:00Z",v:"Vancouver",r:"R16"},
// Quarter-finals (July 9-11)
{id:"r25",h:"TBD",a:"TBD",g:null,k:"2026-07-09T20:00Z",v:"Boston",r:"QF"},
{id:"r26",h:"TBD",a:"TBD",g:null,k:"2026-07-10T19:00Z",v:"Los Angeles",r:"QF"},
{id:"r27",h:"TBD",a:"TBD",g:null,k:"2026-07-11T20:00Z",v:"Miami",r:"QF"},
{id:"r28",h:"TBD",a:"TBD",g:null,k:"2026-07-12T01:00Z",v:"Kansas City",r:"QF"},
// Semi-finals (July 14-15)
{id:"r29",h:"TBD",a:"TBD",g:null,k:"2026-07-14T19:00Z",v:"Dallas",r:"SF"},
{id:"r30",h:"TBD",a:"TBD",g:null,k:"2026-07-15T19:00Z",v:"Atlanta",r:"SF"},
// 3rd place + Final
{id:"r31",h:"TBD",a:"TBD",g:null,k:"2026-07-18T21:00Z",v:"Miami",r:"3rd"},
{id:"r32",h:"TBD",a:"TBD",g:null,k:"2026-07-19T19:00Z",v:"New York NJ",r:"Final"}
];

// ===== STATE =====
let db=null, currentUser=null, allBets={}, allMessages=[], matchResults={}, playerStatus={}, champions={}, matchFacts={}, matchOdds={}, prevRanks={}, resultsInitialized=false, liveScores={}, prevLiveScores={}, liveScoresInitialized=false;

// ===== CRYPTO =====
async function sha256(str){const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(str));return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')}

// ===== INIT =====
function initApp(){
  try{
    firebase.initializeApp(FIREBASE_CONFIG);
    db=firebase.database();
    setupFirebaseListeners();
    // Load PIX code from Firebase
    db.ref('config/pixCode').once('value',s=>{PIX_CODE=s.val()||''; setupPIXButtons()});
  }catch(e){
    console.warn("Firebase not configured, localStorage mode:",e.message);
    loadLS();
    setupPIXButtons();
  }
  setupLogin(); setupNav(); setupFilters(); setupAdmin(); setupChat();
  setInterval(()=>{if(currentUser){renderBetsWarning(); updateCountdowns();}}, 30000);
  document.addEventListener('click',()=>hideOddsTooltip());
}

// ===== ODDS TOOLTIP (fixed position, escapes overflow:hidden) =====
let _oddsHideTimer=null;
function showOddsTooltip(btn){
  clearTimeout(_oddsHideTimer);
  let tip=document.getElementById('odds-global-tip');
  if(!tip){
    tip=document.createElement('div');
    tip.id='odds-global-tip';
    tip.className='odds-global-tip';
    tip.textContent='These are the implied probabilities from major bookmakers (DraftKings, FanDuel, Bet365). They show how likely each outcome is according to the betting market.';
    document.body.appendChild(tip);
  }
  const r=btn.getBoundingClientRect();
  const tipW=240;
  let left=r.right-tipW; if(left<8)left=8;
  tip.style.left=left+'px';
  tip.style.top=r.top+'px';
  tip.style.display='block';
}
function scheduleHideOddsTooltip(){_oddsHideTimer=setTimeout(hideOddsTooltip,200)}
function hideOddsTooltip(){const t=document.getElementById('odds-global-tip');if(t)t.style.display='none';}
function toggleOddsTooltip(btn){const t=document.getElementById('odds-global-tip');if(t&&t.style.display==='block'){hideOddsTooltip()}else{showOddsTooltip(btn)}}

// ===== LOCAL STORAGE =====
function lsS(k,d){localStorage.setItem('dp_'+k,JSON.stringify(d))}
function lsL(k){try{return JSON.parse(localStorage.getItem('dp_'+k))}catch{return null}}
function loadLS(){allBets=lsL('bets')||{}; allMessages=lsL('msgs')||[]; matchResults=lsL('res')||{}; playerStatus=lsL('pstat')||{}; champions=lsL('champs')||{}}
function saveLS(){lsS('bets',allBets); lsS('msgs',allMessages); lsS('res',matchResults); lsS('pstat',playerStatus); lsS('champs',champions)}

// ===== FIREBASE =====
function setupFirebaseListeners(){
  db.ref('bets').on('value',s=>{allBets=s.val()||{}; if(currentUser)renderAll()});
  db.ref('results').on('value',s=>{
    const newRes=s.val()||{};
    if(resultsInitialized){
      Object.keys(newRes).forEach(mid=>{
        if(!matchResults[mid]){
          const match=M.find(m=>m.id===mid);
          if(match) showToast(`⚽ Result: ${T[match.h].f} ${T[match.h].n} ${newRes[mid].h} × ${newRes[mid].a} ${T[match.a].n} ${T[match.a].f}`);
        }
      });
    }
    matchResults=newRes; resultsInitialized=true;
    if(currentUser)renderAll();
  });
  db.ref('playerStatus').on('value',s=>{playerStatus=s.val()||{}; if(currentUser)updatePendingState()});
  db.ref('champions').on('value',s=>{champions=s.val()||{}; if(currentUser)renderAll()});
  db.ref('matchFacts').on('value',s=>{matchFacts=s.val()||{}});
  db.ref('matchOdds').on('value',s=>{matchOdds=s.val()||{}; if(currentUser)renderAll()});
  db.ref('liveScores').on('value',s=>{
    const newLive=s.val()||{};
    if(liveScoresInitialized){
      Object.keys(newLive).forEach(mid=>{
        const prev=prevLiveScores[mid], curr=newLive[mid];
        if(!curr)return;
        const match=M.find(m=>m.id===mid); if(!match)return;
        // Detect home goal
        if(curr.h>(prev?.h||0)){
          const isBrazil=match.h==='BRA';
          showGoalToast(T[match.h].f,T[match.h].n,curr.h,curr.a,T[match.a].n,curr.minute,isBrazil);
        }
        // Detect away goal
        if(curr.a>(prev?.a||0)){
          const isBrazil=match.a==='BRA';
          showGoalToast(T[match.a].f,T[match.a].n,curr.a,curr.h,T[match.h].n,curr.minute,isBrazil);
        }
      });
    }
    prevLiveScores={...liveScores};
    liveScores=newLive;
    liveScoresInitialized=true;
    if(currentUser)renderAll();
  });
  
  // FIX: Removed .orderByChild('ts') to prevent Firebase from filtering out messages.
// No complex sorting or filtering needed anymore!
  db.ref('messages').limitToLast(50).on('value', s => {
    allMessages = []; 
    
    s.forEach(c => {
      allMessages.push({ id: c.key, ...c.val() });
    });
    
    // 🔍 This should now output: "ARRAY CHECK: 14"
    console.log("👉 ARRAY CHECK: Total items in allMessages =", allMessages.length);
    
    if (currentUser) renderChat();
  });
}

// ===== PIX =====
function setupPIXButtons(){
  document.querySelectorAll('.pix-copy-trigger, #pix-copy-btn').forEach(b=>{
    b.addEventListener('click',()=>{
      navigator.clipboard.writeText(PIX_CODE).then(()=>{
        const el=document.getElementById('pix-copied');
        if(el){el.style.display='block'; setTimeout(()=>el.style.display='none',3000)}
        b.textContent='✓ Copied!'; setTimeout(()=>b.textContent='📋 Copy PIX key',2000);
      });
    });
  });
}

// ===== LOGIN =====
function setupLogin(){
  const sel=document.getElementById('login-select'),
        chSel=document.getElementById('champion-select'),
        chSec=document.getElementById('champion-section'),
        nextBtn=document.getElementById('login-next-btn'),
        enterBtn=document.getElementById('login-enter-btn'),
        step1=document.getElementById('login-step1'),
        step2=document.getElementById('login-step2');
  PLAYERS.forEach(p=>{const o=document.createElement('option'); o.value=p.id; o.textContent=p.name; sel.appendChild(o)});
  Object.entries(T).filter(([c])=>c!=='TBD').sort((a,b)=>a[1].n.localeCompare(b[1].n)).forEach(([c,t])=>{
    const o=document.createElement('option'); o.value=c; o.textContent=`${t.f} ${t.n}`; chSel.appendChild(o)});
  // Check if already logged in locally
  const saved=localStorage.getItem('dp_user');
  if(saved){currentUser=PLAYERS.find(p=>p.id===saved); if(currentUser){showApp(); return}}
  // When user selects name, check if they already have a champion in Firebase
  sel.addEventListener('change',()=>{
    if(!sel.value){chSec.style.display='none'; nextBtn.disabled=true; return}
    const existingChamp=champions[sel.value];
    if(existingChamp){
      // Returning user: skip champion pick, go straight to enter
      chSec.style.display='none';
      nextBtn.textContent='Next: Enter the pool';
      nextBtn.disabled=false;
      nextBtn.onclick=()=>{
        currentUser=PLAYERS.find(p=>p.id===sel.value);
        localStorage.setItem('dp_user',sel.value);
        showApp();
      };
    } else {
      // New user: show champion selection
      chSec.style.display='block';
      nextBtn.textContent='Next: Payment';
      nextBtn.disabled=!chSel.value;
      nextBtn.onclick=()=>{step1.style.display='none'; step2.style.display='block'};
    }
  });
  chSel.addEventListener('change',()=>{if(!champions[sel.value])nextBtn.disabled=!sel.value||!chSel.value});
  enterBtn.addEventListener('click',()=>{
    currentUser=PLAYERS.find(p=>p.id===sel.value); if(!currentUser)return;
    localStorage.setItem('dp_user',sel.value);
    const champ=chSel.value;
    if(db){db.ref(`champions/${sel.value}`).set(champ); db.ref(`playerStatus/${sel.value}`).set('pending')}
    else{champions[sel.value]=champ; playerStatus[sel.value]='pending'; saveLS()}
    showApp();
  });
}

function showApp(){
  document.getElementById('login-screen').style.display='none';
  document.getElementById('app-header').style.display='block';
  document.getElementById('app-content').style.display='block';
  const ch=champions[currentUser.id]; const cf=ch?T[ch]?.f||'':'';
  document.getElementById('user-area').innerHTML=`${cf} <span>${currentUser.name}</span>`;
  updatePendingState(); renderAll();
}

function isActive(pid){return playerStatus[pid]==='active'}
function updatePendingState(){
  const pending=!isActive(currentUser.id);
  document.getElementById('pending-banner').style.display=pending?'block':'none';
  document.getElementById('chat-input').disabled=pending;
  document.getElementById('chat-send').disabled=pending;
}

// ===== NAV =====
function switchTab(tab){
  document.querySelectorAll('.nav-btn').forEach(b=>{b.classList.toggle('active',b.dataset.tab===tab)});
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
}
function setupNav(){document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)))}
function setupFilters(){document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active'); renderMatches(b.dataset.filter)}))}

// ===== POINTS =====
function calcPts(bh,ba,rh,ra){
  if(bh==null||ba==null||rh==null||ra==null)return null;
  const b1=+bh,b2=+ba,r1=+rh,r2=+ra;
  if(isNaN(b1)||isNaN(b2)||isNaN(r1)||isNaN(r2))return null;
  if(b1===r1&&b2===r2)return{p:10,t:'exact'};
  if((b1-b2)===(r1-r2))return{p:5,t:'gd'};
  if(Math.sign(b1-b2)===Math.sign(r1-r2))return{p:3,t:'outcome'};
  return{p:0,t:'wrong'};
}

function getStats(pid,extraRes={}){
  let total=0,exact=0,gd=0,outcome=0,wrong=0,bets=0,streak=[];
  const allRes={...matchResults,...extraRes};
  M.forEach(m=>{
    const bet=allBets[m.id]?.[pid], res=allRes[m.id]; if(!bet)return; bets++;
    if(res){const r=calcPts(bet.h,bet.a,res.h,res.a); if(r){total+=r.p;
      if(r.t==='exact')exact++; else if(r.t==='gd')gd++; else if(r.t==='outcome')outcome++; else wrong++; streak.push(r)}}
    else streak.push({p:-1,t:'pending'});
  });
  return{total,exact,gd,outcome,wrong,bets,streak};
}

// ===== RENDER ALL =====
function renderAll(){
  [renderLeaderboard, renderMatches, renderMyBets, renderRivalries, renderAwards, renderChampBanner, renderSchedule, renderPrize, renderChat, renderBetsWarning, renderChampionWall, renderStandings]
  .forEach(fn=>{try{fn()}catch(e){console.error(fn.name+' error:',e)}});
}

// ===== BETS WARNING BANNER =====
function renderBetsWarning(){
  const container=document.getElementById('bets-warning');
  if(!container)return;
  if(!currentUser||!isActive(currentUser.id)){container.innerHTML='';return;}

  const now=new Date();
  const todayStr=now.toLocaleDateString('en-CA',{timeZone:'America/Sao_Paulo'});

  const unbetMatches=M.filter(m=>{
    if(m.h==='TBD'||matchResults[m.id])return false;
    if(matchDateBRT(m)!==todayStr)return false;
    const lock=new Date(new Date(m.k).getTime()-LOCKOUT_H*3600000);
    if(now>=lock)return false;
    if(allBets[m.id]?.[currentUser.id])return false;
    return true;
  });

  // Nav badge on Matches button
  const matchBtn=document.querySelector('[data-tab="matches"]');
  if(matchBtn){
    matchBtn.innerHTML=unbetMatches.length>0
      ?`⚽ Matches <span class="nav-badge">${unbetMatches.length}</span>`
      :'⚽ Matches';
  }

  if(!unbetMatches.length){container.innerHTML='';return;}

  // Find earliest lockout for countdown
  const locks=unbetMatches.map(m=>new Date(new Date(m.k).getTime()-LOCKOUT_H*3600000));
  const earliest=new Date(Math.min(...locks.map(d=>d.getTime())));
  const ms=earliest-now;
  const h=Math.floor(ms/3600000);
  const min=Math.floor((ms%3600000)/60000);
  const timeStr=h>0?`${h}h ${min}min`:`${min} min`;

  const hasBrazil=unbetMatches.some(m=>m.h==='BRA'||m.a==='BRA');
  const matchNames=unbetMatches.map(m=>{
    const isBr=m.h==='BRA'||m.a==='BRA';
    const ko=new Date(m.k).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Sao_Paulo'});
    return `${isBr?'🇧🇷 ':''}${T[m.h].n} vs ${T[m.a].n} (${ko} BRT)`;
  }).join('<br>');

  container.innerHTML=`<div class="bets-warning${hasBrazil?' bets-warning-brazil':''}">
    <span class="bw-icon">${hasBrazil?'🇧🇷':'⏰'}</span>
    <div class="bw-text">
      <strong>${hasBrazil?'Brazil plays today, place your bet!':'You have unbetted matches today!'}</strong>
      <span>${matchNames}</span>
      <span class="bw-lock">Lockout in <strong>${timeStr}</strong></span>
    </div>
    <button class="bw-btn" onclick="switchTab('matches')">Bet now</button>
  </div>`;
}
function renderPrize(){
  const activeCount=PLAYERS.filter(p=>isActive(p.id)).length;
  const pool=activeCount*BUY_IN;
  document.getElementById('prize-pool-amount').textContent=`R$${pool.toLocaleString()}`;
  // Update prize page subtitle
  const sub=document.querySelector('.prize-pool-sub');
  if(sub)sub.textContent=`${activeCount} players × R$${BUY_IN} buy-in`;
  // Update prize cards (find by icon)
  const cards=document.querySelectorAll('.prize-card-content .prize-card-desc');
  if(cards[0])cards[0].innerHTML=`Wins <strong>25% of the pool (R$${Math.round(pool*0.25)})</strong> and hosts the team lunch. The winner picks the restaurant. R$${Math.round(pool*0.5)} (50% of the pool) funds the lunch.`;
  if(cards[1])cards[1].innerHTML=`<strong>15% of the pool (R$${Math.round(pool*0.15)})</strong>`;
  if(cards[2])cards[2].innerHTML=`<strong>10% of the pool (R$${Math.round(pool*0.1)})</strong>`;
}

// ===== LEADERBOARD =====
function renderLeaderboard(){
  const tbody=document.getElementById('lb-body');
  const hasLive=Object.keys(liveScores).length>0;
  const liveExtra=hasLive?Object.fromEntries(Object.entries(liveScores).filter(([mid])=>!matchResults[mid])):{}; 
  const standings=PLAYERS.map(p=>({...p,...getStats(p.id,liveExtra),ch:champions[p.id],active:isActive(p.id)}))
    .sort((a,b)=>b.total-a.total||b.exact-a.exact);
  const mx=standings[0]?.total||1;
  const settled=Object.keys(matchResults).length;
  const totalExact=standings.reduce((s,x)=>s+x.exact,0);
  const activeCount=PLAYERS.filter(p=>isActive(p.id)).length;
  document.getElementById('lb-players').textContent=activeCount;
  document.getElementById('lb-matches').textContent=settled;
  document.getElementById('lb-pool').textContent=`R$${activeCount*BUY_IN}`;
  document.getElementById('lb-exact').textContent=totalExact;
  document.getElementById('prize-pool-amount').textContent=`R$${activeCount*BUY_IN}`;
  const liveBanner=document.getElementById('lb-live-banner');
  if(liveBanner){
    const liveMatches=Object.keys(liveScores).map(mid=>{const m=M.find(x=>x.id===mid);return m?`${T[m.h].f}${liveScores[mid].h}×${liveScores[mid].a}${T[m.a].f} ${liveScores[mid].minute}'`:''}).filter(Boolean).join('  ');
    liveBanner.innerHTML=`<span class="live-dot-pulse"></span> LIVE: ${liveMatches} <span class="lb-live-note">Rankings update in real time</span>`;
    liveBanner.style.display=hasLive?'flex':'none';
  }
  tbody.innerHTML=standings.map((s,i)=>{
    const rk=i+1, rc=rk<=3?`rank-${rk}`:'rank-n', cf=s.ch?T[s.ch]?.f||'':'';
    const pct=mx>0?Math.round(s.total/mx*100):0;
    const badges=getStreakBadge(s);
    const st=s.active?'':`<span class="admin-player-status status-pending" style="font-size:10px;margin-left:4px">pending</span>`;
    const change=prevRanks[s.id]!==undefined?prevRanks[s.id]-rk:null;
    const changeHtml=change===null?'':change>0?`<span class="rank-up">↑${change}</span>`:change<0?`<span class="rank-dn">↓${Math.abs(change)}</span>`:'';
    const crown=rk===1?'👑 ':'';
    const rowClass=rk<=3?` class="lb-row-${rk}"`:'';
    return `<tr${!s.active?' style="opacity:.5"':''}${rowClass}>
      <td><span class="rank-badge ${rc}">${rk}</span></td>
      <td><span class="player-name">${crown}${s.name}</span>${changeHtml}${badges}${st} <span class="player-champion">${cf}</span></td>
      <td class="col-num">${s.exact}</td><td class="col-num">${s.gd}</td><td class="col-num">${s.outcome}</td>
      <td class="pts-cell">${s.total} <span class="pts-bar"><span class="pts-bar-fill" style="width:${pct}%"></span></span></td></tr>`}).join('');
  standings.forEach((s,i)=>{prevRanks[s.id]=i+1;});
}

function getStreakBadge(s){let c=0; for(let i=s.streak.length-1;i>=0;i--){if(s.streak[i].t!=='wrong'&&s.streak[i].t!=='pending')c++;else break} return c>=3?'🔥':''}

// ===== COUNTDOWN =====
function formatCountdown(ms){const h=Math.floor(ms/3600000),min=Math.floor((ms%3600000)/60000); return h>0?`${h}h ${min}min to lock`:`${min}min to lock`}
function updateCountdowns(){
  const now=new Date();
  document.querySelectorAll('[data-locktime]').forEach(el=>{
    const lock=new Date(+el.dataset.locktime), ms=lock-now;
    if(ms<=0){el.textContent='🔒 Locked'; el.removeAttribute('data-locktime')}
    else el.textContent='🔒 '+formatCountdown(ms);
  });
}

// ===== TOAST =====
function showToast(msg){
  const t=document.getElementById('result-toast'); if(!t)return;
  t.textContent=msg; t.classList.add('toast-visible');
  clearTimeout(t._tmr); t._tmr=setTimeout(()=>t.classList.remove('toast-visible'),5000);
}

// ===== GOAL TOAST + CONFETTI =====
function showGoalToast(scorerFlag,scorerName,scorerGoals,oppoGoals,oppoName,minute,isBrazil){
  const t=document.getElementById('goal-toast'); if(!t)return;
  t.className='goal-toast'+(isBrazil?' goal-toast-brazil':'');
  t.innerHTML=`<div class="gt-header">⚽ GOAL!</div>
    <div class="gt-score">${scorerFlag} <strong>${scorerName} ${scorerGoals}</strong> × ${oppoGoals} ${oppoName}</div>
    <div class="gt-minute">${minute}'</div>`;
  t.classList.add('gt-visible');
  launchConfetti(isBrazil);
  clearTimeout(t._tmr); t._tmr=setTimeout(()=>t.classList.remove('gt-visible'),5000);
}

function launchConfetti(isBrazil){
  const colors=isBrazil?['#009C3B','#FFDF00','#009C3B','#FFDF00','#fff']:['#FF9100','#F3BA6D','#fff','#FF9100'];
  for(let i=0;i<45;i++){
    const el=document.createElement('div');
    el.className='confetti-p';
    el.style.cssText=`left:${40+Math.random()*20}%;bottom:90px;background:${colors[Math.floor(Math.random()*colors.length)]};width:${4+Math.random()*5}px;height:${4+Math.random()*5}px;--tx:${(Math.random()-.5)*320}px;--ty:${-(80+Math.random()*220)}px;animation-delay:${Math.random()*.35}s;animation-duration:${.75+Math.random()*.7}s;border-radius:${Math.random()>0.5?'50%':'2px'}`;
    document.body.appendChild(el);
    el.addEventListener('animationend',()=>el.remove());
  }
}

// ===== GROUP STANDINGS =====
function computeGroupStandings(groupCode){
  const teams=GROUPS[groupCode]; if(!teams)return[];
  const stats={};
  teams.forEach(code=>{stats[code]={code,gp:0,w:0,d:0,l:0,gf:0,ga:0,form:[]}});
  M.filter(m=>m.g===groupCode).forEach(m=>{
    const res=matchResults[m.id]||(liveScores[m.id]&&!matchResults[m.id]?liveScores[m.id]:null);
    if(!res||!stats[m.h]||!stats[m.a])return;
    const h=res.h,a=res.a,isL=!!liveScores[m.id]&&!matchResults[m.id];
    stats[m.h].gp++; stats[m.a].gp++;
    stats[m.h].gf+=h; stats[m.h].ga+=a;
    stats[m.a].gf+=a; stats[m.a].ga+=h;
    if(h>a){stats[m.h].w++;stats[m.a].l++;stats[m.h].form.push({r:'W',live:isL});stats[m.a].form.push({r:'L',live:isL})}
    else if(h<a){stats[m.a].w++;stats[m.h].l++;stats[m.h].form.push({r:'L',live:isL});stats[m.a].form.push({r:'W',live:isL})}
    else{stats[m.h].d++;stats[m.a].d++;stats[m.h].form.push({r:'D',live:isL});stats[m.a].form.push({r:'D',live:isL})}
  });
  return Object.values(stats).map(s=>({...s,gd:s.gf-s.ga,pts:s.w*3+s.d}))
    .sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf);
}

function renderStandings(){
  const c=document.getElementById('standings-container'); if(!c)return;
  const hasLive=Object.keys(liveScores).length>0;
  const groupOrder=['C','A','B','D','E','F','G','H','I','J','K','L'];
  const liveNote=hasLive?'<div class="standings-live-note"><span class="live-dot-pulse"></span> Live match in progress. Standings update automatically.</div>':'';
  c.innerHTML=liveNote+groupOrder.map(g=>{
    if(!GROUPS[g])return'';
    const rows=computeGroupStandings(g);
    const isBrazilG=g==='C';
    return`<div class="st-group${isBrazilG?' st-brazil-group':''}">
      <div class="st-group-title">Group ${g}</div>
      <table class="st-table">
        <thead><tr><th>#</th><th class="st-team-col">Team</th><th title="Games played">GP</th><th title="Wins">W</th><th title="Draws">D</th><th title="Losses">L</th><th title="Goals for">GF</th><th title="Goals against">GA</th><th title="Goal difference">GD</th><th class="st-pts-col" title="Points">Pts</th><th title="Recent form">Form</th></tr></thead>
        <tbody>${rows.map((s,i)=>{
          const adv=i<2; const gd=s.gd>0?'+'+s.gd:s.gd;
          const form=s.form.slice(-5).map(f=>`<span class="fd fd-${f.r.toLowerCase()}${f.live?' fd-live':''}">${f.r}</span>`).join('');
          const team=T[s.code]||{f:'',n:s.code};
          return`<tr class="${adv?'st-advance':'st-eliminate'}">
            <td class="st-pos">${i+1}</td>
            <td class="st-team-col">${team.f} ${team.n}</td>
            <td>${s.gp}</td><td>${s.w}</td><td>${s.d}</td><td>${s.l}</td>
            <td>${s.gf}</td><td>${s.ga}</td><td>${gd}</td>
            <td class="st-pts-col"><strong>${s.pts}</strong></td>
            <td>${form}</td></tr>`;
        }).join('')}</tbody>
      </table>
      <div class="st-legend"><span class="st-advance-dot"></span>Advance to Round of 32</div>
    </div>`;
  }).join('');
}

// ===== CHAMPION PICKS WALL =====
function renderChampionWall(){
  const c=document.getElementById('champion-wall'); if(!c)return;
  const picks={};
  PLAYERS.forEach(p=>{const ch=champions[p.id]; if(!ch||!T[ch])return; if(!picks[ch])picks[ch]=[]; picks[ch].push(shortName(p))});
  const sorted=Object.entries(picks).sort((a,b)=>b[1].length-a[1].length);
  if(!sorted.length){c.innerHTML='';return;}
  c.innerHTML=`<div class="champ-wall">${sorted.map(([code,names])=>{
    const t=T[code]; return `<div class="cw-item"><span class="cw-flag">${t.f}</span><span class="cw-team">${t.n}</span><span class="cw-count">×${names.length}</span><span class="cw-names">${names.join(', ')}</span></div>`;
  }).join('')}</div>`;
}

// ===== AWARDS =====
function renderAwards(){
  const stats=PLAYERS.map(p=>({...p,...getStats(p.id)}));
  const oracle=stats.sort((a,b)=>b.exact-a.exact)[0];
  document.getElementById('award-oracle').textContent=oracle.exact>0?oracle.name:'—';
  let best={n:'—',c:0}; stats.forEach(s=>{let c=0,mx=0; s.streak.forEach(r=>{if(r.t!=='wrong'&&r.t!=='pending'){c++;mx=Math.max(mx,c)}else c=0}); if(mx>best.c)best={n:s.name,c:mx}});
  document.getElementById('award-streak').textContent=best.c>=3?best.name:'—';
  const sids=Object.keys(matchResults); if(sids.length>0){let worst={n:'—',m:0}; stats.forEach(s=>{const miss=sids.filter(id=>!allBets[id]?.[s.id]).length; if(miss>worst.m)worst={n:s.name,m:miss}}); document.getElementById('award-sloth').textContent=worst.m>0?worst.name:'—'}
}

// ===== RIVALRIES =====
function renderRivalries(){
  const c=document.getElementById('rivalries-container');
  const st=PLAYERS.filter(p=>isActive(p.id)).map(p=>({...p,...getStats(p.id)})).sort((a,b)=>b.total-a.total);
  const pairs=[]; for(let i=0;i<st.length-1;i+=2)pairs.push([st[i],st[i+1]]);
  c.innerHTML=pairs.slice(0,4).map(([a,b])=>{const tot=(a.total+b.total)||1; const pct=Math.round(a.total/tot*100);
    return `<div class="rivalry-card"><span class="rival-name">${shortName(a)}</span><span class="rival-pts rival-pts-l">${a.total}</span>
    <div class="rival-bar"><div class="rival-bar-l" style="width:${pct}%"></div><div class="rival-bar-r" style="width:${100-pct}%"></div></div>
    <span class="rival-pts rival-pts-r">${b.total}</span><span class="rival-name">${shortName(b)}</span></div>`}).join('');
}

// ===== CHAMPION BANNER =====
function renderChampBanner(){
  const c=document.getElementById('champion-banner'); const ch=champions[currentUser.id]; if(!ch){c.innerHTML='';return}
  const t=T[ch];
  c.innerHTML=`<div class="champion-banner"><div><div class="champ-info-label">Your champion pick</div><div class="champ-info-name">${t.f} ${t.n}</div>
    <div class="champ-info-bonus">+15 if they win · +5 final · +3 semis</div></div><div class="champ-flag-big">${t.f}</div></div>`;
}

// ===== MATCHES =====
function matchDateBRT(m){return new Date(m.k).toLocaleDateString('en-CA',{timeZone:'America/Sao_Paulo'})}
function renderMatches(filter='today'){
  const c=document.getElementById('matches-list'); const now=new Date();
  const todayStr=now.toLocaleDateString('en-CA',{timeZone:'America/Sao_Paulo'});
  const isToday=filter==='today';
  let filtered=M.filter(m=>m.h!=='TBD');
  if(filter==='today')filtered=filtered.filter(m=>matchDateBRT(m)===todayStr);
  else if(filter==='upcoming')filtered=filtered.filter(m=>new Date(m.k)>now&&!matchResults[m.id]);
  else if(filter==='completed')filtered=filtered.filter(m=>matchResults[m.id]);
  if(filtered.length===0){c.innerHTML='<div class="empty-state"><div>⚽</div>No matches for this filter</div>';return}
  const byDate={};filtered.forEach(m=>{const d=new Date(m.k).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'America/Sao_Paulo'}); if(!byDate[d])byDate[d]=[];byDate[d].push(m)});
  let html=''; Object.entries(byDate).forEach(([d,ms])=>{html+=`<div class="day-label">📅 ${d}</div>`; ms.forEach(m=>html+=renderMatchCard(m,now,true))});
  // Save all floating button (only show if there are unsaved editable matches)
  const hasEditable=filtered.some(m=>{const ko=new Date(m.k),lock=new Date(ko.getTime()-LOCKOUT_H*36e5); return now<lock&&!matchResults[m.id]&&isActive(currentUser.id)});
  if(hasEditable)html+=`<div class="save-all-bar"><button class="btn-save-all" id="btn-save-all">💾 Save all bets</button></div>`;
  c.innerHTML=html;
  // Attach bet handlers (individual)
  c.querySelectorAll('.match-bet-btn').forEach(b=>b.addEventListener('click',()=>placeBet(b.dataset.mid)));
  // Attach save-all handler
  const saveAllBtn=document.getElementById('btn-save-all');
  if(saveAllBtn)saveAllBtn.addEventListener('click',saveAllBets);
  // Attach horoscope handlers
  c.querySelectorAll('.horoscope-btn').forEach(b=>b.addEventListener('click',()=>horoscopeBet(b.dataset.mid)));
  // Attach live points hint on score inputs
  c.querySelectorAll('.score-input:not([disabled])').forEach(input=>{
    const mid=input.id.replace(/^[ha]-/,'');
    input.addEventListener('input',()=>updatePtsHint(mid));
  });
}

function renderMatchCard(m,now,showFact){
  const hm=T[m.h],aw=T[m.a],ko=new Date(m.k),lock=new Date(ko.getTime()-LOCKOUT_H*36e5),locked=now>=lock;
  const res=matchResults[m.id],bet=allBets[m.id]?.[currentUser.id],pending=!isActive(currentUser.id);
  const liveData=liveScores[m.id],isLive=!!liveData&&!res;
  const time=ko.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Sao_Paulo'});
  const isBrazil=m.h==='BRA'||m.a==='BRA';
  const canEdit=!locked&&!res&&!pending&&!isLive;
  // Other bets
  const mBets=allBets[m.id]||{}; const peekHtml=Object.entries(mBets).map(([pid,b])=>{
    const pl=PLAYERS.find(p=>p.id===pid); return pl?`<span class="peek-bet"><strong>${shortName(pl)}</strong> ${b.h}×${b.a}</span>`:''}).join('');
  const bc=Object.keys(mBets).length;
  // Action button
  let actionBtn='';
  if(isLive){actionBtn=`<span class="live-badge"><span class="live-dot"></span> LIVE ${liveData.minute||''}'</span>`}
  else if(res){const sc=`${res.h}×${res.a}`; let rb=''; if(bet){const pt=calcPts(bet.h,bet.a,res.h,res.a);
    if(pt){const lb={exact:'Exact +10',gd:'GD +5',outcome:'Outcome +3',wrong:'Wrong'};const cl={exact:'result-exact',gd:'result-gd',outcome:'result-outcome',wrong:'result-wrong'};
    rb=`<span class="match-result ${cl[pt.t]}">${lb[pt.t]}</span>`}} actionBtn=`<span style="font-size:12px;color:var(--text-muted)">Final: ${sc}</span> ${rb}`}
  else if(locked)actionBtn=`<button class="match-bet-btn locked-btn">${bet?`🔒 ${bet.h}×${bet.a}`:'🔒 Locked'}</button>`;
  else if(pending)actionBtn=`<button class="match-bet-btn locked-btn">Activate to bet</button>`;
  else if(bet)actionBtn=`<button class="match-bet-btn" data-mid="${m.id}">Update bet</button>`;
  else actionBtn=`<button class="match-bet-btn" data-mid="${m.id}">Place bet</button>`;
  // Score area: live display vs inputs
  const vsHtml=isLive
    ?`<div class="match-vs"><div class="live-score-display">${liveData.h}</div><span class="score-sep">×</span><div class="live-score-display">${liveData.a}</div></div>`
    :`<div class="match-vs">
      <input type="number" class="score-input${!canEdit?' locked':''}" id="h-${m.id}" min="0" max="20" value="${bet?bet.h:''}" placeholder="–" ${!canEdit?'disabled':''}>
      <span class="score-sep">×</span>
      <input type="number" class="score-input${!canEdit?' locked':''}" id="a-${m.id}" min="0" max="20" value="${bet?bet.a:''}" placeholder="–" ${!canEdit?'disabled':''}>
      ${canEdit?`<button class="horoscope-btn" data-mid="${m.id}" title="Random prediction">🔮</button>`:''}
    </div>`;
  // Match fact from Firebase
  const fact=showFact&&matchFacts[m.id]?`<div class="match-fact"><span>🤖</span> ${esc(matchFacts[m.id])}</div>`:'';
  // Odds from Firebase - compact one line + fixed-position tooltip on ⓘ
  const od=matchOdds[m.id];
  const oddsHtml=od&&!isLive?`<div class="match-odds-b">
    <span class="mob-label">Odds</span>
    <span class="mob-h">${hm.f} Win <strong>${od.home}%</strong></span>
    <span class="mob-sep">|</span>
    <span class="mob-t">Tie <strong>${od.draw}%</strong></span>
    <span class="mob-sep">|</span>
    <span class="mob-a">${aw.f} Win <strong>${od.away}%</strong></span>
    <span class="mob-info-wrap">
      <button class="mob-info-btn" onmouseenter="showOddsTooltip(this)" onmouseleave="scheduleHideOddsTooltip()" onclick="event.stopPropagation();toggleOddsTooltip(this)">ⓘ</button>
    </span>
  </div>`:'';

  // Countdown to lockout
  const countdownHtml=!locked&&!bet&&!res&&!pending&&!isLive&&(lock-now)>0
    ?`<span class="match-countdown" data-locktime="${lock.getTime()}">🔒 ${formatCountdown(lock-now)}</span>`:'';
  // Time display
  const timeDisplay=isLive
    ?`<span class="live-badge-inline"><span class="live-dot"></span> LIVE</span>`
    :`<span class="match-info">🕐 ${time} BRT</span>`;
  return `<div class="match-card${isBrazil?' brazil-match':''}${isLive?' live-match':''}">
    ${fact}
    <div class="match-teams-row"><div class="match-team"><span class="flag">${hm.f}</span> ${hm.n}</div>
    ${vsHtml}
    <div class="match-team right">${aw.n} <span class="flag">${aw.f}</span></div></div>
    ${canEdit?`<div class="pts-hint" id="hint-${m.id}"></div>`:''}
    <div class="match-meta"><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
    ${m.g?`<span class="match-group">Group ${m.g}</span>`:m.r?`<span class="match-group">${m.r}</span>`:''}${timeDisplay}
    ${!isLive?`<span class="match-info">📍 ${m.v}</span>`:''}${countdownHtml}</div>${actionBtn}</div>
    ${oddsHtml}
    ${bc>0?`<div class="bets-peek">${renderBetDist(mBets,hm,aw)}<div class="bets-peek-label">${bc} of ${PLAYERS.length} bets</div><div class="peek-row">${peekHtml}</div></div>`:''}</div>`;
}

// ===== BET DISTRIBUTION BAR =====
function renderBetDist(mBets,hm,aw){
  let h=0,t=0,a=0;
  Object.values(mBets).forEach(b=>{const d=b.h-b.a; if(d>0)h++;else if(d<0)a++;else t++;});
  const total=h+t+a; if(!total)return '';
  const hp=Math.round(h/total*100),tp=Math.round(t/total*100),ap=100-hp-tp;
  return `<div class="bet-dist">
    <div class="bd-bar">
      ${h?`<div class="bd-home" style="width:${hp}%" title="${hm.n} win"></div>`:''}
      ${t?`<div class="bd-tie" style="width:${tp}%" title="Tie"></div>`:''}
      ${a?`<div class="bd-away" style="width:${ap}%" title="${aw.n} win"></div>`:''}
    </div>
    <div class="bd-labels">
      <span class="bd-lh">${hm.f} ${h}</span>
      <span class="bd-lt">Tie ${t}</span>
      <span class="bd-la">${a} ${aw.f}</span>
    </div>
  </div>`;
}

// ===== LIVE POINTS HINT =====
function updatePtsHint(mid){
  const hEl=document.getElementById(`h-${mid}`),aEl=document.getElementById(`a-${mid}`),hint=document.getElementById(`hint-${mid}`);
  if(!hEl||!aEl||!hint)return;
  if(hEl.value===''||aEl.value===''){hint.innerHTML='';return;}
  const h=+hEl.value,a=+aEl.value;
  const match=M.find(m=>m.id===mid); if(!match)return;
  const hm=T[match.h],aw=T[match.a];
  let html='';
  if(h===a){
    html=`<div class="ph-label">Predicting a tie</div>
    <div class="ph-row"><span class="ph-dot ph-10"></span>Exact score ${h}-${a}: <strong>+10 pts</strong></div>
    <div class="ph-row"><span class="ph-dot ph-5"></span>Any other tie (e.g. ${h+1}-${a+1}): <strong>+5 pts</strong></div>`;
  } else if(h>a){
    const gd=h-a;
    html=`<div class="ph-label">${hm.f} ${hm.n} win by ${gd}</div>
    <div class="ph-row"><span class="ph-dot ph-10"></span>Exact score ${h}-${a}: <strong>+10 pts</strong></div>
    <div class="ph-row"><span class="ph-dot ph-5"></span>${gd}-goal win (e.g. ${h+1}-${a+1}): <strong>+5 pts</strong></div>
    <div class="ph-row"><span class="ph-dot ph-3"></span>${hm.n} win any margin: <strong>+3 pts</strong></div>`;
  } else {
    const gd=a-h;
    html=`<div class="ph-label">${aw.f} ${aw.n} win by ${gd}</div>
    <div class="ph-row"><span class="ph-dot ph-10"></span>Exact score ${h}-${a}: <strong>+10 pts</strong></div>
    <div class="ph-row"><span class="ph-dot ph-5"></span>${gd}-goal win (e.g. ${h+1}-${a+1}): <strong>+5 pts</strong></div>
    <div class="ph-row"><span class="ph-dot ph-3"></span>${aw.n} win any margin: <strong>+3 pts</strong></div>`;
  }
  hint.innerHTML=html;
}

function placeBet(mid){
  const hv=document.getElementById(`h-${mid}`).value,av=document.getElementById(`a-${mid}`).value;
  if(hv===''||av==='')return alert('Enter both scores!');
  const bet={h:+hv,a:+av,ts:Date.now()};
  if(db)db.ref(`bets/${mid}/${currentUser.id}`).set(bet);
  else{if(!allBets[mid])allBets[mid]={}; allBets[mid][currentUser.id]=bet; saveLS()}
  renderMatches(document.querySelector('.filter-btn.active')?.dataset.filter||'today');
}

function saveAllBets(){
  let saved=0;
  const now=new Date();
  M.forEach(m=>{
    if(m.h==='TBD'||matchResults[m.id])return;
    const ko=new Date(m.k),lock=new Date(ko.getTime()-LOCKOUT_H*36e5);
    if(now>=lock)return;
    const hEl=document.getElementById(`h-${m.id}`),aEl=document.getElementById(`a-${m.id}`);
    if(!hEl||!aEl)return;
    const hv=hEl.value,av=aEl.value;
    if(hv===''||av==='')return;
    const existing=allBets[m.id]?.[currentUser.id];
    if(existing&&existing.h===+hv&&existing.a===+av)return; // no change
    const bet={h:+hv,a:+av,ts:Date.now()};
    if(db)db.ref(`bets/${m.id}/${currentUser.id}`).set(bet);
    else{if(!allBets[m.id])allBets[m.id]={}; allBets[m.id][currentUser.id]=bet;}
    saved++;
  });
  if(!db)saveLS();
  if(saved>0){alert(`${saved} bet(s) saved!`); renderMatches(document.querySelector('.filter-btn.active')?.dataset.filter||'today')}
  else alert('No new or changed bets to save.');
}

// ===== HOROSCOPE PREDICTION GENERATOR =====
const HOROSCOPE_MSGS=[
  "The stars say","Mercury is in retrograde, so","Your seismic intuition suggests",
  "The velocity model predicts","According to the amplitude spectrum","The migration result shows",
  "A deep reflection from the subsurface reveals","The crossline section whispers","NMO correction confirms",
  "The stacking velocity says","Your CMP gather indicates","A shallow anomaly suggests",
  "The frequency spectrum hints at","After careful processing","The signal-to-noise ratio points to"
];
function horoscopeBet(mid){
  const h=Math.floor(Math.random()*4), a=Math.floor(Math.random()*4);
  document.getElementById(`h-${mid}`).value=h;
  document.getElementById(`a-${mid}`).value=a;
  const msg=HOROSCOPE_MSGS[Math.floor(Math.random()*HOROSCOPE_MSGS.length)];
  const hm=T[M.find(m=>m.id===mid).h], aw=T[M.find(m=>m.id===mid).a];
  alert(`🔮 ${msg} ${hm.n} ${h} × ${a} ${aw.n}`);
}

// ===== MY BETS =====
function renderMyBets(){
  const s=getStats(currentUser.id),ch=champions[currentUser.id],ct=ch?T[ch]:null;
  const standings=PLAYERS.map(p=>({...p,...getStats(p.id)})).sort((a,b)=>b.total-a.total);
  const rank=standings.findIndex(x=>x.id===currentUser.id)+1;
  const ini=currentUser.name.split(' ').map(w=>w[0]).join('');
  const hr=s.bets>0?Math.round((s.exact+s.gd+s.outcome)/s.bets*100):0;
  document.getElementById('my-profile').innerHTML=`<div class="my-profile-card"><div class="profile-avatar">${ini}</div><div>
    <div class="profile-name">${currentUser.name}</div><div class="profile-rank">#${rank} of ${PLAYERS.length}${ct?` · ${ct.f} ${ct.n}`:''}</div>
    <div class="profile-badges">${getStreakBadge(s)}</div></div><div class="profile-pts"><div class="profile-pts-val">${s.total}</div>
    <div class="profile-pts-label">total points</div></div></div>
    <div class="pool-banner"><div class="pool-stat"><span class="pool-val" style="color:var(--green)">${s.exact}</span><span class="pool-label">Exact</span></div>
    <div class="pool-stat"><span class="pool-val" style="color:var(--blue)">${s.gd}</span><span class="pool-label">GD</span></div>
    <div class="pool-stat"><span class="pool-val" style="color:var(--amber)">${s.outcome}</span><span class="pool-label">Outcome</span></div>
    <div class="pool-stat"><span class="pool-val">${hr}%</span><span class="pool-label">Hit rate</span></div></div>`;
  // Streak
  document.getElementById('streak-bar').innerHTML=s.streak.slice(-10).map(x=>{
    const cl={exact:'streak-exact',gd:'streak-gd',outcome:'streak-out',wrong:'streak-wrong',pending:'streak-pending'};
    const lb={exact:'10',gd:'5',outcome:'3',wrong:'0',pending:'?'};
    return `<div class="streak-dot ${cl[x.t]}">${lb[x.t]}</div>`}).join('');
  // Champion change
  const canChange=new Date()<CHAMP_LOCK;
  document.getElementById('change-champion-section').innerHTML=canChange?
    `<div class="section-label">🏆 Change champion (locks June 22)</div><select id="change-champ-sel" style="max-width:300px">
    ${Object.entries(T).filter(([c])=>c!=='TBD').sort((a,b)=>a[1].n.localeCompare(b[1].n)).map(([c,t])=>
    `<option value="${c}"${c===ch?' selected':''}>${t.f} ${t.n}</option>`).join('')}</select>
    <button class="btn-primary btn-sm" style="margin-left:8px" onclick="changeChamp()">Save</button>`:'';
  // Bet list
  const c=document.getElementById('my-bets-list');
  const betted=M.filter(m=>allBets[m.id]?.[currentUser.id]).sort((a,b)=>new Date(b.k)-new Date(a.k));
  if(!betted.length){c.innerHTML='<div class="empty-state">No bets yet. Go to Matches!</div>';return}
  c.innerHTML=betted.map(m=>{const bet=allBets[m.id][currentUser.id],res=matchResults[m.id],hm=T[m.h],aw=T[m.a];
    let bc='bet-bottom-pending',lb='🕐 '+new Date(m.k).toLocaleDateString('en-US',{month:'short',day:'numeric'}),bg='<span class="pts-badge pts-pending">pending</span>';
    if(res){const pt=calcPts(bet.h,bet.a,res.h,res.a);if(pt){
      const map={exact:['bet-bottom-exact','✅ Exact!','pts-10','+10'],gd:['bet-bottom-gd','✅ Goal diff','pts-5','+5'],
        outcome:['bet-bottom-outcome','✅ Outcome','pts-3','+3'],wrong:['bet-bottom-wrong','❌ Wrong','pts-0','0']};
      const x=map[pt.t];bc=x[0];lb=x[1];bg=`<span class="pts-badge ${x[2]}">${x[3]}</span>`}}
    return `<div class="bet-history-card"><div class="bet-history-top"><div class="bet-history-teams">${hm.f} ${hm.n} vs ${aw.n} ${aw.f}</div>
      <div class="bet-history-scores"><span class="bet-score-box">${bet.h}</span><span class="score-sep">×</span><span class="bet-score-box">${bet.a}</span>
      ${res?`<span class="bet-arrow">→</span><span class="bet-score-box">${res.h}</span><span class="score-sep">×</span><span class="bet-score-box">${res.a}</span>`:''}</div></div>
      <div class="bet-history-bottom ${bc}"><span class="bet-result-label">${lb}</span>${bg}</div></div>`}).join('');
}

function changeChamp(){
  const v=document.getElementById('change-champ-sel').value;
  if(db)db.ref(`champions/${currentUser.id}`).set(v);
  else{champions[currentUser.id]=v;saveLS()}
  renderAll();
}

// ===== SCHEDULE PAGE =====
function renderSchedule(){
  // Brazil path
  const bp=document.getElementById('brazil-path');
  if(!bp)return; // Schedule tab might not be in the HTML yet
  const brMatches=M.filter(m=>m.h==='BRA'||m.a==='BRA');
  bp.innerHTML=`<div class="brazil-path-card">${brMatches.map(m=>{const ko=new Date(m.k);const res=matchResults[m.id];
    const time=ko.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Sao_Paulo'});
    const date=ko.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
    return `<div class="match-row"><div class="bp-teams">${T[m.h].f} ${T[m.h].n} vs ${T[m.a].n} ${T[m.a].f}${res?' <strong>'+res.h+'×'+res.a+'</strong>':''}</div>
      <div class="bp-meta">${date}<br>${time} BRT · ${m.v}</div></div>`}).join('')}</div>`;
  // Groups grid
  const gg=document.getElementById('groups-grid');
  if(gg)gg.innerHTML=Object.entries(GROUPS).map(([g,teams])=>`<div class="group-card${g==='C'?' brazil-group':''}">
    <div class="group-card-title">Group ${g}</div>${teams.map(c=>`<div class="group-team"><span class="flag">${T[c].f}</span> ${T[c].n}</div>`).join('')}</div>`).join('');
  // Full schedule
  const fs=document.getElementById('full-schedule'); if(!fs)return;
  const now=new Date(); const todayStr=now.toLocaleDateString('en-CA',{timeZone:'America/Sao_Paulo'});
  const groupMatches=M.filter(m=>m.g);
  const byDate={}; groupMatches.forEach(m=>{const d=new Date(m.k).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}); if(!byDate[d])byDate[d]=[];byDate[d].push(m)});
  fs.innerHTML=Object.entries(byDate).map(([d,ms])=>`<div class="day-label">${d}</div>${ms.map(m=>{
    const ko=new Date(m.k),res=matchResults[m.id],past=ko<now,today=matchDateBRT(m)===todayStr,isBr=m.h==='BRA'||m.a==='BRA';
    const live=liveScores[m.id]&&!res;
    const time=ko.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Sao_Paulo'});
    const od=matchOdds[m.id];
    const odInline=od&&!res&&!live?`<span class="sched-odds">${T[m.h].f}${od.home}% · ${od.draw}% · ${od.away}%${T[m.a].f}</span>`:'';
    const scoreInline=res?`<span class="sched-score">${res.h}×${res.a}</span>`:live?`<span class="sched-score sched-live"><span class="live-dot"></span>${liveScores[m.id].h}×${liveScores[m.id].a} ${liveScores[m.id].minute||''}'</span>`:'';
    return `<div class="schedule-match${past&&!live?' past':''}${today?' today':''}${isBr?' brazil-match':''}${live?' live-match':''}">
      <span class="sched-teams">${T[m.h].f} ${T[m.h].n} vs ${T[m.a].n} ${T[m.a].f}</span>
      <span class="sched-meta">Group ${m.g} · ${live?`<span class="live-badge-inline"><span class="live-dot"></span>LIVE</span>`:time+' BRT'} · ${m.v}${scoreInline}${odInline}</span></div>`}).join('')}`).join('');
  // Knockout
  const kb=document.getElementById('knockout-bracket');
  if(kb){const rounds={R32:'Round of 32',R16:'Round of 16',QF:'Quarter-finals',SF:'Semi-finals','3rd':'3rd Place Match',Final:'Final'};
  const koMatches=M.filter(m=>m.r);
  const byRound={}; koMatches.forEach(m=>{if(!byRound[m.r])byRound[m.r]=[];byRound[m.r].push(m)});
  kb.innerHTML=Object.entries(rounds).map(([r,label])=>{const ms=byRound[r]||[];if(!ms.length)return'';
    return `<div class="knockout-round"><div class="knockout-round-title">${label}</div>${ms.map(m=>{const ko=new Date(m.k);
      const date=ko.toLocaleDateString('en-US',{month:'short',day:'numeric'}),time=ko.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Sao_Paulo'});
      const hm=T[m.h],aw=T[m.a],tbd=m.h==='TBD';
      return `<div class="knockout-match"><span class="ko-teams${tbd?' ko-tbd':''}">${hm.f} ${hm.n} vs ${aw.n} ${aw.f}</span>
        <span class="ko-meta">${date} · ${time} BRT · ${m.v}</span></div>`}).join('')}</div>`}).join('');}
  // Venues
  const vl=document.getElementById('venues-list');
  if(vl){const venues={}; M.forEach(m=>{if(!venues[m.v])venues[m.v]=0;venues[m.v]++});
  const venueCountry=v=>{const mx=['Mexico City','Guadalajara','Monterrey'];const ca=['Toronto','Vancouver'];return mx.some(x=>v.includes(x))?'🇲🇽':ca.some(x=>v.includes(x))?'🇨🇦':'🇺🇸'};
  vl.innerHTML=Object.entries(venues).sort((a,b)=>b[1]-a[1]).map(([v,c])=>`<div class="venue-item"><span class="venue-flag">${venueCountry(v)}</span>
    <span class="venue-name">${v}</span><span class="venue-matches">${c} matches</span></div>`).join('');}
  // Key dates
  const kd=document.getElementById('key-dates');
  if(kd)kd.innerHTML=[
    ['Jun 11','Group stage begins'],['Jun 22','Champion picks lock'],['Jun 27','Group stage ends'],
    ['Jun 28','Round of 32'],['Jul 4','Round of 16'],['Jul 9','Quarter-finals'],
    ['Jul 14','Semi-finals'],['Jul 18','3rd place match'],['Jul 19','🏆 FINAL (New York NJ)']
  ].map(([d,l])=>`<div class="key-date-item"><span class="kd-date">${d}</span><span class="kd-label">${l}</span></div>`).join('');
}

// ===== CHAT =====
function setupChat(){
  document.getElementById('chat-send').addEventListener('click',sendMsg);
  document.getElementById('chat-input').addEventListener('keypress',e=>{if(e.key==='Enter')sendMsg()});
}
function sendMsg(){
  const inp=document.getElementById('chat-input'),txt=inp.value.trim(); if(!txt||!currentUser||!isActive(currentUser.id))return;
  const msg={author:currentUser.id,name:currentUser.name,text:txt,ts:Date.now()};
  if(db)db.ref('messages').push(msg); else{allMessages.push({id:Date.now().toString(),...msg});saveLS();renderChat()}
  inp.value='';
}
function renderChat(){
  const wall=document.getElementById('chat-wall');
  if(!wall)return;
  if(!allMessages||!allMessages.length){wall.innerHTML='<p class="info-text" style="padding:12px">No messages yet. Be the first to post!</p>';return}
  wall.innerHTML=allMessages.slice(-20).reverse().map(m=>{
    if(!m)return'';
    const name=m.name||'Unknown';
    const ini=name.split(' ').map(word=>(word||'')[0]||'').join('')||'?';
    const bot=m.author==='bot';
    const ago=m.ts?timeAgo(m.ts):'';
    const text=m.text||'';
    return `<div class="chat-msg"><div class="chat-avatar${bot?' bot':''}">${bot?'🤖':ini}</div>
      <div class="chat-text"><span class="chat-author">${esc(name)}</span> · ${esc(text)} <span class="chat-time">${ago}</span></div></div>`}).join('');
}
function timeAgo(ts){const d=Date.now()-ts,m=Math.floor(d/6e4); if(m<1)return'now'; if(m<60)return m+'m'; const h=Math.floor(m/60); if(h<24)return h+'h'; return Math.floor(h/24)+'d'}
function esc(s){if(!s)return'';const d=document.createElement('div');d.textContent=s;return d.innerHTML}

// ===== ADMIN =====
function setupAdmin(){
  document.getElementById('admin-login-btn').addEventListener('click',async()=>{
    const hash=await sha256(document.getElementById('admin-pass').value);
    if(hash===ADMIN_HASH){document.getElementById('admin-gate').style.display='none';document.getElementById('admin-panel').style.display='block';renderAdmin()}
    else alert('Wrong password')});
  document.getElementById('btn-export').addEventListener('click',exportCSV);
  document.getElementById('btn-recalc').addEventListener('click',()=>{renderAll();alert('Done!')});
  document.getElementById('btn-copy-invite').addEventListener('click',copyInvite);
  document.getElementById('bot-msg-send').addEventListener('click',postBotMsg);
}

function renderAdmin(){
  // Players
  const pc=document.getElementById('admin-players');
  pc.innerHTML=PLAYERS.map(p=>{const st=isActive(p.id);const ch=champions[p.id]?T[champions[p.id]]?.f:'';
    return `<div class="admin-player-row"><span class="admin-player-name">${ch} ${p.name}</span>
      <span class="admin-player-status ${st?'status-active':'status-pending'}">${st?'Active':'Pending'}</span>
      ${!st?`<button class="btn-primary btn-sm" onclick="approvePlayer('${p.id}')">Approve</button>`:
      `<button class="btn-outline btn-sm" onclick="copyConfirmEmail('${p.id}')">📋 Confirm email</button>`}</div>`}).join('');
  // Match results
  const now=new Date();
  const past=M.filter(m=>new Date(m.k)<=now&&m.h!=='TBD');
  const pend=past.filter(m=>!matchResults[m.id]);
  const done=past.filter(m=>matchResults[m.id]);
  document.getElementById('admin-pending').innerHTML=!pend.length?'<p class="info-text">No matches awaiting results</p>':
    pend.map(m=>adminMatchCard(m,false)).join('');
  document.getElementById('admin-settled').innerHTML=!done.length?'<p class="info-text">No results yet</p>':
    done.slice(-10).map(m=>adminMatchCard(m,true)).join('');
  document.getElementById('admin-pending').querySelectorAll('.btn-admin-save').forEach(b=>b.addEventListener('click',()=>saveResult(b.dataset.mid)));
}

function adminMatchCard(m,settled){
  const hm=T[m.h],aw=T[m.a],res=matchResults[m.id],bc=Object.keys(allBets[m.id]||{}).length;
  return `<div class="admin-match"><div class="admin-match-row"><span class="admin-match-teams">${hm.f} ${hm.n} vs ${aw.n} ${aw.f}</span>
    <div class="admin-match-inputs"><input type="number" class="admin-score-input${settled?' filled':''}" id="ah-${m.id}" min="0" max="20" value="${res?res.h:''}" ${settled?'disabled':''}>
    <span class="score-sep">×</span><input type="number" class="admin-score-input${settled?' filled':''}" id="aa-${m.id}" min="0" max="20" value="${res?res.a:''}" ${settled?'disabled':''}></div>
    ${settled?'<span class="btn-admin-saved">✓ Saved</span>':`<button class="btn-admin-save" data-mid="${m.id}">Save</button>`}</div>
    <div class="admin-match-meta"><span>👥 ${bc} bets</span></div></div>`;
}

function saveResult(mid){
  const h=document.getElementById(`ah-${mid}`).value,a=document.getElementById(`aa-${mid}`).value;
  if(h===''||a==='')return alert('Enter both scores');
  const res={h:+h,a:+a,ts:Date.now()};
  if(db)db.ref(`results/${mid}`).set(res); else{matchResults[mid]=res;saveLS();renderAll()}
  renderAdmin();
}

function approvePlayer(pid){
  if(db)db.ref(`playerStatus/${pid}`).set('active');
  else{playerStatus[pid]='active';saveLS();updatePendingState();renderAll()}
  renderAdmin();
}

function postBotMsg(){
  const inp=document.getElementById('bot-msg-input'),txt=inp.value.trim(); if(!txt)return;
  const msg={author:'bot',name:'DUG Bot',text:txt,ts:Date.now()};
  if(db)db.ref('messages').push(msg); else{allMessages.push({id:Date.now().toString(),...msg});saveLS();renderChat()}
  inp.value='';
}

function copyInvite(){
  const url=SITE_URL;
  const ac=PLAYERS.filter(p=>isActive(p.id)).length||14;
  const pool=ac*BUY_IN;
  const txt=`Pessoal,\n\nWe're running a World Cup prediction pool for DUG Brasil. Simple rules, real money, and a team lunch at stake.\n\nThe game:\nPredict the final score for each match. You earn points based on how close you get:\n- Exact score: 10 points\n- Correct goal difference: 5 points\n- Correct winner/draw: 3 points\n\nYou also pick a champion team when you register. If they go far, you earn bonus points (+15 for winning, +5 for the final, +3 for the semis). You can change your pick until June 22.\n\nPrize pool:\nBuy-in: R$${BUY_IN} per person\n- 50% (R$${Math.round(pool*0.5)}) funds a team lunch, restaurant chosen by the winner\n- 25% (R$${Math.round(pool*0.25)}) to 1st place\n- 15% (R$${Math.round(pool*0.15)}) to 2nd place\n- 10% (R$${Math.round(pool*0.1)}) to 3rd place\n\nTo join:\n1. Open the pool: ${url}\n2. Select your name from the dropdown\n3. Pick your World Cup champion team\n4. Scan the QR code or copy the PIX key to pay R$${BUY_IN}\n\nYour account will be activated once I confirm the payment.\n\nBets lock 1 hour before each match kickoff. The pool covers all 104 matches through the final on July 19.\n\nThe site has a live leaderboard, weekly awards, head-to-head rivalries, full tournament schedule, and a trash talk wall.\n\nQuestions? Just reach out.\n\nWilson`;
  navigator.clipboard.writeText(txt).then(()=>alert('Invite email copied!'));
}

function copyConfirmEmail(pid){
  const p=PLAYERS.find(x=>x.id===pid); if(!p)return;
  const url=SITE_URL||'[SITE LINK]';
  const txt=`Hey ${p.name.split(' ')[0]},\n\nPIX confirmed, you're officially in the DUG World Cup Pool!\n\nYour account is now active. You can place bets on all upcoming matches.\n\nQuick links:\n- Place bets: ${url}\n- Full schedule: ${url} (Schedule tab)\n- Rules and prizes: ${url} (Prize tab)\n\nBets lock 1 hour before kickoff. Check the Matches tab for today's games.\n\nGood luck!\n\nWilson`;
  navigator.clipboard.writeText(txt).then(()=>alert(`Confirmation email for ${p.name} copied!`));
}

function exportCSV(){
  let csv='Player,Champion,Status,Points,Exact,GD,Outcome,Wrong,Bets\n';
  PLAYERS.map(p=>{const s=getStats(p.id);const ch=champions[p.id]?T[champions[p.id]]?.n:'';
    return{...p,...s,ch,active:isActive(p.id)}}).sort((a,b)=>b.total-a.total)
    .forEach(s=>csv+=`"${s.name}","${s.ch}","${s.active?'Active':'Pending'}",${s.total},${s.exact},${s.gd},${s.outcome},${s.wrong},${s.bets}\n`);
  const b=new Blob([csv],{type:'text/csv'}),u=URL.createObjectURL(b),a=document.createElement('a');
  a.href=u;a.download='dug_pool_standings.csv';a.click();URL.revokeObjectURL(u);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded',initApp);
