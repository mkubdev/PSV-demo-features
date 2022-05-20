import React, { useEffect } from 'react';
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers';
import { GyroscopePlugin } from 'photo-sphere-viewer/dist/plugins/gyroscope';
import { VisibleRangePlugin } from 'photo-sphere-viewer/dist/plugins/visible-range';
import { Viewer } from 'photo-sphere-viewer';
import { useEffectOnce } from 'usehooks-ts';
import { CompassPlugin } from 'photo-sphere-viewer/dist/plugins/compass';
import { VirtualTourPlugin } from 'photo-sphere-viewer/dist/plugins/virtual-tour';
import { VideoPlugin } from 'photo-sphere-viewer/dist/plugins/video';
import { EquirectangularVideoAdapter } from 'photo-sphere-viewer/dist/adapters/equirectangular-video';

const VideoViewer = (props) => {
  const sphereElementRef = React.useRef();

  useEffectOnce(() => {
    const spherePlayerInstance = new Viewer({
      // adapter: [
      //   EquirectangularVideoAdapter,
      //   {
      //     progressbar: true, // default false
      //     bigbutton: true, // default false
      //     autoplay: true, // default false
      //   },
      // ],
      container: sphereElementRef.current,
      loadingImg:
        'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
      touchmoveTwoFingers: true,
      mousewheelCtrlKey: true,
      caption: 'Test PSV TourViewer RTrucks <b>&copy; mkubdev</b>',
      defaultLong: '100deg', // default doc
      plugins: [
        [
          VirtualTourPlugin,
          {
            positionMode: VirtualTourPlugin.MODE_GPS,
            renderMode: VirtualTourPlugin.MODE_3D,
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
        // [VideoPlugin],
      ],
      navbar: 'zoom move download nodesList caption fullscreen',
    });

    spherePlayerInstance.setOption('fisheye', true);

    // Get the viewer position
    spherePlayerInstance.on('position-updated', (e, position) => {
      console.log(
        `new position is longitude: ${position.longitude} latitude: ${position.latitude}`
      );
    });

    // Get the mouse position inside the panorama
    spherePlayerInstance.on('click', (e, data) => {
      console.log(
        `${data.rightclick ? 'right ' : ''}clicked at longitude: ${
          data.longitude
        } latitude: ${data.latitude}`
      );
    });

    const markersPlugin = spherePlayerInstance.getPlugin(MarkersPlugin);
    const virtualTour = spherePlayerInstance.getPlugin(VirtualTourPlugin);

    virtualTour.setNodes(
      [
        {
          id: '1',
          panorama:
            'https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-1.jpg',
          thumbnail:
            'https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-1-thumb.jpg',
          name: 'One',
          links: [{ nodeId: '2' }],
          markers: [
            {
              id: 'marker-1',
              image: 'https://photo-sphere-viewer.js.org/assets/pin-red.png',
              tooltip: 'Cape Florida Light, Key Biscayne',
              width: 32,
              height: 32,
              anchor: 'bottom center',
              longitude: '105deg',
              latitude: '35deg',
            },
          ],
          position: [-80.156479, 25.666725, 3],
          panoData: { poseHeading: 327 },
        },
        {
          id: '2',
          panorama:
            'https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-2.jpg',
          thumbnail:
            'https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-2-thumb.jpg',
          name: 'Two',
          links: [{ nodeId: '3' }, { nodeId: '1' }],
          position: [-80.156168, 25.666623, 3],
          panoData: { poseHeading: 318 },
        },
        {
          id: '3',
          panorama:
            'https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-3.jpg',
          thumbnail:
            'https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-3-thumb.jpg',
          name: 'Three',
          links: [{ nodeId: '4' }, { nodeId: '2' }, { nodeId: '5' }],
          position: [-80.155932, 25.666498, 5],
          panoData: { poseHeading: 328 },
        },
        {
          id: '4',
          panorama:
            'https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-4.jpg',
          thumbnail:
            'https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-4-thumb.jpg',
          name: 'Four',
          links: [{ nodeId: '3' }, { nodeId: '5' }],
          position: [-80.156089, 25.666357, 3],
          panoData: { poseHeading: 78 },
        },
        {
          id: '5',
          panorama:
            'https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-5.jpg',
          thumbnail:
            'https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-5-thumb.jpg',
          name: 'Five',
          links: [{ nodeId: '6' }, { nodeId: '3' }, { nodeId: '4' }],
          position: [-80.156292, 25.666446, 2],
          panoData: { poseHeading: 190 },
        },
        {
          id: '6',
          panorama:
            'https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-6.jpg',
          thumbnail:
            'https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-6-thumb.jpg',
          name: 'Six',
          links: [{ nodeId: '5' }],
          position: [-80.156465, 25.666496, 2],
          panoData: { poseHeading: 328 },
        },
      ],
      '2'
    );

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
