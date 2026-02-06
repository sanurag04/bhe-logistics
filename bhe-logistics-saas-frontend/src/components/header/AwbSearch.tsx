/** @format */
import { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Select, 
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function AwbSearch() {
  const [searchType, setSearchType] = useState('AWB');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        borderRadius: 1,
        border: '1px solid #dfe3e8',
        overflow: 'hidden',
        height: 40,
        minWidth: 360,
      }}
    >
      {/* Dropdown */}
      <Select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        variant="standard"
        disableUnderline
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          px: 1.5,
          fontSize: 14,
          fontWeight: 500,
          borderRight: '1px solid #dfe3e8',
        }}
      >
        <MenuItem value="AWB">AWB</MenuItem>
        <MenuItem value="ORDER_ID">Order ID</MenuItem>
      </Select>

      {/* Input */}
      <TextField
        variant="standard"
        placeholder="Search multiple AWBs"
        InputProps={{
          disableUnderline: true,
          sx: { px: 1.5, fontSize: 14 },
        }}
        fullWidth
      />
    </Box>
  );
}
