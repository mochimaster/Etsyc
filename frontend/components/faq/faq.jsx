import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

export const Faq = (props) => {
  useEffect(() => {
    window.prerenderReady = true
  }, [])

  return (
    <div className="faq-page-container">
      <Helmet>
        <title>FAQ | Castle and Chair</title>
        <meta
          name="title"
          property="og:title"
          content="FAQ | Castle and Chair"
        ></meta>
        <meta
          property="og:description"
          content="Frequently asked questions - hours, directions, return policy, 
        reservation, hold, appointment, discount, payment types, delivery, pick up"
        />
        <meta
          name="description"
          content="Frequently asked questions - hours, directions, return policy, 
        reservation, hold, appointment, discount, payment types, delivery, pick up"
        />
        <meta
          property="og:url"
          content={`https://www.castleandchair.com/%23/faq`}
        />
        {/* <link rel="canonical" href={`/faq`} /> */}
      </Helmet>
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-container">
        <div className="question-container">
          <div className="question-left">Q.</div>
          <div className="question-right">
            What are your hours and location?
          </div>
        </div>
        <div className="answer-container">
          <div className="answer-left">A.</div>
          <div className="answer-right">
            We meet customers by appointment generally on weekdays between the
            hours of 9.30AM - 5PM. Weekend hours are very limited and reserved
            only for customer delivery pick ups. To schedule an appointment, set
            it up here: <Link to="/visit">BOOK APPOINTMENT.</Link>
          </div>
        </div>

        <div className="question-container">
          <div className="question-left">Q.</div>
          <div className="question-right">
            Can I come in and look at an item before I purchase?
          </div>
        </div>
        <div className="answer-container">
          <div className="answer-left">A.</div>
          <div className="answer-right">
            Yes! You can come visit our warehouse by appointment.
            <br />
            Please make selection prior to the appointment and send us the item
            numbers or links to the listing that you are interested in
            purchasing. You will be able to inspect item during appointment
            prior to purchase.
          </div>
        </div>

        <div className="question-container">
          <div className="question-left">Q.</div>
          <div className="question-right">Do you deliver?</div>
        </div>
        <div className="answer-container">
          <div className="answer-left">A.</div>
          <div className="answer-right">
            Same day delivery around the Bay Area, California is available.
            Delivery goes through a 3rd party service - Lugg.{' '}
            <a
              target="_blank"
              href="https://lugg.com/estimate?origin=Z2lkOi8vbHVnZy9Mb2NhdGlvbi9kYjUxM2I5ZS03NmNmLTQxN2UtODllYy00NDBhZGI0YWEyODI"
            >
              Click here to get free estimate.
            </a>
            <br />
            Input Delivery Address under Destination field and you will see the
            available options and respective charges.
            <br />
            Lugg pick up times can be arranged for weekdays 11AM - 5PM. If you
            need a weekend time slot, please call or text me to coordinate and
            we will try to accommodate your schedule.
          </div>
        </div>

        <div className="question-container">
          <div className="question-left">Q.</div>
          <div className="question-right">Are your prices negotiable?</div>
        </div>
        <div className="answer-container">
          <div className="answer-left">A.</div>
          <div className="answer-right">
            Prices are firm as listed even if multiple is purchased. I list the
            prices as the best deal that I can offer and this streamlines the
            sales process.
          </div>
        </div>

        <div className="question-container">
          <div className="question-left">Q.</div>
          <div className="question-right">Are your items new or used?</div>
        </div>
        <div className="answer-container">
          <div className="answer-left">A.</div>
          <div className="answer-right">
            Condition of each piece is disclosed in the listing. Please refer to
            the listing. Every item listed has been inspected and all issues are
            disclosed in the listing so that you have no surprises with your
            purchase.
          </div>
        </div>

        <div className="question-container">
          <div className="question-left">Q.</div>
          <div className="question-right">
            What form of payments do you accept?
          </div>
        </div>
        <div className="answer-container">
          <div className="answer-left">A.</div>
          <div className="answer-right">
            We accept cash, Zelle, or Cashapp. Venmo not accepted at this time.
          </div>
        </div>

        <div className="question-container">
          <div className="question-left">Q.</div>
          <div className="question-right">Can I have a refund on deposit?</div>
        </div>
        <div className="answer-container">
          <div className="answer-left">A.</div>
          <div className="answer-right">
            Deposits are used to hold the item specifically for you. Deposits
            are not refundable.
            <br />
            Deposit of 20% for each 1 week of hold. If you do not pay the
            balance by the end of the hold, the item will no longer be held for
            you and the deposit is forfeited and non refundable. The item will
            then be made available for purchase to other customers.
          </div>
        </div>

        <div className="question-container">
          <div className="question-left">Q.</div>
          <div className="question-right">How long can you hold the item?</div>
        </div>
        <div className="answer-container">
          <div className="answer-left">A.</div>
          <div className="answer-right">
            All fully paid items must be picked up in 2 weeks. If the item is
            not picked up in 2 weeks, it will be treated as abandoned and the
            payment is not refundable. <br />
            If you need more than 2 weeks of hold, please let us know and we can
            make necessary arrangements and come to an agreement.
          </div>
        </div>

        <div className="question-container">
          <div className="question-left">Q.</div>
          <div className="question-right">What is your return policy?</div>
        </div>
        <div className="answer-container">
          <div className="answer-left">A.</div>
          <div className="answer-right">
            All sales are final. There are no returns on any merchandise. All
            merchandise is sold as is, without warranties or services. Customer
            is responsible to inspect all items purchased and do understand at
            they are sold as is with no warranties or services.
            <br />
            Once inspected and accepted, the merchandise shall become the sole
            responsibility of customer including but not limited to the
            carrying, loading, packaging and securing the further transport.
            Please come prepared with the necessary tools: proper vehicle, rope,
            packing materials
          </div>
        </div>

        <div className="question-container">
          <div className="question-left">Q.</div>
          <div className="question-right">
            Can we do a self pick up of purchased items?
          </div>
        </div>
        <div className="answer-container">
          <div className="answer-left">A.</div>
          <div className="answer-right">
            We offer assistance in loading your items into your vehicle but we
            cannot provide you with wrapping or rope to tie down your items, nor
            are we responsible for securing items to your vehicle. We cannot be
            responsible for damage that occurs to your merchandise, your
            vehicle, or other vehicles when you transport your purchase.
          </div>
        </div>
      </div>
    </div>
  )
}
