import { KeyValueProps } from '@/types/restClient';
import { TextField } from '@mui/material';
import { memo, useState } from 'react';

const KeyValueRow = memo(function KeyValueEditor({
  row,
  onChange,
}: {
  row: KeyValueProps;
  onChange: (_row: KeyValueProps) => void;
}) {
  const { uuid, key, value } = row;
  const [rowKey, setRowKey] = useState(key);
  const [rowValue, setRowValue] = useState(value);

  return (
    <div
      key={uuid}
      style={{
        display: 'flex',
        marginBottom: '8px',
        justifyContent: 'space-evenly',
      }}
    >
      <TextField
        key={`key-${uuid}`}
        type="text"
        variant="standard"
        id={`keyInput-${uuid}`}
        placeholder="header"
        value={rowKey}
        onChange={(e) => setRowKey(e.target.value.trim())}
        onBlur={() => onChange({ uuid, key: rowKey, value: rowValue })}
        sx={{ width: '40%', p: 1 }}
      />
      <TextField
        key={`value-${value}`}
        type="text"
        variant="standard"
        id={`valueInput-${uuid}`}
        placeholder="value"
        value={rowValue}
        onChange={(e) => setRowValue(e.target.value.trim())}
        onBlur={() => onChange({ uuid, key: rowKey, value: rowValue })}
        sx={{ width: '40%', p: 1 }}
      />
    </div>
  );
});

export default KeyValueRow;
