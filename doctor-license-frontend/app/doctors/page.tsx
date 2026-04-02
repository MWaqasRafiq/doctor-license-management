"use client";

import { useEffect, useState } from "react";
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from "@/services/api";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Filter States
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<number | undefined>();

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDoctors();
    }, 500);
    return () => clearTimeout(delay);
  }, [search, status]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await getDoctors(search, status);
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingDoctor(null);
    setIsModalOpen(true);
  };

  const openEditModal = (doctor: any) => {
    setEditingDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        
        const formData = new FormData(e.currentTarget);
        
        const payload: any = {
            fullName: formData.get("fullName"),
            email: formData.get("email"),
            specialization: formData.get("specialization"),
            licenseNumber: formData.get("licenseNumber"),
            licenseExpiryDate: new Date(formData.get("expiryDate") as string).toISOString(),
            status: Number(formData.get("status")),
            isDeleted: false,
            createdDate: editingDoctor?.createdDate || new Date().toISOString(),
        };

        try {
            if (editingDoctor) {
                payload.id = editingDoctor.id; 
            await updateDoctor(payload);
            } else {
                payload.id = crypto.randomUUID(); 
            await createDoctor(payload);
            }

            await fetchDoctors();
            setIsModalOpen(false);
        } catch (err: any) {
            console.error("Payload sent:", payload);
            console.error("Server Error:", err.response?.data);
            alert("Save failed. Check console for validation errors.");
        } finally {
            setIsSaving(false);
        }
    };
    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this doctor?")) {
            return;
        }
        try {
            await deleteDoctor(id);
            
            setDoctors(doctors.filter((d: any) => d.id !== id));
            
            console.log("Doctor deleted successfully");
        } catch (err: any) {
            console.error("Delete failed:", err.response?.data);
            alert("Failed to delete the record. The server might be preventing this action.");
        }
    };
  return (
    <div className="p-8 max-w-[1400px] mx-auto bg-slate-50 min-h-screen font-sans">
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Doctor Portal</h1>
          <p className="text-slate-500 mt-1">Manage medical licenses and verification status.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
          Add New Doctor
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative md:col-span-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <input
            type="text"
            placeholder="Search by name or license..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>

        <select
          value={status ?? ""}
          onChange={(e) => setStatus(e.target.value ? Number(e.target.value) : undefined)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium outline-none cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="1">Active</option>
          <option value="2">Expired</option>
          <option value="3">Suspended</option>
        </select>

        <button
          onClick={() => { setSearch(""); setStatus(undefined); }}
          className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 py-2.5 rounded-xl font-bold transition-all text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Reset
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-32">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-blue-600 mb-4"></div>
            <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Syncing Database</p>
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center p-32">
            <p className="text-slate-400 text-lg font-medium">No records found matching your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-8 py-5">Doctor Name</th>
                  <th className="px-8 py-5">Email</th>
                  <th className="px-8 py-5">Specialization</th>
                  <th className="px-8 py-5">License ID</th>
                  <th className="px-8 py-5">Expiry Date</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {doctors.map((d: any) => (
                  <tr key={d.id} className="hover:bg-blue-50/20 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{d.fullName}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{d.email}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{d.specialization}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-mono text-sm font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-lg">
                        {d.licenseNumber}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-600 font-medium">
                      {new Date(d.licenseExpiryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-8 py-6">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3 ">
                        <button onClick={() => openEditModal(d)} className="text-slate-400 hover:text-blue-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button onClick={() => handleDelete(d.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100">
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {editingDoctor ? 'Edit Doctor' : 'New Doctor'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="bg-slate-50 p-2 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-10 space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                <input name="fullName" defaultValue={editingDoctor?.fullName} required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" placeholder="Dr. John Watson" />
              </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email</label>
                    <input 
                    name="email" 
                    defaultValue={editingDoctor?.email || ""} 
                    required 
                    type="email" 
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Specialization</label>
                    <input 
                    name="specialization" 
                    defaultValue={editingDoctor?.specialization || ""} 
                    required 
                    type="text" 
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none" 
                    />
                </div>
            </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">License ID</label>
                  <input name="licenseNumber" defaultValue={editingDoctor?.licenseNumber} required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium" placeholder="MD-8822" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Status</label>
                  <select name="status" defaultValue={editingDoctor?.status || 1} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none cursor-pointer font-bold">
                    <option value="1">Active</option>
                    <option value="2">Expired</option>
                    <option value="3">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Expiration Date</label>
                <input name="expiryDate" defaultValue={editingDoctor?.licenseExpiryDate ? new Date(editingDoctor.licenseExpiryDate).toISOString().split('T')[0] : ''} required type="date" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium" />
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-4 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl transition-all">Cancel</button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex-2 px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: number }) {
  const styles: any = {
    1: "bg-emerald-50 text-emerald-600 border-emerald-100",
    2: "bg-rose-50 text-rose-600 border-rose-100",
    3: "bg-amber-50 text-amber-600 border-amber-100"
  };

  const text: any = { 1: "Active", 2: "Expired", 3: "Suspended" };

  return (
    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter border-2 ${styles[status]}`}>
      {text[status]}
    </span>
  );
}