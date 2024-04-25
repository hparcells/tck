import { useEffect, useState } from 'react';

import Modal from '@/components/ui/Modal/Modal';

import { useProfile } from '@/hooks/profile';

import ProfileTabProfile from '../tab/ProfileTabProfile';
import ProfileTabWallet from '../tab/ProfileTabWallet/ProfileTabWallet';

import classes from './ModalProfile.module.scss';

function ModalProfile() {
  const profile = useProfile();

  const [tab, setTab] = useState<'profile' | 'wallet'>('profile');

  useEffect(() => {
    setTab('profile');
  }, [profile.isOpen]);

  return (
    <Modal isOpen={profile.isOpen} open={profile.open} close={profile.close}>
      <div className={classes.wrapper}>
        <span>
          <button
            onClick={() => {
              setTab('profile');
            }}
          >
            Profile
          </button>
          <button
            onClick={() => {
              setTab('wallet');
            }}
          >
            Wallet
          </button>
        </span>
        {
          {
            profile: <ProfileTabProfile />,
            wallet: <ProfileTabWallet />
          }[tab]
        }
      </div>
    </Modal>
  );
}

export default ModalProfile;