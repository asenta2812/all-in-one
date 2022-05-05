import { SearchOutlined } from '@ant-design/icons'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'
import useDebounce from '@hooks/use-debounce'
import { Input } from 'antd'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY)

function Gifs({ onClickGif, sticker }) {
  const [searchTerm, setSearchTerm] = useState('')

  const debounceSearchTerm = useDebounce(searchTerm, 500)

  const fetchGifs = (offset) => {
    return giphy.search(debounceSearchTerm, {
      offset,
      limit: 10,
      lang: 'vi',
      type: sticker ? 'stickers' : 'gifs',
    })
  }
  const handleClickGif = ({ id }) => {
    onClickGif({ type: sticker ? 'sticker' : 'gif', key: id })
  }

  return (
    <div className="h-full pr-[10px]">
      <Input
        placeholder={`Search ${sticker ? 'Stickers' : 'GIFs'}...`}
        prefix={<SearchOutlined />}
        allowClear
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid
        width={280}
        columns={2}
        fetchGifs={fetchGifs}
        key={debounceSearchTerm}
        noLink
        hideAttribution
        onGifClick={handleClickGif}
        className="h-full overflow-y-auto mt-[10px]"
      />
    </div>
  )
}
Gifs.propTypes = {
  onClickGif: PropTypes.func.isRequired,
  sticker: PropTypes.bool,
}
export default Gifs
