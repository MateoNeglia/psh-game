import Button from '@mui/material/Button';



export default function CsvButton ({stats}) {
    
    const  handleExportToCSV = () => {
    
        const headers = Object.keys(stats[0]);
            
        const rows = stats.map(entry => headers.map(header => entry[header]));
          
        const csvData = `${headers.join(',')}\n${rows.map(row => row.join(',')).join('\n')}`;
      
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'user_stats.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <Button variant="outlined" onClick={handleExportToCSV}>Export to CSV</Button>
    )
}
