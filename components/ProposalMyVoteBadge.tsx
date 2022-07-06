import {
  Proposal,
  ProgramAccount,
  VoteRecord,
  Realm,
} from '@solana/spl-governance'
import classNames from 'classnames'
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/solid'

import { isYesVote } from '@models/voteRecords'
import useRealm from '@hooks/useRealm'
import useWalletStore from '../stores/useWalletStore'
import Tooltip from './Tooltip'

interface VoteRecords {
  [proposal: string]: ProgramAccount<VoteRecord>
}

function getOwnVoteRecord(
  communityDelegateVoteRecords: VoteRecords,
  councilDelegateVoteRecords: VoteRecords,
  ownVoteRecords: VoteRecords,
  proposal: Omit<ProgramAccount<Proposal>, 'owner'>,
  realm?: ProgramAccount<Realm>
): ProgramAccount<VoteRecord> | undefined {
  const proposalKey = proposal.pubkey.toBase58()
  const councilDelegateVote = councilDelegateVoteRecords[proposalKey]
  const communityDelegateVote = communityDelegateVoteRecords[proposalKey]
  const ownRecord = ownVoteRecords[proposalKey]
  const governingTokenMint = proposal.account.governingTokenMint.toBase58()

  if (
    councilDelegateVote &&
    governingTokenMint === realm?.account?.config?.councilMint?.toBase58()
  ) {
    return councilDelegateVote
  }

  if (
    communityDelegateVote &&
    governingTokenMint === realm?.account?.communityMint.toBase58()
  ) {
    return communityDelegateVote
  }

  return ownRecord
}

interface Props {
  className?: string
  proposal: Omit<ProgramAccount<Proposal>, 'owner'>
}

export default function ProposalMyVoteBadge(props: Props) {
  const { realm } = useRealm()
  const communityDelegateVoteRecords = useWalletStore(
    (s) => s.communityDelegateVoteRecordsByProposal
  )
  const councilDelegateVoteRecords = useWalletStore(
    (s) => s.councilDelegateVoteRecordsByProposal
  )
  const ownVoteRecords = useWalletStore((s) => s.ownVoteRecordsByProposal)

  const ownVoteRecord = getOwnVoteRecord(
    communityDelegateVoteRecords,
    councilDelegateVoteRecords,
    ownVoteRecords,
    props.proposal,
    realm
  )

  if (!ownVoteRecord) {
    return null
  }

  const isYes = isYesVote(ownVoteRecord.account)

  return (
    <Tooltip content={isYes ? 'You voted "Yes"' : 'You voted "No"'}>
      <div
        className={classNames(
          props.className,
          'border',
          'rounded-full',
          'flex-row',
          'flex',
          'gap-1',
          'items-center',
          'p-[6px]',
          'text-white',
          'text-xs',
          isYes ? 'border-[#8EFFDD]' : 'border-[#FF7C7C]'
        )}
      >
        {isYes ? (
          <ThumbUpIcon className="w-3 h-3 fill-[#8EFFDD]" />
        ) : (
          <ThumbDownIcon className="w-3 h-3 fill-[#FF7C7C]" />
        )}
      </div>
    </Tooltip>
  )
}
