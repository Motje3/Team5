import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button
} from '@nextui-org/react';

interface Shipment {
  id: number;
  status: string;
  destination: string;
  assignedTo: string;
  expectedDelivery: string;
  weight: string;
  createdAt: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

const CustomDropdown = ({
  options,
  selected,
  setSelected,
  placeholder = "Kies een status",
}: {
  options: string[];
  selected: string | null;
  setSelected: (val: string) => void;
  placeholder?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block min-w-[200px]">
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#1E1B33] text-white w-full px-4 py-2 rounded flex justify-between items-center"
      >
        {selected || placeholder}
        <span className="ml-2 transform transition-transform" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▼
        </span>
      </button>
      {open && (
        <ul className="absolute z-10 bg-[#1E1B33] w-full mt-1 rounded shadow-lg border border-[#333]">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-[#2A2745] cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Shipments = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filtered, setFiltered] = useState<Shipment[]>([]);
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const uniqueStatuses = [...new Set(shipments.map(s => s.status))];

  useEffect(() => {
    axios.get('http://localhost:5070/api/Shipments')
      .then(res => {
        setShipments(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const lower = query.toLowerCase();
    const filteredList = shipments.filter(s =>
      (s.destination?.toLowerCase().includes(lower) ||
        s.status?.toLowerCase().includes(lower) ||
        s.assignedTo?.toLowerCase().includes(lower)) &&
      (selectedStatus ? s.status === selectedStatus : true)
    );
    setFiltered(filteredList);
  }, [query, shipments, selectedStatus]);

  const inputButtonStyle = "bg-[#1E1B33] text-white rounded";

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold text-white">Zendingen</h1>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <Input
          placeholder="Zoek op status, bestemming of toegewezen persoon"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className={`max-w-md ${inputButtonStyle}`}
        />

        <div className="flex items-center gap-4">
          <CustomDropdown
            options={uniqueStatuses}
            selected={selectedStatus}
            setSelected={setSelectedStatus}
            placeholder="Filter op status"
          />

          <Button
            className={`min-w-[200px] ${inputButtonStyle}`}
            variant="light"
            onClick={() => {
              setQuery('');
              setSelectedStatus(null);
            }}
          >
            Reset filters
          </Button>
        </div>
      </div>

      <Table aria-label="Zendingen tabel" removeWrapper>
        <TableHeader>
          <TableColumn className="text-left">ID</TableColumn>
          <TableColumn className="text-left">Status</TableColumn>
          <TableColumn className="text-left">Bestemming</TableColumn>
          <TableColumn className="text-left">Toegewezen</TableColumn>
          <TableColumn className="text-left">Verwacht</TableColumn>
          <TableColumn className="text-left">Gewicht</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"Geen zendingen gevonden."}>
          {filtered.map((shipment) => (
            <TableRow key={shipment.id}>
              <TableCell>{shipment.id}</TableCell>
              <TableCell>{shipment.status}</TableCell>
              <TableCell>{shipment.destination}</TableCell>
              <TableCell>{shipment.assignedTo}</TableCell>
              <TableCell>{shipment.expectedDelivery}</TableCell>
              <TableCell>{shipment.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Shipments;