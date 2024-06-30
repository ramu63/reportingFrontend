"use client"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { Button, DatePicker, Select, Space, Spin, Switch } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment-timezone";
import { useEffect, useMemo, useState } from "react";
// import { autoGroupColumnDef, columnDefs, gridOptions } from "./constants";
import {
  SyncOutlined
} from '@ant-design/icons';
import { autoGroupColumnDef, columnDefsLiveReport, columnDefsUserReport, gridOptions } from "./constants";

function Reports() {
// console.log("states", columnDefs,autoGroupColumnDef)
  const [data, setData] = useState([])
  const [dates, setDates] = useState([
    moment().tz("Asia/Kolkata").format("YYYY-MM-DD"),
    moment().tz("Asia/Kolkata").format("YYYY-MM-DD")
  ]);
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
      "label": "ALL",
      "value": "ALL"
    },
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
  const [networks, setNetworks] = useState([

    {
      "label": "MEDIA_DOT_NET",
      "value": "MEDIA_DOT_NET"
    },
    {
      "label": "RSOC",
      "value": "RSOC"
    }
  ]);
  const [reportType, setReportType] = useState([

    {
      "label": "LIVE",
      "value": "LIVE"
    },
    {
      "label": "USER",
      "value": "USER"
    }
    // ,
    // {
    //   "label": "MISC",
    //   "value": "MISC"
    // }
  ]);
  
  const { RangePicker } = DatePicker;
  const [loader, setLoader] = useState(false)
  const [filters, setFilters] = useState({
    network: "",
    accountId: "ALL",
    reportType: "USER",
    timezone: "UTC",
    dates: [
      moment().tz("Asia/Kolkata").format("YYYY-MM-DD"),
      moment().tz("Asia/Kolkata").format("YYYY-MM-DD")
    ]
  })
  const [mode, setMode] = useState("light")
  const [refresh, setRefresh] = useState(false)



  const rangePresets = [
    {
      label: 'Last 7 Days',
      value: [dayjs().add(-7, 'd'), dayjs()],
    },
    {
      label: 'Last 14 Days',
      value: [dayjs().add(-14, 'd'), dayjs()],
    },
    {
      label: 'Last 30 Days',
      value: [dayjs().add(-30, 'd'), dayjs()],
    },
    {
      label: 'Last 90 Days',
      value: [dayjs().add(-90, 'd'), dayjs()],
    },
  ];

  // useEffect(()=>{
  //   const getData = async()=>{
  //     setLoader(true)
  //     const data = await axios.get(`http://localhost:8000/getFilteredDataRange?dateStart=${dates[0]}&dateEnd=${dates[1]}&accountIdFB=${selectedAccount}&timezone=${selectedTimezone}`)
  //     console.log("data", data.data.returnedRecords)
  //     setData([...data.data.returnedRecords])
  //     setLoader(false)

  //   }
  //   getData()
  // },[dates,selectedTimezone,selectedAccount, refresh])

  useEffect(()=>{
    const getData = async()=>{
      setLoader(true)
      const filtersModified = JSON.stringify(filters)
      const data = await axios.get(`https://reportingads.net/getFilteredDataReport?filters=${filtersModified}`)
      console.log("data", data.data.returnedRecords)
      setData([...data.data.returnedRecords])
      setLoader(false)

    }
    getData()
  },[filters, refresh])

  const refreshData = ()=>{
    setRefresh((prevState)=>{
      return !prevState
    })
  }


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


    return [{
      campaignName: 'Total',
      spend: totalSpend.toFixed(2),
      revenue: totalRevenue.toFixed(2),
      profit: (totalRevenue - totalSpend).toFixed(2),
      margin: ((totalRevenue - totalSpend) / totalSpend * 100).toFixed(2),
      impressions: totalImpressions,
      leads: totalLeads,
      clicks: totalClicks,
      conversions: totalConversions
    }];
  };

  const pinnedBottomRowData = useMemo(() => getPinnedBottomRowData(data), [data]);

 
  
  const onChangeFilters = (value,fieldToUpdate)=>{
    setFilters((prevFilters) => ({
      ...prevFilters,
      [fieldToUpdate]: value,
    }));
  }

  const changeMode = (value)=>{
    setMode(()=>{
      return value===true? "light": "dark"
    })
    // console.log("state", value)
    // setMode()
  }
  // console.log("statesof", mode)
  return (
   <div>
     <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
        <div>
        </div>
        <div>
          <Space style={{ display: "flex", justifyContent: "flex-end" , margin: "10px 10px 0px 0px"}}>
            
          {/* <Select
              showSearch
              allowClear
              placeholder="Select Network"
              optionFilterProp="children"
              style={{ width: "12em" }}
              onChange={(value) => onChangeFilters(value, 'network')}
              options={networks}
              value={filters.network}
            /> */}

          <Select
              showSearch
              // allowClear
              placeholder="Select Account"
              optionFilterProp="children"
              style={{ width: "12em" }}
              onChange={(value) => onChangeFilters(value, 'accountId')}
              options={accounts}
              value={filters.accountId}
            />

<         Select
              showSearch
              // allowClear
              placeholder="Select ReportType"
              optionFilterProp="children"
              style={{ width: "12em" }}
              onChange={(value) => onChangeFilters(value, 'reportType')}
              options={reportType}
              value={filters.reportType}
            />


            <Select
              showSearch
              // allowClear
              placeholder="UTC"
              optionFilterProp="children"
              style={{ width: "12em" }}
              onChange={(value) => onChangeFilters(value, 'timezone')}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={timeZones}
              value={filters.timezone}
            />

            <RangePicker presets={rangePresets} onChange={(value,dateString) => onChangeFilters(dateString, "dates")} />
            {/* <Button onClick={callChildMethod}>Export CSV</Button> */}
            <Button onClick={refreshData}>
              <SyncOutlined />
            </Button>
            <Switch checkedChildren="light" unCheckedChildren="dark" defaultChecked onChange={changeMode}/>
          </Space>
        </div>
      </div>
      <div className={
         mode === "light"? "ag-theme-quartz": "ag-theme-quartz-dark"
        }
        style={{ height: "80vh", marginTop: "1em" }}>

      {loader?
       <Spin size="large" style={{height: "40vh", marginTop: "1em" ,display: "flex", justifyContent: "center", alignItems: "center"}}/>
      :<AgGridReact
            rowData={data}
            columnDefs={filters.reportType === "LIVE" ?columnDefsLiveReport:columnDefsUserReport}
            autoGroupColumnDef={autoGroupColumnDef}
            suppressAggFuncInHeader={true}
            // groupIncludeFooter={true}
            groupIncludeTotalFooter={true}
            pinnedBottomRowData={pinnedBottomRowData}
            animateRows={true}
            gridOptions={gridOptions}
          />}
          </div>
   </div>
  )
}

export default Reports
