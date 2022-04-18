import React from 'react'

import { InlineWidget } from 'react-calendly'

const Booking = () => {
  return (
    <div className="booking-container">
      <h1 className="booking-header">Visit Our Warehouse</h1>

      <div className="booking-body">
        <div>
          We love visitors! You are welcome to make an appointment to check out
          and verify condition of the listed items and complete your purchase.
        </div>
        <br />
        <div>
          We are currently open by appointments weekdays 10AM - 5PM. To make an
          appointment, use the scheduler below:
        </div>

        <InlineWidget
          styles={{
            minWidth: '320px',
            height: window.isMobile ? '1000px' : '800px',
            overflow: 'hidden',
            width: '100%'
          }}
          url="https://calendly.com/castleandchair/30"
        />

        {/* <div id="booking-book-me-text">
          <a
            href="https://castleandchair.youcanbook.me/"
            target="_blank"
            data-ycbm-modal="true"
          >
            <i
              class="fa-solid fa-calendar-days"
              style={{
                fontSize: '100px',
                color: 'black'
              }}
            ></i>
            <br />
            BOOK ME
          </a>
          <br />
        </div> */}

        <div>
          If you have any questions or to make an appointment within the next
          two hours, text us at{' '}
          <a
            href={`sms:+15109361639&body=Hi, I would like to set up an appointment. The items that I am interested are as following.`}
          >
            510-936-1639
          </a>
          .
        </div>

        <div>
          <br />
          <div className="booking-name">
            Castle and Chair Warehouse Location:{' '}
          </div>
          <br />
          <div>
            1273 Industrial Parkway West #750 <br />
            Hayward CA 94544
          </div>
          <br />
          <a
            href="https://www.google.com/maps/dir//castle+and+chair/@37.6210375,-122.0951556,13z"
            target="_blank"
          >
            <button
              id="direction-btn"
              className="submit-button btn-primary btn"
            >
              DIRECTIONS
            </button>
          </a>
        </div>
        <br />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3160.2001748647267!2d-122.06223908437639!3d37.620978928765425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f957a2aa658d1%3A0x8ba446f321e60e43!2sCastle%20and%20Chair!5e0!3m2!1sen!2sus!4v1650241944411!5m2!1sen!2sus"
          width="90%"
          height="800"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}

export default Booking
