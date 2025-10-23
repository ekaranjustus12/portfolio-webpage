document.addEventListener('DOMContentLoaded', () => {
    /* toggle button */ 
  
    const toggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const navbarCollapse = document.getElementById('navbarNav');
    if (!toggleBtn) {
      console.error("Dark mode toggle button not found!");
    } else {
      // Load stored preference
      if (localStorage.getItem('theme') === 'dark') {
        root.classList.add('dark-mode');
        toggleBtn.textContent = '☀️';
      }
  // Toggle event(click)
      toggleBtn.addEventListener('click', () => {
        root.classList.toggle('dark-mode');
        const isDark = root.classList.contains('dark-mode');
        toggleBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        //  Close navbar on small screens after theme toggle
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        }
      });
    }
    
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Check if navbar is currently expanded (on mobile)
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                // Use Bootstrap's collapse method to hide the menu
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
   /* active links on scroll */
    const sections = document.querySelectorAll("section"); 
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
});