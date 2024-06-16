export const formatNumber = (number) => {
    const parts = number.toString().split(".");
    const formattedInteger = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    if (parts.length === 2) {
      const decimalPart = parts[1];
      return `${formattedInteger}.${decimalPart}`;
    }
  
    return formattedInteger;
  };
  
  export const percentageFormatter = (params) => {
    return params.value + " %";
  };
  
  export const dollarFormatter = (params) => {
    return "$" + formatNumber(params.value);
  };
  
  export const valueFormatter = (params) => {
    return "$" + params.value;
  };
  