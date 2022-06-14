import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { isWizardValid } from '@utils/formValidation'

import CreateDAOWizard from '@components/NewRealmWizard/CreateDAOWizard'
import useWalletStore from 'stores/useWalletStore'

export const Section = ({ children }) => {
  return (
    <div className="w-full mx-auto lg:w-5/6  max-w-[770px] px-0 pb-[250px] relative min-h-[calc(100vh_-_100px)]">
      {children}
    </div>
  )
}

export default function FormPage({
  autoInviteWallet = false,
  type,
  steps,
  handleSubmit,
  submissionPending,
}) {
  const { connected, current: wallet } = useWalletStore((s) => s)
  const userAddress = wallet?.publicKey?.toBase58()
  const [formData, setFormData] = useState<any>({
    memberAddresses:
      autoInviteWallet && userAddress ? [userAddress] : undefined,
  })
  const { query, push } = useRouter()
  const currentStep = formData?.currentStep || 0

  useEffect(() => {
    async function tryToConnect() {
      try {
        if (!connected) {
          if (wallet) await wallet.connect()
        }
        if (!wallet?.publicKey) {
          throw new Error('No valid wallet connected')
        }
      } catch (err) {
        if (currentStep > 0) handlePreviousButton(1)
      }
    }

    tryToConnect()
  }, [connected])

  useEffect(() => {
    if (currentStep > 0 && !isWizardValid({ currentStep, steps, formData })) {
      handlePreviousButton(currentStep)
    }
  }, [currentStep])

  function handleNextButtonClick({ step: fromStep, data }) {
    const updatedFormState = {
      ...formData,
      ...data,
    }
    const nextStep = steps
      .map(
        ({ required }) =>
          required === 'true' ||
          !!eval(required.replace('form', 'updatedFormState'))
      )
      .indexOf(true, fromStep + 1)

    updatedFormState.currentStep = nextStep > -1 ? nextStep : steps.length + 1

    console.log('next button clicked', fromStep, nextStep)

    for (const key in updatedFormState) {
      if (updatedFormState[key] == null) {
        delete updatedFormState[key]
      }
    }
    setFormData(updatedFormState)
  }

  function handlePreviousButton(fromStep) {
    console.log(
      'previous button clicked from step:',
      fromStep,
      currentStep,
      query
    )

    if (fromStep === 0) {
      push(
        {
          pathname: '/realms/new/',
          query: query?.cluster ? { cluster: query.cluster } : {},
        },
        undefined,
        { shallow: true }
      )
    } else {
      const previousStep = steps
        .map(
          ({ required }) =>
            required === 'true' || !!eval(required.replace('form', 'formData'))
        )
        .lastIndexOf(true, fromStep - 1)

      const updatedFormState = {
        ...formData,
        currentStep: previousStep,
      }

      setFormData(updatedFormState)
    }
  }

  return (
    <Section>
      <CreateDAOWizard
        type={type}
        steps={steps}
        currentStep={currentStep}
        formData={formData}
        handlePreviousButton={handlePreviousButton}
        handleNextButtonClick={handleNextButtonClick}
        handleSubmit={handleSubmit}
        submissionPending={submissionPending}
      />
    </Section>
  )
}
