"use client";
import React, { useEffect, useState } from "react";

interface Image {
  id: number;
  path: string;
}

interface FinalReport {
  id?: number;
  bLNo: string;
  consignee: string;
  marks: string;
  qtyPkgs: number;
  remarks: string;
  pallet: string;
  legend: string;
  images: Image[];
}

const FinalReportsComponent: React.FC = () => {
  const [finalReports, setFinalReports] = useState<FinalReport[]>([]);
  const [formData, setFormData] = useState<FinalReport>({
    bLNo: "Default BL No",
    consignee: "Default Consignee",
    marks: "Default Marks",
    qtyPkgs: 2,
    remarks: "Default Remarks",
    legend: "Default Legend",
    pallet: "shrink-wrap film stretch torn off + torn paper bags",
    images: [],
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchFinalReports();
  }, []);

  const fetchFinalReports = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/final-report`);
    const data = await response.json();
    setFinalReports(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/final-report/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(`Final report updated with ID: ${data.id}`);
          console.log(data);
        });
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/final-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // alert(`Final report created with ID: ${data.id}`);
          console.log(data);
        });
    }
    resetForm();
    fetchFinalReports();
  };

  const handleEdit = (report: FinalReport) => {
    setEditingId(report.id || null);
    setFormData(report);
  };

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/final-report/${id}`, {
      method: "DELETE",
    });
    fetchFinalReports();
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      bLNo: "Default BL No",
      consignee: "Default Consignee",
      marks: "Default Marks",
      qtyPkgs: 1,
      remarks: "Default Remarks",
      pallet: "shrink-wrap film stretch torn off + torn paper bags",
      legend: "Default Legend",
      images: [],
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Final Reports</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label>
            <span className="block text-sm font-medium">BL No</span>
            <input type="text" name="bLNo" value={formData.bLNo} onChange={handleChange} placeholder="BL No" required className="p-2 border border-gray-300 rounded" />
          </label>
          <label>
            <span className="block text-sm font-medium">Consignee</span>
            <input
              type="text"
              name="consignee"
              value={formData.consignee}
              onChange={handleChange}
              placeholder="Consignee"
              required
              className="p-2 border border-gray-300 rounded"
            />
          </label>
        </div>

        <div className="mb-4">
          <label>
            <span className="block text-sm font-medium">Marks</span>
            <textarea name="marks" value={formData.marks} onChange={handleChange} placeholder="Marks" required className="p-2 border border-gray-300 rounded w-full" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label>
            <span className="block text-sm font-medium">Quantity of Packages</span>
            <input
              type="number"
              name="qtyPkgs"
              value={formData.qtyPkgs}
              onChange={handleChange}
              placeholder="Quantity of Packages"
              required
              className="p-2 border border-gray-300 rounded"
            />
          </label>
          <label>
            <span className="block text-sm font-medium">Remarks</span>
            <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Remarks" required className="p-2 border border-gray-300 rounded w-full" />
          </label>
        </div>

        <div className="mb-4">
          <label>
            <span className="block text-sm font-medium">Pallet</span>
            <input type="text" name="pallet" value={formData.pallet} onChange={handleChange} placeholder="Pallet" required className="p-2 border border-gray-300 rounded w-full" />
          </label>
        </div>

        <div className="mb-4">
          <label>
            <span className="block text-sm font-medium">Legend</span>
            <textarea name="legend" value={formData.legend} onChange={handleChange} placeholder="Legend" required className="p-2 border border-gray-300 rounded w-full" />
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {editingId ? "Update" : "Create"}
          </button>
          <button type="button" onClick={resetForm} className="bg-gray-300 p-2 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </form>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">BL No</th>
            <th className="py-2 px-4 border-b">Consignee</th>
            <th className="py-2 px-4 border-b">Marks</th>
            <th className="py-2 px-4 border-b">Quantity of Packages</th>
            <th className="py-2 px-4 border-b">Remarks</th>
            <th className="py-2 px-4 border-b">Pallet</th> {/* Added Pallet header */}
            <th className="py-2 px-4 border-b">Legend</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {finalReports.map((report) => (
            <tr key={report.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{report.bLNo}</td>
              <td className="py-2 px-4 border-b">{report.consignee}</td>
              <td className="py-2 px-4 border-b">{report.marks}</td>
              <td className="py-2 px-4 border-b">{report.qtyPkgs}</td>
              <td className="py-2 px-4 border-b">{report.remarks}</td>
              <td className="py-2 px-4 border-b">{report.pallet}</td> {/* Display Pallet */}
              <td className="py-2 px-4 border-b">{report.legend}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEdit(report)} className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button onClick={() => handleDelete(report.id!)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600 ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinalReportsComponent;
