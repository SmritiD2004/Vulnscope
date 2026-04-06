"use client";

import { useState, useMemo } from "react";
import { Target } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2, Plus, Search, ChevronUp, ChevronDown } from "lucide-react";
import AddTargetModal from "./add-target-modal";
import EditTargetModal from "./edit-target-modal";
import DeleteConfirmationModal from "./delete-confirmation-modal";

const SortIcon = ({ column, sortKey, sortOrder }: { column: SortKey; sortKey: SortKey; sortOrder: SortOrder }) => {
  if (sortKey !== column) return <div className="w-4 h-4" />;
  return sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
};

interface TargetTableProps {
  targets: Target[];
  onAddTarget: (target: Omit<Target, "id" | "createdAt" | "updatedAt">) => void;
  onEditTarget: (id: string, updates: Partial<Target>) => void;
  onDeleteTarget: (id: string) => void;
  isLoading?: boolean;
}

type SortKey = "name" | "type" | "url" | "environment" | "status" | "riskLevel";
type SortOrder = "asc" | "desc";

const statusColors: Record<Target["status"], string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  inactive: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  unreachable: "bg-red-500/20 text-red-400 border-red-500/30",
};

const riskColors: Record<Target["riskLevel"], string> = {
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function TargetTable({
  targets,
  onAddTarget,
  onEditTarget,
  onDeleteTarget,
  isLoading = false,
}: TargetTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Target | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Target | null>(null);

  // Filter and sort targets
  const filteredAndSortedTargets = useMemo(() => {
    const filtered = targets.filter(
      (target) =>
        target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        target.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        target.ipAddress?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [targets, searchTerm, sortKey, sortOrder]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };


  return (
    <>
      <Card>
        <div className="p-6 border-b border-slate-700 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Targets</h2>
              <p className="text-sm text-dimtext mt-1">
                {filteredAndSortedTargets.length} target{filteredAndSortedTargets.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Button
              onClick={() => setAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              disabled={isLoading}
            >
              <Plus className="h-4 w-4" />
              Add Target
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dimtext" />
            <input
              type="text"
              placeholder="Search by name, URL, or IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => toggleSort("name")}
                    className="flex items-center gap-2 font-semibold text-white hover:text-blue-400 transition-colors"
                  >
                    Name
                    <SortIcon column="name" sortKey={sortKey} sortOrder={sortOrder} />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => toggleSort("url")}
                    className="flex items-center gap-2 font-semibold text-white hover:text-blue-400 transition-colors"
                  >
                    URL / IP
                    <SortIcon column="url" sortKey={sortKey} sortOrder={sortOrder} />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => toggleSort("type")}
                    className="flex items-center gap-2 font-semibold text-white hover:text-blue-400 transition-colors"
                  >
                    Type
                    <SortIcon column="type" sortKey={sortKey} sortOrder={sortOrder} />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => toggleSort("environment")}
                    className="flex items-center gap-2 font-semibold text-white hover:text-blue-400 transition-colors"
                  >
                    Environment
                    <SortIcon column="environment" sortKey={sortKey} sortOrder={sortOrder} />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => toggleSort("status")}
                    className="flex items-center gap-2 font-semibold text-white hover:text-blue-400 transition-colors"
                  >
                    Status
                    <SortIcon column="status" sortKey={sortKey} sortOrder={sortOrder} />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => toggleSort("riskLevel")}
                    className="flex items-center gap-2 font-semibold text-white hover:text-blue-400 transition-colors"
                  >
                    Risk
                    <SortIcon column="riskLevel" sortKey={sortKey} sortOrder={sortOrder} />
                  </button>
                </th>
                <th className="px-6 py-4 text-right font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTargets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <p className="text-dimtext">No targets found</p>
                  </td>
                </tr>
              ) : (
                filteredAndSortedTargets.map((target) => (
                  <tr
                    key={target.id}
                    className="border-b border-slate-700 hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{target.name}</p>
                      {target.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {target.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {target.tags.length > 2 && (
                            <span className="text-xs text-dimtext">
                              +{target.tags.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-white font-mono break-all">{target.url}</p>
                        {target.ipAddress && (
                          <p className="text-xs text-dimtext font-mono">{target.ipAddress}</p>
                        )}
                        {target.port && (
                          <p className="text-xs text-dimtext">Port: {target.port}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm bg-slate-700/50 text-slate-300 px-2.5 py-1 rounded inline-block capitalize">
                        {target.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm capitalize text-white">
                        {target.environment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded border inline-block capitalize ${statusColors[target.status]}`}
                      >
                        {target.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded border inline-block capitalize ${riskColors[target.riskLevel]}`}
                      >
                        {target.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditTarget(target)}
                          className="p-2 hover:bg-slate-700 rounded transition-colors text-blue-400 hover:text-blue-300"
                          title="Edit target"
                          disabled={isLoading}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(target)}
                          className="p-2 hover:bg-slate-700 rounded transition-colors text-red-400 hover:text-red-300"
                          title="Delete target"
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modals */}
      <AddTargetModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={(target) => {
          onAddTarget(target);
          setAddModalOpen(false);
        }}
        isLoading={isLoading}
      />

      <EditTargetModal
        isOpen={editTarget !== null}
        target={editTarget}
        onClose={() => setEditTarget(null)}
        onEdit={(id, updates) => {
          onEditTarget(id, updates);
          setEditTarget(null);
        }}
        isLoading={isLoading}
      />

      <DeleteConfirmationModal
        isOpen={deleteTarget !== null}
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={(id) => {
          onDeleteTarget(id);
          setDeleteTarget(null);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
