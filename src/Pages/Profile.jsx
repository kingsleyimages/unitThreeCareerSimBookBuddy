import React from 'react';
import Account from '../components/Account/Account';

function Profile({ token }) {
  return (
    <>
      <Account token={token} />
    </>
  );
}

export default Profile;
