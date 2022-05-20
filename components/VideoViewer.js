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

const VideoViewer = (props) => {
  const sphereElementRef = React.useRef();

  useEffectOnce(() => {
    const spherePlayerInstance = new Viewer({
      adapter: [
        EquirectangularVideoAdapter,
        {
          progressbar: true, // default false
          bigbutton: true, // default false
          autoplay: true, // default false
        },
      ],
      container: sphereElementRef.current,
      panorama: {
        source: 'videos/bourg_2.mp4',
      },
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
          {
            markers: [
              {
                // image marker that opens the panel when clicked
                id: 'image',
                longitude: 0.32,
                latitude: 0.11,
                image: 'https://photo-sphere-viewer.js.org/assets/pin-blue.png',
                width: 32,
                height: 32,
                anchor: 'bottom center',
                tooltip: 'A image marker. <b>Click me!</b>',
                content: '<h1>Hello World</h1>',
              },
            ],
          },
        ],
        VideoPlugin,
      ],
    });

    const markersPlugin = spherePlayerInstance.getPlugin(MarkersPlugin);
    const videoPlugin = spherePlayerInstance.getPlugin(VideoPlugin);

    markersPlugin.on('over-marker', (e, marker) => {
      console.log('hovering marker', marker);

      markersPlugin.updateMarker({
        id: marker.id,
      });
    });

    // videoPlugin.on('progress', (e, progress) => {
    //   console.log('progress', progress.time);
    // });

    videoPlugin.on('start', (e) => {
      console.log('video start');

      // Fire sound
    });

    // unmount component instructions
    return () => {
      spherePlayerInstance.destroy();
    };
  }, []); // will only be called when the src prop gets updated

  return (
    <>
      <div
        ref={sphereElementRef}
        id="viewer"
        style={{ width: '100vw', height: '100vh' }}
      />
    </>
  );
};

export default VideoViewer;
