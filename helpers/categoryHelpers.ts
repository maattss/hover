import { Colors } from '../theme';
import { GeoFenceCategory } from '../types/geoFenceTypes';

export const getCategoryIconName = (category: GeoFenceCategory | undefined) => {
  switch (category) {
    case GeoFenceCategory.CULTURE:
      return 'theater-masks';
    case GeoFenceCategory.SOCIAL:
      return 'users';
    case GeoFenceCategory.EXERCISE:
      return 'dumbbell';
    case GeoFenceCategory.EDUCATION:
      return 'graduation-cap';
    default:
      return 'question-circle';
  }
};
export const getCategoryColor = (category: GeoFenceCategory | undefined) => {
  switch (category) {
    case GeoFenceCategory.CULTURE:
      return Colors.almostWhite;
    case GeoFenceCategory.SOCIAL:
      return Colors.blue;
    case GeoFenceCategory.EXERCISE:
      return Colors.green;
    case GeoFenceCategory.EDUCATION:
      return Colors.red;
    default:
      return Colors.gray800;
  }
};
