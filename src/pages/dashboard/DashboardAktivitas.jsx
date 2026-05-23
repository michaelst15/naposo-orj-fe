import React from "react";
import DashboardCrudPage from "@/pages/dashboard/DashboardCrudPage";

const DashboardAktivitas = () => {
  return (
    <div data-testid="dashboard-aktivitas">
      <DashboardCrudPage
        title="Aktivitas"
        badgeClass="bg-pastel-mint"
        resource="/activities"
        columns={[
          { key: "judul", label: "Judul" },
          { key: "tanggal", label: "Tanggal" },
          { key: "status", label: "Status" }
        ]}
        fields={[
          { key: "judul", label: "Judul", fullWidth: true },
          { key: "tanggal", label: "Tanggal" },
          { key: "status", label: "Status" },
          { key: "gambar", label: "Gambar", type: "image", fullWidth: true },
          { key: "deskripsi", label: "Deskripsi", type: "textarea", fullWidth: true }
        ]}
        defaultSortKey="tanggal"
        sortKeys={["tanggal", "judul", "status"]}
        searchKeys={["judul", "status", "deskripsi"]}
      />
    </div>
  );
};

export default DashboardAktivitas;
