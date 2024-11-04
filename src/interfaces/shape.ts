export interface Shape {
  route_id: string;
  route_color: string;
  shapes: ShapePoint[];
}

export interface ShapePoint {
  shape_id: string;
  coordinates: coordinatesShapes[];
}

export interface coordinatesShapes {
  shape_lat: number;
  shape_lon: number;
}