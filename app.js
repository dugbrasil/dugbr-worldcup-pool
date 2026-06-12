/* DUG WORLD CUP 2026 POOL - v3 */

// ===== CONFIG (UPDATE THESE) =====
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD8jOMPKgjmxVrwzEofrho-9YCwAcjZvGk",
  authDomain: "dugbr-worldcup-pool.firebaseapp.com",
  databaseURL: "https://dugbr-worldcup-pool-default-rtdb.firebaseio.com",
  projectId: "dugbr-worldcup-pool",
  storageBucket: "dugbr-worldcup-pool.firebasestorage.app",
  messagingSenderId: "211261594337",
  appId: "1:211261594337:web:edb00939a6122e75aef5a0"
};

const ADMIN_PASS = "dug2026";
const LOCKOUT_H = 1;
const BUY_IN = 75;
const CHAMP_LOCK = new Date("2026-06-23T02:59:00Z"); // June 22 23:59 BRT
const PIX_CODE = "00020126870014br.gov.bcb.pix0136218f6a2a-ee7c-42e9-a4c6-8e03a006f3af0225DUGBr World Cup 2026 Pool520400005303986540575.005802BR5919WILSON SOUZA DUARTE6014RIO DE JANEIRO62580520SAN2026061200485085350300017br.gov.bcb.brcode01051.0.063047306";
const SITE_URL = "https://dugbrasil.github.io/dugbr-worldcup-pool/";

// ===== PLAYERS =====
const PLAYERS = [
  {id:"p01",name:"Caio Castro",email:"caioc@dug.com"},
  {id:"p02",name:"Carlos Belem",email:"carlosb@dug.com"},
  {id:"p03",name:"Carlos Saraiva",email:"carloss@dug.com"},
  {id:"p04",name:"Cauê Ponte",email:"cauep@dug.com"},
  {id:"p05",name:"Cleberton Oliveira",email:"clebertono@dug.com"},
  {id:"p06",name:"Ed Ramos",email:"edmarleyr@dug.com"},
  {id:"p07",name:"Jair Luiz",email:"jaira@dug.com"},
  {id:"p08",name:"Jaqueline Krueger",email:"jaquelinek@dug.com"},
  {id:"p09",name:"Luis Cypriano",email:"luisc@dug.com"},
  {id:"p10",name:"Luiz Felão",email:"luizf@dug.com"},
  {id:"p11",name:"Márcia Corredera",email:"marciac@dug.com"},
  {id:"p12",name:"Rafaela Rossi",email:"rafaelar@dug.com"},
  {id:"p13",name:"Valter Marques",email:"valterm@dug.com"},
  {id:"p14",name:"Wilson Duarte",email:"wilsond@dug.com"}
];

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
let db=null, currentUser=null, allBets={}, allMessages=[], matchResults={}, playerStatus={}, champions={};

// ===== INIT =====
function initApp(){
  try{
    firebase.initializeApp(FIREBASE_CONFIG);
    db=firebase.database();
    setupFirebaseListeners();
  }catch(e){
    console.warn("Firebase not configured, localStorage mode:",e.message);
    loadLS();
  }
  setupLogin(); setupNav(); setupFilters(); setupAdmin(); setupChat(); setupPIXButtons();
}

// ===== LOCAL STORAGE =====
function lsS(k,d){localStorage.setItem('dp_'+k,JSON.stringify(d))}
function lsL(k){try{return JSON.parse(localStorage.getItem('dp_'+k))}catch{return null}}
function loadLS(){allBets=lsL('bets')||{}; allMessages=lsL('msgs')||[]; matchResults=lsL('res')||{}; playerStatus=lsL('pstat')||{}; champions=lsL('champs')||{}}
function saveLS(){lsS('bets',allBets); lsS('msgs',allMessages); lsS('res',matchResults); lsS('pstat',playerStatus); lsS('champs',champions)}

// ===== FIREBASE =====
function setupFirebaseListeners(){
  db.ref('bets').on('value',s=>{allBets=s.val()||{}; if(currentUser)renderAll()});
  db.ref('results').on('value',s=>{matchResults=s.val()||{}; if(currentUser)renderAll()});
  db.ref('playerStatus').on('value',s=>{playerStatus=s.val()||{}; if(currentUser)updatePendingState()});
  db.ref('champions').on('value',s=>{champions=s.val()||{}; if(currentUser)renderAll()});
  db.ref('messages').orderByChild('ts').limitToLast(50).on('value',s=>{
    allMessages=[]; s.forEach(c=>allMessages.push({id:c.key,...c.val()})); if(currentUser)renderChat()});
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
  const saved=localStorage.getItem('dp_user');
  if(saved){currentUser=PLAYERS.find(p=>p.id===saved); if(currentUser){showApp(); return}}
  sel.addEventListener('change',()=>{if(sel.value){chSec.style.display='block'; nextBtn.disabled=!chSel.value}else{chSec.style.display='none'; nextBtn.disabled=true}});
  chSel.addEventListener('change',()=>nextBtn.disabled=!sel.value||!chSel.value);
  nextBtn.addEventListener('click',()=>{step1.style.display='none'; step2.style.display='block'});
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

function getStats(pid){
  let total=0,exact=0,gd=0,outcome=0,wrong=0,bets=0,streak=[];
  M.forEach(m=>{
    const bet=allBets[m.id]?.[pid], res=matchResults[m.id]; if(!bet)return; bets++;
    if(res){const r=calcPts(bet.h,bet.a,res.h,res.a); if(r){total+=r.p;
      if(r.t==='exact')exact++; else if(r.t==='gd')gd++; else if(r.t==='outcome')outcome++; else wrong++; streak.push(r)}}
    else streak.push({p:-1,t:'pending'});
  });
  return{total,exact,gd,outcome,wrong,bets,streak};
}

// ===== RENDER ALL =====
function renderAll(){renderLeaderboard(); renderMatches(); renderMyBets(); renderRivalries(); renderAwards(); renderChampBanner(); renderSchedule()}

// ===== LEADERBOARD =====
function renderLeaderboard(){
  const tbody=document.getElementById('lb-body');
  const standings=PLAYERS.map(p=>({...p,...getStats(p.id),ch:champions[p.id],active:isActive(p.id)}))
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
  tbody.innerHTML=standings.map((s,i)=>{
    const rk=i+1, rc=rk<=3?`rank-${rk}`:'rank-n', cf=s.ch?T[s.ch]?.f||'':'';
    const pct=mx>0?Math.round(s.total/mx*100):0;
    const badges=getStreakBadge(s);
    const st=s.active?'':`<span class="admin-player-status status-pending" style="font-size:10px;margin-left:4px">pending</span>`;
    return `<tr${!s.active?' style="opacity:.5"':''}>
      <td><span class="rank-badge ${rc}">${rk}</span></td>
      <td><span class="player-name">${s.name}</span>${badges}${st} <span class="player-champion">${cf}</span></td>
      <td class="col-num">${s.exact}</td><td class="col-num">${s.gd}</td><td class="col-num">${s.outcome}</td>
      <td class="pts-cell">${s.total} <span class="pts-bar"><span class="pts-bar-fill" style="width:${pct}%"></span></span></td></tr>`}).join('');
}

function getStreakBadge(s){let c=0; for(let i=s.streak.length-1;i>=0;i--){if(s.streak[i].t!=='wrong'&&s.streak[i].t!=='pending')c++;else break} return c>=3?'🔥':''}

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
    return `<div class="rivalry-card"><span class="rival-name">${a.name.split(' ')[0]}</span><span class="rival-pts rival-pts-l">${a.total}</span>
    <div class="rival-bar"><div class="rival-bar-l" style="width:${pct}%"></div><div class="rival-bar-r" style="width:${100-pct}%"></div></div>
    <span class="rival-pts rival-pts-r">${b.total}</span><span class="rival-name">${b.name.split(' ')[0]}</span></div>`}).join('');
}

// ===== CHAMPION BANNER =====
function renderChampBanner(){
  const c=document.getElementById('champion-banner'); const ch=champions[currentUser.id]; if(!ch){c.innerHTML='';return}
  const t=T[ch];
  c.innerHTML=`<div class="champion-banner"><div><div class="champ-info-label">Your champion pick</div><div class="champ-info-name">${t.f} ${t.n}</div>
    <div class="champ-info-bonus">+15 if they win · +5 final · +3 semis</div></div><div class="champ-flag-big">${t.f}</div></div>`;
}

// ===== MATCHES =====
function renderMatches(filter='today'){
  const c=document.getElementById('matches-list'); const now=new Date(); const todayStr=now.toISOString().slice(0,10);
  let filtered=M.filter(m=>m.h!=='TBD'); // only show matches with known teams
  if(filter==='today')filtered=filtered.filter(m=>m.k.slice(0,10)===todayStr);
  else if(filter==='upcoming')filtered=filtered.filter(m=>new Date(m.k)>now&&!matchResults[m.id]);
  else if(filter==='completed')filtered=filtered.filter(m=>matchResults[m.id]);
  if(filtered.length===0){c.innerHTML='<div class="empty-state"><div>⚽</div>No matches for this filter</div>';return}
  const byDate={};filtered.forEach(m=>{const d=new Date(m.k).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}); if(!byDate[d])byDate[d]=[];byDate[d].push(m)});
  let html=''; Object.entries(byDate).forEach(([d,ms])=>{html+=`<div class="day-label">📅 ${d}</div>`; ms.forEach(m=>html+=renderMatchCard(m,now))});
  c.innerHTML=html;
  c.querySelectorAll('.match-bet-btn:not(.saved):not(.locked-btn)').forEach(b=>b.addEventListener('click',()=>placeBet(b.dataset.mid)));
}

function renderMatchCard(m,now){
  const hm=T[m.h],aw=T[m.a],ko=new Date(m.k),lock=new Date(ko.getTime()-LOCKOUT_H*36e5),locked=now>=lock;
  const res=matchResults[m.id],bet=allBets[m.id]?.[currentUser.id],pending=!isActive(currentUser.id);
  const time=ko.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Sao_Paulo'});
  const isBrazil=m.h==='BRA'||m.a==='BRA';
  // Other bets
  const mBets=allBets[m.id]||{}; const peekHtml=Object.entries(mBets).map(([pid,b])=>{
    const pl=PLAYERS.find(p=>p.id===pid); return pl?`<span class="peek-bet"><strong>${pl.name.split(' ')[0]}</strong> ${b.h}×${b.a}</span>`:''}).join('');
  const bc=Object.keys(mBets).length;
  let actionBtn='';
  if(res){const sc=`${res.h}×${res.a}`; let rb=''; if(bet){const pt=calcPts(bet.h,bet.a,res.h,res.a);
    if(pt){const lb={exact:'Exact +10',gd:'GD +5',outcome:'Outcome +3',wrong:'Wrong'};const cl={exact:'result-exact',gd:'result-gd',outcome:'result-outcome',wrong:'result-wrong'};
    rb=`<span class="match-result ${cl[pt.t]}">${lb[pt.t]}</span>`}} actionBtn=`<span style="font-size:12px;color:var(--text-muted)">Final: ${sc}</span> ${rb}`}
  else if(bet)actionBtn=`<button class="match-bet-btn saved">✓ ${bet.h}×${bet.a}</button>`;
  else if(locked||pending)actionBtn=`<button class="match-bet-btn locked-btn">${pending?'Activate to bet':'🔒 Locked'}</button>`;
  else actionBtn=`<button class="match-bet-btn" data-mid="${m.id}">Place bet</button>`;
  const dis=locked||bet||res||pending?'disabled':'';
  return `<div class="match-card${isBrazil?' brazil-match':''}">
    <div class="match-teams-row"><div class="match-team"><span class="flag">${hm.f}</span> ${hm.n}</div>
    <div class="match-vs"><input type="number" class="score-input${dis?' locked':''}" id="h-${m.id}" min="0" max="20" value="${bet?bet.h:''}" placeholder="–" ${dis}>
    <span class="score-sep">×</span><input type="number" class="score-input${dis?' locked':''}" id="a-${m.id}" min="0" max="20" value="${bet?bet.a:''}" placeholder="–" ${dis}></div>
    <div class="match-team right">${aw.n} <span class="flag">${aw.f}</span></div></div>
    <div class="match-meta"><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
    ${m.g?`<span class="match-group">Group ${m.g}</span>`:m.r?`<span class="match-group">${m.r}</span>`:''}<span class="match-info">🕐 ${time} BRT</span>
    <span class="match-info">📍 ${m.v}</span></div>${actionBtn}</div>
    ${bc>0?`<div class="bets-peek"><div class="bets-peek-label">${bc} of ${PLAYERS.length} bets</div><div class="peek-row">${peekHtml}</div></div>`:''}</div>`;
}

function placeBet(mid){
  const hv=document.getElementById(`h-${mid}`).value,av=document.getElementById(`a-${mid}`).value;
  if(hv===''||av==='')return alert('Enter both scores!');
  const bet={h:+hv,a:+av,ts:Date.now()};
  if(db)db.ref(`bets/${mid}/${currentUser.id}`).set(bet);
  else{if(!allBets[mid])allBets[mid]={}; allBets[mid][currentUser.id]=bet; saveLS()}
  renderMatches(document.querySelector('.filter-btn.active')?.dataset.filter||'today');
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
  const brMatches=M.filter(m=>m.h==='BRA'||m.a==='BRA');
  bp.innerHTML=`<div class="brazil-path-card">${brMatches.map(m=>{const ko=new Date(m.k);const res=matchResults[m.id];
    const time=ko.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Sao_Paulo'});
    const date=ko.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
    return `<div class="match-row"><div class="bp-teams">${T[m.h].f} ${T[m.h].n} vs ${T[m.a].n} ${T[m.a].f}${res?' <strong>'+res.h+'×'+res.a+'</strong>':''}</div>
      <div class="bp-meta">${date}<br>${time} BRT · ${m.v}</div></div>`}).join('')}</div>`;
  // Groups grid
  const gg=document.getElementById('groups-grid');
  gg.innerHTML=Object.entries(GROUPS).map(([g,teams])=>`<div class="group-card${g==='C'?' brazil-group':''}">
    <div class="group-card-title">Group ${g}</div>${teams.map(c=>`<div class="group-team"><span class="flag">${T[c].f}</span> ${T[c].n}</div>`).join('')}</div>`).join('');
  // Full schedule
  const fs=document.getElementById('full-schedule'); const now=new Date(); const todayStr=now.toISOString().slice(0,10);
  const groupMatches=M.filter(m=>m.g);
  const byDate={}; groupMatches.forEach(m=>{const d=new Date(m.k).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}); if(!byDate[d])byDate[d]=[];byDate[d].push(m)});
  fs.innerHTML=Object.entries(byDate).map(([d,ms])=>`<div class="day-label">${d}</div>${ms.map(m=>{
    const ko=new Date(m.k),res=matchResults[m.id],past=ko<now,today=m.k.slice(0,10)===todayStr,isBr=m.h==='BRA'||m.a==='BRA';
    const time=ko.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Sao_Paulo'});
    return `<div class="schedule-match${past?' past':''}${today?' today':''}${isBr?' brazil-match':''}">
      <span class="sched-teams">${T[m.h].f} ${T[m.h].n} vs ${T[m.a].n} ${T[m.a].f}</span>
      <span class="sched-meta">Group ${m.g} · ${time} BRT · ${m.v}${res?`<span class="sched-score">${res.h}×${res.a}</span>`:''}</span></div>`}).join('')}`).join('');
  // Knockout
  const kb=document.getElementById('knockout-bracket');
  const rounds={R32:'Round of 32',R16:'Round of 16',QF:'Quarter-finals',SF:'Semi-finals','3rd':'3rd Place Match',Final:'Final'};
  const koMatches=M.filter(m=>m.r);
  const byRound={}; koMatches.forEach(m=>{if(!byRound[m.r])byRound[m.r]=[];byRound[m.r].push(m)});
  kb.innerHTML=Object.entries(rounds).map(([r,label])=>{const ms=byRound[r]||[];if(!ms.length)return'';
    return `<div class="knockout-round"><div class="knockout-round-title">${label}</div>${ms.map(m=>{const ko=new Date(m.k);
      const date=ko.toLocaleDateString('en-US',{month:'short',day:'numeric'}),time=ko.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Sao_Paulo'});
      const hm=T[m.h],aw=T[m.a],tbd=m.h==='TBD';
      return `<div class="knockout-match"><span class="ko-teams${tbd?' ko-tbd':''}">${hm.f} ${hm.n} vs ${aw.n} ${aw.f}</span>
        <span class="ko-meta">${date} · ${time} BRT · ${m.v}</span></div>`}).join('')}</div>`}).join('');
  // Venues
  const vl=document.getElementById('venues-list');
  const venues={}; M.forEach(m=>{if(!venues[m.v])venues[m.v]=0;venues[m.v]++});
  const venueCountry=v=>{const mx=['Mexico City','Guadalajara','Monterrey'];const ca=['Toronto','Vancouver'];return mx.some(x=>v.includes(x))?'🇲🇽':ca.some(x=>v.includes(x))?'🇨🇦':'🇺🇸'};
  vl.innerHTML=Object.entries(venues).sort((a,b)=>b[1]-a[1]).map(([v,c])=>`<div class="venue-item"><span class="venue-flag">${venueCountry(v)}</span>
    <span class="venue-name">${v}</span><span class="venue-matches">${c} matches</span></div>`).join('');
  // Key dates
  document.getElementById('key-dates').innerHTML=[
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
  const w=document.getElementById('chat-wall');
  w.innerHTML=allMessages.slice(-20).reverse().map(m=>{const ini=m.name?m.name.split(' ').map(w=>w[0]).join(''):'?';const bot=m.author==='bot';
    const ago=timeAgo(m.ts);
    return `<div class="chat-msg"><div class="chat-avatar${bot?' bot':''}">${bot?'🤖':ini}</div>
      <div class="chat-text"><span class="chat-author">${m.name||'DUG Bot'}</span> — ${esc(m.text)} <span class="chat-time">${ago}</span></div></div>`}).join('');
}
function timeAgo(ts){const d=Date.now()-ts,m=Math.floor(d/6e4); if(m<1)return'now'; if(m<60)return m+'m'; const h=Math.floor(m/60); if(h<24)return h+'h'; return Math.floor(h/24)+'d'}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}

// ===== ADMIN =====
function setupAdmin(){
  document.getElementById('admin-login-btn').addEventListener('click',()=>{
    if(document.getElementById('admin-pass').value===ADMIN_PASS){document.getElementById('admin-gate').style.display='none';document.getElementById('admin-panel').style.display='block';renderAdmin()}
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
    return `<div class="admin-player-row"><span class="admin-player-name">${ch} ${p.name}</span><span class="admin-player-email">${p.email}</span>
      <span class="admin-player-status ${st?'status-active':'status-pending'}">${st?'Active':'Pending'}</span>
      ${!st?`<button class="btn-primary btn-sm" onclick="approvePlayer('${p.id}')">Approve</button>`:
      `<button class="btn-outline btn-sm" onclick="copyConfirmEmail('${p.id}')">📋 Email</button>`}</div>`}).join('');
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
  const url=SITE_URL||'[SITE LINK]';
  const txt=`Pessoal,\n\nWe're running a World Cup prediction pool for DUG Brasil. Simple rules, real money, and a team lunch at stake.\n\nThe game:\nPredict the final score for each match. You earn points based on how close you get:\n- Exact score: 10 points\n- Correct goal difference: 5 points\n- Correct winner/draw: 3 points\n\nYou also pick a champion team when you register. If they go far, you earn bonus points (+15 for winning, +5 for the final, +3 for the semis). You can change your pick until June 22.\n\nPrize pool:\nBuy-in: R$75 per person\n- 50% (R$525) funds a team lunch, restaurant chosen by the winner\n- 25% (R$263) to 1st place\n- 15% (R$158) to 2nd place\n- 10% (R$105) to 3rd place\n\nTo join:\n1. Open the pool: ${url}\n2. Select your name from the dropdown\n3. Pick your World Cup champion team\n4. Scan the QR code or copy the PIX key to pay R$75\n\nYour account will be activated once I confirm the payment.\n\nBets lock 1 hour before each match kickoff. The pool covers all 104 matches through the final on July 19.\n\nThe site has a live leaderboard, weekly awards, head-to-head rivalries, full tournament schedule, and a trash talk wall.\n\nQuestions? Just reach out.\n\nWilson`;
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
