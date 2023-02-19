import { mapContainer } from './map.module.scss';

const createURLOpen = (latLng: number[], area: number) => {
  const offset = area / 80_000;
  const offsetLat = offset > latLng[0] ? latLng[0] : offset;
  const offsetLng = offset > latLng[1] ? latLng[1] : offset;

  const bbox = [
    latLng[1] - offsetLng, // (105-15) -> 72.46582031250001
    latLng[0] - offsetLat, // (46-15) -> 31.541089879585837
    latLng[1] + offsetLng, // (105+15) -> 124.23339843750001
    latLng[0] + offsetLat, // (46+15) -> 59.17592824927138,
  ];

  console.log('Calculate Map;', { bbox }, { offset });

  const iframe = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox.join(',')
  )}&layer=mapnik`;
  return iframe;
};

export const createImgURLGoogle = (latLng: number[], area: number) => {
  const zoom = parseInt(String(area / 80_000), 10);
  console.log('Google', { zoom });
  const iframe = [
    `https://maps.googleapis.com/maps/api/staticmap`,
    `?center=${latLng.join(',')}`,
    `&zoom=${zoom}`,
    `&size=400x400`,
    `&key=YOUR_API_KEY`,
    `&signature=YOUR_SIGNATURE`,
  ];
  return iframe.filter((_item, i) => i < 3).join('');
};

const createURLGoogle = (country: string, area: number) => {
  const zoom =
    area > 2_000_000
      ? parseInt(String(area / 2_000_000), 10)
      : parseInt(String(area / 200_000), 10);
  console.log('Google zoom', 10 - zoom);
  const iframe = [
    `https://maps.google.com/maps/`,
    `?q=${country}`,
    `&z=${10 - zoom}`,
    `&output=embed`,
    `&t=`,
    `&ie=UTF8`,
    `&iwloc=`,
  ];
  return iframe.filter((_item, i) => i < 4).join('');
};

/*  Formato en el ejemplo

    <div class="mapouter">
      <div class="gmap_canvas">
        <iframe><iframe/>
      </div>
    </div>

<style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style>
<style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style>

< iframe
width="600"
height="500"
id="gmap_canvas"
frameborder="0"
scrolling="no"
marginheight="0"
marginwidth="0">
 */

type MapProps = {
  source: string;
  url: string;
  latLng: number[];
  area: number;
  country: string;
};

export function Map({ source, url, latLng, area, country }: MapProps) {
  const iframe = source.includes('Open')
    ? createURLOpen(latLng, area)
    : createURLGoogle(country, area);

  return (
    <div className={mapContainer}>
      <h3>
        <a href={url} rel="noreferrer" target="_blank">
          {source}
        </a>
      </h3>
      <iframe src={iframe}></iframe>
    </div>
  );
}
