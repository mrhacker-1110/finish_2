import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ExplorePage from '../pages/ExplorePage';
import PlaceDetailPage from '../pages/PlaceDetailPage';
import MyTripPage from '../pages/MyTripPage';
import CommunityPage from '../pages/CommunityPage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';

/**
 * AppRoutes — централизованная конфигурация маршрутов приложения.
 * Все route-ы определены в одном месте для удобства поддержки.
 */
export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  PLACE_DETAIL: '/place/:id',
  MY_TRIP: '/my-trip',
  COMMUNITY: '/community',
  ABOUT: '/about',
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />
      <Route path={ROUTES.PLACE_DETAIL} element={<PlaceDetailPage />} />
      <Route path={ROUTES.MY_TRIP} element={<MyTripPage />} />
      <Route path={ROUTES.COMMUNITY} element={<CommunityPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
