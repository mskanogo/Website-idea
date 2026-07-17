/* ============================================================
   ICONS — tiny inline SVG set, injected wherever data-icon appears
   ============================================================ */
const ICONS = {
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M6 10l6-6 6 6"/><path d="M4 18v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.8-4 5-6 8-6s6.2 2 8 6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c1.3-3.2 3.8-5 7-5s5.7 1.8 7 5"/><path d="M16 5.5a3.5 3.5 0 0 1 0 7"/><path d="M17.5 15c2.6.4 4 1.9 4.9 5"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  'user-plus': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>'
};
document.querySelectorAll('[data-icon]').forEach(el => {
  el.innerHTML = ICONS[el.getAttribute('data-icon')] || '';
});
// stamp the logo template into both logo slots
const logoMarkup = document.getElementById('logo-tpl').innerHTML;
document.getElementById('auth-logo').innerHTML = logoMarkup;
document.querySelector('.sidebar-top .mark').innerHTML = logoMarkup;

/* ============================================================
   TOAST
   ============================================================ */
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ============================================================
   AUTH SCREEN
   ============================================================ */
const authTabs = document.querySelectorAll('.auth-tab');
function setAuthPanel(name){
  authTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.toggle('active', f.dataset.panel === name));
  document.querySelectorAll('[data-show-when]').forEach(el => el.classList.toggle('hidden', el.dataset.showWhen !== name));
}
authTabs.forEach(tab => tab.addEventListener('click', () => setAuthPanel(tab.dataset.tab)));
document.querySelectorAll('[data-goto]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault(); setAuthPanel(a.dataset.goto);
}));

// verification method toggle
document.querySelectorAll('.verify-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.verify-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.verify-panel').forEach(p => p.classList.toggle('active', p.dataset.verifyPanel === btn.dataset.verify));
  });
});

// fake document upload
const uploadDrop = document.getElementById('upload-drop');
uploadDrop.addEventListener('click', () => document.getElementById('signup-doc').click());
document.getElementById('signup-doc').addEventListener('change', e => {
  if(e.target.files[0]){
    document.getElementById('upload-label').textContent = e.target.files[0].name;
    uploadDrop.classList.add('has-file');
  }
});

// login / signup submit -> enter app
document.getElementById('login-form').addEventListener('submit', e => { e.preventDefault(); enterApp(); });
document.getElementById('signup-form').addEventListener('submit', e => {
  e.preventDefault();
  toast('Account created — verifying your student status…');
  setTimeout(enterApp, 900);
});
function enterApp(){
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('app-shell').classList.remove('hidden');
}
document.getElementById('logout-btn').addEventListener('click', () => {
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('auth-screen').classList.remove('hidden');
});

/* ============================================================
   NAV ROUTING
   ============================================================ */
document.querySelectorAll('.nav-btn[data-view]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn[data-view]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + btn.dataset.view).classList.add('active');
  });
});
document.getElementById('profile-message-btn').addEventListener('click', () => {
  document.querySelector('.nav-btn[data-view="messages"]').click();
});

/* ============================================================
   MOCK DATA
   ============================================================ */
const people = [
  { name:'Kwame Boateng', meta:'Economics · Year 3', teach:['Excel modeling','Public speaking'], learn:['Chess'], rating:4.9, initials:'KB' },
  { name:'Lin Wei', meta:'Physics · Year 2', teach:['Calculus I','Piano'], learn:['Mandarin tutoring exchange'], rating:4.7, initials:'LW' },
  { name:'Sofia Marchetti', meta:'Art History · Year 4', teach:['Watercolor painting','Italian'], learn:['Photography'], rating:5.0, initials:'SM' },
  { name:'Noah Fischer', meta:'Computer Science · Year 1', teach:['Web development'], learn:['Guitar basics','French'], rating:4.4, initials:'NF' },
  { name:'Aïcha Ndiaye', meta:'Biology · Year 3', teach:['Organic chemistry'], learn:['Salsa dancing'], rating:4.8, initials:'AN' },
  { name:'Marco Silva', meta:'Music · Year 2', teach:['Guitar basics','Music theory'], learn:['Calculus I'], rating:4.6, initials:'MS' },
];

const reviews = [
  { name:'Kwame Boateng', stars:5, text:'Amara explained recursion in a way that finally clicked. Patient and clear.', date:'2 weeks ago', initials:'KB' },
  { name:'Sofia Marchetti', stars:5, text:'Great guitar session — went at my pace and gave me a practice plan.', date:'1 month ago', initials:'SM' },
  { name:'Noah Fischer', stars:4, text:'Really helpful for my calculus midterm prep. Ran a little over time.', date:'1 month ago', initials:'NF' },
];

const conversations = [
  { id:1, name:'Kwame Boateng', initials:'KB', preview:'See you Thursday at 4!', group:false,
    msgs:[{me:false,text:'Hey! Are we still on for the Excel session Thursday?'},{me:true,text:'Yes! 4pm works great.'},{me:false,text:'See you Thursday at 4!'}] },
  { id:2, name:'Study group: Calc I', initials:'C1', preview:'Lin: bring your notes on integrals', group:true,
    msgs:[{me:false,text:'Lin: bring your notes on integrals'},{me:true,text:'Will do, see everyone at 6'}] },
  { id:3, name:'Sofia Marchetti', initials:'SM', preview:'Thank you for the review!', group:false,
    msgs:[{me:false,text:'Thanks again for teaching me watercolor basics'},{me:true,text:'Anytime! You picked it up fast.'},{me:false,text:'Thank you for the review!'}] },
];

const sessionsData = {
  upcoming: [
    { skill:'Excel modeling with Kwame Boateng', meta:'Thu, Jul 17 · 4:00 PM', status:'Approved' },
    { skill:'Guitar basics with Marco Silva', meta:'Fri, Jul 18 · 2:00 PM', status:'Approved' },
  ],
  pending: [
    { skill:'Watercolor painting with Sofia Marchetti', meta:'Requested for Jul 20 · 1:00 PM', status:'Pending' },
  ],
  completed: [
    { skill:'Calculus I with Lin Wei', meta:'Completed Jul 5', status:'Completed', reviewed:false },
    { skill:'Public speaking with Kwame Boateng', meta:'Completed Jun 28', status:'Completed', reviewed:true },
  ],
  declined: [
    { skill:'Chess with Noah Fischer', meta:'Declined Jun 20', status:'Declined' },
  ],
};

const notifications = [
  { icon:'calendar', text:'Kwame Boateng requested an Excel modeling session for Thu, Jul 17 at 4:00 PM.', time:'2 hours ago', unread:true, action:'request' },
  { icon:'bell', text:'Reminder: your guitar session with Marco Silva starts tomorrow at 2:00 PM.', time:'5 hours ago', unread:true },
  { icon:'message', text:'Sofia Marchetti sent you a new message.', time:'1 day ago', unread:true },
  { icon:'calendar', text:'Your session with Lin Wei was marked completed — leave a review to award credits.', time:'2 days ago', unread:false },
];

const groupSessions = [
  { topic:'Intro to Watercolor', teacher:'Sofia Marchetti', time:'Sat, Jul 19 · 11:00 AM', seats:3, max:5 },
  { topic:'Calculus I study group', teacher:'Lin Wei', time:'Wed, Jul 16 · 6:00 PM', seats:5, max:5 },
  { topic:'Guitar circle for beginners', teacher:'Marco Silva', time:'Sun, Jul 20 · 3:00 PM', seats:1, max:5 },
  { topic:'French conversation table', teacher:'Noah Fischer', time:'Fri, Jul 18 · 5:00 PM', seats:2, max:5 },
];

/* ============================================================
   PROFILE — chips + avatar + reviews
   ============================================================ */
document.querySelectorAll('.chip-input').forEach(group => {
  const input = group.querySelector('input');
  input.addEventListener('keydown', e => {
    if(e.key === 'Enter' && input.value.trim()){
      e.preventDefault();
      const chip = document.createElement('span');
      chip.className = 'chip ' + (group.dataset.chipGroup === 'teach' ? 'chip-teal' : 'chip-steel');
      chip.innerHTML = `${input.value.trim()} <button data-remove>×</button>`;
      group.insertBefore(chip, input);
      input.value = '';
    }
  });
  group.addEventListener('click', e => {
    if(e.target.matches('[data-remove]')) e.target.closest('.chip').remove();
  });
});

document.getElementById('avatar-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('profile-avatar').innerHTML = `<img src="${ev.target.result}" alt="">`;
  };
  reader.readAsDataURL(file);
});

function renderReviews(){
  document.getElementById('reviews-list').innerHTML = reviews.map(r => `
    <div class="review-item">
      <div class="avatar avatar-sm">${r.initials}</div>
      <div class="review-body">
        <div class="review-top">
          <span class="review-name">${r.name}</span>
          <span class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</span>
        </div>
        <p class="review-text">${r.text}</p>
        <p class="review-date">${r.date}</p>
      </div>
    </div>`).join('');
}
renderReviews();

/* ============================================================
   SEARCH
   ============================================================ */
let activeFilter = 'all';
function renderResults(query=''){
  const q = query.toLowerCase();
  let list = people.filter(p => {
    const text = (p.name + ' ' + p.teach.join(' ') + ' ' + p.learn.join(' ')).toLowerCase();
    return text.includes(q);
  });
  if(activeFilter === 'top') list = list.filter(p => p.rating >= 4.7);
  document.getElementById('results-grid').innerHTML = list.map(p => `
    <div class="result-card">
      <div class="result-top">
        <div class="avatar avatar-md">${p.initials}</div>
        <div>
          <div class="result-name">${p.name}</div>
          <div class="result-meta">${p.meta} · ★ ${p.rating}</div>
        </div>
      </div>
      <div class="result-tags">
        ${p.teach.map(s => `<span class="tag">Teaches ${s}</span>`).join('')}
        ${activeFilter !== 'teach' ? p.learn.map(s => `<span class="tag" style="background:var(--teal);color:#0F3A30">Wants ${s}</span>`).join('') : ''}
      </div>
      <div class="result-actions">
        <button class="btn btn-secondary">View profile</button>
        <button class="btn btn-primary">Message</button>
      </div>
    </div>`).join('') || `<p class="muted">No one matches that search yet.</p>`;
}
renderResults();
document.getElementById('search-input').addEventListener('input', e => renderResults(e.target.value));
document.querySelectorAll('#filter-row .filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#filter-row .filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    renderResults(document.getElementById('search-input').value);
  });
});

/* ============================================================
   MESSAGES
   ============================================================ */
let activeConvId = conversations[0].id;
function renderConvList(){
  document.getElementById('conv-items').innerHTML = conversations.map(c => `
    <div class="conv-item ${c.id === activeConvId ? 'active' : ''}" data-conv="${c.id}">
      <div class="avatar avatar-md">${c.initials}</div>
      <div class="conv-info">
        <div class="conv-name">${c.name}${c.group ? '<span class="group-icon-badge">GROUP</span>' : ''}</div>
        <div class="conv-preview">${c.preview}</div>
      </div>
    </div>`).join('');
  document.querySelectorAll('.conv-item').forEach(el => el.addEventListener('click', () => {
    activeConvId = Number(el.dataset.conv);
    renderConvList(); renderChat();
  }));
}
function renderChat(){
  const c = conversations.find(x => x.id === activeConvId);
  document.getElementById('chat-header').innerHTML = `<div class="avatar avatar-sm">${c.initials}</div><span>${c.name}</span>`;
  document.getElementById('chat-body').innerHTML = c.msgs.map(m => `<div class="msg-bubble ${m.me ? 'msg-me' : 'msg-them'}">${m.text}</div>`).join('');
  const body = document.getElementById('chat-body');
  body.scrollTop = body.scrollHeight;
}
document.getElementById('chat-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  if(!input.value.trim()) return;
  const c = conversations.find(x => x.id === activeConvId);
  c.msgs.push({ me:true, text: input.value.trim() });
  c.preview = 'You: ' + input.value.trim();
  input.value = '';
  renderConvList(); renderChat();
});
document.getElementById('new-group-btn').addEventListener('click', () => {
  toast('Pick two or more people from Search to start a group chat.');
});
renderConvList(); renderChat();

/* ============================================================
   SESSIONS
   ============================================================ */
let currentSessionTab = 'upcoming';
function renderSessions(){
  const list = sessionsData[currentSessionTab];
  document.getElementById('sessions-list').innerHTML = list.map((s, i) => {
    let actions = '';
    if(currentSessionTab === 'upcoming') actions = `<button class="btn btn-secondary">Message</button><button class="btn btn-secondary">Cancel</button>`;
    if(currentSessionTab === 'pending') actions = `<button class="btn btn-primary">Approve</button><button class="btn btn-secondary">Decline</button>`;
    if(currentSessionTab === 'completed') actions = s.reviewed
      ? `<span class="muted">Reviewed ✓</span>`
      : `<button class="btn btn-primary" data-review-idx="${i}">Leave review</button>`;
    return `
      <div class="session-card">
        <div class="session-info">
          <div class="session-skill">${s.skill}</div>
          <div class="session-meta">${s.meta}</div>
        </div>
        <span class="status-badge status-${s.status.toLowerCase()}">${s.status}</span>
        <div class="session-actions">${actions}</div>
      </div>`;
  }).join('') || `<p class="muted">Nothing here yet.</p>`;

  document.querySelectorAll('[data-review-idx]').forEach(btn => {
    btn.addEventListener('click', () => openReviewModal(list[Number(btn.dataset.reviewIdx)]));
  });
}
document.querySelectorAll('[data-session-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-session-tab]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSessionTab = btn.dataset.sessionTab;
    renderSessions();
  });
});
renderSessions();

/* review modal */
let selectedStars = 0;
let reviewTargetSession = null;
function openReviewModal(session){
  reviewTargetSession = session;
  const teacher = session.skill.split(' with ')[1] || 'your partner';
  document.getElementById('review-modal-sub').textContent = `How was your session with ${teacher}?`;
  selectedStars = 0;
  document.querySelectorAll('#star-picker button').forEach(b => b.classList.remove('selected'));
  document.getElementById('review-text').value = '';
  document.getElementById('review-modal').classList.add('active');
}
document.querySelectorAll('#star-picker button').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedStars = Number(btn.dataset.star);
    document.querySelectorAll('#star-picker button').forEach(b => b.classList.toggle('selected', Number(b.dataset.star) <= selectedStars));
  });
});
document.getElementById('submit-review-btn').addEventListener('click', () => {
  if(!selectedStars){ toast('Pick a star rating first'); return; }
  if(reviewTargetSession) reviewTargetSession.reviewed = true;
  closeModals();
  renderSessions();
  toast(`Review submitted — ${selectedStars} Ubuntu Credits awarded!`);
});

/* ============================================================
   NOTIFICATIONS
   ============================================================ */
function renderNotifications(){
  document.getElementById('notif-list').innerHTML = notifications.map((n, i) => `
    <div class="notif-item ${n.unread ? 'unread' : ''}">
      <div class="notif-icon"><i data-icon="${n.icon}"></i></div>
      <div class="notif-body">
        <p class="notif-text">${n.text}</p>
        <p class="notif-time">${n.time}</p>
        ${n.action === 'request' ? `<div class="notif-actions"><button class="btn btn-primary" data-approve="${i}">Approve</button><button class="btn btn-secondary" data-decline="${i}">Decline</button></div>` : ''}
      </div>
    </div>`).join('');
  document.querySelectorAll('#notif-list [data-icon]').forEach(el => el.innerHTML = ICONS[el.getAttribute('data-icon')] || '');
  updateNotifBadge();
}
function updateNotifBadge(){
  const count = notifications.filter(n => n.unread).length;
  const badge = document.getElementById('notif-badge');
  badge.textContent = count;
  badge.style.display = count ? '' : 'none';
}
document.getElementById('mark-all-read').addEventListener('click', () => {
  notifications.forEach(n => n.unread = false);
  renderNotifications();
});
document.getElementById('notif-list').addEventListener('click', e => {
  if(e.target.matches('[data-approve]')){ toast('Session approved — added to your upcoming sessions.'); e.target.closest('.notif-item').classList.remove('unread'); }
  if(e.target.matches('[data-decline]')){ toast('Session declined.'); e.target.closest('.notif-item').classList.remove('unread'); }
});
renderNotifications();

/* ============================================================
   COMMUNITY
   ============================================================ */
function renderCommunity(){
  document.getElementById('community-grid').innerHTML = groupSessions.map((g, i) => {
    const full = g.seats >= g.max;
    return `
    <div class="gs-card">
      <div class="gs-top">
        <div>
          <div class="gs-topic">${g.topic}</div>
          <div class="gs-teacher">Hosted by ${g.teacher}</div>
        </div>
        <button class="btn-icon gs-chat-icon" data-gs-chat="${i}" title="Group chat"><i data-icon="message"></i></button>
      </div>
      <div class="gs-time"><i data-icon="calendar"></i> ${g.time}</div>
      <div class="gs-seats">${g.seats} / ${g.max} joined</div>
      <div class="seats-bar"><div class="seats-fill" style="width:${(g.seats/g.max)*100}%"></div></div>
      <div class="gs-actions">
        <button class="btn ${full ? 'btn-secondary' : 'btn-primary'}" data-gs-join="${i}" ${full ? 'disabled' : ''}>${full ? 'Full' : 'Join session'}</button>
      </div>
    </div>`;
  }).join('');
  document.querySelectorAll('#community-grid [data-icon]').forEach(el => el.innerHTML = ICONS[el.getAttribute('data-icon')] || '');
  document.querySelectorAll('[data-gs-join]').forEach(btn => btn.addEventListener('click', () => {
    const g = groupSessions[Number(btn.dataset.gsJoin)];
    if(g.seats < g.max){
      g.seats++;
      toast(`You joined "${g.topic}" — added to the group chat.`);
      renderCommunity();
    }
  }));
  document.querySelectorAll('[data-gs-chat]').forEach(btn => btn.addEventListener('click', () => {
    document.querySelector('.nav-btn[data-view="messages"]').click();
  }));
}
renderCommunity();

document.getElementById('create-group-session-btn').addEventListener('click', () => {
  document.getElementById('group-session-modal').classList.add('active');
});
document.getElementById('publish-group-session').addEventListener('click', () => {
  const topic = document.getElementById('gs-topic').value.trim();
  const time = document.getElementById('gs-time').value;
  if(!topic || !time){ toast('Add a topic and time slot first'); return; }
  groupSessions.unshift({ topic, teacher:'You', time: new Date(time).toLocaleString([], {weekday:'short', month:'short', day:'numeric', hour:'numeric', minute:'2-digit'}), seats:1, max:5 });
  document.getElementById('gs-topic').value = '';
  document.getElementById('gs-time').value = '';
  closeModals();
  renderCommunity();
  toast('Group session published!');
});

/* ============================================================
   MODAL HELPERS
   ============================================================ */
function closeModals(){ document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active')); }
document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', closeModals));
document.querySelectorAll('.modal-overlay').forEach(overlay => overlay.addEventListener('click', e => { if(e.target === overlay) closeModals(); }));