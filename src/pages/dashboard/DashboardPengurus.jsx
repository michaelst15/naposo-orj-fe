import React from "react";
import DashboardCrudPage from "@/pages/dashboard/DashboardCrudPage";

const DashboardPengurus = () => {
  return (
    <div data-testid="dashboard-pengurus">
      <DashboardCrudPage
        title="Pengurus"
        badgeClass="bg-pastel-lavender"
        resource="/pengurus"
        columns={[
          { key: "nama", label: "Nama" },
          { key: "posisi", label: "Posisi" },
          { key: "urutan", label: "Urutan" }
        ]}
        fields={[
          { key: "nama", label: "Nama" },
          { key: "posisi", label: "Posisi" },
          { key: "foto", label: "Foto", type: "image", fullWidth: true },
          { key: "bio", label: "Bio", type: "textarea", fullWidth: true },
          { key: "urutan", label: "Urutan", type: "number" }
        ]}
        defaultSortKey="urutan"
        sortKeys={["urutan", "nama", "posisi"]}
        searchKeys={["nama", "posisi", "bio"]}
      />
    </div>
  );
};

export default DashboardPengurus;
