export default class LandingPage {
  async render() {
    return `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-800 overflow-x-hidden">
      
      <!-- Hero Section -->
      <section class="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-green-600/10"></div>
        <div class="container mx-auto max-w-6xl text-center relative z-10">
          <div>
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl mb-8 shadow-2xl">
              <i class="fas fa-graduation-cap text-white text-3xl"></i>
            </div>
            <h1 class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6 leading-tight">
              KKN SISDAMAS 308
            </h1>
            <p class="text-xl md:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
              Kuliah Kerja Nyata Universitas [Nama Universitas]
            </p>
            <p class="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
              Membangun desa, mengembangkan masyarakat, dan menciptakan perubahan positif melalui pengabdian mahasiswa
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button class="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-2xl shadow-lg">
                <i class="fas fa-play-circle mr-2"></i>
                Lihat Program Kami
              </button>
              <button class="px-8 py-4 border-2 border-blue-500 text-blue-500 font-semibold rounded-2xl">
                <i class="fas fa-users mr-2"></i>
                Bergabung Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-20 px-4 bg-white">
        <div class="container mx-auto max-w-6xl">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-map-marker-alt text-white text-xl"></i>
              </div>
              <div class="text-4xl font-bold text-blue-600 mb-2">25</div>
              <p class="text-gray-600">Desa Binaan</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-user-graduate text-white text-xl"></i>
              </div>
              <div class="text-4xl font-bold text-green-600 mb-2">500</div>
              <p class="text-gray-600">Mahasiswa KKN</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-project-diagram text-white text-xl"></i>
              </div>
              <div class="text-4xl font-bold text-purple-600 mb-2">150</div>
              <p class="text-gray-600">Program Kegiatan</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-heart text-white text-xl"></i>
              </div>
              <div class="text-4xl font-bold text-red-600 mb-2">95%</div>
              <p class="text-gray-600">Tingkat Kepuasan</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Program Section -->
      <section class="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div class="container mx-auto max-w-6xl">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Program Unggulan</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Berbagai program inovatif untuk pemberdayaan masyarakat dan pengembangan desa
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-3xl shadow-xl">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <i class="fas fa-seedling text-white text-xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Pertanian Berkelanjutan</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Program pengembangan sistem pertanian modern dan ramah lingkungan untuk meningkatkan produktivitas petani lokal.
              </p>
              <div class="flex items-center text-blue-600 font-semibold">
                <span class="mr-2">Pelajari lebih lanjut</span>
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>

            <div class="bg-white p-8 rounded-3xl shadow-xl">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <i class="fas fa-laptop-code text-white text-xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Digital Village</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Transformasi digital desa melalui pelatihan teknologi, pembuatan website desa, dan sistem informasi terpadu.
              </p>
              <div class="flex items-center text-green-600 font-semibold">
                <span class="mr-2">Pelajari lebih lanjut</span>
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>

            <div class="bg-white p-8 rounded-3xl shadow-xl">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <i class="fas fa-hands-helping text-white text-xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Pemberdayaan UMKM</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Pendampingan usaha mikro kecil menengah dengan pelatihan manajemen, pemasaran digital, dan akses permodalan.
              </p>
              <div class="flex items-center text-purple-600 font-semibold">
                <span class="mr-2">Pelajari lebih lanjut</span>
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 px-4 bg-white">
        <div class="container mx-auto max-w-6xl">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Galeri Kegiatan</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Dokumentasi perjalanan KKN dan dampak positif yang telah diciptakan
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="relative group cursor-pointer">
              <div class="aspect-square bg-gradient-to-br from-blue-200 to-blue-300 rounded-3xl overflow-hidden">
                <div class="w-full h-full flex items-center justify-center">
                  <i class="fas fa-image text-6xl text-blue-600"></i>
                </div>
              </div>
              <div class="absolute inset-0 bg-black/50 rounded-3xl opacity-0 flex items-center justify-center">
                <div class="text-center text-white">
                  <i class="fas fa-search-plus text-3xl mb-2"></i>
                  <p class="font-semibold">Kegiatan Pertanian</p>
                </div>
              </div>
            </div>

            <div class="relative group cursor-pointer">
              <div class="aspect-square bg-gradient-to-br from-green-200 to-green-300 rounded-3xl overflow-hidden">
                <div class="w-full h-full flex items-center justify-center">
                  <i class="fas fa-image text-6xl text-green-600"></i>
                </div>
              </div>
              <div class="absolute inset-0 bg-black/50 rounded-3xl opacity-0 flex items-center justify-center">
                <div class="text-center text-white">
                  <i class="fas fa-search-plus text-3xl mb-2"></i>
                  <p class="font-semibold">Pelatihan Digital</p>
                </div>
              </div>
            </div>

            <div class="relative group cursor-pointer">
              <div class="aspect-square bg-gradient-to-br from-purple-200 to-purple-300 rounded-3xl overflow-hidden">
                <div class="w-full h-full flex items-center justify-center">
                  <i class="fas fa-image text-6xl text-purple-600"></i>
                </div>
              </div>
              <div class="absolute inset-0 bg-black/50 rounded-3xl opacity-0 flex items-center justify-center">
                <div class="text-center text-white">
                  <i class="fas fa-search-plus text-3xl mb-2"></i>
                  <p class="font-semibold">Workshop UMKM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonial Section -->
      <section class="py-20 px-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div class="container mx-auto max-w-6xl">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Testimoni</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Suara dari masyarakat dan mahasiswa yang telah merasakan manfaat program KKN
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-8 rounded-3xl shadow-xl">
              <div class="flex items-center mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <i class="fas fa-user text-white text-xl"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800">Pak Suyanto</h4>
                  <p class="text-gray-600">Kepala Desa Sukamaju</p>
                </div>
              </div>
              <div class="mb-4">
                <div class="flex text-yellow-400 mb-3">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
                
              </div>
            </div>

            <div class="bg-white p-8 rounded-3xl shadow-xl">
              <div class="flex items-center mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
                  <i class="fas fa-user-graduate text-white text-xl"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800">Sarah Permata</h4>
                  <p class="text-gray-600">Mahasiswa Teknik Informatika</p>
                </div>
              </div>
              <div class="mb-4">
                <div class="flex text-yellow-400 mb-3">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
     
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600">
        <div class="container mx-auto max-w-4xl text-center">
          <div class="animate-on-scroll opacity-0 translate-y-10">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
              Bergabunglah dengan KKN!
            </h2>
            <p class="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Mari bersama-sama membangun Indonesia melalui pengabdian dan dedikasi. Daftarkan diri Anda sekarang dan jadilah bagian dari perubahan positif.
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button class="px-10 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <i class="fas fa-user-plus mr-2"></i>
                Daftar Sekarang
              </button>
              <button class="px-10 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                <i class="fas fa-info-circle mr-2"></i>
                Info Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-16 px-4">
        <div class="container mx-auto max-w-7xl">
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl mb-4">
              <i class="fas fa-graduation-cap text-white text-2xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">KKN Sisdamas</h3>
            <p class="text-gray-400 max-w-md mx-auto">Membangun Indonesia melalui pengabdian mahasiswa</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 class="text-white font-bold mb-4">Program</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="#" class="hover:text-blue-400 transition-colors">Pertanian</a></li>
                <li><a href="#" class="hover:text-blue-400 transition-colors">Digital Village</a></li>
                <li><a href="#" class="hover:text-blue-400 transition-colors">UMKM</a></li>
                <li><a href="#" class="hover:text-blue-400 transition-colors">Pendidikan</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-white font-bold mb-4">Informasi</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="#" class="hover:text-blue-400 transition-colors">Tentang KKN</a></li>
                <li><a href="#" class="hover:text-blue-400 transition-colors">Panduan</a></li>
                <li><a href="#" class="hover:text-blue-400 transition-colors">FAQ</a></li>
                <li><a href="#" class="hover:text-blue-400 transition-colors">Kontak</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-white font-bold mb-4">Mahasiswa</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="#" class="hover:text-blue-400 transition-colors">Pendaftaran</a></li>
                <li><a href="#" class="hover:text-blue-400 transition-colors">Portal Mahasiswa</a></li>
                <li><a href="#" class="hover:text-blue-400 transition-colors">Logbook</a></li>
                <li><a href="#" class="hover:text-blue-400 transition-colors">Laporan</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-white font-bold mb-4">Kontak</h4>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i>Universitas XYZ</li>
                <li class="flex items-center"><i class="fas fa-phone mr-2"></i>(021) 123-4567</li>
                <li class="flex items-center"><i class="fas fa-envelope mr-2"></i>kkn@univ.ac.id</li>
              </ul>
            </div>
          </div>
          
          <div class="border-t border-gray-700 pt-8 text-center">
            <p class="mb-6 text-gray-400">&copy; ${new Date().getFullYear()} KKN Sisdamas Universitas. Semua Hak Dilindungi.</p>
            
            <div class="flex justify-center space-x-6">
              <a href="#" aria-label="Facebook" class="group">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <i class="fab fa-facebook-f"></i>
                </div>
              </a>
              <a href="#" aria-label="Instagram" class="group">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-red-500 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <i class="fab fa-instagram"></i>
                </div>
              </a>
              <a href="#" aria-label="Twitter" class="group">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <i class="fab fa-twitter"></i>
                </div>
              </a>
              <a href="#" aria-label="YouTube" class="group">
                <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <i class="fab fa-youtube"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    `;
  }

  async afterRender() {
    // Animation for scroll-triggered elements
    const scrollAnimatedElements =
      document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add(
              "opacity-100",
              "translate-y-0",
              "transition-all",
              "duration-1000",
              "ease-out"
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    scrollAnimatedElements.forEach((el) => {
      observer.observe(el);
    });

    // Count up animation for statistics
    const countUpElements = document.querySelectorAll(".count-up");
    countUpElements.forEach((el) => {
      const target = +el.getAttribute("data-target");
      el.innerText = "0";
      const duration = 2000;
      const incrementTime = 10;
      const step = target / (duration / incrementTime);

      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        if (el.innerHTML.includes("%")) {
          el.innerText = Math.ceil(current) + "%";
        } else if (el.innerHTML.includes("+")) {
          el.innerText = Math.ceil(current).toLocaleString() + "+";
        } else {
          el.innerText = Math.ceil(current).toLocaleString();
        }
      }, incrementTime);
    });

    // Hero animation
    setTimeout(() => {
      const heroElements = document.querySelectorAll(".hero-animate");
      heroElements.forEach((el) => {
        el.classList.remove("opacity-0", "translate-y-10");
        el.classList.add(
          "opacity-100",
          "translate-y-0",
          "transition-all",
          "duration-1000",
          "ease-out"
        );
      });
    }, 300);
  }
}
