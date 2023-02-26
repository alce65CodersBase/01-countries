import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/app.context';
import { getPhotos } from '../../../service/repo/un.splash.api.repo';
import { BasePhoto } from '../../../models/photos';
import { photoGrid } from './visit.module.scss';

export function Visit() {
  const [countryState] = useContext(AppContext);

  const [photos, setPhotos] = useState<BasePhoto[]>([]);

  useEffect(() => {
    const loadPhotos = async () => {
      const data = await getPhotos(countryState.country);
      console.log(data);
      setPhotos(data);
    };

    loadPhotos();
  }, []);

  return (
    <>
      <h1>Visit {countryState.country}</h1>
      <ul className={photoGrid}>
        {photos.map((item) => (
          <li key={item.id}>
            <img
              src={item.urls.thumb}
              alt={item.altDescription}
              title={item.description}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
