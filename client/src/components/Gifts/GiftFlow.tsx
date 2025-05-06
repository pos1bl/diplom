import { FC, Ref, useEffect, useState } from 'react';
import { GIFT_OPTIONS, GiftOption } from '@utils/Giftspage';
import { Options } from './GiftOptions';
import { PurchaseForm } from './GiftPurchaseForm';
import useStore from '@hooks/useStore';
import { useNavigate } from '@tanstack/react-router';
import { DEFAULT_PAGE } from '@utils/NavigationList';
import { observer } from 'mobx-react-lite';

type Props = {
  ref: Ref<HTMLDivElement>,
};

export const Flow:FC<Props> = observer(({ ref }) => {
  const [selectedGift, setSelectedGift] = useState<GiftOption | null>(() => {
    const pendingId = localStorage.getItem('pendingGiftId');
    if (pendingId) {
      const gift = GIFT_OPTIONS.find((g) => g.id === Number(pendingId));
      localStorage.removeItem('pendingGiftId');
      return gift || null;
    }
    return null;
  });

  const { isAuth } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && selectedGift) {
      setSelectedGift(null);
    }
  }, [isAuth]);

  const handleSelect = (gift: GiftOption) => {
    if (!isAuth) {
      localStorage.setItem('pendingGiftId', String(gift.id));
      sessionStorage.setItem('afterLoginScrollTo', 'gift-options');
      navigate({
        to: DEFAULT_PAGE.LOGIN as '/sign-in',
        search: { redirect: DEFAULT_PAGE.GIFTS as '/gifts' }
      });
      return;
    }
    setSelectedGift(gift);
  };

  return (
    <div ref={ref} data-scroll-target="gift-options">
      {selectedGift ? (
        <PurchaseForm
          gift={selectedGift}
          onBack={() => setSelectedGift(null)}
        />
      ) : (
        <Options onSelect={handleSelect} />
      )}
    </div>
  );
});
