import { GiphyFetch } from '@giphy/js-fetch-api'
import { Gif } from '@giphy/react-components'
import { Spin } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY)
function GetGif({ idGif, width }) {
  const [dataGif, setDataGif] = useState()
  useEffect(() => {
    const get = async () => {
      const { data } = await gf.gif(idGif)
      setDataGif(data)
    }
    get()
  }, [idGif])
  if (!dataGif)
    return (
      <div className="h-[200px] flex items-center justify-center bg-slate-100">
        <Spin />
      </div>
    )
  return (
    <Gif
      gif={dataGif}
      width={width}
      height="100%"
      noLink
      hideAttribution
      backgroundColor="transparent"
    />
  )
}
GetGif.propTypes = {
  idGif: PropTypes.string,
  width: PropTypes.string,
}

export default GetGif
