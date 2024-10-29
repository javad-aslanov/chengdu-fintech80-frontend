import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import IncidentDetails from './pages/IncidentDetails.tsx';
import CustomerDetails from './pages/CustomerDetails.tsx';
import Demo from './pages/Demo.tsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>

        <Route
          index
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <ECommerce />
            </>
          }
        />

        <Route
          path="/demo"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />

              <Demo />
            </>
          }
        />

        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/customer-details"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <CustomerDetails />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <FormLayout />
            </>
          }
        />

        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <Buttons />
            </>
          }
        />
        <Route path="/incident-details" element={<>
          <>
            <PageTitle title="Path-Aware Insurance Pricing" />
            <IncidentDetails />
          </>
        </>} />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Path-Aware Insurance Pricing" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
