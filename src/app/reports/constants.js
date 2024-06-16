import dayjs from "dayjs";
import { dollarFormatter, percentageFormatter, valueFormatter } from "./utils";
export const thisMonthStartDate = dayjs().startOf("month");
export const thisMonthEndDate = dayjs().endOf("day");

export const lastMonthStartDate = dayjs().subtract(1, "month").startOf("month");
export const lastMonthEndDate = dayjs().subtract(1, "month").endOf("month");

export const TODAY = dayjs().format("YYYY-MM-DD");
export const YESTERDAY = dayjs().subtract(1, "days").format("YYYY-MM-DD");

export const ONE_MONTH_AGO = dayjs().subtract(1, "month").format("YYYY-MM-DD");

export const TabItemList = [
  {
    label: "Feed",
    key: "revenuePartner",
  },
  {
    label: "Platform",
    key: "spendPartner",
  },
  {
    label: "Media Buyer",
    key: "mediaBuyerName",
  },
  {
    label: "Daily",
    key: "daily",
  },
];

export const rangePresets = [
  {
    label: "Today",
    value: [dayjs().add(0, "d"), dayjs()],
  },
  {
    label: "Yesterday",
    value: [dayjs().add(-1, "d"), dayjs().add(-1, "d")],
  },
  {
    label: "Last 7 Days",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "Last 14 Days",
    value: [dayjs().add(-14, "d"), dayjs()],
  },
  {
    label: "Last 30 Days",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
  {
    label: "Last 90 Days",
    value: [dayjs().add(-90, "d"), dayjs()],
  },
  {
    label: "This Month",
    value: [thisMonthStartDate, thisMonthEndDate],
  },
  {
    label: "Last Month",
    value: [lastMonthStartDate, lastMonthEndDate],
  },
];

export const COMMON_COL_ORDER = [
  "key",
  "spend",
  "revenue",
  "profit",
  "roi",
  "cplr",
  "rpl",
  "scpl",
  "pctr",
  "leads",
  "name",
  "cpc",
  "spendLeads",
  "clicks",
  "impressions",
];

export const columnDefsMap = (LinkCellRenderer) => ({
  key: {
    field: "key",
    minWidth: 350,
    filter: true,
    cellRenderer: LinkCellRenderer,
    icons: { menu: '<i class="fa fa-filter"></i>' },
    menuTabs: ["filterMenuTab"],
    pinned: "left",
  },
  spend: {
    field: "spend",
    valueFormatter: dollarFormatter,
    aggFunc: "sum",
    suppressMenu: true,
  },
  revenue: {
    field: "revenue",
    valueFormatter: dollarFormatter,
    suppressMenu: true,
  },
  name: {
    field: "name",
    hide: true,
  },
  profit: {
    field: "profit",
    valueFormatter: dollarFormatter,
    icons: { menu: '<i class="fa fa-info"></i>' },
    menuTabs: ["generalMenuTab", "filterMenuTab"],
  },
  roi: {
    headerName: "ROI",
    field: "roi",
    valueFormatter: percentageFormatter,
    menuTabs: ["generalMenuTab", "filterMenuTab"],
    icons: { menu: '<i class="fa fa-info"></i>' },
  },
  cplr: {
    headerName: "CPL",
    field: "cplr",
    valueFormatter: valueFormatter,
    menuTabs: ["generalMenuTab", "filterMenuTab"],
    icons: { menu: '<i class="fa fa-info"></i>' },
  },
  scpl: {
    headerName: 'SCPL',
    field: 'scpl',
    valueFormatter: valueFormatter,
    menuTabs: ['generalMenuTab', 'filterMenuTab'],
    icons: { menu: '<i class="fa fa-info"></i>' }
  },
  rpl: {
    headerName: "RPL",
    field: "rpl",
    valueFormatter: valueFormatter,
    menuTabs: ["generalMenuTab", "filterMenuTab"],
    icons: { menu: '<i class="fa fa-info"></i>' },
  },
  pctr: {
    headerName: "CVR",
    field: "pctr",
    valueFormatter: percentageFormatter,
    menuTabs: ["generalMenuTab", "filterMenuTab"],
    icons: { menu: '<i class="fa fa-info"></i>' },
  },
  leads: {
    field: "leads",
    suppressMenu: true,
    menuTabs: ["filterMenuTab"],
  },
  cpc: {
    headerName: "CPC",
    field: "cpc",
    valueFormatter: valueFormatter,
    menuTabs: ["generalMenuTab", "filterMenuTab"],
    icons: { menu: '<i class="fa fa-info"></i>' },
  },
  spendLeads: {
    field: "spendLeads",
    suppressMenu: true,
  },
  clicks: {
    field: "clicks",
    suppressMenu: true,
  },
  impressions: {
    field: "impressions",
    suppressMenu: true,
  },
});

export const chartColumnDefsMap = (props) => ({
  key: {
    field: "key",
    minWidth: 350,
    filter: true,
    floatingFilter: true,
    suppressMenu: true,
    pinned: "left",
    // comparator:
    //   props.type == "daily"
    //     ? (valueA, valueB, nodeA, nodeB, isDescending) => {
    //         if (valueA == valueB) return 0;
    //         return valueA > valueB ? 1 : -1;
    //       }
    //     : (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,
  },
  spend: {
    field: "spend",
    valueFormatter: dollarFormatter,
    aggFunc: "sum",
    suppressMenu: true,
  },
  revenue: {
    field: "revenue",
    valueFormatter: dollarFormatter,
    suppressMenu: true,
  },
  profit: {
    field: "profit",
    valueFormatter: dollarFormatter,
    icons: { menu: '<i class="fa fa-info"></i>' },
    menuTabs: ["generalMenuTab", "filterMenuTab"],
  },
  roi: {
    headerName: "ROI",
    field: "roi",
    valueFormatter: percentageFormatter,
    menuTabs: ["generalMenuTab", "filterMenuTab"],
    icons: { menu: '<i class="fa fa-info"></i>' },
  },
  name: {
    field: "name",
    hide: true,
  },
  cplr: {
    headerName: "CPL",
    field: "cplr",
    valueFormatter: valueFormatter,
    menuTabs: ["generalMenuTab", "filterMenuTab"],
    icons: { menu: '<i class="fa fa-info"></i>' },
  },
  scpl: {
    headerName: 'SCPL',
    field: 'scpl',
    valueFormatter: valueFormatter,
    menuTabs: ['generalMenuTab', 'filterMenuTab'],
    icons: { menu: '<i class="fa fa-info"></i>' }
  },
  rpl: {
    headerName: "RPL",
    field: "rpl",
    valueFormatter: valueFormatter,
    menuTabs: ["generalMenuTab", "filterMenuTab"],
    icons: { menu: '<i class="fa fa-info"></i>' },
  },
  pctr: {
    headerName: "CVR",
    field: "pctr",
    valueFormatter: percentageFormatter,
    menuTabs: ["generalMenuTab", "filterMenuTab"],
    icons: { menu: '<i class="fa fa-info"></i>' },
  },
  leads: {
    field: "leads",
    suppressMenu: true,
    menuTabs: ["filterMenuTab"],
  },
  cpc: {
    headerName: "CPC",
    field: "cpc",
    valueFormatter: valueFormatter,
    menuTabs: ["generalMenuTab", "filterMenuTab"],
    icons: { menu: '<i class="fa fa-info"></i>' },
  },
  spendLeads: {
    field: "spendLeads",
    suppressMenu: true,
  },
  clicks: {
    field: "clicks",
    suppressMenu: true,
  },
  impressions: {
    field: "impressions",
    suppressMenu: true,
  },
});
