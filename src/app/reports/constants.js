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

export const autoGroupColumnDef = {
  headerName: "Group",
  minWidth: 200,
  width: 500,
 cellRendererParams: {
  suppressCount: false,
}
};

export const gridOptions = {
  rowGroupPanelShow: 'always',
};

export const columnDefsLiveReport = [
    { headerName: "Campaign Name", field: "campaignName", sortable: true, filter: true, rowGroup: true, width: 300, floatingFilter: true, enableRowGroup: true },
    { headerName: "Campaign ID", field: "campaignId", sortable: true, filter: true,  width: 200,enableRowGroup: true},
    { headerName: "Adset ID", field: "adsetId", sortable: true, filter: true,  width: 200,enableRowGroup: true},
    { headerName: "Hour", field: "convertedHour", sortable: true, filter: true, width: 80, enableRowGroup: true},
    { headerName: "Spend", field: "spend", sortable: true, filter: true, width: 100, aggFunc: spender, valueFormatter:(params) => (Number(params.value).toFixed(2))},
    { headerName: "Revenue", field: "revenue", sortable: true, filter: true, width: 110, aggFunc: spender, valueFormatter:(params) => (Number(params.value).toFixed(2))},
    { headerName: "Profit", field: "profit", sortable: true, filter: true, width: 110, valueGetter: profitFormula },
    { headerName: "Margin(%)", field: "margin", sortable: true, filter: true, width: 120, valueGetter:marginFormula,
    comparator: (a, b, isDescending) => {
      const a_ = a.replace("%", "");
      const b_ = b.replace("%", "");
      if (isDescending) {
        return b_ - a_;
      }
    }
  },
    { headerName: "Impressions", field: "impressions", sortable: true, filter: true, width: 130, aggFunc: spender},
    { headerName: "Clicks", field: "clicks", sortable: true, filter: true, width: 90, aggFunc: spender},
    { headerName: "Leads", field: "leads", sortable: true, filter: true, width: 90, aggFunc: spender},
    { headerName: "Conversions", field: "conversions", sortable: true, filter: true,width: 130,aggFunc: spender},
    { headerName: "CPL", field: "cpl", sortable: true, filter: true, width: 90, valueGetter:cplFormula},
    { headerName: "CPC", field: "cpc", sortable: true, filter: true, width: 90, valueGetter:cpcFormula},
    { headerName: "RPC", field: "rpc", sortable: true, filter: true, width: 90, valueGetter:rpcFormula},
    { headerName: "Date", field: "convertedDate", sortable: true, filter: true, enableRowGroup: true}

  ];

  export const columnDefsUserReport = [
    { headerName: "MediaBuyer", field: "media_buyer", sortable: true, filter: true, rowGroup: true, width: 300, floatingFilter: true, enableRowGroup: true },
    { headerName: "AccountId", field: "accountId", sortable: true, filter: true, width: 300, floatingFilter: true, enableRowGroup: true },
    { headerName: "Spend", field: "spend", sortable: true, filter: true, width: 100, aggFunc: spender, valueFormatter:(params) => (Number(params.value).toFixed(2))},
    { headerName: "Revenue", field: "revenue", sortable: true, filter: true, width: 110, aggFunc: spender, valueFormatter:(params) => (Number(params.value).toFixed(2))},
    { headerName: "Profit", field: "profit", sortable: true, filter: true, width: 110, valueGetter: profitFormula },
    { headerName: "Margin(%)", field: "margin", sortable: true, filter: true, width: 120, valueGetter:marginFormula,
    comparator: (a, b, isDescending) => {
      const a_ = a.replace("%", "");
      const b_ = b.replace("%", "");
      if (isDescending) {
        return b_ - a_;
      }
    }
  },
    { headerName: "Impressions", field: "impressions", sortable: true, filter: true, width: 130, aggFunc: spender},
    { headerName: "Clicks", field: "clicks", sortable: true, filter: true, width: 90, aggFunc: spender},
    { headerName: "Leads", field: "leads", sortable: true, filter: true, width: 90, aggFunc: spender},
    { headerName: "Conversions", field: "conversions", sortable: true, filter: true,width: 130,aggFunc: spender},
    { headerName: "CPL", field: "cpl", sortable: true, filter: true, width: 90, valueGetter:cplFormula},
    { headerName: "CPC", field: "cpc", sortable: true, filter: true, width: 90, valueGetter:cpcFormula},
    { headerName: "RPC", field: "rpc", sortable: true, filter: true, width: 90, valueGetter:rpcFormula},
    // { headerName: "Date", field: "convertedDate", sortable: true, filter: true, enableRowGroup: true}

  ];

  export const columnDefsMiscReport = [
    
    { headerName: "Campaign ID", field: "campaignId", sortable: true, filter: true,  width: 200,enableRowGroup: true,flex: 1},
    { headerName: "Adset ID", field: "adsetId", sortable: true, filter: true,  width: 200,enableRowGroup: true,flex: 1},
    { headerName: "Hour", field: "convertedHour", sortable: true, filter: true, width: 80, enableRowGroup: true,flex: 1},
    { headerName: "Revenue", field: "revenue", sortable: true, filter: true, width: 110, aggFunc: spender, valueFormatter:(params) => (Number(params.value).toFixed(2)),flex: 1},
    { headerName: "Impressions", field: "impressions", sortable: true, filter: true, width: 130, aggFunc: spender,flex: 1},
    { headerName: "Conversions", field: "conversions", sortable: true, filter: true,width: 130,aggFunc: spender,flex: 1},
    { headerName: "Date", field: "convertedDate", sortable: true, filter: true, enableRowGroup: true,flex: 1}

  ];

  
