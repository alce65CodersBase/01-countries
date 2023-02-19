import { createURLGoogle, createURLOpen } from '../../../service/maps/maps';
import { mapContainer } from './map.module.scss';

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
      <iframe src={iframe} role="presentation"></iframe>
    </div>
  );
}
