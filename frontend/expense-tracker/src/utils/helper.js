import moment from "moment";

export const validateEmail =(email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials =  (name) => {
    if(!name) return "";

    const words = name.split(" ");
    let initials = "";


    for(let i= 0; i<Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }
    return initials.toLowerCase();
};


export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return"";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
}

export const prepareExpenseBarChartData = (data = []) =>{
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: Number(item?.amount),
    }));
    return chartData;
} ;

export const prepareIncomeBarChartData = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

  return sortedData.map((item) => ({
    month: item?.date ? moment(item.date).format("DD MMM") : "Unknown",
    amount: Number(item?.amount) || 0,
    source: item?.source || "N/A",
  }));
};

export const prepareExpenseLineChartData = (data = []) =>{
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));
    const chartData = sortedData.map((item) => ({
    month:  moment(item.date).format("DD MMM"),
    amount: Number(item?.amount) || 0,
    category: item?.category,

    }));

    return chartData;

}