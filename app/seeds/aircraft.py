from app.models import db, Aircraft

def seed_biz():
  air_biz1 = Aircraft(business_name="Helicopters R' Us!",
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
  air_biz2 = Aircraft(business_name="Sky High Diving",
  biz_image="https://www.sickchirpse.com/wp-content/uploads/2012/11/Cat-Skydiving.jpg",
  description="Sky diving; need we say more?",
  aircraft="SkyDiving",
  address="5678 West Skydive Street",
  city="Queen Creek",
  state="AZ",
  zip_code=85142,
  phone_number='520-620-7875',
  lng=-111.64650,
  lat=33.25304,
  )

  db.session.add(air_biz1)
  db.session.add(air_biz2)
  db.session.commit()

def undo_biz():
    db.session.execute('TRUNCATE aircrafts CASCADE;')
    db.session.commit()
