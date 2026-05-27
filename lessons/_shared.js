// Shared interactivity for exercises
// Each .exercise contains inputs with data-answer="canonical|alternative1|alt2"
// data-tolerance for numeric values (absolute), optional
// Buttons: Check / Hint / Show Solution

window.MathJax = window.MathJax || {
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['\\[', '\\]']],
    processEscapes: true,
    packages: {'[+]': ['ams']}
  },
  svg: {fontCache: 'global'},
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
    ignoreHtmlClass: 'tex2jax_ignore'
  }
};

(function loadMathJax() {
  if (document.querySelector('script[data-mathjax-loader]')) return;
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
  script.async = true;
  script.dataset.mathjaxLoader = 'true';
  document.head.appendChild(script);
})();

function normalize(s) {
  return String(s).trim().toLowerCase().replace(/\s+/g, ' ');
}

function isNumeric(s) {
  return /^-?\d+(\.\d+)?(e-?\d+)?$/i.test(String(s).trim());
}

function checkInput(input) {
  const userRaw = input.value;
  if (userRaw === '' || userRaw == null) return null;
  const answers = (input.dataset.answer || '').split('|').map(a => a.trim()).filter(Boolean);
  const tol = parseFloat(input.dataset.tolerance || '0');
  const user = normalize(userRaw);

  for (const a of answers) {
    if (isNumeric(a) && isNumeric(userRaw)) {
      const diff = Math.abs(parseFloat(a) - parseFloat(userRaw));
      const rel = Math.abs(parseFloat(a)) > 0 ? diff / Math.abs(parseFloat(a)) : diff;
      if (diff <= tol || rel <= 0.02) return true;
    }
    if (normalize(a) === user) return true;
    // partial substring match for longer textual answers
    if (a.length > 12 && normalize(a).includes(user) && user.length >= a.length * 0.6) return true;
  }
  return false;
}

function checkExercise(btn) {
  const ex = btn.closest('.exercise');
  const inputs = ex.querySelectorAll('input[data-answer]');
  let correct = 0, total = 0, blank = 0;
  inputs.forEach(inp => {
    total++;
    inp.classList.remove('correct', 'wrong');
    if (inp.value.trim() === '') { blank++; return; }
    const res = checkInput(inp);
    if (res === true)  { inp.classList.add('correct'); correct++; }
    else if (res === false) { inp.classList.add('wrong'); }
  });
  const fb = ex.querySelector('.feedback');
  if (blank === total) {
    fb.textContent = '⚠️ Please fill in your answer first.';
    fb.className = 'feedback bad';
    return;
  }
  if (correct === total) {
    fb.textContent = `✅ All correct (${correct}/${total})! Nice work.`;
    fb.className = 'feedback ok';
  } else if (correct > 0) {
    fb.textContent = `🟡 ${correct}/${total} correct. Red boxes = revise, then try again or click Hint.`;
    fb.className = 'feedback bad';
  } else {
    fb.textContent = `❌ 0/${total} correct. Try the Hint button before revealing the solution.`;
    fb.className = 'feedback bad';
  }
  // Track that user attempted
  ex.dataset.attempted = '1';
}

function showHint(btn) {
  const ex = btn.closest('.exercise');
  const hint = ex.querySelector('.hint');
  if (hint) {
    hint.hidden = !hint.hidden;
    if (!hint.hidden && window.MathJax?.typesetPromise) MathJax.typesetPromise([hint]);
  }
}

function showSolution(btn) {
  const ex = btn.closest('.exercise');
  if (ex.dataset.attempted !== '1') {
    const fb = ex.querySelector('.feedback');
    fb.textContent = '🚫 Please attempt the question (click Check) before revealing the solution.';
    fb.className = 'feedback bad';
    return;
  }
  const sol = ex.querySelector('.solution');
  if (sol) {
    sol.hidden = !sol.hidden;
    if (!sol.hidden && window.MathJax?.typesetPromise) MathJax.typesetPromise([sol]);
  }
}
