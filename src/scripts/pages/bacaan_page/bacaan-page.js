export default class BacaanPage {
  async render() {
    return `
       <section class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
       
      </section>

          <style>
            @keyframes fade-in {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fade-in {
              animation: fade-in 1s ease-out;
            }
            /* Smooth scrolling */
            html {
              scroll-behavior: smooth;
            }
            /* Glass morphism effect */
            .backdrop-blur-sm {
              backdrop-filter: blur(12px);
            }
            /* Custom hover effects */
            .group:hover .group-hover\\:scale-110 {
              transform: scale(1.1);
            }
            /* Gradient text */
            .bg-clip-text {
              -webkit-background-clip: text;
              background-clip: text;
            }
            /* Pulse animation for background elements */
            @keyframes pulse {
              0%, 100% {
                opacity: 0.05;
              }
              50% {
                opacity: 0.1;
              }
            }
            .animate-pulse {
              animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            .delay-700 {
              animation-delay: 700ms;
            }
            .delay-1000 {
              animation-delay: 1000ms;
            }
          </style>
    `;
  }

  async afterRender() {
    // Add any interactive features here if needed

    // Add intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fade-in 0.8s ease-out forwards";
        }
      });
    }, observerOptions);

    // Observe all card elements
    document.querySelectorAll(".group").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      observer.observe(card);
    });

    // Add stagger effect to list items
    const listItems = document.querySelectorAll("li");
    listItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  }
}
