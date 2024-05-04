type CommercialBusinessType =
  | 'Café'
  | 'Store'
  | 'Restaurant'
  | 'Salon'
  | 'Hotel'
  | 'Gallery';

type IndustryType =
  | 'Factory'
  | 'Warehouse'
  | 'Plant'
  | 'Depot'
  | 'Complex'
  | 'Workshop';

const commercialBusinessTypes: CommercialBusinessType[] = [
  'Café',
  'Store',
  'Restaurant',
  'Salon',
  'Hotel',
  'Gallery',
];

const industryTypes: IndustryType[] = [
  'Factory',
  'Warehouse',
  'Plant',
  'Depot',
  'Complex',
  'Workshop',
];

const adjectives: string[] = [
  'Golden',
  'Mystic',
  'Vintage',
  'Urban',
  'Royal',
  'Grand',
  'Sunny',
  'Silent',
  'Happy',
  'Bright',
  'Cozy',
  'Charming',
];

const descriptors: string[] = [
  'Global',
  'Central',
  'Advanced',
  'Heavy',
  'Precision',
  'Automated',
  'Dynamic',
  'Efficient',
  'Massive',
  'Integrated',
  'Modular',
  'Reliable',
];

export { commercialBusinessTypes, industryTypes, adjectives, descriptors };

