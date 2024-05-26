import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '../../pages/protected-route/ProtectedRoute.component';
import { getUserMe, getUsers } from '../../store/users/users.reducer';
import BaseContent from '../base-content/BaseContent.component';
import BaseHeader from '../base-header/BaseHeader.component';
import BaseSidebar from '../base-sidebar/BaseSidebar.component';
import './BaseLayout.styles.scss';

function BaseLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserMe());
  }, [dispatch]);
  return (
    <ProtectedRoute>
      <Layout className="base-layout">
        <BaseSidebar />
        <Layout>
          <BaseHeader />
          <BaseContent>
            <Outlet />
          </BaseContent>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
}

export default BaseLayout;
