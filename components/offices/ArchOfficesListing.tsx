"use client";

import { useCallback, useEffect, useState } from "react";
import OfficeCard1 from "@/components/offices/OfficeCard1";
import OfficeDetailModal from "@/components/offices/OfficeDetailModal";
import ArchOfficesEmptyState from "@/components/offices/ArchOfficesEmptyState";
import ArchOfficesPageHeader from "@/components/offices/ArchOfficesPageHeader";
import OfficesGridSkeleton from "@/components/skeletons/OfficesGridSkeleton";
import type { Office } from "@/types/office";
import { fetchOffices, filterPublicOffices } from "@/lib/offices";

export default function ArchOfficesListing() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);

  const loadOffices = useCallback(async () => {
    setLoading(true);
    setLoadFailed(false);

    try {
      const { offices: fetched, ok } = await fetchOffices();
      if (!ok) {
        setLoadFailed(true);
        return;
      }
      setOffices(filterPublicOffices(fetched));
    } catch {
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadOffices();
  }, [loadOffices]);

  return (
    <>
      <section className="arch-offices-page tf-container tf-spacing-1">
        <ArchOfficesPageHeader />

        {loading ? (
          <OfficesGridSkeleton
            showHeading={false}
            className="arch-offices-page__grid-skeleton"
          />
        ) : loadFailed ? (
          <ArchOfficesEmptyState variant="error" onRetry={loadOffices} />
        ) : offices.length === 0 ? (
          <ArchOfficesEmptyState variant="empty" />
        ) : (
          <div className="tf-grid-layout xxl-col-6 xl-col-5 lg-col-4 md-col-3 sm-col-2">
            {offices.map((office) => (
              <OfficeCard1
                key={office._id}
                office={office}
                onOpen={setSelectedOffice}
              />
            ))}
          </div>
        )}
      </section>

      {selectedOffice ? (
        <OfficeDetailModal
          office={selectedOffice}
          onClose={() => setSelectedOffice(null)}
        />
      ) : null}
    </>
  );
}
