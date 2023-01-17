import ChevronDownIcon from '@carbon/icons-react/lib/ChevronDown';
import type { PublicKey } from '@solana/web3.js';
import { useState } from 'react';

import { AdvancedOptions } from '../AdvancedOptions';
import { CommunityDetails } from '../CommunityDetails';
import { CouncilDetails } from '../CouncilDetails';
import { CommunityRules, CouncilRules } from '../types';
import { VotingDuration } from '../VotingDuration';
import { WalletDescription } from '../WalletDescription';
import cx from '@hub/lib/cx';
import { FormProps } from '@hub/types/FormProps';

interface Props
  extends FormProps<{
    communityRules: CommunityRules;
    councilRules: CouncilRules;
    coolOffHours: number;
    depositExemptProposalCount: number;
    maxVoteDays: number;
    minInstructionHoldupDays: number;
  }> {
  className?: string;
  currentCommunityRules: CommunityRules;
  currentCouncilRules: CouncilRules;
  governanceAddress: PublicKey;
  walletAddress: PublicKey;
}

export function Form(props: Props) {
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);

  return (
    <article className={props.className}>
      <WalletDescription
        className="mb-3"
        governanceAddress={props.governanceAddress}
        walletAddress={props.walletAddress}
      />
      <h1 className="text-5xl font-medium m-0 mb-4 dark:text-white ">
        What changes would you like to make to this wallet?
      </h1>
      <p className="m-0 mb-16 dark:text-neutral-300">
        Submitting updates to a wallet’s rules will create a proposal for the
        DAO to vote on. If approved, the updates will be ready to be executed.
      </p>
      <div className="space-y-8">
        <VotingDuration
          coolOffHours={props.coolOffHours}
          maxVoteDays={props.maxVoteDays}
          onCoolOffHoursChange={props.onCoolOffHoursChange}
          onMaxVoteDaysChange={props.onMaxVoteDaysChange}
        />
        <CommunityDetails
          communityRules={props.communityRules}
          currentCommunityRules={props.currentCommunityRules}
          onCommunityRulesChange={props.onCommunityRulesChange}
        />
        {props.councilRules && props.currentCouncilRules && (
          <CouncilDetails
            councilRules={props.councilRules}
            currentCouncilRules={props.currentCouncilRules}
            onCouncilRulesChange={props.onCouncilRulesChange}
          />
        )}
      </div>
      <div className="mt-16">
        <button
          className="flex items-center text-sm text-neutral-500"
          onClick={() => setShowAdvanceOptions((cur) => !cur)}
        >
          Advanced Options{' '}
          <ChevronDownIcon
            className={cx(
              'fill-current',
              'h-4',
              'transition-transform',
              'w-4',
              showAdvanceOptions && '-rotate-180',
            )}
          />
        </button>
        {showAdvanceOptions && (
          <AdvancedOptions
            className="mt-2.5"
            depositExemptProposalCount={props.depositExemptProposalCount}
            minInstructionHoldupDays={props.minInstructionHoldupDays}
            onDepositExemptProposalCountChange={
              props.onDepositExemptProposalCountChange
            }
            onMinInstructionHoldupDaysChange={
              props.onMinInstructionHoldupDaysChange
            }
          />
        )}
      </div>
    </article>
  );
}
