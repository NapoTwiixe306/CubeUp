"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import { Clock, ChartNoAxesColumn, Calendar, Trophy } from "lucide-react";

export default function Overview() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [open, setOpen] = useState(false);

  const TABLE_HEAD = ["Time", "Cube", "Scramble", "Date"];
  const TABLE_ROW = [
    { Time: "7.84", Cube: "3x3", Scramble: "R U R' U R U2 R'", Date: "2024-03-01" },
    { Time: "8.12", Cube: "3x3", Scramble: "F R U R' U' F'", Date: "2024-03-02" },
    { Time: "9.45", Cube: "3x3", Scramble: "L U2 L' U2 L U L'", Date: "2024-03-03" },
  ];

  return (
    <div className="p-4 ">
      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-6 border-2 border-gray-300 dark:border-gray-700 p-3 rounded-md">
          <div className="flex justify-between">
            <h1 className="font-bold">Meilleur Temps (3x3)</h1>
            <Clock className="text-gray-900 dark:text-white" />
          </div>
          <p className="text-4xl font-bold">7.84s</p>
          <p className="text-gray-500">Personal Best</p>
        </div>
        <div className="flex flex-col gap-6 border-2 border-gray-300 dark:border-gray-700 p-3 rounded-md">
          <div className="flex justify-between">
            <h1 className="font-bold">Moyenne (Avg)</h1>
            <ChartNoAxesColumn className="text-gray-900 dark:text-white" />
          </div>
          <p>Ao5 : <span className="text-gray-500 font-bold">8.12s</span></p>
          <p>Ao12 : <span className="text-gray-500 font-bold">8.45s</span></p>
          <p>Ao100 : <span className="text-gray-500 font-bold">9.01s</span></p>
        </div>
        <div className="flex flex-col gap-6 border-2 border-gray-300 dark:border-gray-700 p-3 rounded-md">
          <div className="flex justify-between">
            <h1 className="font-bold">Stats & Ranking</h1>
            <Trophy className="text-gray-900 dark:text-white" />
          </div>
          <div className="flex justify-between">
            <p className="font-bold text-2xl">Gold</p>
            <p className="font-bold text-2xl">1467</p>
          </div>
          <p className="text-gray-500">1450 Elo - Résolutions</p>
        </div>
      </div>

      {/* Sélection de la date et du type de cube */}
      <div className="relative mt-12 flex flex-wrap gap-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center space-x-2 p-2 border-2 rounded-lg text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
        >
          <Calendar className="w-5 h-5 text-gray-900 dark:text-white" />
          <span className="font-semibold">
            {startDate && endDate
              ? `${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`
              : "Sélectionner une date"}
          </span>
        </button>

        <select className="px-3 border-2 rounded-lg bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-gray-700">
          <option value="2x2">2x2</option>
          <option value="3x3">3x3</option>
          <option value="3x3_OH">3x3 OH</option>
          <option value="4x4">4x4</option>
        </select>

        {open && (
          <div className="absolute top-full left-0 mt-2 p-4 z-50">
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(dates) => {
                const [start, end] = dates as [Date | null, Date | null];
                setStartDate(start);
                setEndDate(end);
              }}
              inline
            />
          </div>
        )}
      </div>

      {/* Table Responsive */}
      <div className="mt-8 overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th key={index} className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            {TABLE_ROW.map((row, index) => (
              <tr key={index} className="border-t border-gray-300 dark:border-gray-700">
                <td className="px-4 py-2 whitespace-nowrap">{row.Time}</td>
                <td className="px-4 py-2 whitespace-nowrap">{row.Cube}</td>
                <td className="px-4 py-2 whitespace-nowrap">{row.Scramble}</td>
                <td className="px-4 py-2 whitespace-nowrap">{row.Date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
