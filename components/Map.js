import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/dist/client/router'

const Map = ({ searchResults, startDate, endDate, noOfGuests }) => {
  const [selectedLocation, setSelectedLocation] = useState({})
  const router = useRouter()
  //   Transform the search results in to the
  //     { latitude: 52.516272, longitude: 13.377722 },
  //     object;

  const coordinates = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }))

  //the latitude and longitude of the center of location coordinates

  const center = getCenter(coordinates)

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  })

  const room = () => {
    router.push({
      pathname: '/rooms',
      query: {
        title: selectedLocation.title,
        check_in: startDate,
        check_out: endDate,
        noOfGuests,
      },
    })
  }

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/minakshinayak/ckshh2agcapzm17ququ9zfbpf'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults?.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div
              className='relative h-8 w-8 cursor-pointer animate-bounce'
              aria-label='push-pin'
            >
              <Image
                src='https://res.cloudinary.com/minakshi-nayak/image/upload/v1629439674/mapbox-marker-icon-red_cpfwdx.svg'
                layout='fill'
                onClick={() => setSelectedLocation(result)}
              />
            </div>
          </Marker>
          {/* {the popup that should show if we click on a marker} */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              <div
                className='flex flex-col items-center mb-0 flex-grow pt-0 px-0 cursor-pointer hover:transform transition duration-200 easy-out max-w-[240px] z-0'
                onClick={() => room}
              >
                <div className='relative h-40 w-60'>
                  <Image
                    src={result.img}
                    layout='fill'
                    className='rounded-md'
                  />
                </div>
                <div>
                  <p className='flex items-center'>
                    <StarIcon className='h-5 text-red-400' />
                    {result.star}
                  </p>
                  <p className='pt-2 text-sm text-gray-800 flex-grow'>
                    {result.description}
                  </p>
                  <p className='text-lg lg:text-xl font-semibold pb-2'>
                    {result.price}
                  </p>
                </div>
              </div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  )
}

export default Map
