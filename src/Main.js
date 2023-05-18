import { Thoughts } from 'Thoughts';
import React from 'react'
import { useSelector } from 'react-redux';
import { BackgroundImage } from 'Background';
import { Loading } from 'Loading';

export const Main = () => {
  const loading = useSelector((store) => store.ui.isLoading)
  return (
    <main style={{ position: 'relative' }}>
      {loading && <Loading />}
      <BackgroundImage />
      <Thoughts />
    </main>
  )
}