import { SyntheticEvent, useState } from 'react';
import { BasePhoto } from '../../../models/photos';
import { carousel, carouselSmaller } from './carousel.module.scss';

type CarrouselProps = {
  images: BasePhoto[];
};
export function Carousel({ images }: CarrouselProps) {
  const [active, setActive] = useState(0);

  const handleIndexClick = (event: SyntheticEvent<HTMLImageElement>) => {
    if (!(event.target instanceof HTMLImageElement)) return;
    const imgElement = event.target;
    setActive(Number(imgElement.dataset.index ?? 0));
  };

  if (!images.length) return <></>;

  return (
    <div className={carousel}>
      <img
        src={images[active].urls.regular}
        alt={images[active].altDescription}
      />
      <div className={carouselSmaller}>
        {images.map((photo, index) => (
          <img
            key={photo.id}
            src={photo.urls.thumb}
            className={index === active ? 'active' : ''}
            alt="animal thumbnail"
            onClick={handleIndexClick}
            data-index={index}
          />
        ))}
      </div>
    </div>
  );
}
