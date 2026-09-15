/**
 * BLACK RAVEN - Next-Gen Avian Platform
 * Glassmorphic UI, AI Diagnostic Scanner, Audio Synthesizer & Pip Baby Chick Chat Bot
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Theme Switcher (Dark / Light Mode)
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');
  const themeToggleText = document.getElementById('theme-toggle-text');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('br-theme', theme);

    if (theme === 'light') {
      themeIconSun.style.display = 'block';
      themeIconMoon.style.display = 'none';
      themeToggleText.textContent = 'Dark Mode';
    } else {
      themeIconSun.style.display = 'none';
      themeIconMoon.style.display = 'block';
      themeToggleText.textContent = 'Light Mode';
    }
  }

  const savedTheme = localStorage.getItem('br-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode!`);
    });
  }

  // =========================================================================
  // 2. Navigation & Page View Routing
  // =========================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const pageViews = document.querySelectorAll('.page-view');
  const sidebar = document.getElementById('sidebar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');

  function switchView(targetViewId) {
    if (!targetViewId) targetViewId = 'endanger-bird';

    navLinks.forEach(link => {
      if (link.getAttribute('data-view') === targetViewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    pageViews.forEach(view => {
      if (view.id === `view-${targetViewId}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    if (sidebar && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetView = link.getAttribute('data-view');
      switchView(targetView);
    });
  });

  function handleHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash) switchView(hash);
  }
  window.addEventListener('hashchange', handleHash);
  if (window.location.hash) handleHash();

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // =========================================================================
  // 3. Simulated Bird Audio Synthesizer (Web Audio API)
  // =========================================================================
  function playBirdSound(type = 'chick') {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      if (type === 'chick') {
        // High pitched cute chick chirp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2400, now);
        osc.frequency.exponentialRampToValueAtTime(3400, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(2100, now + 0.16);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'pitta') {
        // Double whistle call of Gurney's Pitta
        [0, 0.15].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const startF = idx === 0 ? 1100 : 1450;
          osc.frequency.setValueAtTime(startF, now + delay);
          osc.frequency.exponentialRampToValueAtTime(startF + 300, now + delay + 0.09);

          gain.gain.setValueAtTime(0.12, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.11);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.12);
        });
      } else if (type === 'sandpiper') {
        // Fast triple trill for Spoon-billed Sandpiper
        [0, 0.08, 0.16].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(2900, now + delay);
          osc.frequency.exponentialRampToValueAtTime(2200, now + delay + 0.06);

          gain.gain.setValueAtTime(0.07, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.065);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.07);
        });
      }
    } catch (e) {
      // Audio autoplay policy
    }
  }

  // Bind bird call buttons
  document.querySelectorAll('.play-bird-call').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const bird = btn.getAttribute('data-bird');
      playBirdSound(bird);
      showToast(`Playing simulated ${bird === 'pitta' ? "Gurney's Pitta" : "Spoon-billed Sandpiper"} call 🎵`);
    });
  });

  // =========================================================================
  // 4. "picture pls" AI Diagnostic Scanner
  // =========================================================================
  const triggerUploadBtn = document.getElementById('trigger-file-upload');
  const photoInput = document.getElementById('bird-photo-input');
  const dropzone = document.getElementById('bird-dropzone');
  const previewImg = document.getElementById('dropzone-preview-img');
  const defaultDropzoneView = document.getElementById('dropzone-default-view');
  const samplePhotoBtn = document.getElementById('load-sample-photo-btn');
  const scannerBeam = document.getElementById('scanner-beam');

  function triggerScanner(src, title) {
    previewImg.src = src;
    previewImg.style.display = 'block';
    defaultDropzoneView.style.display = 'none';

    // Start scanner animation
    if (scannerBeam) scannerBeam.style.display = 'block';

    setTimeout(() => {
      if (scannerBeam) scannerBeam.style.display = 'none';
      playBirdSound('chick');
      showToast(`✨ AI Triage Complete: Identified as ${title}. Feathers intact, alert state.`);
    }, 1400);
  }

  if (triggerUploadBtn && photoInput) {
    triggerUploadBtn.addEventListener('click', () => photoInput.click());
  }
  if (dropzone && photoInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target !== previewImg) photoInput.click();
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageFile(e.dataTransfer.files[0]);
      }
    });

    photoInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleImageFile(e.target.files[0]);
      }
    });
  }

  function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file (JPG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      triggerScanner(e.target.result, 'Uploaded Specimen');
    };
    reader.readAsDataURL(file);
  }

  if (samplePhotoBtn) {
    samplePhotoBtn.addEventListener('click', () => {
      triggerScanner('https://images.unsplash.com/photo-1555169062-013468b47731?auto=format&fit=crop&w=700&q=80', 'Eurasian Tree Sparrow');
    });
  }

  // =========================================================================
  // 5. "what should you do..." Search Bar & Live Triage Filter
  // =========================================================================
  const triageInput = document.getElementById('triage-search-input');
  const triageCards = document.querySelectorAll('.triage-card');
  const scenarioChips = document.querySelectorAll('.triage-chip[data-query]');

  function filterTriage(query) {
    const q = (query || '').toLowerCase().trim();

    triageCards.forEach(card => {
      const scenarioText = (card.getAttribute('data-scenario') || '').toLowerCase();
      const cardTitle = card.querySelector('.triage-title')?.textContent.toLowerCase() || '';
      const cardBody = card.textContent.toLowerCase();

      if (!q || q === 'all' || scenarioText.includes(q) || cardTitle.includes(q) || cardBody.includes(q)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (triageInput) {
    triageInput.addEventListener('input', (e) => filterTriage(e.target.value));
  }

  scenarioChips.forEach(chip => {
    chip.addEventListener('click', () => {
      scenarioChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const q = chip.getAttribute('data-query');
      if (triageInput) triageInput.value = (q === 'all') ? '' : q;
      filterTriage(q);
    });
  });

  // =========================================================================
  // 6. Baby Chicken Click-to-Chat Bot ("Pip")
  // =========================================================================
  const chickChatBtn = document.getElementById('chick-chatbot-btn');
  const chickChatPanel = document.getElementById('chick-chatbot-panel');
  const closeChatbotBtn = document.getElementById('close-chatbot-btn');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotInput = document.getElementById('chatbot-input');
  const quickSuggestionButtons = document.querySelectorAll('.chat-suggest-btn');

  if (chickChatBtn && chickChatPanel) {
    chickChatBtn.addEventListener('click', () => {
      const isOpen = chickChatPanel.classList.toggle('open');
      if (isOpen) {
        playBirdSound('chick');
        setTimeout(() => chatbotInput?.focus(), 250);
      }
    });
  }

  if (closeChatbotBtn && chickChatPanel) {
    closeChatbotBtn.addEventListener('click', () => {
      chickChatPanel.classList.remove('open');
    });
  }

  quickSuggestionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-ask');
      if (query) sendUserMessage(query);
    });
  });

  if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatbotInput.value.trim();
      if (text) {
        sendUserMessage(text);
        chatbotInput.value = '';
      }
    });
  }

  function appendChatMessage(text, sender = 'bot', html = false) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    if (html) bubble.innerHTML = text;
    else bubble.textContent = text;
    chatbotMessages.appendChild(bubble);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return bubble;
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'chat-bubble bot typing-dots';
    typing.id = 'bot-typing-indicator';
    typing.innerHTML = `
      <span style="display:inline-block;width:6px;height:6px;background:var(--accent-amber);border-radius:50%;margin-right:3px;"></span>
      <span style="display:inline-block;width:6px;height:6px;background:var(--accent-amber);border-radius:50%;margin-right:3px;"></span>
      <span style="display:inline-block;width:6px;height:6px;background:var(--accent-amber);border-radius:50%;"></span>
    `;
    chatbotMessages.appendChild(typing);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('bot-typing-indicator');
    if (indicator) indicator.remove();
  }

  function sendUserMessage(msgText) {
    appendChatMessage(msgText, 'user');
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const botResponse = generatePipResponse(msgText);
      appendChatMessage(botResponse, 'bot', true);
      playBirdSound('chick');
    }, 500 + Math.random() * 350);
  }

  function generatePipResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('injured') || q.includes('hurt') || q.includes('found') || q.includes('emergency')) {
      return `🐣 <strong>Pip's Emergency Rescue Protocol:</strong><br>
      1. <strong>Box safely:</strong> Line a shoebox with paper towels and poke small air holes.<br>
      2. <strong>Warm, dark, and quiet:</strong> Place half over a low heating pad.<br>
      3. <strong>NO FOOD OR WATER:</strong> Fluid in shock easily aspirates into lungs!<br>
      4. Check our <a href="#injured-bird" style="color:var(--accent-amber); font-weight:700;">Injured Bird Guide</a> for instant triage!`;
    }

    if (q.includes('window') || q.includes('glass') || q.includes('concussion')) {
      return `🪟 <strong>Window Collision Advice:</strong><br>
      The bird has a concussion. Place in a dark, quiet box for 1–2 hours with low warmth. If still listless or unbalanced after 2 hours, transport to an avian rehab center immediately!`;
    }

    if (q.includes('cat') || q.includes('dog') || q.includes('bite')) {
      return `⚠️ <strong>Critical Cat Attack Alert:</strong><br>
      Feline saliva contains deadly <em>Pasteurella multocida</em> bacteria. Birds die of bacterial septicemia within 24–48 hours without systemic veterinary antibiotics. Immediate clinic transport is essential!`;
    }

    if (q.includes('baby') || q.includes('nestling') || q.includes('fledgling')) {
      return `🐥 <strong>Baby Bird Assessment:</strong><br>
      • <strong>Nestling (pink, no feathers):</strong> Needs warmth, place back into nest or makeshift basket.<br>
      • <strong>Fledgling (feathered, short tail):</strong> Normal learning stage! Parents are foraging nearby. Keep pets away.`;
    }

    if (q.includes('gurney') || q.includes('pitta')) {
      return `🌿 <strong>Gurney's Pitta:</strong><br>
      Rediscovered in 1986, but functionally extinct in southern Thailand (Khao Nor Chu Chi) due to severe lowland rainforest destruction. Fewer than 50 mature individuals hang on. You can listen to its call right on our <a href="#endanger-bird" style="color:var(--accent-amber); font-weight:700;">Endangered Birds</a> page!`;
    }

    if (q.includes('spoon') || q.includes('sandpiper')) {
      return `🌊 <strong>Spoon-billed Sandpiper:</strong><br>
      Under 200 mature birds exist on Earth! It relies on its unique spatulate beak to sieve tidal mudflats. Flyway stopover loss in the Yellow Sea is their primary existential threat.`;
    }

    if (q.includes('picture') || q.includes('photo') || q.includes('identify')) {
      return `📷 <strong>Picture Pls Diagnostic:</strong><br>
      Head over to <a href="#injured-bird" style="color:var(--accent-amber); font-weight:700;">Injured Bird</a>! Drop an image or click 'Demo Sparrow' to trigger our laser diagnostic scanner!`;
    }

    if (q.includes('train') || q.includes('step up')) {
      return `🎓 <strong>Training Advice:</strong><br>
      Never force physical contact. Use high-value seeds (almond slivers, millet) and positive reinforcement to shape target touching and step-ups voluntarily! Check our <a href="#training" style="color:var(--accent-amber); font-weight:700;">Training</a> guide.`;
    }

    if (q.includes('shop') || q.includes('buy') || q.includes('cart')) {
      return `🛒 <strong>Sanctuary Supplies:</strong><br>
      We offer hospital-grade trauma kits, natural dragonwood perches, and foraging enrichment wheels! 100% of proceeds directly fund wild avian rescue operations.`;
    }

    if (q.includes('quiz') || q.includes('test')) {
      return `🧠 <strong>Ready for the Bird Test?</strong><br>
      Jump to the <a href="#bird-test" style="color:var(--accent-amber); font-weight:700;">Bird Test</a> to challenge your knowledge and earn your Master Ornithologist rank!`;
    }

    return `Chirp! 🐣 That's an interesting question! I'm Pip, your AI assistant at <strong>Black Raven</strong>.<br>
    Ask me about injured bird rescue, endangered species like Gurney's Pitta, parrot training, or test your skills in the Bird Test!`;
  }

  // =========================================================================
  // 7. What Parrot Suits You? — Personality Quiz Engine
  // =========================================================================
  const parrotQuestions = [
    {
      question: "How would you describe your ideal living space?",
      options: [
        { text: "A quiet, cozy nook — just me and a few close friends", traits: { grey: 3, cockatiel: 2, lorikeet: 0, conure: 1, macaw: 0, cockatoo: 1, eclectus: 2 } },
        { text: "Lively and social — always people coming and going!", traits: { grey: 0, cockatiel: 1, lorikeet: 3, conure: 3, macaw: 2, cockatoo: 2, eclectus: 0 } },
        { text: "Stylish and roomy — I love space and aesthetics", traits: { grey: 1, cockatiel: 0, lorikeet: 1, conure: 0, macaw: 3, cockatoo: 2, eclectus: 3 } },
        { text: "Minimal and peaceful — calm is everything to me", traits: { grey: 2, cockatiel: 3, lorikeet: 0, conure: 0, macaw: 0, cockatoo: 1, eclectus: 2 } }
      ]
    },
    {
      question: "What is your biggest strength?",
      options: [
        { text: "I'm extremely intelligent and observant", traits: { grey: 3, cockatiel: 0, lorikeet: 1, conure: 0, macaw: 2, cockatoo: 1, eclectus: 2 } },
        { text: "I'm the life of the party — endlessly entertaining!", traits: { grey: 0, cockatiel: 1, lorikeet: 3, conure: 3, macaw: 2, cockatoo: 2, eclectus: 0 } },
        { text: "I'm deeply loyal and loving to those I care about", traits: { grey: 2, cockatiel: 3, lorikeet: 1, conure: 2, macaw: 1, cockatoo: 3, eclectus: 2 } },
        { text: "I'm bold, confident, and love making a statement", traits: { grey: 0, cockatiel: 0, lorikeet: 2, conure: 1, macaw: 3, cockatoo: 2, eclectus: 1 } }
      ]
    },
    {
      question: "How do you handle boredom?",
      options: [
        { text: "I solve puzzles or dive deep into a topic", traits: { grey: 3, cockatiel: 0, lorikeet: 0, conure: 1, macaw: 2, cockatoo: 0, eclectus: 2 } },
        { text: "I look for any excuse to be silly and laugh", traits: { grey: 0, cockatiel: 2, lorikeet: 3, conure: 3, macaw: 1, cockatoo: 2, eclectus: 0 } },
        { text: "I cuddle up with someone and watch TV", traits: { grey: 1, cockatiel: 3, lorikeet: 1, conure: 1, macaw: 0, cockatoo: 3, eclectus: 1 } },
        { text: "I redecorate, rearrange, or try something dramatic", traits: { grey: 0, cockatiel: 0, lorikeet: 2, conure: 2, macaw: 3, cockatoo: 1, eclectus: 2 } }
      ]
    },
    {
      question: "Pick your ideal weekend activity:",
      options: [
        { text: "Reading or learning something new", traits: { grey: 3, cockatiel: 1, lorikeet: 0, conure: 0, macaw: 0, cockatoo: 0, eclectus: 3 } },
        { text: "Hiking or going on a wild adventure outdoors", traits: { grey: 0, cockatiel: 1, lorikeet: 2, conure: 3, macaw: 3, cockatoo: 1, eclectus: 0 } },
        { text: "Hosting a dinner party or game night", traits: { grey: 1, cockatiel: 2, lorikeet: 3, conure: 2, macaw: 2, cockatoo: 3, eclectus: 1 } },
        { text: "Quiet walk in nature, or a relaxing spa day", traits: { grey: 2, cockatiel: 3, lorikeet: 0, conure: 0, macaw: 0, cockatoo: 2, eclectus: 3 } }
      ]
    },
    {
      question: "How would your friends describe your communication style?",
      options: [
        { text: "Thoughtful — I choose my words carefully", traits: { grey: 3, cockatiel: 1, lorikeet: 0, conure: 0, macaw: 0, cockatoo: 1, eclectus: 3 } },
        { text: "Loud and expressive — I say exactly what I feel!", traits: { grey: 0, cockatiel: 1, lorikeet: 2, conure: 3, macaw: 3, cockatoo: 2, eclectus: 0 } },
        { text: "Warm and sweet — always making people feel loved", traits: { grey: 1, cockatiel: 3, lorikeet: 2, conure: 2, macaw: 1, cockatoo: 3, eclectus: 2 } },
        { text: "Mysterious and deep — I reveal myself slowly", traits: { grey: 2, cockatiel: 0, lorikeet: 0, conure: 0, macaw: 1, cockatoo: 0, eclectus: 2 } }
      ]
    },
    {
      question: "What's your relationship with food?",
      options: [
        { text: "I stick to what I love — routine and consistency", traits: { grey: 3, cockatiel: 2, lorikeet: 0, conure: 1, macaw: 0, cockatoo: 2, eclectus: 1 } },
        { text: "I love trying exotic, colourful, and fresh foods!", traits: { grey: 1, cockatiel: 0, lorikeet: 3, conure: 2, macaw: 3, cockatoo: 1, eclectus: 3 } },
        { text: "Sweet treats are my weakness 🍬", traits: { grey: 0, cockatiel: 2, lorikeet: 3, conure: 3, macaw: 2, cockatoo: 3, eclectus: 0 } },
        { text: "I eat healthy and mindfully — balance is key", traits: { grey: 2, cockatiel: 1, lorikeet: 1, conure: 0, macaw: 0, cockatoo: 0, eclectus: 3 } }
      ]
    },
    {
      question: "How much time can you dedicate to a companion daily?",
      options: [
        { text: "2-3 hours — quality over quantity", traits: { grey: 3, cockatiel: 2, lorikeet: 0, conure: 1, macaw: 0, cockatoo: 0, eclectus: 3 } },
        { text: "I'm home all day — constant companionship!", traits: { grey: 1, cockatiel: 2, lorikeet: 2, conure: 2, macaw: 3, cockatoo: 3, eclectus: 1 } },
        { text: "30-60 mins — I have a busy schedule", traits: { grey: 0, cockatiel: 3, lorikeet: 1, conure: 2, macaw: 0, cockatoo: 0, eclectus: 1 } },
        { text: "Weekends mostly — weekdays are hectic", traits: { grey: 0, cockatiel: 3, lorikeet: 0, conure: 1, macaw: 0, cockatoo: 0, eclectus: 1 } }
      ]
    }
  ];

  const parrotResults = {
    grey: {
      name: "African Grey Parrot",
      subtitle: "The Intellectual 🧠",
      origin: "Origin: West & Central Africa",
      emoji: "🩶",
      desc: "Like an African Grey, you're deeply intelligent, thoughtful, and perceptive. You value meaningful, long-term bonds and prefer depth over small talk. You're sensitive, loyal, and capable of incredible insight — you pick up on things others miss. You thrive with a patient, dedicated companion.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/African_Grey_Parrot.jpg/640px-African_Grey_Parrot.jpg",
      iq: "★★★★★", talk: "★★★★☆", space: "Medium", love: "★★★★☆"
    },
    cockatiel: {
      name: "Cockatiel",
      subtitle: "The Sweet Soul 💛",
      origin: "Origin: Australia",
      emoji: "💛",
      desc: "You're gentle, warm, and deeply affectionate. Like a Cockatiel, you bring calm energy to every room and are content with simple pleasures. You're easy to love and love in return. You don't need drama — just genuine connection and a peaceful, happy home.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Cockatiels_on_a_branch.jpg/640px-Cockatiels_on_a_branch.jpg",
      iq: "★★★☆☆", talk: "★★★☆☆", space: "Small", love: "★★★★★"
    },
    lorikeet: {
      name: "Rainbow Lorikeet",
      subtitle: "The Life of the Party 🌈",
      origin: "Origin: Australia & Indonesia",
      emoji: "🌈",
      desc: "You're vibrant, energetic, and absolutely irresistible in social situations. Like a Lorikeet, you bring colour and joy wherever you go. You live life at full speed, love new experiences, and light up every room you enter. You need stimulation — boredom is your enemy!",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Trichoglossus_moluccanus_-Taronga_Zoo-8.jpg/640px-Trichoglossus_moluccanus_-Taronga_Zoo-8.jpg",
      iq: "★★★☆☆", talk: "★★★★☆", space: "Medium", love: "★★★★☆"
    },
    conure: {
      name: "Sun Conure",
      subtitle: "The Adventurer ☀️",
      origin: "Origin: Northeast South America",
      emoji: "☀️",
      desc: "Fearless, bold, and bursting with personality — you're a Sun Conure through and through. You chase adventure, speak your mind without filter, and your enthusiasm is contagious. You love making memories, being the centre of attention, and living each day to the fullest.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Aratinga_solstitialis_-pet-6a.jpg/640px-Aratinga_solstitialis_-pet-6a.jpg",
      iq: "★★★☆☆", talk: "★★★★☆", space: "Medium", love: "★★★★★"
    },
    macaw: {
      name: "Scarlet Macaw",
      subtitle: "The Show-Stopper 🔴",
      origin: "Origin: Central & South America",
      emoji: "🔴",
      desc: "You make an entrance. Like a Scarlet Macaw, you're magnetic, dramatic, and impossible to ignore. You need space to spread your wings, love grand gestures, and know exactly how to command a room. Confident and fierce, you live life boldly and expect the same from those around you.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Scarlet_Macaw_Ara_macao_2-Tambopata-crop.jpg/640px-Scarlet_Macaw_Ara_macao_2-Tambopata-crop.jpg",
      iq: "★★★★☆", talk: "★★★☆☆", space: "Large", love: "★★★☆☆"
    },
    cockatoo: {
      name: "Sulphur-crested Cockatoo",
      subtitle: "The Devoted Companion ❤️",
      origin: "Origin: Australia & New Guinea",
      emoji: "🤍",
      desc: "You crave deep, devoted connection. Like a Cockatoo, you love unconditionally and need to be loved the same way. You're playful, expressive, and emotionally intelligent. When you commit to someone, it's forever. You're the heart of any group — sensitive, big-hearted, and unforgettable.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cacatua_galerita_-perching_on_railing_-profile.jpg/640px-Cacatua_galerita_-perching_on_railing_-profile.jpg",
      iq: "★★★★☆", talk: "★★★☆☆", space: "Large", love: "★★★★★"
    },
    eclectus: {
      name: "Eclectus Parrot",
      subtitle: "The Elegant Thinker 💚",
      origin: "Origin: Solomon Islands, Australia",
      emoji: "💚",
      desc: "Calm, graceful, and quietly brilliant — you're an Eclectus. You observe before you act, speak only when worth it, and have an appreciation for beauty and structure. You bring an air of mystery and elegance, and those who take the time to truly know you discover remarkable depth.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Eclectus_roratus_-perching_on_branch-8.jpg/640px-Eclectus_roratus_-perching_on_branch-8.jpg",
      iq: "★★★★☆", talk: "★★★☆☆", space: "Medium", love: "★★★☆☆"
    }
  };

  let parrotCurrentQ = 0;
  let parrotScores = { grey: 0, cockatiel: 0, lorikeet: 0, conure: 0, macaw: 0, cockatoo: 0, eclectus: 0 };
  let parrotAnswered = false;

  const quizQuestionText = document.getElementById('quiz-question');
  const quizOptionsContainer = document.getElementById('quiz-options-container');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  const quizCounter = document.getElementById('quiz-counter');
  const quizProgressBar = document.getElementById('quiz-progress');
  const quizScreenQuestion = document.getElementById('quiz-screen-question');
  const quizScreenResult = document.getElementById('quiz-screen-result');
  const quizRestartBtn = document.getElementById('quiz-restart-btn');

  function renderParrotQuestion() {
    parrotAnswered = false;
    const q = parrotQuestions[parrotCurrentQ];
    if (!q) { showParrotResult(); return; }

    quizCounter.textContent = `Question ${parrotCurrentQ + 1} of ${parrotQuestions.length}`;
    quizProgressBar.style.width = `${((parrotCurrentQ) / parrotQuestions.length) * 100}%`;
    quizQuestionText.textContent = q.question;
    quizNextBtn.style.display = 'none';

    quizOptionsContainer.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `<span>${opt.text}</span><span style="font-weight:900; opacity:0.5; color:var(--accent-amber);">${String.fromCharCode(65 + idx)}</span>`;
      btn.addEventListener('click', () => {
        if (parrotAnswered) return;
        parrotAnswered = true;
        // Add scores
        Object.keys(opt.traits).forEach(k => { parrotScores[k] += opt.traits[k]; });
        // Highlight selected
        btn.classList.add('correct');
        quizOptionsContainer.querySelectorAll('.quiz-opt-btn').forEach(b => b.disabled = true);
        quizNextBtn.style.display = 'inline-flex';
      });
      quizOptionsContainer.appendChild(btn);
    });
  }

  function showParrotResult() {
    quizScreenQuestion.style.display = 'none';
    quizScreenResult.style.display = 'block';
    quizProgressBar.style.width = '100%';

    // Find top scoring parrot
    const winner = Object.entries(parrotScores).sort((a, b) => b[1] - a[1])[0][0];
    const result = parrotResults[winner];

    document.getElementById('quiz-result-title').textContent = result.name;
    document.getElementById('quiz-result-subtitle').textContent = result.subtitle;
    document.getElementById('quiz-result-origin').textContent = result.origin;
    document.getElementById('quiz-result-emoji').textContent = result.emoji;
    document.getElementById('quiz-result-desc').textContent = result.desc;
    document.getElementById('quiz-stat-iq').textContent = result.iq;
    document.getElementById('quiz-stat-talk').textContent = result.talk;
    document.getElementById('quiz-stat-space').textContent = result.space;
    document.getElementById('quiz-stat-love').textContent = result.love;

    const img = document.getElementById('quiz-result-img');
    img.src = result.img;
    img.onerror = () => { img.src = ''; img.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:5rem;">${result.emoji}</div>`; };
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      parrotCurrentQ++;
      if (parrotCurrentQ < parrotQuestions.length) {
        renderParrotQuestion();
      } else {
        showParrotResult();
      }
    });
  }

  if (quizRestartBtn) {
    quizRestartBtn.addEventListener('click', () => {
      parrotCurrentQ = 0;
      parrotScores = { grey: 0, cockatiel: 0, lorikeet: 0, conure: 0, macaw: 0, cockatoo: 0, eclectus: 0 };
      parrotAnswered = false;
      quizProgressBar.style.width = '0%';
      quizScreenResult.style.display = 'none';
      quizScreenQuestion.style.display = 'block';
      renderParrotQuestion();
    });
  }

  renderParrotQuestion();

  // =========================================================================
  // 8. Sanctuary Shopping Cart System
  // =========================================================================
  let cart = [];
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartSubtotalPrice = document.getElementById('cart-subtotal-price');
  const cartItemCount = document.getElementById('cart-item-count');
  const checkoutBtn = document.getElementById('checkout-btn');

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartItemCount) cartItemCount.textContent = totalItems;
    if (cartSubtotalPrice) cartSubtotalPrice.textContent = `$${totalPrice.toFixed(2)}`;

    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 3rem;">Your cart is empty.</p>';
      return;
    }

    cartItemsList.innerHTML = '';
    cart.forEach(item => {
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-item-thumb">
        <div style="flex:1;">
          <div style="font-family: var(--font-heading); font-weight: 700; font-size: 0.95rem;">${item.name}</div>
          <div style="color: var(--accent-amber); font-size: 0.85rem; margin-top: 0.2rem;">$${item.price.toFixed(2)} &times; ${item.quantity}</div>
        </div>
        <button class="triage-chip" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;" data-remove="${item.id}">Remove</button>
      `;
      row.querySelector('[data-remove]').addEventListener('click', () => {
        removeFromCart(item.id);
      });
      cartItemsList.appendChild(row);
    });
  }

  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    showToast(`Added "${product.name}" to cart!`);
    playBirdSound('chick');
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
  }

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = {
        id: btn.getAttribute('data-id'),
        name: btn.getAttribute('data-name'),
        price: parseFloat(btn.getAttribute('data-price')),
        img: btn.getAttribute('data-img')
      };
      addToCart(product);
    });
  });

  function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  }
  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
      }
      showToast('Sanctuary order simulation successful! Thank you! 🦅');
      cart = [];
      updateCartUI();
      closeCart();
    });
  }

  // =========================================================================
  // 9. Toast Utility
  // =========================================================================
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

});
