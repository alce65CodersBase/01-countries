import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/app.context';
import { getPhotos } from '../../../service/repo/un.splash.api.repo';
import { BasePhoto } from '../../../models/photos';
import { photoGrid } from './visit.module.scss';
import { Grid } from '../grid/grid';
import { Carousel } from '../carousel/carousel';

type VisitProps = { type?: 'carousel' | 'grid' };
export function Visit({ type }: VisitProps) {
  const [countryState] = useContext(AppContext);

  const [photos, setPhotos] = useState<BasePhoto[]>([]);
  const [output] = useState(type || 'carousel');

  useEffect(() => {
    const loadPhotos = async () => {
      let data = await getPhotos(countryState.country);
      if (!data.length) {
        data = await getPhotos(countryState.region);
      }

      if (!data.length) {
        data = await getPhotos(countryState.continent);
      }

      console.log(data);
      setPhotos(data);
    };

    loadPhotos();
  }, []);

  return (
    <>
      <h1>Visit {countryState.country}</h1>
      <p>
        In {countryState.region} ({countryState.continent})
      </p>
      {output === 'grid' ? (
        <Grid photos={photos} photoGrid={photoGrid}></Grid>
      ) : (
        <Carousel images={photos}></Carousel>
      )}
    </>
  );
}
