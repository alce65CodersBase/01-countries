import { BasePhoto } from '../../../models/photos';

type GridProps = {
  photos: BasePhoto[];
  photoGrid: string;
};
export function Grid({ photos, photoGrid }: GridProps) {
  return (
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
  );
}
