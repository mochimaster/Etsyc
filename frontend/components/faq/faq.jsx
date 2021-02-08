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
          We meet customers by appointment. Give us a call or send us a text to
          schedule an appointment. We are located at{' '}
          {/* <a
                   target="_blank"
                   href="https://goo.gl/maps/pFnJSdTpH91D32nBA"
                 >
                   1273 Industrial Pkwy W Ste 750 Hayward, CA 94544
                 </a> */}
          <a target="_blank" href="https://goo.gl/maps/xz8Bvjsv3M2YEEPr7">
            2525 Whipple Rd Hayward CA 94544
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
        </div>
      </div>

      <div className="question-container">
        <div className="question-left">Q.</div>
        <div className="question-right">Do you deliver?</div>
      </div>
      <div className="answer-container">
        <div className="answer-left">A.</div>
        <div className="answer-right">
          Delivery goes through a 3rd party service -{' '}
          <a target="_blank" href="https://lugg.com/">
            Lugg
          </a>
          . Delivery fee generally cost $70 - $120 around the Bay Area. It will
          be taken into your home.
        </div>
      </div>

      <div className="question-container">
        <div className="question-left">Q.</div>
        <div className="question-right">Are your prices negotiable?</div>
      </div>
      <div className="answer-container">
        <div className="answer-left">A.</div>
        <div className="answer-right">
          Prices are firm as listed. I list the prices as the best deal that I
          can offer and this streamlines the sales process.
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
    </div>
  </div>
)
