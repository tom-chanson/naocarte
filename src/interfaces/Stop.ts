export interface Stop {
  stop_id: string;
  stop_name: string;
  stop_lat: number;
  stop_lon: number;
  stop_lines: stopLines[];
}

export interface stopLines {
  route_id: string;
  route_short_name: string;
  wheelchair_boarding: wheelchairBoardingAccessibility;
  route_type: lineType;
  route_color: string;
  route_text_color: string;
}

export enum wheelchairBoardingAccessibility {
  NO_INFORMATION = 0,
  ACCESSIBLE = 1,
  NOT_ACCESSIBLE = 2,
}

export enum lineType {
  TRAM = 0,
  BUS = 3,
  NAVIBUS = 4,
}
