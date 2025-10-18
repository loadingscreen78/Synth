// PDF Report Generator using browser's print functionality

export interface ReportData {
  title: string;
  timestamp: string;
  deviceCount: number;
  totalEmissions: number;
  riskLevel: string;
  predictions: any;
  devices: any[];
  recommendations: string[];
}

export function generatePDFReport(data: ReportData): void {
  // Create a new window with the report content
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Please allow pop-ups to generate the PDF report');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${data.title}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          background: white;
          color: #333;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 3px solid #0ea5e9;
          padding-bottom: 20px;
        }
        
        .header h1 {
          color: #0ea5e9;
          font-size: 32px;
          margin-bottom: 10px;
        }
        
        .header .subtitle {
          color: #666;
          font-size: 14px;
        }
        
        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        
        .section-title {
          font-size: 20px;
          color: #0ea5e9;
          margin-bottom: 15px;
          border-left: 4px solid #0ea5e9;
          padding-left: 10px;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .metric-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          background: #f9fafb;
        }
        
        .metric-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        
        .metric-value {
          font-size: 28px;
          font-weight: bold;
          color: #0ea5e9;
        }
        
        .risk-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
        }
        
        .risk-high {
          background: #fee2e2;
          color: #dc2626;
        }
        
        .risk-medium {
          background: #fef3c7;
          color: #d97706;
        }
        
        .risk-low {
          background: #d1fae5;
          color: #059669;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }
        
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        
        th {
          background: #f3f4f6;
          font-weight: 600;
          color: #374151;
        }
        
        tr:hover {
          background: #f9fafb;
        }
        
        .recommendations {
          list-style: none;
        }
        
        .recommendations li {
          padding: 12px;
          margin-bottom: 10px;
          background: #eff6ff;
          border-left: 4px solid #0ea5e9;
          border-radius: 4px;
        }
        
        .recommendations li:before {
          content: "→ ";
          color: #0ea5e9;
          font-weight: bold;
          margin-right: 8px;
        }
        
        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        
        @media print {
          body {
            padding: 20px;
          }
          
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🌍 CarbonCtrl AI Analysis Report</h1>
        <p class="subtitle">Generated on ${new Date(data.timestamp).toLocaleString()}</p>
      </div>
      
      <div class="section">
        <h2 class="section-title">Executive Summary</h2>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Total Devices</div>
            <div class="metric-value">${data.deviceCount}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Total Carbon Emissions</div>
            <div class="metric-value">${data.totalEmissions.toLocaleString()} gCO₂</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Risk Level</div>
            <div class="metric-value">
              <span class="risk-badge risk-${data.riskLevel.toLowerCase()}">${data.riskLevel}</span>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Projected Savings</div>
            <div class="metric-value">${data.predictions.projectedSavings?.toLocaleString() || 'N/A'} gCO₂</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2 class="section-title">AI Predictions</h2>
        <p><strong>Next Hour Emissions:</strong> ${data.predictions.nextHourEmissions?.toLocaleString() || 'N/A'} gCO₂</p>
        <p><strong>Model Confidence:</strong> ${Math.round((data.predictions.confidence || 0) * 100)}%</p>
        <p><strong>Average CPU Usage:</strong> ${data.predictions.averageCpuUsage || 'N/A'}%</p>
        <p><strong>Average Temperature:</strong> ${data.predictions.averageTemperature || 'N/A'}°C</p>
      </div>
      
      <div class="section">
        <h2 class="section-title">Connected Devices</h2>
        <table>
          <thead>
            <tr>
              <th>Device Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Emissions (gCO₂)</th>
              <th>Efficiency</th>
            </tr>
          </thead>
          <tbody>
            ${data.devices.map(device => `
              <tr>
                <td>${device.name}</td>
                <td>${device.type}</td>
                <td>${device.status}</td>
                <td>${device.emissions.toLocaleString()}</td>
                <td>${device.efficiency}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div class="section">
        <h2 class="section-title">AI Recommendations</h2>
        <ul class="recommendations">
          ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>
      
      <div class="footer">
        <p>CarbonCtrl AI Intelligence Layer - Powered by Qwen/Qwen2-1.5B-Instruct</p>
        <p>This report is generated automatically based on real-time device monitoring and AI predictions.</p>
      </div>
      
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 500);
        };
        
        window.onafterprint = function() {
          window.close();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
