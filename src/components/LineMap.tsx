import { LatLngExpression } from "leaflet";
import { Polyline } from "react-leaflet";
import { Shape } from "../interfaces/shape";

interface lineMapProps {
  shape: Shape;
}

export const LineMap = ({ shape }: lineMapProps) => {
  const routeColor = shape.route_color;
  const coordinates: LatLngExpression[][] = shape.shapes.map((shapePoint) =>
    shapePoint.coordinates.map((coordinate) => [
      coordinate.shape_lat,
      coordinate.shape_lon,
    ])
  );

  return (
    <div>
      {coordinates.map((coordinate, index) => {
        return (
          <Polyline
            positions={coordinate}
            color={`#${routeColor}`}
            key={index}
          ></Polyline>
        );
      })}
    </div>
  );
};
