import React from "react";
import DashboardCrudPage from "@/pages/dashboard/DashboardCrudPage";

const DashboardNaposo = () => {
  return (
    <div data-testid="dashboard-naposo">
      <DashboardCrudPage
        title="Naposo"
        badgeClass="bg-pastel-yellow"
        resource="/members"
        columns={[
          { key: "nama", label: "Nama" },
          { key: "angkatan", label: "Angkatan" },
          { key: "posisi", label: "Posisi" },
          { key: "kontak", label: "Kontak" }
        ]}
        fields={[
          { key: "nama", label: "Nama" },
          { key: "angkatan", label: "Angkatan" },
          { key: "posisi", label: "Posisi" },
          { key: "foto", label: "Foto", type: "image", fullWidth: true },
          { key: "bio", label: "Bio", type: "textarea", fullWidth: true },
          { key: "kontak", label: "Kontak" }
        ]}
        defaultSortKey="nama"
        sortKeys={["nama", "angkatan", "posisi"]}
        searchKeys={["nama", "angkatan", "posisi", "kontak"]}
      />
    </div>
  );
};

export default DashboardNaposo;
