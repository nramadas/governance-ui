import { PublicKey } from '@solana/web3.js';

import { SmallCard } from '@hub/components/DiscoverPage/SmallCard';
import { NFT as NFTIcon } from '@hub/components/icons/NFT';
import cx from '@hub/lib/cx';

export const ITEMS = [
  {
    bannerImgSrc: '/realms/RCH/banner.png',
    description:
      'The standard for enabling modern communities to share ideas, make decisions, and collectively manage treasuries.',
    iconImgSrc: '/realms/RCH/icon.png',
    name: 'Realms Community Hub',
    publicKey: new PublicKey('9efHuf3HAKiMDWNhgJyZW1Zyo8P7rRhAMXoJa9vpRo1e'),
    urlId: 'RCH',
  },
  {
    bannerImgSrc: '/realms/RCH/banner.png',
    description:
      'The standard for enabling modern communities to share ideas, make decisions, and collectively manage treasuries.',
    iconImgSrc: '/realms/RCH/icon.png',
    name: 'Realms Community Hub',
    publicKey: new PublicKey('9efHuf3HAKiMDWNhgJyZW1Zyo8P7rRhAMXoJa9vpRo1e'),
    urlId: 'RCH',
  },
  {
    bannerImgSrc: '/realms/RCH/banner.png',
    description:
      'The standard for enabling modern communities to share ideas, make decisions, and collectively manage treasuries.',
    iconImgSrc: '/realms/RCH/icon.png',
    name: 'Realms Community Hub',
    publicKey: new PublicKey('9efHuf3HAKiMDWNhgJyZW1Zyo8P7rRhAMXoJa9vpRo1e'),
    urlId: 'RCH',
  },
  {
    bannerImgSrc: '/realms/RCH/banner.png',
    description:
      'The standard for enabling modern communities to share ideas, make decisions, and collectively manage treasuries.',
    iconImgSrc: '/realms/RCH/icon.png',
    name: 'Realms Community Hub',
    publicKey: new PublicKey('9efHuf3HAKiMDWNhgJyZW1Zyo8P7rRhAMXoJa9vpRo1e'),
    urlId: 'RCH',
  },
];

interface Props {
  className?: string;
}

export function NotableNFTs(props: Props) {
  return (
    <section className={props.className}>
      <div className="flex items-center space-x-2">
        <NFTIcon className="fill-neutral-700 h-4 w-4" />
        <div className="text-sm text-neutral-700 uppercase font-semibold">
          notable nft collections
        </div>
      </div>
      <div className="text-neutral-500 max-w-3xl">
        With more than 20.2 million minted, Solana NFTs have generated more than
        $2.5 Billion in sales to more than 5.8 million wallets.
      </div>
      <div
        className={cx('grid', 'grid-cols-4', 'mt-6', 'gap-3', 'items-center')}
      >
        {ITEMS.map((item, i) => (
          <div className="flex-shrink-0 max-w-[290px] h-56" key={i}>
            <SmallCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
}
