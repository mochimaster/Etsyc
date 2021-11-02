import React from 'react'

export const Faq = () => (
  <div className="faq-page-container">
    <h1 className="faq-title">Frequently Asked Questions</h1>
    <div className="faq-container">
      <div className="question-container">
        <div className="question-left">Q.</div>
        <div className="question-right">What are your hours and location?</div>
      </div>
      <div className="answer-container">
        <div className="answer-left">A.</div>
        <div className="answer-right">
          We meet customers by appointment generally on weekdays between the
          hours of 9.30AM - 5PM. Weekend hours are very limited and reserved
          only for customer delivery pick ups. Give us a call or send us a text
          between the hours of operation to schedule an appointment. We are
          located at{' '}
          {/* <a
                   target="_blank"
                   href="https://goo.gl/maps/pFnJSdTpH91D32nBA"
                 >
                   1273 Industrial Pkwy W Ste 750 Hayward, CA 94544
                 </a> */}
          <a target="_blank" href="https://goo.gl/maps/ZHrviBbQ2YwQQwiaA">
            1273 Industrial Parkway West #750 Hayward CA 94544
          </a>
          .
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
          numbers or links to the listing that you are interested in purchasing.
          You will be able to inspect item during appointment prior to purchase.
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
            href="https://lugg.com/estimate?destination_id=db513b9e-76cf-417e-89ec-440adb4aa282&origin_id=db513b9e-76cf-417e-89ec-440adb4aa282&use_case=store_delivery"
          >
            Click here to get free estimate.
          </a>
          <br />
          Input Delivery Address under Destination field and you will see the
          available options and respective charges.
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
        <div className="question-right">What is your return policy?</div>
      </div>
      <div className="answer-container">
        <div className="answer-left">A.</div>
        <div className="answer-right">
          We do not accept returns or exchanges. All sales are final.
        </div>
      </div>

      <div className="question-container">
        <div className="question-left">Q.</div>
        <div className="question-right">Can I have a refund on deposit?</div>
      </div>
      <div className="answer-container">
        <div className="answer-left">A.</div>
        <div className="answer-right">
          Deposits are used to hold the item specifically for you. Deposits are
          not refundable.
          <br />
          Deposit of 20% for each 1 week of hold. If you do not pay the balance
          by the end of the hold, the item will no longer be held for you and
          the deopsit is forfeited and non refundable. The item will then be
          made available for purchase to other customers.
        </div>
      </div>

      <div className="question-container">
        <div className="question-left">Q.</div>
        <div className="question-right">How long can you hold the item?</div>
      </div>
      <div className="answer-container">
        <div className="answer-left">A.</div>
        <div className="answer-right">
          All fully paid items must be picked up in 2 weeks. If the item is not
          picked up in 2 weeks, it will be treated as abondoned and the payment
          is not refundable. <br />
          If you need more than 2 weeks of hold, please let us know and we can
          make necessary arrangments and come to an agreement.
        </div>
      </div>
    </div>
  </div>
)
