const PATIENTS_DB = [
  {
    id: "P001",
    nama: "Umar Patek",
    nik: "3201010101800001",
    tanggal_lahir: "1980-01-01",
    jenis_kelamin: "Laki-laki",
    golongan_darah: "A",
    alamat: "Jl. Merdeka No. 1, Jakarta Pusat",
    no_telp: "08123456789",
    no_bpjs: "0001234567890",
    riwayat: [
      {
        tanggal: "2024-11-15",
        diagnosa: "Hipertensi Grade 1",
        tindakan: "Pemberian obat antihipertensi (Amlodipine 5mg)",
        dokter: "dr. Siti Rahayu, Sp.JP"
      },
      {
        tanggal: "2024-12-03",
        diagnosa: "Kontrol Hipertensi",
        tindakan: "Pemeriksaan tekanan darah, perpanjang resep",
        dokter: "dr. Siti Rahayu, Sp.JP"
      },
      {
        tanggal: "2025-01-20",
        diagnosa: "ISPA ringan",
        tindakan: "Pemberian antibiotik dan vitamin C",
        dokter: "dr. Ahmad Fauzi, Sp.PD"
      }
    ]
  },
  {
    id: "P002",
    nama: "Megatron SOE",
    nik: "3201020202900002",
    tanggal_lahir: "1990-02-02",
    jenis_kelamin: "Perempuan",
    golongan_darah: "O",
    alamat: "Jl. Sudirman No. 45, Jakarta Selatan",
    no_telp: "08987654321",
    no_bpjs: "0009876543210",
    riwayat: [
      {
        tanggal: "2024-10-05",
        diagnosa: "Diabetes Mellitus Tipe 2",
        tindakan: "Pemeriksaan gula darah, diet konsultasi, Metformin 500mg",
        dokter: "dr. Ahmad Fauzi, Sp.PD"
      },
      {
        tanggal: "2024-12-18",
        diagnosa: "Kontrol DM",
        tindakan: "Cek HbA1c, penyesuaian dosis insulin",
        dokter: "dr. Ahmad Fauzi, Sp.PD"
      }
    ]
  },
  {
    id: "P003",
    nama: "Anwar Kongo",
    nik: "3201030303950003",
    tanggal_lahir: "1995-03-03",
    jenis_kelamin: "Laki-laki",
    golongan_darah: "B",
    alamat: "Jl. Gatot Subroto No. 12, Bandung",
    no_telp: "08765432100",
    no_bpjs: "0005678901234",
    riwayat: [
      {
        tanggal: "2025-01-10",
        diagnosa: "Gastritis akut",
        tindakan: "Pemberian antasida dan omeprazole",
        dokter: "dr. Linda Permata, Sp.GEH"
      },
      {
        tanggal: "2025-02-14",
        diagnosa: "Cedera lutut kiri",
        tindakan: "Rontgen, pemberian analgetik, fisioterapi",
        dokter: "dr. Hendra Wijaya, Sp.OT"
      },
      {
        tanggal: "2025-03-01",
        diagnosa: "Kontrol pasca fisioterapi",
        tindakan: "Evaluasi ROM lutut, lanjut fisioterapi",
        dokter: "dr. Hendra Wijaya, Sp.OT"
      }
    ]
  },
  {
    id: "P004",
    nama: "Alisa Subandrek",
    nik: "3201040404850004",
    tanggal_lahir: "1985-04-04",
    jenis_kelamin: "Perempuan",
    golongan_darah: "AB",
    alamat: "Jl. Pahlawan No. 78, Surabaya",
    no_telp: "08111222333",
    no_bpjs: "0002345678901",
    riwayat: [
      {
        tanggal: "2024-09-22",
        diagnosa: "Migren kronik",
        tindakan: "MRI kepala, pemberian triptan",
        dokter: "dr. Bambang Nugroho, Sp.N"
      },
      {
        tanggal: "2025-01-30",
        diagnosa: "Alergi rhinitis",
        tindakan: "Skin prick test, antihistamin cetirizine",
        dokter: "dr. Ratna Dewi, Sp.THT"
      }
    ]
  },
  {
    id: "P005",
    nama: "Edward Ninga",
    nik: "3201050505750005",
    tanggal_lahir: "1975-05-05",
    jenis_kelamin: "Laki-laki",
    golongan_darah: "A",
    alamat: "Jl. Diponegoro No. 33, Yogyakarta",
    no_telp: "08444555666",
    no_bpjs: "0007890123456",
    riwayat: [
      {
        tanggal: "2024-08-15",
        diagnosa: "Penyakit Jantung Koroner",
        tindakan: "EKG, kateterisasi jantung, statin + aspirin",
        dokter: "dr. Siti Rahayu, Sp.JP"
      },
      {
        tanggal: "2024-11-25",
        diagnosa: "Kontrol PJK + Hipertensi",
        tindakan: "Echocardiogram, penyesuaian dosis obat",
        dokter: "dr. Siti Rahayu, Sp.JP"
      },
      {
        tanggal: "2025-02-08",
        diagnosa: "Kontrol rutin",
        tindakan: "Cek lipid profile, lanjut terapi",
        dokter: "dr. Siti Rahayu, Sp.JP"
      }
    ]
  }
];
