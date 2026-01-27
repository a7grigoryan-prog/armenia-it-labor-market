// Armenia Economic Sectors Data - October 2025
export interface SectorData {
  sector: string;
  shortName: string;
  avgSalary: number;
  employees: number;
  category: 'highlight' | 'high-paying' | 'mass-employment' | 'other';
}

export const sectorData: SectorData[] = ([
  { sector: 'Information and communication', shortName: 'IT & Telecom', avgSalary: 849531, employees: 45603, category: 'highlight' },
  { sector: 'Finance and insurance', shortName: 'Finance', avgSalary: 727107, employees: 26026, category: 'high-paying' },
  { sector: 'Mining and quarrying', shortName: 'Mining', avgSalary: 554433, employees: 13400, category: 'high-paying' },
  { sector: 'Arts, entertainment and recreation', shortName: 'Arts & Entertainment', avgSalary: 378381, employees: 24789, category: 'other' },
  { sector: 'Public administration and defence', shortName: 'Public Admin', avgSalary: 362169, employees: 40994, category: 'high-paying' },
  { sector: 'Transportation and warehousing', shortName: 'Transport', avgSalary: 339718, employees: 23079, category: 'high-paying' },
  { sector: 'Professional, scientific and technical activities', shortName: 'Professional Services', avgSalary: 294031, employees: 29370, category: 'other' },
  { sector: 'Electricity, gas, steam and air conditioning supply', shortName: 'Utilities', avgSalary: 289509, employees: 17638, category: 'other' },
  { sector: 'Construction', shortName: 'Construction', avgSalary: 271504, employees: 43279, category: 'other' },
  { sector: 'Human health and social work activities', shortName: 'Healthcare', avgSalary: 268990, employees: 55585, category: 'mass-employment' },
  { sector: 'Manufacturing', shortName: 'Manufacturing', avgSalary: 252784, employees: 94624, category: 'mass-employment' },
  { sector: 'Wholesale and retail trade', shortName: 'Trade', avgSalary: 227841, employees: 139530, category: 'mass-employment' },
  { sector: 'Water supply; sewerage, waste management', shortName: 'Water & Waste', avgSalary: 216509, employees: 7352, category: 'other' },
  { sector: 'Real estate activities', shortName: 'Real Estate', avgSalary: 214222, employees: 9023, category: 'other' },
  { sector: 'Administrative and support service activities', shortName: 'Admin Services', avgSalary: 211852, employees: 24868, category: 'other' },
  { sector: 'Agriculture, forestry and fishing', shortName: 'Agriculture', avgSalary: 204465, employees: 13479, category: 'other' },
  { sector: 'Education', shortName: 'Education', avgSalary: 170894, employees: 127189, category: 'mass-employment' },
  { sector: 'Accommodation and food service activities', shortName: 'Hospitality', avgSalary: 154379, employees: 0, category: 'other' },
  { sector: 'Other service activities', shortName: 'Other Services', avgSalary: 150498, employees: 31669, category: 'other' },
] as SectorData[]).filter(s => s.employees > 0);

export const getSectorColor = (category: SectorData['category']): string => {
  switch (category) {
    case 'highlight':
      return 'hsl(200, 85%, 60%)'; // IT & Telecom accent
    case 'high-paying':
      return 'hsl(160, 70%, 55%)';
    case 'mass-employment':
      return 'hsl(35, 95%, 60%)';
    default:
      return 'hsl(220, 20%, 50%)';
  }
};

export const formatSalary = (value: number): string => {
  return (value / 1000).toFixed(0) + 'K';
};

export const formatEmployees = (value: number): string => {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toString();
};
