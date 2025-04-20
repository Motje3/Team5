import React from 'react';

interface DateFilterProps {
  onChange: (date: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onChange }) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="date-filter">Filter by Date:</label>
      <input
        id="date-filter"
        type="date"
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateFilter;