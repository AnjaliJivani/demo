"use client";

import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string;
  enrollno: number;
};

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({ name: "", enrollno: "" });

  async function loadStudents() {
    const res = await fetch("/api/student");
    const data = await res.json();
    setStudents(data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", enrollno: "" });
    loadStudents();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Manager</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-xl shadow mb-10"
      >
        <input
          className="w-full border p-2 mb-3"
          placeholder="Student Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="number"
          className="w-full border p-2 mb-4"
          placeholder="Enrollment No"
          value={form.enrollno}
          onChange={(e) => setForm({ ...form, enrollno: e.target.value })}
          required
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Add Student
        </button>
      </form>

      {/* LIST */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {students.map((s) => (
          <div key={s.id} className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold">{s.name}</h2>
            <p className="text-gray-600">Enroll No: {s.enrollno}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
