import React from 'react'

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
          appointment, click the button below:{' '}
        </div>
        <br />
        <div>
          <a
            href="https://castleandchair.youcanbook.me/"
            target="_blank"
            data-ycbm-modal="true"
          >
            <img
              src="https://youcanbook.me/resources/pics/ycbm-button.png"
              style={{ borderStyle: 'none', height: 200, width: 200 }}
            />
          </a>
        </div>
        <br />
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
        <img
          id="directions-map"
          className="directions-map"
          aria-label="Directions"
        ></img>
      </div>
    </div>
  )
}

export default Booking
