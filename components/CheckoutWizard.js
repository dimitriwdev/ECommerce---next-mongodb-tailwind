import React from 'react'

export default function CheckoutWizard({ activeStep = 0 }) {

  const steps = ['User Login', 'Shipping Adress', 'Payment Method', 'Place Order']

  return (
    <div className='my-5 flex flex-wrap'>
      {
        steps.map((step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center ${index <= activeStep ? 'border-primary text-primary' : 'border-disabled text-disabled'}`}
          >
            {step}
          </div>
        ))
      }
    </div>
  )
}
