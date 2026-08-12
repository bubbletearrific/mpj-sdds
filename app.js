const app = document.querySelector('#app');
const SUMMARY_STORY_COUNT = 7;

const state = {
  screen: location.hash.slice(1) || 'instagram',
  history: [],
  email: 'youremail@gmail.com',
  duration: '',
  infoIndex: 0,
  sharingNoticeOpen: false,
  landingImpactOpen: false,
  landingUpdatesOpen: false,
  landingEthicsOpen: false,
  summaryName: '',
  summarySlide: 0,
};

const routes = new Set(['instagram','bridge','landing','info','consent','prepare','signin','sharing','permissions','thanks','summary']);

const infoSections = [
  {
    title: 'Background',
    body: `<p>The University of York, project supervisor: Dr David Zendle, would like to invite you to take part in the following research project.</p><p>The study is designed to create a comprehensive databank that can help researchers explore the impact of digital activities on wellbeing and personality. Our goal is to generate a dataset that links the online platform use of individuals with information about their attitudes, views, traits, wellbeing, and health.</p><p>Before agreeing to take part, please read this information sheet carefully and let us know if anything is unclear or you would like further information. If you have any questions or want to discuss any aspect of the study, please contact us (<a href="mailto:contact@sdds.ac.uk">contact@sdds.ac.uk</a>) before completing the consent form.</p>`,
  },
  {
    title: 'What is the purpose of the study?',
    body: `<p>The study is designed to create a comprehensive databank that can help researchers explore the impact of digital activities on wellbeing and personality. Our goal is to generate a dataset that links the online platform use of individuals with information about their attitudes, views, traits, wellbeing, and health.</p>`,
  },
  {
    title: 'What data will be shared?',
    body: `<p>You will be asked to donate your historical Google Play data using our secure data donation platform.</p><p>Your Google Play data will contain:</p><ul><li><strong>Google Play Apps List:</strong> Information about apps you have installed from the Google Play Store. This usually includes the names of the apps and the dates you installed them.</li><li><strong>Google Play Games:</strong> Data related to your interactions with Google Play Games services, including achievements, leaderboard standings, and other game-related statistics.</li><li><strong>Google Play Store:</strong> A timestamped list of products that you have purchased from the Google Play Store, including in-game purchases.</li></ul><p>IP addresses will be collected for auditing purposes only. The SDDS Technology team will be the only group to have access to this data for standard operational IT purposes. At no point will IP addresses be shared with the researchers, or be incorporated into the dataset made available for researchers. We encourage you to read our terms of service and privacy policy before starting the study.</p><p>If you decide to donate data, this must be data from your own account and not anyone else's.</p>`,
  },
  {
    title: 'For how long will my data be shared?',
    body: `<p>You can choose how often SDDS receives a copy of your Google Play data:</p><ul><li><strong>Once</strong><br/>SDDS receives one copy when you donate. It will not collect updates later.</li><li><strong>Once, with updates for 30 days</strong><br/>SDDS receives one copy when you donate and can receive updated copies during the next 30 days.</li><li><strong>Once, with updates for 180 days</strong><br/>SDDS receives one copy when you donate and can receive updated copies during the next 180 days.</li></ul><p>Your choice controls how long updated data can be collected from Google. It does not describe how long the research team may retain data already donated.</p><p><strong>Changing your mind</strong><br/>You can ask us to delete your donated data for at least two weeks after we first collect it. After this period, we may have removed the information linking the data to you. If this has happened, we will no longer be able to identify and delete your individual data.</p>`,
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
    body: `<p>No, participation is optional. If you do decide to take part, you will be given the option to download a copy of this information sheet. You will be asked to complete a participant consent form. If you change your mind at any point during the study, you will be able to withdraw your participation without having to provide a reason.</p><p>You can withdraw at any time before study completion by closing the screen. Please note that closing the data donation platform once agreeing to share your data will not withdraw your donation. If you would like to withdraw your data after completing these steps, please contact us (<a href="mailto:contact@sdds.ac.uk">contact@sdds.ac.uk</a>).</p>`,
  },
  {
    title: 'Can I change my mind?',
    body: `<p>You can withdraw at any time before study completion by closing the screen. Please note that closing the data donation platform once agreeing to share your data will not withdraw your donation. If you would like to withdraw your data after completing these steps, please contact us (<a href="mailto:contact@sdds.ac.uk">contact@sdds.ac.uk</a>) with your Google Account as soon as possible.</p><p>Until two weeks after study completion, you can contact us (<a href="mailto:contact@sdds.ac.uk">contact@sdds.ac.uk</a>) with your Google Account to withdraw your data. We plan to retain Google Accounts until they are no longer necessary (e.g. for linking responses between this study and follow-up studies). However, after two weeks, your data may have been anonymised. If this is the case, we will not be able to remove your responses.</p>`,
  },
  {
    title: 'Will you share my data with 3rd parties?',
    body: `<p>We are collecting the following type of <strong>personal data</strong> (namely, data that could identify who you are): <strong>Google Play history and demographic information</strong>. The personal data collected will <strong>only be accessible to the project team at the University of York</strong>. These data will be stored in our <strong>secure cloud</strong> that can only be accessed by the project team.</p><p>It is important to note that the data held by a company sometimes contains <strong>identifying details about you</strong>. As such, the data you choose to donate from Google Play may contain personal data. For example, your Google Play data could contain games you have played, achievements you have unlocked, gameplay statistics. In addition to using secure cloud storage, we employ processes to <strong>remove sensitive and identifying details whenever possible</strong> to add an additional layer of security to it. One example of how we do this is filtering your data to remove these (a process called <strong>'data minimisation'</strong>).</p><p>Your data will <strong>never be shared with third party researchers</strong>, but it may be accessed by such parties. The SDDS operates via an <strong>'access not sharing' philosophy</strong>. This means that we place sensitive or personal data within a secure system, and allow third parties to run approved analyses over this data. <strong>Raw data</strong> - which refers to the unprocessed data you provide to us - will <strong>never be transferred to individual researchers or leave the control of the University of York</strong>. They will be stored in a <strong>'Trusted Research Environment' (TRE)</strong>: a secure space with high levels of security, and accessed from there. This TRE may be hosted by the University of York or by another UK institution, but the <strong>University of York will always remain the data controller</strong>. The Smart Data Donation Service will assure its security prior to storing data within it. Data will be archived within the <strong>Smart Data Donation Service at the University of York</strong>, a UK data service.</p><p>However, our research group is committed to <strong>open research practices</strong>, and to creating a large database that many other researchers can access. This dataset will include <strong>donated data, demographic information and survey responses</strong>. In order to preserve privacy and anonymity, we will only allow research teams access to our data within <strong>secure research environments</strong>. These are secure physical or digital environments which can only be accessed by <strong>approved researchers</strong>. This means that researchers can only access the data within a secure location, <strong>will not be able to save the data onto a device, and cannot transfer the data outside of the environment</strong>. These researchers will also need to undergo <strong>ethical vetting</strong>. This will include an application process with a number of stringent screenings, including official approval from an ethics committee at the applicant's institution for their intended use of the data.</p><p>We will prepare <strong>privacy preserving aggregates</strong> of our data for wider access. For example, a dataset could be created containing the URLs for all videos that have been watched by everyone in the cohort, the overall distributions of YouTube watch times or watch frequencies. Where personal data can be inferred from these datasets, they will be treated as <strong>safeguarded data</strong> where researchers will undergo the same ethical vetting process, but <strong>other universities will be the data controllers</strong> for the data. When this type of data is shared, it can be accessed by other people who might use it for other research questions that are not known to us. <strong>Please only take part in the study if you agree with this.</strong></p><p>In the unlikely event that we find indications of a <strong>risk of harm to yourself or others</strong> in your data, we <strong>may be obliged to share this information with others</strong>. Please see our <strong>Unanticipated Findings Policy</strong> for more information.</p>`,
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
    body: `<p>If you have any questions about this participant information sheet or concerns about how your data is being processed, please contact SDDS (<a href="mailto:contact@sdds.ac.uk">contact@sdds.ac.uk</a>) in the first instance. This project received ethics approval from the Ethics Committee in the Department of Psychology at the University of York. If you have any questions you would like to ask the chair of the ethics committee (currently Dr Angela de Bruin), please contact <a href="mailto:psyc529@york.ac.uk">psyc529@york.ac.uk</a>. If you are still dissatisfied, please contact the University's Acting Data Protection Officer at <a href="mailto:dataprotection@york.ac.uk">dataprotection@york.ac.uk</a>.</p><p><strong>Contact Details:</strong> Dr David Zendle Department of Psychology,<br/>The University of York, York, YO10 5DD<br/><strong>E-mail:</strong> <a href="mailto:contact@sdds.ac.uk">contact@sdds.ac.uk</a></p>`,
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
  go(state.history.pop() || 'bridge', false);
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
  return `<main class="ig-joint-screen screen">
    <article class="ig-joint-post" aria-labelledby="ig-joint-title">
      <img class="ig-joint-shell" src="assets/instagram-joint-shell.png" alt="" />

      <header class="ig-joint-author" aria-label="Joint Instagram advertisement by University of York and Smart Data Donation Service">
        <div class="ig-joint-avatars" aria-hidden="true">
          <img class="ig-york-avatar" src="assets/instagram-joint-york-avatar.png" alt="" />
          <span class="ig-sdds-avatar"><img src="assets/instagram-joint-sdds.png" alt="" /></span>
        </div>
        <div class="ig-joint-names">
          <strong>uniofyork</strong><img src="assets/instagram-verified.png" alt="Verified" />
          <span>and</span>
          <strong>sddsuk</strong><img src="assets/instagram-verified.png" alt="Verified" />
          <small>Ad</small>
        </div>
        <button type="button" class="ig-follow" aria-label="Follow University of York and SDDS">Follow</button>
        <span class="ig-more" aria-hidden="true">•••</span>
      </header>

      <section class="ig-joint-creative">
        <img class="ig-ad-accent" src="assets/instagram-ad-accent.svg" alt="" />
        <div class="ig-ad-brands" aria-label="University of York and Smart Data Donation Service">
          <span class="ig-york-logo"><img src="assets/instagram-joint-york.png" alt="University of York" /></span>
          <i aria-hidden="true"></i>
          <span class="ig-sdds-logo"><img src="assets/instagram-joint-sdds.png" alt="" /><strong>Smart Data<br/>Donation Service</strong></span>
        </div>
        <span class="ig-study-badge">RESEARCH STUDY</span>
        <h1 id="ig-joint-title">Do you play <span>games</span><br/>on your phone?</h1>
        <div class="ig-ad-copy">
          <p>Whether it is puzzles, strategy or a few minutes of casual play, your experience matters.</p>
          <p>Your everyday play can help university research.</p>
        </div>
        <img class="ig-ad-phone" src="assets/instagram-joint-phone.png" alt="A hand holding a phone displaying a colourful mobile game" />
        <div class="ig-ad-chips" aria-label="Study highlights">
          <span>A few clicks for 5-min</span>
          <span>Get your gaming summary: rankings, playtime, etc</span>
        </div>
      </section>

      <button type="button" class="ig-ad-learn" data-action="bridge"><span>Learn more</span><img src="assets/instagram-caret-right.svg" alt="" /></button>
      <div class="ig-joint-caption"><strong>uniofyork</strong><span>Data Donation for a better society</span><em>more</em></div>
    </article>
  </main>`;
}

function bridge() {
  return chrome(`<section class="bridge-page" aria-labelledby="bridge-title">
    <header class="york-site-header">
      <img src="assets/york-site-header.png" alt="University of York" />
    </header>
    <div class="bridge-content">
      <h1 id="bridge-title">Help gaming research <span>&amp; discover your Google Play story</span></h1>
      <div class="bridge-intro">
        <p>Join a University of York research study by securely donating a copy of your Google Play data. The process will take about 5 min.</p>
        <p>In return, you’ll receive a personalised gaming summary. ✨</p>
      </div>
      <div class="bridge-summary-strip" role="group" aria-label="Sample gaming summary stories">
        <img src="assets/story-1-v4-see.png" alt="Sample play story overview" />
        <img src="assets/story-2-v4-icons.png" alt="Sample top games story" />
        <img src="assets/story-4-v4-see.png" alt="Sample play patterns story" />
        <img src="assets/story-7-v4-see.png" alt="Sample Explorer play style story" />
      </div>
      <button type="button" class="bridge-preview-button" data-action="sample-summary">Preview sample summary</button>
      <button class="bridge-primary" data-action="landing">
        <span>Continue to data donation</span>
        <img class="bridge-arrow" src="assets/arrow-right-white.svg" alt="" />
      </button>
      <p class="bridge-redirect"><img src="assets/sdds-mark-bridge.png" alt="" /><span>You will be redirected to Smart Data Donation Service (SDDS) to complete the process</span></p>
      <aside class="bridge-trust" aria-label="University of York research reassurance">
        <img src="assets/data-safe-icon.svg" alt="" />
        <p><strong>This is a University of York research study. Data donation is securely managed through SDDS, a research service run by the University of York.</strong> Your donated Google Play Games data will be used for research only. It will not be sold, used for advertising, or provided to commercial organisations for their own purposes.</p>
      </aside>
      <section class="bridge-impact" aria-labelledby="bridge-impact-title">
        <h2 id="bridge-impact-title">How will my gaming data help research?</h2>
        <p>By contributing your Google Play history, you can help researchers explore how gaming habits and other digital activities relate to people’s interests, experiences, wellbeing, and health.</p>
      </section>
      <div class="bridge-facts" aria-label="Study details">
        <p><strong>Participation is voluntary and involves donating a copy of Google Play data.</strong></p>
      </div>
      <section class="bridge-partner" aria-labelledby="bridge-partner-title">
        <img src="assets/sdds-mark-bridge-footer.png" alt="" />
        <p id="bridge-partner-title">In partnership with Smart Data Donation Service (SDDS)</p>
        <strong>SDDS is a University of York research service, funded by the UK government through the Economic and Social Research Council.<br/>Your data is collected only with your consent, kept within the University of York’s secure research environment, and never sold or used for advertising.</strong>
        <a href="#" data-action="noop">Learn more <span aria-hidden="true">↗</span></a>
      </section>
    </div>
  </section>`, 'www.york.ac.uk');
}

function landing() {
  return chrome(`<section class="page">
    ${brand()}
    <h1>Help researchers understand the role gaming plays in everyday life.</h1>
    <div class="landing-description">
      <p>Mobile games are played by many different kinds of people, but research does not always capture this diversity.</p>
      <p>By donating your gaming data, you could help researchers build a more accurate picture of everyday mobile play and <strong>create a comprehensive research dataset that explores how digital activities relate to people’s wellbeing, personality, attitudes, and health.</strong></p>
    </div>
    <div class="cta-wrap"><button class="primary" data-action="info"><span>Get started</span><span>→</span></button></div>
    <p class="personal-note">and get <span class="marker-highlight">your personal gaming summary</span>!</p>
    <aside class="bridge-trust landing-trust" aria-label="University of York research reassurance">
      <img src="assets/data-safe-icon.svg" alt="" />
      <p><strong>This is a University of York research study. Data donation is securely managed through SDDS, a research service run by the University of York.</strong> Your donated Google Play Games data will be used for research only. It will not be sold, used for advertising, or provided to commercial organisations for their own purposes.</p>
    </aside>
    <div class="cards">
      <div class="card landing-time-card"><div><strong>Est. completion time</strong><span>5 min</span></div><p>Take your time if you want to review the details.</p></div>
      <div class="card"><span class="card-label">Am I eligible?</span><ul class="landing-eligibility"><li>Age 16-64</li><li>Living in UK</li><li>Plays Google Play Games</li></ul></div>
      <div class="card landing-researcher-card"><span class="card-label">Researcher</span><strong>Dr David Zendle @ The University of York</strong><a class="landing-card-link" href="#" data-action="noop">Learn more <span aria-hidden="true">↗</span></a></div>
      <section class="card landing-collapse-card ${state.landingImpactOpen ? 'is-open' : ''}" aria-labelledby="landing-impact-title">
        <button class="landing-collapse-toggle" data-action="landing-impact-toggle" aria-expanded="${state.landingImpactOpen}" aria-controls="landing-impact-details"><strong id="landing-impact-title">How will my gaming data help research?</strong><span aria-hidden="true">⌄</span></button>
        <div id="landing-impact-details" class="landing-collapse-details" ${state.landingImpactOpen ? '' : 'hidden'}><p>By contributing your Google Play history, you can help researchers explore how gaming habits and other digital activities relate to people’s interests, experiences, wellbeing, and health.</p></div>
      </section>
      <section class="card landing-collapse-card ${state.landingUpdatesOpen ? 'is-open' : ''}" aria-labelledby="landing-updates-title">
        <button class="landing-collapse-toggle" data-action="landing-updates-toggle" aria-expanded="${state.landingUpdatesOpen}" aria-controls="landing-updates-details"><strong id="landing-updates-title">Receive research updates</strong><span aria-hidden="true">⌄</span></button>
        <div id="landing-updates-details" class="landing-collapse-details" ${state.landingUpdatesOpen ? '' : 'hidden'}><p>You can choose whether to receive updates on the research findings.</p></div>
      </section>
      <section class="card landing-collapse-card landing-ethics-card ${state.landingEthicsOpen ? 'is-open' : ''}" aria-labelledby="landing-ethics-title">
        <button class="landing-collapse-toggle" data-action="landing-ethics-toggle" aria-expanded="${state.landingEthicsOpen}" aria-controls="landing-ethics-details"><strong id="landing-ethics-title"><span aria-hidden="true">✓✓</span> Ethics approved</strong><span aria-hidden="true">⌄</span></button>
        <div id="landing-ethics-details" class="landing-ethics-details" ${state.landingEthicsOpen ? '' : 'hidden'}>
          <p>This project received ethics approval from the Ethics Committee in the Department of Psychology at the University of York.</p>
          <p>If you have any questions you would like to ask the chair of the ethics committee (currently Dr Angela de Bruin), please contact psyc529@york.ac.uk. If you are still dissatisfied, please contact the University's Acting Data Protection Officer at dataprotection@york.ac.uk.</p>
          <p>Contact Details: Dr David Zendle Department of Psychology,<br/>The University of York, York, YO10 5DD<br/>E-mail: contact@sdds.ac.uk</p>
        </div>
      </section>
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
    <section class="study-process" aria-labelledby="process-title">
      <h3 id="process-title">Secure and easy way to donate your data for research</h3>
      <ol class="process-steps">
        ${['Consent','Authenticate via Google','Receive a summary'].map((label,index)=>`<li class="process-step"><span class="process-step-number">${index + 1}</span><strong>${label}</strong></li>`).join('')}
      </ol>
      <div class="security-explainer">
        <h3>Learn how <span class="security-title-brand"><img src="assets/sdds-mark.png" alt=""/>Smart Data Donation Service</span> protects your data</h3>
        <figure class="security-media"><img src="assets/security-video.png" alt="Illustration showing how Smart Data Donation Service protects donated data"/></figure>
      </div>
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
    'I have read and understood the participant information and have had the opportunity to ask questions.',
    'I understand that taking part is voluntary and that <strong>I can stop at any time before completing data donation</strong>, without giving a reason.',
    'I understand that if I would like to <strong>withdraw my data after completing donation</strong>, I can contact the study team (contact@sdds.ac.uk) within two weeks of participating and they will delete all of my data from their systems. I understand that this may not be possible after two weeks if my data has been anonymised.',
    'I agree to donate the Google Play data described above. I understand that <strong>approved researchers may access my data only within a secure research environment.</strong>',
    'I understand that my data may be used for approved research and teaching, and that <strong>I will not be identifiable in research outputs.</strong>',
  ];
  const optionalChecks = [
    'I want to be notified about <strong>research updates</strong>',
    'I am open to be contacted about <strong>future studies</strong>',
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
    <div class="google-card"><img class="signin-sdds-logo" src="assets/sdds-mark.png" alt="Smart Data Donation Service"/><h1>Sign in</h1><p>to continue to Smart Data Donation Service</p><input id="email" class="field" type="email" autocomplete="email" value="${state.email}" aria-label="Email or phone"/><button class="g-link">Forgot email?</button><p>Before using this app, you can review the SDDS privacy policy and terms of service.</p><div class="google-actions"><button class="g-link">Create account</button><button class="g-button" data-action="sharing">Next</button></div></div>
  </section>`, 'accounts.google.com');
}

function googleAccessIcon(type) {
  const icons = {
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="3" width="12" height="14"/><path d="M16 17v4H4V9h4"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16"/><path d="M7 3v4M17 3v4M3 10h18"/></svg>',
    renew: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6v5h-5M20 11a8 8 0 1 0-1.9 5.2"/></svg>',
  };
  return `<span class="sharing-icon">${icons[type]}</span>`;
}

function sharing() {
  return chrome(`<section class="google sharing-copy">
    <img class="google-g-mark" src="assets/google-g.png" alt="Google"/>
    <h1>Share a copy of some of your data with Smart Data Donation Service</h1>
    <div class="account sharing-account"><span class="account-dot"></span><span>${state.email}</span></div>
    <section class="sharing-section">
      <h2>You’re in control</h2>
      <div class="sharing-point">${googleAccessIcon('copy')}<div><strong>You choose what data, if any, to share</strong><p>Google will create a copy of the data that you choose</p></div></div>
      <div class="sharing-point">${googleAccessIcon('calendar')}<div><strong>You choose how long access lasts</strong><p>Share access to your data only once, or share access to your data and any changes that you make for 30 or 180 days</p></div></div>
      <div class="sharing-point">${googleAccessIcon('renew')}<div><strong>You can renew or remove Smart Data Donation Service’s access to your data</strong><p>To make changes at any time, go to your <a href="#" data-action="noop">Google Account</a>.</p></div></div>
    </section>
    <section class="sharing-section">
      <h2>How it works</h2>
      <div class="sharing-point">${googleAccessIcon('copy')}<div><strong>Share your data only once</strong><p>If you choose to share your data only once, Google will create a single, static copy of your data, and Smart Data Donation Service will be able to access and move this copy only one time.</p></div></div>
      <div class="sharing-point">${googleAccessIcon('calendar')}<div><strong>Share for 30 or 180 days</strong><p>If you choose to share your data for 30 or 180 days, Smart Data Donation Service will be able to regularly access updated copies of your data during the time period that you choose. Google will create those copies upon Smart Data Donation Service’s request, and Smart Data Donation Service will move those copies of your data during the time period that you choose.</p></div></div>
      <p>Google will send you an email before Smart Data Donation Service’s access expires. You’ll be able to renew their access if you want to. If you don’t renew their access, they’ll no longer be able to access or move copies of your data.</p>
      <p>As part of this process, Google will not delete any data from the Google services that you use.</p>
      <p>Learn more about <a href="#" data-action="noop">sharing a copy of your data</a></p>
    </section>
    <div class="google-actions sharing-actions"><button class="g-link" data-action="prepare">Cancel</button><button class="g-button dark" data-action="sharing-notice">Next</button></div>
    ${state.sharingNoticeOpen ? `<div class="google-dialog-backdrop" role="presentation">
      <section class="google-dialog" role="dialog" aria-modal="true" aria-labelledby="important-title">
        <h2 id="important-title">Important</h2>
        <div class="warning-line"><span aria-hidden="true">⚠</span><strong>You’re about to make important choices about sharing your data</strong></div>
        <p>Some of the data that you choose to share may be personal or sensitive. Review Smart Data Donation Service’s <a href="#" data-action="noop">privacy policy</a> so that you understand how your data will be used and protected, including things like whether your data may be sold to third parties. <a href="#" data-action="noop">Learn more about sharing your data</a></p>
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
    <ul class="permission-list"><li class="google-play-permission">Move a copy of your Google Play activity</li><li class="google-play-permission">Move a copy of your Google Play Store subscriptions</li><li class="google-play-permission">Move a copy of your Google Play Store purchases</li><li class="google-play-permission">Move a copy of your Google Play Store app installations</li></ul>
    <h3>Select how long Smart Data Donation Service can access your data</h3>
    ${[['once','Only once','Share access to your data only one time. You’ll share a single, static copy of your data.'],['30','30 days','Share access to your data and any changes that you make to your data for 30 days'],['180','180 days','Share access to your data and any changes that you make to your data for 180 days']].map(x=>`<label class="radio-card"><input type="radio" name="duration" value="${x[0]}" ${state.duration===x[0]?'checked':''}/><span><strong>${x[1]}</strong><small>${x[2]}</small></span></label>`).join('')}
    <section class="permission-trust"><h3>Make sure that you trust Smart Data Donation Service</h3><p>Review Smart Data Donation Service’s <a href="#" data-action="noop">privacy policy</a> and <a href="#" data-action="noop">Terms of Service</a> to understand how Smart Data Donation Service will process and protect your data.</p><p>To make changes at any time, go to your <a href="#" data-action="noop">Google Account</a>.</p><p>Learn how Google helps you <a href="#" data-action="noop">share data safely</a>.</p></section>
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
  const stories = [
    { src: 'assets/story-1-v4-see.png', title: 'Play story overview' },
    { src: 'assets/story-2-v4-icons.png', title: 'Top games' },
    { src: 'assets/story-3-v4-see.png', title: 'Yearly play comparison' },
    { src: 'assets/story-4-v4-see.png', title: 'Play patterns' },
    { src: 'assets/story-5-v4-see.png', title: 'Play milestones' },
    { src: 'assets/story-6-v4-see.png', title: 'Highest recorded spend' },
    { src: 'assets/story-7-v4-see.png', title: 'Explorer play style' },
  ];
  const activeStory = stories[state.summarySlide];
  return chrome(`<section class="page personal-summary-page">
    <div class="summary-brand"><img src="assets/sdds-mark.png" alt=""/><strong>Smart Data<br/>Donation Service</strong></div>
    <p class="summary-copy">This summary was created from the data you donated. Together, donated gaming histories can help researchers understand how everyday play changes over time.</p>
    <section class="story-carousel" aria-label="${SUMMARY_STORY_COUNT} personal gaming summary stories">
      <p class="swipe-hint">Swipe to explore your seven story images</p>
      <div class="story-frame" data-story-swipe>${stories.map((story, index) => {
        const positionClass = index === state.summarySlide
          ? 'is-active'
          : index === state.summarySlide - 1
            ? 'is-prev'
            : index === state.summarySlide + 1
              ? 'is-next'
              : '';
        return `<figure class="story-slide ${positionClass}" data-slide="${index}" aria-hidden="${index === state.summarySlide ? 'false' : 'true'}">
        <img src="${story.src}" alt="Story ${index + 1} of ${SUMMARY_STORY_COUNT}: ${story.title}" draggable="false"/>
      </figure>`;
      }).join('')}
      </div>
      <div class="story-navigation" aria-label="Story navigation">
        <button class="story-nav-button" data-action="carousel-prev" aria-label="Previous story">‹</button>
        <span class="story-count" aria-live="polite">${state.summarySlide + 1} / ${stories.length}</span>
        <button class="story-nav-button" data-action="carousel-next" aria-label="Next story">›</button>
      </div>
      <div class="story-dots" aria-label="Choose a story">${stories.map((_, index) => `<button class="story-dot ${index === state.summarySlide ? 'is-active' : ''}" data-action="carousel-slide" data-index="${index}" aria-label="Show story ${index + 1}" aria-current="${index === state.summarySlide ? 'true' : 'false'}"></button>`).join('')}</div>
    </section>
    <div class="summary-actions"><button class="secondary story-download" data-action="download-story" data-story-src="${activeStory.src}" data-story-number="${state.summarySlide + 1}">Download</button><button class="primary" data-action="share-story" data-story-src="${activeStory.src}" data-story-number="${state.summarySlide + 1}">Share</button></div>
    <p class="share-note">On mobile, choose Instagram Stories from your device’s share sheet.</p>
  </section>`);
}

const views = { instagram, bridge, landing, info, consent, prepare, signin, sharing, permissions, thanks, summary };

function render() {
  app.innerHTML = views[state.screen]();
  document.title = state.screen === 'instagram' ? 'Instagram | SDDS Study' : state.screen === 'bridge' ? 'University of York | Gaming Research' : 'SDDS Data Donation';
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target || target.disabled) return;
  const action = target.dataset.action;
  if (action === 'back' || action === 'browser-back') return back();
  if (action === 'landing-impact-toggle') {
    state.landingImpactOpen = !state.landingImpactOpen;
    render();
    requestAnimationFrame(() => document.querySelector('.landing-collapse-toggle[data-action="landing-impact-toggle"]')?.focus());
    return;
  }
  if (action === 'landing-updates-toggle') {
    state.landingUpdatesOpen = !state.landingUpdatesOpen;
    render();
    requestAnimationFrame(() => document.querySelector('.landing-collapse-toggle[data-action="landing-updates-toggle"]')?.focus());
    return;
  }
  if (action === 'landing-ethics-toggle') {
    state.landingEthicsOpen = !state.landingEthicsOpen;
    render();
    requestAnimationFrame(() => document.querySelector('.landing-collapse-toggle[data-action="landing-ethics-toggle"]')?.focus());
    return;
  }
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
  if (action === 'sample-summary') {
    state.summarySlide = 0;
    go('summary');
    return;
  }
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
    const totalSlides = SUMMARY_STORY_COUNT;
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
  if (action === 'share-story') {
    shareStory(target.dataset.storySrc, target.dataset.storyNumber);
    return;
  }
  if (action === 'download-story') {
    downloadStory(target.dataset.storySrc, target.dataset.storyNumber);
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

let storySwipeStartX = null;

document.addEventListener('pointerdown', (event) => {
  if (event.target.closest('[data-story-swipe]')) storySwipeStartX = event.clientX;
});

document.addEventListener('pointerup', (event) => {
  if (storySwipeStartX === null || !event.target.closest('[data-story-swipe]')) return;
  const distance = event.clientX - storySwipeStartX;
  storySwipeStartX = null;
  if (Math.abs(distance) < 45) return;
  state.summarySlide = (state.summarySlide + (distance < 0 ? 1 : -1) + SUMMARY_STORY_COUNT) % SUMMARY_STORY_COUNT;
  render();
});

function loadStoryAsset(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function createStoryShareBlob(src) {
  const story = await loadStoryAsset(src);
  const canvas = document.createElement('canvas');
  canvas.width = 824;
  canvas.height = 1834;
  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(story, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Unable to create story image')), 'image/png'));
}

async function downloadStory(src, number) {
  try {
    const blob = await createStoryShareBlob(src);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sdds-story-${number}.png`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    showToast('Summary download is not available in this browser');
  }
}

async function shareStory(src, number) {
  try {
    const blob = await createStoryShareBlob(src);
    const file = new File([blob], `sdds-story-${number}.png`, { type: 'image/png' });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: `My gaming story ${number} of ${SUMMARY_STORY_COUNT}` });
      return;
    }
    showToast('Sharing is available from a supported mobile browser');
  } catch (error) {
    if (error?.name !== 'AbortError') showToast('Sharing is available from a supported mobile browser');
  }
}

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
