import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

const mockStats = {
  totaalKlanten: 5251,
  zendingenVandaag: 7916,
  maandZendingen: 59525,
  jaarOmzet: 65152,
};

const omzetData = [
  { maand: 'Jan', omzet: 4000 },
  { maand: 'Feb', omzet: 3000 },
  { maand: 'Mar', omzet: 5000 },
  { maand: 'Apr', omzet: 4780 },
  { maand: 'Mei', omzet: 5890 },
  { maand: 'Jun', omzet: 6390 },
  { maand: 'Jul', omzet: 7490 },
  { maand: 'Aug', omzet: 8000 },
  { maand: 'Sep', omzet: 7000 },
  { maand: 'Okt', omzet: 6700 },
  { maand: 'Nov', omzet: 7200 },
  { maand: 'Dec', omzet: 8100 },
];

const zendingenData = [
  { dag: 'Ma', aantal: 1200 },
  { dag: 'Di', aantal: 2100 },
  { dag: 'Wo', aantal: 800 },
  { dag: 'Do', aantal: 1600 },
  { dag: 'Vr', aantal: 900 },
  { dag: 'Za', aantal: 1700 },
  { dag: 'Zo', aantal: 1100 },
];

const Stats = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-white mb-4">Statistieken</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-indigo-900 rounded-lg p-6">
        <p className="text-gray-300 mb-2">Totaal klanten</p>
        <h2 className="text-3xl font-bold text-white">{mockStats.totaalKlanten}</h2>
      </div>
      <div className="bg-indigo-900 rounded-lg p-6">
        <p className="text-gray-300 mb-2">Zendingen vandaag</p>
        <h2 className="text-3xl font-bold text-white">{mockStats.zendingenVandaag}</h2>
      </div>
      <div className="bg-indigo-900 rounded-lg p-6">
        <p className="text-gray-300 mb-2">Maandelijkse zendingen</p>
        <h2 className="text-3xl font-bold text-white">{mockStats.maandZendingen}</h2>
      </div>
      <div className="bg-indigo-900 rounded-lg p-6">
        <p className="text-gray-300 mb-2">Jaarlijkse omzet</p>
        <h2 className="text-3xl font-bold text-white">€{mockStats.jaarOmzet}</h2>
      </div>
    </div>

    <div className="bg-indigo-900 rounded-lg p-6">
      <h3 className="text-white font-semibold mb-4">Omzet per maand</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={omzetData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="maand" stroke="#c7d2fe" />
          <YAxis stroke="#c7d2fe" />
          <Tooltip />
          <Bar dataKey="omzet" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-indigo-900 rounded-lg p-6">
      <h3 className="text-white font-semibold mb-4">Zendingen deze week</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={zendingenData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dag" stroke="#c7d2fe" />
          <YAxis stroke="#c7d2fe" />
          <Tooltip />
          <Line type="monotone" dataKey="aantal" stroke="#fbbf24" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default Stats;