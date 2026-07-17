import { AttributionControl,
} from 'maplibre-gl';

 export function addAttribution(map){
    map.addControl(
      new AttributionControl({
        compact: true,
        customAttribution: 'Natural Earth Dataset, Nickelodeon'
      }),
      'bottom-right' 
    );
 }