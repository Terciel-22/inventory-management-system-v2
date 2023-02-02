import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const useExportPDF = () => {

    const [report, setReport] = useState(null);

    useEffect(()=>{
        if(report)
        {
            const unit = "pt";
            const size = "A4"; // Use A1, A2, A3 or A4
            const orientation = "landscape"; // portrait or landscape
        
            const doc = new jsPDF(orientation, unit, size);
        
            doc.setFontSize(15);
            doc.text(report.title, 40, 22);
            autoTable(doc, {html: `${report.table_id}`})
            doc.save(report.filename);
        }
    },[report]);

    
    return [setReport];
}

export default useExportPDF;