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

  return <></>;

};

export default Shipments;