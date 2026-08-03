const app = document.querySelector('#app');

const state = {
  screen: location.hash.slice(1) || 'instagram',
  history: [],
  email: 'youremail@gmail.com',
  duration: '',
  infoIndex: 0,
  sharingNoticeOpen: false,
  summaryName: '',
  summarySlide: 0,
};

const routes = new Set(['instagram','landing','info','consent','prepare','signin','sharing','permissions','thanks','summary']);

const infoSections = [
  {
    title: 'Background',
    body: `<p>The University of York project supervisor, Dr David Zendle, invites you to take part in this research project.</p><p>Please read this information carefully. If anything is unclear or you would like more information, contact <a href="mailto:contact@sdds.ac.uk">contact@sdds.ac.uk</a> before completing the consent form.</p>`,
  },
  {
    title: 'What is the purpose of the study?',
    body: `<p>The study will create a databank that helps researchers explore links between digital activity, wellbeing, personality, attitudes, and health.</p><p>You will donate historical Google Play data, complete a questionnaire about yourself and your digital behaviour, and choose whether you may be contacted about future studies. The study takes about 15 minutes.</p>`,
  },
  {
    title: 'What data will be shared?',
    body: `<p>You will be asked to donate data from your own Google account:</p><ul><li>Google Play Apps List, including app names and installation dates</li><li>Google Play Games activity, such as achievements, leaderboards, and game statistics</li><li>Google Play Store purchases, including in-game purchases</li></ul><p>The study also collects questionnaire responses and demographic information. IP addresses are used only for operational auditing by the SDDS Technology team and are not shared with researchers.</p>`,
  },
  {
    title: 'For how long will my data be shared?',
    body: `<p>The supplied study information does not specify an overall data-retention or access period.</p><p>You can request withdrawal for up to two weeks after completing the study. After that, your data may have been anonymised and may no longer be removable.</p>`,
  },
  {
    title: 'How will my data be protected?',
    body: `<p>Personal data is stored in secure cloud systems accessible only to the University of York project team. Sensitive and identifying details are removed where possible through data minimisation.</p><p>Raw donated data stays under University control in a secure Trusted Research Environment. Approved researchers can run analyses there but cannot save or transfer the raw data to their own devices.</p>`,
  },
  {
    title: 'Why have I been invited to take part?',
    body: `<p>You have been invited because you live in the UK, are aged 18 or older, and have a Google account that you have used to access Google Play.</p>`,
  },
  {
    title: 'Do I have to take part?',
    body: `<p>No. Participation is optional. If you take part, you will complete a consent form and can download this information sheet.</p><p>You can stop before completing the study by closing the screen. Closing the data donation platform after agreeing to share does not automatically withdraw your donation.</p>`,
  },
  {
    title: 'Can I change my mind?',
    body: `<p>Yes. You can withdraw during the study without giving a reason. After completing it, contact <a href="mailto:contact@sdds.ac.uk">contact@sdds.ac.uk</a> as soon as possible.</p><p>Withdrawal is available for up to two weeks. After that, your data may have been anonymised and may no longer be removable.</p>`,
  },
  {
    title: 'Will you share my data with 3rd parties?',
    body: `<p>Raw data will not be transferred to individual researchers or leave University of York control. Approved and ethically vetted researchers may analyse it inside a secure Trusted Research Environment under an “access, not sharing” approach.</p><p>Privacy-preserving aggregate datasets may be made more widely available. Where personal information could still be inferred, the data remains safeguarded and access requires ethical vetting.</p>`,
  },
  {
    title: 'Will you transfer my data internationally?',
    body: `<p>Secure personal data will not leave the Trusted Research Environment. Ethically vetted international researchers may access it remotely through a controlled system, while the University of York remains the data controller.</p><p>Privacy-preserving aggregate data may also be shared with vetted international researchers, who may become controllers for that aggregate data.</p>`,
  },
  {
    title: 'Who is responsible for my data?',
    body: `<p>The University of York is the data controller and remains responsible for the personal data used in this study. The University project team controls access, while the Smart Data Donation Service supports secure storage and access arrangements.</p>`,
  },
  {
    title: 'Will I be identified in any research outputs?',
    body: `<p>No. Your data may be used in presentations, scientific publications, and other written or verbal research outputs, but you will not be identifiable in or from those outputs.</p>`,
  },
  {
    title: 'Questions or concerns',
    body: `<p>Contact SDDS first at <a href="mailto:contact@sdds.ac.uk">contact@sdds.ac.uk</a>.</p><p>For questions to the chair of the Department of Psychology Ethics Committee, contact <a href="mailto:psyc529@york.ac.uk">psyc529@york.ac.uk</a>. If you remain dissatisfied, contact the University’s Acting Data Protection Officer at <a href="mailto:dataprotection@york.ac.uk">dataprotection@york.ac.uk</a>.</p>`,
  },
];

function brand(compact = false) {
  return `<div class="${compact ? 'brand-line' : 'site-header'}">
    <img class="york" src="assets/york-logo.png" alt="University of York" />
    <span class="divider"></span>
    <span class="sdds-brand"><img src="assets/sdds-mark.png" alt="" /><span>Smart Data<br/>Donation Service</span></span>
    ${compact ? '<span class="badge">RESEARCH STUDY</span>' : ''}
  </div>`;
}

function progress(step) {
  return `<div class="progress" aria-label="Step ${step} of 5">${[1,2,3,4,5].map(i => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>`;
}

function go(next, push = true) {
  if (!routes.has(next)) return;
  if (push && state.screen !== next) state.history.push(state.screen);
  state.screen = next;
  history.replaceState(null, '', `#${next}`);
  window.scrollTo({ top: 0, behavior: 'instant' });
  render();
}

function back() {
  go(state.history.pop() || 'landing', false);
}

function chrome(content, host = 'donate.sdds.ac.uk') {
  return `<main class="browser screen">
    <div class="browser-system"><span>9:41</span><span>● &nbsp; Wi-Fi &nbsp; 100%</span></div>
    <div class="browser-bar">
      <button class="chrome-home" data-action="browser-back" aria-label="Go back">‹</button>
      <div class="url"><b>🔒</b><span>${host}</span></div>
      <span class="tab-count">1</span><span aria-hidden="true">⋮</span>
    </div>
    <div class="webpage">${content}</div>
  </main>`;
}

function instagram() {
  return `<main class="instagram screen">
    <header class="ig-top"><span class="ig-word">Instagram</span><span class="ig-icons">♡ ◇</span></header>
    <div class="ig-author"><span class="avatar"><img src="assets/sdds-mark.png" alt="" /></span><span><strong>sddsuk</strong><small>Sponsored</small></span><span class="more">•••</span></div>
    <section class="ad">
      ${brand(true)}
      <h1>Do you play <span>games</span><br/>on your phone?</h1>
      <p class="ad-copy">Whether it is puzzles, strategy or a few minutes of casual play, your experience matters.<br/><br/>Your everyday play can help university research.</p>
      <img class="phone-game" src="assets/phone-game.png" alt="Mobile game artwork" />
      <div class="chips"><span class="chip">A few clicks for 5-min</span><span class="chip">Get your gaming summary</span></div>
      <button class="primary" data-action="landing"><span>See what’s involved</span><span>→</span></button>
    </section>
    <button class="learn" data-action="landing"><span>Learn more</span><span>›</span></button>
    <div class="ig-actions"><span>♡</span><span>○</span><span>⌁</span><span>▱</span></div>
    <p class="caption"><strong>sddsuk</strong> Data donation for a better society. Your gaming history can support independent university research.</p>
  </main>`;
}

function landing() {
  return chrome(`<section class="page">
    ${brand()}
    <h1>Turn your everyday mobile play into research</h1>
    <p class="lead">Donate a copy of your Google Play Games data to help University of York researchers better understand everyday mobile play.</p>
    <div class="cta-wrap"><button class="primary" data-action="info"><span>See what you will share</span><span>→</span></button></div>
    <p class="personal-note">and get <span class="marker-highlight">your personal gaming summary</span>!</p>
    <div class="cards">
      <div class="card"><span class="card-label">Am I eligible?</span><strong>Age 16-64<br/>Living in UK<br/>Plays Google Play Games</strong></div>
      <div class="card"><span class="card-label">Est. completion time</span><strong>5-10 min</strong></div>
      <div class="card"><span class="card-label">Researcher</span><strong>Dr David Zendle @ The University of York</strong></div>
      <div class="card"><span class="card-label">✓ Ethics</span><p>This project received ethics approval from the Ethics Committee in the Department of Psychology at the University of York.</p></div>
      <div class="card"><span class="card-label">Research updates</span><strong>You can choose whether to receive updates on the research findings.</strong></div>
    </div>
    <div class="powered landing-powered">Powered by Smart Data Donation Service <img src="assets/sdds-mark.png" alt=""/></div>
    ${progress(1)}
  </section>`);
}

function info() {
  return chrome(`<section class="page info-page">
    ${brand()}
    <div class="info-topline"><button class="back" data-action="back" aria-label="Back">←</button><button class="type-control" aria-label="Text size">Aa</button></div>
    <header class="info-intro"><h2>Participant Information</h2><p>Everything about the research study and how to share your data.</p></header>
    <p class="info-context">Mobile games are played by many different kinds of people, but research does not always capture this diversity. Your donated data could help researchers build a more accurate picture of everyday mobile play.</p>
    <section class="study-process" aria-labelledby="process-title">
      <h3 id="process-title">Secure and easy way to donate your data for research</h3>
      <div class="process-steps">
        ${[['STEP 1','Consent'],['STEP 2','Authenticate via Google'],['STEP 3','Receive a summary']].map((step,index)=>`<div class="process-step"><small>${step[0]}</small><span>${step[1]}</span>${index < 2 ? '<b aria-hidden="true">→</b>' : ''}</div>`).join('')}
      </div>
      <h3>Learn about security</h3>
      <div class="security-media"><img src="assets/security-video.png" alt="Illustration explaining secure mobile data donation"/></div>
    </section>
    <div class="accordion" aria-label="Participant information topics">
      ${infoSections.map((section,index)=>{
        const open = state.infoIndex === index;
        return `<section class="accordion-item ${open ? 'is-open' : ''}" id="info-item-${index}">
          <button class="accordion-trigger" data-action="info-toggle" data-index="${index}" aria-expanded="${open}" aria-controls="info-panel-${index}">
            <span>${index + 1}) ${section.title}</span><span class="chevron" aria-hidden="true">⌄</span>
          </button>
          <div class="accordion-panel" id="info-panel-${index}" ${open ? '' : 'hidden'}>${section.body}
            <div class="accordion-actions"><button class="secondary" data-action="info-skip">Skip to bottom</button><button class="info-next" data-action="info-next" data-index="${index}">${index === infoSections.length - 1 ? 'Finish reading' : 'Next section'}</button></div>
          </div>
        </section>`;
      }).join('')}
    </div>
    <div id="info-end" class="info-end">
      <div class="researcher-card"><span>Researcher Contact Details</span><strong>Dr David Zendle<br/>Department of Psychology, The University of York<br/>York, YO10 5DD<br/>E-mail: contact@sdds.ac.uk</strong></div>
      <p>It is important to be aware of the information provided by the Department of Psychology about the terms that apply to processing personal data. Please consult the <u>departmental privacy notice</u>.</p>
      <button class="secondary download-info" data-action="toast" data-message="Information sheet download started">Download full information sheet</button>
      <div class="powered">Powered by Smart Data Donation Service <img src="assets/sdds-mark.png" alt=""/></div>
    </div>
    <div class="info-footer-actions"><button class="text-button" data-action="back">I’m not ready yet</button><button class="primary" data-action="consent">Next: Consent <span>→</span></button></div>
    ${progress(2)}
  </section>`);
}

function consent() {
  const requiredChecks = [
    'I have read and understood the information above.',
    'If I asked any questions, I have had satisfactory answers to all of them. I will also tick this if I did not have any questions.',
    'I understand that I am free to withdraw from the study at any time until study completion without having to give a reason.',
    'I understand that if I would like to withdraw my data after completing the study, I can contact the study team at contact@sdds.ac.uk within two weeks. This may not be possible after my data has been anonymised.',
    'If I have questions or concerns, or would like to have my data deleted after completing the study, I know I can contact SDDS at contact@sdds.ac.uk.',
    'I am happy for my data to be accessed by others in a secure research environment.',
    'I am happy for my de-identified data to be shared with others for research and/or teaching purposes.',
    'I am happy for my data to be used in research outputs. I understand that I cannot be identified in these outputs.',
    'I accept the terms and conditions of this study and agree to take part.',
  ];
  const optionalChecks = [
    'I want to be notified about research updates.',
    'I am open to being contacted about future studies.',
  ];
  return chrome(`<section class="page consent-page">
    ${brand()}
    <div class="info-topline"><button class="back" data-action="back" aria-label="Back">←</button><button class="type-control" aria-label="Text size">Aa</button></div>
    <header class="consent-intro"><h2>Your Consent</h2><p>Please confirm each statement before continuing. Nothing is donated until you finish the Google authorization step.</p></header>
    <section class="before-consent">
      <h3>Before you agree</h3>
      <p>For this study, we will ask you to donate the following data:</p>
      <div class="data-summary">
        <strong>Your Google Play History</strong>
        <p>The things you have done on Google Play, including apps you have used or installed and in-app transactions you have made.</p>
        <p>Your Google Play data may contain:</p>
        <ul>
          <li><strong>Google Play Apps List:</strong> App names and installation dates.</li>
          <li><strong>Google Play Movies &amp; TV:</strong> Movies or TV shows purchased or rented through Google Play.</li>
          <li><strong>Google Play Games:</strong> Achievements, leaderboards, and other game statistics.</li>
          <li><strong>Google Play Store:</strong> Timestamped purchases, including in-game purchases.</li>
        </ul>
      </div>
      <p>Please donate data only from your own account.</p>
      <p>Company-held data can contain identifying details. We use secure cloud storage and data minimisation to remove sensitive or identifying information wherever possible.</p>
      <div class="consent-example">
        <button class="example-toggle" data-action="consent-example-toggle" aria-expanded="false" aria-controls="transaction-example"><span>View examples</span><span class="chevron" aria-hidden="true">⌄</span></button>
        <div class="consent-example-panel" id="transaction-example" hidden>
          <p>For example, this is a history of someone’s engagement with Google Play, including a list of transactions completed through Google Play:</p>
          <pre class="transaction-code">{
  "Transaction ID": "GPA.1376573261796795",
  "Description": "Artemis Spaceship Bridge Sim",
  "Status": "Complete",
  "Amount": "£1.93",
  "Date": "2013-10-04T17:08:00"
},
{
  "Transaction ID": "GPA.1366107515850887",
  "Description": "Broken Sword : Director's Cut",
  "Status": "Complete",
  "Amount": "£2.99",
  "Date": "2013-09-18T15:20:00"
},
{
  "Transaction ID": "GPA.1304616444949957",
  "Description": "Peppa Pig - Happy Mrs Chicken",
  "Status": "Complete",
  "Amount": "£1.99",
  "Date": "2013-09-18T15:00:00"
}</pre>
          <p>Each transaction includes its transaction ID, description, status, amount, and date. Google Play data also records information such as games installed on an Android device.</p>
          <p>Gaming researchers study questions such as how in-game loot boxes affect players. Transaction data can help researchers understand patterns of spending and their impact on society.</p>
        </div>
      </div>
    </section>
    <section class="declaration">
      <h3>Declaration of Consent</h3>
      <p>Please tick the boxes below to show your agreement.</p>
      <div class="consent-list">${requiredChecks.map((x,i)=>`<label class="check-row"><input type="checkbox" class="consent-check" value="${i}"/><span>${x}</span></label>`).join('')}</div>
      <h4>Optional</h4>
      <div class="consent-list optional-list">${optionalChecks.map((x,i)=>`<label class="check-row"><input type="checkbox" value="optional-${i}"/><span>${x}</span></label>`).join('')}</div>
    </section>
    <div class="powered">Powered by Smart Data Donation Service <img src="assets/sdds-mark.png" alt=""/></div>
    <div class="info-footer-actions"><button class="text-button" data-action="back">I’m not ready yet</button><button id="consent-next" class="primary" data-action="prepare" disabled>Next step <span>→</span></button></div>
    ${progress(3)}
  </section>`);
}

function prepare() {
  return chrome(`<section class="page donate-page">
    ${brand()}
    <div class="info-topline"><button class="back" data-action="back" aria-label="Back">←</button><button class="type-control" aria-label="Text size">Aa</button></div>
    <header class="donate-intro">
      <h2>Donate your<br/>Google Play Data</h2>
      <p>You will briefly leave this study website and sign in to Google. Google will show exactly what is being copied before you approve it.</p>
    </header>
    <div class="donation-benefits">
      <div class="donation-benefit"><img src="assets/data-safe-icon.svg" alt=""/><strong>Your data stays safe</strong></div>
      <div class="donation-benefit"><img src="assets/research-icon.svg" alt=""/><strong>Power real research</strong></div>
    </div>
    <section class="funder-strip" aria-label="Research partners">
      <p>Powered by Smart Data Donation Service</p>
      <div class="funder-logos">
        <img src="assets/ukri-logo.png" alt="UK Research and Innovation"/>
        <img src="assets/esrc-logo.png" alt="Economic and Social Research Council"/>
        <span class="research-uk"><img src="assets/sdds-mark.png" alt=""/><strong>Smart Data<br/>Research UK</strong></span>
      </div>
    </section>
    <p class="donation-explainer">When you click the button below, you’ll be securely connected to Google to donate Google Play data to support research.</p>
    <button class="google-donate" data-action="signin"><img src="assets/google-g.png" alt=""/><span>Donate Data via Google</span></button>
    ${progress(4)}
  </section>`);
}

function googleLogo() {
  return `<div class="google-logo" aria-label="Google"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></div>`;
}

function signin() {
  return chrome(`<section class="google">
    ${googleLogo()}
    <div class="google-card"><h1>Sign in</h1><p>to continue to Smart Data Donation Service</p><input id="email" class="field" type="email" autocomplete="email" value="${state.email}" aria-label="Email or phone"/><button class="g-link">Forgot email?</button><p>Before using this app, you can review the SDDS privacy policy and terms of service.</p><div class="google-actions"><button class="g-link">Create account</button><button class="g-button" data-action="sharing">Next</button></div></div>
  </section>`, 'accounts.google.com');
}

function sharing() {
  return chrome(`<section class="google sharing-copy">
    <img class="google-g-mark" src="assets/google-g.png" alt="Google"/>
    <h1>Share a copy of some of your data with Smart Data Donation Service</h1>
    <div class="account sharing-account"><span class="account-dot"></span><span>${state.email}</span></div>
    <section class="sharing-section">
      <h2>You’re in control</h2>
      <div class="sharing-point"><span class="sharing-icon">▣</span><div><strong>You choose what data, if any, to share</strong><p>Google will create a copy of the data that you choose.</p></div></div>
      <div class="sharing-point"><span class="sharing-icon">□</span><div><strong>You choose how long access lasts</strong><p>Share access to your data only once, or share access to your data and any changes that you make for 30 or 180 days.</p></div></div>
      <div class="sharing-point"><span class="sharing-icon">⟳</span><div><strong>You can renew or remove Smart Data Donation Service’s access to your data</strong><p>To make changes at any time, go to your <a href="#" data-action="noop">Google Account</a>.</p></div></div>
    </section>
    <section class="sharing-section">
      <h2>How it works</h2>
      <div class="sharing-point"><span class="sharing-icon">▣</span><div><strong>Share your data only once</strong><p>If you choose to share your data only once, Google will create a single, static copy of your data, and Smart Data Donation Service will be able to access and move this copy only one time.</p></div></div>
      <div class="sharing-point"><span class="sharing-icon">□</span><div><strong>Share for 30 or 180 days</strong><p>If you choose to share your data for 30 or 180 days, Smart Data Donation Service will be able to regularly access updated copies of your data during the time period that you choose. Google will create those copies upon request, and Smart Data Donation Service will move those copies during that time period.</p></div></div>
      <p>Google will send you an email before Smart Data Donation Service’s access expires. You’ll be able to renew their access if you want to. If you don’t renew their access, they’ll no longer be able to access or move copies of your data.</p>
      <p>As part of this process, Google will not delete any data from the Google services that you use.</p>
      <p>Learn more about <a href="#" data-action="noop">sharing a copy of your data</a>.</p>
    </section>
    <div class="google-actions sharing-actions"><button class="g-link" data-action="prepare">Cancel</button><button class="g-button dark" data-action="sharing-notice">Next</button></div>
    ${state.sharingNoticeOpen ? `<div class="google-dialog-backdrop" role="presentation">
      <section class="google-dialog" role="dialog" aria-modal="true" aria-labelledby="important-title">
        <h2 id="important-title">Important</h2>
        <div class="warning-line"><span aria-hidden="true">⚠</span><strong>You’re about to make important choices about sharing your data</strong></div>
        <p>Some of the data that you choose to share may be personal or sensitive. Review Smart Data Donation Service’s <a href="#" data-action="noop">privacy policy</a> so that you understand how your data will be used and protected, including things like whether your data may be sold to third parties. <a href="#" data-action="noop">Learn more about sharing your data</a>.</p>
        <p><strong>Once Smart Data Donation Service has a copy of your data, Smart Data Donation Service will be responsible for managing and protecting that copy, not Google.</strong></p>
        <div class="google-dialog-actions"><button class="g-link" data-action="sharing-notice-close">Cancel</button><button class="g-button dark" data-action="permissions">I understand</button></div>
      </section>
    </div>` : ''}
  </section>`, 'accounts.google.com');
}

function permissions() {
  return chrome(`<section class="google permissions">
    ${googleLogo()}
    <h1><span style="color:#1a73e8">Smart Data Donation Service</span> wants to access your Google Account</h1>
    <div class="account"><span class="account-dot"></span><span>${state.email}</span></div>
    <h3>This will allow Smart Data Donation Service to:</h3>
    <ul class="permission-list"><li>Move a copy of your Google Play activity</li><li>Move a copy of your Google Play Store subscriptions</li><li>Move a copy of your Google Play Store purchases</li><li>Move a copy of your Google Play Store app installations</li></ul>
    <h3>Select how long access can last</h3>
    ${[['once','Only once','Share a single, static copy of your data.'],['30','30 days','Share your data and changes for 30 days.'],['180','180 days','Share your data and changes for 180 days.']].map(x=>`<label class="radio-card"><input type="radio" name="duration" value="${x[0]}" ${state.duration===x[0]?'checked':''}/><span><strong>${x[1]}</strong><small>${x[2]}</small></span></label>`).join('')}
    <h3>Make sure that you trust Smart Data Donation Service</h3><p>Review the privacy policy and terms to understand how your data will be processed and protected.</p>
    <div class="google-actions"><button class="g-link" data-action="prepare">Cancel</button><button id="permissions-allow" class="g-button" data-action="thanks" ${state.duration ? '' : 'disabled'}>Allow</button></div>
  </section>`, 'accounts.google.com');
}

function thanks() {
  return chrome(`<section class="page thanks-page">
    ${brand()}
    <header class="thanks-intro">
      <h1>Thank you!<br/>We received your<br/>donated data.</h1>
      <p>A receipt of your data donation will be sent to you via Gmail.</p>
    </header>
    <section class="summary-setup" aria-labelledby="summary-setup-title">
      <h2 id="summary-setup-title">Now... take a peek at your gaming summary</h2>
      <div class="name-card">
        <strong>Playing from 2019-2026</strong>
        <label for="summary-name">This is a gaming summary for</label>
        <input id="summary-name" class="summary-name" type="text" maxlength="40" placeholder="Your name" value="${escapeHtml(state.summaryName)}" autocomplete="name"/>
      </div>
      <button id="create-summary" class="primary create-summary" data-action="summary" ${state.summaryName.trim() ? '' : 'disabled'}>Create Summary</button>
      <button class="text-button invite-friends" data-action="toast" data-message="Invite link copied">Invite friends</button>
    </section>
    ${progress(5)}
  </section>`);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
}

function summary() {
  const safeName = escapeHtml(state.summaryName.trim() || 'Player');
  const slides = [
    `<article class="story-card story-one"><span class="story-kicker">YOUR MOBILE PLAY STORY</span><p>Made for</p><h2>${safeName}</h2><div class="story-stat">2019</div><strong>Your play history starts here</strong></article>`,
    `<article class="story-card story-two"><span class="story-kicker">YOUR GAMING SNAPSHOT</span><p>${safeName}, your most active year was</p><div class="story-stat">2024</div><strong>Everyday play adds up</strong></article>`,
    `<article class="story-card story-three"><span class="story-kicker">THANKS FOR DONATING</span><div class="story-stat">347</div><strong>hours of play in your donated history</strong><p>Your data can help power independent research.</p></article>`,
  ];
  return chrome(`<section class="page personal-summary-page">
    <div class="summary-brand"><img src="assets/sdds-mark.png" alt=""/><strong>Smart Data<br/>Donation Service</strong></div>
    <p class="summary-copy">This summary was created from the data you donated. Together, donated gaming histories can help researchers understand how everyday play changes over time.</p>
    <section class="story-carousel" aria-label="Personal gaming summary stories">
      <div class="story-frame">${slides.map((slide, index) => `<div class="story-slide ${index === state.summarySlide ? 'is-active' : ''}" data-slide="${index}" ${index === state.summarySlide ? '' : 'hidden'}>${slide}</div>`).join('')}
        <button class="story-arrow previous" data-action="carousel-prev" aria-label="Previous story">‹</button>
        <button class="story-arrow next" data-action="carousel-next" aria-label="Next story">›</button>
      </div>
      <div class="story-dots" aria-label="Story position">${slides.map((_, index) => `<button class="story-dot ${index === state.summarySlide ? 'is-active' : ''}" data-action="carousel-slide" data-index="${index}" aria-label="Show story ${index + 1}" aria-current="${index === state.summarySlide ? 'true' : 'false'}"></button>`).join('')}</div>
    </section>
    <div class="summary-actions"><button class="secondary" data-action="toast" data-message="Story image download started">Download</button><button class="primary" data-action="toast" data-message="Instagram Story sharing opened">Share</button></div>
  </section>`);
}

const views = { instagram, landing, info, consent, prepare, signin, sharing, permissions, thanks, summary };

function render() {
  app.innerHTML = views[state.screen]();
  document.title = state.screen === 'instagram' ? 'Instagram | SDDS Study' : 'SDDS Data Donation';
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target || target.disabled) return;
  const action = target.dataset.action;
  if (action === 'back' || action === 'browser-back') return back();
  if (action === 'info-toggle') {
    const index = Number(target.dataset.index);
    state.infoIndex = state.infoIndex === index ? -1 : index;
    render();
    if (state.infoIndex >= 0) requestAnimationFrame(() => document.querySelector(`#info-item-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    return;
  }
  if (action === 'info-next') {
    const nextIndex = Number(target.dataset.index) + 1;
    if (nextIndex >= infoSections.length) {
      document.querySelector('#info-end')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      state.infoIndex = nextIndex;
      render();
      requestAnimationFrame(() => document.querySelector(`#info-item-${nextIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
    return;
  }
  if (action === 'info-skip') {
    document.querySelector('#info-end')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (action === 'consent-example-toggle') {
    const panel = document.querySelector('#transaction-example');
    const open = target.getAttribute('aria-expanded') === 'true';
    target.setAttribute('aria-expanded', String(!open));
    target.querySelector('span:first-child').textContent = open ? 'View examples' : 'Hide examples';
    panel.hidden = open;
    return;
  }
  if (action === 'toast') return showToast(target.dataset.message || (target.textContent.trim() === 'Share' ? 'Share sheet opened' : target.textContent.trim() === 'Download' ? 'Summary downloaded' : 'Invite link copied'));
  if (action === 'noop') {
    event.preventDefault();
    return;
  }
  if (action === 'sharing-notice') {
    state.sharingNoticeOpen = true;
    render();
    return;
  }
  if (action === 'sharing-notice-close') {
    state.sharingNoticeOpen = false;
    render();
    return;
  }
  if (action === 'carousel-prev' || action === 'carousel-next') {
    const totalSlides = 3;
    const direction = action === 'carousel-next' ? 1 : -1;
    state.summarySlide = (state.summarySlide + direction + totalSlides) % totalSlides;
    render();
    return;
  }
  if (action === 'carousel-slide') {
    state.summarySlide = Number(target.dataset.index);
    render();
    return;
  }
  if (action === 'sharing') {
    const email = document.querySelector('#email');
    if (email?.value) state.email = email.value;
  }
  if (action === 'permissions') state.sharingNoticeOpen = false;
  go(action);
});

document.addEventListener('change', (event) => {
  if (event.target.matches('.consent-check')) {
    const all = [...document.querySelectorAll('.consent-check')];
    document.querySelector('#consent-next').disabled = !all.every(x => x.checked);
  }
  if (event.target.matches('input[name="duration"]')) {
    state.duration = event.target.value;
    const allow = document.querySelector('#permissions-allow');
    if (allow) allow.disabled = false;
  }
});

document.addEventListener('input', (event) => {
  if (event.target.matches('#summary-name')) {
    state.summaryName = event.target.value;
    const createButton = document.querySelector('#create-summary');
    if (createButton) createButton.disabled = !state.summaryName.trim();
  }
});

function showToast(message) {
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2700);
}

window.addEventListener('hashchange', () => {
  const next = location.hash.slice(1);
  if (routes.has(next) && next !== state.screen) { state.screen = next; render(); }
});

render();
