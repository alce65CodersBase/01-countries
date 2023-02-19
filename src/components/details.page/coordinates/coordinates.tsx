import { coordinates } from './coordinates.module.scss';

export function Coordinates({ latLng }: { latLng: number[] }) {
  return (
    <dl className={coordinates} role="group">
      <dt>Latitude</dt>
      <dd>{latLng[0].toString()}</dd>
      <dt>Longitude</dt>
      <dd>{latLng[1].toString()}</dd>
    </dl>
  );
}
