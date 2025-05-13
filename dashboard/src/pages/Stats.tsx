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