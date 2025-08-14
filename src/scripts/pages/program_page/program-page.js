// Data array untuk profil peserta KKN
const kknParticipants = [
  {
    id: 1,
    name: "Ahmad Fauzi Rahman",
    major: "Teknik Informatika",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
    website: "https://ahmadfauzi.dev",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    major: "Pendidikan Bahasa Arab",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop&crop=face",
    website: "https://sitinurhaliza.web.id",
  },
  {
    id: 3,
    name: "Muhammad Ridwan",
    major: "Ekonomi Syariah",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face",
    website: "https://mridwan.portfolio.dev",
  },
  {
    id: 4,
    name: "Fatimah Zahra",
    major: "Psikologi",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face",
    website: "https://fatimahzahra.com",
  },
  {
    id: 5,
    name: "Abdul Hakim",
    major: "Hukum Keluarga Islam",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face",
    website: "https://abdulhakim.law",
  },
  {
    id: 6,
    name: "Aisyah Putri",
    major: "Komunikasi Penyiaran Islam",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face",
    website: "https://aisyahputri.media",
  },
  {
    id: 7,
    name: "Umar Farouk",
    major: "Manajemen",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face",
    website: "https://umarfarouk.biz",
  },
  {
    id: 8,
    name: "Khadijah Salma",
    major: "Pendidikan Guru Madrasah Ibtidaiyah",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face",
    website: "https://khadijahsalma.edu",
  },
  {
    id: 9,
    name: "Ali Imran",
    major: "Akuntansi",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop&crop=face",
    website: "https://aliimran.finance",
  },
  {
    id: 10,
    name: "Mariam Salsabila",
    major: "Ilmu Perpustakaan",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face",
    website: "https://mariamsalsabila.lib",
  },
  {
    id: 11,
    name: "Yusuf Mansur",
    major: "Sistem Informasi",
    image:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop&crop=face",
    website: "https://yusufmansur.tech",
  },
  {
    id: 12,
    name: "Hafizah Qonita",
    major: "Tadris Bahasa Inggris",
    image:
      "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=300&h=400&fit=crop&crop=face",
    website: "https://hafizahqonita.teach",
  },
  {
    id: 13,
    name: "Bilal Mubarak",
    major: "Perbankan Syariah",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=400&fit=crop&crop=face",
    website: "https://bilalmubarak.bank",
  },
  {
    id: 14,
    name: "Rahmah Fitri",
    major: "Bimbingan Konseling Islam",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop&crop=face",
    website: "https://rahmahfitri.counsel",
  },
  {
    id: 15,
    name: "Zaid Abdullah",
    major: "Ilmu Al-Quran dan Tafsir",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=400&fit=crop&crop=face",
    website: "https://zaidabdullah.quran",
  },
];

export default class ProfilePage {
  async render() {
    return `
      <section class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col xl:flex-row gap-8">
            
            <!-- Sidebar -->
            <div class="lg:w-64 shrink-0">
              <div class="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-8">
                <div class="p-6">
                  <h2 class="text-xl font-bold text-gray-800 mb-6">Navigation</h2>
                  <nav class="space-y-2">
                    <a href="#/logbook" class="flex items-center px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                      <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                      </svg>
                      Logbook
                    </a>
                    <a href="#/logbook-individu" class="flex items-center px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-medium transition-colors">
                      <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                      </svg>
                      Logbook individu
                    </a>
                  </nav>
                </div>
              </div>
            </div>

            <!-- Main Content -->
            <div class="flex-1">
              <!-- Header -->
              <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Profile Tim KKN</h1>
                <p class="text-gray-600">Kenali anggota tim KKN UIN Sunan Gunung Djati Bandung</p>
              </div>

              <!-- Stats Cards -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm text-gray-600">Total Anggota</p>
                      <p class="text-2xl font-bold text-gray-900">15</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm text-gray-600">Fakultas</p>
                      <p class="text-2xl font-bold text-gray-900">8</p>
                    </div>
                  </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm text-gray-600">Program Studi</p>
                      <p class="text-2xl font-bold text-gray-900">12</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Profile Cards Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${this.renderParticipantCards()}
              </div>
            </div>

            <!-- Right Sidebar - University Info -->
            <div class="xl:w-64 shrink-0 order-first xl:order-last">
              <div class="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-8">
                <div class="p-6">
                  <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                      </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900">KKN SISDAMAS 308</h3>
                    <p class="text-sm text-gray-600">Bandung</p>
                  </div>

                  <div class="space-y-4 text-sm text-gray-600">
                    <div>
                      <h4 class="font-semibold text-gray-800 mb-2">Program KKN</h4>
                      <p class="leading-relaxed">
                        “KKN Sisdamas” adalah singkatan dari Kuliah Kerja Nyata Mahasiswa Berbasis Pemberdayaan Masyarakat, sebuah model pelaksanaan KKN yang dikembangkan oleh UIN Sunan Gunung Djati Bandung.
                      </p>
                    </div>

                    <div>
                      <h4 class="font-semibold text-gray-800 mb-2">Lokasi KKN</h4>
                      <p class="leading-relaxed">
                        Desa Gudang<br>
                        Kecamatan Tanjungsari<br>
                        Kabupaten Sumedang, Jawa Barat
                      </p>
                    </div>

                    <div>
                      <h4 class="font-semibold text-gray-800 mb-2">Periode</h4>
                      <p class="leading-relaxed">
                        Juli - Agustus 2024<br>
                        (40 Hari Kerja)
                      </p>
                    </div>

                    <div class="pt-4 border-t border-gray-200">
                      <p class="text-xs text-gray-500 leading-relaxed">
                        © 2024 Tim KKN UIN SGD<br>
                        Kelompok 308 - Tanjungsari
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderParticipantCards() {
    return kknParticipants
      .map(
        (participant) => `
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <!-- Image Section - No padding, rectangular with more height -->
        <div class="relative">
          <img 
            src="${participant.image}" 
            alt="${participant.name}"
            class="w-full h-64 object-cover"
            onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
              participant.name
            )}&background=6366f1&color=fff&size=300x400'"
          />
          <!-- Status indicator -->
          <div class="absolute top-3 right-3 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
        
        <!-- Content Section -->
        <div class="p-6">
          <div class="text-center mb-4">
            <h3 class="text-lg font-bold text-gray-900 mb-1">${
              participant.name
            }</h3>
            <p class="text-sm text-indigo-600 font-medium mb-2">${
              participant.major
            }</p>
            <div class="flex items-center justify-center text-xs text-gray-500">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"></path>
                <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z"></path>
              </svg>
              UIN Sunan Gunung Djati
            </div>
          </div>
          
          <div class="flex space-x-2">
            <a 
              href="${participant.website}" 
              target="_blank" 
              class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center group"
            >
              <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd"></path>
              </svg>
              Website
            </a>
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-lg transition-colors duration-200 group">
              <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }
}
