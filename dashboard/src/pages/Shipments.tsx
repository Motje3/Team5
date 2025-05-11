import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input
} from '@nextui-org/react';
import { Select, SelectItem, Button } from '@nextui-org/react';

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
    setFiltered(shipments.filter(s =>
      s.destination?.toLowerCase().includes(lower) ||
      s.status?.toLowerCase().includes(lower) ||
      s.assignedTo?.toLowerCase().includes(lower)
    ));
  }, [query, shipments]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold text-white">Zendingen</h1>
      <Input
        isClearable
        placeholder="Zoek op status, bestemming of toegewezen persoon"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="max-w-md"
      />
      <Table aria-label="Zendingen tabel" removeWrapper>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Bestemming</TableColumn>
          <TableColumn>Toegewezen</TableColumn>
          <TableColumn>Verwacht</TableColumn>
          <TableColumn>Gewicht</TableColumn>
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