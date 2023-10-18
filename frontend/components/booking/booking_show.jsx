import React, { useEffect, useState } from 'react'
import { Radio } from 'antd'

import { InlineWidget } from 'react-calendly'
import { Helmet } from 'react-helmet'

const BookingCalendar = ({ calendarUrl, populatedNoteField }) => (
  <InlineWidget
    styles={{
      minWidth: '320px',
      height: window.isMobile ? '1300px' : '950px',
      overflow: 'hidden'
    }}
    pageSettings={{
      hideGdprBanner: true
    }}
    url={calendarUrl}
  />
)

const BookingShow = ({ carts, getCarts, currentUserId, location }) => {
  const [populatedNoteField, setPopulatedNoteField] = useState('')
  const [isWeekdaySchedule, setIsWeekdaySchedule] = useState(true)

  useEffect(() => {
    currentUserId && getCarts(currentUserId)
  }, [])

  useEffect(() => {
    const listingsIdAndTitle = carts.map(
      ({ listing_id, title }) =>
        `https://www.castleandchair.com/#/listings/${listing_id}/${title}`
    )

    setPopulatedNoteField(listingsIdAndTitle.join('\n\n'))

    window.prerenderReady = true
  }, [carts])

  return (
    <div className="booking-container">
      <Helmet>
        <title>Visit Us | Castle and Chair</title>
        <meta
          name="title"
          property="og:title"
          content="Visit Us | Castle and Chair"
        ></meta>
        <meta
          name="description"
          content="Visit our warehouse in Hayward, CA. We are open by appoinment - weekdays 10AM - 5PM."
        />

        <meta
          property="og:description"
          content="Visit our warehouse in Hayward, CA. We are open by appoinment - weekdays 10AM - 5PM."
        />
        <meta
          property="og:url"
          content={`https://www.castleandchair.com/%23/visit`}
        />
        {/* <link rel="canonical" href={`/visit`} /> */}
      </Helmet>
      <h1 className="booking-header">Visit Our Warehouse</h1>

      <div className="booking-body">
        <div>
          We love visitors! You are welcome to make an appointment to check out
          and verify condition of the listed items and complete your purchase.
          <br />
          <br />
          Please note that we currently do not offer test sittings. The
          appointment is set up for customers to verify the condition of the
          listed item.
        </div>
        <br />
        <div>
          We are currently open by <b>appointments</b> weekdays 11AM - 5PM and
          limited time on weekends. To make an appointment, use the scheduler
          below.
          <br />
          <br />
          Weekend appointments can be made using the Weekend Appointment
          calendar below by toggling the switch to Weekend Schedule. To make an
          appointment within the next two hours, text us at{' '}
          <a
            href={`sms:+15109361639&body=Hi, I would like to set up an appointment. The items that I am interested are as following.`}
          >
            510-936-1639
          </a>
          . We will be able to accept your appointment if schedule permits.
          <br />
        </div>

        <br />

        <Radio.Group
          size="large"
          value={isWeekdaySchedule}
          onChange={(e) => setIsWeekdaySchedule(e.target.value)}
        >
          <Radio.Button
            style={{
              ...(isWeekdaySchedule
                ? { backgroundColor: 'black', color: 'white' }
                : {}),
              ...(isMobile ? { fontSize: '35px' } : {})
            }}
            value={true}
          >
            Weekday Appointment
          </Radio.Button>
          <Radio.Button
            style={{
              ...(isWeekdaySchedule
                ? {}
                : { backgroundColor: 'black', color: 'white' }),
              ...(isMobile ? { fontSize: '35px' } : {})
            }}
            value={false}
          >
            Weekend Appointment
          </Radio.Button>
        </Radio.Group>

        <BookingCalendar
          populatedNoteField={populatedNoteField}
          calendarUrl={`https://calendly.com/castleandchair/${
            isWeekdaySchedule ? `visit` : `visit-weekend`
          }?a3=${encodeURIComponent(populatedNoteField)}`}
        />

        <div id="book-directions">
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

export default BookingShow
