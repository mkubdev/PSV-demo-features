import React, { useEffect } from 'react';
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers';
import { GyroscopePlugin } from 'photo-sphere-viewer/dist/plugins/gyroscope';
import { VisibleRangePlugin } from 'photo-sphere-viewer/dist/plugins/visible-range';
import { Viewer } from 'photo-sphere-viewer';
import { useEffectOnce } from 'usehooks-ts';
import { StereoPlugin } from 'photo-sphere-viewer/dist/plugins/stereo';
import { VideoPlugin } from 'photo-sphere-viewer/dist/plugins/video';
import { EquirectangularVideoAdapter } from 'photo-sphere-viewer/dist/adapters/equirectangular-video';
import { CompassPlugin } from 'photo-sphere-viewer/dist/plugins/compass';

const PhotoViewer = () => {
  const sphereElementRef = React.useRef();

  useEffectOnce(() => {
    const shperePlayerInstance = new Viewer({
      container: sphereElementRef.current,
      panorama:
        'https://cdn.rawgit.com/mistic100/Photo-Sphere-Viewer/3.1.0/example/Bryce-Canyon-National-Park-Mark-Doliner.jpg',
      // loadingImg:
      //   'https://raw.githubusercontent.com/mistic100/Photo-Sphere-Viewer/3.1.0/example/photosphere-logo.gif',
      plugins: [
        [
          CompassPlugin,
          {
            hotspots: [
              { longitude: '45deg' },
              { longitude: '60deg', color: 'red' },
            ],
          },
        ],
        [
          MarkersPlugin,
          // add this at startup from props
          {
            markers: [
              {
                id: 'image',
                longitude: 0.32,
                latitude: 0.11,
                image: 'pin-blue.png',
                width: 32,
                height: 32,
                anchor: 'bottom center',
                tooltip: 'A image marker. <b>Click me!</b>',
                content: '<h1>Hello World</h1>',
              },
            ],
          },
        ],
      ],
    });

    const markersPlugin = shperePlayerInstance.getPlugin(MarkersPlugin);

    markersPlugin.on('select-marker', (e, marker) => {
      console.log('hovering marker', marker);
      markersPlugin.updateMarker({
        id: marker.id,
      });
    });

    // unmount component instructions
    return () => {
      shperePlayerInstance.destroy();
    };
  }, []); // will only be called when the src prop gets updated

  return (
    <>
      <div
        ref={sphereElementRef}
        id="viewer"
        className=""
        style={{ width: '100vw', height: '100vh' }}
      />
    </>
  );
};

export default PhotoViewer;
