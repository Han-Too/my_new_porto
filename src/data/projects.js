// ---------------------------------------------------------------------------
// Project modules, taken from the resume portfolio (resume/index.html).
// Each entry renders as one "system module" card in the Projects section.
//
// `images`: paths to screenshots under public/ shown in the gallery popup.
// Leave the array empty to show a "no preview available" placeholder.
// ---------------------------------------------------------------------------
export const projects = [
  {
    id: 'PROJECT_001',
    title: 'Tabersa Admin Panel',
    type: 'ADMIN PANEL',
    status: 'COMPLETED',
    year: '2023',
    stack: ['PHP', 'Laravel', 'REST API'],
    description:
      'Web ini adalah Admin Panel dari Aplikasi Tabersa. Pada admin panel ini menggunakan data yang berasal dari API Milik Tabersa yang diambil melalui bahasa pemrograman PHP dengan framework Laravel. Client: Tabersa Samskara Teknologi.',
    sourceUrl: null,
    demoUrl: null,
    images: ['/projects/tabersa/1.png'],
  },
  {
    id: 'PROJECT_002',
    title: 'Knowledge Management System',
    type: 'WEB APPLICATION',
    status: 'COMPLETED',
    year: '2022',
    stack: ['PHP', 'Laravel', 'MySQL'],
    description:
      'Sistem Manajemen Pengetahuan adalah salah satu jenis sistem TI yang menyimpan dan mengambil pengetahuan untuk meningkatkan pemahaman, kolaborasi, dan penyelarasan proses. Client: Bank BPR Sehat Sejahtera.',
    sourceUrl: null,
    demoUrl: null,
    images: ['/projects/kms/1.jpg'],
  },
  {
    id: 'PROJECT_003',
    title: 'Project Al-Quran Apps',
    type: 'MOBILE APPLICATION',
    status: 'COMPLETED',
    year: '2022',
    stack: ['Flutter', 'Public API'],
    description:
      'Aplikasi ini dibuat untuk memenuhi nilai Project yang ditentukan oleh pihak PT. Nurul Fikri Cipta Inovasi. Aplikasi ini menggunakan public api sebagai data Al-Quran.',
    sourceUrl: null,
    demoUrl: null,
    images: ['/projects/alquran/1.jpg'],
  },
  {
    id: 'PROJECT_004',
    title: 'E-Commerce Mobile Project',
    type: 'MOBILE APPLICATION',
    status: 'COMPLETED',
    year: '2022',
    stack: ['Flutter', 'REST API'],
    description:
      'Aplikasi mobile ini dibuat untuk memenuhi nilai tugas akhir dari kegiatan Studi Independen. Aplikasi ini menggunakan data yang berasal dari Rest API yang telah dibuat oleh PT. Nurul Fikri Cipta Inovasi.',
    sourceUrl: null,
    demoUrl: null,
    images: ['/projects/ecommerce/1.jpg'],
  },
  {
    id: 'PROJECT_005',
    title: 'E-Library Web',
    type: 'WEB APPLICATION',
    status: 'COMPLETED',
    year: '2022',
    stack: ['PHP', 'MySQL'],
    description:
      'Web ini dibuat guna memenuhi nilai akhir dari mata kuliah Pemrograman Web. Web ini dibuat menggunakan bahasa Pemrograman PHP dan dengan Database MySQL.',
    sourceUrl: null,
    demoUrl: null,
    images: ['/projects/elibrary/1.png'],
  },
];
