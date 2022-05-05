import React, { memo, useRef, useState } from 'react'
import HeaderSearch from '@components/header-search'
import RecentMessages from '@components/recent-messages'
function SideBar() {
  const [width, setWidth] = useState('100%')
  const colRef = useRef()
  const cursorRef = useRef()
  console.log('re-render sidebar')
  return (
    <div
      ref={colRef}
      className="grid grid-rows-[60px_calc(100vh-70px)] relative select-none"
      style={{ width }}
    >
      <HeaderSearch />
      <div className="h-full overflow-y-auto">
        <RecentMessages />
      </div>
      <div
        ref={cursorRef}
        className="absolute w-[2px] h-full top-0 right-0 bg-gray-200 cursor-col-resize hover:bg-gray-500 transition-all"
      ></div>
    </div>
  )
}

export default memo(SideBar)
