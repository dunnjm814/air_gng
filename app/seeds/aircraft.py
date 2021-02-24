from app.models import db, Aircraft

def seed_biz():
  air_biz = Aircraft(business_name="Helicopters R' Us!",
  biz_image="https://www.quantumhelicopters.com/sites/default/files/choppers-in-hanger.jpg",
  description="You buy, we fly",
  aircraft="Helicopter",
  address="1234 East Helicopter Way",
  city="Flagstaff",
  state="AZ",
  zip_code=86001,
  phone_number='520-666-5152',
  lng=-111.64537,
  lat=35.30848,
  )

  db.session.add(air_biz)
  db.session.commit()

def undo_biz():
    db.session.execute('TRUNCATE aircrafts CASCADE;')
    db.session.commit()
