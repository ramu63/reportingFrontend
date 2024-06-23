"use client"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { DatePicker, Select, Space } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment-timezone";
import { useEffect, useMemo, useState } from "react";
// const { RangePicker } = DatePicker;


function Reports() {

  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState(moment().tz("Asia/Kolkata").format("YYYY-MM-DD"));
  const [timeZones, setTimeZones] = useState(
    [
    {
      "label": "Africa/Abidjan",
      "value": "Africa/Abidjan"
    },
    {
      "label": "Africa/Algiers",
      "value": "Africa/Algiers"
    },
    {
      "label": "Africa/Cairo",
      "value": "Africa/Cairo"
    },
    {
      "label": "Africa/Casablanca",
      "value": "Africa/Casablanca"
    },
    {
      "label": "Africa/Johannesburg",
      "value": "Africa/Johannesburg"
    },
    {
      "label": "Africa/Nairobi",
      "value": "Africa/Nairobi"
    },
    {
      "label": "America/New_York",
      "value": "America/New_York"
    },
    {
      "label": "America/Los_Angeles",
      "value": "America/Los_Angeles"
    },
    {
      "label": "Asia/Tokyo",
      "value": "Asia/Tokyo"
    },
    {
      "label": "UTC",
      "value": "UTC"
    },
    {
      "label": "Europe/Berlin",
      "value": "Europe/Berlin"
    },
    {
      "label": "Asia/Kolkata",
      "value": "Asia/Kolkata"
    },
    {
      "label": "Asia/Beijing",
      "value": "Asia/Beijing"
    },
    {
      "label": "Australia/Sydney",
      "value": "Australia/Sydney"
    },
    {
      "label": "Asia/Dubai",
      "value": "Asia/Dubai"
    }
  ]);
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [selectedAccount, setSelectedAccount] = useState("876416714169756");
  const [accounts, setAccounts] = useState([

    {
      "label": "876416714169756",
      "value": "876416714169756"
    },
    {
      "label": "1804191106695452",
      "value": "1804191106695452"
    },
    {
      "label": "317507598007097",
      "value": "317507598007097"
    },
    {
      "label": "686652410128553",
      "value": "686652410128553"
    },
    {
      "label": "291913597326953",
      "value": "291913597326953"
    }
  ]);
  const dateFormat = 'YYYY-MM-DD';

  function calculateDaysAgo(date, timezone) {
    // Parse the date in the given timezone
    const givenDate = moment.tz(date, timezone).startOf('day');
    // Get today's date in the given timezone
    const today = moment.tz(timezone).startOf('day');
    // Calculate the difference in days
    const daysDiff = today.diff(givenDate, 'days');
    return daysDiff;
  }

  useEffect(()=>{
    const getData = async()=>{
      const daysAgo = calculateDaysAgo(startDate, selectedTimezone);
      // console.log("datass", daysAgo)
      const data = await axios.get(`https://reportingads.net/getFilteredData?day=${daysAgo}&accountIdFB=${selectedAccount}&timezone=${selectedTimezone}`)
      console.log("data", data.data.returnedRecords)
      setData([...data.data.returnedRecords])


    }
    getData()
  },[startDate,selectedTimezone,selectedAccount])

  function spender(values) {
    let totalSpend = 0;
    values.values.forEach(value => {
        totalSpend += value;
    });
    return totalSpend;
}
  
const marginFormula = (params) => {
  const calculateMargin = (revenue, spend) => {
    let margin = 0;
    if (spend !== 0) {
      margin = ((revenue - spend) / spend) * 100;
    }
    const marginStr = margin.toFixed(2);
    const [intPart, decPart] = marginStr.split(".");
    return decPart === "00" ? intPart : marginStr;
  };

  if (params.data !== undefined) {
    const spend = params.data.spend || 0;
    const revenue = params.data.revenue || 0;
    return calculateMargin(revenue, spend);
  }

  if (params.node.aggData !== undefined) {
    const { revenue, spend } = params.node.aggData;
    return calculateMargin(revenue, spend);
  }

};

const profitFormula = (params) => {
  const calculateProfit = (revenue, spend) => {
    return (revenue - spend).toFixed(2);
  };

  if (params.data !== undefined) {
    const spend = params.data.spend || 0;
    const revenue = params.data.revenue || 0;
    return calculateProfit(revenue, spend);
  }

  if (params.node.aggData !== undefined) {
    const { revenue, spend } = params.node.aggData;
    return calculateProfit(revenue, spend);
  }

};





const cplFormula = (params) => {
  const calculateCPL = (spend, leads) => {
    let cpl = leads !== 0 ? spend / leads : 0;
    if (!isFinite(cpl) || isNaN(cpl)) {
      cpl = 0;
    }
    const cplStr = cpl.toFixed(2);
    const [intPart, decPart] = cplStr.split(".");
    return decPart === "00" ? intPart : cplStr;
  };

  if (params.data) {
    const spend = params.data.spend || 0;
    const leads = params.data.leads || 0;
    return calculateCPL(spend, leads);
  }

  if (params.node.aggData) {
    const { spend, leads } = params.node.aggData;
    return calculateCPL(spend, leads);
  }

};

const cpcFormula = (params) => {
  const calculateCPC = (spend, clicks) => {
    let cpc = clicks !== 0 ? spend / clicks : 0;
    if (!isFinite(cpc) || isNaN(cpc)) {
      cpc = 0;
    }
    const cpcStr = cpc.toFixed(2);
    const [intPart, decPart] = cpcStr.split(".");
    return decPart === "00" ? intPart : cpcStr;
  };

  if (params.data) {
    const spend = params.data.spend || 0;
    const clicks = params.data.clicks || 0;
    return calculateCPC(spend, clicks);
  }

  if (params.node.aggData) {
    const { spend, clicks } = params.node.aggData;
    return calculateCPC(spend, clicks);
  }

};

const rpcFormula = (params) => {
  const calculateRPC = (revenue, conversions) => {
    let rpc = conversions !== 0 ? revenue / conversions : 0;
    if (!isFinite(rpc) || isNaN(rpc)) {
      rpc = 0;
    }
    const rpcStr = rpc.toFixed(2);
    const [intPart, decPart] = rpcStr.split(".");
    return decPart === "00" ? intPart : rpcStr;
  };

  if (params.data) {
    const revenue = params.data.revenue || 0;
    const conversions = params.data.conversions || 0;
    return calculateRPC(revenue, conversions);
  }

  if (params.node.aggData) {
    const { revenue, conversions } = params.node.aggData;
    return calculateRPC(revenue, conversions);
  }

};


  const columnDefs = [
    { headerName: "Campaign Name", field: "campaignName", sortable: true, filter: true, rowGroup: true, width: 300, floatingFilter: true },
    { headerName: "Campaign ID", field: "campaignId", sortable: true, filter: true,  width: 200},
    // { headerName: "Adset Name", field: "adsetName", sortable: true, filter: true,  width: 300},
    { headerName: "Adset ID", field: "adsetId", sortable: true, filter: true,  width: 200},
    { headerName: "Hour", field: "convertedHour", sortable: true, filter: true, width: 80 },
    { headerName: "Spend", field: "spend", sortable: true, filter: true, width: 100, aggFunc: spender, valueFormatter:(params) => (Number(params.value).toFixed(2))},
    { headerName: "Revenue", field: "revenue", sortable: true, filter: true, width: 110, aggFunc: spender, valueFormatter:(params) => (Number(params.value).toFixed(2))},
    { headerName: "Profit", field: "profit", sortable: true, filter: true, width: 110, valueGetter: profitFormula },
    { headerName: "Margin(%)", field: "margin", sortable: true, filter: true, width: 120, valueGetter:marginFormula},
    { headerName: "Impressions", field: "impressions", sortable: true, filter: true, width: 130, aggFunc: spender},
    { headerName: "Clicks", field: "clicks", sortable: true, filter: true, width: 90, aggFunc: spender},
    { headerName: "Leads", field: "leads", sortable: true, filter: true, width: 90, aggFunc: spender},
    { headerName: "Conversions", field: "conversions", sortable: true, filter: true,width: 130,aggFunc: spender},
    // { headerName: "Date", field: "convertedDate", sortable: true, filter: true },
    { headerName: "CPL", field: "cpl", sortable: true, filter: true, width: 90, valueGetter:cplFormula},
    { headerName: "CPC", field: "cpc", sortable: true, filter: true, width: 90, valueGetter:cpcFormula},
    { headerName: "RPC", field: "rpc", sortable: true, filter: true, width: 90, valueGetter:rpcFormula}


  ];
  
  const autoGroupColumnDef = {
    headerName: "Group",
    minWidth: 200, // Minimum width for the grouped column
    width: 500,    // Width of the grouped column
   cellRendererParams: {
    suppressCount: false, // Display count in grouped cell
  }
  };

  const onChange = (date, dateString) => {
    setStartDate(date.format("YYYY-MM-DD"))
  };

  const getPinnedBottomRowData = (data) => {
    let totalSpend = 0;
    let totalRevenue = 0;
    let totalImpressions = 0;
    let totalLeads = 0;
    let totalClicks = 0;
    let totalConversions = 0;

    data.forEach(row => {
      totalSpend += row.spend || 0;
      totalRevenue += row.revenue || 0;
      totalImpressions += row.impressions || 0;
      totalClicks += row.clicks || 0;
      totalLeads += row.leads || 0;
      totalConversions += row.conversions || 0;
    });


    // const totalCPL = totalConversions ? (totalRevenue / totalConversions).toFixed(2) : '0';
    // const totalCPC = totalConversions ? (totalRevenue / totalConversions).toFixed(2) : '0';
    // const totalRPC = totalConversions ? (totalRevenue / totalConversions).toFixed(2) : '0';

    return [{
      campaignName: 'Total',
      spend: totalSpend.toFixed(2),
      revenue: totalRevenue.toFixed(2),
      profit: (totalRevenue - totalSpend).toFixed(2),
      margin: ((totalRevenue - totalSpend) / totalSpend * 100).toFixed(2),
      impressions: totalImpressions,
      leads: totalLeads,
      clicks: totalClicks,
      conversions: totalConversions,
      // cpl: totalCPL,
      // cpc: totalCPC,
      // rpc: totalRPC
    }];
  };

  const pinnedBottomRowData = useMemo(() => getPinnedBottomRowData(data), [data]);


  return (
   <div>
     <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "20px" }}>
        <div>
        </div>
        <div>
          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            
          <Select
              showSearch
              allowClear
              placeholder="Select Account"
              optionFilterProp="children"
              style={{ width: "12em" }}
              onChange={(value) => {
                 setSelectedAccount(value);
                
              }}
              
              options={accounts}

              value={selectedAccount}
            />

            <Select
              showSearch
              allowClear
              placeholder="UTC"
              optionFilterProp="children"
              style={{ width: "12em" }}
              onChange={(value) => {
                 setSelectedTimezone(value);
                
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={timeZones}

              value={selectedTimezone}
            />

            <DatePicker onChange={onChange} defaultValue={dayjs(startDate, dateFormat)}/>
            {/* <Button onClick={callChildMethod}>Export CSV</Button> */}
            {/* <Button onClick={refreshTable}>
              <SyncOutlined />
            </Button> */}
          </Space>
        </div>
      </div>
      <div className={
         "ag-theme-quartz-dark"
        }
        style={{ height: "75vh", marginTop: "2em" }}>

      <AgGridReact
            // ref={gridRef}
            // onGridReady={onGridReady}
            rowData={data}
            columnDefs={columnDefs}
            // domLayout='autoHeight'
            // groupDisplayType="singleColumn"
            autoGroupColumnDef={autoGroupColumnDef}
            suppressAggFuncInHeader={true}
            groupIncludeFooter={true}
            groupIncludeTotalFooter={true}
            pinnedBottomRowData={pinnedBottomRowData}
            animateRows={true}
            // defaultColDef={defaultColDef}
            // getRowStyle={getRowStyle}
            // getGroupRowAgg={getGroupRowAgg}
            // getMainMenuItems={getMainMenuItems}
            // enableRangeSelection={true}
            // pinnedBottomRowData={pinnedBottomRowData}
            // getContextMenuItems={getContextMenuItems}
          />
          </div>
   </div>
  )
}

export default Reports
