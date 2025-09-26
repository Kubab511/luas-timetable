export interface Stop {
  name: string;
  abbreviation: string;
  created: string;
}

export interface Tram {
  dueMins: string | number;
  destination: string;
}

export interface Direction {
  name: string;
  trams: Tram[];
}

export interface Timetable {
  stop: Stop;
  message: string;
  directions: Direction[];
}
