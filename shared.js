document.addEventListener('DOMContentLoaded', function(){
  // --- Vanta.js Animation ---
  let vantaEffect = null;
  const lightThemeOptions = {
    el: "#space-background",
    mouseControls: true, touchControls: true, gyroControls: false,
    minHeight: 200.00, minWidth: 200.00,
    scale: 1.00, scaleMobile: 1.00,
    backgroundColor: 0xe1e9f2,
    color: 0x0057b7
  };
  const darkThemeOptions = {
    el: "#space-background",
    mouseControls: true, touchControls: true, gyroControls: false,
    minHeight: 200.00, minWidth: 200.00,
    scale: 1.00, scaleMobile: 1.00,
    backgroundColor: 0x071226,
    color: 0x64ffda
  };

  function initializeVanta(theme) {
    const options = (theme === 'dark') ? darkThemeOptions : lightThemeOptions;
    if (vantaEffect) {
      vantaEffect.setOptions(options);
    } else if (window.VANTA) {
      vantaEffect = VANTA.RINGS(options);
    }
  }

  // --- Theme Toggle ---
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    initializeVanta(theme);
  }
  
  var savedTheme = localStorage.getItem('dk_theme') || 'light';
  applyTheme(savedTheme);

  Array.prototype.forEach.call(document.querySelectorAll('[data-theme-toggle]'), function(btn){
    btn.addEventListener('click', function(){
      let newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('dk_theme', newTheme);
    });
  });
  
  // --- Mobile Menu ---
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // --- Preloader ---
  var pre = document.getElementById('preloader');
  if(pre){
    pre.style.transition = 'opacity 0.5s ease';
    setTimeout(function(){
        pre.style.opacity = '0';
        setTimeout(() => pre.style.display = 'none', 500);
    }, 600);
  }

  // --- Accent Color Picker ---
  function setAccent(c){ document.documentElement.style.setProperty('--accent', c); localStorage.setItem('dk_accent', c); }
  window.setAccent = setAccent;
  var savedAccent = localStorage.getItem('dk_accent');
  if(savedAccent){ document.documentElement.style.setProperty('--accent', savedAccent); }

  // --- Scroll Progress ---
  var prog = document.getElementById('scrollProg');
  if(prog){ window.addEventListener('scroll', function(){
    var pct = Math.min(100, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    prog.style.width = pct + '%';
  }); }

  // --- Typing Intro ---
  var tipe = document.getElementById('typingIntro');
  if(tipe){
    var txt = tipe.getAttribute('data-text') || tipe.textContent; tipe.textContent=''; var i=0; var t = setInterval(function(){ tipe.textContent += txt[i++]||''; if(i>txt.length) clearInterval(t); }, 36);
  }

  // --- Theme Customizer Swatches ---
  Array.prototype.forEach.call(document.querySelectorAll('[data-swatch]'), function(el){
    el.addEventListener('click', function(){ var c = el.getAttribute('data-color'); setAccent(c); });
  });
});