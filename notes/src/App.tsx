import Footer from '@/components/footer'
import Header from '@/components/header'
import NavBar from '@/components/navbar'
import Favourite from '@containers/favourite'
import Home from '@containers/home'
import Trash from '@containers/trash'
import { Layout, Skeleton } from 'antd'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import styles from './App.module.scss'
import ErrorBoundary from './components/error-boundary'
import NoteModal from './components/note-modal'

function App() {
  return (
    <>
      <BrowserRouter basename="/notes">
        <Layout className={styles.layout}>
          {/* Header */}
          <Header />
          {/* End Header */}

          <Layout>
            {/* Nav Bar */}
            <NavBar />
            {/* End Nav Bar */}

            {/* Main Content */}
            <ErrorBoundary>
              <Suspense fallback={<Skeleton />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/favourite" element={<Favourite />} />
                  <Route path="/trash" element={<Trash />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
            {/* End Main Content */}
          </Layout>

          {/* Footer */}
          <Footer />
          {/* End Footer */}

          {/* Modal */}
          <NoteModal />
          {/* EndModal */}
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
