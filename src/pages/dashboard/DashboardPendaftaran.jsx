import React from "react";
import DashboardCrudPage from "@/pages/dashboard/DashboardCrudPage";

const DashboardPendaftaran = () => {
  return (
    <div data-testid="dashboard-pendaftaran">
      <DashboardCrudPage
        title="Pendaftaran"
        badgeClass="bg-pastel-peach"
        resource="/registrations"
        columns={[
          { key: "nama", label: "Nama" },
          { key: "email", label: "Email" },
          { key: "telepon", label: "Telepon" },
          { key: "angkatan", label: "Angkatan" },
          { key: "tanggal_daftar", label: "Tanggal", render: (v) => String(v ?? "").slice(0, 10) }
        ]}
        fields={[
          { key: "nama", label: "Nama" },
          { key: "email", label: "Email" },
          { key: "telepon", label: "Telepon" },
          { key: "angkatan", label: "Angkatan" },
          { key: "alasan", label: "Alasan", type: "textarea", fullWidth: true }
        ]}
        defaultSortKey="tanggal_daftar"
        sortKeys={["tanggal_daftar", "nama", "angkatan"]}
        searchKeys={["nama", "email", "telepon", "angkatan", "alasan"]}
      />
    </div>
  );
};

export default DashboardPendaftaran;
