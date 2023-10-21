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
		header: 'Subject Attendance',
	},
	{
		accessorKey: 'overall_attendance_percentage',
		header: 'Overall Attendance',
	},
	{
		accessorKey: 'attended_at',
		header: 'Attended On',
	},
	
	
];

	
function StudentTable({ data, b, s, d, sub, date }) {

	
	const csvOptions = {
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalSeparator: '.',
		showLabels: true,
		useBom: true,
		useKeysAsHeaders: true,
		headers: columns.map((c) => c.header),
		filename: `${b}_${s}_${d}_${sub}_${date}`
	};
	
	const csvExporter = new ExportToCsv(csvOptions);

	
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
