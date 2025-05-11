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
  Select,
  SelectItem,
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

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold text-white">Zendingen</h1>

      <div className="flex flex-wrap gap-4 items-center">
        <Input
          isClearable
          placeholder="Zoek op status, bestemming of toegewezen persoon"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="max-w-md"
        />

        <Select
          label="Filter op status"
          selectedKeys={selectedStatus ? [selectedStatus] : []}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0] as string;
            setSelectedStatus(key === selectedStatus ? null : key);
          }}
          className="max-w-xs"
          disallowEmptySelection
        >
          {uniqueStatuses.map(status => (
            <SelectItem key={status}>{status}</SelectItem>
          ))}
        </Select>

        <Button
          color="danger"
          variant="flat"
          onPress={() => {
            setQuery('');
            setSelectedStatus(null);
          }}
        >
          Reset filters
        </Button>
      </div>

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