const members=[
{id:'charlie',name:'Charlie',icon:'lawyer.png'},
{id:'jay',name:'Jay',icon:'journo.png'},
{id:'miner',name:'Miner',icon:'images2.png'},
{id:'jeff',name:'Jeff',icon:'images3.png'},
{id:'paul',name:'Paul',icon:'images4.png'},
{id:'michael',name:'Michael',icon:'images5.png'}
];
const books=[
{year:2022,member:'paul',title:'The Sentence',author:'Louise Erdrich',cover:'the_sentence.jpg'},
{year:2022,member:'jay',title:'The Lincoln Highway',author:'Amor Towles',cover:'amor-towles-lincoln-highway.jpg'},
{year:2022,member:'charlie',title:'The Splendid and the Vile',author:'Erik Larson',cover:'splendid.jpg'},
{year:2022,member:'michael',title:'The Passenger',author:'Ulrich Alexander Boschwitz',cover:'the_passenger.jpg'},
{year:2022,member:'miner',title:'House Made of Dawn',author:'N. Scott Momaday',cover:'house_of_dawn.jpg'},
{year:2022,member:'jeff',title:"The Marsh King's Daughter",author:'Karen Dionne',cover:'marsh_king.jpg'},
{year:2023,member:'paul',title:'An Immense World',author:'Ed Yong',cover:'immense.jpg'},
{year:2023,member:'jay',title:'Hell of a Book',author:'Jason Mott',cover:'hell.jpg'},
{year:2023,member:'charlie',title:'Slow Horses',author:'Mick Herron',cover:'slow_horses.jpg'},
{year:2023,member:'michael',title:'Cloudstreet',author:'Tim Winton',cover:'Cloud-street.jpg'},
{year:2023,member:'miner',title:'Demon Copperhead',author:'Barbara Kingsolver',cover:'demoncopperhead.jpg'},
{year:2023,member:'jeff',title:'The Wager',author:'David Grann',cover:'the_wager.jpg'},
{year:2024,member:'paul',title:'The Covenant of Water',author:'Abraham Verghese',cover:'covenant.jpg'},
{year:2024,member:'jay',title:'The Heaven & Earth Grocery Store',author:'James McBride',cover:'heaven.jpg'},
{year:2024,member:'charlie',title:"The Shepherd's Life",author:'James Rebanks',cover:'shepherd.jpg'},
{year:2024,member:'michael',title:'Boy Swallows Universe',author:'Trent Dalton',cover:'boy_swallows_universe.jpg'},
{year:2024,member:'miner',title:'True Grit',author:'Charles Portis',cover:'truegrit.jpg'},
{year:2024,member:'jeff',title:"Winter's Bone",author:'Daniel Woodrell',cover:'winters_bone.jpg'},
{year:2025,member:'paul',title:'The Wide Wide Sea',author:'Hampton Sides',cover:'widewide.jpg'},
{year:2025,member:'jay',title:'The River We Remember',author:'William Kent Krueger',cover:'River.jpg'},
{year:2025,member:'charlie',title:'A Good Life',author:'Robert Waldinger and Marc Schulz',cover:'goodlife.jpg'},
{year:2025,member:'michael',title:'The Demon of Unrest',author:'Erik Larson',cover:'unrest.jpg'},
{year:2025,member:'miner',title:'James',author:'Percival Everett',cover:'james.jpg'},
{year:2025,member:'jeff',title:'Say Nothing',author:'Patrick Radden Keefe',cover:'saynothing.jpg'},
{year:2026,member:'jay',title:'This Is Happiness',author:'Niall Williams',cover:'this_is_happiness.jpg'},
{year:2026,member:'michael',title:'Buckeye',author:'Patrick Ryan',cover:'buckeye.jpg'},
{year:2026,member:'paul',title:'Apeirogon',author:'Colum McCann',cover:'apeirogon.jpg'},
{year:2026,member:'charlie',title:'Lonesome Dove',author:'Larry McMurtry',cover:'lonesome.jpg'}
];
const yearNav=document.getElementById('yearNav'),memberGrid=document.getElementById('memberGrid'),bookGrid=document.getElementById('bookGrid'),resultsTitle=document.getElementById('resultsTitle'),resultsEyebrow=document.getElementById('resultsEyebrow'),emptyState=document.getElementById('emptyState');
let activeYear=null,activeMember=null;
function memberFor(id){return members.find(m=>m.id===id)}
function updateActive(){[...yearNav.children].forEach(b=>{const active=Number(b.textContent)===activeYear;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});[...memberGrid.children].forEach((b,i)=>{const active=members[i].id===activeMember;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))})}
function showBooks(selection){bookGrid.innerHTML='';emptyState.hidden=selection.length!==0;selection.forEach(book=>{const member=memberFor(book.member),card=document.createElement('article');card.className='book-card';card.innerHTML=`<div class="cover-wrap"><img class="book-cover" src="${book.cover}" alt="Cover of ${book.title}"></div><div class="book-info"><div class="book-year">${book.year}</div><h3 class="book-title">${book.title}</h3><p class="book-author">by ${book.author}</p><div class="chosen-by"><img src="${member.icon}" alt=""><span>Chosen by ${member.name}</span></div></div>`;const cover=card.querySelector('.book-cover');cover.addEventListener('error',()=>{const p=document.createElement('div');p.className='cover-placeholder';p.textContent=`Book cover image not found: ${book.cover}`;cover.replaceWith(p)},{once:true});const icon=card.querySelector('.chosen-by img');icon.addEventListener('error',()=>icon.hidden=true,{once:true});bookGrid.appendChild(card)})}
[2022,2023,2024,2025,2026].forEach(year=>{const b=document.createElement('button');b.type='button';b.className='year-button';b.textContent=year;b.setAttribute('aria-label',`Show book selections from ${year}`);b.addEventListener('click',()=>{activeYear=year;activeMember=null;updateActive();resultsTitle.textContent=`${year} Book Selections`;resultsEyebrow.textContent='Browse by year';showBooks(books.filter(book=>book.year===year));document.getElementById('results').scrollIntoView({behavior:'smooth'})});yearNav.appendChild(b)});
members.forEach(member=>{const b=document.createElement('button');b.type='button';b.className='member-card';b.setAttribute('aria-label',`Browse all book choices by ${member.name}`);b.innerHTML=`<img class="member-avatar" src="${member.icon}" alt="${member.name} icon"><span class="member-name">${member.name}</span><span class="member-hint">View book choices</span>`;b.querySelector('img').addEventListener('error',e=>e.currentTarget.hidden=true,{once:true});b.addEventListener('click',()=>{activeMember=member.id;activeYear=null;updateActive();resultsTitle.textContent=`${member.name}'s Book Choices`;resultsEyebrow.textContent='Browse by member';showBooks(books.filter(book=>book.member===member.id));document.getElementById('results').scrollIntoView({behavior:'smooth'})});memberGrid.appendChild(b)});
document.getElementById('showAll').addEventListener('click',()=>{activeYear=null;activeMember=null;updateActive();resultsTitle.textContent='Books Chosen by the Group';resultsEyebrow.textContent='Our reading history';showBooks([...books].sort((a,b)=>a.year-b.year))});
showBooks([...books].sort((a,b)=>a.year-b.year));
