import React from "react";
import DashboardCrudPage from "@/pages/dashboard/DashboardCrudPage";

const DashboardGaleri = () => {
  return (
    <div data-testid="dashboard-galeri">
      <DashboardCrudPage
        title="Galeri"
        badgeClass="bg-pastel-blue"
        resource="/gallery"
        columns={[
          { key: "judul", label: "Judul" },
          { key: "tanggal", label: "Tanggal" }
        ]}
        fields={[
          { key: "judul", label: "Judul", fullWidth: true },
          { key: "tanggal", label: "Tanggal" },
          { key: "gambar", label: "Gambar", type: "image", fullWidth: true },
          { key: "deskripsi", label: "Deskripsi", type: "textarea", fullWidth: true }
        ]}
        defaultSortKey="tanggal"
        sortKeys={["tanggal", "judul"]}
        searchKeys={["judul", "deskripsi"]}
      />
    </div>
  );
};

export default DashboardGaleri;
