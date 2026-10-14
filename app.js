'use strict';
const TEACHER_PIN='1234', MAX_SELFIES=30;
// ---- Creature art (self-contained SVG, facing right) ----
const S=(vb,b)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${b}</svg>`;
const eye=(x,y,r=4)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x+1}" cy="${y}" r="${r/2}" fill="#000"/>`;
const C={
shark:{n:'Shark',w:170,h:90,sp:1.3,y:[.15,.55],art:S('0 0 200 100',`<path d="M10 50 L-0 20 L30 45Z" fill="#6c8ea4"/><path d="M20 50 Q80 10 190 50 Q80 85 20 50Z" fill="#7fa6bf"/><path d="M40 55 Q110 75 185 52 Q110 85 40 55Z" fill="#e8f1f5"/><path d="M90 25 L105 0 L120 28Z" fill="#6c8ea4"/><path d="M100 62 L90 85 L120 65Z" fill="#6c8ea4"/>${eye(160,42,5)}<path d="M165 58 l4 4 4-4 4 4" stroke="#333" fill="none" stroke-width="2"/>`),
 facts:['Sharks have been around since before the dinosaurs!','They can grow thousands of teeth in their life.','Sharks have no bones, just bendy cartilage like your ears.'],eats:'Fish, seals and squid',lives:'Oceans all over the world',size:'Most are as long as a car'},
octopus:{n:'Octopus',w:110,h:110,sp:.5,y:[.4,.75],art:S('0 0 100 100',`${[15,30,45,60,75,90].map((x,i)=>`<path d="M${40+i*4} 55 Q${x} 80 ${x-5+i*2} 98" stroke="#c77dff" stroke-width="9" fill="none" stroke-linecap="round"/>`).join('')}<ellipse cx="52" cy="38" rx="32" ry="30" fill="#c77dff"/>${eye(42,40,6)}${eye(62,40,6)}<path d="M45 55 Q52 61 59 55" stroke="#5a189a" stroke-width="3" fill="none"/>`),
 facts:['An octopus has 8 arms and 3 hearts!','It can change colour to hide.','Its blood is blue.'],eats:'Crabs, shrimp and clams',lives:'Rocky sea floors and coral reefs',size:'From as small as a grape to bigger than a grown-up'},
turtle:{n:'Sea Turtle',w:130,h:90,sp:.6,y:[.2,.6],art:S('0 0 140 90',`<ellipse cx="40" cy="22" rx="20" ry="8" fill="#52b788" transform="rotate(-30 40 22)"/><ellipse cx="40" cy="68" rx="20" ry="8" fill="#52b788" transform="rotate(30 40 68)"/><ellipse cx="95" cy="20" rx="22" ry="9" fill="#52b788" transform="rotate(-35 95 20)"/><ellipse cx="95" cy="70" rx="22" ry="9" fill="#52b788" transform="rotate(35 95 70)"/><circle cx="122" cy="45" r="14" fill="#74c69d"/>${eye(127,41,4)}<ellipse cx="68" cy="45" rx="45" ry="30" fill="#2d6a4f"/><path d="M45 30 L68 45 L91 30 M45 60 L68 45 L91 60 M68 17 V73" stroke="#95d5b2" stroke-width="3" fill="none"/>`),
 facts:['Sea turtles can hold their breath for hours while resting.','Mum turtles lay eggs on sandy beaches.','Some turtles are over 100 years old!'],eats:'Seagrass, jellyfish and sponges',lives:'Warm oceans and beaches',size:'About as long as a bathtub'},
clownfish:{n:'Clownfish',w:80,h:50,sp:1.1,y:[.3,.8],art:S('0 0 100 60',`<path d="M10 30 L0 10 L0 50Z" fill="#ff7b00"/><ellipse cx="52" cy="30" rx="42" ry="24" fill="#ff7b00"/><path d="M28 9 Q32 30 28 51 M54 6 Q60 30 54 54 M78 12 Q82 30 78 48" stroke="#fff" stroke-width="8" fill="none"/><path d="M28 9 Q32 30 28 51 M54 6 Q60 30 54 54" stroke="#000" stroke-width="1.5" fill="none" opacity=".5"/>${eye(84,25,5)}`),
 facts:['Clownfish live inside stinging sea anemones, but do not get stung!','They are all born as boys.','Nemo is a clownfish!'],eats:'Tiny plankton and algae',lives:'Warm coral reefs',size:'As small as your hand'},
seahorse:{n:'Seahorse',w:55,h:100,sp:.3,y:[.35,.75],art:S('0 0 60 110',`<path d="M30 15 Q50 15 48 35 Q45 55 35 70 Q25 90 40 100 Q30 108 22 98 Q15 80 25 62 Q30 50 22 40 Q12 25 30 15Z" fill="#ffb703"/><path d="M45 22 L60 26 L46 32Z" fill="#ffb703"/><path d="M20 45 Q8 50 18 58" fill="#fb8500"/>${eye(38,24,4)}<path d="M26 14 l4-8 4 8" fill="#fb8500"/>`),
 facts:['Seahorse dads carry the babies!','They swim standing up.','Their eyes can look two ways at once.'],eats:'Tiny shrimp',lives:'Seagrass and coral reefs',size:'About as tall as your finger'},
jellyfish:{n:'Jellyfish',w:80,h:110,sp:.25,y:[.1,.5],art:S('0 0 80 110',`${[15,28,40,52,65].map(x=>`<path d="M${x} 45 Q${x-8} 70 ${x} 85 Q${x+8} 100 ${x} 110" stroke="#ffafcc" stroke-width="4" fill="none" opacity=".85"/>`).join('')}<path d="M5 48 Q5 5 40 5 Q75 5 75 48 Q40 40 5 48Z" fill="#ffc8dd" opacity=".9"/>${eye(30,30,3)}${eye(50,30,3)}`),
 facts:['Jellyfish have no brain, no heart and no bones!','They have been around for 500 million years.','Some jellyfish glow in the dark.'],eats:'Tiny fish and plankton',lives:'Every ocean in the world',size:'From a pea to as wide as a car'},
dolphin:{n:'Dolphin',w:150,h:80,sp:1.5,y:[.1,.45],art:S('0 0 180 90',`<path d="M10 45 L0 25 L22 42 L0 65Z" fill="#5e81ac"/><path d="M15 45 Q70 10 150 35 L178 42 L150 50 Q90 75 15 45Z" fill="#81a1c1"/><path d="M40 52 Q100 68 150 50 Q100 60 40 52Z" fill="#e5e9f0"/><path d="M85 25 L95 5 L110 27Z" fill="#5e81ac"/><path d="M95 55 L88 75 L112 58Z" fill="#5e81ac"/>${eye(140,38,4)}`),
 facts:['Dolphins talk with clicks and whistles.','They breathe air through a hole on their head.','Dolphins are super smart and love to play!'],eats:'Fish and squid',lives:'Oceans and some rivers',size:'About as long as a sofa'},
crab:{n:'Crab',w:90,h:60,sp:.7,y:[.86,.9],floor:1,art:S('0 0 100 70',`${[0,1,2].map(i=>`<path d="M${30-i*6} 45 l-15 ${8+i*6}" stroke="#d62828" stroke-width="5" stroke-linecap="round"/><path d="M${70+i*6} 45 l15 ${8+i*6}" stroke="#d62828" stroke-width="5" stroke-linecap="round"/>`).join('')}<ellipse cx="50" cy="42" rx="30" ry="20" fill="#e63946"/><circle cx="12" cy="18" r="11" fill="#e63946"/><circle cx="88" cy="18" r="11" fill="#e63946"/><path d="M3 12 l10 6" stroke="#fff" stroke-width="3"/><path d="M97 12 l-10 6" stroke="#fff" stroke-width="3"/><path d="M40 25 v-10 M60 25 v-10" stroke="#d62828" stroke-width="3"/>${eye(40,13,5)}${eye(60,13,5)}<path d="M42 48 Q50 54 58 48" stroke="#600" stroke-width="2" fill="none"/>`),
 facts:['Crabs walk sideways!','They have their skeleton on the outside.','Crabs can grow back a lost claw.'],eats:'Almost anything: algae, worms, leftovers',lives:'Beaches, rocks and the sea floor',size:'From a coin to as wide as a car (Japanese spider crab)'},
starfish:{n:'Starfish',w:70,h:70,sp:.15,y:[.87,.9],floor:1,art:S('0 0 100 100',`<path d="M50 3 L62 38 L98 38 L69 60 L80 96 L50 74 L20 96 L31 60 L2 38 L38 38Z" fill="#f77f00" stroke="#d62828" stroke-width="3" stroke-linejoin="round"/>${[[50,25],[72,45],[63,72],[37,72],[28,45]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="#fcbf49"/>`).join('')}${eye(42,48,4)}${eye(58,48,4)}<path d="M44 58 Q50 63 56 58" stroke="#600" stroke-width="2" fill="none"/>`),
 facts:['A starfish has no brain and no blood!','It can grow a new arm if one breaks off.','It has an eye at the end of each arm.'],eats:'Clams, mussels and snails',lives:'Rocky sea floors and tide pools',size:'About as big as your hand'},
whale:{n:'Whale',w:260,h:130,sp:.5,y:[.08,.35],art:S('0 0 260 130',`<path d="M20 60 L0 30 L30 55 L5 90Z" fill="#3a5a8c"/><path d="M25 60 Q90 10 200 25 Q255 35 255 70 Q250 110 170 112 Q80 115 25 60Z" fill="#4a6fa5"/><path d="M110 105 Q180 100 250 78 Q245 108 170 112 Q130 114 110 105Z" fill="#cfd8e6"/><path d="M150 95 L140 125 L175 100Z" fill="#3a5a8c"/>${eye(220,55,6)}<path d="M200 10 Q205 0 210 10 M205 12 V0" stroke="#caf0f8" stroke-width="3" fill="none"/>`),
 facts:['The blue whale is the biggest animal that has ever lived!','Whales sing songs to each other.','A whale\'s heart is as big as a small car.'],eats:'Tiny krill, millions a day',lives:'All the oceans',size:'As long as 3 school buses (blue whale)'}
};
const sea=document.getElementById('sea'),$=id=>document.getElementById(id);
let W=innerWidth,H=innerHeight;addEventListener('resize',()=>{W=innerWidth;H=innerHeight});
// ---- Scenery ----
for(let i=0;i<6;i++){const r=document.createElement('div');r.className='ray';r.style.left=(i*18-5)+'%';r.style.animationDelay=(-i*1.3)+'s';sea.appendChild(r)}
const weedCols=['#2d6a4f','#40916c','#52b788','#1b4332','#3a7d44','#588157'];
for(let i=0;i<22;i++){const h=60+Math.random()*170,d=document.createElement("div");d.className="weed";d.style.left=(i*4.6-1+Math.random()*2.5)+'%';d.style.animationDelay=(-Math.random()*3)+'s';d.style.animationDuration=(2.5+Math.random()*2)+'s';
 d.innerHTML=S(`0 0 40 ${h}`,`<path d="M20 ${h} Q5 ${h*.75} 20 ${h*.5} Q35 ${h*.25} 20 0" stroke="${weedCols[i%6]}" stroke-width="10" fill="none" stroke-linecap="round"/>`);d.style.width='40px';d.style.height=h+'px';sea.appendChild(d)}
for(let i=0;i<22;i++){const b=document.createElement('div'),s=6+Math.random()*18;b.className='bub';Object.assign(b.style,{width:s+'px',height:s+'px',left:Math.random()*100+'%',animationDuration:(6+Math.random()*8)+'s',animationDelay:(-Math.random()*12)+'s'});sea.appendChild(b)}
// ===== ocean-creatures additions =====
const FIVE={
shark:['Sharks were around before the dinosaurs!','A shark can grow and lose thousands of teeth in its life.','Sharks have no bones, just bendy cartilage like your ears and nose.','Many sharks must keep swimming to breathe.','Sharks can smell a tiny drop of blood from far away.'],
octopus:['An octopus has 8 arms.','It has 3 hearts!','Its blood is blue.','It can change colour and shape to hide.','It squirts ink to escape from danger.'],
turtle:['Sea turtles have lived on Earth for over 100 million years.','Mum turtles crawl onto beaches to lay their eggs in the sand.','Baby turtles race to the sea right after they hatch.','Sea turtles cannot pull their heads into their shells.','Some sea turtles swim thousands of kilometres across the ocean.'],
clownfish:['Clownfish live in stinging sea anemones but do not get stung.','A slimy coat protects them from the stings.','They are all born as boys, and some later become girls.','The dad clownfish looks after the eggs.','Nemo from the movie is a clownfish!'],
seahorse:['Seahorse dads carry the babies in a pouch.','Seahorses swim standing up.','They hold onto seaweed with their curly tails.','Each eye can look a different way at the same time.','Seahorses have no teeth and slurp food through their snout.'],
jellyfish:['Jellyfish have no brain, heart or bones.','They have lived in the sea for over 500 million years.','A jellyfish is mostly water.','Some jellyfish glow in the dark.','They sting with their long tentacles to catch food.'],
dolphin:['Dolphins talk with clicks and whistles.','They breathe air through a blowhole on top of their head.','Dolphins live in family groups called pods.','They find food by listening to echoes.','Dolphins are very smart and love to play.'],
crab:['Crabs usually walk sideways.','Their skeleton is on the outside, like armour.','Crabs can grow back a lost leg or claw.','They wave their claws to talk to other crabs.','Crabs have ten legs, including the two claws.'],
starfish:['A starfish is not a fish, so it is also called a sea star.','It has no brain and no blood.','It can grow back a lost arm.','It has a tiny eye at the end of each arm.','It eats by pushing its stomach out of its mouth!'],
whale:['The blue whale is the biggest animal that has ever lived.','Whales breathe air through blowholes.','Humpback whales sing long songs.','A blue whale\'s heart is as big as a small car.','Baby whales drink milk from their mums.'],
pufferfish:['A pufferfish blows up like a ball when it is scared.','It does this by gulping lots of water.','Many pufferfish have spikes.','Pufferfish are slow swimmers.','Some pufferfish make sand art circles on the sea floor.'],
stingray:['Stingrays are flat cousins of sharks.','They flap their fins like wings to swim.','They hide under the sand with only their eyes peeking out.','Their eyes are on top and their mouth is underneath.','A stingray has a stinger on its tail to protect itself.']};
// ---- avatar art: [vbW,vbH,inner(col),faceCx,faceCy,faceR,basePx,motion] ----
const tl=(o,b)=>`<g class="tl" style="transform-origin:${o}">${b}</g>`;
const SKIN=['#f1c27d','#e0ac69','#c68642','#8d5524','#ffdbac'];
function merInner(k,tc,sk){const hair=k==='mermaid'?'#a8326e':'#5a3a1a';return `${k==='mermaid'?`<path d="M20 34 Q16 80 30 92 L70 92 Q84 80 80 34 Z" fill="${hair}"/>`:''}
${tl('50px 96px',`<path d="M30 92 Q28 120 46 138 L54 138 Q72 120 70 92 Z" fill="${tc}"/><path d="M36 104 q4 4 8 0 q4 4 8 0 q4 4 8 0 M40 116 q4 4 8 0 q4 4 8 0" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none"/><path d="M50 134 Q30 140 22 158 Q40 150 50 146 Q60 150 78 158 Q70 140 50 134Z" fill="${tc}"/>`)}
<path d="M32 62 Q18 72 14 84 M68 62 Q82 72 86 84" stroke="${sk}" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M32 58 Q50 52 68 58 L70 94 Q50 98 30 94 Z" fill="${sk}"/>
${k==='mermaid'?`<circle cx="41" cy="70" r="8" fill="#c77dff"/><circle cx="59" cy="70" r="8" fill="#c77dff"/>`:`<path d="M30 88 Q50 94 70 88 L70 96 Q50 100 30 96Z" fill="${tc}"/>`}
<circle cx="50" cy="38" r="27" fill="${hair}"/>${k==='merman'?`<path d="M34 12 L38 0 L44 9 L50 -2 L56 9 L62 0 L66 12 Z" fill="#ffd60a"/>`:`<circle cx="74" cy="18" r="6" fill="#ff70a6"/><circle cx="80" cy="22" r="4" fill="#ffd60a"/>`}`}
const AV={
mermaid:{n:'Mermaid',e:'🧜‍♀️',d:'#2ec4b6',vb:[100,166,0,-6],f:[50,38,25],px:105,m:'mer',art:(c,s)=>merInner('mermaid',c,s)},
merman:{n:'Merman',e:'🧜‍♂️',d:'#3a86ff',vb:[100,166,0,-6],f:[50,38,25],px:105,m:'mer',art:(c,s)=>merInner('merman',c,s)},
clownfish:{n:'Clownfish',e:'🐠',d:'#ff7b00',vb:[140,90],f:[100,44,24],px:130,m:'fish',art:c=>`${tl('34px 45px',`<path d="M36 45 L6 20 Q14 45 6 70Z" fill="${c}"/>`)}<path d="M60 16 Q80 0 100 16Z" fill="${c}"/><ellipse cx="78" cy="45" rx="50" ry="32" fill="${c}"/><path d="M52 16 Q60 45 52 74 M74 13 Q82 45 74 77" stroke="#fff" stroke-width="10" fill="none"/>`},
shark:{n:'Shark',e:'🦈',d:'#7fa6bf',vb:[200,100],f:[150,48,24],px:200,m:'fish',art:c=>`${tl('30px 50px',`<path d="M32 50 L0 18 L10 50 L0 82Z" fill="${c}"/>`)}<path d="M25 50 Q80 10 190 50 Q80 88 25 50Z" fill="${c}"/><path d="M45 56 Q110 76 185 54 Q110 86 45 56Z" fill="#e8f1f5"/><path d="M90 25 L105 0 L120 28Z" fill="${c}"/><path d="M100 62 L90 88 L122 66Z" fill="${c}"/>`},
dolphin:{n:'Dolphin',e:'🐬',d:'#81a1c1',vb:[180,90],f:[126,40,20],px:170,m:'fish',art:c=>`${tl('20px 45px',`<path d="M22 45 L0 22 L10 45 L0 68Z" fill="${c}"/>`)}<path d="M15 45 Q70 10 150 35 L178 42 L150 50 Q90 75 15 45Z" fill="${c}"/><path d="M40 52 Q100 68 150 50 Q100 60 40 52Z" fill="#e5e9f0"/><path d="M85 25 L95 5 L110 27Z" fill="${c}"/>`},
turtle:{n:'Sea Turtle',e:'🐢',d:'#2d6a4f',vb:[150,100],f:[124,50,22],px:150,m:'fish',art:c=>`${tl('60px 50px',`<ellipse cx="45" cy="22" rx="22" ry="9" fill="#74c69d" transform="rotate(-30 45 22)"/><ellipse cx="95" cy="18" rx="24" ry="10" fill="#74c69d" transform="rotate(-35 95 18)"/>`)}<ellipse cx="45" cy="78" rx="22" ry="9" fill="#74c69d" transform="rotate(30 45 78)"/><ellipse cx="95" cy="82" rx="24" ry="10" fill="#74c69d" transform="rotate(35 95 82)"/><circle cx="124" cy="50" r="24" fill="#74c69d"/><ellipse cx="70" cy="50" rx="46" ry="32" fill="${c}"/><path d="M47 35 L70 50 L93 35 M47 65 L70 50 L93 65 M70 20 V80" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none"/>`},
octopus:{n:'Octopus',e:'🐙',d:'#c77dff',vb:[100,115],f:[52,40,25],px:120,m:'upright',art:c=>`${tl('52px 60px',[15,30,45,60,75,90].map((x,i)=>`<path d="M${40+i*4} 55 Q${x} 85 ${x-5+i*2} 110" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round"/>`).join(''))}<ellipse cx="52" cy="40" rx="34" ry="32" fill="${c}"/>`},
whale:{n:'Whale',e:'🐋',d:'#4a6fa5',vb:[260,130],f:[198,58,30],px:240,m:'fish',art:c=>`${tl('28px 60px',`<path d="M30 60 L0 28 L12 60 L2 95Z" fill="${c}"/>`)}<path d="M25 60 Q90 10 200 25 Q255 35 255 70 Q250 110 170 112 Q80 115 25 60Z" fill="${c}"/><path d="M110 105 Q180 100 250 78 Q245 108 170 112 Q130 114 110 105Z" fill="#cfd8e6"/><path d="M150 95 L140 125 L175 100Z" fill="${c}"/>`},
seahorse:{n:'Seahorse',e:'🌊',d:'#ffb703',vb:[80,130],f:[38,28,19],px:90,m:'upright',art:c=>`<path d="M38 30 Q62 40 58 62 Q54 82 42 92 Q30 104 46 118 Q34 128 24 116 Q16 98 30 82 Q38 70 30 58 Q20 46 38 30Z" fill="${c}"/><path d="M52 24 L74 28 L54 36Z" fill="${c}"/>${tl('30px 70px',`<path d="M30 62 Q14 68 26 78" fill="#fb8500"/>`)}`},
jellyfish:{n:'Jellyfish',e:'🪼',d:'#ffafcc',vb:[90,125],f:[45,30,20],px:100,m:'jelly',art:c=>`${tl('45px 50px',[15,30,45,60,75].map(x=>`<path d="M${x} 48 Q${x-8} 75 ${x} 92 Q${x+8} 108 ${x} 124" stroke="${c}" stroke-width="5" fill="none" opacity=".85"/>`).join(''))}<path d="M3 52 Q3 4 45 4 Q87 4 87 52 Q45 44 3 52Z" fill="${c}" opacity=".9"/>`},
crab:{n:'Crab',e:'🦀',d:'#e63946',vb:[130,85],f:[65,48,21],px:130,m:'floor',art:c=>`${tl('65px 55px',[0,1,2].map(i=>`<path d="M${40-i*7} 58 l-16 ${10+i*6} M${90+i*7} 58 l16 ${10+i*6}" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`).join(''))}<ellipse cx="65" cy="52" rx="36" ry="26" fill="${c}"/><circle cx="14" cy="22" r="13" fill="${c}"/><circle cx="116" cy="22" r="13" fill="${c}"/><path d="M4 15 l12 7 M126 15 l-12 7" stroke="#fff" stroke-width="3"/>`},
pufferfish:{n:'Pufferfish',e:'🐡',d:'#ffd166',vb:[120,110],f:[66,55,30],px:120,m:'puff',art:c=>`${tl('22px 55px',`<path d="M26 55 L4 38 L8 55 L4 72Z" fill="${c}"/>`)}${[...Array(14)].map((_,i)=>{const a=i/14*6.283,x=66+Math.cos(a)*44,y=55+Math.sin(a)*44,x2=66+Math.cos(a)*54,y2=55+Math.sin(a)*54;return `<path d="M${x} ${y} L${x2} ${y2}" stroke="#e09f3e" stroke-width="4" stroke-linecap="round"/>`}).join('')}<circle cx="66" cy="55" r="45" fill="${c}"/><ellipse cx="66" cy="80" rx="30" ry="16" fill="#fff6d5"/>`},
stingray:{n:'Stingray',e:'🛸',d:'#8d99ae',vb:[180,110],f:[108,55,22],px:180,m:'ray',art:c=>`<path d="M50 56 Q25 58 2 52" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/>${tl('100px 55px',`<path d="M100 8 Q150 30 176 56 Q150 80 100 102 Q72 80 48 56 Q72 30 100 8Z" fill="${c}"/>`)}<ellipse cx="102" cy="56" rx="30" ry="24" fill="${c}" stroke="#fff" stroke-opacity=".3" stroke-width="2"/>`},
generic:{n:'Fish',e:'🐟',d:'#4cc9f0',vb:[140,90],f:[90,45,28],px:140,m:'fish',art:c=>`${tl('30px 45px',`<path d="M32 45 L4 18 Q14 45 4 72Z" fill="${c}"/>`)}<path d="M62 18 Q84 2 104 20Z" fill="${c}"/><ellipse cx="78" cy="45" rx="54" ry="34" fill="${c}"/><path d="M60 72 L52 88 L74 76Z" fill="${c}"/>`}};
const AVKEYS=['mermaid','merman','clownfish','shark','dolphin','turtle','octopus','whale','seahorse','jellyfish','crab','pufferfish','stingray'];
const PAL=['#ff70a6','#7b2cbf','#3a86ff','#2ec4b6','#ff5400','#ffd60a','#06d6a0'];
function avSVG(k,col,sk){const a=AV[k],vb=a.vb;return S(`${vb[2]||0} ${vb[3]||0} ${vb[0]} ${vb[1]}`,a.art(col||a.d,sk||SKIN[0]))}
const cuteFace=a=>{const[x,y,r]=a.f;return eye(x-r*.35,y-r*.15,r*.22)+eye(x+r*.35,y-r*.15,r*.22)+`<path d="M${x-r*.3} ${y+r*.35} Q${x} ${y+r*.6} ${x+r*.3} ${y+r*.35}" stroke="#333" stroke-width="${r*.1}" fill="none" stroke-linecap="round"/>`};
// add pufferfish & stingray as built-in creatures
C.pufferfish={n:'Pufferfish',w:110,h:100,sp:.5,y:[.3,.7],art:S('0 0 120 110',AV.pufferfish.art(AV.pufferfish.d)+cuteFace(AV.pufferfish)),eats:'Clams, shrimp and algae',lives:'Warm seas and coral reefs',size:'About as big as a football'};
C.stingray={n:'Stingray',w:170,h:104,sp:.8,y:[.55,.8],art:S('0 0 180 110',AV.stingray.art(AV.stingray.d)+cuteFace(AV.stingray)),eats:'Clams, worms and shrimp',lives:'Sandy sea floors in warm seas',size:'As wide as a door, or bigger'};
for(const k in FIVE)C[k].facts=FIVE[k];
const RES={};// researched fish: id->{id,title,facts,thumb,col,desc}
function resAsC(r){return{n:r.title,w:140,h:90,sp:.9,y:[.2,.7],research:r,art:avSVG('generic',r.col),facts:r.facts,eats:'',lives:'',size:''}}
const DEFAULT=['shark','octopus','turtle','clownfish','clownfish','seahorse','jellyfish','jellyfish','dolphin','crab','starfish','whale','pufferfish','stingray'];
// ---- Swimmers ----
let things=[],uid=0;const scale=()=>Math.max(.7,Math.min(1.4,Math.min(W,H)/700));
function circleEl(img,cls){const d=document.createElement('div');d.className=cls;d.style.backgroundImage=`url("${img}")`;return d}
function placeFace(t){const a=AV[t.av],vb=a.vb,[cx,cy,r]=a.f,flipX=t.flipped;const x0=vb[2]||0,y0=vb[3]||0;let l=(cx-r-x0)/vb[0]*100;if(flipX)l=100-l-2*r/vb[0]*100;
 Object.assign(t.face.style,{left:l+'%',top:(cy-r-y0)/vb[1]*100+'%',width:2*r/vb[0]*100+'%',height:2*r/vb[1]*100+'%'})}
function spawn(type){const c=C[type]||resAsC(RES[type]),k=scale(),el=document.createElement('div');el.className='cr';const w=c.w*k,h=c.h*k;Object.assign(el.style,{width:w+'px',height:h+'px'});
 const t={id:++uid,type,el,w,h,x:Math.random()*(W-w),by:H*(c.y[0]+Math.random()*(c.y[1]-c.y[0])),dir:Math.random()<.5?1:-1,sp:c.sp*(.7+Math.random()*.6),ph:Math.random()*6};
 if(c.research){t.av='generic';t.m='fish';el.classList.add('avt');el.innerHTML=`<div class="body">${c.art}</div>`;t.body=el.firstChild;t.face=circleEl(c.research.thumb||'', 'face bubble');el.appendChild(t.face);placeFace(t)}
 else{el.innerHTML=c.art;if(c.floor)t.by=H*.87-h*.6}
 el.onclick=e=>{e.stopPropagation();showInfo(type)};sea.appendChild(el);things.push(t);refreshSel();return t}
function spawnSelfie(s){if(things.some(t=>t.selfie&&t.selfie.id===s.id))return;const a=AV[s.av]||AV.mermaid,av=AV[s.av]?s.av:'mermaid',k=scale(),w=a.px*k,h=w*a.vb[1]/a.vb[0],el=document.createElement('div');el.className='cr selfie avt';
 const sk=SKIN[(s.id.charCodeAt(0)||0)%5];el.innerHTML=`<div class="body">${avSVG(av,s.col,sk)}</div>`;Object.assign(el.style,{width:w+'px',height:h+'px'});
 const t={id:++uid,selfie:s,av,m:a.m,el,w,h,x:Math.random()*(W-w),by:a.m==='floor'?Math.min(H*.87,$('bar').offsetTop)-h*.95:H*(.15+Math.random()*.5),dir:Math.random()<.5?1:-1,sp:(a.m==='jelly'?.35:.6)+Math.random()*.5,ph:Math.random()*6};
 t.body=el.firstChild;t.face=circleEl(s.img,'face');el.appendChild(t.face);if(s.name){const l=document.createElement('div');l.className='lbl';l.textContent=s.name;el.appendChild(l)}placeFace(t);
 el.onclick=e=>{e.stopPropagation();toast('👋 Hi '+(s.name||'friend')+'! You are a '+(RES[s.av]?.title||a.n)+'!')};sea.appendChild(el);things.push(t);
 const ss=things.filter(t=>t.selfie).sort((a,b)=>a.selfie.t-b.selfie.t);while(ss.length>MAX_SELFIES)kill(ss.shift());refreshSel();return t}
function kill(t){t.el.remove();things=things.filter(x=>x!==t)}
let last=performance.now();
function tick(now){const dt=Math.min(50,now-last)/16.7;last=now;
 for(const t of things){const c=C[t.type];t.x+=t.dir*t.sp*dt*1.4;t.ph+=.03*dt;if(t.x>W-t.w){t.x=W-t.w;t.dir=-1}if(t.x<0){t.x=0;t.dir=1}
  if(t.av){const m=t.m,bob=m==='floor'?0:Math.sin(t.ph)*(m==='jelly'?25:12);t.y=t.by+bob;const fl=(m==='fish'||m==='puff'||m==='ray')?t.dir:1,f=fl<0;
   if(f!==t.flipped){t.flipped=f;t.body.style.transform=`scaleX(${fl})`;placeFace(t)}
   let tr=`translate(${t.x}px,${t.y}px)`;if(m==='mer')tr+=` rotate(${Math.sin(t.ph*1.3)*8+t.dir*-20}deg) scaleX(${1})`;if(m==='puff')tr+=` scale(${1+Math.sin(t.ph*.7)*.08})`;if(m==='upright'||m==='jelly')tr+=` rotate(${Math.sin(t.ph)*5}deg)`;
   t.el.style.transform=tr;continue}
  const bob=c&&c.floor?0:Math.sin(t.ph)*(t.type==='jellyfish'?25:12);t.y=t.by+bob;
  const flip=t.type==='starfish'||t.type==='crab'||t.type==='jellyfish'||t.type==='octopus'?1:t.dir;const rot=t.type==='starfish'?t.ph*10:0;
  t.el.style.transform=`translate(${t.x}px,${t.y}px) scaleX(${flip}) rotate(${rot}deg)`}
 requestAnimationFrame(tick)}
requestAnimationFrame(tick);
// ---- UI ----
const pick=$('pick'),sel=$('sel');
function refreshPick(){const v=pick.value;pick.innerHTML='';Object.entries(C).forEach(([k,c])=>pick.add(new Option(c.n,k)));Object.values(RES).forEach(r=>pick.add(new Option('🔬 '+r.title,r.id)));if(v)pick.value=v}
function nameOf(t){return t.selfie?(AV[t.selfie.av]?.e||'🐟')+' '+(t.selfie.name||'Friend'):(C[t.type]?.n||('🔬 '+RES[t.type].title))}
function refreshSel(){const v=sel.value;sel.innerHTML='';sel.add(new Option('🔍 Find a swimmer',''));const n={};things.forEach(t=>{const lab=nameOf(t);n[lab]=(n[lab]||0)+1;sel.add(new Option(lab+(n[lab]>1?' '+n[lab]:''),t.id))});sel.value=v}
sel.onchange=()=>{things.forEach(t=>t.el.classList.remove('hl'));const t=things.find(t=>t.id==sel.value);if(!t)return;t.el.classList.add('hl');t.el.parentNode.appendChild(t.el);setTimeout(()=>t.el.classList.remove('hl'),6000);if(t.type)showInfo(t.type)};
$('add').onclick=()=>addType(pick.value);
function addType(k){const t=spawn(k);t.el.classList.add('hl');setTimeout(()=>t.el.classList.remove('hl'),2500);toast('A '+(C[k]?.n||RES[k].title)+' joined! 🎉')}
$('rm').onclick=()=>{things.filter(t=>t.type).forEach(kill);refreshSel()};
$('reset').onclick=()=>{things.filter(t=>t.type).forEach(kill);DEFAULT.forEach(k=>spawn(k))};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function showInfo(k){const c=C[k]||resAsC(RES[k]),r=c.research;
 $('infoc').innerHTML=(r?(r.thumb?`<img class="thumb" src="${esc(r.thumb)}" alt="">`:`<div class="art">${c.art}</div>`):`<div class="art">${c.art}</div>`)+`<h2>${esc(c.n)}</h2><ul>${c.facts.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>`+
 (r?`<p class="credit">📖 Facts from Wikipedia: <a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a> (CC BY-SA)</p>`:`<p>🍽️ <b>Eats:</b> ${c.eats}</p><p>🏠 <b>Lives:</b> ${c.lives}</p><p>📏 <b>Size:</b> ${c.size}</p>`)+
 `<button id="ia">➕ Add one</button><button id="ic">👍 Cool!</button>`;$('info').classList.add('on');$('ic').onclick=()=>$('info').classList.remove('on');$('ia').onclick=()=>{$('info').classList.remove('on');addType(k)}}
document.querySelectorAll('.ov').forEach(o=>o.addEventListener('click',e=>{if(e.target===o&&o.id!=='cam')o.classList.remove('on')}));
let tt;function toast(m){const t=$('toast');t.textContent=m;t.style.display='block';clearTimeout(tt);tt=setTimeout(()=>t.style.display='none',3000)}
// ---- Collection ----
function tileArt(k){if(RES[k])return RES[k].thumb?`<img src="${esc(RES[k].thumb)}" alt="">`:avSVG('generic',RES[k].col);return C[k].art}
function renderColl(){$('tiles').innerHTML='';[...Object.keys(C),...Object.keys(RES)].forEach(k=>{const b=document.createElement('button');b.className='tile';b.innerHTML=`<div class="ta">${tileArt(k)}</div><div>${esc(C[k]?.n||RES[k].title)}</div>`;b.onclick=()=>{$('coll').classList.remove('on');showInfo(k)};$('tiles').appendChild(b)})}
$('collb').onclick=()=>{renderColl();$('rq').value='';$('rmsg').textContent='';$('coll').classList.add('on')};$('collx').onclick=()=>$('coll').classList.remove('on');
// ---- Research (Wikipedia) ----
const ANIMAL=/\b(fish|fishes|species|shark|ray|rays|eel|whale|dolphin|porpoise|seal|sea lion|walrus|otter|turtle|tortoise|reptile|amphibian|frog|crab|lobster|shrimp|prawn|krill|crustacean|mollusc|mollusk|octopus|squid|cuttlefish|cephalopod|snail|slug|clam|oyster|mussel|jellyfish|cnidarian|coral|anemone|sponge|urchin|starfish|sea star|echinoderm|mammal|bird|penguin|animal|genus|family of|order of|marine|cetacean|invertebrate|seahorse|manatee|dugong|plankton|worm)\b/i;
const BAD=/\b(sex|porn|nude|kill(ed|ing)? (people|humans)|murder|drug|weapon|war|terror|film|album|song|band|video game|novel|television|company|footballer|politician|actor|actress|singer)\b/i;
const simplify=s=>s.replace(/\s*\([^)]*\)/g,'').replace(/\s*\[[^\]]*\]/g,'').replace(/\s+/g,' ').replace(/ ,/g,',').trim();
async function toDataURL(u){try{const b=await (await fetch(u)).blob();return await new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result);f.onerror=()=>r(u);f.readAsDataURL(b)})}catch(e){return u}}
async function research(q){q=q.trim();if(!q)return{err:'Type the name of a sea animal first 🙂'};if(BAD.test(q))return{err:'Let\'s look up sea animals only 🐠'};
 if(!navigator.onLine)return{err:'📡 No internet right now. Try again when the iPad is online!'};
 try{const sj=await (await fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=6&srsearch='+encodeURIComponent(q))).json();const hits=(sj.query&&sj.query.search)||[];
  for(const h of hits){const r=await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(h.title.replace(/ /g,'_')));if(!r.ok)continue;const p=await r.json();
   if(p.type==='disambiguation')continue;const txt=(p.description||'')+' '+(p.extract||'');if(!ANIMAL.test(txt)||BAD.test(p.description||''))continue;
   const sents=simplify(p.extract||'').split(/(?<=[.!?])\s+(?=[A-Z])/).map(s=>s.trim()).filter(s=>s.length>15&&s.length<220).slice(0,5);if(!sents.length)continue;
   const thumb=p.thumbnail?await toDataURL(p.thumbnail.source):'';return{ok:{id:'r_'+p.title.toLowerCase().replace(/[^a-z0-9]+/g,'_'),title:p.title,facts:sents,thumb,col:PAL[Math.abs([...p.title].reduce((a,c)=>a+c.charCodeAt(0),0))%PAL.length],url:(p.content_urls&&p.content_urls.desktop.page)||'',t:Date.now()}}}
  return{err:'🤔 We couldn\'t find a sea animal called "'+q+'". Try another name!'}}catch(e){return{err:'📡 Couldn\'t reach Wikipedia. Check the internet and try again.'}}}
$('rgo').onclick=async()=>{const q=$('rq').value;$('rmsg').textContent='🔎 Diving into Wikipedia…';$('rgo').disabled=true;const r=await research(q);$('rgo').disabled=false;
 if(r.err){$('rmsg').textContent=r.err;return}const f=r.ok;RES[f.id]=f;Res.put(f).catch(()=>{});refreshPick();renderColl();$('rmsg').textContent='✅ Added '+f.title+' to the collection!';spawn(f.id);};
$('rq').addEventListener('keydown',e=>{if(e.key==='Enter')$('rgo').click()});
// ---- Storage (separate DB) ----
const DB=new Promise((res,rej)=>{const r=indexedDB.open('ocean-creatures',1);r.onupgradeneeded=()=>{r.result.createObjectStore('selfies',{keyPath:'id'});r.result.createObjectStore('research',{keyPath:'id'})};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
const rq=r=>new Promise((a,b)=>{r.onsuccess=()=>a(r.result);r.onerror=()=>b(r.error)});
const mk=n=>{const st=async m=>(await DB).transaction(n,m).objectStore(n);return{async all(){return rq((await st('readonly')).getAll())},async put(s){return rq((await st('readwrite')).put(s))},async del(i){return rq((await st('readwrite')).delete(i))},async clear(){return rq((await st('readwrite')).clear())}}};
const Local=mk('selfies'),Res=mk('research');
// Pluggable sync: window.OCEAN_SYNC={pull,push,clear,subscribe}
const Sync=window.OCEAN_SYNC||null;async function trySync(fn){if(!Sync||!navigator.onLine)return;try{return await fn(Sync)}catch(e){}}
async function loadAll(){try{(await Res.all()).forEach(r=>RES[r.id]=r)}catch(e){}refreshPick();let list=[];try{list=await Local.all()}catch(e){}const remote=await trySync(s=>s.pull());
 if(remote)for(const r of remote)if(!list.some(l=>l.id===r.id)){list.push(r);Local.put(r).catch(()=>{})}list.sort((a,b)=>a.t-b.t);list.slice(0,-MAX_SELFIES).forEach(s=>Local.del(s.id).catch(()=>{}));list.slice(-MAX_SELFIES).forEach(spawnSelfie)}
// ---- Camera + creature picker ----
let av='mermaid',col=null;
function renderPicker(){const g=$('avgrid');g.innerHTML='';[...AVKEYS,...Object.keys(RES)].forEach(k=>{const b=document.createElement('button');b.className='tile'+(k===av?' on':'');const isR=!!RES[k];
 b.innerHTML=`<div class="ta">${isR?avSVG('generic',RES[k].col):avSVG(k)}</div><div>${esc(isR?RES[k].title:AV[k].n)}</div>`;b.onclick=()=>{av=k;col=null;renderPicker()};g.appendChild(b)});
 const base=RES[av]?RES[av].col:AV[av].d,sw=$('cols');sw.innerHTML='';[base,...PAL.filter(p=>p!==base)].forEach(c=>{const b=document.createElement('button');b.className='sw'+((col||base)===c?' on':'');b.style.background=c;b.setAttribute('aria-label','Colour');b.onclick=()=>{col=c;renderPicker()};sw.appendChild(b)})}
let stream=null;const vid=$('vid'),prev=$('prev');
function camState(st,msg){$('camv').style.display=st==='live'?'':'none';$('camp').style.display=st==='prev'?'':'none';$('camerr').style.display=st==='err'?'':'none';if(msg)$('camerr').textContent=msg}
$('swim').onclick=async()=>{$('cam').classList.add('on');camState('live');
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){camState('err','😢 This device can\'t use the camera here. You can still explore the ocean!');return}
 try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:640},height:{ideal:640}},audio:false});vid.srcObject=stream;await vid.play().catch(()=>{})}
 catch(e){camState('err','😢 We couldn\'t open the camera. Ask a grown-up to allow camera access in Settings › Safari › Camera. You can still explore the ocean!')}};
function stopCam(){if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}}
$('camx').onclick=()=>{stopCam();$('cam').classList.remove('on')};
$('shoot').onclick=()=>{const v=vid,s=Math.min(v.videoWidth,v.videoHeight);if(!s)return toast('Camera is waking up… try again!');const g=prev.getContext('2d');
 g.save();g.clearRect(0,0,240,240);g.beginPath();g.arc(120,120,120,0,7);g.clip();g.translate(240,0);g.scale(-1,1);g.drawImage(v,(v.videoWidth-s)/2,(v.videoHeight-s)/2,s,s,0,0,240,240);g.restore();renderPicker();camState('prev')};
$('retake').onclick=()=>camState('live');
$('join').onclick=()=>{const isR=!!RES[av];const s={id:Date.now().toString(36)+Math.random().toString(36).slice(2,7),t:Date.now(),name:$('nm').value.trim().slice(0,14),img:prev.toDataURL('image/jpeg',.7),av:isR?'generic':av,col:col||(isR?RES[av].col:AV[av].d),rtitle:isR?RES[av].title:''};
 Local.put(s).catch(()=>{});trySync(x=>x.push(s));stopCam();$('cam').classList.remove('on');$('nm').value='';const t=spawnSelfie(s);if(t){t.el.classList.add('hl');setTimeout(()=>t.el.classList.remove('hl'),4000)}toast('🌊 Welcome to the ocean!')};
// ---- Teacher ----
$('tchr').onclick=()=>{$('pin').value='';$('tov').classList.add('on')};$('tx').onclick=()=>$('tov').classList.remove('on');
$('clr').onclick=async()=>{if($('pin').value!==TEACHER_PIN)return toast('Wrong PIN');await Local.clear().catch(()=>{});trySync(s=>s.clear());things.filter(t=>t.selfie).forEach(kill);refreshSel();$('tov').classList.remove('on');toast('All selfies cleared')};
$('clrr').onclick=async()=>{if($('pin').value!==TEACHER_PIN)return toast('Wrong PIN');await Res.clear().catch(()=>{});things.filter(t=>RES[t.type]).forEach(kill);for(const k in RES)delete RES[k];refreshPick();refreshSel();$('tov').classList.remove('on');toast('Researched fish cleared')};
// ---- Snapshot ----
const imgOf=src=>new Promise(r=>{if(!src)return r(null);const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src});
$('snap').onclick=async()=>{const cv=document.createElement('canvas'),d=Math.min(2,devicePixelRatio||1);cv.width=W*d;cv.height=H*d;const g=cv.getContext('2d');g.scale(d,d);
 const gr=g.createLinearGradient(0,0,0,H);[[0,'#48cae4'],[.3,'#0096c7'],[.6,'#0077b6'],[1,'#023e8a']].forEach(([o,c])=>gr.addColorStop(o,c));g.fillStyle=gr;g.fillRect(0,0,W,H);g.fillStyle='#f6d58e';g.fillRect(0,H*.87,W,H*.13);
 for(const t of things){const svg=t.body?t.body.innerHTML:t.el.innerHTML,i=await imgOf('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg));if(!i)continue;g.save();g.translate(t.x+t.w/2,t.y+t.h/2);
  const fl=t.av?(t.flipped?-1:1):(/starfish|crab|jellyfish|octopus/.test(t.type)?1:t.dir);g.save();g.scale(fl,1);g.drawImage(i,-t.w/2,-t.h/2,t.w,t.h);g.restore();
  if(t.av){const a=AV[t.av],vb=a.vb,[cx,cy,r]=a.f,sx=t.w/vb[0],X=((t.flipped?(vb[0]-(cx-(vb[2]||0))):(cx-(vb[2]||0)))*sx)-t.w/2,Y=(cy-(vb[3]||0))*sx-t.h/2,R=r*sx,f=await imgOf(t.selfie?t.selfie.img:RES[t.type]?.thumb);
   if(f){g.save();g.beginPath();g.arc(X,Y,R,0,7);g.clip();g.drawImage(f,X-R,Y-R,2*R,2*R);g.restore();g.strokeStyle='#ffd60a';g.lineWidth=3;g.beginPath();g.arc(X,Y,R,0,7);g.stroke()}
   if(t.selfie&&t.selfie.name){g.font='bold 16px sans-serif';g.fillStyle='#fff';g.textAlign='center';g.fillText(t.selfie.name,0,t.h/2+18)}}g.restore()}
 g.font='bold 34px sans-serif';g.fillStyle='#fff';g.textAlign='center';g.fillText("Yusra's Diorama",W/2,44);g.font='20px sans-serif';g.fillText('Teacher: Ms. Wendy',W/2,72);
 cv.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='yusras-creatures-'+Date.now()+'.png';document.body.appendChild(a);a.click();a.remove();toast('📸 Snapshot saved!')},'image/png')};
// ---- Start ----
DEFAULT.forEach(k=>spawn(k));loadAll();refreshPick();
window.__ocean={things,spawnSelfie,research,RES};
if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{});
