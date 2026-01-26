// Armenia IT Labor Market Data (2022-2025)
export interface DataPoint {
  year: number;
  month: string;
  monthIndex: number;
  value: number;
}

export interface YearlyData {
  year: number;
  data: DataPoint[];
  color: string;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Employment data (thousands)
export const employmentData: YearlyData[] = [
  {
    year: 2022,
    color: 'hsl(200, 85%, 60%)',
    data: [
      { year: 2022, month: 'Jan', monthIndex: 0, value: 23.0 },
      { year: 2022, month: 'Feb', monthIndex: 1, value: 23.5 },
      { year: 2022, month: 'Mar', monthIndex: 2, value: 24.8 },
      { year: 2022, month: 'Apr', monthIndex: 3, value: 26.4 },
      { year: 2022, month: 'May', monthIndex: 4, value: 27.7 },
      { year: 2022, month: 'Jun', monthIndex: 5, value: 29.4 },
      { year: 2022, month: 'Jul', monthIndex: 6, value: 30.2 },
      { year: 2022, month: 'Aug', monthIndex: 7, value: 30.6 },
      { year: 2022, month: 'Sep', monthIndex: 8, value: 30.9 },
      { year: 2022, month: 'Oct', monthIndex: 9, value: 31.7 },
      { year: 2022, month: 'Nov', monthIndex: 10, value: 32.7 },
      { year: 2022, month: 'Dec', monthIndex: 11, value: 33.1 },
    ],
  },
  {
    year: 2023,
    color: 'hsl(160, 70%, 55%)',
    data: [
      { year: 2023, month: 'Jan', monthIndex: 0, value: 30.5 },
      { year: 2023, month: 'Feb', monthIndex: 1, value: 31.2 },
      { year: 2023, month: 'Mar', monthIndex: 2, value: 31.8 },
      { year: 2023, month: 'Apr', monthIndex: 3, value: 31.9 },
      { year: 2023, month: 'May', monthIndex: 4, value: 32.4 },
      { year: 2023, month: 'Jun', monthIndex: 5, value: 32.4 },
      { year: 2023, month: 'Jul', monthIndex: 6, value: 32.2 },
      { year: 2023, month: 'Aug', monthIndex: 7, value: 32.3 },
      { year: 2023, month: 'Sep', monthIndex: 8, value: 32.1 },
      { year: 2023, month: 'Oct', monthIndex: 9, value: 32.1 },
      { year: 2023, month: 'Nov', monthIndex: 10, value: 32.7 },
      { year: 2023, month: 'Dec', monthIndex: 11, value: 32.0 },
    ],
  },
  {
    year: 2024,
    color: 'hsl(35, 95%, 60%)',
    data: [
      { year: 2024, month: 'Jan', monthIndex: 0, value: 31.8 },
      { year: 2024, month: 'Feb', monthIndex: 1, value: 31.8 },
      { year: 2024, month: 'Mar', monthIndex: 2, value: 31.9 },
      { year: 2024, month: 'Apr', monthIndex: 3, value: 32.1 },
      { year: 2024, month: 'May', monthIndex: 4, value: 32.1 },
      { year: 2024, month: 'Jun', monthIndex: 5, value: 32.4 },
      { year: 2024, month: 'Jul', monthIndex: 6, value: 32.0 },
      { year: 2024, month: 'Aug', monthIndex: 7, value: 32.0 },
      { year: 2024, month: 'Sep', monthIndex: 8, value: 32.1 },
      { year: 2024, month: 'Oct', monthIndex: 9, value: 32.2 },
      { year: 2024, month: 'Nov', monthIndex: 10, value: 32.4 },
      { year: 2024, month: 'Dec', monthIndex: 11, value: 32.5 },
    ],
  },
  {
    year: 2025,
    color: 'hsl(340, 80%, 65%)',
    data: [
      { year: 2025, month: 'Jan', monthIndex: 0, value: 32.2 },
      { year: 2025, month: 'Feb', monthIndex: 1, value: 32.4 },
      { year: 2025, month: 'Mar', monthIndex: 2, value: 32.5 },
      { year: 2025, month: 'Apr', monthIndex: 3, value: 32.6 },
      { year: 2025, month: 'May', monthIndex: 4, value: 32.7 },
      { year: 2025, month: 'Jun', monthIndex: 5, value: 32.7 },
      { year: 2025, month: 'Jul', monthIndex: 6, value: 32.7 },
      { year: 2025, month: 'Aug', monthIndex: 7, value: 32.7 },
      { year: 2025, month: 'Sep', monthIndex: 8, value: 32.8 },
    ],
  },
];

// Salary data (thousands AMD)
export const salaryData: YearlyData[] = [
  {
    year: 2022,
    color: 'hsl(200, 85%, 60%)',
    data: [
      { year: 2022, month: 'Jan', monthIndex: 0, value: 731.2 },
      { year: 2022, month: 'Feb', monthIndex: 1, value: 765.4 },
      { year: 2022, month: 'Mar', monthIndex: 2, value: 808.4 },
      { year: 2022, month: 'Apr', monthIndex: 3, value: 881.2 },
      { year: 2022, month: 'May', monthIndex: 4, value: 873.0 },
      { year: 2022, month: 'Jun', monthIndex: 5, value: 899.3 },
      { year: 2022, month: 'Jul', monthIndex: 6, value: 934.1 },
      { year: 2022, month: 'Aug', monthIndex: 7, value: 950.5 },
      { year: 2022, month: 'Sep', monthIndex: 8, value: 957.9 },
      { year: 2022, month: 'Oct', monthIndex: 9, value: 966.9 },
      { year: 2022, month: 'Nov', monthIndex: 10, value: 988.6 },
      { year: 2022, month: 'Dec', monthIndex: 11, value: 1115.0 },
    ],
  },
  {
    year: 2023,
    color: 'hsl(160, 70%, 55%)',
    data: [
      { year: 2023, month: 'Jan', monthIndex: 0, value: 1027.0 },
      { year: 2023, month: 'Feb', monthIndex: 1, value: 1049.8 },
      { year: 2023, month: 'Mar', monthIndex: 2, value: 1069.9 },
      { year: 2023, month: 'Apr', monthIndex: 3, value: 1029.1 },
      { year: 2023, month: 'May', monthIndex: 4, value: 1034.0 },
      { year: 2023, month: 'Jun', monthIndex: 5, value: 1007.9 },
      { year: 2023, month: 'Jul', monthIndex: 6, value: 1011.3 },
      { year: 2023, month: 'Aug', monthIndex: 7, value: 1024.0 },
      { year: 2023, month: 'Sep', monthIndex: 8, value: 998.7 },
      { year: 2023, month: 'Oct', monthIndex: 9, value: 1014.9 },
      { year: 2023, month: 'Nov', monthIndex: 10, value: 1034.0 },
      { year: 2023, month: 'Dec', monthIndex: 11, value: 1206.5 },
    ],
  },
  {
    year: 2024,
    color: 'hsl(35, 95%, 60%)',
    data: [
      { year: 2024, month: 'Jan', monthIndex: 0, value: 1048.6 },
      { year: 2024, month: 'Feb', monthIndex: 1, value: 1107.6 },
      { year: 2024, month: 'Mar', monthIndex: 2, value: 1097.4 },
      { year: 2024, month: 'Apr', monthIndex: 3, value: 1072.8 },
      { year: 2024, month: 'May', monthIndex: 4, value: 1042.0 },
      { year: 2024, month: 'Jun', monthIndex: 5, value: 1007.9 },
      { year: 2024, month: 'Jul', monthIndex: 6, value: 1023.3 },
      { year: 2024, month: 'Aug', monthIndex: 7, value: 1025.6 },
      { year: 2024, month: 'Sep', monthIndex: 8, value: 1016.2 },
      { year: 2024, month: 'Oct', monthIndex: 9, value: 1028.8 },
      { year: 2024, month: 'Nov', monthIndex: 10, value: 1053.8 },
      { year: 2024, month: 'Dec', monthIndex: 11, value: 1247.3 },
    ],
  },
  {
    year: 2025,
    color: 'hsl(340, 80%, 65%)',
    data: [
      { year: 2025, month: 'Jan', monthIndex: 0, value: 1016.6 },
      { year: 2025, month: 'Feb', monthIndex: 1, value: 1102.4 },
      { year: 2025, month: 'Mar', monthIndex: 2, value: 1102.5 },
      { year: 2025, month: 'Apr', monthIndex: 3, value: 1043.5 },
      { year: 2025, month: 'May', monthIndex: 4, value: 1038.8 },
      { year: 2025, month: 'Jun', monthIndex: 5, value: 1012.6 },
      { year: 2025, month: 'Jul', monthIndex: 6, value: 1018.1 },
      { year: 2025, month: 'Aug', monthIndex: 7, value: 1057.1 },
      { year: 2025, month: 'Sep', monthIndex: 8, value: 1032.8 },
    ],
  },
];

// Helper functions
export const getLatestEmployment = (): DataPoint => {
  const latest = employmentData[employmentData.length - 1];
  return latest.data[latest.data.length - 1];
};

export const getLatestSalary = (): DataPoint => {
  const latest = salaryData[salaryData.length - 1];
  return latest.data[latest.data.length - 1];
};

export const getYearGrowth = (yearData: YearlyData): number => {
  const first = yearData.data[0].value;
  const last = yearData.data[yearData.data.length - 1].value;
  return ((last - first) / first) * 100;
};

export const getYearColor = (year: number): string => {
  const colors: Record<number, string> = {
    2022: 'hsl(200, 85%, 60%)',
    2023: 'hsl(160, 70%, 55%)',
    2024: 'hsl(35, 95%, 60%)',
    2025: 'hsl(340, 80%, 65%)',
  };
  return colors[year] || 'hsl(220, 80%, 60%)';
};

export const getYearColorClass = (year: number): string => {
  const classes: Record<number, string> = {
    2022: 'text-year-2022',
    2023: 'text-year-2023',
    2024: 'text-year-2024',
    2025: 'text-year-2025',
  };
  return classes[year] || 'text-primary';
};

export const formatNumber = (value: number, decimals: number = 1): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

// Narrative content
export interface NarrativeItem {
  year: number;
  title: string;
  description: string;
  insight: string;
}

export const employmentNarratives: NarrativeItem[] = [
  {
    year: 2022,
    title: 'The Great Influx',
    description: 'IT workforce surged by 44% in a single year—from 23K to 33K employees.',
    insight: 'The 2022 surge was driven by an influx of tech professionals relocating to Armenia during regional geopolitical shifts. Favorable tax policies and a growing tech ecosystem made the country an attractive destination.',
  },
  {
    year: 2023,
    title: 'Stabilization Phase',
    description: 'Workforce plateaued around 32K as the initial migration wave settled.',
    insight: 'After the rapid 2022 growth, the market began to stabilize. Some relocated workers moved on, while local talent development programs started bearing fruit.',
  },
  {
    year: 2024,
    title: 'Steady State',
    description: 'Employment remained flat—hovering between 31.8K and 32.5K throughout the year.',
    insight: 'The market reached equilibrium. Growth now depended on organic factors: new graduates, upskilling, and business expansion rather than external migration.',
  },
  {
    year: 2025,
    title: 'New Normal',
    description: 'Modest growth continues—workforce approaching 33K as local talent pipelines mature.',
    insight: 'Armenia\'s IT sector is now in a sustainable growth phase, driven by domestic talent development and the maturing tech ecosystem.',
  },
];

export const salaryNarratives: NarrativeItem[] = [
  {
    year: 2022,
    title: 'Salary Surge',
    description: 'Average IT salaries jumped 52%—from 731K to 1,115K AMD in December.',
    insight: 'The talent influx drove competition for skilled workers, pushing salaries upward. IT salaries became 3-4× higher than the national average, cementing the sector\'s attractiveness.',
  },
  {
    year: 2023,
    title: 'Peak & Adjustment',
    description: 'Salaries fluctuated between 998K and 1,207K AMD with notable year-end spikes.',
    insight: 'December bonuses created seasonal peaks. Average monthly salaries stabilized around 1,000K AMD as market competition normalized.',
  },
  {
    year: 2024,
    title: 'Mature Market',
    description: 'Wages followed familiar patterns—ranging from 1,008K to 1,247K AMD.',
    insight: 'The salary market matured with predictable seasonal patterns. Companies focused on benefits and career growth beyond raw compensation.',
  },
  {
    year: 2025,
    title: 'Sustainable Growth',
    description: 'Salaries maintain the 1,000K+ AMD baseline with modest real growth.',
    insight: 'The IT sector offers stable, competitive compensation. Future growth will likely track inflation and productivity gains.',
  },
];
