import React from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';

const columns = [
	{
		accessorKey: 'id',
		header: 'ID',
		size: 60,
	},
	{
		accessorKey: 'first_name',
		header: 'First Name',
	},
	{
		accessorKey: 'last_name',
		header: 'Last Name',
	},
	{
		accessorKey: 'attendance_percentage',
		header: 'Attendance',
	},
	{
		accessorKey: 'attended_at',
		header: 'Attended On',
	},
	
];

const csvOptions = {
fieldSeparator: ',',
quoteStrings: '"',
decimalSeparator: '.',
showLabels: true,
useBom: true,
useKeysAsHeaders: true,
headers: columns.map((c) => c.header),
};

const csvExporter = new ExportToCsv(csvOptions);

	
function StudentTable({data}) {

	const handleExportData = () => {
		csvExporter.generateCsv(data);
	};

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      positionToolbarAlertBanner="bottom"
      renderTopToolbarCustomActions={() => (
        <Box
          sx={{ display: 'flex', gap: '1rem', px: '1rem', py: '0.5rem', flexWrap: 'wrap' }}
        >
          <Button
            color="primary"
            onClick={handleExportData}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
			Download
			</Button>
        </Box>
      )}
    />
  );
};

export default StudentTable;
